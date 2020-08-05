import { Timeline, Animation } from './animation';
import { linear, ease } from './cubicBezier';
import { createElement, Text, Wrapper } from './createElement';
import css from './listview.css'

console.log(css)

export default class ListView {
  constructor() {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  getAttribute(name) {
    return this[name];
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    let data = this.getAttribute('data');

    return <div class="list-view">{data.map(this.children[0])}</div>;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
