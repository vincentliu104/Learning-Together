# 4–Common-Tasks-And-Essential-Tools

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