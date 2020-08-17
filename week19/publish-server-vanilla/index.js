const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');

function getQueryParams(url, name) {
  let reg = new RegExp(`${name}=([^&]+)`);
  let matched = url.match(reg);

  return matched && matched[1];
}

// 发布普通文件
function writeByStream(req, res) {
  let filename = getQueryParams(req.url, 'filename');

  if (!filename) {
    return;
  }

  let writeStream = fs.createWriteStream('../server/public/' + filename);

  req.pipe(writeStream);
  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
  });
}

// 解压压缩包
function unzipPkg(req, res) {
  // let writeStream = fs.createWriteStream('../server/packages/package');
  let writeStream = unzip.Extract({ path: '../server/public/package' });
  req.pipe(writeStream);

  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
  });
}

const server = http.createServer((req, res) => {
  // writeByStream(req, res);
  unzipPkg(req, res);
});

server.listen(8081);
