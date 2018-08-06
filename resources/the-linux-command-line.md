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

## 3 – 導覽(Navigation)

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

## 4 – 探索系統(Exploring The System)

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

### ls

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

### less is more

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

### 探索目錄

1. cd 到指定路徑
2. ls -l 列出資料夾內容
3. 有興趣的檔案，使用 file
4. 看起來像文字檔，就用 less 透視他全身上下

### Symbolic Links(也被稱作 soft link 或 symlink)

`ln -s [來源檔] [目的檔]`

舉例來說有個很常使用的資源 `foo` 很常更新，通常就會加上版號。當他要升級時，所有使用到的地方都要跟著改變，很惱人。

symbolic links 出馬時，建立 `foo` 指向 `foo-2.6`，所有使用到的地方就跟著升級。`foo` 要升級到 2.7 版時，先把把新版的 `foo` 下載好，刪除原有 symbolic link，建立新的 link 到 2.7 版

### Hard Links

`ln [來源檔] [目的檔]`

## 5 – 檔案及目錄操作(Manipulating Files And Directoried)

主要介紹指令

* `cp`: 複製檔案及目錄
* `mv`: 移動/重新命名檔案及目錄
* `mkdir`: 建立目錄
* `rm`: 移除檔案及目錄
* `ln`: 建立 hard and symbolic links

GUI 可以達成這些事為什麼還需要指令呢？因為 command line 可以處理大量重複性的工作，譬如複製所有的 html 到另一個資料夾，而且目的地資料夾不存在這些 html

```shell
cp -u *.html destination
```

### 萬用字元(wildcard or globbing)

可用來選出符合格式的檔案，chapter 8 會談更多

`*`: 任意字
`?`: 任意單個字
`[characters]`：任一個 characters 所列的字
`[!characters]`：非任一個 characters 所列的字
`[[:class:]]`
    `[:alnum:]`: 字母 + 數字
    `[:alpha:]`: 字母
    `[:digit:]`: 數字
    `[:lower:]`: 小寫字母
    `[:upper:]`: 大寫字母

### mkdir

```shell
# mkdir directory...
mkdir dir1
mkdir dir1 dir2 dir3
```

### cp

```shell
# 複製單一檔案或目錄: cp item1 item2
# 複製多個檔案或目錄: cp item... directory
cp file1 file2 # 複寫 file2 檔案前不會提示
cp -i file1 file2 # 複寫 file2 檔案前會提示
cp file1 file2 dir1 # 複製 file1, file2 到 dir1. dir1 必須已存在
cp dir1/* dir2 # dir1 下的檔案全部複製到 dir2. dir2 必須已存在
cp -r dir1 dir2 # 複製 dir1 下所有內容到 dir2. dir2 不存在時會建立
```

### mv

```shell
mv item1 item2 # 複寫前不會提示
mv item... directory
mv -i file1 file2 # 複寫前會提示
mv file1 file2 dir1
mv dir1 dir2 # dir2 不存在: dir1 複製後刪除. dir2 存在: dir1 複製到 dir2 下
```

### rm

使用萬用字元前請小心確認，`ls` 是你的好幫手

```shell
# rm item...
rm file1 # 安靜的刪除
rm -i file1 # 刪除前提示確認
rm -r file1 dir1
rm -rf file1 dir1 # 檔案或目錄不存在實會安靜的刪除
```

## ln

```shell
ln file link # hrad link
ln -s item link # symbolic link, item 可以是檔案或目錄
```

### Hard links

難以辨認

限制

1. 只能參照相同磁碟的檔案
2. 不能參照目錄

### Symbolic Links

特殊型態的檔案，指標指向檔案或目錄，類似 Windows 中的捷徑

如果參照的檔案或目錄先被刪除，會形成 broken link

### playground

