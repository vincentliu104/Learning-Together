## 14 – 自訂命令提示(Customizing The Prompt)

shell prompt 具高度的可設定性

### 解析命令提示(Anatomy Of A Prompt)

預設命令提示的長相，不同的 linux 發行版會有不同設定

```shell
[me@linuxbox ~]$

[me@linuxbox ~]$ echo $PS1
[\u@\h \W]\$
```

Escape Codes Used In Shell Prompts

Sequence        Value Displayed
\a      ASCII bell. 會讓電腦逼一聲
\d      目前日期 For example, “Mon May 26.”
\h      Host name of the local machine minus the trailing domain name.
\H      Full host name.
\j      Number of jobs running in the current shell session.
\l      Name of the current terminal device.
\n      A newline character.
\r      A carriage return.
\s      Name of the shell program.
\t      目前時間 in 24 hour hours:minutes:seconds format.
\T      目前時間 in 12 hour format.
\@      目前時間 in 12 hour AM/PM format.
\A      目前時間 in 24 hour hours:minutes format.
\u      User name of the current user.
\v      Version number of the shell.
\V      Version and release numbers of the shell.
\w      Name of the current working directory.
\W      Last part of the current working directory name.
\!      History number of the current command.
\#      Number of commands entered into this shell session.
\$      This displays a “$” character unless you have superuser privileges. In that case, it displays a “#” instead.
\[      Signals the start of a series of one or more non-printing characters. This is used to embed non-printing control characters which manipulate the terminal emulator in some way, such as moving the cursor or changing text colors.
\]      Signals the end of a non-printing character sequence.

### Trying Some Alternate Prompt Designs

備份目前的設定及還原方式

```shell
[me@linuxbox ~]$ ps1_old="$PS1"

[me@linuxbox ~]$ echo $ps1_old
[\u@\h \W]\$

[me@linuxbox ~]$ PS1="$ps1_old"
```

```shell
# 沒有任何東西
PS1=

PS1="\$ "

# 會逼逼叫
PS1="\a\$ "

# 17:33 linuxbox $
PS1="\A \h \$ "

# <me@linuxbox ~>$
PS1="<\u@\h \W>\$ "
```

### Adding Color

Escape Sequences Used To Set Text Colors
Sequence | Text | Color Sequence | Text Color
---------|------|----------------|-----------
\033[0;30m | Black | \033[1;30m | Dark Gray
\033[0;31m | Red | \033[1;31m | Light Red
\033[0;32m | Green | \033[1;32m | Light Green
\033[0;33m | Brown | \033[1;33m | Yellow
\033[0;34m | Blue | \033[1;34m | Light Blue
\033[0;35m | Purple | \033[1;35m | Light Purple
\033[0;36m | Cyan | \033[1;36m | Light Cyan
\033[0;37m | Light Grey | \033[1;37m | White

範例

```shell
<me@linuxbox ~>$ PS1="\[\033[0;31m\]<\u@\h \W>\$ "
<me@linuxbox ~>$ PS1="\[\033[0;31m\]<\u@\h \W>\$\[\033[0m\] "
```

Escape Sequences Used To Set Background Color
Sequence | Background Color | Sequence | Background Color
---------|------------------|----------|-----------------
\033[0;40m | Black | \033[0;44m | Blue
\033[0;41m | Red | \033[0;45m | Purple
\033[0;42m | Green | \033[0;46m | Cyan
\033[0;43m | Brown | \033[0;47m | Light Grey

範例

```shell
<me@linuxbox ~>$ PS1="\[\033[0;41m\]<\u@\h \W>\$\[\033[0m\] "
```

### Moving The Cursor

Cursor Movement Escape Sequences
Escape Code | Action
------------|-------
\033[l;cH | Move the cursor to line l and column c.
\033[nA | Move the cursor up n lines.
\033[nB | Move the cursor down n lines.
\033[nC | Move the cursor forward n characters.
\033[nD | Move the cursor backward n characters.
\033[2J | Clear the screen and move the cursor to the upper left corner (line 0, column 0).
\033[K | Clear from the cursor position to the end of the current line.
\033[s | Store the current cursor position.
\033[u | Recall the stored cursor position.

範例

```shell
PS1="\[\033[s\033[0;0H\033[0;41m\033[K\033[1;33m\t\033[0m\033[u\]
<\u@\h \W>\$ "
```

### Saving The Prompt

不想每次都要設定 PS1，可以加到 `.bashrc`

```shell
PS1="\[\033[s\033[0;0H\033[0;41m\033[K\033[1;33m\t\033[0m\033[u\]
<\u@\h \W>\$ "
export PS1
```