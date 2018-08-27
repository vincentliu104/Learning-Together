# 15 – 套件管理(Package Management)

Mac 使用 [Homebrew](https://brew.sh/index_zh-tw)

Linux 發行版的重要性來自於 package system 及活躍的社群，為了需要跟上每六個月舊版更的發行版以十三不五時就在更新的程式，需要一個好用的個套件管理工具

## 套件系統(Packaging Systems)

主要的套件系統樹

Packaging System | Distributions (Partial Listing)
-----------------|--------------------------------
Debian Style (.deb) | Debian, Ubuntu, Xandros, Linspire
Red Hat Style (.rpm) | Fedora, CentOS, Red Hat Enterprise Linux, OpenSUSE, Mandriva, PCLinuxOS

## How A Package System Works

幾乎所有 Linux 系統上的軟體都能在網路上找得到，多數都會提供 package files, source code

### Package Files

Package 可能由大量程的式及資料所組成，還會提供 metadata 來說明

### Repositories

### Dependencies

程式很少能獨立運行，還要仰賴其他軟，現在的套件管理工具能確保其相依特套件都有被安裝

### High And Low-level Package Tools

low-level 負責暗樁及移除 package file，high-level 負責搜尋 metadata 及相依軟體確認

Packaging System Tools

Distributions | Low-Level Tools | High-Level Tools
--------------|-----------------|-----------------
Debian-Style | dpkg | apt-get, aptitude
Fedora, Red Hat Enterprise Linux, CentOS | rpm | yum

## Common Package Management Tasks

### Finding A Package In A Repository

Package Search Commands

Style | Command(s)
------|-----------
Debian | `apt-get update`, `apt-cache search search_string`
Red Hat | `yum search search_string`

```shell
yum search emacs
```

### Installing A Package From A Repository

Package Installation Commands

Style | Command(s)
------|-----------
Debian | `apt-get update`, `apt-get install package_name`
Red Hat | `yum install package_name`

```shell
apt-get update; apt-get install emacs
```

### Installing A Package From A Package File

Low-Level Package Installation Commands

Style | Command(s)
------|-----------
Debian | `dpkg --install package_file`
Red Hat | `rpm -i package_file`

```shell
rpm -i emacs-22.1-7.fc7-i386.rpm
```

### Removing A Package

Style | Command(s)
------|-----------
Debian | `apt-get remove package_name`
Red Hat | `yum erase package_name`

```shell
apt-get remove emacs
```

### Updating Packages From A Repository

Style | Command(s)
------|-----------
Debian | `apt-get update; apt-get upgrade`
Red Hat | `yum update`

### Upgrading A Package From A Package File

Style | Command(s)
------|-----------
Debian | `dpkg --install package_file`
Red Hat | `rpm -U package_file`

```shell
rpm -U emacs-22.1-7.fc7-i386.rpm
```

### Listing Installed Packages

Style | Command(s)
------|-----------
Debian | `dpkg --list`
Red Hat | `rpm -qa`

### Determining If A Package Is Installed

Style | Command(s)
------|-----------
Debian | `dpkg --status package_name`
Red Hat | `rpm -q package_name`

```shell
dpkg --status emacs
```

### Displaying Info About An Installed Package

Style | Command(s)
------|-----------
Debian | `apt-cache show package_name`
Red Hat | `yum info package_name`

```shell
apt-cache show emacs
```

### Finding Which Package Installed A File

Style | Command(s)
------|-----------
Debian | `dpkg --search file_name`
Red Hat | `rpm -qf file_name`

```shell
rpm -qf /usr/bin/vim
```