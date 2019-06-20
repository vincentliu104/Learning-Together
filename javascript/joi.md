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

## `any`

接受所有形態的 schema 物件

### `schemaType`

取得 schema 的型態

### `any.allow(...values)`

允許一個以上合法且任頤型態的值，支援 `references`

### `any.concat(schema)`

schema 型態須為相同或是 `any`，使用 `any` 時 schema 可以是任何其他 schema

### `any.default([value, [description]])`

原有值為 undefined 時，設定預設值

### `any.describe()`

同 `describe`

### `any.description(desc)`

描述用途

### `any.empty(schema)`

符合 shcema 必須為空 (`undefined`)

### `any.error(err)`

客製化覆寫 **joi** error

### `any.example(...values)`

範例，不影響驗證

### `any.failover([value, [description]])`

### `any.forbidden()`

禁止輸入

### `any.invalid(...values)` - aliases: `disallow`, `not`

黑名單

### `any.keep()`

### `any.label(name)`

變更 key 名稱

### `any.message(message)`

### `any.meta(meta)`

### `any.notes(notes)`

註解 key

### `any.optional()`

標示 key 為非必要欄位，可為 `undefined`，不可為 `null`

### `any.prefs(options)`

### `any.raw(isRaw)`

驗證結果使用未轉換的值

### `any.required()`

不允許 `undefined`

### `any.strict(isStrict)`

設定 `options.convert` 為 `false`

### `any.strip()`

驗證後把 key 從結果中移除

### `any.tags(tags)`

註解標籤

### `any.unit(name)`

註解單位

### `any.valid(value)` - aliases: `only`, `equal`

白名單

`value` 可以是任何型態，會在其他 rule 之前做匹配，支援 `references`

### `any.validate(value, [options], [callback])`

### `any.when(condition, options)`

將條件合併，轉換成 `alternatives` 型態

- `condition`: key name 或 reference 或 schema
- `options`
  - `is`: condition **joi** type，預設允許 `undefined`，可使用 `Joi.required()` 來覆寫
  - `then`: condition 為 true 時的 schema
  - `otherwise`: condition 為 false 時的 schema