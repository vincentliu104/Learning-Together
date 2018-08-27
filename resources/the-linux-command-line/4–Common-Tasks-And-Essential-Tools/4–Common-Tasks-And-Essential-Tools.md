# 4–Common-Tasks-And-Essential-Tools

## 16 – Storage Media

指令介紹

`mount`
`unmount`
`fsck` - 檢查及修復檔案系統
`fdisk` - Partition table manipulator
`mkfs` - 建立檔案系統
`fdformat` - Format a floppy disk
`dd` - Write block oriented data directly to a device
`genisoimage(`mkisofs) - 建立 ISO 9660 映像檔
`wodim`(cdrecord) - 寫到光儲存設備
`md5sum` - 計算 MD5 校驗碼

### Mounting And Unmounting Storage Devices

目前要管理 Linux 儲存設備很容易，只要接上系統即可，但在古時候這是一件複雜的事，要自己 mount 到檔案系統樹

通常 `/etc/fstab` 會列出系統所有的裝置

```shell
LABEL=/12 / ext3 defaults 1 1
LABEL=/home /home ext3 defaults 1 2
LABEL=/boot /boot ext3 defaults 1 2
tmpfs /dev/shm tmpfs defaults 0 0
devpts /dev/pts devpts gid=5,mode=620 0 0
sysfs /sys sysfs defaults 0 0
proc /proc proc defaults 0 0
LABEL=SWAP-sda3 swap swap defaults 0 0
```

#### Viewing A List Of Mounted File Systems

格式: _device on mount_point type file_system_type (options)_

```shell
[me@linuxbox ~]$ mount
/dev/sda2 on / type ext3 (rw) # root file system, 可讀可寫
proc on /proc type proc (rw)
sysfs on /sys type sysfs (rw)
devpts on /dev/pts type devpts (rw,gid=5,mode=620)
/dev/sda5 on /home type ext3 (rw)
/dev/sda1 on /boot type ext3 (rw)
tmpfs on /dev/shm type tmpfs (rw)
none on /proc/sys/fs/binfmt_misc type binfmt_misc (rw)
sunrpc on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw)
fusectl on /sys/fs/fuse/connections type fusectl (rw)
/dev/sdd1 on /media/disk type vfat (rw,nosuid,nodev,noatime,uhelper=hal,uid=500,utf8,shortname=lower) # SD memory card
twin4:/musicbox on /misc/musicbox type nfs4 (rw,addr=192.168.1.4) # network drive
```

CentOS 5 使用 LVM (Logical Volume Manager) 建立 root 檔案系統，多數系統都會自動當你 mount CD-ROM

```shell
[me@linuxbox ~]$ mount
/dev/mapper/VolGroup00-LogVol00 on / type ext3 (rw)
proc on /proc type proc (rw)
sysfs on /sys type sysfs (rw)
devpts on /dev/pts type devpts (rw,gid=5,mode=620)
/dev/hda1 on /boot type ext3 (rw)
tmpfs on /dev/shm type tmpfs (rw)
none on /proc/sys/fs/binfmt_misc type binfmt_misc (rw)
sunrpc on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw)
/dev/hdc on /media/live-1.0.10-8 type iso9660 (ro,noexec,nosuid,nodev,uid=500) # CD-ROM
```

假設你要把 CD-ROM mount 到別處(不要隨便在你的系統實驗)

```shell
# 使用 superuser
[me@linuxbox ~]$ su -
Password:
[root@linuxbox ~]# umount /dev/hdc
```

建立新的 mount point(檔案結構樹中的資料夾)，如果你 mount 倒不是空的資料夾，在 unmount 前你無法看到原本的內容

```shell
mkdir /mnt/cdrom
mount -t iso9660 /dev/hdc /mnt/cdrom

# 查看 mount 結果
cd /mnt/cdrom
ls

# unmount CD-ROM
[root@linuxbox cdrom]# umount /dev/hdc
umount: /mnt/cdrom: device is busy
```

