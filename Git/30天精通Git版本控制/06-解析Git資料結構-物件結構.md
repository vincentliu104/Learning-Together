# 06 物件結構
**1.blob物件**

工作目錄中某個檔案的"內容"

執行`git add`時，新增的檔案內容會馬上變成blob物件

**2.tree物件**

儲存目錄下的所有資訊，類似一般瀏覽時的資料夾結構

**3.commit物件**

紀錄有哪些tree包含在版本中，*一個commit物件代表Git的一次提交*，紀錄某特定版本的tree物件，還有commit的時間、log message等，通常還紀錄上一層的commit物件名稱

**4.tag物件**

關聯特定一個commit物件，儲存一些額外的參考資訊 (metadata)，使用tag常見是為特定版本的commit物件標示一個名稱

所有物件會以 `zlib` 演算法壓縮，提升檔案存取效率，進行封裝(pack)時，也可以利用差異壓縮演算法(delta compression) 來節省空間。原理為計算相似的 `blob`物件中的差異，再將差異儲存於 `packfile`中 (`.git/objects/pack`)

關係圖
![](https://i.imgur.com/fLwwbT1.png)



同樣的檔案內容在Git資料庫中，只會有一個blob物件(因位內容一樣，算出來的hash值也一樣，所以只有一個blob)，在commit時產生的tree物件，會包含這次更動的檔案(blob)、資料夾(tree)等

----

`git add`之後，產生的hash檔
存在`.git/objects`中，可用
`git hash-object filename`得到hash後的值

