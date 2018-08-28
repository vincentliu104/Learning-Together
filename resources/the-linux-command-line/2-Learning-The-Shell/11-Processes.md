<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [11 – Processes](#11--processes)
  - [How A Process Works](#how-a-process-works)
  - [Viewing Processes](#viewing-processes)
    - [Viewing Processes Dynamically With top](#viewing-processes-dynamically-with-top)
  - [Controlling Processes](#controlling-processes)
    - [Interrupting A Process](#interrupting-a-process)
    - [Putting A Process In The Background](#putting-a-process-in-the-background)
    - [Returning A Process To The Foreground](#returning-a-process-to-the-foreground)
    - [Stopping (Pausing) A Process](#stopping-pausing-a-process)
  - [Signals](#signals)
    - [Sending Signals To Processes With kill](#sending-signals-to-processes-with-kill)
    - [Sending Signals To Multiple Processes With killall](#sending-signals-to-multiple-processes-with-killall)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 11 – Processes

現代的 OS 通常都能多工(multitasking)，快速切換不同程式，Linux kernel 透過 processes 來管理哪個程式可以使用 CPU 資源

有時你的電腦會變很慢，或者程式停止回應，以下指令可以讓你檢驗程式在做些什麼事，甚至把它停止

主要介紹指令

* ps – Report a snapshot of current processes
* top – Display tasks
* jobs – List active jobs
* bg – Place a job in the background
* fg – Place a job in the foreground
* kill – Send a signal to a process
* killall – Kill processes by name
* shutdown – Shutdown or reboot the system

## How A Process Works

系統啟動後，kernel 會初始化一些 processes 及開啟程式 `init`(一連串的 schell script，位於 `/etc`)，也稱作 `init script`，用來開啟系統服務(system services)，多數的服務使用 `deamon program` 來實作(僅在背景作業，沒有 UI)

process scheme: parent precess 產生 child process

## Viewing Processes

```shell
# TTY: Teletype 泛指可控制的 terminal, Time: CPU time
ps
[me@linuxbox ~]$ ps
  PID TTY TIME CMD
 5198 pts/1 00:00:00 bash
10129 pts/1 00:00:00 ps

# x 表示顯示全部的 terminal
# ? 表示不可控制的 termainl
# STAT 表示目前 process 狀態
ps x
[me@linuxbox ~]$ ps x
PID TTY STAT TIME COMMAND
2799 ? Ssl 0:00 /usr/libexec/bonobo-activation-server –ac
2820 ? Sl 0:01 /usr/libexec/evolution-data-server-1.10 --
15647 ? Ss 0:00 /bin/sh /usr/bin/startkde
15751 ? Ss 0:00 /usr/bin/ssh-agent /usr/bin/dbus-launch --
15754 ? S 0:00 /usr/bin/dbus-launch --exit-with-session
15755 ? Ss 0:01 /bin/dbus-daemon --fork --print-pid 4 –pr
15774 ? Ss 0:02 /usr/bin/gpg-agent -s –daemon
15793 ? S 0:00 start_kdeinit --new-startup +kcminit_start
15794 ? Ss 0:00 kdeinit Running...
15797 ? S 0:00 dcopserver –nosid

ps x | less
```

狀態可組合

State | Meaning
------|--------
R | Running, 正在執行或準備要執行
S | Sleeping, 等待事件，例如按鍵、網路封包
D | Uninterruptible Sleep, 等待 I/O，例如硬碟
T | Stopped
Z | A defunct or “zombie” process. child process 已終止，但還沒被 parent 處理
< | A high priority process. 可佔用較多 CPU time(niceness)
N | A low priority process. 所有 high priority processes 結束後，才你開使執行

```shell
ps aux
[me@linuxbox ~]$ ps aux
USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
root 1 0.0 0.0 2136 644 ? Ss Mar05 0:31 init
root 2 0.0 0.0 0 0 ? S< Mar05 0:00 [kt]
root 3 0.0 0.0 0 0 ? S< Mar05 0:00 [mi]
root 4 0.0 0.0 0 0 ? S< Mar05 0:00 [ks]
root 5 0.0 0.0 0 0 ? S< Mar05 0:06 [wa]
root 6 0.0 0.0 0 0 ? S< Mar05 0:36 [ev]
root 7 0.0 0.0 0 0 ? S< Mar05 0:00 [kh]
```

BSD Style ps Column Header

Header | Meaning
-------|--------
USER | User ID, owner of the process
%CPU | CPU百分比用量
%MEM | 記憶體百分比用量
VSZ | 虛擬記憶體大小
RSS | Resident Set Size.(RAM)
START | process 執行的時間，超過 24 小時會用日期表示

### Viewing Processes Dynamically With top

`ps` 只會提供當下的 snapshot，即時狀態使用 `top`(預設每 3 秒更新一次)

```shell
top
```

## Controlling Processes

用 `vim` 示範

### Interrupting A Process

ctrl-c(並非所有command line 都支援)

### Putting A Process In The Background

指令後方加上 `&`

```shell
vim &
[1]  + 5911 suspended (tty output)  vim

ps
 PID TTY           TIME CMD
1960 ttys001    0:02.74 -zsh
5996 ttys001    0:00.03 vim

jobs
[1]  + suspended (tty output)  vim
```

### Returning A Process To The Foreground

```shell
jobs
[1]  + suspended (tty output)  vim

fg %1
[1]  + 5911 continued  vim
```

### Stopping (Pausing) A Process

停止 foreground process: `ctrl-z`

```shell
# 進入編輯界面
vim

# 編輯界面下 ctrl-z
[1]  + 6522 suspended  vim

# 移到 background process
bg %1
[1]  + 6522 continued  vim
[1]  + 6522 suspended (tty output)  vim

# 移到 foreground process
fg %1
```

foreground to the background 很實用，有時開啟從 command line 開啟圖形介面程式(graphical program)，但忘了加上 `&`

## Signals

`kill` 並不是殺掉程式，而是送出 signal

* `Ctrl-c`: INT (Interrupt)
* `Ctrl-z`: TSTP(Terminal Stop.)

```shell
vim &
[1] 6940

kill 6940
[1]  + 6940 terminated  vim
```

### Sending Signals To Processes With kill

```shell
# 格式: kill [-signal] PID...
vim &
[1] 7301
kill -1 7301
[1]  + 7301 hangup     vim

vim &
[1] 7301
kill -INT 7301
[1]  + 7301 Interrupt     vim

vim &
[1] 13608
kill -SIGINT 13608
[1]  + 7301 Interrupt     vim

# 列出 signal
kill -l
```

### Sending Signals To Multiple Processes With killall

```shell
# 格式: killall [-u user] [-signal] name...
[me@linuxbox ~]$ vim &
[1] 18801
[me@linuxbox ~]$ vim &
[2] 18802
[me@linuxbox ~]$ killall vim
[1]- Terminated vim
[2]+ Terminated vim
```