如果 device 正在使用中，你無法 unmount 它

```shell
[root@linuxbox cdrom]# cd
[root@linuxbox ~]# umount /dev/hdc
```

#### Determining Device Names

隨著時代的演變，過去要用推高機換硬碟的事應該已經不存在了

```shell
ls /dev
```

Linux Storage Device Names

Pattern | Device
--------|-------
/dev/fd* | Floppy disk drives.
/dev/hd* | IDE (PATA) disks on older systems.
/dev/lp* | Printers.
/dev/sd* | SCSI disks. On recent Linux systems, the kernel treats all disk-like devices (including PATA/SATA hard disks, flash drives, and USB mass storage devices, such as portable music players and digital cameras) as SCSI disks.
/dev/sr* | Optical drives (CD/DVD readers and burners)

查看即時狀態

```shell
sudo tail -f /var/log/messages
```

### Creating New File Systems

例如：格式化 FAT32 系統到 Linux 原生檔案系統

1. (optional) create a new partition layout if the existing one is not to our liking
1. create a new, empty file system on the drive.

注意：以下的範例，跟你的系統不一定一樣，請小心服用

#### Manipulating Partitions With fdisk

fdisk 可以編輯、刪除、建立 partition

```shell
[me@linuxbox ~]$ sudo umount /dev/sdb1
[me@linuxbox ~]$ sudo fdisk /dev/sdb

# 按下 m 顯示 menu
Command (m for help):
Command action
a toggle a bootable flag
b edit bsd disklabel
c toggle the dos compatibility flag
d delete a partition
l list known partition types
m print this menu
n add a new partition
o create a new empty DOS partition table
p print the partition table # 用來檢驗目前 partition layout
q quit without saving changes
s create a new empty Sun disklabel
t change a partition system id
u change display/entry units
v verify the partition table
w write table to disk and exit # 確認沒問題後，變更 partition
x extra functionality (experts only)
```

## 17 – Networking

Linux 被用來建立各種網路系統及設備，例如防火牆(firewall)、路由器(router)、域名伺服器(name server)、NAS(network attached storage)，這裡僅會介紹較頻繁使用的指令

* `ping` - Send an ICMP ECHO_REQUEST to network hosts
* `traceroute` - Print the route packets trace to a network host
* `netstat` - Print network connections, routing tables, interface statistics,
* masquerade connections, and multicast memberships
* `ftp` - Internet file transfer program
* `wget` - Non-interactive network downloader
* `ssh` - OpenSSH SSH client (remote login program)

你必須懂的名詞

* IP (Internet Protocol) address
* Host and domain name
* URI (Uniform Resource Identifier)

### 檢驗及監控網路(Examining And Monitoring A Network)

#### ping

ping 用來發送名為 IMCP ECHO_REQUEST 的網路封包到特定主機，多數網路設備收到後會回覆，用來確認網路連線

有些主機會因安全因素不回應，例如防火牆

ctrl-c 來中斷，良好的網路環境通常要是 `0.0% packet loss`

```shell
ping linuxcommand.org
PING linuxcommand.org (216.105.38.10): 56 data bytes
64 bytes from 216.105.38.10: icmp_seq=0 ttl=48 time=156.546 ms
64 bytes from 216.105.38.10: icmp_seq=1 ttl=48 time=157.170 ms
64 bytes from 216.105.38.10: icmp_seq=2 ttl=48 time=171.513 ms
64 bytes from 216.105.38.10: icmp_seq=3 ttl=48 time=156.816 ms
64 bytes from 216.105.38.10: icmp_seq=4 ttl=48 time=158.907 ms
64 bytes from 216.105.38.10: icmp_seq=5 ttl=48 time=156.872 ms
^C
--- linuxcommand.org ping statistics ---
6 packets transmitted, 6 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 156.546/159.637/171.513/5.367 ms
```

#### traceroute

