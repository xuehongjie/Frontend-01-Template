# 浏览器工作原理

## 输入 URL 到加载完页面发生了什么

1. 输入 URL 发起 HTTP 请求
2. 获取 HTML 代码进行解析
3. 给解析后的 DOM 增加 CSS 规则
4. 拿到有 CSS 规则的 DOM 树进行排版
5. 将带位置的 DOM 树进行渲染
6. 得到一个 Bitmap

## ISO-OSI 七层网络模型

- HTTP, require('http')
  - 应用
  - 表示
  - 会话
- TCP, require('net')
  - 传输
- Internet
  - 网络
- 4G/5G/WIFI
  - 数据链路
  - 物理层

## TCP 与 IP 的基础知识

- TCP
  - 流
  - 端口
  - require('net')
- IP
  - 包
  - IP 地址
  - libnet/libpcap

## Http

### Request

- HTTP：请求协议
- method：请求方式
  - GET
  - POST
  - OPTIONS
  - PUT
  - DELETE
  - TRACE
  - CONNECT
- Path：请求路径
- headers：请求头，Content-Type 和 Content-Length必须要有
  - Content-Type
  - Content-Length

### Response
