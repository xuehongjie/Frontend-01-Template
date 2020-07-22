const parseCSS = require('./parseCSS');
const layout = require('./../layout');
const EOF = Symbol('EOF'); // EOF：End of File

let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
let stack = [{ type: 'document', children: [] }];

// TODO 匹配空白符
function matchSpace(c) {
  return c.match(/^[\t\n\f ]$/);
}

function emit(token) {
  let top = stack[stack.length - 1];

  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: [],
    };

    element.tagName = token.tagName;

    for (let p in token) {
      if (p !== 'type' || p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p],
        });
      }
    }

    parseCSS.computeCSS(element, stack);
    layout(element);

    top.children.push(element);
    // element.parent = top;

    // 不是自闭合标签
    if (!token.isSelfClosing) {
      stack.push(element);
    }
    currentTextNode = null;
  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end doesn't match");
    } else {
      if (top.tagName === 'style') {
        parseCSS.addCSSRules(top.children[0].content);
      }
      stack.pop();
    }
    layout(top);
    currentTextNode = null;
  } else if (token.type === 'text') {
    if (currentTextNode == null) {
      currentTextNode = {
        type: 'text',
        content: '',
      };
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}

function data(c) {
  if (c == '<') {
    return tagOpen;
  } else if (c == EOF) {
    emit({
      type: 'EOF',
    });
    return;
  } else {
    emit({
      type: 'text',
      content: c,
    });
    return data;
  }
}

// TOTO 匹配标签开始部分
function tagOpen(c) {
  if (c === '/') {
    return endTagOpen;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: '',
    };
    return tagName(c);
  } else {
    emit({
      type: 'text',
      content: c,
    });
    return;
  }
}

// TODO 匹配标签名
function tagName(c) {
  if (matchSpace(c)) {
    return beforeAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += c.toLowerCase();
    return tagName;
  } else if (c == '>') {
    emit(currentToken);
    return data;
  } else {
    currentToken.tagName += c.toLowerCase();
    return tagName;
  }
}
function beforeAttributeName(c) {
  if (matchSpace(c)) {
    return beforeAttributeName;
  } else if (c === '/' || c === '>') {
    return afterAttributeName(c);
  } else if (c === '=') {
  } else {
    currentAttribute = {
      name: '',
      value: '',
    };
  }
  return attributeName(c);
}

function attributeName(c) {
  if (matchSpace(c) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c);
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '\u0000') {
  } else if (c === '"' || c === "'" || c === '<') {
    return attributeName;
  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function beforeAttributeValue(c) {
  if (matchSpace(c) || c === '/' || c === EOF) {
    return beforeAttributeValue;
  } else if (c === '"') {
    return doubleQuotedAttributeValue;
  } else if (c === "'") {
    return singleAuotedAttributeValue;
  } else if (c === '>') {
    // return data
  } else {
    return UnquotedAttributeValue(c);
  }
}

function doubleQuotedAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === '\u0000') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function singleAuotedAttributeValue(c) {
  if (c === "'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === '\u0000') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return singleAuotedAttributeValue;
  }
}

function afterQuotedAttributeValue(c) {
  if (matchSpace(c)) {
    return beforeAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

function UnquotedAttributeValue(c) {
  if (matchSpace(c)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === '\u0000') {
  } else if (c === '"' || c === "'" || c === '<' || c === '=' || c === '`') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}

function selfClosingStartTag(c) {
  if (c == '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if (c === 'EOF') {
  } else {
  }
}

function endTagOpen(c) {
  if (c.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: '',
    };
    return tagName(c);
  } else if (c === '>') {
  } else if (c === EOF) {
  } else {
  }
}

function afterAttributeName(c) {
  if (matchSpace(c)) {
    return afterAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: '',
    };
    return attributeName(c);
  }
}

module.exports = function (html) {
  let state = data;
  for (let c of html) {
    // console.log(state && state.name)
    state = state(c);
  }
  state = state(EOF);

  return stack[0];
};
