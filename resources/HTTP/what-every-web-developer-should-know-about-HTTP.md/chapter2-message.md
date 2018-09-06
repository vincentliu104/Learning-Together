# Chapter 2: Messages

主要介紹 HTTP 傳遞中的 message type, HTTP header, status code，了解這些可以幫助在你開發時，回應正確型態的訊息，也能幫助你發現問題與 debug

## Requests and Responses

HTTP 為 request-and-response protocol，在一個 HTTP transaction 中交換以下兩種 message types

1. HTTP request: client 發送格式化的訊息給 server，請求資源
2. HTTP response: server 回給 client

## 原始 Requests and Responses

message 是 plain ASCII test，並經過 HTTP 標準格式化

示範指令如下

```shell
# 使用 telnet 連接到 www.odetocode.com 80
telnet www.odetocode.com 80

# 取得 / 路徑資源，並使用 HTTP 1.1
GET / HTTP/1.1

# HTTP 1.1 必要資訊，協助 web server 將 request 發送給正確的 web application，他們可能會在同一個 server
host: www.odetocode.com
```

![sample](https://i.imgur.com/gAeT1Sm.png)

## HTTP Request Methods

每個 request message 都必須包含 HTTP method，最常用的是 GET(取得資源), POST(有資料要送給 server，做新增或修改)

1. safe HTTP method: GET 只應該取得資源，而非異動資源，重整網頁是安全的
2. not safe HTTP method: POST 通常會改變 server 上的資源，重整網頁是不安全的，通常瀏覽器(web browser)會有提示訊息。常用方法會是 POST/Redirect/GET(PRG) pattern

常見的 HTTP methods

method | 說明
-------|------------
GET | 取得資源
PUT | 儲存資源
DELETE | 移除資源
POST | 更新資源
HEAD | 取得資源的 headers 或 metadata

### Common Scenario - GET

使用者點擊連結

```javascript
<a href="https://www.google.com/">Google</a>
```

### Common Scenario - POST

建立帳號的 from 表單

```shell
POST http://servername.com/account/create / HTTP/1.1
host: servername.com

firstName=Vincent&lastName=Liu
```

常見回應方式

1. 顯示 POST request 的結果，但是假設在註冊完成時重整網頁可能會導致重複註冊
2. 回應 redirect message，再用 safe GET request 呈現結果
3. 回應 error 或 redirect 到 error 頁面

### Search Scenario

google 搜尋關鍵字，URL 可以加入書籤或在社交平台上分享

```shell
telnet www.google.com.tw 80
GET /?q=i+love+google HTTP/1.0
host: www.google.com.tw

telnet www.google.com 80
GET /?q=i+love+google HTTP/1.0
host: www.google.com
```

### 小提醒

多數的 modern web application 不會直接將實體檔案路徑在 URL  中使用，可透過讀取檔案、撈取資料庫來提供，例如上述的 /account/create 就是虛擬並不存在的資源

## HTTP Request Headers

格式

```sample
[method] [URL] [version]

[headers]

[body]
```

HTTP Header | 說明
------------|---
Host | HTTP 1.1 中是必要的
Date | message 建立時間，必須遵守 RFC822
Referer | 點擊連結時，client 可將目前連結帶入
User-Agent | client 端使用的軟體，例如: Chrome, Firefox
Accept | user-agent 所接受的 media type，用來作 content negotiation
Accept-Language | user-agent 偏好的語言。q(quality value): 喜好程度預設為 1.0 ，範圍介於 0 ~ 1.0
Cookie | 儲存在 client 端，協助 server 追蹤或識別使用者
If-Modified Since | user-agent 上次取用資源的時間

範例

```shell
GET http://odetocode.com/Articles/741.aspx HTTP/1.1 

Host: odetocode.com

Accept-Language: en-US,en;q=0.8

Accept: text/html, application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8

Date: Fri, 9 Aug 2014 21: 12: 00 GMT

Referer: http://www.google.com/url?&q=odetocode

User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64)Chrome/16.0.912.75 Safari/535.7
```

## 參考資料

* [RFC822](https://tools.ietf.org/html/rfc822)