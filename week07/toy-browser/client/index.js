const Request = require('./Request');
const parser = require('./parser');
const render = require('./render');
const images = require('images');

// HTTP/1.1 200 OK
// Content-Type: text/plain
// X-Foo: bar
// Date: Tue, 12 May 2020 14:58:20 GMT
// Connection: keep-alive
// Transfer-Encoding: chunked

// 2
// ok
// 0

void (async function () {
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: 8088,
    path: '/',
    headers: {
      'X-Test': 'test',
    },
    body: {
      name: 'winter',
    },
  });

  // console.log(request.toString());
  let response = await request.send();
  let dom = parser.parseHTML(response.body);
  console.log('--------------dom-----------------')
  console.log(JSON.stringify(dom))

  let viewport = images(800, 600);
  render(viewport, dom);
  viewport.save('viewport.png');

  // let response = await request.send();

  // console.log(response);
})();
/* const client = net.createConnection(
  {
    host: '127.0.0.1',
    port: 8088,
  },
  () => {
    // 'connect' listener.
    console.log('connected to server!');
    let request = new Request({
      method: 'POST',
      host: '127.0.0.1',
      post: 8088,
      path: '/',
      body: {
        name: 'winter',
      },
    });

    client.write(request.toString())

    // client.write('POST / HTTP/1.1\r\n');
    // client.write('Host: 127.0.0.1\r\n');
    // client.write('Content-Type: application/x-www-form-urlencoded\r\n');
    // client.write('Content-Length: 11\r\n\r\n');
    // client.write('name=winter');
  }
);
client.on('data', (data) => {
  console.log('-------------------');
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
  client.end();
});
client.on('error', (e) => {
  console.log('request error');
  console.log(e);
  client.end();
}); */
