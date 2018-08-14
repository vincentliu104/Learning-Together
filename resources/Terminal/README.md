# Terminal 樣式 (for MAC)
## iTerm2、zsh、oh-my-zsh
#### 相關連結
- [導入、安裝、使用教學](https://medium.com/@chuanjen.wang/mac%E9%85%B7%E7%82%ABterminal-%E6%A8%A3%E5%BC%8F-%E9%A1%AF%E7%A4%BAgit-%E5%88%86%E6%94%AF-712cfb02b327)
- [oh-my-zsh 官方](https://github.com/robbyrussell/oh-my-zsh)
#### 教學步驟
1. 安裝 iTerm2：
	- 先透過網路下載 [iTerm2](https://iterm2.com/) 安裝
	- 或透過指令安裝：
	`brew cask install iterm2`
1. 安裝 zsh：
	- 先檢查 Terminal 裡是否有 zsh：
	`zsh --version`
	- 如果無 zsh 鍵入以下指令來安裝：
	`brew install zsh zsh-completions`
1. 安裝 oh-my-zsh:
	- 鍵入以下指令來安裝：
	`sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`
	- 關掉 iTerm2 重啟
1. 變更樣式
	- 開啟 zsh 設定檔，鍵入以下指令：
	`nano ~/.zshrc` 或是到**用戶名**下的**資料夾**找 `.zshrc`檔案開啟
	- 在設定檔中找到以下設定名：
	`ZSH_THEME="robbyrussell"` 改成 `ZSH_THEME="agnoster"`
	- 修改後關掉 iTerm2 重啟
1. 安裝字體
	- 鍵入以下指令：
	`git clone https://github.com/powerline/fonts.git`
	- 安裝字型檔案:
		```
		cd fonts
		./install.sh
		```
	- 刪除下載安裝檔：
		```
		cd ..
		rm -rf fonts
		```
	- 打開iTerm2 進入路徑 **Preferences -> Profile -> Text -> Change Font ->選擇** `14pt Meslo LG S Regular for Powerline` 就完成樣式變更了

## VSCode 教學
#### 相關連結
- [VSCode Terminal 樣式](https://www.jazz321254.com/visual-studio-code-zsh/)
#### 教學步驟
1. 安裝 zsh：
	- 先檢查 Terminal 裡是否有 zsh：
	`zsh --version`
	- 如果無 zsh 鍵入以下指令來安裝：
	`brew install zsh zsh-completions`
1. 安裝 Powerline 字型：
	- 安裝方式如下：
		```
		git clone https://github.com/powerline/fonts.git --depth=1
		cd fonts
		./install.sh
		cd ..
		rm -rf fonts  
		```
1. 安裝 Powerlevel9k：
	- 安裝方式如下：
		```
		git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
		echo 'ZSH_THEME="powerlevel9k/powerlevel9k"' >> ~/.zshrc
		source ~/.zshrc
		```
1. 設定 VS Code:
	- 點選 `[喜好設定]>[設定]`（Mac快速鍵 ⌘ + ,）
	- 選取 `[整合式終端機]`
	- 改寫設定檔：
		```
		{
		  "terminal.integrated.fontFamily": "Source Code Pro for Powerline",
		  "terminal.integrated.fontSize": 14
		}
		```
