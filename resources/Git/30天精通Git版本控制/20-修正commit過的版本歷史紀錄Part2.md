# 20_修正 commit 過的版本歷史紀錄 Part 2

`git revert [CommitId]` 還原某個版本的變更，執行成功會另外再建立一個Commit版本

`git revert` 其實是執行合併的動作，若在 revert 後再度變更檔案(不是上一個版本的內容)的話，則會產生合併的衝突

 ex. 版本1 1 -> 版本2 2 ，revert : 2 -> 1，將1改成3，再執行 revert 則會產生衝突，因為原本的 revert 是由2變成1，但由於目前內容是3，無法直接執行 revert，需要藉由解決 conflict 的方式來執行還原

 `git revert -n` 執行還原但不 commit (不建立 revert 的版本)

 `git revert --continue` 代表已完成所有操作，並且建立一個新版本，( `git commit` )

`git revert --abort`  代表放棄這次復原的動作，執行這個命令會讓所有變更狀態還原，也就是刪除的檔案又會被加回來。

`git show [CommitId]` 看版本的詳細資訊