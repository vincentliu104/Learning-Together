# HTML Entities

在HTML文檔中，有些保留字元需要被轉換為 `HTML Entities`，才能在頁面上顯示

像是 小於符號 `<` 、大於符號 `>` 等，因為會被解讀為標簽的括號(`<tag-name>`)，因此想要在HTML文檔顯示，就必須使用HTML Entities，如:  `<:&lt` 、  `>:&gt`

**&lt的此種寫法稱為 Entity Name**

有些保留字元會有 Entity Name 可以使用，若沒有，則可以 Entity Number (也可稱HTML Number) 來表示，

像 `&lt` 的 Entity Number 就是 `&#60;`

而在HTML頁面上會有 ~~你看不到它~~ 的狀況:空白(**space**) ，Entity Number 是 `&#32;`

用 Entity Name ( &gt ) 表示 **大於** : <html> <b>&gt;</b> </html> 

用 Entity Number ( &#60 ) 表示 **小於** : <html> <b>&#60;</b> </html> 


**~~不要太相信HTML頁面上所顯示的東西~~**

<html>&copy;&reg;</html>

# 參考資料

[W3School HTML Entities](https://www.w3schools.com/html/html_entities.asp)

[ASCII Code - The extended ASCII table](https://www.ascii-code.com/)

[HTML Codes Table](https://ascii.cl/htmlcodes.htm)

