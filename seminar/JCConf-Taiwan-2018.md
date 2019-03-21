# JCCONF 2018

## 打造團隊專屬的 Spring Initializr - Jiayun Zhou

Run Spring Initializr Application

* Heroku

可在 Heroku 上進行自己所設計的 Spring Initializr 的佈署，且可與 Github 連動，
決定要用哪個Repo、Branch進行佈署

`Application.yml`

在 Spring Initializr 頁面上初始化的選項，可以在這邊調整

可以設定各 Artifact 的值

[投影片 - 打造團隊專屬的 Spring Initializr](https://www.slideshare.net/jiayuntw/spring-initializr-jcconf-2018)

[jiayun/initializr-jcconf2018](https://github.com/jiayun/initializr-jcconf2018)

## 那些大家常忽略的 Cache-Control - kewang

**~~工商~~** 旅遊APP Funliday (粉紅色小蝸牛)

Client 在呼叫 Server 拿資料時，有時會讓Server做多餘的DB存取，因此需要快取控制

**Header**

HTTP CacheControl

`-no-cache` 先問server再決定要不要用快取

`-no-store` 完全不使用快取

`max-age` - 資料新鮮度

**Cache control header**

`last-modified` (header)

`if-modified-since` (Header)

`ETag` 此次傳輸資料的Hash值

其中 `ETag` 可用來判斷是否停止此次的Response

`if-none-match` (Header)

Client 發送時，根據 max-age 決定是否傳送 ETag

Server 可根據收到的 ETag 與否，決定要要回什麼 status code (304 or 200)

**hash map**

 存取已經拿過的資料，如果此次請求要的資料 `Ex.cache.get{key}` 有在 hash map 內 則不從DB內拿

**紀錄快取的指標**

maximumSize 可存幾個快取

weigher & maximunWeight 權重

expireAfterAccess 幾分鐘後失效

...

工具:

[Zookeeper](https://zookeeper.apache.org/releases.html)

學習資源:

[HTTP Caching MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)

[循序漸進理解 HTTP Cache 機制](https://blog.techbridge.cc/2017/06/17/cache-introduction/)

[投影片 - 那些大家常忽略的 Cache-Control](https://www.slideshare.net/kewang/cachecontrol)

[kewang/cache-control-boilerplate](https://github.com/kewang/cache-control-boilerplate)