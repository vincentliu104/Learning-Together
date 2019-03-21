<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [HTTP](#http)
  - [HTTP status code](#http-status-code)
  - [工具](#%E5%B7%A5%E5%85%B7)
    - [查看 HTTP message](#%E6%9F%A5%E7%9C%8B-http-message)
    - [查看電腦跟網路溝通的資料](#%E6%9F%A5%E7%9C%8B%E9%9B%BB%E8%85%A6%E8%B7%9F%E7%B6%B2%E8%B7%AF%E6%BA%9D%E9%80%9A%E7%9A%84%E8%B3%87%E6%96%99)
  - [學習資源](#%E5%AD%B8%E7%BF%92%E8%B3%87%E6%BA%90)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# HTTP

網頁攻城獅的必備基礎協定(protocol)知識

## HTTP status code

status code 系列 | 說明
---------------|---
1xx | 參考資訊 (Informational)
2xx | 成功 (Successful)
3xx | 重新導向 (Redirection)
4xx | 用戶端錯誤 (Client Error)
5xx | 伺服器錯誤 (Server Error)

![http status code](https://i.imgur.com/EF3Fyff.png)

更多說明請參閱

* [HTTP 狀態碼](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status)
* [HTTP Status Codes &mdash; httpstatuses.com](https://httpstatuses.com/)
* [網頁開發人員應了解的 HTTP 狀態碼 | The Will Will Web](https://blog.miniasp.com/post/2009/01/16/Web-developer-should-know-about-HTTP-Status-Code.aspx)

## 工具

* [URL Decoder/Encoder](https://meyerweb.com/eric/tools/dencoder/)
* [Unicode Converter](https://www.branah.com/unicode-converter)

### 查看 HTTP message

* [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/network-performance/?hl=zh-tw)
* [Understanding Resource Timing](https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing)
* [Firefox Network Monitor](https://developer.mozilla.org/zh-TW/docs/Tools/Network_Monitor)
* [Fiddler](https://www.telerik.com/download/fiddler): 除了查看之外，還可以建立或修改 request

### 查看電腦跟網路溝通的資料

[Wireshark](https://www.wireshark.org/)

## 學習資源

* [HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP): 詳盡
* [HTTP | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP): 大陸用語
* [HTTP | MDN](https://developer.mozilla.org/zh-TW/docs/Web/HTTP): 翻譯不完整
* [HTTP 教學](https://notfalse.net/http-series): 圖文並茂的介紹
* [初學者都該了解的 HTTP 通訊協定基礎](https://www.slideshare.net/WillHuangTW/hypertext-transfer-protocol-77109917): HTTP 歷史與基本介紹
* [安全性和身份  |  Web  |  Google Developers](https://developers.google.com/web/fundamentals/security/)