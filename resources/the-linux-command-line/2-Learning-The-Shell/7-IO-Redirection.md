# 7 – 資料流重導向(I/O Redirection)

最酷俊帥的指令，可以把指令的結果寫到檔案、結合指令(piplines)

Unix 中一切都是檔案

1. Standard Output: 例如 `ls` 的結果
1. Standard Error: status message
1. Standard Input: 通常是鍵盤

## Redirect Standard Output

`>`: 用來記錄指令的結果，原有檔案內容清空
`>>`: 用來附加指令的結果

```shell
[me@linuxbox ~]$ ls -l /usr/bin > ls-output.txt
[me@linuxbox ~]$ ls -l ls-output.txt
-rw-rw-r-- 1 me me 167878 2008-02-01 15:07 ls-output.txt
[me@linuxbox ~]$ less ls-output.txt

# 資料夾不存在，但 ls 只會輸出 Standard Output，所以 console 還是會顯示 Standard Error
[me@linuxbox ~]$ ls -l /bin/usr > ls-output.txt
ls: cannot access /bin/usr: No such file or directory

# file size 變 0，因為剛剛下錯指令
[me@linuxbox ~]$ ls -l ls-output.txt
-rw-rw-r-- 1 me me 0 2008-02-01 15:08 ls-output.txt

# 清空(truncate)檔案
[me@linuxbox ~]$ > ls-output.txt

[me@linuxbox ~]$ ls -l /usr/bin >> ls-output.txt

[me@linuxbox ~]$ ls -l /usr/bin >> ls-output.txt
[me@linuxbox ~]$ ls -l /usr/bin >> ls-output.txt
[me@linuxbox ~]$ ls -l /usr/bin >> ls-output.txt
[me@linuxbox ~]$ ls -l ls-output.txt
-rw-rw-r-- 1 me me 503634 2008-02-01 15:45 ls-output.txt
```

## Redirecting Standard Error

如果要記錄錯誤訊息需使用檔案描述符號(file descriptor)

file stream | file descriptor
------------|----------------
standard input | 0
standard output | 1
standard error | 2

```shell
[me@linuxbox ~]$ ls -l /bin/usr 2> ls-error.txt
```

### Redirecting Standard Output And Standard Error To One File

output, error 都想收集也是有辦法的，但需要注意 redirection 的順序，standard error 從會在 standard ouput 後出現

```shell
# 舊版本的 shell 支援
[me@linuxbox ~]$ ls -l /bin/usr > ls-output.txt 2>&1
# 使用 &= 的方式
[me@linuxbox ~]$ ls -l /bin/usr &> ls-output.txt

>ls-output.txt 2>&1

# 順序錯了，結果會直接顯示在 console
2>&1 >ls-output.txt
```

### Disposing Of Unwanted Output

沈默是金，有時候不論對錯你都不想知道時，可以利用 `/dev/null`(特殊的 system device  稱作 bit bucket，接收 input 但不做任何事)。當有人說會把你的意見放到 `/dev/null`，你就會懂那是什麼意思了

```shell
[me@linuxbox ~]$ ls -l /bin/usr 2> /dev/null
```

## Redirecting Standard Input

`cat`: 讀取檔案內容，然後複製到 standard output，通常內容少的時候才會用，`man` 可查看有趣的 option

```shell
# format: cat [file...]
[me@linuxbox ~]$ cat ls-output.txt

# 檔案結合：movie.mpeg.001 movie.mpeg.002 ... movie.mpeg.099
cat movie.mpeg.0* > movie.mpeg

# 沒給參數，standrad input 就要由你輸入，用 Ctrl+d 告訴他已到檔案尾端(EOF)了
cat

# 建立文字檔
[me@linuxbox ~]$ cat > lazy_dog.txt
The quick brown fox jumped over the lazy dog.

# 不常使用
[me@linuxbox ~]$ cat < lazy_dog.txt
The quick brown fox jumped over the lazy dog.
```

## Pipelines

第一個指令的 output 作為第二個指令的 input

```shell
# command1 | command2
[me@linuxbox ~]$ ls -l /usr/bin | less
```

## Filters

`sort`: 排序

```shell
ls /bin /usr/bin | sort | less
```

`uniq`: 通常會和 `sort` 一起使用，消除重複的內容

```shell
# 列不重複的
ls /bin /usr/bin | sort | uniq | less

# 列出重複的
s /bin /usr/bin | sort | uniq -d | less
```

`wc`: 列出行數、字、字元(lines, words, and bytes)數量

```shell
[me@linuxbox ~]$ wc ls-output.txt
7902 64566 503634 ls-output.txt

# 僅看行數
[me@linuxbox ~]$ ls /bin /usr/bin | sort | uniq | wc -l
2728
```

`grep`: 列出符合樣式的該行，很好用的工具

```shell
#grep pattern [file...]

# 找出所有的 zip
ls /bin /usr/bin | sort | uniq | grep zip

# 不論大小寫
ls /bin /usr/bin | sort | uniq | grep zip -i

# 不符合的才列出
ls /bin /usr/bin | sort | uniq | grep zip -v
```

* `head`: 檔案開頭
* `tail`: 檔案尾巴

```shell
# 前 5 行
head -n 5 ls-output.txt

# 後 5 行
tail -n 5 ls-output.txt

ls /usr/bin | tail -n 5

# 即時查看，Ctrl+c 離開
tail -f /var/log/messages
```

`tee`: 可將 input 同時複製到 output 及檔案

```shell
[me@linuxbox ~]$ ls /usr/bin | tee ls.txt | grep zip
bunzip2
bzip2
gunzip
gzip
unzip
zip
zipcloak
zipgrep
zipinfo
zipnote
zipsplit
```