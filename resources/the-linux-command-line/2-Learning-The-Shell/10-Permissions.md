<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [10 – 權限 (Permissions)](#10--%E6%AC%8A%E9%99%90-permissions)
  - [Owners, Group Members, And Everybody Else](#owners-group-members-and-everybody-else)
  - [Reading, Writing, And Executing](#reading-writing-and-executing)
  - [chmod – Change file mode](#chmod--change-file-mode)
  - [umask – Set Default Permissions](#umask--set-default-permissions)
  - [Changing Identities](#changing-identities)
    - [su – Run A Shell With Substitute User And Group IDs](#su--run-a-shell-with-substitute-user-and-group-ids)
    - [sudo – Execute A Command As Another User](#sudo--execute-a-command-as-another-user)
    - [chown – Change File Owner And Group](#chown--change-file-owner-and-group)
    - [chgrp – Change Group Ownership](#chgrp--change-group-ownership)
    - [Changing Your Password](#changing-your-password)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 10 – 權限 (Permissions)

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

## Owners, Group Members, And Everybody Else

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

## Reading, Writing, And Executing

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

## chmod – Change file mode

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

## umask – Set Default Permissions

`umask` 控制了檔案新增時給予的權限，使用 8 進位數字表示

* Original file mode: `--- rw- rw- rw-`
* Mask: `000 000 000 010`
* Result: `--- rw- rw- r--`

## Changing Identities

1. 登入在登入(不方便的方法就不介紹了)
1. `su`
1. `suod`: 管理者可用 `/etc/sudoers` 控管

### su – Run A Shell With Substitute User And Group IDs

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

### sudo – Execute A Command As Another User

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

### chown – Change File Owner And Group

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

### chgrp – Change Group Ownership

TODO

### Changing Your Password

通常會需要有一定強度的密碼

```shell
# passwd [user]
```