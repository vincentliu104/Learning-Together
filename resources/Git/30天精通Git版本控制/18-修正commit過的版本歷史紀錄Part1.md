# 18_修正 commit 過的版本歷史紀錄 Part 1

[A] -> [B] -> [C]

`git reset --hard HEAD^` 刪除 C 這個版本

`git reset --soft HEAD^` 刪除版本但保留變更，方便重新 commit

`git reset --hard ORIG_HEAD` 復原到當前版本

執行 `git commit`後發現有檔案忘了加進去

可以使用 `git commit --amend`，會將當前記錄在索引中的變更檔案加入版本中，並且要求修改 Commit 訊息

* 使用 `git commit --amend`後，所產生的 Commit 物件將完全不同