```shell
# Creating Directories
cd
mkdir playground
cd playground
mkdir dir1 dir2

# Copying Files
cp /etc/passwd .
ls -l
cp -v /etc/passwd .
cp -i /etc/passwd .

# Moving And Renaming Files
mv passwd fun
mv fun dir1
mv dir1/fun dir2
mv dir2/fun .
mv fun dir1
mv dir1 dir2
ls -l dir2
ls -l dir2/dir1
mv dir2/dir1 .
mv dir1/fun .

# Creating Hard Links
ln fun fun-hard
ln fun dir1/fun-hard
ln fun dir2/fun-hard
ls -l
ls -li

# Creating Symbolic Links
ln -s fun fun-sym
ln -s ../fun dir1/fun-sym
ln -s ../fun dir2/fun-sym
ls -l dir1
ln -s /home/me/playground/fun dir1/fun-sym
ln -s dir1 dir1-sym
ls -l

# Removing Files And Directories
rm fun-hard
ls -l
rm -i fun
ls -l
less fun-sym
rm fun-sym dir1-sym
ls -l
cd
rm -r playground
```

## 6 – Working With Commands

comman 可分作四類

1. 可執行的程式(An executable program): 例如 /usr/bin 下的檔案
2. A command built into the shell itself: [殼層內建指令 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E6%AE%BC%E5%B1%A4%E5%85%A7%E5%BB%BA%E6%8C%87%E4%BB%A4)，例如 cd
3. A shell function.
4. An alias.

### 識別指令(Identifying Commands)

type 讓你知道你在用哪一種指令

```shell
[me@linuxbox ~]$ type type
type is a shell builtin
[me@linuxbox ~]$ type ls
ls is aliased to `ls --color=tty'
[me@linuxbox ~]$ type cp
cp is /bin/cp
```

which 讓你知道程式的位置

```shell
[me@linuxbox ~]$ which ls
/bin/ls
[me@linuxbox ~]$ which cd
/usr/bin/which: no cd in
(/opt/jre1.6.0_03/bin:/usr/lib/qt-3.3/bin:/usr/kerberos/bin:/opt/jre1
.6.0_03/bin:/usr/lib/ccache:/usr/local/bin:/usr/bin:/bin:/home/me/bin
)
```

### 查看指令文件

man 在多數 linux 系統使用 `less` 來顯示內文

```shell
man --help
mkdir --help
man ls
man 5 passwd
apropos whatis
whatis apropos
whatis whatis
info whatis
info coreutils
```

某些軟體在安裝時，會將文件放到 `/usr/shared/doc`，有純文字、HTML、.gz，.gz可使用 zless 查看

### 建立別名

小技巧

```shell
# command1; command2; command3...
cd /usr; ls; cd -
```

建立別名前請先用 `type` 確認

```shell
# alias name='string'

# 新增別名
alias foo='cd /usr; ls; cd -'

[me@linuxbox ~]$ type foo
foo is aliased to 'cd /usr; ls ; cd -'

# 移除別名
[me@linuxbox ~]$ unalias foo
[me@linuxbox ~]$ type foo
bash: type: foo: not found

# 查看系統設定什麼別名
alias
```

session 終止時，這些別名就會消失，後續會再介紹怎麼讓你登入時就可使用

## 7 – 資料流重導向(I/O Redirection)

最酷俊帥的指令，可以把指令的結果寫到檔案、結合指令(piplines)

Unix 中一切都是檔案

1. Standard Output: 例如 `ls` 的結果
1. Standard Error: status message
1. Standard Input: 通常是鍵盤

### Redirect Standard Output

`>`: 用來記錄指令的結果，原有檔案內容清空
`>>`: 用來附加指令的結果

```shell
[me@linuxbox ~]$ ls -l /usr/bin > ls-output.txt
[me@linuxbox ~]$ ls -l ls-output.txt
-rw-rw-r-- 1 me me 167878 2008-02-01 15:07 ls-output.txt
[me@linuxbox ~]$ less ls-output.txt

# 資料夾不存在，但 ls 只會輸出 Standard Output，所以 console 還是會顯示 Standard Error
[me@linuxbox ~]$ ls -l /bin/usr > ls-output.txt
ls: cannot access /bin/usr: No such file or directory

