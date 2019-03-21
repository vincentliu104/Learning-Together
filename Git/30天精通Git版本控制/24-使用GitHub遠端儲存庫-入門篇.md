# 24_使用GitHub遠端儲存庫-入門篇

在 Github 建立 Repo 可選擇是否要建立初始版本 

    建立 Repo 並建立版本 : 勾選Initialize this repository with a README， 若要建立「沒有版本」的 Repo，則不需勾選

若建立沒有版本的 Repo，要上傳 local 端的 Repo，則需要在本地進行:
```
git init 
git add file
git commit -m "Init commit"
git remote add origin 遠端Repo的 URL
git push -u origin master
```

最下面兩行是指定將 Local Repo 的變更上傳到 GitHub 的遠端 Repo

**使用 git clone 取得遠端 Repo**

`git clone https://remoteRepo.git`


若遠端 Repo 沒有版本(連master分支都沒有)，則第一次上傳時需加上 `-u` 參數

`git push -u origin master`

**將現有的本地 Git 儲存庫上傳到指定的 GitHub 專案**

1.遠端 Repo 為 空 :
    
    使用 `git remote add origin https://remoteRepo.git ` 建立一個名為 origin 的參照名稱，並指向 `https://remoteRepo.git` 的位址，再用 `git push -u origin master` 將本地 Repo 上傳

2.遠端 Repo 為 有初始版本 :

    建立完遠端參照名稱後，使用 `git push origim master`將會被 Git 拒絕，因為不能將兩個完全無關的 Git 版本直接上傳到 GitHub 上的遠端 Repo。

    解決:
        將遠端 Repo 的 master 分支合併到本地的 Repo後，建立兩個不同版本庫之間的關聯，就可以把本地的 master 推到遠端 Repo了
    git pull origin master
    git fetch
    git merge origin/master

    Git 版本 2.9.0 之後，需要加上 --allow-unrelated-histories 允許 Git 合併沒有共同祖先的分支
