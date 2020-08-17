const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const archiver = require('archiver');

// 发布文件
function publishFile() {
  const postData = querystring.stringify({
    content: 'Hello World',
  });

  const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=pub.html',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

// 发布文件流
function publishStream() {
  let filename = './cat.jpg';
  fs.stat(filename, (error, stat) => {
    const options = {
      host: 'localhost',
      port: 8081,
      path: '/?filename=cat.jpg',
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': stat.size,
      },
    };

    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    });

    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });

    let readStream = fs.createReadStream('./cat.jpg');
    readStream.pipe(req);
    readStream.on('end', () => {
      req.end();
    });
  });
}

// 发布压缩包
function publishZip() {
  let packname = './package';
  const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  let archive = archiver('zip', {
    zlib: { level: 9 },
  });
  archive.directory(packname, false);
  
  // archive.pipe(fs.createWriteStream('./package.zip'));
  archive.finalize(); // 打包

  archive.pipe(req);
  archive.on('end', () => {
    req.end();
  });
}

// publishFile();
// publishStream();
publishZip();
