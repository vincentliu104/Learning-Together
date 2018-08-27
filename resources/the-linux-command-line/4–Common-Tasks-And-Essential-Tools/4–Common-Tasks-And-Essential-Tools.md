# 4–Common-Tasks-And-Essential-Tools

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