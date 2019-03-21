# 關於 form 的資料傳遞

## Code part

```html
<html>
  <head>
    <title>Test - Throw (login)</title>
  </head>
  <body>
    <form action="form-handler.cfm" method="post">
        Account: <input type="text" name="account"> <br>
        <br>
        <!-- Password: <input type="text" name="password"><br> -->
        <br>
        <input type="submit" value="submit">
    </form>
  </body>
</html>
```

```xml
<cfparam name="form.account" default="Not Exist">
<cfparam name="form.password" default="Not Exist">

<cfif form.account EQ "Not Exist" or form.password EQ "Not Exist">
    <cfset IllegalException("輸入異常!")>
    <cfabort>
</cfif>

<cffunction name="IllegalException" displayname="error message">
    <cfargument name="alertMsg" type="string" displayname="alert massage">

    <cfoutput>
        <script type="text/javascript">
            alert("#arguments.alertMsg#");
            history.go(-1);
        </script>
    </cfoutput>

</cffunction>

<cfoutput>
<html>
  <head>
    <title>測試-接 (login)</title>
  </head>
  <body>
    <h1>Hi</h1>
  </body>
</cfoutput>
```

## 筆記

情境: 一個資料輸入頁的 html form，傳送兩個參數 (account, password)。一個資料處理頁，處理 html 輸入的資料

1. cfparam vs cfset: cfparam 根據定義 Tests for the existence of a parameter，可用於檢查資料輸入的參數，檢查是否存在，如果不存在，defualt 的做為資料異常的判斷。
1. 