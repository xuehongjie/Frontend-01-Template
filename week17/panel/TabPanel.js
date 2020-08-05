import { Timeline, Animation } from './animation';
import { linear, ease } from './cubicBezier';
import { createElement, Text, Wrapper } from './createElement';

export default class TabPanel {
  constructor() {
    this.children = [];
    this.attributes = new Map();
    this.properties = new Map();
    this.state = Object.create(null);
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
      view.classList.remove('selected');
    }
    this.titleViews[i].classList.add('selected');
    // this.titleView.innerText = this.children[i].title;
  }

  render() {
    this.childViews = this.children.map((child) => (
      <div style="width: 300px;min-height: 300px;">{child}</div>
    ));
    this.titleViews = this.children.map((child, i) => (
      <span
        class="tab-panel-title"
        onClick={() => this.select(i)}
      >
        {child.getAttribute('title') || ''}
      </span>
    ));
    setTimeout(() => {
      this.select(0);
    }, 16);

    return (
      <div class="tab-panel">
        <h1 class="tab-panel-header">{this.titleViews}</h1>
        <div>{this.childViews}</div>
      </div>
    );
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
