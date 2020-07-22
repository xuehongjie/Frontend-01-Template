let parser = require('./parser');

module.exports = function (source, map) {
  let tree = parser.parseHTML(source);
  // console.log(tree.children[1].children[0].content);

  let template = null;
  let script = null;

  for (let node of tree.children) {
    if (node.tagName === 'template') {
      template = node.children.filter((e) => e.type !== 'text')[0]; // 取template标签下的标签
    }
    if (node.tagName === 'script') {
      script = node.children[0].content;
    }
  }
  // console.log(template);

  let createCode = '';

  let visit = (node, depth) => {
    if (node.type === 'text') {
      return JSON.stringify(node.content);
    }
    let attrs = {};
    for (let attribute of node.attributes) {
      attrs[attribute.name] = attribute.value;
    }

    let children = node.children.map((node) => visit(node));
    return `create("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`;
  };
  createCode = visit(template);

  let r = `
import {createElement, Text, Wrapper} from "./createElement";
export class Carousel {
  setAttribute(name, value) {
    this[name] = value
  }
  render(){
    return ${createCode}
  }
  mountTo(parent) {
    this.render().mountTo(parent)
  }
}
`;

  console.log(r);
  return r;
};
