# Coding Style

用來統一程式碼風格

* [Google Java Style Guide](http://google.github.io/styleguide/javaguide.html)
* [Code Conventions for the Java Programming Language: Contents](https://www.oracle.com/technetwork/java/codeconvtoc-136057.html)

## Why

翻譯自 `Code Conventions for the Java Programming Language`

* 軟體開發 80% 都在維護
* 維護的人會來來去去
* 增加程式碼的可讀性，達到我懂你寫的 code，你懂我寫的 code 的境界

## Eclipse Java Code Style 設定

1. 下載 `eclipse-java-google-style.xml`
2. Eclipse 設定: `Window/Preferences > Java/Code Style/Formatter`，匯入
3. `Ctrl+Shift+F` 就可以把程式碼變的漂漂亮亮

### 額外調整

預設的 Line Wrapping 是 `80`，就會強制換行，如果你手上的程式碼都很長的話，把他調整為 `130`(題外話: 落落長的程式碼不好讀...)

![Eclipse Java Formatter](https://i.imgur.com/n64TgBQ.png)

![GoogleStyle profile](https://i.imgur.com/XvsPauu.png)