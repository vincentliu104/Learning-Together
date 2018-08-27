# 17 – Networking

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

## 檢驗及監控網路(Examining And Monitoring A Network)

### ping

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

### traceroute

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

## netstat

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

### wget

可從 web 或 ftp 下載檔案，單一檔案、多個檔案、整個網站都可以下載

```shell
wget http://linuxcommand.org/index.php
```

## Secure Communication With Remote Hosts

古早時期是用 `rlogin`, `telnet` 來登入 remote host，但他的傳輸是明文

### ssh(Secure Shell)

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

### scp And sftp

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

## Further Reading

[Linux Network Administrator’s Guide](http://tldp.org/LDP/nag2/index.html)

Wikipedia contains many good networking articles. Here are some of the basics:

* <http://en.wikipedia.org/wiki/Internet_protocol_address>
* <http://en.wikipedia.org/wiki/Host_name>
* <http://en.wikipedia.org/wiki/Uniform_Resource_Identifier>