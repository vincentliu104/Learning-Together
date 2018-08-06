# 教學1 開始使用Git

## 官網

1. https://git-scm.com/
1. 安裝後，開始選單> 所有程式> Git> Git Bash啟動程式
1. 安裝確認，顯示安裝版本

    ```sh
    $ git --version
    ```

## 初始設定

1. 使用者

    ```sh
    $ git config --global user.name "<使用者名字>"
    $ git config --global user.email "<電子信箱>"
    ```

## 新建數據庫

1. 請在電腦上的任何一個地方建立tutorial目錄。把tutorial目錄放在Git的管理之下，使用init命令移動到這個目錄並將目錄建立為本地端數據庫。

     ```sh
     $ mkdir tutorial //建立資料夾 tutorial
     $ cd tutorial    // 進入 tutorial 資料夾內
     $ git init       // 新增一個 .git 的版控檔
     ```

## 提交檔案

1. 在tutorial目錄新建一個檔案，然後將檔案添加到數據庫。
  a. 新增一個檔案: sample.txt
  b. 修改一個檔案: 教學1 開始使用Git.md
1. (a) `$ git status`，在Git管理之下的目錄，可以使用status命令確認工作目錄與索引的狀態，以下為執行結果
    ```sh
    $ git status
    # On branch master
    #
    # Initial commit
    #
    # Untracked files:
    #   (use "git add <file>..." to include in what will be     committed)
    #
    #     sample.txt
    nothing added to commit but untracked files present (use "git add" to track)
    ```

        i. On branch master: 現在是在名為 master的 分支上作業
        ii. Initial commit: 你的第一個 commit
        iii. Untracked files: 代表 GIT 還沒監控的檔案， 剛剛新增的 sample.txt 就是 GIT 要    告訴你，他還不認識的檔案
        iv. nothing added to commit but untracked files present (use "git add" to     track: 代表還沒決定要下 commit 的檔案，GIT 告訴你，如果把檔案下 commit ，請使用     `git add`，決定要下 commit 的檔案
1. (b) `$ git add <file>`: 將檔案加入要下 commit 的準備區，`git add .`，可以將所有檔案一次加到準備區(索引 index)中

    ```sh
      $ git status
      On branch chou/git
      Changes to be committed:
        (use "git reset HEAD <file>..." to unstage)

              new file:   resources/Git/連猴子都能懂的Git入門指南/教學1 開始使用Git.md

      Changes not staged for commit:
        (use "git add <file>..." to update what will be committed)
        (use "git checkout -- <file>..." to discard changes in working directory)

              modified:   resources/Git/連猴子都能懂的Git入門指南/README.md  
    ```

        i. Changes to be committed: 下面會列出在 索引中的檔案，代表 commit 所要包含的檔案
        ii. new file: 代表是新增的，modified: 修改的
        iii. use ...，告訴你有哪些指令，可以對列在下面的檔案做 工作目錄與索引之間的傳遞
1. 檔案 "教學1 開始使用Git.md" 已加入索引，執行 `git commit -m "blablabla..."` 命令提交，並用 `git status`，確認 GIT 中各檔案的狀態

    ```sh
    $ git commit -m "first commit"
    [master (root-commit) 116a286] first commit
     0 files changed, 0 insertions(+), 0 deletions(-)
     create mode 100644 sample.txt

    $ git status
    # On branch master
    nothing to commit (working directory clean)
    ```

1. `git log` 得到 commit 的紀錄與 commit 的訊息

    ```sh
    $ git log
    commit ac56e474afbbe1eab9ebce5b3ab48ac4c73ad60e
    Author: eguchi <eguchi@nulab.co.jp>
    Date:   Thu Jul 12 18:00:21 2012 +0900

        first commit
    ```

        i. commit 的編號: ac56e474afbbe1eab9ebce5b3ab48ac4c73ad60e
        ii. commit 的作者: Author: eguchi <eguchi@nulab.co.jp>
        iii. 下commit 的時間
1. `gitk --all &`: 可以用圖形化介面確認歷史提交記錄，參考: (https://zlargon.gitbooks.io/git-tutorial/content/branch/show.html)

## 附錄 

1. 第一次安裝設定檔補充，參考: (https://github.com/Framins/wiki/blob/gh-pages/vcs/git/config.md)