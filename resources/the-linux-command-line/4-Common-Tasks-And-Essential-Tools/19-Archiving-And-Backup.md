<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [19 – 封存及備份(Archiving And Backup)](#19--%E5%B0%81%E5%AD%98%E5%8F%8A%E5%82%99%E4%BB%BDarchiving-and-backup)
  - [gzip](#gzip)
    - [bzip2](#bzip2)
  - [封存檔案(Archiving Files)](#%E5%B0%81%E5%AD%98%E6%AA%94%E6%A1%88archiving-files)
    - [tar](#tar)
    - [zip](#zip)
  - [同步檔案及資料夾(Synchronizing Files And Directories)](#%E5%90%8C%E6%AD%A5%E6%AA%94%E6%A1%88%E5%8F%8A%E8%B3%87%E6%96%99%E5%A4%BEsynchronizing-files-and-directories)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 19 – 封存及備份(Archiving And Backup)

在不同裝置間移動檔案時使用

檔案處理

- `gzip` – Compress or expand files
- `bzip2` – A block sorting file compressor

封存

- `tar` – Tape archiving utility
- `zip` – Package and compress files

遠端同步

- `rsync` – Remote file and directory synchronization

壓縮檔案(Compressing Files)

主要是移除 redundancy，例如 `100 * 100 pixel` 的圖片，假設美 pixel 需要 3 bype，這個圖片將需要 `100 * 100 * 3 = 30,000` byte，如果只有一個顏色，那就會浪費很多空間了，透過 run-length encoding，只要紀錄顏色及數字 30000，就可以省下不少空間了

壓縮演算法主要有兩類

1. Lossless compression - 會保留原始資料
2. Lossy compression - 會移除原有資料，無法還原成原始資料，例如 JPEG, MP3

## gzip

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

### bzip2

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

## 封存檔案(Archiving Files)

通常系統備份時使用，會是把故佬的資料移到 long-term storage

### tar

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

### zip

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

## 同步檔案及資料夾(Synchronizing Files And Directories)

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