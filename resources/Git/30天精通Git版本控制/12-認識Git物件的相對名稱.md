# 認識Git物件的相對名稱

`^` 與 `~`

`HEAD` 其實就是一個符號參照，代表著當前分支的最新版

`^1` 、 `~1`

在沒有分支的情況下，代表的都是前一版，若有則各代表不同的意思

**根 Commit** 物件
代表的是 `Initial Commit`

除了根Commit，每個 Commit 一定會有一個以上的 上層Commit 

若合併分支，就會有一個以上的上層 Commit 了

`~` : 代表 「第一個上層 Commit 物件」

`^` : 代表「擁有多個上層 Commit 物件時，要代表第幾個第一代的上層物件」

找到 C 的第一個上層 Commit 物件
`C^` = `C^1` = `C~` = `C~1`

找到 C 的第二個上層 Commit 物件
`C^^` = `C^1^1` = `C~2` = `C~~` = `C~1~1`

`C^2`代表的是 上一層的第二個上一層物件

![](https://i.imgur.com/8jCMCD9.png)

`git rev-parse`
可以把任一參照名稱或相對名稱解析出絕對名稱

EX.

`git rev-parse master`

`git rev-parse HEAD`

`git rev-parse HEAD^`

`git rev-parse HEAD~5`

