const net = require('net');
const Response = require('./Response');
const ResponseParser = require('./ResponseParser');

module.exports = class Request {
  // method, url = host = port + path
  // body: key/value
  // headers
  constructor(options = {}) {
    let {
      method = 'GET',
      host,
      port = 80,
      path = '/',
      body = {},
      headers = {},
    } = options;
    let contentType = headers['Content-Type'];

    this.method = method;
    this.host = host;
    this.port = port;
    this.path = path;
    this.body = body;

    if (!contentType) {
      contentType = 'application/x-www-form-urlencoded';
      headers['Content-Type'] = contentType;
    }

    if (contentType === 'application/json') {
      this.bodyText = JSON.stringify(this.body);
    } else if (contentType === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.entries(this.body)
        .map(([key, value]) => {
          return `${key}=${encodeURIComponent(value)}`;
        })
        .join('&');
    }

    headers['Content-Length'] = this.bodyText.length;

    this.headers = headers;
  }
  toString() {
    let headers = Object.entries(this.headers)
      .map(([key, value]) => {
        return `${key}: ${value}`;
      })
      .join('\r\n');

    return `${this.method} ${this.path} HTTP/1.1\r\n${headers}\r\n\r\n${this.bodyText}`;
  }
  send(connection) {
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser();

      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection(
          {
            host: this.host,
            port: this.port,
          },
          () => {
            connection.write(this.toString());
          }
        );
      }

      connection.on('data', (data) => {
        parser.receive(data.toString());

        if (parser.isFinished) {
          resolve(parser.response);
        }
        connection.end();
      });
      connection.on('error', (err) => {
        reject(err);
        connection.end();
      });

      connection.on('end', () => {
        console.log('disconnected from server');
        connection.end();
      });
    });
  }
};
