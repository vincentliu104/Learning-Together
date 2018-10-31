# 21_修正 commit 過的版本歷史紀錄 Part 3

`git cherry-pick` 使用前不能有任何 staged file

從其他的 branch 中，挑選想要的版本來套用在目前的分支上 

ex.在 branch1 裡，有新增a.txt檔案，但在 master 沒有，此時可以切換到 master ，再使用 `git cherry-pick [CommitId]`

執行完會直接建立一個版本，且版本訊息會與在 branch1 上留下的 log message 一樣，若想在建立版本前編輯訊息，可以使用 `git cherry-pick [CommitId] -e` ，若還不想建立版本，可以使用 `git cherry-pick [CommitId] -n` ，可以再加入自己的修改後再 `git commit` 一個版本上去

`git cherry-pick [CommitId] -x` 會加上 `cherry-picked from commit XXX` 以表明是從哪邊來的