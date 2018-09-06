<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [18 – 檔案搜尋(Searching For Files)](#18--%E6%AA%94%E6%A1%88%E6%90%9C%E5%B0%8Bsearching-for-files)
  - [locate – Find Files The Easy Way](#locate--find-files-the-easy-way)
  - [find – Find Files The Hard Way](#find--find-files-the-hard-way)
    - [Tests](#tests)
    - [Operators](#operators)
    - [Predefined Actions](#predefined-actions)
    - [User Defined Actions](#user-defined-actions)
    - [Improving Efficiency](#improving-efficiency)
    - [xargs](#xargs)
    - [A Return To The Playground](#a-return-to-the-playground)
    - [Options](#options)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 18 – 檔案搜尋(Searching For Files)

Linux 系統上有很多檔案，要怎麼找到你要的檔案呢？本章將介紹幾個找檔案的指令

`locate` - 用檔案名稱搜尋
`find` - 以目錄結構搜尋檔案
`xargs` – Build and execute command lines from standard input
`touch` - 更改檔案時間
`stat` - 顯示檔案或系統資訊

## locate – Find Files The Easy Way

locate 可以快速找到符合的路徑

Mac 第一次使用時，會叫你 `sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.locate.plist`，但沒有用，改用 `sudo /usr/libexec/locate.updatedb`

```shell
locate bin/zip

locate zip | grep bin
```

另外常用指令有 `slocate`, `mlocate`

locate database 是由 updatedb 所建立，通常會在 cron job 裡，多數系統會一天更新一次，也就是資訊不是很即時，需要的話你可以手動執行

## find – Find Files The Hard Way

find 會收尋你指定的資料夾(以及子資料夾)

```shell
# home 錄下所有檔案...
find ~

# 檔案數量
find ~ | wc -l
1347953
```

### Tests

搜尋檔案類型

檔案類型 | 說明
-----|---
b | Block special device file
c | Character special device file
d | 資料夾
f | 普通檔案
l | Symbolic link

```shell
# 找資料夾的數量
find ~ -type d | wc -l

#一般檔案的數量
find ~ -type f | wc -l
```

檔案大小

字母 | 單位
---|---
b | 512 byte blocks. This is the default if no unit is specified.
c | Bytes
w | Two byte words
k | Kilobytes (Units of 1024 bytes)
M | Megabytes (Units of 1048576 bytes)
G | Gigabytes (Units of 1073741824 bytes)

```shell
# 超過 1 MB 的 .JPG
find ~ -type f -name "*.JPG" -size +1M | wc -l
```

find 提供大量搜尋選項，以下提供幾個常用的

Test            說明
-cmin n         n 分鐘前改過的檔案，少於用 -n，超過用 +n
-cnewer file    檔案內容或屬性最後修改時間比 file 還新
-ctime n        n*24 小時前改過的檔案及目錄內容或屬性
-empty          空的檔案及目錄
-group name     屬於 group 的檔案及目錄
-iname pattern      類似 -name，但有不缺分大小寫
-inum n         Match files with inode number n. This is helpful for finding all the hard links to a particular inode.
-mmin n        n 分鐘前改過內容的檔案及目錄
-mtime n       n*24 小時前改過內容的檔案及目錄
-name pattern   Match files and directories with the specified wild card pattern.
-newer file     內容修改時間比 file 還要早的檔案及目錄。寫 schell script 備份檔案時很好用
-nouser         不屬於任何 user 的檔案及目錄，例如被刪除的帳號，或用來發現有沒有人在攻擊你
-nogroup        不屬於任何 group 的檔案及目錄
-perm mode      Match files or directories that have permissions set to the specified mode. mode may be expressed by either octal or symbolic notation.
-samefile name      類似 -inum test. Matches files that share the same inode number as file name.
-size n         Match files of size n.
-type c         Match files of type c.
-user name      屬於 user 的檔案及目錄. The user may be expressed by a user name or by a numeric user ID.

### Operators

利用邏輯關係來搜尋檔案

搜尋 file permission 非 0600 的檔案及不是 0700 的目錄

```shell
find ~ \( -type f -not -perm 0600 \) -or \( -type d -not -perm 0700 \)
```

### Predefined Actions

Action | 說明
-------|---
-delete | 刪除符合的檔案
-ls | 執行 ls -dils
-print | 輸出完整路徑及檔名，這是預設選項
-quit | 一找到符合的就會結束

記得刪除前先用 -print 確認

```shell
find ~ -print

# 刪除 .BAK
find ~ -type f -name '*.BAK' -delete

find ~ -type f -name '*.BAK' -print

# 好讀版
find ~ -type f -and -name '*.BAK' -and -print

# 注意邏輯關係，這會輸出所有檔案...
find ~ -print -and -type f -and -name '*.BAK'
```

### User Defined Actions

格式: `-exec command {} ;`，command 表示指令，{} 代表目前路徑

例如 `-exec rm '{}' ';'` 類似 -delete，因為 `{`, `}`, `;` 是特殊字元，所以需要加上單引號

user defined action 可以是互動式，利用 `-ok` 取代 `-exec`

```shell
find ~ -type f -name 'foo*' -ok ls -l '{}' ';'
< ls ... /home/me/bin/foo > ? y
-rwxr-xr-x 1 me me 224 2007-10-29 18:44 /home/me/bin/foo
< ls ... /home/me/foo.txt > ? y
-rw-r--r-- 1 me me 0 2008-09-19 12:53 /home/me/foo.txt
```

### Improving Efficiency

在使用  -exec 時，每當有符合的檔案，他會針對要下的指令開啟新的 instance

有些時候我們只想用一個 instance，例如 `ls -l file1; ls -l file2` 可以寫成 `ls -l file1 file2`

```shell
# 多個 instance
find ~ -type f -name 'foo*' -exec ls -l '{}' ';'

# 1 個 instance，只會執行 ls 一次
find ~ -type f -name 'foo*' -exec ls -l '{}' +
```

### xargs

把輸出作為參數

```shell
find ~ -type f -name 'foo*' -print | xargs ls -l

# 檔名包含空白
find ~ -iname '*.jpg' -print0 | xargs --null ls -l
```

### A Return To The Playground

實際運用的時刻到了

先來建立 100 個資料夾，個有 26 個檔案

```shell
# -p 表示 parent directory 也會幫你建立
mkdir -p playground/dir-{00{1..9},0{10..99},100}

# filename 不存在時就會幫你建立檔案
touch playground/dir-{00{1..9},0{10..99},100}/file-{A..Z}
```

在目錄 playground 找檔名為 file-A

```shell
find playground -type f -name 'file-A'

find playground -type f -name 'file-A' | wc -l
```

```shell
touch playground/timestamp
stat playground/timestamp
touch playground/timestamp
stat playground/timestamp

find playground -type f -name 'file-B' -exec touch '{}' ';'

find playground -type f -newer playground/timestamp

# 共 2702 個
find playground \( -type f -not -perm 0600 \) -or \( -type d -not -perm 0700 \)

find playground \( -type f -not -perm 0600 -exec chmod 0600 '{}' ';' \) -or \( -type d -not -perm 0711 -exec chmod 0700 '{}' ';' \)
```

### Options

option | 說明
-------|---
-depth | 先在一個目錄找，然後才到子目錄找
-maxdepth levels | 設定最大目錄層級
-mindepth levels | 設定最小目錄層級
-mount | 不經過 mount 到其他系統的目錄
-noleaf | none