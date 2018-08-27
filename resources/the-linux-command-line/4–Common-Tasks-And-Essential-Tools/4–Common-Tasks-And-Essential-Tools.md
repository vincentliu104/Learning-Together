# 4–Common-Tasks-And-Essential-Tools

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