export class Gesture {
  constructor(element) {
    this.element = element;
    this.bindEvent();
  }
  bindEvent() {
    let contexts = Object.create(null);

    let MOUSE_SYMBOL = Symbol('mouse');

    // 电脑模式下是 undefined，手机模式下是 null
    if (document.ontouchstart !== null) {
      this.element.addEventListener('mousedown', () => {
        contexts[MOUSE_SYMBOL] = Object.create(null);
        this.start(event, contexts[MOUSE_SYMBOL]);
        let mousemove = (event) => {
          this.move(event, contexts[MOUSE_SYMBOL]);
        };

        let mouseend = (event) => {
          this.end(event, contexts[MOUSE_SYMBOL]);
          document.removeEventListener('mousemove', mousemove);
          document.removeEventListener('mouseup', mouseend);
        };
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseend);
      });
    }

    this.element.addEventListener('touchstart', (event) => {
      for (let touch of event.changedTouches) {
        contexts[touch.identifier] = Object.create(null);
        this.start(touch, contexts[touch.identifier]);
      }
    });

    this.element.addEventListener('touchmove', (event) => {
      for (let touch of event.changedTouches) {
        this.move(touch, contexts[touch.identifier]);
      }
    });

    this.element.addEventListener('touchend', (event) => {
      for (let touch of event.changedTouches) {
        this.end(touch, contexts[touch.identifier]);
        delete contexts[touch.identifier];
      }
    });

    this.element.addEventListener('touchcancel', (event) => {
      for (let touch of event.changedTouches) {
        this.cancel(touch, contexts[touch.identifier]);
        delete contexts[touch.identifier];
      }
    });
  }
  start(point, context) {
    this.element.dispatchEvent(
      new CustomEvent('start', {
        startX: point.clientX,
        startY: point.clientY,
        clientX: point.clientX,
        clientY: point.clientY,
      })
    );
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.moves = [];
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.timeoutHandler = setTimeout(() => {
      if (context.isPan) {
        return;
      }

      context.isTap = false;
      context.isPan = false;
      context.isPress = true;
      this.element.dispatchEvent(new CustomEvent('pressstart', {}));
    }, 500);
  }
  move(point, context) {
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;

    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress) {
        this.element.dispatchEvent(new CustomEvent('presscancel', {}));
      }
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;

      this.element.dispatchEvent(
        new CustomEvent('panstart', {
          detail: {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
          },
        })
      );
    }

    if (context.isPan) {
      context.moves.push({
        dx,
        dy,
        t: Date.now(),
      });
      context.moves = context.moves.filter((record) => Date.now() - record.t < 300);
      this.element.dispatchEvent(
        new CustomEvent('pan', {
          detail: {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
          },
        })
      );
    }

    // console.log('move', dx, dy);
  }
  end(point, context) {
    if (context.isPan) {
      let dx = point.clientX - context.startX;
      let dy = point.clientY - context.startY;
      let record = context.moves[0];
      let speed = Math.sqrt(
        ((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t)
      );
      let isFlick = speed > 2.5;

      if (isFlick) {
        this.element.dispatchEvent(
          new CustomEvent('flick', {
            detail: {
              startX: context.startX,
              startY: context.startY,
              clientX: point.clientX,
              clientY: point.clientY,
              speed,
            },
          })
        );
      }
      this.element.dispatchEvent(
        new CustomEvent('panend', {
          detail: {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            speed,
            isFlick,
          },
        })
      );
    }
    if (context.isTap) {
      this.element.dispatchEvent(new CustomEvent('tap', {}));
    }
    if (context.isPress) {
      this.element.dispatchEvent(new CustomEvent('preddend', {}));
    }

    clearTimeout(context.timeoutHandler);
  }
  cancel(event, context) {
    this.element.dispatchEvent(new CustomEvent('canceled', {}));
    clearTimeout(context.timeoutHandler);
  }
}
