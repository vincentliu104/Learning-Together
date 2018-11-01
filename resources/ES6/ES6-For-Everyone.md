# ES6 For Everyone

- [ES6 For Everyone](#es6-for-everyone)
  - [New Variables — Creation, Updating and Scoping](#new-variables--creation-updating-and-scoping)
    - [範例](#%E7%AF%84%E4%BE%8B)
    - [`var` 還有用嗎？](#var-%E9%82%84%E6%9C%89%E7%94%A8%E5%97%8E)
    - [參考資料](#%E5%8F%83%E8%80%83%E8%B3%87%E6%96%99)
  - [Function Improvements: Arrows and Default Arguments](#function-improvements-arrows-and-default-arguments)
    - [預設 function 參數](#%E9%A0%90%E8%A8%AD-function-%E5%8F%83%E6%95%B8)
    - [Arrow Function 的注意事項](#arrow-function-%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85)
  - [Template Strings](#template-strings)
  - [Additional String Improvements](#additional-string-improvements)
  - [Destructuring](#destructuring)
  - [Iterables & Looping](#iterables--looping)
  - [An Array of Array Improvements](#an-array-of-array-improvements)
  - [Say Hello to ...Spread and ...Rest](#say-hello-to-spread-and-rest)
  - [Object Literal Upgrades](#object-literal-upgrades)
  - [Promises](#promises)
  - [Symbols](#symbols)
  - [Code Quality with ESLint](#code-quality-with-eslint)
  - [JavaScript Modules and Using npm](#javascript-modules-and-using-npm)
  - [ES6 Tooling](#es6-tooling)

本篇介紹 Wes Bos 開的課程－[ES6 For Everyone](https://es6.io/)，sample code [Starter File](https://github.com/wesbos/es6.io)

## New Variables — Creation, Updating and Scoping

ES6 推出新的變數、常數宣告方式，定義較為嚴謹

`var` 是在 ES5 僅有的變數宣告，你可以重新賦值、更新、宣告，`function` 是除了 `global` 之外僅有的作用域

`let` 僅能宣告一次，後續只能更新，作用域為 block

`const` 宣告後就無法更新、重新賦值，不過你可以更新他的屬性

ES5 通常在解作用域會用到 [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)，也就是你用到的變數只存在一定的範圍內，不會污染到 `global`

### 範例

IIFE

```javascript
  (function(){
    var name = "vincent";
    console.log(name);
  })();

console.log(name);
```

ES6 只要加上 block 輕鬆解決

```javascript
  {
    // let or const block scope
    const name = "vincent";
    console.log(name);
  }

console.log(name);
```

迴圈變數用 `var` 會汙染，要用 `let` 才行

```javascript
  for(let i = 0; i < 10; i++) {
    console.log(i);
    setTimeout(function() {
      console.log('The number is ' + i);
    },1000);
  }
```

### `var` 還有用嗎？

[ES2015 const is not about immutability · Mathias Bynens](https://mathiasbynens.be/notes/es6-const) 的說法

1. 預設使用 `const`
1. 當你需要更新他時，再改成 `let`
1. 絕對不用 `var`， ES6 不需要他

另一派

1. 共用的變數使用 `var`
1. 區域變數使用 `let`
1. 將極度確定不會變動的變數重構為 `const`

### 參考資料

- [ES6 let VS const variables](https://wesbos.com/let-vs-const/)
- [Is var Dead? What should I use?](https://wesbos.com/is-var-dead/)
- [Ben Alman &raquo; Immediately-Invoked Function Expression (IIFE)](http://benalman.com/news/2010/11/immediately-invoked-function-expression/)

## Function Improvements: Arrows and Default Arguments

Arrows function 特色

1. 簡潔
1. 隱含的 return
1. 不會重新綁定 this

來點範例1

- Arrows function 都會是`匿名函式`，你沒辦法幫他取 function 名稱

```javascript
const names = ['神力女超人', '蝙蝠俠', '蜘蛛人'];

// anonymous function(匿名函式)
const fullName = names.map(function(name) {
  return `${name} 英雄`;
});

// arrow function(explicit return)
const fullNames2 = names.map((name) => {
  return `${name} 英雄`;
});

// arrow function(explicit return)
const fullNames3 = names.map(name => {
  return `${name} 英雄`;
});

// arrow function(implicit return)
const fullName4 = names.map(name => `${name} 英雄`);

// arrow function(implicit return)
const fullName5 = names.map(() => `超級英雄`);

console.log(fullName5);

const sayYe = (name) => {
  alert(`${name} Ye!`);
}

sayYe('Vincent');
```

來點範例2

```javascript
const race = '2018年亞洲運動會羽球女子單打比賽';
const winners = ['戴資穎', '普薩拉·文卡塔·辛德胡', '塞娜·內維爾'];
const win = winners.map((winner, i) => ({name: winner, race:race, place: i + 1}));

console.table(win);

const ages = [16, 18, 30, 256, 72, 34, 68];
const old = ages.filter(age => age >= 65)

console.log(old);
```

### 預設 function 參數

可以設定預設值

```javascript
function calcaluateBill(total, tax_rate = 0.13, tip_rate = 0.15) {
  return total + (total * tax_rate) + (total * tip_rate);
}

console.log(calcaluateBill(100, 0.13, 0.25));
console.log(calcaluateBill(100));
```

### Arrow Function 的注意事項

- this 作用域通常會是 `window` 或是 `function`，但在 Arrow Function 中的 `this` 會是 parent
- 選對時機使用它，以下是不適用的情境
    1. `EventListener`
    1. `object` method
    1. `prototype` method
    1. 需要使用到 `arguments` 的時候

## Template Strings

TODO

## Additional String Improvements

TODO

## Destructuring

TODO

## Iterables & Looping

TODO

## An Array of Array Improvements

TODO

## Say Hello to ...Spread and ...Rest

TODO

## Object Literal Upgrades

TODO

## Promises

TODO

## Symbols

TODO

## Code Quality with ESLint

TODO

## JavaScript Modules and Using npm

TODO

## ES6 Tooling

TODO