# file size 變 0，因為剛剛下錯指令
[me@linuxbox ~]$ ls -l ls-output.txt
-rw-rw-r-- 1 me me 0 2008-02-01 15:08 ls-output.txt

# 清空(truncate)檔案
[me@linuxbox ~]$ > ls-output.txt

[me@linuxbox ~]$ ls -l /usr/bin >> ls-output.txt

[me@linuxbox ~]$ ls -l /usr/bin >> ls-output.txt
[me@linuxbox ~]$ ls -l /usr/bin >> ls-output.txt
[me@linuxbox ~]$ ls -l /usr/bin >> ls-output.txt
[me@linuxbox ~]$ ls -l ls-output.txt
-rw-rw-r-- 1 me me 503634 2008-02-01 15:45 ls-output.txt
```

### Redirecting Standard Error

如果要記錄錯誤訊息需使用檔案描述符號(file descriptor)

file stream | file descriptor
------------|----------------
standard input | 0
standard output | 1
standard error | 2

```shell
[me@linuxbox ~]$ ls -l /bin/usr 2> ls-error.txt
```

#### Redirecting Standard Output And Standard Error To One File

output, error 都想收集也是有辦法的，但需要注意 redirection 的順序，standard error 從會在 standard ouput 後出現

```shell
# 舊版本的 shell 支援
[me@linuxbox ~]$ ls -l /bin/usr > ls-output.txt 2>&1
# 使用 &= 的方式
[me@linuxbox ~]$ ls -l /bin/usr &> ls-output.txt

>ls-output.txt 2>&1

# 順序錯了，結果會直接顯示在 console
2>&1 >ls-output.txt
```

#### Disposing Of Unwanted Output

沈默是金，有時候不論對錯你都不想知道時，可以利用 `/dev/null`(特殊的 system device  稱作 bit bucket，接收 input 但不做任何事)。當有人說會把你的意見放到 `/dev/null`，你就會懂那是什麼意思了

```shell
[me@linuxbox ~]$ ls -l /bin/usr 2> /dev/null
```

### Redirecting Standard Input

`cat`: 讀取檔案內容，然後複製到 standard output，通常內容少的時候才會用，`man` 可查看有趣的 option

```shell
# format: cat [file...]
[me@linuxbox ~]$ cat ls-output.txt

# 檔案結合：movie.mpeg.001 movie.mpeg.002 ... movie.mpeg.099
cat movie.mpeg.0* > movie.mpeg

# 沒給參數，standrad input 就要由你輸入，用 Ctrl+d 告訴他已到檔案尾端(EOF)了
cat

# 建立文字檔
[me@linuxbox ~]$ cat > lazy_dog.txt
The quick brown fox jumped over the lazy dog.

# 不常使用
[me@linuxbox ~]$ cat < lazy_dog.txt
The quick brown fox jumped over the lazy dog.
```

### Pipelines

第一個指令的 output 作為第二個指令的 input

```shell
# command1 | command2
[me@linuxbox ~]$ ls -l /usr/bin | less
```

### Filters

`sort`: 排序

```shell
ls /bin /usr/bin | sort | less
```

`uniq`: 通常會和 `sort` 一起使用，消除重複的內容

```shell
# 列不重複的
ls /bin /usr/bin | sort | uniq | less

# 列出重複的
s /bin /usr/bin | sort | uniq -d | less
```

`wc`: 列出行數、字、字元(lines, words, and bytes)數量

```shell
[me@linuxbox ~]$ wc ls-output.txt
7902 64566 503634 ls-output.txt

# 僅看行數
[me@linuxbox ~]$ ls /bin /usr/bin | sort | uniq | wc -l
2728
```

`grep`: 列出符合樣式的該行，很好用的工具

```shell
#grep pattern [file...]

# 找出所有的 zip
ls /bin /usr/bin | sort | uniq | grep zip

# 不論大小寫
ls /bin /usr/bin | sort | uniq | grep zip -i

# 不符合的才列出
ls /bin /usr/bin | sort | uniq | grep zip -v
```

* `head`: 檔案開頭
* `tail`: 檔案尾巴

```shell
# 前 5 行
head -n 5 ls-output.txt

