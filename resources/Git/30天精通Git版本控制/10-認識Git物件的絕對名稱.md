# 10 認識 Git 物件的絕對名稱

使用 `git log`取得 Commit 物件的 ID

如果想取得內容，可以使用

`git cat-file -p commitID`

### 物件絕對名稱的簡短語法

可以使用物件名稱的前 4~40個字元做為絕對名稱使用

`git cat-file -p TreeID` 

也可以使用 Tree 物件的ID來取得Tree物件的內容

![](https://i.imgur.com/3CNRCUO.png)

`git log --pretty=oneline`

取得較為精簡的歷史紀錄，同時你也可以取得 commit 物件完整的「絕對名稱」

![](https://i.imgur.com/UNdmE3p.png)

僅輸出部分的「絕對名稱」

`git log --pretty=oneline --abbrev-commit`

![](https://i.imgur.com/5hOLLKN.png)

