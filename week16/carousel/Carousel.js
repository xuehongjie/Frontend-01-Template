import { Timeline, Animation } from './animation';
import { linear, ease } from './cubicBezier';
import { createElement, Text, Wrapper } from './createElement';

export class Carousel {
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
    let timeline = new Timeline();
    timeline.start();

    let position = 0;
    let nextPicStopHandler = null;
    let len = this.data.length;
    let children = this.data.map((url, currentPosition) => {
      let lastPosition = (currentPosition - 1 + len) % len;
      let nextPosition = (currentPosition + 1) % len;

      let offset = 0;
      let onStart = () => {
        timeline.pause();
        clearTimeout(nextPicStopHandler);

        let currentElement = children[currentPosition];
        let currentTransformValue = Number(
          currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]
        );
        offset = currentTransformValue + 500 * currentPosition;
      };

      let onPan = (event) => {
        let { detail } = event;
        let { startX, startY, clientX, clientY } = detail || {};
        let lastElement = children[lastPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];

        let dx = clientX - startX;

        let lastTransformValue = -500 - 500 * lastPosition + offset + dx;
        let currentTransformValue = -500 * currentPosition + offset + dx;
        let nextTransformValue = 500 - 500 * nextPosition + offset + dx;

        lastElement.style.transform = `translateX(${lastTransformValue}px)`;
        currentElement.style.transform = `translateX(${currentTransformValue}px)`;
        nextElement.style.transform = `translateX(${nextTransformValue}px)`;
      };

      let onPanend = (event) => {
        let { detail } = event;
        let { startX, startY, clientX, clientY } = detail || {};

        let direction = 0;
        let dx = clientX - startX;

        if (dx + offset > 250) {
          direction = 1;
        } else if (dx + offset < -250) {
          direction = -1;
        }

        timeline.reset();
        timeline.start();

        let lastElement = children[lastPosition];
        let currentElement = children[currentPosition];
        let nextElement = children[nextPosition];

        let lastAnimation = new Animation(
          lastElement.style,
          'transform',
          -500 - 500 * lastPosition + offset + dx,
          -500 - 500 * lastPosition + direction * 500,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        );
        let currentAnimation = new Animation(
          currentElement.style,
          'transform',
          -500 * currentPosition + offset + dx,
          -500 * currentPosition + direction * 500,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        );
        let nextAnimation = new Animation(
          nextElement.style,
          'transform',
          500 - 500 * nextPosition + offset + dx,
          500 - 500 * nextPosition + direction * 500,
          500,
          0,
          ease,
          (v) => `translateX(${v}px)`
        );

        timeline.add(lastAnimation);
        timeline.add(currentAnimation);
        timeline.add(nextAnimation);

        position = (position - direction + len) % len;

        nextPicStopHandler = setTimeout(nextPic, 3000);
      };
      let element = (
        <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true} />
      );
      element.style.transform = 'translateX(0px)';
      element.addEventListener('dragstart', (event) => event.preventDefault());

      return element;
    });

    let nextPic = () => {
      let nextPosition = (position + 1) % len;

      let current = children[position];
      let next = children[nextPosition];

      let currentAnimation = new Animation(
        current.style,
        'transform',
        -100 * position,
        -100 - 100 * position,
        500,
        0,
        ease,
        (v) => `translateX(${5 * v}px)`
      );
      let nextAnimation = new Animation(
        next.style,
        'transform',
        100 - 100 * nextPosition,
        -100 * nextPosition,
        500,
        0,
        ease,
        (v) => `translateX(${5 * v}px)`
      );

      timeline.add(currentAnimation);
      timeline.add(nextAnimation);

      position = nextPosition;
      nextPicStopHandler = setTimeout(nextPic, 3000);
    };

    nextPicStopHandler = setTimeout(nextPic, 3000);

    return <div class="carousel">{children}</div>;
  }

  mountTo(parent) {
    this.render().mountTo(parent);
  }
}
