<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [12 – The Environment](#12--the-environment)
  - [What Is Stored In The Environment](#what-is-stored-in-the-environment)
    - [Examining The Environment](#examining-the-environment)
    - [Some Interesting Variables](#some-interesting-variables)
  - [How Is The Environment Established](#how-is-the-environment-established)
    - [What's In A Startup File](#whats-in-a-startup-file)
  - [Modifying The Environment](#modifying-the-environment)
    - [Activating Our Changes](#activating-our-changes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 12 – The Environment

環境所存的資料有時會被程式拿來做判斷用，多數程式會有自己的設定檔，少數則依賴於環境變數

指令介紹

- `printenv`: 列出環境變數
- `set`: 設定 shell 選項, 觀察所有變數
- `export`: 自訂變數轉成環境變數
- `alias`: 設定指令別名

## What Is Stored In The Environment

1. environment variable
1. shell variable: bash 存放的 alias, shell function

### Examining The Environment

- `set`: shell + environment variables
- `printenv`: environment variable

可用 `echo` 查看變數

```shell
printenv | less

printenv USER

set | less

# 查看變數
echo $HOME

# 查看別名
alias
```

### Some Interesting Variables

Variable | Contents
---------|---------
DISPLAY | The name of your display if you are running a graphical environment. Usually this is “:0”, meaning the first display generated by the X server.
EDITOR | Than name of the program to be used for text editing.
SHELL | The name of your shell program. HOME The pathname of your home directory.
LANG | 定義字元(（character set) and 字元排序規則(collation order)
OLD_PWD | The previous working directory.
PAGER | The name of the program to be used for paging output. This is often set to /usr/bin/less.
PATH | A colon-separated list of directories that are searched when you enter the name of a executable program.
PS1 | Prompt String 1. This defines the contents of your shell prompt. As we will later see, this can be extensively customized.
PWD | The current working directory.
TERM | The name of your terminal type. Unix-like systems support many terminal protocols; this variable sets the protocol to be used with your terminal emulator.
TZ | Specifies your timezone. Most Unix-like systems maintain the computer’s internal clock in Coordinated Universal Time (UTC) and then displays the local time by applying an offset specified by this variable.
USER | Your user name.

## How Is The Environment Established

當你登入系統後，`bash` 會啟動，開始讀取一連串的設定 scripts(預設環境所有使用者共用的 startup file)

1. login shell session: 會要求你輸入帳號密碼
1. non-login shell session: GUI 開啟 terminal session

Startup Files For Login Shell Sessions

File | Contents
-----|---------
/etc/profile | A global configuration script 適用於所有使用者
~/.bash_profile | 個人帳號的 startup file. 可擴充或複寫 global configuration script.
~/.bash_login | 如果找不到 ~/.bash_profile, bash 會嘗試讀取此 script.
~/.profile | 如果找不到 ~/.bash_profileㄝ, ~/.bash_login, bash 會嘗試讀取此檔案.

Startup Files For Non-Login Shell Sessions

File | Contents
-----|---------
/etc/bash.bashrc | A global configuration script 適用於所有使用者
~/.bashrc | A個人帳號的 startup file. 可擴充或複寫 global configuration script.

non-login shells 會從 parent 繼承環境，通常是 login shell

### What's In A Startup File

```shell
cat .bash_profile

# .bash_profile
# Get the aliases and functions
if [ -f ~/.bashrc ]; then
. ~/.bashrc
fi
# User specific environment and startup programs
PATH=$PATH:$HOME/bin
export PATH
```

當你打下 `ls` 指令時，shell 並不會搜尋整個電腦才找出 `/bin/ls`，他會從 `PATH` 設定的目錄找起

`export PATH` 讓 child process 可取用 `PATH`

## Modifying The Environment

要在 `PATH` 新增目錄，通常會透過 `.bash_profile` 或 `.profile`，其他的就變更在 `.bashrc`

```shell
# 修改前備份
cp .bashrc .bashrc.bak

vim .bashrc
# 加入以下內容
# Change umask to make directory sharing easier
umask 0002
# Ignore duplicates in command history and increase
# history size to 1000 lines
export HISTCONTROL=ignoredups
export HISTSIZE=1000
# Add some helpful aliases
alias l.='ls -d .* --color=auto'
alias ll='ls -l --color=auto'
```

### Activating Our Changes

修改後 .bashrc 並不會再重啟 termainl session 前生效，因為 .bashrc 已經被讀取到當前的 session，重新讀取要使用 `source`

```shell
source .bashrc

ll
```

bach manual `INVOCATION` 有更多詳情