# Chapter 3: Connections

網路路通信(Network Communication)有分很多層級，每一層都有它所負責的工作項目

* application layer: web browser(Chrome, Firefox), web server(IIS Apache)，兩端應用程式透過 HTTP 發送及收受 message 來溝通
* Transportation layer
  * 大多數的 HTTP 都是透過 TCP(TCP: Transmission Control Protocol) 傳輸
  * browser 透過 URL 解析出的 host, port 開啟 TCP socket，並開始寫入資料
  * TCP(reliable protocol) 保證 client 所發出的請求會送到 server(error detection)
  * flow control algorithm,: 確保 client 不會把資料送的太快
* Network layer
  * Internet Protocol(IP): 每個裝置都需要有 IP address
  * 透過 switchers, routers, gateways, repeaters, otherdevices 將資訊在網路間傳送
  * 將資訊拆分成 packets(datagrams)，透過分割(fragmenting)、重組(reassembling)優化網路
* Data link layer
  * 電纜、光纖、cabel、wireless network、衛星
  * 通常會是 Ethernet，用來傳送 1, 0 的訊號（electromagnetic signal）

最後送到網路卡，以上順序就會倒過來處理

## Parallel Connections

IE6 遵守 HTTP 1.1，同一個 host 最多同時只允許 2 個連線，當時許多網站會將網站放在 Domain A，圖片放在 Doamin B，就可以同時使用 4 個連線

目前瀏覽器支援同時 6 個連線

## Persistent Connections

古早的瀏覽器在用完連線後就會把它關閉（Stateless Connection），HTTP 1.1 建議預設使用 persistent connection，瀏覽器會有開啟中的 socket 後續可使用。Apache 預設 idle ５秒後關閉

通常 server 會設定最大可連線數，可用來防範 DoS(Denial of Service) 攻擊

## Pipelined Connections

未來的規範：client 還沒收到回應前可在一個連線中包含多個 HTTP request

## 工具

* [Wireshark · Go Deep.](https://www.wireshark.org/): 可以查看電腦跟網路溝通的資料