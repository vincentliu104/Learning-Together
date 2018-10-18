# Git for Windows 選項設定

使用`git config`設定使用 Git 的環境

* `git config --global user.name`
* `git config --global user.email`

設定 commit 時要使用的帳號、email

### 系統層級 `--system`

`git config --list --system`

檢視系統層級的 Git config

**Windows 內建的 VirtualStore 相容性技術**

讓寫入系統設定的操作並不直接寫入，而是寫在另一個地方，因此若有要設定 `--system` ，則要以系統管理員權限執行 Git

**若要設定「系統層級」選項，請務必用【以系統管理員身分執行】的方式啟用命令提示字元，然後再執行 git config 命令，才能寫入正確的檔案位置。**

### 使用者層級 `--global`

套用當前使用者對 Git 的各種偏好設定

### 儲存區層級 `--local`

只套用在某個工作目錄中的偏好設定

順序:
1. 先套用系統層級 (優先權最低)
1. 再套用使用者層級
1. 再套用儲存區層級 (優先權最高)

`git config --list (--local、--system、--global)`

查看 Config 當前設定

`git config --unset --local user.name`

取消設定

#### 設定指令別名

`git config alias.st status`

自訂指令別名

`git config --global core.editor (notepad.exe 編輯程式路徑)`

執行 `git commit`時要開啟的編輯器

`git config --edit --system`

直接編輯 Git config 設定檔

**自動辨識 CRLF 字元**

`git config --global core.autocrlf true`

因為 Window 與 MAC、Linux平台的斷行符號不同，因此需轉換字元才好做跨平台協作

[Git 在 Windows 平台處理斷行字元 (CRLF) 的注意事項](https://blog.miniasp.com/post/2013/09/15/Git-for-Windows-Line-Ending-Conversion-Notes.aspx)

`git config --local commit.template "F:
git-commit-template.txt"`

自訂 Commit 訊息樣板

