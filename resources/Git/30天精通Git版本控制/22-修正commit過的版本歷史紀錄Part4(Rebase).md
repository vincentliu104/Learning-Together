# 22_修正 commit 過的版本歷史紀錄 Part 4 (Rebase)

`git rebase` 使用前不能有任何 staged file

* 遠端 Repo 下載回來的 分支，不要使用 `git rebase`修改歷史紀錄，修改後的版本無法 Commit 回遠端 Repo

    切換到 branch1 ， `git rebase master` ，會將目前版本先套用到 master 的最新版，再將 branch1 的版本依序套回，使用 `git rebase` 後，用GUI的介面看分支線圖會是一條線，但其實分支還在，若想將 branch1 的變更套用到 master ，則需要進行 merge 

1. `git merge branch1`  此指令觸發 Git 的快轉機制 (Fast-forward)

    合併的時候會直接修改 master 分支的 HEAD 參照絕對名稱，直接移動到 branch1 的 HEAD 那個版本。

2. `git merge branch1 --no--ff` 停用快轉機制，
    強迫打算合併的那個 branch1 先建立一個分支，然後最後再合併回 master，也代表再次變更了 branch1 的版本線圖( 原本 rebase 完後，線圖是重疊的一直線，停用快轉機制可以使 branch1 再次從 master 中切出來，能更清楚了解 branch1 與 master 的關係)。

