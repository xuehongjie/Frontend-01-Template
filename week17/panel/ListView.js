import { Timeline, Animation } from './animation';
import { linear, ease } from './cubicBezier';
import { createElement, Text, Wrapper } from './createElement';

export default class TabPanel {
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

  select(i) {
    for (let view of this.childViews) {
      view.style.display = 'none';
    }
    this.childViews[i].style.display = ''; // 采用默认css

    for (let view of this.titleViews) {
      view.style.display = 'none';
    }
    this.titleViews[i].style.display = ''; // 采用默认css
    // this.titleView.innerText = this.children[i].title;
  }

  render() {
    this.childViews = this.children.map((child) => (
      <div style="width: 300px;min-height: 300px;">{child}</div>
    ));
    this.titleViews = this.children.map((child, i) => (
      <span onClick={() => this.select(i)} style="background-color: lightgreen;margin:5px 5px 0;font-size:24px;width: 300px;min-height: 300px;">
        {child}
      </span>
    ));
    setTimeout(() => {
      this.select(0);
    }, 16);

    return (
      <div class="tab-panel" style="width: 300px">
        <h1 style="width: 300px;">{this.childViews}</h1>
        <div>{this.childViews}</div>
      </div>
    );
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