某些系統使用 tracepath，用來列出由 local 到 host 的所有路徑

```shell
traceroute slashdot.org
```

output

```shell
traceroute to slashdot.org (216.34.181.45), 30 hops max, 40 byte packets
1 ipcop.localdomain (192.168.1.1) 1.066 ms 1.366 ms 1.720 ms
2 * * *
3 ge-4-13-ur01.rockville.md.bad.comcast.net (68.87.130.9) 14.622 ms 14.885 ms 15.169 ms
4 po-30-ur02.rockville.md.bad.comcast.net (68.87.129.154) 17.634 ms 17.626 ms 17.899 ms
5 po-60-ur03.rockville.md.bad.comcast.net (68.87.129.158) 15.992 ms 15.983 ms 16.256 ms
6 po-30-ar01.howardcounty.md.bad.comcast.net (68.87.136.5) 22.835 ms 14.233 ms 14.405 ms
7 po-10-ar02.whitemarsh.md.bad.comcast.net (68.87.129.34) 16.154 ms 13.600 ms 18.867 ms
8 te-0-3-0-1-cr01.philadelphia.pa.ibone.comcast.net (68.86.90.77) 21.951 ms 21.073 ms 21.557 ms
9 pos-0-8-0-0-cr01.newyork.ny.ibone.comcast.net (68.86.85.10) 22.917 ms 21.884 ms 22.126 ms
10 204.70.144.1 (204.70.144.1) 43.110 ms 21.248 ms 21.264 ms
11 cr1-pos-0-7-3-1.newyork.savvis.net (204.70.195.93) 21.857 ms cr2-pos-0-0-3-1.newyork.savvis.net (204.70.204.238) 19.556 ms cr1-pos-0-7-3-1.newyork.savvis.net (204.70.195.93) 19.634 ms
12 cr2-pos-0-7-3-0.chicago.savvis.net (204.70.192.109) 41.586 ms 42.843 ms cr2-tengig-0-0-2-0.chicago.savvis.net (204.70.196.242) 43.115 ms
13 hr2-tengigabitethernet-12-1.elkgrovech3.savvis.net (204.70.195.122) 44.215 ms 41.833 ms 45.658 ms
14 csr1-ve241.elkgrovech3.savvis.net (216.64.194.42) 46.840 ms 43.372 ms 47.041 ms
15 64.27.160.194 (64.27.160.194) 56.137 ms 55.887 ms 52.810 ms
16 slashdot.org (216.34.181.45) 42.727 ms 42.016 ms 41.437 ms
```

有提供資訊的 router 你會看到 host name, IP address, performance data，沒提供的就會顯示 `* * *`

### netstat

用來檢查網路設定

查看網路卡(network interface)

```shell
[me@linuxbox ~]$ netstat -ie
eth0 Link encap:Ethernet HWaddr 00:1d:09:9b:99:67
inet addr:192.168.1.2 Bcast:192.168.1.255 Mask:255.255.255.0
inet6 addr: fe80::21d:9ff:fe9b:9967/64 Scope:Link
UP BROADCAST RUNNING MULTICAST MTU:1500 Metric:1
RX packets:238488 errors:0 dropped:0 overruns:0 frame:0
TX packets:403217 errors:0 dropped:0 overruns:0 carrier:0
collisions:0 txqueuelen:100
RX bytes:153098921 (146.0 MB) TX bytes:261035246 (248.9 MB)
Memory:fdfc0000-fdfe0000

lo Link encap:Local Loopback
inet addr:127.0.0.1 Mask:255.0.0.0
inet6 addr: ::1/128 Scope:Host
UP LOOPBACK RUNNING MTU:16436 Metric:1
RX packets:2208 errors:0 dropped:0 overruns:0 frame:0
TX packets:2208 errors:0 dropped:0 overruns:0 carrier:0
collisions:0 txqueuelen:0
RX bytes:111490 (108.8 KB) TX bytes:111490 (108.8 KB)
```

