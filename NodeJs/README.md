# NodeJs

## npm(Node Package Manager)

* [npm 指令](https://www.eebreakdown.com/2016/09/npm.html)

### Npm 指令

#### [npm-install](https://docs.npmjs.com/cli/install)

用來安裝套件

常用 package

* 指定版本: `<name>@<version>`
* 指定 tag: `<name>@<tag>`
* 最新版(tag = `latest`): `<name>`

```shell
# 會出現在 package.json - dependencies
npm install # 簡寫 npm i

# 發布後仍會使用的 package，會出現在 package.json - dependencies
npm install <name> --save

# 開發階段使用的 package，會出現在 package.json - devDependencies
npm install <name> --save-dev
```

## package.json

* [joi-browser](https://github.com/jeffbski/joi-browser): 如果有使用到 joi，在 Browser 端也要能讀取就需加入此套件
