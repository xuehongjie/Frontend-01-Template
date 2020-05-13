module.exports = class TrunkedBodyParser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;
    this.length = 0;
    this.content = [];
    this.isFinished = false;

    this.current = this.WAITING_LENGTH;
  }

  receiveChar(char) {
    switch (this.current) {
      case this.WAITING_LENGTH:
        if (char === '\r') {
          if (this.length === 0) {
            this.isFinished = true;
          } else {
            this.current = this.WAITING_LENGTH_LINE_END;
          }
        } else {
          this.length *= 10;
          this.length += char.charCodeAt(0) - '0'.charCodeAt(0);
        }
        break;
      case this.WAITING_LENGTH_LINE_END:
        if (char === '\n') {
          this.current = this.READING_TRUNK;
        }
        break;
      case this.READING_TRUNK:
        this.content.push(char);
        this.length--;
        // 长度读完了进入新状态
        if (this.length === 0) {
          this.current = this.WAITING_NEW_LINE;
        }
        break;
      case this.WAITING_NEW_LINE:
        if (char === '\r') {
          this.current = this.WAITING_NEW_LINE_END;
        }
        break;
      case this.WAITING_NEW_LINE_END:
        if (char === '\n') {
          this.current = this.WAITING_LENGTH;
        }
        break;
    }
  }
};
