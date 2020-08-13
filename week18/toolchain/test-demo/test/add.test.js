// import { add } from './../src/add.js';
// import assert from 'assert';
let mod = require('./../src/add');
let assert = require('assert');
let { add } = mod;

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('add', function () {
  it('should return 7 when the value is 3 +4', function () {
    assert.equal(add(3, 4), 7);
  });
});
