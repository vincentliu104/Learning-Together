# 16 善用版本日誌 git reflog 追蹤變更軌跡

`.git\logs\HEAD` 記錄所有 Git 操作的LOG

`git reflog` 查看所有記錄 排序由新到舊

`HEAD@{0}` 當前分支的最新版

`git reset HEAD@{1} --hard` 復原成當前版本的前一版

**注意:** 使用 `git reset`的操作也會被記錄在 `git reflog` 當中，如果想回復被reset掉的檔案，再執行一次 `git reset HEAD@{1} --hard` 即可

**會被記錄在 reflog中的操作方式**

* commit
* checkout
* pull
* push
* merge
* reset
* clone
* branch
* rebase
* stash

每一個分支、每一個暫存版本(stash)，都會有自己的 reflog 歷史紀錄，這些資料也全都會儲存在 `.git\logs\refs\` 資料夾下

`git reflog branchName` 查看分支的操作記錄

`git log -g` 顯示 reflog 的詳細版本記錄

`git reflog delete ref@{specifier}` 刪除記錄 `master@{0}、HEAD@{1}....`

----
**設定歷史紀錄的過期時間**

`git config --global gc.reflogExpire "7 days"` 

`git config --global gc.reflogExpireUnreachable "7 days"`

----

**針對特定分支設定其預設的過期時間**

`git config --local gc.master.reflogExpire "14 days"`
`git config --local gc.master.reflogExpireUnreachable "14 days"`

`git config --local gc.develop.reflogExpire "never"`
`git config --local gc.develop.reflogExpireUnreachable "never"`

----

**立即清除當前所有記錄**

`git reflog expire --expire=now --all`

`git gc`

對歷史紀錄的任何操作都不影響在 Git 儲存庫的任何版本資訊