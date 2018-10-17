# 25_使用 GitHub 遠端儲存庫 - 觀念篇

`git clone` 從遠端複製Repo到本地端 (.git 資料夾)

`git pull` 
    等於 

```
   1. git fetch
   2. git merge origin/master
```

下載遠端 Repo 的最新版，並將遠端分支merge到本地端的master分支

`git push`

將本地分支的內容推送到遠端 Repo

`git fetch`

下載遠端 Repo 的最新版，不包含 merge

`git ls-remote`

顯示遠端 Repo 的參照名稱，包含 **Branch** 、**TAGS**

1.遠端追蹤分支

    位於遠端，用來追蹤分支變化

2.本地追蹤分支

    Clone 遠端的 Repo 回來後，所有的遠端追蹤分支也會被下載回來，並建立相對應且名稱相同的本地追蹤分支

3.本地分支

    在 Local 端建立的Branch，預設並不會被推送到遠端的 Repo 中，因通常這些分支只應用於開發

4.遠端分支

    在遠端 Repo 中的分支

### 註冊遠端 Repo

`git remote add origin https://github.com/remote_repo.git`

`git remote -v` : 列出目前註冊在工作目錄裡的遠端 Repo 資訊

**Origin** : 
    
    慣用的預設遠端分支的參照名稱，主要用來代表一個遠端 Repo 的 URL位址    

建立完參照位址之後，便可以從遠端 Repo 下載內容回來，使用 `git fetch`

Note 1：
    **可以在本地端建立多個參照位址**

    EX:    
    git remote add {NAME} https://.....remote_REPO.git

Note 2：
    **所有參照的位址都被寫入在 .git/config 中**

    EX:
    [remote "origin"]
	url = https://github.com/remote_repo.git
	fetch = +refs/heads/*:refs/remotes/origin/*

### 參照名稱對應規格 (refspec)

`+refs/heads/*:refs/remotes/origin/*`

可分為四個部份

* `+` :
    
    代表傳輸資料時不特別使用安全性確認機制

* `refs/heads/*`

    代表位於 **遠端Repo** 的 **遠端分支**，`*` 則代表 `refs/heads/`這個路徑下的所有遠端參照

* `:`

    用來區隔來源分支、目的分支

* `refs/remotes/origin/*`

    代表位於 **本地Repo** 的 **本地追蹤分支**， `*`則代表工作目錄 `refs/remotes/origin/` 底下的所有本地參照

refspec 對應規格 主要會影響 `git fetch` `git push`兩個對遠端 Repo 的操作

可定義想下載的遠端分支在refspec內，如:

`fetch = +refs/heads/master:refs/remotes/origin/master` 代表只會下載 master 這個遠端分支

Note 3:
    **Git 預設就是用 origin 當成遠端儲存庫，並使用 origin 的參照規格。**

要將本地分支使用 `git push` 推送到遠端 Repo 時，會因為沒有設定 **本地分支** 與 **遠端Repo** 的預設對應而失敗

需告訴 Git 你要推送的目的Repo
EX:
    `git push origin BranchName`

若要建立 **本地分支** 與 **遠端Repo** 的相對關係，則要在推送時加上 `--set-upstream` 參數，即可將本地分支註冊進 .git/config 的設定檔，之後要推送時只需輸入 `git push` 即可

`git push --set-upstream origin BranchName`

註冊時，Config 會寫入以下設定，代表將本地分支推上遠端時，預設的 Repo 為 **Origin** ，要 merge 的分支則是遠端 **BranchName** 這個分支

```
[branch "BranchName"]
	remote = origin
	merge = refs/heads/BranchName
```

Note 4:
    **使用 git clone 下載 Repo時，Git 預社會建立好 master 分支的對應關係，因此不需另外使用 --set-upstream 建立**

