const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process');

// 获取字符串里的参数
function getQueryParams(url, name) {
  let reg = new RegExp(`${name}=([^&]+)`);
  let matched = url.match(reg);

  return matched && matched[1];
}

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
function publishZip(options = {}) {
  let packname = './package';
  const defaultOptions = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  };

  const req = http.request(
    {
      ...defaultOptions,
      ...options,
    },
    (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    }
  );

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
    console.log('publish success!!');
    server.close();
  });
}

// 通过授权发布
function publishByAuth() {
  let redirect_uri = encodeURIComponent('http://localhost:8081/auth');
  let client_id = 'Iv1.e2b4e83d62655beb';
  let scope = encodeURIComponent('read:user');
  let url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=123abc`;

  console.log(url);
  child_process.exec(`cmd /c start ${url}`);
  const server = http.createServer((req, res) => {
    console.log(req.url);
    let token = getQueryParams(req.url, 'token');
    console.log('real publish');
    const options = {
      host: 'localhost',
      port: 8081,
      path: `/?filename=package.zip`,
      method: 'POST',
      headers: {
        token,
        'Content-Type': 'application/octet-stream',
      },
    };

    publishZip(options);
  });
  server.listen(8080);
}

// publishFile();
// publishStream();
// publishZip();

publishByAuth();
