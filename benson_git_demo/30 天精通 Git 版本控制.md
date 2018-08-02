# 30 天精通 Git 版本控制

### [Practice](https://github.com/chunghongke/learning-git)
#### 安裝Git
[Git官網](https://git-scm.com/)<br/>
**安裝**：一直下一步即可

----
#### Git 多人協作
在本機的資料夾內，拉回遠端的 `master`
```shell
git clone https://github.com/vincentliu104/Learning-Together.git
```

把 `master` 拉回本機後，切換到自己的分支 `benson/git`
```
git checkout benson/git
```

---- 
#### Git初始設定(自己建Repo版)
在本地端隨便開一個資料夾，然後進去點右鍵
git bash here

打開之後 Command line 後，輸入
```
git init
git config --global user.email "youremail@xxx.com"
git config --global user.name "your name"
```
使用以上的 `git config`可以設定要用哪個帳號來操作Git

其中 `--global` 參數 表當前電腦的使用者`user`使用的Git設定

如果帶的參數是 `--local` ，則表示僅有當前的 Repo 會套用這個設定

若為 `--system` 則是當前使用機器的設定

Git使用的優先順序為 (> 大於)

`local` > `global` > `system`

設定此資料夾為 `Git` 的 `Repo`

之後就可以在資料夾隨便建東西來玩啦~

### <p style="color:	#FF8888">常用指令</p>


##### 查看Repo當前的狀態
```
git status
```
##### 將修改的檔案加進一個盒子裡
```
git add
```
##### 所有檔案打成一包(封箱)
```
git commit -m "commit message"
```
##### 看Repo裡面有哪些箱子(commit)
```
git log
```
##### 退版
```
git reset
```
##### 退回上一個最新的版本

但是如果有用 `git rm` / `git mv` 刪除/修改過檔案

想恢復那些檔案的話則需加上 `--hard` 參數


##### 還原被改壞的檔案

```
git checkout master 改壞的檔案.js
```
