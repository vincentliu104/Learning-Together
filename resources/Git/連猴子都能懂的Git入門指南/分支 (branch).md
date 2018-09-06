# 分支 (Branch)

**來由** <br>
  還記得_Git 的基本介紹_中，提到 版本控制工具可以解決多人同時開發的問題嗎? 想像一下以下的情況
  當多人一起開發時，可能同一個功能，一個人在 debug、一個人在新增這個功能的作用、一個人為了配合別的需求在調整這個功能。遇到這個時候，大家都在 master 中下 commit，必然需要不斷的 merge 其他人的版本，且 commit 的中間，會參雜不同人的 commit，commit 的閱讀變的混亂，並且每次 commit 都影響 master 上的測試環境。
  這個時候，明顯需要有一個方法，可以分隔出大家開發的 commit ，每個人都可以把自己的部分開發完整後，最後回 master 時，做一次 merge master 的版本就好， 分支 (Branch) 就是為解決已上的問題而使用的。

## 什麼是分支

重新敘述一次，分支是為了將修改紀錄的整體流程分開儲存，讓各自的開發不受其他人影響，並且同一個數據庫裡可以多人進行不同的修改。當發生問題時，可以更容易找到發生問題的地方。
一開始的 Master 就是一個預設的 Branch

## 分支的運用

分支的使用: 通常簡單分兩種類: 1. master branch 2. other branch

## 分支的切換

`git checkout`: 用來轉換分支
`HEAD`: 代表所在指向分支的 commit，checkout 就是移動 HEAD 的標籤，而 `HEAD^` / `HEAD~2`，可以讓 HEAD 移動，`^` 代表往前一個 commit，`~`代表會後一個 commit ，加數字即可移動數字的步數
`git stash`: 暫存未 commit 的修改檔案。當有未 commit 的修改檔案時， checkout 會無法轉換 branch，這時候可以用 stash 暫存未 commit 的修改檔案，即可進行分支的切換。

## 分支的合併

將 other branch 合併到 (master) 分支，合併的方法有兩種: `git merge`, `git rebase`

`$git merge`: 當 other branch 要合併到 master 上時，會根據 i. master 的狀態與 ii. 合併後在 master上呈現的 commit 形式，這兩種情況的差異，使用不同的 merge 效果

### master 上的狀態

#### 第一種 master 狀態

 _master_ 從 _bugifx_ checkout 後，沒有新的 commit，代表目前 _bugfix_ 與 master 上的差異只有 _bugfix_ 上修改的部分，如下圖

![fast-forward](https://backlog.com/git-tutorial/tw/img/post/stepup/capture_stepup1_4_1.png)

綠色的為 master 分支，藍色的為 bugfix () 分支，我們檢查的順序依 [i] master 的狀態 [ii] 合併後的 master 呈現 commit 的形式

1. **第一種 commit 呈現 (fast-forward)**
   1. ![fast-forward](https://backlog.com/git-tutorial/tw/img/post/stepup/capture_stepup1_4_2.png)
   1. 期望 master 上能保留 bugfix 上的 commit ，並且 不產生新的 commit ，又稱 **fast-forward**
1. **第二種 commit 呈現**
   1. ![merge](https://backlog.com/git-tutorial/tw/img/post/stepup/capture_stepup1_4_4.png)
   1. 期望 master 上能保留 bugfix 上的 commit ，並且 產生新的一個合併 commit

* non-fast-forward: `git merge --no-ff <branch name>`
* git tree: `git log --graph --oneline --all`
* ![git tree](https://i.imgur.com/yj1Ox2P.jpg)

#### 第二種 master 狀態

## 分支的運用實例