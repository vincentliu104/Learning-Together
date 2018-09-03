<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [16 – Storage Media](#16--storage-media)
  - [Mounting And Unmounting Storage Devices](#mounting-and-unmounting-storage-devices)
    - [Viewing A List Of Mounted File Systems](#viewing-a-list-of-mounted-file-systems)
    - [Determining Device Names](#determining-device-names)
  - [Creating New File Systems](#creating-new-file-systems)
    - [Manipulating Partitions With fdisk](#manipulating-partitions-with-fdisk)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 16 – Storage Media

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

## Mounting And Unmounting Storage Devices

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

### Viewing A List Of Mounted File Systems

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

### Determining Device Names

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

## Creating New File Systems

例如：格式化 FAT32 系統到 Linux 原生檔案系統

1. (optional) create a new partition layout if the existing one is not to our liking
1. create a new, empty file system on the drive.

注意：以下的範例，跟你的系統不一定一樣，請小心服用

### Manipulating Partitions With fdisk

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