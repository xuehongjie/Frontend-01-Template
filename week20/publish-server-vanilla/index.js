const http = require('http');
const https = require('https');
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
  let writeStream = unzip.Extract({ path: '../server/public/package' });
  req.pipe(writeStream);

  req.on('end', () => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
  });
}

function auth(req, res) {
  let code = getQueryParams(req.url, 'code');
  let state = 'abc123';
  let client_secret = '8ed284ca7c9c80cdc2c4fa279956e1a14333e109';
  let client_id = 'Iv1.e2b4e83d62655beb';
  let redirect_uri = encodeURIComponent('http://localhost:8001/auth');

  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
  let url = `https://github.com/login/oauth/access_token?${params}`;

  const options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    methods: 'POST',
  };

  const request = https.request(options, (response) => {
    response.on('data', (d) => {
      console.log('d', d.toString());

      let token = getQueryParams(d.toString(), 'access_token');
      let headers = {
        'Content-Type': 'text/plain',
      };
      let result = 'error';
      if (token) {
        headers['Content-Type'] = 'text/html';
        headers.access_token = token;
        // result = 'ok';
        result = `<a href="http://localhost:8080/publish?token=${token}">publish</a>`;
      }
      res.writeHead(200, headers);
      res.end(result);
    });
  });

  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
}

function getUserInfo(req, res) {
  let { token } = req.headers;
  console.log('get user info token', token);
  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/user',
    method: 'GET',
    headers: {
      Authorization: `token ${token}`,
      'User-Agent': 'jay-publish-server',
    },
  };

  const request = https.request(options, (response) => {
    let body = '';
    response.on('data', (d) => {
      body += d.toString();
    });
    response.on('end', (d) => {
      let user = JSON.parse(body);
      console.log(user);
      // 权限检查
      // ...
    });
  });
}

const server = http.createServer((req, res) => {
  // writeByStream(req, res);
  // unzipPkg(req, res);

  // 匹配到授权路径
  if (req.url.match(/^\/auth/)) {
    return auth(req, res);
  }

  // 没有匹配到路径
  if (!req.url.match(/^\/?/)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });

    res.end('not found');
    return;
  }
  // unzipPkg(req, res);
});

server.listen(8081);
