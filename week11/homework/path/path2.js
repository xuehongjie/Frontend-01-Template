class Sorted {
  constructor(data, compare) {
    this.data = data.slice();
    this.compare = compare || ((a, b) => a - b);
  }
  take() {
    let len = this.data.length;
    if (!len) {
      return;
    }
    let min = this.data[0];
    let minIndex = 0;

    for (let i = 1; i < len; i++) {
      if (this.compare(this.data[i], min) < 0) {
        min = this.data[i];
        minIndex = i;
      }
    }

    this.data[minIndex] = this.data[this.data.length - 1];
    this.data.pop();
    return min;
  }
  give(v) {
    this.data.push(v);
  }
  get length() {
    return this.data.length;
  }
}

class Path {
  constructor({
    rows = 100, // 行数
    cols = 100, // 列数
    start, // 起始坐标
    end, // 结束坐标
  }) {
    this.rows = rows;
    this.cols = cols;
    this.start = start;
    this.end = end;
    this.mouse = false;
    this.clear = false;
    this.$container = document.getElementById('container');
    // this.queue = [start];
    this.queue = new Sorted(
      [start],
      (a, b) => this.distance(a) - this.distance(b)
    );

    // 判断是否有存储过画布
    if (localStorage.map) {
      this.map = JSON.parse(localStorage.map);
    } else {
      this.initMap();
    }

    this.mapRender();
    this.initEvent();
  }
  distance(point) {
    let end = this.end;
    return (point[0] - end[0]) ** 2 + (point[1] - end[1]) ** 2;
  }
  // 获取当前索引
  getIndex(y, x) {
    return y * this.cols + x;
  }
  // 初始化画布
  initMap() {
    this.map = new Array(this.rows * this.cols).fill(0);
  }
  // 保存画布
  saveMap() {
    localStorage.map = JSON.stringify(this.map);
  }
  // 清空画布
  clearMap() {
    this.initMap();
    localStorage.removeItem('map');
    this.mapRender();
  }
  // 绘制地图
  mapRender() {
    let rows = this.rows;
    let cols = this.cols;
    let map = this.map;

    this.$container.innerHTML = '';
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let cell = document.createElement('div');
        let index = this.getIndex(y, x);
        cell.classList.add('cell');
        if (map[index] === 1) {
          cell.style.backgroundColor = 'black';
        }

        cell.addEventListener('mouseover', () => {
          if (this.mouse) {
            if (this.clear) {
              cell.style.backgroundColor = '';
              this.map[index] = 0;
            } else {
              cell.style.backgroundColor = 'black';
              this.map[index] = 1;
            }
          }
        });

        this.$container.append(cell);
      }
    }
  }
  // 初始化事件
  initEvent() {
    document.addEventListener('mousedown', (e) => {
      this.mouse = true;
      this.clear = e.which === 3;
    });

    document.addEventListener('mouseup', () => (this.mouse = false));

    document.addEventListener('contextmenu', (e) => e.preventDefault());
  }
  // 睡眠
  sleep(t) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, t);
    });
  }
  // 插入寻找过程
  async insert([x, y], pre) {
    let index = this.getIndex(y, x);
    if (this.map[index] !== 0) {
      return;
    }
    if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) {
      return;
    }
    this.map[index] = pre;

    this.$container.children[index].style.backgroundColor = 'lightgreen';
    await this.sleep(1);
    // this.queue.push([x, y]);
    this.queue.give([x, y]);
  }
  // 寻找路径
  async find() {
    let start = this.start;
    let end = this.end;
    let map = this.map.slice();
    let queue = this.queue;

    while (queue.length) {
      let [x, y] = queue.take();
      // console.log(x, y);
      if (x === end[0] && y === end[1]) {
        let path = [];
        while (x !== start[0] || y !== start[1]) {
          let index = this.getIndex(y, x);
          path.push([x, y]);
          this.$container.children[index].style.backgroundColor = 'pink';
          [x, y] = this.map[index];
        }
        return path;
      }

      await this.insert([x - 1, y], [x, y]);
      await this.insert([x + 1, y], [x, y]);
      await this.insert([x, y - 1], [x, y]);
      await this.insert([x, y + 1], [x, y]);

      await this.insert([x - 1, y - 1], [x, y]);
      await this.insert([x + 1, y - 1], [x, y]);
      await this.insert([x - 1, y + 1], [x, y]);
      await this.insert([x + 1, y + 1], [x, y]);
    }

    return null;
  }
}

let path = new Path({
  start: [0, 0],
  end: [10, 10],
});

// 保存路径
document.getElementById('save').addEventListener('click', (e) => {
  path.saveMap();
});
// 清空画布
document.getElementById('clear').addEventListener('click', (e) => {
  path.clearMap();
});
// 重置
document.getElementById('reset').addEventListener('click', (e) => {});
// 开始寻路
document.getElementById('start').addEventListener('click', (e) => {
  path.find();
});
