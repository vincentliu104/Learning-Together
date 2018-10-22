# The Modern Implementation of Tags to Script

紀錄基本的使用，coldfusion 有直些使用 cftag 的用法 與 cfscript 的用法，guide line 的原則是使用 cftag，原因為 cfscript 與 js 的用法很類似，所以 cftag 的方式對於維護來說比較不容易混淆

## Comment

1. `Comments`

hot keys: `alt + shift + a`, `ctrl + /`，兩個有不同的形式

- 左右的 dash 各為 3 個，雖然 2 個也會有同樣的效果，也是存在用 `<!---  --->`的形式作為判斷的 code ，因此請注意一定要左右 各為 3 個 dash，以免踩到其他 code 的判斷失效
-

```coldfusion

<!--- line Comment --->

<!-- 
paragrath Comment
 -->
```

```coldfusion
<cfscript>

// single line comment

/*
Multiple line
comment
*/
</cfscript>
```

## Variables

```cfm

<cfparam name="Id_no" default="">

<cfset title = "">

<cfarguments>

<cfset var >

```

1. `cfparam`: 測試參數是否存在，常用於接 form / ajax 過來的資料。當程式接收到資料後，可以用 default value ，做為資料是否接收到的處理。常用屬性:
    a. default
    b. maxLength
    c. type
    d. pattern: 可以用 JavaScript 的regular expression 做為參數的檢查

## Print

```cfm

<cfdump var = >

<cfoutput></cfoutput>

```