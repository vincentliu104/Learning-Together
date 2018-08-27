# 8 – Seeing The World As The Shell Sees It

`echo`: 顯示一行字

## Expansion

在你打完指令按下 enter，bash 會先進行一系列動作才執行指令，例如處理萬元字元(*)，這個流程被稱做 `Expansion`

```shell
echo this is a test

# 目前目錄的所有檔案
echo *
Applications Desktop Documents Downloads Library Movies Music Pictures Public
```

### Pathname Expansion

跟 `ls` 相同，預設不會顯示隱藏檔案

```shell
ls

# D 開頭的檔案
[me@linuxbox ~]$ echo D*
Desktop Documents

# s 結尾的黨案
[me@linuxbox ~]$ echo *s
Documents Pictures Templates Videos

# 大寫字母開頭的檔案
[me@linuxbox ~]$ echo [[:upper:]]*
Desktop Documents Music Pictures Public Templates Videos

[me@linuxbox ~]$ echo /usr/*/share
/usr/kerberos/share /usr/local/share

# 列出隱藏檔案
echo .*
ls -d .* | less
```

### Tilde Expansion

使用 `cd` 時有提到具有特殊含義的 `~`，代表 home 目錄

```shell
echo ~
echo ~foo # 假如有 foo 帳號存在時
echo ~guest
```

### Arithmetic Expansion

格式: `$((expression))`

`+`: 加
`-`: 減
`*`: 乘
`/`: 除，僅支援整數
`%`: 餘數
`**`: 指數

```shell
echo $((2 + 2))
echo $(($((5**2)) * 3))
echo $(((5**2) * 3))
echo Five divided by two equals $((5/2))
```

### Brace Expansion

很強大

```shell
[me@linuxbox ~]$ echo Front-{A,B,C}-Back
Front-A-Back Front-B-Back Front-C-Back

[me@linuxbox ~]$ echo Number_{1..5}

[me@linuxbox ~]$ echo {Z..A}
Z Y X W V U T S R Q P O N M L K J I H G F E D C B A

[me@linuxbox ~]$ echo a{A{1,2},B{3,4}}b
aA1b aA2b aB3b aB4b

# 產生 2016 - 2018 的月份資料夾
[me@linuxbox ~]$ mkdir Pics
[me@linuxbox ~]$ cd Pics
[me@linuxbox Pics]$ mkdir {2016..20018}-0{1..9} {2016..2018}-{10..12}
[me@linuxbox Pics]$ ls
```

### Parameter Expansion

```shell
echo $USER

printenv | less

# parameter expension 拼錯字不會跟你講有什麼錯
echo $SUER
```

### Command Substitution

把指令的輸出作為 expension

```shell
echo $(ls)

ls -l $(which cp)

# 結合 pipeline
file $(ls /usr/bin/* | grep zip)

# 舊版本的 shell
ls -l `which cp`
```

## Quoting

```shell
# 多餘空白會被去除
[me@linuxbox ~]$ echo this is a test
this is a test

# 因為 $1 是未定義的變數(undefined variable)
[me@linuxbox ~]$ echo The total is $100.00
The total is 00.00
```

### Double Quotes

雙引號中，shell 認得的特殊字元會失去其意義，例外的有 $, \\, `

```shell
# word-splitting
[me@linuxbox ~]$ ls -l two words.txt
ls: cannot access two: No such file or directory
ls: cannot access words.txt: No such file or directory

# 找到 two words.txt，然後重新命名為 two_words.txt.
[me@linuxbox ~]$ ls -l "two words.txt"
-rw-rw-r-- 1 me me 18 2008-02-20 13:03 two words.txt
[me@linuxbox ~]$ mv "two words.txt" two_words.txt

# word-splitting 會去除多餘 spaces, tabs, and newlines (linefeed characters)，將其視為分隔符號(delimiters)
[me@linuxbox ~]$ echo this is a test
this is a test

[me@linuxbox ~]$ echo "this is a      test"
this is a      test

[me@linuxbox ~]$ echo $(cal)
8月 2018 日 一 二 三 四 五 六 1 2 3  4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31

[me@linuxbox ~]$ echo "$(cal)"
      8月 2018
日 一 二 三 四 五 六
          1  2  3  4
 5  6  7  8  9 10 11
12 13 14 15 16 17 18
19 20 21 22 23 24 25
26 27 28 29 30 31
```

### Single Quotes

比較 unquoted, double quotes, and single quotes

```shell
[me@linuxbox ~]$ echo text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER
text /home/me/ls-output.txt a b foo 4 me

[me@linuxbox ~]$ echo "text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER"
text ~/*.txt {a,b} foo 4 me

[me@linuxbox ~]$ echo 'text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER'
text ~/*.txt {a,b} $(echo foo) $((2+2)) $USER
```

### Escaping Characters

使用 backslash(`\`)

```shell
[me@linuxbox ~]$ echo "The balance for user $USER is: \$5.00"
The balance for user me is: $5.00

# 檔案名稱裡有特殊符號
[me@linuxbox ~]$ mv bad\&filename good_filename

sleep 10; echo -e "Time's up\a"
sleep 10; echo "Time's up" $'\a'
```