#

## 创建 GitHub App

1. settings -> development settings -> GitHub App -> New GitHub App
2. 输入 GitHub App name
3. Homepage URL 输入http://localhost
4. 去掉 Webhook 的 active 选项

## 获取 github 的 access_token

1. 获取通过 GitHub App 的信息获取 code
   ```
   let clientId = '';
   let uri = encodeURIComponent('');
   window.open(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${uri}&scope=read%3Auser&state=123abc`);
   ```
2. 在服务器端运行代码通过 code 获取到 access_token

## node 唤起浏览器

- Mac: `open 'https://www.baidu.com'`
- Linux: `x-www-browser 'https://www.baidu.com'`
- Windows: `cmd /c start https://www.baidu.com`
