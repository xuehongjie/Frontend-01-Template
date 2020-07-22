import './carousel.view';

function create(Cls, attributes, ...children) {
  let o;
  if (typeof Cls === 'string') {
    o = new Wrap(Cls);
  } else {
    o = new Cls();
  }

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

  render() {
    this.slot = <div></div>;
    return (
      <article>
        <header>I'm a header</header>
        <footer>I'm a footer</footer>
      </article>
    );
  }

  mountTo(parent) {
    parent.appendChildren(this.root);
    for (let child of this.children) {
    }
  }
}
let component = <Div id="a" class="b" />;
console.log(component);

// component.setAttribute('id', 'a');
