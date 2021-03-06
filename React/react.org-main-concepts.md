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

### [渲染元素(Rendering Elements)](https://reactjs.org/docs/rendering-elements.html)

* React element 都是 Object
* 透過 `ReactDOM.render` 渲染 React element，且只能透過 `ReactDOM.render` 來更新

```javascript
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

### [Components and Props](https://reactjs.org/docs/components-and-props.html)

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

### [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

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

### [事件處理(Handling Events)](https://reactjs.org/docs/handling-events.html)

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

### [條件式渲染(Conditional Rendering)](https://reactjs.org/docs/conditional-rendering.html)

1. 透過 element 變數做判斷
2. 行內邏輯與運算
3. 防止渲染 `return null`

```javascript
// 透過 element 變數做判斷
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }

// 行內邏輯與運算1
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

// 行內邏輯與運算2
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

### [Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)

* 透過 [map](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
* key 可幫助 React 識別哪個項目有新增、修改、刪除
  * key 必須是獨一無二的
  * 真的沒有 key 時，可用 index(不建議使用)

```javascript
// 渲染多個項目1
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);

// 渲染多個項目2
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

// 使用 key
function ListItem(props) {
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

// JSX 使用 key
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}
```

### [表單(Forms)](https://reactjs.org/docs/forms.html)

* 透過事件觸發 `setState` UI 才會更新
* Controlled Components 取值
  * input, textarea, select: `event.target.value`
  * checkbox: `event.target.checked`
  * 如果有固定的 value，Component 會是唯讀狀態，但如果 value 變成 `undefined` 或 `null` 時，Component 會變成可編輯的狀態
* 如果表單有很多 element 要控制的話可以參考 [Handling Multiple Inputs](https://reactjs.org/docs/forms.html#handling-multiple-inputs)
* Uncontrolled Components: file

```javascript
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );

// 多選項
<select multiple={true} value={['B', 'C']}>
```

### [昇華 state(Lift the State Up)](https://reactjs.org/docs/lifting-state-up.html)

情境: 攝氏溫度計與華氏溫度計需要偵測水滾了沒，並能顯示另一個溫度計轉換成自身單位時的溫度

* 實際資料來源應只有一個地方
* 如果會根據不同資料來源並在 state 裡，且有不同呈現方式的話，可以考慮把它移至最接近的共同 parent component
* 如果是由 props 或 state 可計算出結果的，那麼就不要把它存放在 state 裡
* 偵錯工具: [React Developer Tools](https://github.com/facebook/react-devtools)，可查看 state, props 的改變

### [該用組合還是繼承(Composition vs Inheritance)](https://reactjs.org/docs/composition-vs-inheritance.html)

React 提供強大的 composition model，所以推薦使用組合

* 據說 Facebook 使用上千組的 component，還沒有找到使用繼承的情境
* 透過 props 及組合可以讓你明確且安的方式，更有彈性的客製化 component 的樣貌及行為
* 如果要重複使用與 UI 無關的功能可抽出至 JavaScript module，component 透過 import 方式運用

#### 普通容器

當 child component 還不那麼明確時，可直接傳遞 `children` props 到 childern element

例如: 側邊欄、對話框

#### 特殊規格

特規的 component 透過 props render 普通的 component

例如: 歡迎對話框

### [React 思考模式(Thinking in React)](https://reactjs.org/docs/thinking-in-react.html)

1. 將 UI 分解為 component 結構
    * component 都用畫出方框，可與設計師討論，也許他已經做了
    * 運用[單一功能原則](https://en.wikipedia.org/wiki/Single_responsibility_principle)設計 component
    * data model 盡量與 UI 對應
1. 開發出穩定的版本
    * UI 與互動分離，先使用 props 就好
    * 需要互動之處 props 改為 state
    * 開發方式
      * top-down 通常適合大型專案
      * button-up 通常適合一邊測試一編 coding
    * props 與 state 的區別請參考[State and Lifecycle](#State-and-Lifecycle)
1. 識別 UI 狀態最少的表示方式
    * 最小化可變動的 state
    * 關鍵: [DRY: Don’t Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
    * 自我詢問三項問題關於資料的問題，如果是的話，很大機率他應該不是 state
      1. 資料是否可由 parent 傳遞的 props 取得
      1. 任何時間是否都保持不變
      1. 是否可由 component 中的 state 或 prop 計算後得出
1. 識別程式中的 state
    * 識別依據 state render 的每個 component
    * 找共通的 component 所有者
    * 共通的 component 所有者或更高層的 componenet 會擁有 state
    * 找不到適合的位置時，可建立新的 component 持有 state，並放在共通的 component 更高層
1. 加上反向數據流
    * 將 callback 傳遞給子 component

## 工具

### IDE

* [Editors · Babel](https://babeljs.io/docs/en/editors/)
* [Get Oceanic Next Color Scheme](https://labs.voronianski.com/oceanic-next-color-scheme/)
* [Formik](https://jaredpalmer.com/formik/) 表單處理 library

### 練習工具

* [CodePen](https://codepen.io/pen?&editable=true&editors=0010)
* [CodeSandbox](https://codesandbox.io/s/new)
* [Glitch](https://glitch.com/edit/#!/remix/starter-react-template)
* [local 開發](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html)

## 相關學習資源

* [Getting Started with React - An Overview and Walkthrough](https://www.taniarascia.com/getting-started-with-react/)

## 參考資料

* [React API](https://reactjs.org/docs/react-component.html)