* `UP` - 用來看網路卡有沒啟用
* `inet addr` - IP address

kernel’s network routing table

```shell
netstat -r

Kernel IP routing table
Destination Gateway Genmask Flags MSS Window irtt Iface
192.168.1.0 * 255.255.255.0 U 0 0 0 eth0
default 192.168.1.1 0.0.0.0 UG 0 0 0 eth0
```

* IP address - 最後一碼為 0，表示他是 LAN 上的 host
* Gateway - gateway(router) 的名稱或 IP
* 有標示 `*` 表示不需要 gateway
* Destination default - 沒列出來的都走這條

#### wget

可從 web 或 ftp 下載檔案，單一檔案、多個檔案、整個網站都可以下載

```shell
wget http://linuxcommand.org/index.php
```

### Secure Communication With Remote Hosts

古早時期是用 `rlogin`, `telnet` 來登入 remote host，但他的傳輸是明文

#### ssh(Secure Shell)

ssh 解決的基本問題：認證 remote host、傳輸加密

SSH server 在 remote host 監聽 port 22 上的連線，SSH client 用來跟 remote server 溝通

假設 remote host 叫做 remote-sys

```shell
[me@linuxbox ~]$ ssh remote-sys
The authenticity of host 'remote-sys (192.168.1.4)' can't be
established.
RSA key fingerprint is
41:ed:7a:df:23:19:bf:3c:a5:17:bc:61:b3:7f:d9:bb.
Are you sure you want to continue connecting (yes/no)?
```

第一次進行連接時，會顯示無法認證 remote host，鍵入 `yes` 即可，接下來會要求密碼

```shell
Warning: Permanently added 'remote-sys,192.168.1.4' (RSA) to the list
of known hosts.
me@remote-sys's password:
```

打完密碼就可以在 remote host 做事囉

```shell
Last login: Sat Aug 30 13:00:48 2008
[me@remote-sys ~]$
```

鍵入 `exit` 即可離開，關閉 remote 連線，返回原本的 local shell

如果要用不同 username 登入也是可以的，例如改用 `bob` 登入

```shell
[me@linuxbox ~]$ ssh bob@remote-sys
bob@remote-sys's password:
Last login: Sat Aug 30 13:03:21 2008
[bob@remote-sys ~]$
```

ssh 可以直接讓你對 remote 下指令

```sehll
[me@linuxbox ~]$ ssh remote-sys free
me@twin4's password:
total used free shared buffers cached
Mem: 775536 507184 268352 0 110068 154596
-/+ buffers/cache: 242520 533016
Swap: 1572856 0 1572856
[me@linuxbox ~]$
```

redirect remote output to local

```shell
[me@linuxbox ~]$ ssh remote-sys 'ls *' > dirlist.txt
me@twin4's password:
[me@linuxbox ~]$
```

redirect remote output to remote

```shell
[me@linuxbox ~]$ ssh remote-sys 'ls * > dirlist.txt'
```

#### scp And sftp

用來複製 remote 檔案，`scp` 跟 `cp` 類似，不同之處在於路徑要加上 remote host 的名稱

```shell
[me@linuxbox ~]$ scp remote-sys:document.txt .
me@remote-sys's password:
document.txt 100% 5581 5.5KB/s 00:00
[me@linuxbox ~]$

[me@linuxbox ~]$ scp bob@remote-sys:document.txt .
```

sftp 使用 SSH encrypted tunnel，remote 不需 FTP server，只需要 SSH server

```shell
[me@linuxbox ~]$ sftp remote-sys
Connecting to remote-sys...
me@remote-sys's password:
sftp> ls
ubuntu-8.04-desktop-i386.iso
sftp> lcd Desktop
sftp> get ubuntu-8.04-desktop-i386.iso
Fetching /home/me/ubuntu-8.04-desktop-i386.iso to ubuntu-8.04-
desktop-i386.iso
/home/me/ubuntu-8.04-desktop-i386.iso 100% 699MB 7.4MB/s 01:35
sftp> bye
```

