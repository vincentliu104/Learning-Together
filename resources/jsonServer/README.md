# json Server
## 學習資源
* [使用 JSON Server 快速模擬 Restful API](https://andy6804tw.github.io/2018/02/01/json-server-intro/)
* [JSON Server 簡介](http://skyroxas.tw/rest-api-%E4%BD%BF%E7%94%A8-json-%E5%BB%BA%E7%BD%AE%E4%B8%80%E5%80%8B-fake-rest-api-%E7%9A%84%E6%9C%8D%E5%8B%99/)

## 安裝步驟
1. 安裝 JSON Server
`npm install -g json-server`
2. 新增與啟動 JSON Server 檔案
	- 建立一個 `db.json` 檔或在 terminal 鍵入 `json-server --watch db.json` 系統會自動產一個範例檔外加執行 server
	- 因為 port 號預設是 `3000`，如有要更改 port 號可新增一個 `json-server.json` 檔，裡面輸入以下方式：

	``` json
	{
	 "port": port 號
	}
	```
3. 測試 JSON Server
在瀏覽器開啟 `http://localhost:port號`，如果成功將會有 json 檔的資料
4. 在 **Postman** 做測試，以下使用 JSON Server 的範例來做示範
	- **GET (取得資料)**：
		- 選擇 `GET` 
		- 輸入 `http://localhost:3001/posts`
		- 按 `Send` 送出
	- **POST (新增資料)**：
		- 選擇 `POST`
		- 輸入 `http://localhost:3001/posts`
		- 選擇 `Body`
		- 選擇 `raw` 格式
		- 選擇 `JSON (application/json)` 格式
		- 新增 JSON 物件，ex: 
			``` json
			{
			  "id": 2,
			  "title": "My",
			  "author": "10codeing"
			}
			```
		- 按 `Send` 送出
	- **PUT (更新完整資料)**：
		- 選擇 `PUT`
		- 更新 ID 2 的完整資料，輸入 `http://localhost:3001/posts/2`
		- 選擇 `Body`
		- 選擇 `raw` 格式
		- 選擇 `JSON (application/json)` 格式
		- 要更新的 JSON 物件 (不用含 id，要包含全部欄位)
		- 按 `Send` 送出
	- **DELETE (刪除資料)**：
		- 選擇 `DELETE`
		- 刪除 ID 2 的完整資料，輸入 `http://localhost:3001/posts/2`
		- 按 `Send` 送出
