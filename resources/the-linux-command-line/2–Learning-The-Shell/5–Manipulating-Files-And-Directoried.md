# 5 – 檔案及目錄操作(Manipulating Files And Directoried)

主要介紹指令

* `cp`: 複製檔案及目錄
* `mv`: 移動/重新命名檔案及目錄
* `mkdir`: 建立目錄
* `rm`: 移除檔案及目錄
* `ln`: 建立 hard and symbolic links

GUI 可以達成這些事為什麼還需要指令呢？因為 command line 可以處理大量重複性的工作，譬如複製所有的 html 到另一個資料夾，而且目的地資料夾不存在這些 html

```shell
cp -u *.html destination
```

## 萬用字元(wildcard or globbing)

可用來選出符合格式的檔案，chapter 8 會談更多

`*`: 任意字
`?`: 任意單個字
`[characters]`：任一個 characters 所列的字
`[!characters]`：非任一個 characters 所列的字
`[[:class:]]`
    `[:alnum:]`: 字母 + 數字
    `[:alpha:]`: 字母
    `[:digit:]`: 數字
    `[:lower:]`: 小寫字母
    `[:upper:]`: 大寫字母

## mkdir

```shell
# mkdir directory...
mkdir dir1
mkdir dir1 dir2 dir3
```

## cp

```shell
# 複製單一檔案或目錄: cp item1 item2
# 複製多個檔案或目錄: cp item... directory
cp file1 file2 # 複寫 file2 檔案前不會提示
cp -i file1 file2 # 複寫 file2 檔案前會提示
cp file1 file2 dir1 # 複製 file1, file2 到 dir1. dir1 必須已存在
cp dir1/* dir2 # dir1 下的檔案全部複製到 dir2. dir2 必須已存在
cp -r dir1 dir2 # 複製 dir1 下所有內容到 dir2. dir2 不存在時會建立
```

## mv

```shell
mv item1 item2 # 複寫前不會提示
mv item... directory
mv -i file1 file2 # 複寫前會提示
mv file1 file2 dir1
mv dir1 dir2 # dir2 不存在: dir1 複製後刪除. dir2 存在: dir1 複製到 dir2 下
```

## rm

使用萬用字元前請小心確認，`ls` 是你的好幫手

```shell
# rm item...
rm file1 # 安靜的刪除
rm -i file1 # 刪除前提示確認
rm -r file1 dir1
rm -rf file1 dir1 # 檔案或目錄不存在實會安靜的刪除
```

# ln

```shell
ln file link # hrad link
ln -s item link # symbolic link, item 可以是檔案或目錄
```

## Hard links

難以辨認

限制

1. 只能參照相同磁碟的檔案
2. 不能參照目錄

## Symbolic Links

特殊型態的檔案，指標指向檔案或目錄，類似 Windows 中的捷徑

如果參照的檔案或目錄先被刪除，會形成 broken link

## playground

```shell
# Creating Directories
cd
mkdir playground
cd playground
mkdir dir1 dir2

# Copying Files
cp /etc/passwd .
ls -l
cp -v /etc/passwd .
cp -i /etc/passwd .

# Moving And Renaming Files
mv passwd fun
mv fun dir1
mv dir1/fun dir2
mv dir2/fun .
mv fun dir1
mv dir1 dir2
ls -l dir2
ls -l dir2/dir1
mv dir2/dir1 .
mv dir1/fun .

# Creating Hard Links
ln fun fun-hard
ln fun dir1/fun-hard
ln fun dir2/fun-hard
ls -l
ls -li

# Creating Symbolic Links
ln -s fun fun-sym
ln -s ../fun dir1/fun-sym
ln -s ../fun dir2/fun-sym
ls -l dir1
ln -s /home/me/playground/fun dir1/fun-sym
ln -s dir1 dir1-sym
ls -l

# Removing Files And Directories
rm fun-hard
ls -l
rm -i fun
ls -l
less fun-sym
rm fun-sym dir1-sym
ls -l
cd
rm -r playground
```