SSH Client for Windows 可以使用 [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/)

### Further Reading

[Linux Network Administrator’s Guide](http://tldp.org/LDP/nag2/index.html)

Wikipedia contains many good networking articles. Here are some of the basics:

* <http://en.wikipedia.org/wiki/Internet_protocol_address>
* <http://en.wikipedia.org/wiki/Host_name>
* <http://en.wikipedia.org/wiki/Uniform_Resource_Identifier>

## 18 – Searching For Files

Linux 系統上有很多檔案，要怎麼找到你要的檔案呢？本章將介紹幾個找檔案的指令

`locate` - 用檔案名稱搜尋
`find` - 以目錄結構搜尋檔案
`xargs` – Build and execute command lines from standard input
`touch` - 更改檔案時間
`stat` - 顯示檔案或系統資訊

### locate – Find Files The Easy Way

locate 可以快速找到符合的路徑

Mac 第一次使用時，會叫你 `sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.locate.plist`，但沒有用，改用 `sudo /usr/libexec/locate.updatedb`

```shell
locate bin/zip

locate zip | grep bin
```

另外常用指令有 `slocate`, `mlocate`

locate database 是由 updatedb 所建立，通常會在 cron job 裡，多數系統會一天更新一次，也就是資訊不是很即時，需要的話你可以手動執行

### find – Find Files The Hard Way

find 會收尋你指定的資料夾(以及子資料夾)

```shell
# home 錄下所有檔案...
find ~

# 檔案數量
find ~ | wc -l
1347953
```

#### Tests

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

#### Operators

利用邏輯關係來搜尋檔案

搜尋 file permission 非 0600 的檔案及不是 0700 的目錄

```shell
find ~ \( -type f -not -perm 0600 \) -or \( -type d -not -perm 0700 \)
```

#### Predefined Actions

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

#### User Defined Actions

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

#### Improving Efficiency

在使用  -exec 時，每當有符合的檔案，他會針對要下的指令開啟新的 instance

有些時候我們只想用一個 instance，例如 `ls -l file1; ls -l file2` 可以寫成 `ls -l file1 file2`

```shell
# 多個 instance
find ~ -type f -name 'foo*' -exec ls -l '{}' ';'

# 1 個 instance，只會執行 ls 一次
find ~ -type f -name 'foo*' -exec ls -l '{}' +
```

#### xargs

把輸出作為參數

```shell
find ~ -type f -name 'foo*' -print | xargs ls -l

# 檔名包含空白
find ~ -iname '*.jpg' -print0 | xargs --null ls -l
```

#### A Return To The Playground

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

#### Options

option | 說明
-------|---
-depth | 先在一個目錄找，然後才到子目錄找
-maxdepth levels | 設定最大目錄層級
-mindepth levels | 設定最小目錄層級
-mount | 不經過 mount 到其他系統的目錄
-noleaf | none

## 19 – Archiving And Backup

在不同裝置間移動檔案時使用

檔案處理

* `gzip` – Compress or expand files
* `bzip2` – A block sorting file compressor

封存

* `tar` – Tape archiving utility
* `zip` – Package and compress files

遠端同步

* `rsync` – Remote file and directory synchronization

壓縮檔案(Compressing Files)

主要是移除 redundancy，例如 `100 * 100 pixel` 的圖片，假設美 pixel 需要 3 bype，這個圖片將需要 `100 * 100 * 3 = 30,000` byte，如果只有一個顏色，那就會浪費很多空間了，透過 run-length encoding，只要紀錄顏色及數字 30000，就可以省下不少空間了

壓縮演算法主要有兩類

1. Lossless compression - 會保留原始資料
2. Lossy compression - 會移除原有資料，無法還原成原始資料，例如 JPEG, MP3

### gzip

可壓縮一個或多個檔案，執行後會取代原有檔案

```shell
[me@linuxbox ~]$ ls -l /etc > foo.txt
[me@linuxbox ~]$ ls -l foo.*
-rw-r--r-- 1 me me 15738 2008-10-14 07:15 foo.txt
[me@linuxbox ~]$ gzip foo.txt
[me@linuxbox ~]$ ls -l foo.*
-rw-r--r-- 1 me me 3230 2008-10-14 07:15 foo.txt.gz
[me@linuxbox ~]$ gunzip foo.txt
[me@linuxbox ~]$ ls -l foo.*
-rw-r--r-- 1 me me 15738 2008-10-14 07:15 foo.txt
```

gzip option

Option | Description
-------|------------
-c | Write output to standard output and keep original files. May also be specified with --stdout and --to-stdout.
-d | Decompress. This causes gzip to act like gunzip. May also be specified with --d | ecompress or --uncompress.
-f | Force compression even if compressed version of the original file already exi | sts. May also be specified with --force.
-h | Display usage information. May also be specified with --help.
-l | List compression statistics for each file compressed. May also be specified wit | h --list.
-r | If one or more arguments on the command line are directories, recursively com | press files contained within them. May also be specified with --recursive.
-t | Test the integrity of a compressed file. May also be specified with --test.
-v | Display verbose messages while compressing. May also be specified with --verbose.
-number | Set amount of compression. number is an integer in the range of 1 (fastest, least compression) to 9 (slowest, most compression). The values 1 and 9 may also be expressed as --fast and --best, respectively. The default value is 6.

解壓縮時可以省略 `.gz`

```shell
# 測試檔案
[me@linuxbox ~]$ gzip foo.txt
[me@linuxbox ~]$ gzip -tv foo.txt.gz
foo.txt.gz: OK
[me@linuxbox ~]$ gzip -d foo.txt.gz

# 直接壓縮
[me@linuxbox ~]$ ls -l /etc | gzip > foo.txt.gz

# 解壓縮
[me@linuxbox ~]$ gunzip foo.txt

# 看壓縮的內容物
[me@linuxbox ~]$ gunzip -c foo.txt | less

zcat foo.txt.gz | less
```

#### bzip2

與 gzip 使用不同壓縮演算法，壓縮程度較高速度較慢，副檔名是 `.bz2`

```shell
[me@linuxbox ~]$ ls -l /etc > foo.txt
[me@linuxbox ~]$ ls -l foo.txt
-rw-r--r-- 1 me me 15738 2008-10-17 13:51 foo.txt
[me@linuxbox ~]$ bzip2 foo.txt
[me@linuxbox ~]$ ls -l foo.txt.bz2
-rw-r--r-- 1 me me 2792 2008-10-17 13:51 foo.txt.bz2
[me@linuxbox ~]$ bunzip2 foo.txt.bz2
```

千萬不要壓縮已經壓縮的檔案，會更浪費空間，例如

`gzip picture.jpg`

### 封存檔案(Archiving Files)

通常系統備份時使用，會是把故佬的資料移到 long-term storage

#### tar

tape archive 的簡寫，格式: `tar mode[options] pathname...`

tar mode

Mode | 說明
-----|---
c | 從檔案或資料夾建立 archive
x | 解壓縮
r | 增加檔案
t | 列出壓縮檔內容

```shell
# 建立 playground
mkdir -p playground/dir-{00{1..9},0{10..99},100}
touch playground/dir-{00{1..9},0{10..99},100}/file-{A-Z}

# 封存 playground
tar cf playground.tar playground

# 查看內容
tar tf playground.tar

# 查看詳細內容
tar tvf playground.tar

# 解壓縮到 foo 資料夾
mkdir foo
cd foo
tar xf ../playground.tar
ls
```

解壓縮內容的 owner 會是執行解壓縮的 user

#### zip

壓縮時，`.zip` 會自動產生

```shell
# 壓縮
zip -r playground.zip playground
```

zip 處理方式(由 output 訊息得知)

1. store: 不壓縮 `(stored 0%)`，因為只有空的資料夾
1. deflate: 壓縮

```shell
# 解壓縮
cd foo
unzip ../playground.zip
```

接受 standard input

```shell
# 壓縮
ls -l /etc/ | zip ls-etc.zip -

# 查看解壓縮內容
unzip -p ls-etc.zip | less
```

### 同步檔案及資料夾(Synchronizing Files And Directories)

```shell
# 先把 foo 刪掉
rm -rf foo/*

# playground 同步到 foo
rsync -av playground foo

# 再跑一次，如果那榮是一樣的他不會複製
rsync -av playgound foo

# rsync 檢查到有異動才會複製更新
touch playground/dir-099/file-Z
rsync -av playgound foo
```

假設 `media/BigDisk/backup` 是外接式的儲存設備，將 `/etc`, `/usr/local` 都備份過去

`--delete` 會移除備份設備中，來源已不存在的檔案

```shell
mkdir media/BigDisk/backup
sudo rsync -av --delete /etc /usr/local media/BigDisk/backup
```

## 20 – Regular Expressions

用來表達文字的規則，可運用在找檔案、路徑，很多 CLI 及程式語言都有支援

### grep

grep 來自於 `global regular expression print`

```shell
ls /usr/bin | grep zip
```

指令格式: `grep [options] regex [file...]`

options

option | description
-------|------------
-i | 忽略大小寫
-v | 反向操作
-c | 計算有個的福和的數量
-l | 有找到符合字串的檔案
-L | 沒找到符合字串的檔案
-n | 列出行號
-h | 搜尋多個檔案時使用

```shell
# playground
ls /bin > dirlist-bin.txt
ls /usr/bin > dirlist-usr-bin.txt
ls /sbin > dirlist-sbin.txt
ls /usr/sbin > dirlist-usr-sbin.txt
ls dirlist*.txt

grep bzip dirlist*.txt
grep -l bzip dirlist*.txt
grep -L bzip dirlist*.txt
```

### Metacharacters And Literals

metacharacters: `^ $ . [ ] { } - ? * + ( ) | \`，在 regular expression 有特殊作用，要加上 `\` 才能跳脫

### The Any Character

`.` 代表任何字

```shell
grep -h '.zip' dirlist*.txt
```

### Anchor

1. `^`: 開頭
2. `$`: 結尾

如果使用 `^$` 會去找空白行

```shell
grep -h '^zip' dirlist*.txt
grep -h 'zip$' dirlist*.txt
grep -h '^zip$' dirlist*.txt
```

以後有人要你猜英文單字，例如五個字長，第三個字是 j，r 是最後一個字，你可以秒回他了

```shell
grep -i '^..j.r$' /usr/share/dict/words
```

### Bracket Expressions And Character Classes

用來表示集合，會搭配 `^` 或 `-` 使用，跟原本的 metacharacter 有不同意義

```shell
grep -h '[bg]zip' dirlist*.txt
```

#### Negation

`^` 用在集合(`[]`)中表示，集合中的字不該出現

```shell
grep -h '[^bg]zip' dirlist*.txt
```

#### Traditional Character Ranges

找開頭是大小英文的檔案

```shell
# 打完都累了
grep -h '^[ABCDEFGHIJKLMNOPQRSTUVWXZY]' dirlist*.txt

# 簡短多了
grep -h '^[A-Z]' dirlist*.txt

grep -h '^[A-Za-z0-9]' dirlist*.txt

grep -h '[A-Z]' dirlist*.txt

# 檔名有 - or A or Z
grep -h '[-AZ]' dirlist*.txt
```

#### POSIX Character Classes

早期 Unix 處理 ASCII 字元順序導致的問題

```shell
# 以下兩個指令可能會有不同的結果，不握我的電腦沒有
ls /usr/sbin/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]*
ls /usr/sbin/[A-Z]*

