<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Chapter 4: Web Architecture](#chapter-4-web-architecture)
  - [Resource Redux](#resource-redux)
    - [URL 做不到的事](#url-%E5%81%9A%E4%B8%8D%E5%88%B0%E7%9A%84%E4%BA%8B)
  - [The Visible Protocol - HTTP](#the-visible-protocol---http)
  - [Adding Value](#adding-value)
  - [Proxies](#proxies)
  - [Caching](#caching)
    - [response message 範例](#response-message-%E7%AF%84%E4%BE%8B)
  - [參考資料](#%E5%8F%83%E8%80%83%E8%B3%87%E6%96%99)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Chapter 4: Web Architecture

建構應用程式及 web service 處理資源該注意的事項

## Resource Redux

別把資源侷限在實體檔案(js, css, images)，可以把他想像的更具有意義，例如：SHE演場會的搜尋結果、選手 XXX 的體檢報告

### URL 做不到的事

* URL 不能限制 client 或 server 所使用的技術
* URL 不能限制 server 存儲資源的技術（可能是檔案、DB、web service等等）
* URL 不能限制資源的呈現方式(user 可透過 header `Content-Type` 表示，有可能是 XML、JSON等等)
* URL 不能限制 user 想對取得的資源做些什麼事

## The Visible Protocol - HTTP

URL + HTTP 的好處 = 擴展性、簡單、可靠、低耦合

## Adding Value

HTTP message 傳遞時可能會經過多個軟硬體並與其互動

web server software

* 傳送資料時查看 URL, host header
* 在本地紀錄 message
* 修改 message，例如 server 得知 client 端支援 gzip 壓縮時，就可以降低網路傳輸量

## Proxies

介於 client 與 server 之間的電腦

* `forward proxy`: 通常靠近 client 端
  * 擋住不讓你上 FB, PTT, Dropbox
  * 移除 referer header 中的機敏訊息(指向公司內部網路的資源)
  * access control proxy: 可記錄所有 HTTP message
* `reverse proxy`: 靠近 server 端，壓縮 response message，以減輕 server 的負擔
* `load balancing`: 使用 round-robin 看哪台 server 有空處理
* `SSL acceleration`
  * 加解密 HTTP message
  * 過濾危險 HTTP message，如 XSS, SQL Injection
* `Caching proxies`: 儲存最常用的資源作為快取資源

proxy 不一定會是台 server，可能是 OS, browser 功能

## Caching

用來優化效能及擴展性

當有多個 request 請求相同資源時，server 可以一一回覆，或者透過 proxy 或 client 端快取，減少時間及頻寬用量

* `public cache` - user 共享 proxy server 上的資源
  1. forward proxy 存放群體中熱門的資源
  1. reverse proxy 存放網站上熱門資源，例如：logo
* `private cache` - 針對單一 user，例如：browser 會存放快取資源在硬碟中
  * Internet Explorer(IE): `Temporary Internet Files`
  * Google Chrome: `about:config`

HTTP 1.1 中，當 response message 的 status code 為 200 時，HTTP GET request 預設都會快取

應用程式可透過以下 header 控制

* `Cache-control`
  * public: proxy server 可以快取
  * private: 只有 user 的 browser 可以快取
  * no-cache: message 可能含有機敏資料，browser 不應該快取它，或是快取後應儘早移除 message
  * max-age: server 可以指定快取可以存活多久（秒）
* `Expires`: 酸然很常見，但是 HTTP 1.1 已經把不建議使用(deprecating)
* `Pragma`: 為了向下相容

### response message 範例

client 可發送 `If-Modified-Since` 問 server 資源是否需要重新取得，如果 server 回傳 `Not Modified`(304) 代表資源並未變更

```sample
HTTP/ 1.1 200 OK

Last-Modified: Wed, 25 Jan 2012 17: 55: 15 GMT

Expires: Sat, 22 Jan 2022 17: 55: 15 GMT

Cache-Control: max-age = 315360000, public
```

server response 304，資源未變更 client 可以使用快取的資源

```sample
HTTP/ 1.1 304 Not Modified

Expires: Sat, 22 Jan 2022 17: 16: 19 GMT

Cache-Control: max-age = 315360000, public
```

`ETag` 的值並不具任何意義(可能是 timestamp, GUID, 針對 resource hash 值) 與 If-Modified-Since 有相同的用途

```sample
HTTP/ 1.1 200 OK

Server: Apache

Last-Modified: Fri, 06 Jan 2012 18: 08: 20 GMT

ETag: "8e5bcd-59f-4b5dfef104d00"

Content-Type: text/ xml

Vary: Accept-Encoding

Content-Encoding: gzip

Content-Length: 437
```

## 參考資料

[Architectural Styles and the Design of Network-based Software Architectures](https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)