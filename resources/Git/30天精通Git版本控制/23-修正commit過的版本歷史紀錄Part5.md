# 23_修正 commit 過的版本歷史紀錄 Part 5

`git rebase -i [CommitId]` 使用 `-i`  參數，可指定變更 當前版本 ~ CommitID版本間的版本

執行 `git rebase -i [CommitId]`後，會進入 vim介面，並且將兩個版本間所有Commit列出，如圖

![](https://i.imgur.com/im1Mxzo.png)

可使用多種指令操作

1. 調換 commit 的順序

    將文字檔Commit的順序調換

2. 修改 commit 的訊息

    把 `pick` 改成 `reword`後存檔退出，會出現修改的commit的訊息，可供修改

3. 插入一個 commit

    `edit` Rebase會暫停在這個版本，等你再進行一次修改版本的動作後執行`git rebase --continue`，即可插入版本

4. 編輯一個 commit

    使用`edit`，然後執行`git commit --amend`代表編輯此次的 Commit

5. 拆解一個 commit

    `edit`，變更編輯中的這個版本(改變索引)，先執行`git commit --amend`建立新版本，接著執行`git add .`、`git commit`，即可將原本的版本變為兩個版本

6. 壓縮一個 commit，且保留訊息紀錄

    `squash` 把多餘的這個版本紀錄訊息，加到上一個版本的訊息當中

7. 壓縮一個 commit，但丟棄版本紀錄

    `fixup` 合併兩個版本變更，但不合併紀錄訊息

8. 刪除一個 commit

    移除檔案中的 `pick`即可

### 參考資料

[【狀況題】修改歷史訊息](https://gitbook.tw/chapters/rewrite-history/change-commit-message.html)
