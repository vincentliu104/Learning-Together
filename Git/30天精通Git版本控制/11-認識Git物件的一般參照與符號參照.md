# 11 認識 Git 物件的一般參照與符號參照

物件的參照名稱

使用 `git branch` 得到的branchName，其實舊式一個參照名稱

`.git/ref/heads`

存有所有本地分支的參照名稱

打開 `.git/refs/heads/branchName`，裡面檔案的內容，就是指向版本歷史紀錄的最新版

`git cat-file -p CommitId`

取得物件內容

以及

`git show CommitId`

取得版本的變更紀錄，就可以知道這些檔案是參照名稱的主要用途

`git cat-file -p branchName`

通常參照名稱都是指向一個 commit 物件

----

* 本地分支: `.git/refs/heads`
* 遠端分支: `.git/refs/remotes`
* 標    籤: `.git/refs/tags`

EX. 開分支，就可以知道 `.git/refs/heads`內，會有一個檔案命名為你這個分支的名字

`git cat-file -p refs/heads/branchName`

Git 允許縮寫去找物件，但其尋找的順序為

* `.git/<參照簡稱>`
* `.git/refs/<參照簡稱>`
* `.git/refs/tags/<參照簡稱;標籤名稱>`
* `.git/refs/heads/<參照簡稱;本地分支名稱>`
* `.git/refs/remotes/<參照簡稱>`
* `.git/refs/remotes/<參照簡稱;遠端分支名稱>/HEAD`

一但搜尋到，就不往下尋找

先找 TAG，再找 HEAD，再找 REMOTE

----

符號參照 ( symref )

`.git/HEAD`

會指向另一個參照名稱

`refs/heads/branchName`

一樣是指向該分支版本歷史紀錄中的最新版

* `HEAD`
     * 永遠會指向「工作目錄」中所設定的「分支」當中的「最新版」。
     * 所以當你在這個分支執行 `git commit` 後，這個 HEAD 符號參照也會更新成該分支最新版的那個 commit 物件。
* `ORIG_HEAD`
     * 簡單來說就是 `HEAD` 這個 commit 物件的「前一版」，經常用來復原上一次的版本變更。
* `FETCH_HEAD`
     * 使用遠端儲存庫時，可能會使用 `git fetch` 指令取回所有遠端儲存庫的物件。這個 `FETCH_HEAD` 符號參考則會記錄遠端儲存庫中每個分支的 HEAD (最新版) 的「絕對名稱」。
* `MERGE_HEAD`
    * 「合併來源｣的 commit 物件絕對名稱會被記錄在 MERGE_HEAD 這個符號參照中。


使用 `git update-ref` 可以建立一般參照，可指向任一個Commit的版本

`git update-ref RefName CommitId`

使用絕對名稱或參照名稱，都可以存取 Git 物件的內容

**參照名稱可以指向任意 Git 物件，並沒有限定非要 commit 物件不可。**

刪除參照

`git update-ref -d RefName`

顯示所有參照

`git show-ref`

自訂參照通常會自行建立在前兩個路徑下，以免分不清「本地分支」、「遠端分支」與「標籤」的使用方式。

參照名稱 = Alias

**Git 參照名稱又有區分「一般參照」與「符號參照」，兩者的用途一模一樣，只在於內容不太一樣。「符號參照」會指向另一個「一般參照」，而「一般參照」則是指向一個 Git 物件的「絕對名稱」。**