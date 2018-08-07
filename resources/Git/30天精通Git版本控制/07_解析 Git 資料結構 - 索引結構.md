# 07 解析 Git 資料結構 - 索引結構

**索引**
 
 主要用來紀錄「有哪些檔案即將要被提交到下一個commit版本中」

 * 想提交一個版本到 Git 儲存庫，一定要先更新索引狀態，變更才會被提交

 **索引有很多別名**
  * `Index` (索引)
  * `Cache` (快取)
  * `Directory cache` (目錄快取)
  * `Current directory cache` (當前目錄快取)
  * `Staging area` (等待被 commit 的地方)
  * `Staged files` (等待被 commit 的檔案))


**在Git中，檔案狀態的生命週期**

![](https://i.imgur.com/facPrtx.png)

   * `untracked` (未追蹤的，代表尚未被加入 Git 儲存庫的檔案狀態)
* `unmodified` (未修改的，代表檔案第一次被加入，或是檔案內容與 HEAD 內容一致的狀態)
* `modified` (已修改的，代表檔案已經被編輯過，或是檔案內容與 HEAD 內容不一致的狀態)
* `staged` (等待被 commit 的，代表下次執行 git commit 會將這些檔案全部送入版本庫)

**`git status`**
取得工作目錄 (Working Tree) 下的狀態


1.在工作目錄中新增 `a.txt`，會被標示為`untracked`，代表此檔案並未存在於 Git 儲存庫中
2.在之後執行 `git add a.txt`，代表將 `a.txt` 加入索引檔中，在下一次的 `commit`，便會把這個版本提交到 Git 儲存庫中，再執行一次`git status`，Git 已經偵測到 `a.txt` 已經被加入索引檔，所以顯示綠色的 <font color="#00DD77">`new file`</font>
![](https://i.imgur.com/zcUVNgD.png)

若是索引檔中已經有檔案的資料，則對檔案進行變更時，便會顯示為紅色的 <font color="red">`modified`</font>
![](https://i.imgur.com/rCYzR56.png)

<font color="red">**1.只有被加入索引檔的檔案，才會被 commit提交到Git 儲存庫**</font>

<font color="red">**2.沒有被加入索引檔的檔案，就算執行了 commit，也不會被提交到 Git 儲存庫的下一個版本中**</font>

`git add -u`

`-u` 僅加入有進行更新/刪除的檔案

新增的檔案 `b.txt`，不會被加入索引檔內

![](https://i.imgur.com/WWHLY8H.png)


`git rm` 
刪除「工作目錄」下的檔案

Git 索引檔偵測到檔案被刪除

![](https://i.imgur.com/kypIlXx.png)


使用`git checkout -- a.txt` 把被從索引檔刪除的檔案拉回Staged

此時若是使用 `git rm --cached a.txt`
，可把`a.txt`從索引檔中移除，但實體檔案還會留在工作目錄中

![](https://i.imgur.com/wkZ6FcH.png)

`git mv oldname newname` 

檔案更名，會同時更新索引與變更工作目錄下的檔案

使用 `git mv oldname newname`
可以直接更新索引檔&工作目錄的檔案名稱，且索引內可以知道這是一次重新命名的動作 ( renamed )

![](https://i.imgur.com/PxbydmT.png)

如果是直接執行 `mv oldname newname`
，則只會更改工作目錄中的檔案名稱，索引檔會偵測到舊檔案被刪除 ( deleted )、有新的檔案加入( untracked files )

![](https://i.imgur.com/KLhnU0Y.png)


`git commit`

把「索引檔」與「目前最新版」中的資料比對出差異，然後把差異部分提交變更為一個 commit 物件


`git ls-files`
包含已經 `git add`到「索引檔」中 & 「目前最新版」的檔案

![](https://i.imgur.com/UDEAZqg.png)

