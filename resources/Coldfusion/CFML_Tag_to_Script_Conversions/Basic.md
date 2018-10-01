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

## Variable

