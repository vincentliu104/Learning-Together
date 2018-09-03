# 22-Formatting-Output

主要介紹指令

* nl
* fold
* fmt
* pr
* print
* groff

## 簡單的格式化工具(Simple Formatting Tools)

### nl – Number Lines

為輸出內容加上行號，可接受多個檔案或是 standard input

```shell
nl distros.txt | head
```

```shell
sort -k 1,1 -k 2n distros.txt | sed -f distros-nl.sed | nl
sort -k 1,1 -k 2n distros.txt | sed -f distros-nl.sed | nl -n rz
sort -k 1,1 -k 2n distros.txt | sed -f distros-nl.sed | nl -w 3 -s ' '
```

### fold - 把每行文字固定在一定長度

```shell
echo "The quick brown fox jumped over the lazy dog." | fold -w 12
echo "The quick brown fox jumped over the lazy dog." | fold -w 12 -s
```

### fmt - A Simple Text Formatter

可保留換行與縮排

```shell
fmt -w 50 fmt-info.txt | head

fmt -cw 50 fmt-info.txt

fmt -w 50 -p '# ' fmt-code.txt
```

### pr

分頁處理，通常在列印時會用到

```shell
pr -l 15 -w 65 distros.txt
```

### printf

原本是用在 C 語言開發上

格式: `printf “format” arguments`

```shell
printf "I formatted the string: %s\n" foo
printf "I formatted '%s' as a string.\n" foo
printf "%d, %f, %o, %s, %x, %X\n" 380 380 380 380 380 380
printf "%s\t%s\t%s\n" str1 str2 str3
printf "Line: %05d %15.3f Result: %+15d\n" 1071 3.14156295 32589
printf "<html>\n\t<head>\n\t\t<title>%s</title>\n\t</head>\n\t<body>\n\t\t<p>%s</p>\n\t</body>\n</html>\n" "Page Title" "Page Content"
```

格式 | 說明
---|---
d | 整數
f | 浮點數
o | 八進位
s | 字串
x | 十六進位(小寫a-f)
X | 十六進位(大寫a-f)
% | %% 才會輸出 %

sort -k 1,1 -k 2n distros.txt | sed -f distros-tbl.sed | groff -t -T ascii 2>/dev/null