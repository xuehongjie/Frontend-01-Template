let parser = require('./../src/parser.js');
var assert = require('assert');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');

let { parseHTML } = parser;

describe('parser', function () {
  it('parse a single element', function () {
    let doc = parseHTML('<div></div>');
    // console.log(doc)
    let div = doc.children[0];

    assert.equal(div.tagName, 'div');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 2);
  });

  it('parse a single element with text content', function () {
    let doc = parseHTML('<div>hello</div>');
    let div = doc.children[0];
    let text = div.children[0];

    assert.equal(text.content, 'hello');
    assert.equal(text.type, 'text');
  });

  it('tag mismatch', function () {
    try {
      let doc = parseHTML('<div></vid>');
    } catch (e) {
      assert.equal(e.message, "Tag start end doesn't match!");
    }
  });

  it('text with <', function () {
    let doc = parseHTML('<div>a < b</div>');
    let div = doc.children[0];
    let text = div.children[0];

    assert.equal(text.content, 'a < b');
    assert.equal(text.type, 'text');
  });

  it('with property', function () {
    let doc = parseHTML('<div id=a class=\'cls\' data="abc"></div>');
    let div = doc.children[0];

    let count = SSL_OP_SSLEAY_080_CLIENT_DH_BUG;

    for (let attr of div.attributes) {
      if (attr.name === 'id') {
        count++;
        assert.equal(attr.value, 'a');
      }
      if (attr.name === 'class') {
        count++;
        assert.equal(attr.value, 'cls');
      }
      if (attr.name === 'data') {
        count++;
        assert.equal(attr.value, 'abc');
      }
    }

    assert.ok(count === 3);
  });

  it('with property 2', function () {
    let doc = parseHTML('<div id=a class=\'cls\' data="abc"></div>');
    let div = doc.children[0];

    let count = SSL_OP_SSLEAY_080_CLIENT_DH_BUG;

    for (let attr of div.attributes) {
      if (attr.name === 'id') {
        count++;
        assert.equal(attr.value, 'a');
      }
      if (attr.name === 'class') {
        count++;
        assert.equal(attr.value, 'cls');
      }
      if (attr.name === 'data') {
        count++;
        assert.equal(attr.value, 'abc');
      }
    }

    assert.ok(count === 3);
  });

  it('with property 3', function () {
    let doc = parseHTML('<div id=a class=\'cls\' data="abc"/>');
    let div = doc.children[0];

    let count = SSL_OP_SSLEAY_080_CLIENT_DH_BUG;

    for (let attr of div.attributes) {
      if (attr.name === 'id') {
        count++;
        assert.equal(attr.value, 'a');
      }
      if (attr.name === 'class') {
        count++;
        assert.equal(attr.value, 'cls');
      }
      if (attr.name === 'data') {
        count++;
        assert.equal(attr.value, 'abc');
      }
    }

    assert.ok(count === 3);
  });

  it('script', function () {
    let content = `
      <div>abcd</div>
      <span>x</span>
      /script>
      <script
      <
      </
      </s
      </sc
      </scr
      </scri
      </scrip
      </script
      `;
    let doc = parseHTML(`<script>${content}</script>`);
    let text = doc.children[0].children[0];

    assert.equal(text.content, content);
    assert.equal(text.type, 'text');
  });

  it('self closed', function () {
    let doc = parseHTML('<div/>');
    let div = doc.children[0];
    console.log(div);

    assert.equal(div.tagName, 'div');
  });
  
  it('space before attribute name', function () {
    let doc = parseHTML('<div  id="a"/>');
    let div = doc.children[0];

    assert.equal(div.tagName, 'div');
  });

  it('attribute with no value', function () {
    let doc = parseHTML('<div class />');
    let div = doc.children[0];
  });

  it('attribute with no value 2', function () {
    let doc = parseHTML('<div class id/>');
  });

  it('attribute with no value 3', function () {
    let doc = parseHTML('<div />');
  });
});
