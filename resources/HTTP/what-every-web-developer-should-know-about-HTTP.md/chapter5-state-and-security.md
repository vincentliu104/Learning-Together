# Chapter 5: State and Security

HTTP 該注意的安全事項，包含辨認 user、HTTP authentication 運作方式，某些情境會需要 HTTPS、HTTP state management

## The Stateless yet Stateful Web

HTTP 是無狀態協定(stateless protocol)，每個 request-response 之間都是獨立的，也就是 server 不用保存 client 發出的 request，server 只需要知道如何針對 request 做出 response

某些 HTTP 是有狀態的(stateful)，例如網路銀行需要你登入後，才能查看你的帳戶資料，或是註冊新的銀行帳戶時，需要經過 3 個步驟的檢核

web application 儲存狀態的選項

1. 將狀態存放在 resource 中，通常是短期的狀態，例如隱藏的 input 欄位(較為複雜的程式設計)
1. 將狀態存放在 server，通常是長期的狀態，存放在資料庫、檔案或呼叫 web service 處理，例如客戶的姓名、email、住址

早期 server 會透過 IP 來辨認使用者，不過有些裝置會在 Network Address Teanslation(NAT) 背後，所以會有多個 user 使用同個 IP 的狀況，所以使用 IP 來辨認使用者是不可靠的