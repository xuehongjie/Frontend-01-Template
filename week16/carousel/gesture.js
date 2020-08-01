export function enableGesture(element) {
  let contexts = Object.create(null);

  let MOUSE_SYMBOL = Symbol('mouse');

  // 电脑模式下是 undefined，手机模式下是 null
  if (document.ontouchstart !== null) {
    element.addEventListener('mousedown', () => {
      contexts[MOUSE_SYMBOL] = Object.create(null);
      start(event, contexts[MOUSE_SYMBOL]);
      let mousemove = (event) => {
        move(event, contexts[MOUSE_SYMBOL]);
      };

      let mouseend = (event) => {
        end(event, contexts[MOUSE_SYMBOL]);
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseend);
      };
      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseend);
    });
  }

  element.addEventListener('touchstart', (event) => {
    // console.log(event.changedTouches[0]);
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null);
      start(touch, contexts[touch.identifier]);
    }
  });

  element.addEventListener('touchmove', (event) => {
    // console.log(event.changedTouches[0]);
    for (let touch of event.changedTouches) {
      move(touch, contexts[touch.identifier]);
    }
  });

  element.addEventListener('touchend', (event) => {
    // console.log(event.changedTouches[0]);
    for (let touch of event.changedTouches) {
      end(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });

  element.addEventListener('touchcancel', (event) => {
    // console.log(event.changedTouches[0]);
    for (let touch of event.changedTouches) {
      cancel(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });

  let start = (point, context) => {
    element.dispatchEvent(
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
      element.dispatchEvent(new CustomEvent('pressstart', {}));
    }, 500);
  };

  let move = (point, context) => {
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;

    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress) {
        element.dispatchEvent(new CustomEvent('presscancel', {}));
      }
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;

      element.dispatchEvent(
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
      element.dispatchEvent(
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
  };

  let end = (point, context) => {
    if (context.isPan) {
      let dx = point.clientX - context.startX;
      let dy = point.clientY - context.startY;
      // console.log(context.moves);
      let record = context.moves[0];
      let speed = Math.sqrt(
        ((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t)
      );
      let isFlick = speed > 2.5;

      if (isFlick) {
        // console.log('flick');
        element.dispatchEvent(
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
      // console.log('pan end');
      element.dispatchEvent(
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
      // console.log(speed);
    }
    if (context.isTap) {
      // console.log('tap');
      element.dispatchEvent(new CustomEvent('tap', {}));
    }
    if (context.isPress) {
      // console.log('press end');
      element.dispatchEvent(new CustomEvent('preddend', {}));
    }

    clearTimeout(context.timeoutHandler);
  };

  let cancel = (event, context) => {
    // console.log('canceled');
    element.dispatchEvent(new CustomEvent('canceled', {}));
    clearTimeout(context.timeoutHandler);
  };
}
