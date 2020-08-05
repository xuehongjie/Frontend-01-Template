import { Timeline, Animation } from './animation';
import { linear, ease } from './cubicBezier';
import { createElement, Text, Wrapper } from './createElement';

export default class Panel {
  constructor() {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
  }

  setAttribute(name, value) {
    this[name] = value;
  }

  appendChild(child) {
    this.children.push(child);
  }

  render() {
    return (
      <div class="panel">
        <h1 style="background-color:lightgreen;width: 300px;margin: 0;">{this.title}</h1>
        <div style="width: 300px;min-height: 300px;">{this.children}</div>
      </div>
    );
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
