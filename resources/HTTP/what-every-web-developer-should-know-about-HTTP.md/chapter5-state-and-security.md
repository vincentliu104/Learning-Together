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

TODO

#### Types of Cookies

TODO

#### Cookie Paths & Domain

TODO

#### Cookie Downsides

TODO

## Authentication

TODO

### Basic Authentication

TODO

### Digest Authentication

TODO

### Windows Authentication

TODO

### Forms-bases Authentication

TODO

### OpenId and OAuth

TODO

## Secure HTTP

TODO

## 延伸閱讀

* [RFC6265](https://tools.ietf.org/html/rfc6265)