echo $LANG

ls /usr/sbin/[[:upper:]]*
```

#### Alternation

`A|B|C...`: A or B or C...

```shell
echo "AAA" | grep AAA
echo "BBB" | grep AAA

echo "AAA" | grep -E 'AAA|BBB'
echo "BBB" | grep -E 'AAA|BBB'
echo "CCC" | grep -E 'AAA|BBB'

echo "AAA" | grep -E 'AAA|BBB|CCC'

grep -Eh '^(bz|gz|zip)' dirlist*.txt
grep -Eh '^bz|gz|zip' dirlist*.txt
```

#### Quantifiers

量化指標

##### ? - 匹配零次或一次

例如以下電話格式

* (nnn) nnn-nnnn
* nnn nnn-nnnn

```shell
echo "(555) 123-4567" | grep -E '^\(?[0-9][0-9][0-9]\)? [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$'

echo "555 123-4567" | grep -E '^\(?[0-9][0-9][0-9]\)? [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$'

echo "AAA 123-4567" | grep -E '^\(?[0-9][0-9][0-9]\)? [0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$'
```

##### * - 匹配零次或多次

例如判斷英文句子，第一個字母要是大小，然後有任意數量的大小寫英文字，然後 `.` 結尾

`[[:upper:]][[:upper:][:lower:] ]*\.`

```shell
echo "This works." | grep -E '[[:upper:]][[:upper:][:lower:] ]*\.'