# 後 5 行
tail -n 5 ls-output.txt

ls /usr/bin | tail -n 5

# 即時查看，Ctrl+c 離開
tail -f /var/log/messages
```

`tee`: 可將 input 同時複製到 output 及檔案

```shell
[me@linuxbox ~]$ ls /usr/bin | tee ls.txt | grep zip
bunzip2
bzip2
gunzip
gzip
unzip
zip
zipcloak
zipgrep
zipinfo
zipnote
zipsplit
```

## 8 – Seeing The World As The Shell Sees It

`echo`: 顯示一行字

### Expansion

在你打完指令按下 enter，bash 會先進行一系列動作才執行指令，例如處理萬元字元(*)，這個流程被稱做 `Expansion`

```shell
echo this is a test

# 目前目錄的所有檔案
echo *
Applications Desktop Documents Downloads Library Movies Music Pictures Public
```

#### Pathname Expansion

跟 `ls` 相同，預設不會顯示隱藏檔案

```shell
ls

# D 開頭的檔案
[me@linuxbox ~]$ echo D*
Desktop Documents

# s 結尾的黨案
[me@linuxbox ~]$ echo *s
Documents Pictures Templates Videos

# 大寫字母開頭的檔案
[me@linuxbox ~]$ echo [[:upper:]]*
Desktop Documents Music Pictures Public Templates Videos

