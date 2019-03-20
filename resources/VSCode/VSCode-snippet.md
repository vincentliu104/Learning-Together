# snippet 使用教學

snippet: 自訂程式碼片段，snippet 的功能可以讓我們透過自訂的縮寫，就快速產出一連串的程式法片段。這樣的程式碼片段一般會把它稱作 snippet

目的: 提升工作效率，減少寫錯(type error)機會

參考: https://pjchender.blogspot.com/2017/04/vs-code-snippet.

## 設定

1. File > Preferences > User > Snippets
   ![開啟設定](https://i.imgur.com/OT8OQhO.jpg)
1. 選擇要適用的語言，以 Javascript 為例( react 還獨立於 js 多一個type: javascriptreact)，另外 markdown 這個不能用
1. 編輯的方式是 JSON 資料格式
    1. [snippet generator](https://snippet-generator.app/?description=&tabtrigger=&snippet=&mode=vscode)  
    1. `$0`: 代表游標的位置

## 範例

以 coldfusion 為例

Step1): 開啟 cfml.json，輸入

```json
    "是否為合法變數名稱，return boolean": {
        "prefix": "publicFun_isValidVar",
        "body": [
          "publicFun_isValidVar($0)"
        ],
        "description": "是否為合法變數名稱，return boolean"
      }
```

Step2):
![snippetRemind](https://i.imgur.com/GF0C3H2.jpg)
Step3):
![snippetResult](https://i.imgur.com/40bq3Xx.jpg)