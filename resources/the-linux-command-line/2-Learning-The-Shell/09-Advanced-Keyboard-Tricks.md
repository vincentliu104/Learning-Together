<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [9 – 進階鍵盤操作(Advanced Keyboard Tricks)](#9--%E9%80%B2%E9%9A%8E%E9%8D%B5%E7%9B%A4%E6%93%8D%E4%BD%9Cadvanced-keyboard-tricks)
  - [Command Line Editing](#command-line-editing)
    - [Cursor Movement](#cursor-movement)
    - [Modifying Text](#modifying-text)
    - [Cutting And Pasting (Killing And Yanking) Text](#cutting-and-pasting-killing-and-yanking-text)
  - [Completion](#completion)
  - [Using History](#using-history)
    - [History Expansion](#history-expansion)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 9 – 進階鍵盤操作(Advanced Keyboard Tricks)

作者指出 Unix 是給喜歡打指令的人用的，但人通常很懶得打字，不然怎們會有指令叫做 `cp`, `ls`, `mv`

本篇會介紹的指令

* `clear`
* `history`

## Command Line Editing

bash 使用被稱作 _Readline_ 的 library 來實現指令列編輯

### Cursor Movement

key | Action
----|-------
Ctrl-a | 游標移到行首
Ctrl-e | 游標移到行尾
Ctrl-f | 往右移動一個字，跟按下右箭頭鍵一樣
Ctrl-b | 往左移動一個字，跟按下左箭頭鍵一樣
Alt-f(Esc-f) | 往右移動一個單字
Alt-b(Esc-b) | 往左移動一個單字
Ctrl-l | 清除螢幕上的指令，跟指令 `clear` 一樣

### Modifying Text

Key | Action
----|-------
Ctrl-d | 刪除游標所在的字
Ctrl-t | 把游標所在的字跟前一個交換
Alt-t(Esc-t) | 把游標所在的單字跟前一個交換
Alt-l(Esc-l) | 把游標所在的到單字尾，變成小寫
Alt-u(Esc-u) | 把游標所在的到單字尾，變成大寫

### Cutting And Pasting (Killing And Yanking) Text

Key | Action
----|-------
Ctrl-k | 把游標後方的字刪除
Ctrl-u | 把游標所在行的字刪除
Alt-d(Esc-d) | 把游標所在的單字刪除
Alt-Backspace(Esc-Backspace) | 把游標所在的前一個單字刪除
Ctrl-y | Yank text from the kill-ring and insert it at the cursor location.

## Completion

鍵盤: `tab`

```shell
[me@linuxbox ~]$ ls
Desktop ls-output.txt Pictures Templates Videos
Documents Music Public

set | less
```

## Using History

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

### History Expansion

Sequence | Action
----|-------
!! | Repeat the last command. It is probably easier to press up arrow and enter.
!number | Repeat history list item number.
!string | Repeat last history list item starting with string.
!?string | Repeat last history list item containing string.