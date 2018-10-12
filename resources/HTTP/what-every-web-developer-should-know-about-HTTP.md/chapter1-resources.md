# Chapter 1: Resources

HTTP address 是最為人所知的 web，比方說你想查關鍵字你會到 <https://google.com> 去搜尋

## Resources Locators

`<scheme>://<host>:<port>/<path>`

<https://google.com> 正是所謂的 URL(Uniform Resources Locator)，代表網路中的資源，比方說你想看新聞，你可以選擇 <https://news.google.com> 或 <https://tw.news.yahoo.com/>

URL 主要分成三個部分

1. URL scheme: 在 `://` 前方，比方說 `http`，scheme 描述的是要如何去取得資源。常見的還有 `https`, `ftp`, `mailto`
1. host: 擁有資源的電腦名稱，你的電腦會透過 DNS(Domain Name System) 轉會成網路位址(例如: IP address)
1. URL path: <https://www.google.com/search?q=url> 當中的 `/search?q=url`，www.google.com 應該要能辨認是什麼資源，並給予回應

有些 URL 會指向 host 中的檔案，例如 <https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png>，或是透過動態網頁程式語言(APS.NET, PHP等)由資料庫提供，現今多數網站會避免直接使用檔案名稱。因為 SEO 的關係，有些時候 URL 有關鍵字對於網頁排名也有幫助

## Ports, Query Strings and Fragments

`<scheme>://<host>:<port>/<path>?<query>#<fragment>`

http 預設 port 為 80(http 預設使用，可以不用出現在 url 中，開發有需求時可能會使用其他 port), https 則為 443(也不用特別註明), telnet 23

query 在問號後方，沒有一定規範，多數會使用 name/value pairs，如 name1=vale1&name2=value2，EX: <http://foo.com?first=Scott&last=Allen>

path 有區分大小寫(case-sensitive)，不過多數網站會試著讓 URL 不分大小寫(case-insensitive, Windows OS 預設)，以避免無效連結(broken links)

server 端不會處理 fragment，是給 client 用來識別特定區塊用(HTML element id)

## URL Encoding

Internet Standard 定義了不安全字元(unsafe characters, 參見 RFC3986, RFC1738)，例如：`space, #(用來分隔 fragment), ^`，如果要傳送含有不安全字元，你必須先對它做 percent encoding，通常你可以利用 API 來達成

## Resources and Media Types

host 回應 HTTP request時，除了 response 還會有 content type(media type)，利用 MIME(Multipurpose Internet Mail Extensions) 來標示 resource 類型

利用副檔名(file extension)來判斷 content type 會是最後的手段，IE  會先看 Host 所提供的 MIME type，再來會先看 response 前 200 bytes，接著才會是副檔名

```example
<primary media type>/<media subtype>
HTML: test/html
JPG: image/jpeg
GIF: image/gif
```

## Content Type Negotiation

相同 URL 可能有不同表達方式(multiple representation)，例如語言（英文、法文、德文）、文字格式（HTML, PDF, XML, plan text）

client 可以指定他想要哪種格式(Server 不一定會提供就是了...)

## 參考資料

* [URLs - SEO Best Practices](https://moz.com/learn/seo/url)
* [RFC3986](https://tools.ietf.org/html/rfc3986)
* [RFC1738](https://tools.ietf.org/html/rfc1738)
* [URL Encoding - 维基百科](https://zh.wikipedia.org/wiki/%E7%99%BE%E5%88%86%E5%8F%B7%E7%BC%96%E7%A0%81)
* [Media Types - 维基百科](https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91%E5%AA%92%E4%BD%93%E7%B1%BB%E5%9E%8B)
* [Content Type Negotiation - 维基百科](https://zh.wikipedia.org/wiki/%E5%86%85%E5%AE%B9%E5%8D%8F%E5%95%86)