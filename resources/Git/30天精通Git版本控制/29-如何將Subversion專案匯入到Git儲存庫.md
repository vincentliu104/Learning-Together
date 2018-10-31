# 29_如何將 Subversion 專案匯入到 Git 儲存庫

由 SVN 轉換到 Git 主要需要做四個工作

### 1. 準備使用者清單對應檔

* 安裝 Subversion 指令列工具

* 進入 SVN 工作目錄，執行

    `SET PATH=%PATH%;C:\Program Files (x86)\Git\bin\
svn log --quiet --xml | sed -n -e "s/<\/\?author>//g" -e "/[<>]/!p" | sort | sed "$!N; /^\(.*\)\n\1$/!P; D" > SVNUsers.txt`

以上指令會將 SVN 所有 Author 輸出到SVNUser.txt中

依照 `svnuser = GitUsername <GitEmail>`的格式，將 SVN User 與 Git 的UserName、Email填好

### 2. 將 SVN 專案取出並轉換成 Git 工作目錄

* 將 SVNUser.txt 複製到 Git 的工作目錄下，執行

`git svn clone https://svnrepo_URL --no-metadata -A SVNUsers.txt --stdlayout`

如果 SVN 儲存庫權限只有 /trunk 而已的話，不能使用 `--stdlayout` 屬性，要用

`git svn clone https://svnrepo:23443/svn/DoggyLibrarySolution/trunk --no-metadata -A SVNUsers.txt`


### 3. 轉換 SVN 的忽略清單 (即 svn:ignore 屬性)

取得 .gitignore 忽略清單檔的內容

`git svn show-ignore`

**ERROR:**

`config --get svn-remote.svn.fetch :refs/remotes/git-svn$: command returned error: 1`

**發生在 SVN 使用標準的 trunk, branches, tags 資料結構**

**改為使用指令:**

`git svn show-ignore -i trunk`


**建立 `.gitignore` 檔案**

```
git svn show-ignore -i trunk > .gitignore
git add .gitignore
git commit -m "Create .gitignore from SVN"
```

### 4. 將專案推送到遠端儲存庫

`git remote add origin https://github.com.tw/YourRepo.git
git push origin master`

即完成 SVN 專案轉移至 Github。