echo "This Works." | grep -E '[[:upper:]][[:upper:][:lower:] ]*\.'

echo "this does not" | grep -E '[[:upper:]][[:upper:][:lower:] ]*\.'
```

##### + - 匹配一次或多次

例如找尋用一個空白分隔的英文字

```shell
echo "This that" | grep -E '^([[:alpha:]]+ ?)+$'

echo "a b c" | grep -E '^([[:alpha:]]+ ?)+$'

echo "a b 9" | grep -E '^([[:alpha:]]+ ?)+$'

echo "abc  d" | grep -E '^([[:alpha:]]+ ?)+$'
```

#### { } - 匹配特定次數

Specifier | 說明
----------|---
{n} | 剛好出現 n 次
{n,m} | 只少 n 次，不超過 m 次
{n,} | 至少 n 次更多
{,m} | 至多 m 次

上面的電話號碼可以改寫成

`^\(?[0-9]{3}\)? [0-9]{3}-[0-9]{4}$`

```shell
echo "(555) 123-4567" | grep -E '^\(?[0-9]{3}\)? [0-9]{3}-[0-9]{4}$'

echo "555 123-4567" | grep -E '^\(?[0-9]{3}\)? [0-9]{3}-[0-9]{4}$'

echo "5555 123-4567" | grep -E '^\(?[0-9]{3}\)? [0-9]{3}-[0-9]{4}$'
```

### Putting Regular Expressions To Work

#### 用 grep 驗證一串電話號碼

```shell
# 產生 10 組隨機電話號碼
for i in {1..10}; do echo "(${RANDOM:0:3}) ${RANDOM:0:3}-${RANDOM:0:4}" >> phonelist.txt; done

cat phonelist.txt

# 找出不符合的電話號碼
grep -Ev '^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$' phonelist.txt
```

#### 用 find 找出醜醜的檔案名稱

```shell
find . -regex '.*[^-_./0-9a-zA-Z].*'
```

#### 用 locate 找檔案

```shell
locate --regex 'bin/(bz|gz|zip)'
```

#### 使用 less 及 vim 時搜尋字串

```shell
less phonelist.txt
# /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$

vim phonelist.txt
# /([0-9]\{3\}) [0-9]\{3\}-[0-9]\{4\}
```

zgrep 可以讀取壓縮檔案

```shell
cd /usr/share/man/man1

zgrep -El 'regex|regular expression' *.gz
```