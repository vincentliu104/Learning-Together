# Chapter 5: State and Security

HTTP 該注意的安全事項，包含辨認 user、HTTP authentication 運作方式，某些情境會需要 HTTPS、HTTP state management

## The Stateless yet Stateful Web

HTTP 是無狀態協定(stateless protocol)，每個 request-response 之間都是獨立的，也就是 server 不用保存 client 發出的 request，server 只需要知道如何針對 request 做出 response

某些 HTTP 是有狀態的(stateful)，例如網路銀行需要你登入後，才能查看你的帳戶資料，或是註冊新的銀行帳戶時，需要經過 3 個步驟的檢核

web application 儲存狀態的選項

1. 將狀態存放在 resource 中，通常是短期的狀態，例如隱藏的 input 欄位(較為複雜的程式設計)
1. 將狀態存放在 server，通常是長期的狀態，存放在資料庫、檔案或呼叫 web service 處理，例如客戶的姓名、email、住址

早期 server 會透過 IP 來辨認使用者，不過有些裝置會在 Network Address Teanslation(NAT) 背後，所以會有多個 user 使用同個 IP 的狀況，所以使用 IP 來辨認使用者是不可靠的

## Identification and Cookies

網站通常會用 HTTP header ，存放獨特的識別碼在 cookie(參閱 RFC6265 - HTTP State management) 來追蹤 user

cookie 的限制

1. 無法認證(authenticate) user
1. user 可能會停用 browser cookie
    * cookieless session: 把 user 識別碼放在 URL，但會導致 URL 變胖(fat URL)

## Setting Cookie

網站會在 HTTP response 用 `Set-Cookie` header，賦予 user cookie

範例

```sample
HTTP/1.1 200 OK

Content-Type: text/html; charset=utf-8

Set-Cookie: firstName=Vincent&lastName=Liu; domain=.mywebsite.com; path =/
```

### cookie 資訊

#### name-value pair

* 大小限制: 4KB
* server 不能信任任何 client 端的資料，除非有加密過。當然你還要去驗證他

```sample
HTTP/1.1 200 OK

Set-Cookie: GUID=1234; domain=.msn.com; path=/
```

假設你在 cookie 存放簡單的資料，是很好駭的，所以通常要讓普通人看不出他是什麼

```sample
Set-Cookie: ASP.NET_SessionId=en5yl2yopwkdamv2ur5c3z45; path=/; HttpOnly
```

#### HttpOnly Cookies

cross-site scripting attack(XSS)，駭客可能會將惡意的 Javascript 注入到網站中，其他 user 的 cookie 資訊會被攥改、查看、竊取

解決方式是在 Set-Cookie 時使用 `HttpOnly` flag，瀏覽器看到這個 flag 就不會讓你使用 Javascript 來操作 cookie，只會在每個 HTTP request message 的 header 中傳遞

#### Types of Cookies

* Session cookie: 瀏覽器關閉後就會被消滅
* Persistent cookie: 瀏覽器會把 cookie 存在 disk

這兩種 cookie 差異之處在於 persistent cookie 需要設定到期時間(expires)

```sample
Set-Cookie: name=value; expires=Monday, 09-July-2017 21:12:00 GMT
```

#### Cookie Paths & Domain

在特定 domian 設定的 cookie，只會在該 domain 中傳遞。這是考量到安全性及隱私，例如在 amazon.com 設定的 cookie，定不會傳遞到 google.com

application 可透過 `domain`, `path` 屬性來控制 cookie 可使用的範圍

```sample
HTTP/1.1 200 OK

Set-Cookie: name=value; domain=.server.com; path=/stuff
```

`domain` 讓 cookie 的範圍可以擴展到子網域(sub-domain)

* www.server.com: 僅在 `www.server.com` 傳遞
* server.com: 傳遞範圍包括 `help.server.com`, `images.server.com`, `server.com`...

如果你在 `www.server.com` 要設定 cookie doamin 為 `.microsodt.com`，這不會被允許的，瀏覽器會拒絕

`path` 屬性可限制 cookie 僅在特定資源路徑中，如上所示cookie 可傳遞的 path 可為`/stuff`，或是 /stuff 底下的資源 `/stuff/images`

#### Cookie Downsides

1. cookie 會受到 XSS 攻擊
1. 廣告商使用 third-party cookies(cookie domain 與 URL domain 不同)) 來追蹤使用者

server.com 利用 `<script>` 載入 advertising.com 的資源，advertising.com 就可以記錄 user 在 server.com 的操作行為，如果很多網站都使用 advertising.com，她就可以用來分析 user 的行為了

有很多裝置可以監聽或攔截 HTTP traffic，所以要避免使用 cookie 儲存機敏資訊

## Authentication

user 要取用特定資源時，server 會要求他通過認證後才能取得，通常會需要 user 提供 credential，例如：帳號、密碼、email等等

### Basic Authentication

client 請求資源，先發送 HTTP message

```sample
GET http://localhost/html/html5/ HTTP/1.1

Host: localhost
```

server 限制 /html5/ 僅特定 user 可查看，他將會發起 authentication challenge

```sample
HTTP/1.1 401 Unauthorized

WWW-Authenticate: Basic realm="localhost"
```

401 表示 user 未經認證，`WWW-Authenticate` 要求 user 提供 credential 後再重試，`realm` 屬性是給予 user 的說明文字，接下來會有 UI 讓 user 輸入 credential，再發 request 給 server

```sample
GET http://localhost/html/html5/ HTTP/1.1

Authorization: Basic bm86aXdvdWxkbnRkb3RoYXQh
```

`Authorization` header value 為 client 帳號及密碼 base64 encode。Basic Authentication 預設是不安全的，只要有人使用 base64 decoder 解密你的 message 就可以偷走你的帳號及密碼，所以 basic authentication 通常會搭配 HTTP Secure

### Digest Authentication

Basic Authentication 的改良版，server 會提供 client 一次性的 MD5 hash 隨機碼(nonce)，避免重送攻擊

```sample
HTTP/1.0 404 Unauthorized

WWW-Authenticate: Digent realm="localhost", qop="auth,auth-int", nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093", opaque="5ccc069c403ebaf9f0171e9517f40e41"
```

### Windows Authentication

微軟產品的認證協定，不常見不多作介紹

```sample
HTTP/1.0 404 Unauthorized

WWW-Authenticate: Negotiate
```

### Forms-bases Authentication

頗受歡迎的非標準認證方式，許多 web framework 會提供支援

通常會把 user 302 redirect 到登入頁，user request 的 URL 可能會附加在 query string 中，當 user 登入後，Application 就可以把 user redirect 到他想去的頁面

```smaple
HTTP/1.1 302 Found

Location: /Login.aspx?ReturnUrl=Admin.aspx
```

因為 user credential 會明碼傳遞，所以只有在 HTTP Secure 下才是安全的

```sample
HTTP/1.1 302 Found

Location: /admin.aspx

Set-Cookie: .ASPXAUTH=9694BAB... path=/; HttpOnly
```

多數的 authentication cookie 會用加密及 hash，避免被竄改

會受歡迎是因為 Application 可控制登入的體驗及 credential 驗證

### OpenId and OAuth

TODO

## Secure HTTP

TODO

## 延伸閱讀

* [RFC6265](https://tools.ietf.org/html/rfc6265)