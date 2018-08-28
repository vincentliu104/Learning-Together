<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [3 – 導覽(Navigation)](#3--%E5%B0%8E%E8%A6%BDnavigation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 3 – 導覽(Navigation)

Linux 利用 hierarchical directory structure 管理檔案，最上層是 root，Linux 只會有一份 file system tree，額外儲存設備都是由管理人員掛載上的(精準地說是 mount)，每個使用者登入後都會先進到自己的 home directory

主要介紹指令

1. `pwd`: 目前所在目錄
1. `cd`: 切換目錄，可使用絕對路徑(absolute path)或相對路徑(relative path)
1. `ls`: 列出目前目錄的檔案內容

指令 | 說明
---|---
cd . | # 到目前 working directory
cd .. | # 到目前 working directory 上一層
cd - | # 切換到剛剛的 working directory
cd | # 切換到 home 目錄
cd ~user_name | # 切換到 user_name 的 home 目錄
ls -a | # 包含隱藏檔案

重要資訊

- 檔案名稱以 `.` 開頭的是隱藏檔，你的 `home` 目錄有滿多的
- 檔案名稱與指令是區分大小寫(case sensitive)
- Linux 沒有副檔名(file extension)的概念，對些許 application 才有意義
- 檔案名稱可包含標點符號及空白，千萬不要使用空白，萬不得已建議改用 underscore