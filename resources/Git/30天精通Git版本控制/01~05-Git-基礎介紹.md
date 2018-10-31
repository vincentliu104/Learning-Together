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

----

## 05 了解儲存庫、工作目錄、物件與索引之間的關係

```git init```

指定資料夾成為Git的儲存庫 (*Repo*)

`.git` 代表著整個Git儲存庫，所有版本的變更都會儲存在裡面

### **工作目錄**

指的是進行開發的地方，可以在裡面對檔案進行新增、刪除、修改、更名等操作

### **物件與索引**

**物件：** 將檔案內容取出，透過內容產生一組SHA1雜湊值，再依雜湊值命名的檔案
    
*  物件又分以下兩種

    * 目錄資訊 ( *tree* )
    * 檔案內容 ( *blob* )

`blob` 
    
    檔名:
     由檔案內容進行SHA1雜湊運算後得出的hash id即為檔名
    內容:
        為原本的檔案內容

`tree` 資料夾的概念

    紀錄特定資料夾內包含哪些檔案，以及該檔案對應的blob物件檔名

`tree` 和 `blob` 物件會儲存於物件儲存區( *Object Storage* )中，即在`.git/objects`內

**索引：** 

用來紀錄有哪些檔案會被提交到下一個commit版本中，會在`.git/`下面名為index的檔案

想提交新版本到Git Repo，要先更新索引檔，變更才能被提交
* git add
* git mv
* git rm
* git status
* git commit
* git ls-files

以上為常用來操作索引檔的指令

1.要使用Git，先 建立工作目錄( **mkdir** )，再建Repo( **git init** )

2.在工作目錄中操作檔案

3.提交新版本到Git Repo中( **git add** 、 **git mv** ...)

4.Git會依據索引( **index** )的狀態，決定要把檔案提交到Repo中的哪邊( **git status** )

5.使用 `git commit` 後，才會真正把版本資訊寫入物件儲存區(Object Storage) 中