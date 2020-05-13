const TrunkedBodyParser = require('./TrunkedBodyParser');

module.exports = class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = '';
    this.headers = {};
    this.headerName = '';
    this.headerValue = '';

    this.bodyParser = null;
  }

  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }

  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished;
  }

  get response() {
    // 正则匹配
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join(''),
    };
  }

  receiveChar(char) {
    switch (this.current) {
      case this.WAITING_STATUS_LINE:
        if (char === '\r') {
          this.current = this.WAITING_STATUS_LINE_END;
        } else {
          this.statusLine += char;
        }
        break;
      case this.WAITING_STATUS_LINE_END:
        if (char === '\n') {
          this.current = this.WAITING_HEADER_NAME;
        }
        break;
      case this.WAITING_HEADER_NAME:
        if (char === ':') {
          this.current = this.WAITING_HEADER_SPACE;
        } else if (char === '\r') {
          this.current = this.WAITING_HEADER_BLOCK_END;
          if (this.headers['Transfer-Encoding'] === 'chunked') {
            this.bodyParser = new TrunkedBodyParser();
          }
        } else {
          this.headerName += char;
        }
        break;
      case this.WAITING_HEADER_SPACE:
        if (char === ' ') {
          this.current = this.WAITING_HEADER_VALUE;
        }
        break;
      case this.WAITING_HEADER_VALUE:
        if (char === '\r') {
          this.current = this.WAITING_HEADER_LINE_END;
          this.headers[this.headerName] = this.headerValue;
          this.headerName = '';
          this.headerValue = '';
        } else {
          this.headerValue += char;
        }
        break;
      case this.WAITING_HEADER_LINE_END:
        if (char === '\n') {
          this.current = this.WAITING_HEADER_NAME;
          // this.headers[this.headerName] = this.headerValue;
        }
        break;
      case this.WAITING_HEADER_BLOCK_END:
        if (char === '\n') {
          this.current = this.WAITING_BODY;
        }
        break;
      case this.WAITING_BODY:
        this.bodyParser.receiveChar(char);
        break;
    }
  }
};
