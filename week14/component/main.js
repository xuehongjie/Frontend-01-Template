// import './foo';
function create(Cls, attributes, ...children) {
  let o = new Cls();

  for (let name in attributes) {
    o[name] = attributes[name];
  }

  return o;
}

class Div {
  constructor() {
    this.children = [];
    this.root = document.createElement('div');
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChildren(child) {
    this.children.push(child);
  }
  mountTo(parent) {
    parent.appendChildren(this.root);
  }
}
let component = <Div id="a" class="b" />;
console.log(component)

// component.setAttribute('id', 'a');
