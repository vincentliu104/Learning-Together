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

## 11 – Processes

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

### How A Process Works

系統啟動後，kernel 會初始化一些 processes 及開啟程式 `init`(一連串的 schell script，位於 `/etc`)，也稱作 `init script`，用來開啟系統服務(system services)，多數的服務使用 `deamon program` 來實作(僅在背景作業，沒有 UI)

process scheme: parent precess 產生 child process

### Viewing Processes

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

#### Viewing Processes Dynamically With top

`ps` 只會提供當下的 snapshot，即時狀態使用 `top`(預設每 3 秒更新一次)

```shell
top
```

### Controlling Processes

用 `vim` 示範

#### Interrupting A Process

ctrl-c(並非所有command line 都支援)

#### Putting A Process In The Background

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

#### Returning A Process To The Foreground

```shell
jobs
[1]  + suspended (tty output)  vim

fg %1
[1]  + 5911 continued  vim
```

#### Stopping (Pausing) A Process

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

### Signals

`kill` 並不是殺掉程式，而是送出 signal

* `Ctrl-c`: INT (Interrupt)
* `Ctrl-z`: TSTP(Terminal Stop.)

```shell
vim &
[1] 6940

kill 6940
[1]  + 6940 terminated  vim
```

#### Sending Signals To Processes With kill

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

#### Sending Signals To Multiple Processes With killall

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