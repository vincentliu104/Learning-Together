# 21-Text-Processing

主要介紹指令

* cat
* sort
* uniq
* cut
* paste
* join
* comm
* diff
* patch
* tr
* sed
* aspell

## Applications Of Text

* 文件(Documents)
* 網頁(Web pages)
* Email
* 列印輸出(Printer Output)
* 程式原始碼(Program Source Code)

## Revisiting Some Old Friends

### cat

option

* -A 可以用來顯示無法列印的字元，比如說 Tab、多餘的空白
* -n 印出行號
* -s 去除多餘換行

Ctrl-d 指示 cat 已經輸入完了

```shell
[me@linuxbox ~]$ cat > foo.txt
The quick brown fox jumped over the lazy dog.
[me@linuxbox ~]$

[me@linuxbox ~]$ cat -A foo.txt
^IThe quick brown fox jumped over the lazy dog. $
[me@linuxbox ~]$

[me@linuxbox ~]$ cat > foo.txt
The quick brown fox


jumped over the lazy dog.
[me@linuxbox ~]$ cat -ns foo.txt
1 The quick brown fox
2
3 jumped over the lazy dog.
```

MS-DOS Text Vs. Unix Text 行尾處理

* Unix 使用 linefeed character (ASCII 10)
* MS-DOS, Windows 使用 sequence carriage return (ASCII 13) and linefeed

### sort

```shell
[me@linuxbox ~]$ sort > foo.txt
c
b
a
[me@linuxbox ~]$ cat foo.txt
a
b
c
```

sort 參數可接受多檔案，可以合併多個檔案成一個檔案

```shell
sort file1.txt file2.txt file3.txt > final_sorted_list.txt
```

常見 sort 選項

Option | Long Option | Description
-------|-------------|------------
-b | --ignore-leading-blanks | 忽略開頭的空白
-f | --ignore-case | 排序不區分大小寫
-n | --numeric-sort | 用數值方式來排序
-r | --reverse | 倒序
-k | --key-field1[,field2] | 依據 key 值排序，而非整行
-m | --merge | 合併檔，不餓外做排序
-o | --output=file | 將排序結果輸出到檔案
-t | --filed-seperator=char | 定義分隔符號

```shell
# 預設用路徑排序
du -s /usr/share/* | head
du -s /usr/share/* | sort -nr | head

ls -l /usr/bin | head
# 指定用第 5 個欄位來排序
ls -l /usr/bin | sort -nr -k 5 | head
```

sort 會用空白與 tab 來分隔欄位

```log
# distros.txt
SUSE 10.2 12/07/2006
Fedora 10 11/25/2008
SUSE 11.0 06/19/2008
Ubuntu 8.04 04/24/2008
Fedora 8 11/08/2007
SUSE 10.3 10/04/2007
Ubuntu 6.10 10/26/2006
Fedora 7 05/31/2007
Ubuntu 7.10 10/18/2007
Ubuntu 7.04 04/19/2007
SUSE 10.1 05/11/2006
Fedora 6 10/24/2006
Fedora 9 05/13/2008
Ubuntu 6.06 06/01/2006
Ubuntu 8.10 10/30/2008
Fedora 5 03/20/2006
```

```shell
# 預設用第 1 個欄位來排序
sort distros.txt

# 1,1: 指定第一個欄位
# 2n: 第二個欄位用數字來排序
sort --key=1,1 --key=2n distros.txt

# -k 3.7: key 從第 3 個欄位的第 7 個字算起，也就是年份
# -k 3.1: 月份
# -k 3.4: 日期
sort -k 3.7nbr -k 3.1nbr -k 3.4nbr distros.txt
```

有些不是用空格來分隔的檔案

```shell
head /etc/passwd
sort -t ':' -k 7 /private/etc/passwd | head
```

### uniq

```shell
[me@linuxbox ~]$ cat > foo.txt
a
b
c
a
b
c
[me@linuxbox ~]$ uniq foo.txt
a
b
c
a
b
c
```

想要 uniq 幫你去除重複的內容要先進行排序，因為他只會針對相連的行比對

```shell
sort foo.txt | uniq
sort foo.txt | uniq -c
```

Option      Description
-c          列出重複的次數
-d          僅列出重複內容的該行
-f n        忽略前 n 個欄位
-i          忽略大小寫
-s n        每行開頭先略過 n 個字
-u          僅列出沒重複的該行

## Slicing And Dicing

TODO

## Comparing Text

### comm

```shell
[me@linuxbox ~]$ cat > file1.txt
a
b
c
d
[me@linuxbox ~]$ cat > file2.txt
b
c
d
e

# 第一欄是 file1.txt 獨有的內容
# 第二欄是 file2.txt 獨有的內容
# 第三欄是 file1.txt , file2.txt 都有的內容
comm file1.txt file2.txt

# 不看第一、二欄
comm -12 file1.txt file2.txt
```

