# Ant Design of React

## Component

### [TreeSelect](https://ant.design/components/tree-select/)

呈現樹狀結構資料的 Select

範例:

* <https://codesandbox.io/s/8l0v3xkp2>
* <https://codesandbox.io/s/gallant-rubin-462r8>
* <https://codesandbox.io/s/n3roy9qprj>

### Tree Porps

* treeData: treeNodes 資料
* value: 目前所選的 treeNode
* treeExpandedKeys: 記錄展開的 key
* onChange: 處理 treeNodes 被選擇或 value 改變時的 callback
* onTreeExpand: 處理 treeNodes 展開時的 callback
* multiple: 支援多選，啟用 treeCheckable 時自動為 true

#### TreeNode Props

> 建議使用 treeData 來操作

實測最底層不一定會取得 `isLeaf` 而是 React.Element，因此會有不可預期的 Bug
