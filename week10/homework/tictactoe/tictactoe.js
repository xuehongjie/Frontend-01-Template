class TicTacToe {
  constructor() {
    // 每个步骤的值
    let stepMap = {
      0: '',
      1: '⭕️',
      2: '❌',
    };

    this.pattern = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    this.stepValue = 1; // 当前步骤的值
    this.stepMap = stepMap; // 步骤映射表
    this.len = Object.values(stepMap).length; // 所有可用步骤的长度

    this.alertText = ['', 'O is winner!', 'X is winner!'];
    this.willText = ['', 'O will win!', 'X will win!'];
    this.isOver = false;
  }
  // 渲染棋谱
  show() {
    let len = this.len;
    let pattern = this.pattern;
    let board = document.getElementById('board');
    board.innerHTML = '';
    for (let y = 0; y < len; y++) {
      for (let x = 0; x < len; x++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerHTML = this.stepMap[pattern[y][x]];
        board.appendChild(cell);
        cell.addEventListener('click', () => {
          if (this.isOver) return;
          this.move(x, y);
        });
      }
      board.appendChild(document.createElement('br'));
    }
  }
  // 落子
  move(x, y) {
    if (this.pattern[y][x]) {
      return;
    }
    this.pattern[y][x] = this.stepValue;
    if (this.check(this.pattern, this.stepValue)) {
      alert(this.alertText[this.stepValue]);
      this.isOver = true;
    }
    this.stepValue = this.len - this.stepValue;
    this.show();
    this.computerMove();

    console.log(this.bestChoice(this.pattern, this.stepValue).point);
    if (this.willWin(this.pattern, this.stepValue)) {
      console.log(this.willText[this.stepValue]);
    }
  }
  // 机器落子
  computerMove() {
    let choice = this.bestChoice(this.pattern, this.stepValue);
    if (choice.point) {
      this.pattern[choice.point[1]][choice.point[0]] = this.stepValue;
    }
    if (this.check(this.pattern, this.stepValue)) {
      alert(this.alertText[this.stepValue]);
      this.isOver = true;
    }
    this.stepValue = this.len - this.stepValue;
    this.show();
  }
  // 检查是否胜利
  check(pattern, stepValue) {
    let len = this.len;
    // 横向检查
    for (let y = 0; y < len; y++) {
      let win = true;
      for (let x = 0; x < len; x++) {
        if (pattern[y][x] !== stepValue) {
          win = false;
          break;
        }
      }
      if (win) return win;
    }
    // 纵向检查
    for (let y = 0; y < len; y++) {
      let win = true;
      for (let x = 0; x < len; x++) {
        if (pattern[x][y] !== stepValue) {
          win = false;
          break;
        }
      }
      if (win) return win;
    }
    // 左上至右下，对角检查
    {
      let win = true;
      for (let i = 0; i < len; i++) {
        if (pattern[i][i] !== stepValue) {
          win = false;
          break;
        }
      }
      if (win) return win;
    }
    // 左下至右上，对角检查
    {
      let win = true;
      for (let i = 0; i < len; i++) {
        if (pattern[i][len - i] !== stepValue) {
          win = false;
          break;
        }
      }
      if (win) return win;
    }
    return false;
  }
  // 拷贝对象
  clone(pattern) {
    return JSON.parse(JSON.stringify(pattern));
  }
  // 判断是否即将胜利
  willWin(pattern, stepValue) {
    let len = this.len;
    for (let y = 0; y < len; y++) {
      for (let x = 0; x < len; x++) {
        if (pattern[y][x]) continue;
        let tmp = this.clone(pattern);
        tmp[y][x] = stepValue;
        if (this.check(tmp, stepValue)) return [x, y];
      }
    }
    return null;
  }
  // 判断最佳落子点
  bestChoice(pattern, stepValue) {
    let point = this.willWin(pattern, stepValue);
    if (point) {
      return {
        point,
        result: 1,
      };
    }
    let result = -1;
    let len = this.len;
    for (let y = 0; y < len; y++) {
      for (let x = 0; x < len; x++) {
        if (pattern[y][x]) continue;
        let tmp = this.clone(pattern);
        tmp[y][x] = stepValue;
        let opp = this.bestChoice(tmp, len - stepValue);
        if (-opp.result >= result) {
          point = [x, y];
          result = -opp.result;
        }
      }
    }

    return {
      point,
      result: point ? result : 0,
    };
  }
}

let game = new TicTacToe();

game.show();