### diff

通常是工程師用來檢驗不同版程式的差異

```shell
# default format
diff file1.txt file2.txt

# context format
diff -c file1.txt file2.txt

# unified format
diff -u file1.txt file2.txt
```

context format change indicator

Indicator | Meaning
----------|--------
blank | 沒任何改變
`-` | 刪除一行。第一個檔案中有，第二個檔案中沒有
`+` | 新增一行。第一個檔案中沒有，第二個檔案中有
`!` | 改變一行。

unified format change indicator

character | Meaning
----------|--------
blank | 此行兩個檔案都有
`-` | 此行在第一個檔案被移除了
`+` | 此行在第一個檔案被新增了

### patch

TODO

## Editing On The Fly

### tr

搜尋及取代功能

```shell
# 小寫變大寫
echo "lowercase letters" | tr a-z A-Z

echo "lowercase letters" | tr [:lower:] A

# ROT13 encode
echo "secret text" | tr a-zA-Z n-za-mN-ZA-M

# ROT13 decode
echo "frperg grkg" | tr a-zA-Z n-za-mN-ZA-M

# 移除相鄰重複的字
echo "aaabbbccc" | tr -s ab

echo "abcabcabc" | tr -s ab
```

[ROT13](http://en.wikipedia.org/wiki/ROT13): 英文字母順序加 13

### sed

sed 功能強大，有書本專門介紹

sed 可接受任何分隔符號，通常會使用 slash

```shell
# 搜尋及取代
echo "front" | sed 's/front/back/'
echo "front" | sed 's_front_back_'

# 指定取代第一行
echo "front" | sed '1s/front/back/'
# 指定取代第二行
echo "front" | sed '2s/front/back/'
```

sed Address Notation

p 會將符合的結果輸出

```shell
# 第一行
sed -n '1p' distros.txt
# １～５ 行
sed -n '1,5p' distros.txt
# 包含 SUSE
sed -n '/SUSE/p' distros.txt
# 不包含 SUSE
sed -n '/SUSE/!p' distros.txt
```

s 是最常用的編輯指令，例如 distros.txt 中的日期讓電腦不好懂(MM/DD/YYY)，可以利用 s 指令把它改成 YYY-MM-DD

```shell
sed 's/\([0-9]\{2\}\)\/\([0-9]\{2\}\)\/\([0-9]\{4\}\)$/\3-\1-\2/' distros.txt

# 小 b 換大 B
echo "aaabbbccc" | sed 's/b/B/'
echo "aaabbbccc" | sed 's/b/B/g'
```

利用 distros.sed 產生報表

```shell
# distros.sed
# sed script to produce Linux distributions report
1 i\
\
Linux Distributions Report\
s/\([0-9]\{2\}\)\/\([0-9]\{2\}\)\/\([0-9]\{4\}\)$/\3-\1-\2/ # 搜尋及取代
y/abcdefghijklmnopqrstuvwxyz/ABCDEFGHIJKLMNOPQRSTUVWXYZ/ # 小寫變大寫
```

```shell
cat -n distros.sed

sed -f distros.sed distros.txt
```

其他相關指令: `awk`, `perl`

### aspell

檢查拼字

```shell
# aspell check textfile

cat > foo.txt
The quick brown fox jimped over the laxy dog.

aspell check foo.txt

cat foo.txt
```

## 延伸閱讀

* [GNU Coreutils](http://www.gnu.org/software/coreutils/manual/coreutils.html#Output-of-entire-files)
* [GNU Coreutils](http://www.gnu.org/software/coreutils/manual/coreutils.html#Operating-on-sorted-files)
* [GNU Coreutils](http://www.gnu.org/software/coreutils/manual/coreutils.html#Operating-on-sorted-files)
* [GNU Coreutils](http://www.gnu.org/software/coreutils/manual/coreutils.html#Operating-on-characters)
* [Comparing and Merging Files](http://www.gnu.org/software/diffutils/manual/html_mono/diff.html)
* [sed, a stream editor](http://www.gnu.org/software/sed/manual/sed.html)
* [GNU Aspell 0.60.7-pre: Top](http://aspell.net/man-html/index.html)
* [Sed - An Introduction and Tutorial](http://www.grymoire.com/Unix/Sed.html)
* [USEFUL ONE-LINE SCRIPTS FOR SED (Unix stream editor)](http://sed.sourceforge.net/sed1line.txt)
* google “sed one liners”, “sed cheat sheets”
* 更多指令: split, csplit, sdiff