[me@linuxbox ~]$ echo /usr/*/share
/usr/kerberos/share /usr/local/share

# 列出隱藏檔案
echo .*
ls -d .* | less
```

#### Tilde Expansion

使用 `cd` 時有提到具有特殊含義的 `~`，代表 home 目錄

```shell
echo ~
echo ~foo # 假如有 foo 帳號存在時
echo ~guest
```

#### Arithmetic Expansion

格式: `$((expression))`

`+`: 加
`-`: 減
`*`: 乘
`/`: 除，僅支援整數
`%`: 餘數
`**`: 指數

```shell
echo $((2 + 2))
echo $(($((5**2)) * 3))
echo $(((5**2) * 3))
echo Five divided by two equals $((5/2))
```

#### Brace Expansion

很強大

```shell
[me@linuxbox ~]$ echo Front-{A,B,C}-Back
Front-A-Back Front-B-Back Front-C-Back

[me@linuxbox ~]$ echo Number_{1..5}

[me@linuxbox ~]$ echo {Z..A}
Z Y X W V U T S R Q P O N M L K J I H G F E D C B A

[me@linuxbox ~]$ echo a{A{1,2},B{3,4}}b
aA1b aA2b aB3b aB4b

# 產生 2016 - 2018 的月份資料夾
[me@linuxbox ~]$ mkdir Pics
[me@linuxbox ~]$ cd Pics
[me@linuxbox Pics]$ mkdir {2016..20018}-0{1..9} {2016..2018}-{10..12}
[me@linuxbox Pics]$ ls
```

#### Parameter Expansion

```shell
echo $USER

printenv | less

# parameter expension 拼錯字不會跟你講有什麼錯
echo $SUER
```

#### Command Substitution

把指令的輸出作為 expension

```shell
echo $(ls)

ls -l $(which cp)

# 結合 pipeline
file $(ls /usr/bin/* | grep zip)

# 舊版本的 shell
ls -l `which cp`
```

### Quoting

```shell
# 多餘空白會被去除
[me@linuxbox ~]$ echo this is a test
this is a test

# 因為 $1 是未定義的變數(undefined variable)
[me@linuxbox ~]$ echo The total is $100.00
The total is 00.00
```

#### Double Quotes

雙引號中，shell 認得的特殊字元會失去其意義，例外的有 $, \\, `

```shell
# word-splitting
[me@linuxbox ~]$ ls -l two words.txt
ls: cannot access two: No such file or directory
ls: cannot access words.txt: No such file or directory

# 找到 two words.txt，然後重新命名為 two_words.txt.
[me@linuxbox ~]$ ls -l "two words.txt"
-rw-rw-r-- 1 me me 18 2008-02-20 13:03 two words.txt
[me@linuxbox ~]$ mv "two words.txt" two_words.txt

# word-splitting 會去除多餘 spaces, tabs, and newlines (linefeed characters)，將其視為分隔符號(delimiters)
[me@linuxbox ~]$ echo this is a test
this is a test

[me@linuxbox ~]$ echo "this is a      test"
this is a      test

[me@linuxbox ~]$ echo $(cal)
8月 2018 日 一 二 三 四 五 六 1 2 3  4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31

[me@linuxbox ~]$ echo "$(cal)"
      8月 2018
日 一 二 三 四 五 六
          1  2  3  4
 5  6  7  8  9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30 31
```

#### Single Quotes

比較 unquoted, double quotes, and single quotes

```shell
[me@linuxbox ~]$ echo text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER
text /home/me/ls-output.txt a b foo 4 me

[me@linuxbox ~]$ echo "text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER"
text ~/*.txt {a,b} foo 4 me

[me@linuxbox ~]$ echo 'text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER'
text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER
```

#### Escaping Characters

使用 backslash(`\`)

```shell
[me@linuxbox ~]$ echo "The balance for user $USER is: \$5.00"
The balance for user me is: $5.00

# 檔案名稱裡有特殊符號
[me@linuxbox ~]$ mv bad\&filename good_filename

sleep 10; echo -e "Time's up\a"
sleep 10; echo "Time's up" $'\a'
```

## 9 – 進階鍵盤操作(Advanced Keyboard Tricks)

作者指出 Unix 是給喜歡打指令的人用的，但人通常很懶得打字，不然怎們會有指令叫做 `cp`, `ls`, `mv`

本篇會介紹的指令

* `clear`
* `history`

### Command Line Editing

bash 使用被稱作 _Readline_ 的 library 來實現指令列編輯

#### Cursor Movement

key | Action
----|-------
Ctrl-a | 游標移到行首
Ctrl-e | 游標移到行尾
Ctrl-f | 往右移動一個字，跟按下右箭頭鍵一樣
Ctrl-b | 往左移動一個字，跟按下左箭頭鍵一樣
Alt-f(Esc-f) | 往右移動一個單字
Alt-b(Esc-b) | 往左移動一個單字
Ctrl-l | 清除螢幕上的指令，跟指令 `clear` 一樣

#### Modifying Text

Key | Action
----|-------
Ctrl-d | 刪除游標所在的字
Ctrl-t | 把游標所在的字跟前一個交換
Alt-t(Esc-t) | 把游標所在的單字跟前一個交換
Alt-l(Esc-l) | 把游標所在的到單字尾，變成小寫
Alt-u(Esc-u) | 把游標所在的到單字尾，變成大寫

#### Cutting And Pasting (Killing And Yanking) Text

Key | Action
----|-------
Ctrl-k | 把游標後方的字刪除
Ctrl-u | 把游標所在行的字刪除
Alt-d(Esc-d) | 把游標所在的單字刪除
Alt-Backspace(Esc-Backspace) | 把游標所在的前一個單字刪除
Ctrl-y | Yank text from the kill-ring and insert it at the cursor location.

### Completion

鍵盤: `tab`

```shell
[me@linuxbox ~]$ ls
Desktop ls-output.txt Pictures Templates Videos
Documents Music Public

set | less
```

### Using History

你曾經下過的指令

```shell
history | less

[me@linuxbox ~]$ history | grep /usr/bin
1482  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
1492  cd /usr/bin/php
1493  cd /usr/bin/
1504  /usr/bin/ruby -e "$(curl -fsSLhttps://raw.githubusercontent.com/Homebrew/install/master/install)"
1547  /usr/bin/php -v
5023  ls /bin /usr/bin | sort | uniq | less
5024  ls /bin /usr/bin | sort | uniq -d | less
5025  ls /usr/bin /usr/bin | sort | uniq -d | less
5028  ls /bin /usr/bin | sort | uniq | wc -l
5029  ls /bin /usr/bin | sort | uniq | grep zip
5030  ls /bin /usr/bin | sort | uniq | grep zip -v
5066  file $(ls /usr/bin/* | grep zip)
5101  echo $(ls)\nls -l $(which cp)\nfile $(ls /usr/bin/* | grep zip)\nls -l `which cp`

# history expension: 把該指令輸出
[me@linuxbox ~]$ !5030
```

Key | Action
----|-------
Ctrl-p | 移到上一個 hostory 項目
Ctrl-n | 移到下一個 hostory 項目
Alt-< | 移到 hostory 開頭
Alt-> | 移到 hostory 結尾
Ctrl-r | Reverse incremental search. Searches incrementally from the current command line up the history list.
Alt-p | Reverse search, non-incremental. With this key, type in the search string and press enter before the search is performed.
Alt-n | Forward search, non-incremental.
Ctrl-o | 執行目前 history 項目，然後移到下一個。在執行一系列指令時很實用

#### History Expansion

Sequence | Action
----|-------
!! | Repeat the last command. It is probably easier to press up arrow and enter.
!number | Repeat history list item number.
!string | Repeat last history list item starting with string.
!?string | Repeat last history list item containing string.

## 10 –權限 (Permissions)

Unix 可提供多位 user 透過 ssh(secure shell) 同時使用，因此需要有控管機制，避免 user 間相互影響

主要介紹指令

1. `id`: 查詢帳號資訊
2. `chmod`: 變更檔案權限
3. `umask`: umask
4. `su`: 切換身份執行 shell
5. `sudo`: 用其身身份執行指令
6. `chown`: 變更檔案擁有者
7. `chgrp`: 變更檔案擁有群組
8. `passwd`: 變更密碼

### Owners, Group Members, And Everybody Else

```shell
# 目前 user 沒有讀取權限
[me@linuxbox ~]$ file /etc/shadow
/etc/shadow: regular file, no read permission
[me@linuxbox ~]$ less /etc/shadow
/etc/shadow: Permission denied

# Fedora System, 帳號建立時，會賦予 id 或 uid 對應到 user name，user 會被指定到一個群組(primary group ID or gid)
# 通常會從 500 開始給編號
[me@linuxbox ~]$ id
uid=500(me) gid=500(me) groups=500(me)

# Ubuntu System
# 通常會從 1000 開始給編號
[me@linuxbox ~]$ id
uid=1000(me) gid=1000(me)
groups=4(adm),20(dialout),24(cdrom),25(floppy),29(audio),30(dip),44(v
ideo),46(plugdev),108(lpadmin),114(admin),1000(me)

# group database
less /etc/group

# user database: user name, uid, gid, real name, home directory, login shell
less /etc/passwd

# /etc/shadow 存放 user 密碼
```

### Reading, Writing, And Executing

存取權限分為: 讀(read), 寫(write) 執行(execution)

```shell
[me@linuxbox ~]$ > foo.txt
[me@linuxbox ~]$ ls -l foo.txt
# 開頭10個字是 file attributes，第一個是 file type
-rw-rw-r-- 1 me me 0 2008-03-06 14:52 foo.txt
```

檔案類型(file type)

Attribute | File Type
----------|----------
`-` | 普通檔案
`d` | 資料夾
`l` | symbolic link，通常接下來會是 `rwxrwxrwx` 加上 dummy values，實際檔案要看他指向哪裡
`c` | character special file，通常指稱可字元串流(stream of bytes)處理資料的裝置如 terminal, modem
`b` | block special file，通常指稱可區塊(block)處理資料的裝置如硬碟、CD-ROM drive

(file mode): 剩下的九個字

Owner | Group | World
------|-------|------
rwx | rwx | rwx

Permission Attributes

Attribute | Files | Directories
----------|-------|------------
r | 可開啟、讀取 | 具有 execute attribute 時，可列出目錄內容
w | 可寫入、清空，無法重新命名或刪除，要依目錄屬性而定 | 目錄內的檔案可建立、刪除，重新命名需具有 execute attribute
x | 檔案可視為可執行的程式，通常也要設定成可讀才能執行 | 允許進入目錄(如 `cd`)

### chmod – Change file mode

只有檔案擁有者或 superuser 才能操作，提供 8 進位數字表示(octal number)或符號(symbolic)表示方式來變更

8 進位 | 2進位 | File Mode
-----|-----|----------
0 | 000 | ---
1 | 001 | --x
2 | 010 | -w-
3 | 011 | -wx
4 | 100 | r--
5 | 101 | r-x
6 | 110 | rw-
7 | 111 | rwx

```shell
[me@linuxbox ~]$ > foo.txt
[me@linuxbox ~]$ ls -l foo.txt
-rw-rw-r-- 1 me me 0 2008-03-06 14:52 foo.txt
[me@linuxbox ~]$ chmod 600 foo.txt
[me@linuxbox ~]$ ls -l foo.txt
-rw------- 1 me me 0 2008-03-06 14:52 foo.txt
```

Symbol | Meaning
-------|--------
u | 簡寫 “use,r” 但表示檔案或資料夾的擁有者
g | Group owner.
o | 簡寫 “others,” 但表示所有人
a | 簡寫 “all.” 組合 “u”, “g”, and “o”.

如果沒有特別指定符號時，檢預設使用 `all`，再加上 `+`, `-`，表示增加或移除權限，`=` 表示除了指定權限以外，其他的都移除

### umask – Set Default Permissions

`umask` 控制了檔案新增時給予的權限，使用 8 進位數字表示

* Original file mode: `--- rw- rw- rw-`
* Mask: `000 000 000 010`
* Result: `--- rw- rw- r--`

### Changing Identities

1. 登入在登入(不方便的方法就不介紹了)
1. `su`
1. `suod`: 管理者可用 `/etc/sudoers` 控管

#### su – Run A Shell With Substitute User And Group IDs

```shell
# 格式: su [-[l]] [user]
# -l 可簡寫為 -
[me@linuxbox ~]$ su -
Password:
[root@linuxbox ~]#

[root@linuxbox ~]# exit
[me@linuxbox ~]$

# 直接執行指令 su -c 'command'
[me@linuxbox ~]$ su -c 'ls -l /root/*'
Password:
-rw------- 1 root root 754 2007-08-11 03:19 /root/anaconda-ks.cfg
/root/Mail:
total 0
[me@linuxbox ~]$
```

#### sudo – Execute A Command As Another User

類似 `su`，管理者可以設定 `sudo` 讓 user 可以用其他身份執行指令(通常是 superuser)，使用 `sudo` 也不會讓 user 接觸到 superuser 的密碼，直接使用自己的密碼即可，`sudo` 也不會開啟新的 shell(免用引號把指令刮起來)

```shell
[me@linuxbox ~]$ sudo backup_script
Password:
System Backup Starting...

# 查看 sudo 准許你使用的指令
[me@linuxbox ~]$ sudo -l
User me may run the following commands on this host:
(ALL) ALL
```

#### chown – Change File Owner And Group

使用 `sudo` 通常只需打一次密碼，他會讓你可以用幾分鐘

```shell
# chown [owner][:[group]] file...
# janet 複製檔案給 tony，把 group owner 改為 tony
[janet@linuxbox ~]$ sudo cp myfile.txt ~tony
Password:
[janet@linuxbox ~]$ sudo ls -l ~tony/myfile.txt
-rw-r--r-- 1 root root 8031 2008-03-20 14:30 /home/tony/myfile.txt
[janet@linuxbox ~]$ sudo chown tony: ~tony/myfile.txt
[janet@linuxbox ~]$ sudo ls -l ~tony/myfile.txt
-rw-r--r-- 1 tony tony 8031 2008-03-20 14:30 /home/tony/myfile.txt
```

#### chgrp – Change Group Ownership

TODO

#### Changing Your Password

通常會需要有一定強度的密碼

```shell
# passwd [user]
```