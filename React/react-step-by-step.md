# React Step by Step

基於[官方教學](https://reactjs.org/docs/getting-started.html)文件做整理，[練習工具](#練習工具)是你的好幫手，[建立專案](#建立專案)先看看就好

## 建立專案

### [Create React App](https://github.com/facebook/create-react-app)

建立 React 目架構: [Create React App](https://github.com/facebook/create-react-app)

請使用 **Node 8.10.0** 以上版本

```shell
npx create-react-app my-app # 替代指令: npm init react-app my-app
cd my-app
npm start
```

## 主要概念

### [JSX](https://reactjs.org/docs/introducing-jsx.html)

* JSX 是 Javascript 語法延伸，用來產生 React element，推薦使用在 UI 上
* JSX 可放入 Javascript 表達式，如：變數、函式，JSX 本身也可以當作表式
* 屬性可用字串或 Javascript 表達式，使用字串請用`雙引號`，使用 Javascript 表達式時請用`{}`
* React DOM 使用[駝峰氏命名](https://zh.wikipedia.org/wiki/%E9%A7%9D%E5%B3%B0%E5%BC%8F%E5%A4%A7%E5%B0%8F%E5%AF%AB)
* React DOM 預設跳脫(escape)所有值，可預防 Injection 攻擊，如 [XSS Injection](https://en.wikipedia.org/wiki/Cross-site_scripting)，如果要使用跳脫字元的話請加上 `\`，如`\'`
* Babel 會將 JSX 編譯為 `React.createElement()`

```javascript
function formatName(name) {
  return 'Hello ' + name + ', How are you?';
}

const name = 'Vincent';
const greeting1 = <h1>Hello, {name}</h1>;
const greeting1 = <h1>{formatName(name)}</h1>;

// 屬性
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;
```

## [渲染元素(Rendering Elements)](https://reactjs.org/docs/rendering-elements.html)

* React element 都是 Object
* 透過 `ReactDOM.render` 渲染 React element，且只能透過 `ReactDOM.render` 來更新

```javascript
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

## [Components and Props](https://reactjs.org/docs/components-and-props.html)

可以把 `Component` 想像成 Javascript function, Props 則為 function input

* 定義 Component 的方式
  1. Javascripot function
  2. 繼承 `React.Component`
* 透過 `ReactDOM.render` 渲染
* `Component` 可組合多個 element
* 如果 `Component` 長太大，可以切分成小的
* `Props` 保持唯獨，可避免 side effect

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

## [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

* `constructor` 接收 props(來自 parent component), 設定 state
  * 設定/更新 state: `this.setstate`
  * 取用 state: `this.state.變數名稱`
* `componentDidMount` component 渲染到 DOM 後執行
* 更新 state 可能會以非同步方式進行

```javascript
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

## [事件處理(Handling Events)](https://reactjs.org/docs/handling-events.html)

* 使用駝峰氏命名
* JSX 傳遞 function 名稱而非字串
* 取消預設行為要用 `preventDefault` 而非 `return false`
* 用 `bind` 綁定事件: constructor `this.handleClick = this.handleClick.bind(this);` [Sample](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)
* 免 `bind` 綁定事件
  1. class fields syntax: `handleClick = () =>`
  2. arrow function: `<button onClick={(e) => this.handleClick(e)}>`，因在 render 時，都會產生不同的 callback，傳到低層的 component 會需要額外 render，不建議使用

```javascript
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

```javascript
// class fields syntax
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

// arrow function
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```

## 工具

### IDE

* [Editors · Babel](https://babeljs.io/docs/en/editors/)
* [Get Oceanic Next Color Scheme](https://labs.voronianski.com/oceanic-next-color-scheme/)

### 練習工具

* [CodePen](https://codepen.io/pen?&editable=true&editors=0010)
* [CodeSandbox](https://codesandbox.io/s/new)
* [Glitch](https://glitch.com/edit/#!/remix/starter-react-template)
* [local 開發](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html)

## 相關學習資源

* [Getting Started with React - An Overview and Walkthrough](https://www.taniarascia.com/getting-started-with-react/)

## 參考資料

* [React API](https://reactjs.org/docs/react-component.html)