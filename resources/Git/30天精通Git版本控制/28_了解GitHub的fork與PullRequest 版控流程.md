# 28_了解 GitHub 的 fork 與 pull request 版控流程

#### 權限控管

`git clone` 會將擁有完整歷史紀錄的遠端 Repo 下載回本地，但若沒有權限控管，代表所有人都可以對這個遠端的 Repo 執行變更後推送上Github，若只有一份 Repo，則容易發生問題

1. 在個人帳戶下，Github 可以設定專案的**協同開發人員(Collaborators)**，這些人可以自由的對 Repo 進行 pull、push

2. 在組織帳戶下，Github 可以設定專案的**人員群組(Teams)**，可以在這個群組上設定權限
    
    1. Pull Only (唯獨)
    2. Push & Pull (可讀可寫)
    3. Push,Pull & Administrative (可讀可寫、專案管理權限)

### Fork

將別人的專案用叉子「叉」回自己的帳號裡面

Fork 到自己帳號下的 Repo 可以隨意進行變更，且會顯示　Fork 的來源 Github 帳號，且會有該 Repo 完整的歷史紀錄

git clone Fork 回自己的專案到本地後進行變更，再將變更推送上 Github，此時若想將自己的變更合併回 Fork 的來源帳號，則需進行 **Pull Request**。

* Pull Request

    請求原專案的 Repo 擁有者將自己的變更「拉回」並「合併」回原專案裡面

但 Fork 過的版本並無法選擇，必須另外選取 `Compare across forks`才選的到自己 Fork 回並變更的版本

記得自己的版本是叫新的，因此應該長這樣

**master 　＜－－　 改過的版本**

這樣才表示是將自己的變更合併回 master

若 Git 確定沒有發生衝突，則可以進行 merge

Send pull request 即可

原專案的擁有者，只要按下 Merge Pull Request 將變更合併回自己的專案即可