# 30_分享工作中幾個好用的 Git 操作技巧

### 1. 如何讓 git pull / push / fetch 不用輸入帳號、密碼

預設使用 `https` 協定存取 Git Repo，由於無法記憶帳號密碼，導致每次 push 都需要輸入帳密，此時可改用 `SSH` 預設的金鑰設定，來做變更 Git Repo 時的身分驗證

* 若使用 GitHub for Windows 工具，則一開始即會設定產生 SSH 金鑰&上傳到Github

### 在本機產生SSH Key 並上傳到 Github

`ssh-keygen -t rsa -b 4096 `

`-t 指定加密的演算法`

`-b 指定Key的長度`

執行指令後預設產生 `id_rsa`、`id_rsa.pub`兩個檔案

將 `id_rsa.pub` 的內容貼到 Github -> Settings -> SSH & GPG Keys -> New SSH Key

以新增一把SSH Key，此後在本機使用 SSH 協定對 Git Repo 的操作都不用輸入帳密

### 2. 如何讓操作 Bitbucket 遠端儲存庫時，也可以不用輸入帳號、密碼

上傳產生的 SSH Key 到 Bitbucket(跟上傳到 Github 一樣)

### 3. 如何還原一個 git rebase 變動

`git merge`的還原 : `git reset --hard ORIG_HEAD`

`git rebase`的還原 : 

**1.先知道你在 Rebase 之前，是落於哪個版本。**

    git reflog

**2.再查出你要從哪個版本開始 Rebase**

    git log --oneline -5

**3.然後真正執行 Rebase 動作**

    git rebase -i 要Rebase的版本

**4.不管做了哪些動作，你再執行一次 git reflog 就可以看出 Rebase 真正做了幾件事**

    git reflog

**5.若要還原 Rebase 的版本，只要找到 Rebase 之前的版本，就可以透過　git reset --hard 來還原**

    git reset --hard HEAD@<?>

### 4. 取得遠端儲存庫的統計資訊

取得 Commit 次數統計

`git shortlog -sne`

取得每個人的 Commit 記錄

`git shortlog`

### 5. 從工作目錄清除不在版本庫中的檔案

刪除前先看一下會被刪除的檔案清單
`git clean -n`

強制刪除所有 git ignore 的檔案
`git clean -f`

### 6. 刪除遠端分支

`git push origin --delete RemoteBranch`

### 7. 找出改壞程式的兇手

`git blame [filename]`

`git blame -L [StartLine],[EndLine] [filename]`

