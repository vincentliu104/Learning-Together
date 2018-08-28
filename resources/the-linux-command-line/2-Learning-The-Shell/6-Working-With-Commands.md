<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [6 – Working With Commands](#6--working-with-commands)
  - [識別指令(Identifying Commands)](#%E8%AD%98%E5%88%A5%E6%8C%87%E4%BB%A4identifying-commands)
  - [查看指令文件](#%E6%9F%A5%E7%9C%8B%E6%8C%87%E4%BB%A4%E6%96%87%E4%BB%B6)
  - [建立別名](#%E5%BB%BA%E7%AB%8B%E5%88%A5%E5%90%8D)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 6 – Working With Commands

comman 可分作四類

1. 可執行的程式(An executable program): 例如 /usr/bin 下的檔案
2. A command built into the shell itself: [殼層內建指令 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/%E6%AE%BC%E5%B1%A4%E5%85%A7%E5%BB%BA%E6%8C%87%E4%BB%A4)，例如 cd
3. A shell function.
4. An alias.

## 識別指令(Identifying Commands)

type 讓你知道你在用哪一種指令

```shell
[me@linuxbox ~]$ type type
type is a shell builtin
[me@linuxbox ~]$ type ls
ls is aliased to `ls --color=tty'
[me@linuxbox ~]$ type cp
cp is /bin/cp
```

which 讓你知道程式的位置

```shell
[me@linuxbox ~]$ which ls
/bin/ls
[me@linuxbox ~]$ which cd
/usr/bin/which: no cd in
(/opt/jre1.6.0_03/bin:/usr/lib/qt-3.3/bin:/usr/kerberos/bin:/opt/jre1
.6.0_03/bin:/usr/lib/ccache:/usr/local/bin:/usr/bin:/bin:/home/me/bin
)
```

## 查看指令文件

man 在多數 linux 系統使用 `less` 來顯示內文

```shell
man --help
mkdir --help
man ls
man 5 passwd
apropos whatis
whatis apropos
whatis whatis
info whatis
info coreutils
```

某些軟體在安裝時，會將文件放到 `/usr/shared/doc`，有純文字、HTML、.gz，.gz可使用 zless 查看

## 建立別名

小技巧

```shell
# command1; command2; command3...
cd /usr; ls; cd -
```

建立別名前請先用 `type` 確認

```shell
# alias name='string'

# 新增別名
alias foo='cd /usr; ls; cd -'

[me@linuxbox ~]$ type foo
foo is aliased to 'cd /usr; ls ; cd -'

# 移除別名
[me@linuxbox ~]$ unalias foo
[me@linuxbox ~]$ type foo
bash: type: foo: not found

# 查看系統設定什麼別名
alias
```

session 終止時，這些別名就會消失，後續會再介紹怎麼讓你登入時就可使用