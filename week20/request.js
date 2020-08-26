// 通过下方链接获取code
// https://github.com/login/oauth/authorize?client_id=Iv1.e2b4e83d62655beb&redirect_uri=http%3A%2F%2Flocalhost%3A8000&scope=read%3Auser&state=123abc

// 通过 code 获取 access_token
function getAccessToken() {
  let code = 'f6778ba4e547df97cfff';
  let state = '123abc';
  let client_secret = '8ed284ca7c9c80cdc2c4fa279956e1a14333e109';
  let client_id = 'Iv1.e2b4e83d62655beb';
  let redirect_uri = encodeURIComponent('http://localhost:8000');

  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  let xhr = new XMLHttpRequest();

  xhr.open('POST', `https://github.com/login/oauth/access_token?${params}`, true);
  xhr.send(null);

  xhr.addEventListener('readystatechange', function (event) {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText);
      // access_token=c4ab822d3b56b0965de1b568f1ce87e5a34f8de4&expires_in=28800&refresh_token=r1.3a3a0c8ec9bde525d5a00e88a024456500e28d0c493ae7a88a170fea3f0ad51b513a4566720f87b8&refresh_token_expires_in=15897600&scope=&token_type=bearer
    }
  });
}

// 通过 access_token 获取用户信息
function getUserInfo() {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', `https://api.github.com/user`, true);
  xhr.setRequestHeader('Authorization', 'token c4ab822d3b56b0965de1b568f1ce87e5a34f8de4');
  xhr.send(null);

  xhr.addEventListener('readystatechange', function (event) {
    if (xhr.readyState === 4) {
      console.log(xhr.responseText);
    }
  });
}
