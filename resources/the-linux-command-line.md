# The Linux Command Line

書籍：[The Linux Command Line](https://www.amazon.com/Linux-Command-Line-Complete-Introduction/dp/1593273894)

本書內容範圍(不講管理系統)

1. shell
2. 設定與環境
3. 一般工作與必要工具
4. shell script

## 1 – Introduction

1991 Linus Torvalds 開發了第一版的 Linux Kernel
Richard Stallman 啟動 GUN 計畫，建立 free Unix-like OS
作者因在技術上較準確，決定叫他“Linux/GNU”

## 2 – Shell 是啥咪東東？

把指令傳給 OS 處理。幾乎所有Linux distributions 都提供了來自 GUN project 的 bash(“Bourne Again SHell”)
Terminal Emulators: 跟 shell 互動的工具(KDE uses konsole and GNOME uses gnome-terminal)

shell prompt: shell 準備好接收 input，通常會是 `[username@machinename working directory]$`，如果最後的符號是 `#`，代表現在使用 `root` 身份或是使用具有 `superuser(administrative)` 權限的 terminal

```shell
[me@linuxbox ~]$
[yi-liangliu@iMac ~]$
```

command history: 上/下方向鍵，查看 command 歷史紀錄
小技巧: terminal 選取過的文字 X Window System 支援按滑鼠中鍵貼上，Ctrl-c and Ctrl-v 有其他含義

簡單指令

指令 | 說明
---|---
date | 現在時間
cal | 日曆
df | 硬碟用量
free | 記憶體用量, mac: top -l 1 | head -n 10 | grep PhysMem
exit | 離開

## 3 – Navigation

Linux 利用 hierarchical directory structure 管理檔案，最上層是 root，Linux 只會有一份 file system tree，額外儲存設備都是由管理人員掛載上的(精準地說是 mount)，每個使用者登入後都會先進到自己的 home directory

主要介紹指令

1. `pwd`: 目前所在目錄
1. `cd`: 切換目錄，可使用絕對路徑(absolute path)或相對路徑(relative path)
1. `ls`: 列出目前目錄的檔案內容

指令 | 說明
---|---
cd . | # 到目前 working directory
cd .. | # 到目前 working directory 上一層
cd - | # 切換到剛剛的 working directory
cd | # 切換到 home 目錄
cd ~user_name | # 切換到 user_name 的 home 目錄
ls -a | # 包含隱藏檔案

重要資訊

* 檔案名稱以 `.` 開頭的是隱藏檔，你的 `home` 目錄有滿多的
* 檔案名稱與指令是區分大小寫(case sensitive)
* Linux 沒有副檔名(file extension)的概念，對些許 application 才有意義
* 檔案名稱可包含標點符號及空白，千萬不要使用空白，萬不得已建議改用 underscore

## 4 – Exploring The System

主要介紹指令

1. `ls`: 最常使用的指令，可以看目前目錄下有哪些檔案
1. `file`
1. `less`

選項(Options)與參數(Arguments)

大多數下指令時，都會加上一個或多個選項

```shell
# 格式: command -options arguments
ls -lt
ls -lt --reverse
```

指令 | 說明
---|---
ls /usr | 列出 /usr 目錄下的檔案
ls ~ /usr | 列出 home 與 usr 目錄下的檔案
file | Determine file type
less | View file contents，專門用來看文字類型的檔案，如：設定檔、script

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