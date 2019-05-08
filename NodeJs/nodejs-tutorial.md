# Node.js Tutorial

Node.js 使用 Google Chrome Javascript V8 engine，可編譯與執行 Javascript 作為 server 使用

## 安裝

<https://nodejs.org/en/download/> 內含 npm

## 使用方式

1. 編輯 `hello-node.js`
1. 由 terminal 執行指令來啟動 server `node hello-node.js`
1. output 會有 `Server running at http://127.0.0.1:3000/`
1. browser 開啟 `http://127.0.0.1:3000`

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, Node!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

## 教學

* [Express web framework (Node.js/Java​Script)](https://developer.mozilla.org/zh-TW/docs/Learn/Server-side/Express_Nodejs)