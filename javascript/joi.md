# [物件驗證器 Joi](https://github.com/hapijs/joi)

前後端都可以利用

## 安裝

```shell
npm install --save @hapi/joi
```

## 驗證功能 `validate(value, schema, [options], [callback])`

- value: 需要被驗證的欄位值
- schema: 驗證規則，可以是 **joi** 形態的物件，或利用 key 對應多個 **joi** 形態的物件
- options: 選項物件
  - abortEarly: 首次遇到錯誤時，要不要停止驗證，預設是 `true`
  - context: 參考外部資料時使用
- callback

沒用到 callback 時，`validate` 會回傳類似 Promise 的物件，可當作 promise 來使用

## `ValidationError`

驗證錯誤時，由 `assert` 所拋出

## `compile(schema)`

將 schema 定義轉換成 joi 物件

## `describe(schema)`

回傳 joi schema 的內部設定，可以協助 debug

## `assert(value, schema, [message], [options])`

驗證錯誤時會拋出例外

## attempt(value, schema, [message], [options])

沒錯時回傳 value，驗證錯誤時會拋出例外

## `ref(key, [options])`

可用來參考 key 所對應的值

## `isRef(ref)`

判斷是否為參考，後處理錯誤訊息時會有幫助

## `template(template, [options])`

## `isSchema(schema)`

判斷參數是否為 **joi** schema

## `reach(schema, path)`

依據 `path` 取得部份的 schema

## `defaults(fn)`

## `bind()`

## `extend(extension)`

客製化
