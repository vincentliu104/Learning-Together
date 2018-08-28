<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [4 – 探索系統(Exploring The System)](#4--%E6%8E%A2%E7%B4%A2%E7%B3%BB%E7%B5%B1exploring-the-system)
  - [ls](#ls)
  - [less is more](#less-is-more)
  - [探索目錄](#%E6%8E%A2%E7%B4%A2%E7%9B%AE%E9%8C%84)
  - [Symbolic Links(也被稱作 soft link 或 symlink)](#symbolic-links%E4%B9%9F%E8%A2%AB%E7%A8%B1%E4%BD%9C-soft-link-%E6%88%96-symlink)
  - [Hard Links](#hard-links)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 4 – 探索系統(Exploring The System)

主要介紹指令

1. `ls`: 最常使用的指令，可以看目前目錄下有哪些檔案
1. `file`: 查看檔案類型
1. `less`: 門用來看文字類型的檔案，如：設定檔、script

選項(Options)與參數(Arguments)

大多數下指令時，都會加上一個或多個選項

```shell
# 格式: command -options arguments
ls -lt
ls -lt --reverse
```

## ls

指令 | 說明
---|---
ls /usr | 列出 /usr 目錄下的檔案
ls ~ /usr | 列出 home 與 usr 目錄下的檔案

ls 常見 options

option | long option | 說明
---|---|---
-a | --all | 列出所有檔案，包含隱藏檔
-d | --directory | 指定目錄，通常會用 `ls -ld`
-F | --classify | 列出目錄時會加上 /
-h | --human-readable | file size 好讀版
-l | | long format
-r | --reverse | 依據檔名字母順序倒序顯示，通常 ls 會根據字母排序
-S | | 依據 file size 排序
-t | | 依據 modification time 排序

long option 範例

```shell
-rw-r--r-- 1 root root 3576296 2007-04-03 11:05 Experience ubuntu.ogg
-rw-r--r-- 1 root root 1186219 2007-04-03 11:05 kubuntu-leaflet.png
-rw-r--r-- 1 root root 47584 2007-04-03 11:05 logo-Edubuntu.png
-rw-r--r-- 1 root root 44355 2007-04-03 11:05 logo-Kubuntu.png
-rw-r--r-- 1 root root 34391 2007-04-03 11:05 logo-Ubuntu.png
-rw-r--r-- 1 root root 32059 2007-04-03 11:05 oo-cd-cover.odf
-rw-r--r-- 1 root root 159744 2007-04-03 11:05 oo-derivatives.doc
-rw-r--r-- 1 root root 27837 2007-04-03 11:05 oo-maxwell.odt
-rw-r--r-- 1 root root 98816 2007-04-03 11:05 oo-trig.xls
-rw-r--r-- 1 root root 453764 2007-04-03 11:05 oo-welcome.odt
-rw-r--r-- 1 root root 358374 2007-04-03 11:05 ubuntu Sax.ogg
```

* `-rw-r--r--`: 權限，第一碼表示檔案類型(`-`表示檔案，`d`表示目錄)，接下來每三碼*一組，依序為擁有者(owner)、所屬群組、其他人是否去有讀、寫、執行的權限
* `1`: 連結數(hard link)
* `root`: 檔案擁有者
* `root`: 檔案所屬群組
* `32059`: 檔案大小(byte)
* `2007-04-03 11:05`: 檔案最後更改時間
* `oo-trig.xls`: 檔案名稱

## less is more

被設計用來取代 `more` 指令

```shell
# 格式: less filename
[me@linuxbox ~]$ less /etc/passwd
```

使用 less 時可用鍵盤指令
指令 | 動作
---|---
b | 往上滾動一頁
space | 往下滾動一頁
向上鍵 | 往上一行
向下鍵 | 往下一行
G | 移動到檔案末端
g | 移動到檔案開頭
/關鍵字 | 搜尋關鍵字
n | 移動到下一個關鍵字
h | 求救
q | 結束 less

## 探索目錄

1. cd 到指定路徑
2. ls -l 列出資料夾內容
3. 有興趣的檔案，使用 file
4. 看起來像文字檔，就用 less 透視他全身上下

## Symbolic Links(也被稱作 soft link 或 symlink)

`ln -s [來源檔] [目的檔]`

舉例來說有個很常使用的資源 `foo` 很常更新，通常就會加上版號。當他要升級時，所有使用到的地方都要跟著改變，很惱人。

symbolic links 出馬時，建立 `foo` 指向 `foo-2.6`，所有使用到的地方就跟著升級。`foo` 要升級到 2.7 版時，先把把新版的 `foo` 下載好，刪除原有 symbolic link，建立新的 link 到 2.7 版

## Hard Links

`ln [來源檔] [目的檔]`