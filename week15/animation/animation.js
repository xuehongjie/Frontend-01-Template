export class Timeline {
  constructor() {
    this.animations = [];
    this.requestID = null;
    this.state = 'inited';
  }
  tick() {
    let t = Date.now() - this.startTime;
    let animations = this.animations.filter((animation) => !animation.finished);

    for (let animation of animations) {
      let {
        object,
        property,
        template,
        start,
        end,
        duration,
        timingFunction,
        delay,
        addTime,
      } = animation;

      let progression = timingFunction((t - delay - addTime) / duration); // 0-1之间的数
      if (t > duration + delay + addTime) {
        progression = 1;
        animation.finished = true;
      }
      // let value = start + progression * (end - start); // 根据progression算出的当前值
      let value = animation.valueFromProgression(progression); // 根据progression算出的当前值

      object[property] = template(value);
    }

    if (animations.length) {
      this.requestID = requestAnimationFrame(() => this.tick());
    }
  }
  // 暂停
  pause() {
    if (this.state !== 'playing') {
      return;
    }
    this.state = 'paused';
    this.pauseTime = Date.now();
    if (this.requestID) {
      cancelAnimationFrame(this.requestID);
    }
  }
  // 继续运行
  resume() {
    if (this.state !== 'paused') {
      return;
    }
    this.state = 'playing';
    this.startTime += Date.now() - this.pauseTime; // 把暂停的时间差补回来
    this.tick();
  }
  // 开始动画
  start() {
    if (this.state !== 'inited') {
      return;
    }
    this.state = 'playing';
    this.startTime = Date.now();
    this.tick();
  }
  restart() {
    if (this.state === 'playing') {
      this.pause();
    }
    this.animations = [];
    this.requestID = null;
    this.state = 'playing';
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick();
  }
  // 加入动画
  add(animation, addTime) {
    this.animations.push(animation);
    animation.finished = false;

    if (this.state === 'playing') {
      animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;
    } else {
      animation.addTime = addTime !== void 0 ? addTime : 0;
    }

    
  }
}

export class Animation {
  constructor(object, property, start, end, duration, delay, timingFunction, template) {
    this.object = object;
    this.template = template;
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction = timingFunction;
  }
  valueFromProgression(progression) {
    return this.start + progression * (this.end - this.start);
  }
}

export class ColorAnimation {
  constructor(object, property, start, end, duration, delay, timingFunction, template) {
    this.object = object;
    this.template = template || ((v) => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
    this.property = property;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.delay = delay || 0;
    this.timingFunction = timingFunction;
  }
  valueFromProgression(progression) {
    return {
      r: this.start.r + progression * (this.end.r - this.start.r),
      g: this.start.g + progression * (this.end.g - this.start.g),
      b: this.start.b + progression * (this.end.b - this.start.b),
      a: this.start.a + progression * (this.end.a - this.start.a),
    };
  }
}

function timingFunction(start, end) {
  return (t) => start + (t / duration) * (end - start);
}

/* let animation = new Animation(
  object,
  property,
  start,
  end,
  duration,
  delay,
  timingFunction
);
let timeline = new Timeline();
timeline.add(animation);

timeline.start();
timeline.pause();
timeline.resume();
timeline.stop(); */
