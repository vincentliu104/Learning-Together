<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [13 – A Gentle Introduction To vi](#13--a-gentle-introduction-to-vi)
  - [Why We Should Learn vi](#why-we-should-learn-vi)
  - [A Little Background](#a-little-background)
  - [Starting And Stopping vi](#starting-and-stopping-vi)
  - [Editing Modes](#editing-modes)
    - [Entering Insert Mode](#entering-insert-mode)
    - [Saving Our Work](#saving-our-work)
    - [移動游標(Moving The Cursor Around)](#%E7%A7%BB%E5%8B%95%E6%B8%B8%E6%A8%99moving-the-cursor-around)
  - [Basic Editing](#basic-editing)
    - [Appending Text](#appending-text)
    - [新增一行(Opening A Line)](#%E6%96%B0%E5%A2%9E%E4%B8%80%E8%A1%8Copening-a-line)
    - [刪除文字(Deleting Text)](#%E5%88%AA%E9%99%A4%E6%96%87%E5%AD%97deleting-text)
  - [剪下、複製、貼上(Cutting, Copying And Pasting Text)](#%E5%89%AA%E4%B8%8B%E8%A4%87%E8%A3%BD%E8%B2%BC%E4%B8%8Acutting-copying-and-pasting-text)
    - [Joining Lines](#joining-lines)
  - [搜尋與取代(Search And Replace)](#%E6%90%9C%E5%B0%8B%E8%88%87%E5%8F%96%E4%BB%A3search-and-replace)
    - [Searching Within A Line](#searching-within-a-line)
    - [Searching The Entire File](#searching-the-entire-file)
    - [Global Search And Replace](#global-search-and-replace)
  - [Editing Multiple Files](#editing-multiple-files)
    - [切換檔案(Switching Between Files)](#%E5%88%87%E6%8F%9B%E6%AA%94%E6%A1%88switching-between-files)
    - [開啟額外檔案(Opening Additional Files For Editing)](#%E9%96%8B%E5%95%9F%E9%A1%8D%E5%A4%96%E6%AA%94%E6%A1%88opening-additional-files-for-editing)
    - [Copying Content From One File Into Another](#copying-content-from-one-file-into-another)
    - [Inserting An Entire File Into Another](#inserting-an-entire-file-into-another)
  - [儲存(Saving Our Work)](#%E5%84%B2%E5%AD%98saving-our-work)
  - [更多介紹](#%E6%9B%B4%E5%A4%9A%E4%BB%8B%E7%B4%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 13 – A Gentle Introduction To vi

vi 包含在 vim 中

## Why We Should Learn vi

- 通常系統都會有 vi
- 輕量及快速
- 不讓其他 Linux 或 Unix 使用者認為你是娘炮

## A Little Background

第一版的 vi 是由 UCB 的學生 Bill Joy 在 1967 年所撰寫，後來與他人共同創立 Sun Microsystems。 vi 的名稱來自於 `visual`。在 `visual` editor 之前，曾有一次只能編輯一行的 `line` editor。vi 併入了 line editor `ex`，使用 vi 時可以使用行編輯指令

多數 Linux 發行版本並沒有 vi，取而代之的是 vim(vi improved) by Bram Moolenaar，vim 通常會 symlink 到 vi 或使用別名

## Starting And Stopping vi

如果你在 vi 中迷失了，按兩次 `Esc` 可以解救你

```shell
vi

# 接下來會是
~                                      VIM - Vi IMproved
~
~                                      version 8.0.1283
~                                  by Bram Moolenaar et al.
~                         Vim is open source and freely distributable
~
~                                Help poor children in Uganda!
~                       type  :help iccf<Enter>       for information
~
~                       type  :q<Enter>               to exit
~                       type  :help<Enter>  or  <F1>  for on-line help
~                       type  :help version8<Enter>   for version info

# 離開 vi
:q

# 強制離開 vi
:q!
```

## Editing Modes

`~` 表示這行沒有任何字

vi 是 modal editor，在 vi 啟動後會處於指令模式(command mode)，任何按鍵都會是
指令

```shell
rm -f foo.txt
vi foo.txt
```

### Entering Insert Mode

按下 `i`，termail 會出現狀態文字，要離開 insert mode 按下 `Esc`

```shell
-- INSERT --
```

### Saving Our Work

須在指令模式輸入 ex 指令，按下 `:` 即可

```shell
# 寫入修改的檔案
:q
```

### 移動游標(Moving The Cursor Around)

指令模式下，vi 提供大量的指令，有一部份會和 `less` 共用

Key | Moves The Cursor
----|-----------------
l or Right Arrow | 往右一個字元
h or Left Arrow | 往左一個字元
j or Down Arrow | 往下一行
k or Up Arrow | 往上一行
0 (zero) | 到此行開頭
^ | 到此行第一個非空白字元
$ | 到此行尾
w | 到下一個字的開頭或標點符號
W | 到下一個字的開頭，忽略標點符號
b | 到前一個字的開頭或標點符號
B | 到前一個字的開頭，忽略標點符號
Ctrl-f or Page Down | 到下一頁
Ctrl-b or Page Up | 回上一頁
numberG | 到指定行數，例如 1G 游標就會移到第 1 行
G | 到檔案行尾

h, j, k, l 用來移動游標是因為，並非全部的 terminal 都有方向鍵

多數的指令可以前方加上數字，表示重複執行的次數，例如 `5j` 表示游標往下移動五行

## Basic Editing

vi 復原的方式是在指令模式時按下 `u`(undo)

vi 僅支援復原一次，vim 可復原多次

### Appending Text

`a`: 會讓游標晃下一個字移動，進入 insert mode

### 新增一行(Opening A Line)

Command     Opens
o(小 O)     下方加一行
O           上方加一行

### 刪除文字(Deleting Text)

Command | Deletes
--------|--------
x | 游標所在文字
3x | 游標所在文字，加上之後的兩個
dd | 游標所在行的所有文字
5dd | 目前行的文，加上之後的四行
dW | 游標所在到下一個字的開頭
d$ | 游標所在到行尾
d0 | 游標所在到此行開頭
d^ | 游標所在到第一個非空白字元
dG | 游標所在行到檔案末端
d20G | 游標所在行到第二十行

## 剪下、複製、貼上(Cutting, Copying And Pasting Text)

d 指令不只刪除文字，同時會剪下文字，之後可以用  p 指令貼上，y 使用來複製

Command | Copies
--------|-------
yy | 游標所在行
5yy | 游標所在行，加上接下來的 4 行
yW | 游標所在到下一個字的開頭
y$ | 游標所在到行尾
y0 | 游標所在到此行開頭
y^ | 游標所在到第一個非空白字元
yG | 游標所在行到檔案末端
y20G | 游標所在行到第二十行

大寫 P 會貼上游標上方一行

### Joining Lines

`J` 結合游標所在行跟下一行

## 搜尋與取代(Search And Replace)

### Searching Within A Line

f: 在游標所在行搜尋

### Searching The Entire File

/: 與 less 指令相同，在輸關鍵字按下 Enter 即可，按下 n 跳到下一個

### Global Search And Replace

例如把  Line 換成 line

```shell
:%s/Line/line/gc
```

item | Meaning
-----|--------
: | ex 指令的開頭
% | 指定行數範圍，% 代表全部，`1,5`代表第一行到第五行，`1,$`代表第一行到最後一行。如果未指定，就只會在目前行數作業
s | 指定作業，`s`表示搜尋及取代
/Line/line/ | The search pattern and the replacement text.
g | 全域性(global)。如果未指定，只會取代每一行第一個找到的字串
c | 取代時，會要求確認，例如 `replace with Line (y/n/a/q/l/^E/^Y)?`

## Editing Multiple Files

```shell
# vi file1 file2 file3...

ls -l /usr/bin > ls-output.txt
vi foo.txt ls-output.txt
```

### 切換檔案(Switching Between Files)

如果更動後沒儲存，vi 不會讓你切換檔案，除非你加上 `!`

`:n`: ex 指令，下一個
`:N`: ex 指令，上一個
`:buffers`: vim 提供的 ex 指令，讓你輕鬆切換檔案
`:buffer 2`: 切換到第二個檔案

### 開啟額外檔案(Opening Additional Files For Editing)

```shell
vi foo.txt
:e ls-output.txt
```

### Copying Content From One File Into Another

```shell
# 切換到 buffer 1
:buffer 1

# 複製一行
yy

#切換到 buffer 2
:buffer 2

# 貼上
p
```

### Inserting An Entire File Into Another

```shell
vi ls-output.txt

# 游標前的內容複製到 foo.txt
:r foo.txt
```

## 儲存(Saving Our Work)

- `ZZ`: 指令模式下，純存檔案然後離開 vi
- `:wq`: 同上
- `:w`: 可指定檔案名稱，類性 `另存為`，要注意儲存後你還是在編輯原本的檔案

```shell
# 假設你正在編輯 foo.txt，想把他另存為 foo1.txt
:w foo1.txt
```

## 更多介紹

- [Learning The vi Editor](http://en.wikibooks.org/wiki/Vi) A Wikibook from Wikipedia that offers a concise guide to vi and several of its work-a-likes including vim
- [The Vim Book](ftp://ftp.vim.org/pub/vim/doc/book/vimbook-OPL.pdf) The vim project has a 570-page book that covers (almost) all of the features in vim.
- [A Wikipedia article on Bill Joy](http://en.wikipedia.org/wiki/Bill_Joy)
- [A Wikipedia article on Bram Moolenaar](http://en.wikipedia.org/wiki/Bram_Moolenaar) the author of vim