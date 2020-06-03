const http = require('http');

// Returns content-type = text/plain
const server = http.createServer((req, res) => {
  console.log('request received');
  console.log(req.headers);

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.end('ok');
  res.end(
`<html maaa=a >
<head>
<style>
.container {
  display: flex;
}
.one {
  width: 30px;
  height: 30px;
  background-color: red;
}
.two {
  width: 30px;
  height: 30px;
  background-color: green;
}
.third {
  width: 30px;
  height: 30px;
  background-color: blue;
}
</style>
</head>
<body>
  <div class="container">
    <div class="one"></div>
    <div class="two"></div>
    <div class="third"></div>
  </div>
</body>
</html>`)
});

server.listen(8088);
