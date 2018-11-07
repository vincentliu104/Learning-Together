# ES6 For Everyone

本篇介紹 Wes Bos 開的課程－[ES6 For Everyone](https://es6.io/)，sample code [Starter File](https://github.com/wesbos/es6.io)

- [New Variables — Creation, Updating and Scoping](#new-variables--creation-updating-and-scoping)
  - [範例](#%E7%AF%84%E4%BE%8B)
  - [`var` 還有用嗎？](#var-%E9%82%84%E6%9C%89%E7%94%A8%E5%97%8E)
  - [參考資料](#%E5%8F%83%E8%80%83%E8%B3%87%E6%96%99)
- [Function Improvements: Arrows and Default Arguments](#function-improvements-arrows-and-default-arguments)
  - [預設 function 參數](#%E9%A0%90%E8%A8%AD-function-%E5%8F%83%E6%95%B8)
  - [Arrow Function 的注意事項](#arrow-function-%E7%9A%84%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85)
- [Template Strings](#template-strings)
  - [Tagged templates](#tagged-templates)
  - [Snaitizing User Data](#snaitizing-user-data)
- [Additional String Improvements](#additional-string-improvements)
- [Destructuring](#destructuring)
  - [Destructuring Objects](#destructuring-objects)
  - [Destructuring Arrays](#destructuring-arrays)
  - [Swapping Variables with Destructuring](#swapping-variables-with-destructuring)
  - [Destructuring Functions - Multiple returns and named defaults](#destructuring-functions---multiple-returns-and-named-defaults)
- [Iterables & Looping](#iterables--looping)
- [An Array of Array Improvements](#an-array-of-array-improvements)
- [Say Hello to ...Spread and ...Rest](#say-hello-to-spread-and-rest)
- [Object Literal Upgrades](#object-literal-upgrades)
- [Promises](#promises)
- [Symbols](#symbols)
- [Code Quality with ESLint](#code-quality-with-eslint)
- [JavaScript Modules and Using npm](#javascript-modules-and-using-npm)
- [ES6 Tooling](#es6-tooling)

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

過去要用模板，你只能不斷的 `+`，要多行文字還要用 `\`

在 ES6 的世界裡，`${變數}` 可以解救你

變數裡可以是

1. 變數
1. function
1. 表達式

```javascript
const name = '一個巨星的誕生';
const release = 'October 5, 2018';
const runtime = '135';
const sentence = `本週好看電影推薦 ${name} 上映日期： ${release} 片長： ${runtime/60} 小時`;

console.log(sentence);
```

實際使用時，當然會有物件，並可加入條件式

```javascript
const movies = [
  { name: '一個巨星的誕生', release: 'October 5, 2018', runtime: '135'},
  { name: '波希米亞狂想曲', release: 'November 2, 2018'}
]

const markup = `
  <ul class = "movie">
    ${movies.map(
      movie => `
    <li>
       片名： ${movie.name} 上映日期： ${movie.release} ${movie.runtime ? `片長： ${movie.runtime/60} 小時` : ''}
    </li>
      `).join('')}
  </ul>
`;

document.body.innerHTML = markup;
```

### Tagged templates

如果判斷情境複雜(要 `format`, 很多 `if` 等等)時，可以寫個 function 來處理

如果參數很多時，那不就要寫到哭嗎？答案是不用的，參數可以寫成 `strings, ...values`，這裡用到的是 [Rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

要注意的是 `strings` 的數量永遠多於 `values` 的數量

```javascript
  function highlight(strings, ...values) {
    let str = '';
    strings.forEach((string, i) => {
      str += `${string} <span contenteditable>${values[i] || ''}</span>`;
    });
    return str;
  }
  const name = '一個巨星的誕生';
  const release = 'October 5, 2018';
  const runtime = '135';
  const sentence = highlight`本週好看電影推薦 ${name} 上映日期： ${release} 片長： ${runtime/60} 小時`;
  document.body.innerHTML = sentence;
```

### Snaitizing User Data

所有東西照實呈現出來其實是不安全的(XSS)，`render` 前請服用 [cure53/DOMPurify](https://github.com/cure53/DOMPurify)

## Additional String Improvements

有幾個方便的 String function，要注意他們都是 case sensitive

1. `startsWith`: 檢查字串是不是 ... 開頭，可以略過開頭 N 個字
1. `endsWith`: 檢查字串是不是 ... 結尾，可以只檢查前 N 個字
1. `includes`: 檢查字串是不是包含 ...
1. `repeat`: 重複 N 次

```javascript
const phone = '0800-987-987';
const email = 'someone@somdomain.com';

console.log(phone.startsWith('0800')); // true
console.log(phone.startsWith('987', 5)); // true

console.log(email.endsWith('somdomain.com')); // true
console.log(email.endsWith('Somdomain.Com')); // false
console.log(email.endsWith('someone', 7)); // true

console.log(email.includes('somdomain')); // true
console.log(email.includes('Somdomain')); // false

const coffee = 'Nappuccino';
const ingredient = 'cafe+nap';
const sleep_time = '10-20 mins';

function leftPad(str, length = 20) {
  return `${' '.repeat(length - str.length)}${str}`;
}
```

感覺可以寫更簡潔的 code 了

## Destructuring

中文依照 MDN 翻譯為 `解構賦值`，不管是取得物件部分屬性、處理 API response、賦予預設值都很方便

### Destructuring Objects

```javascript
const marvel_comics_character  = {
  "first": "Hardy",
  "last": "Tom",
  "publisher": "Marvel Comics",
  "host": "Spider Man",
  "super_power": "shapeshifting and camouflage"
};

const { publisher, super_power } = marvel_comics_character; // 取得漫威角色的出版商及超能力
```

你只想從 API response 取得 wiki 電影介紹和角色介紹

```javascript
const marvel_comics_character = {
  "first": "Hardy",
  "last": "Tom",
  "links": {
    "wiki": {
      "movie_intro": "https://en.wikipedia.org/wiki/Venom_(2018_film)",
      "maravel_character_intro": "https://en.wikipedia.org/wiki/Venom_(Marvel_Comics_character)"
    },
    "trailer": "https://www.youtube.com/watch?v=u9Mv98Gr5pY"
  },
  "publisher": "Marvel Comics",
  "host": "Spider Man",
  "super_power": "shapeshifting and camouflage"
};

const { movie_intro: movie, maravel_character_intro: maravel_character } = marvel_comics_character.links.wiki;

console.log(movie, maravel_character);
```

設定預設值，解構時如果有預設值就不會賦值

```javascript
const settings = { width: 300, color: 'black' } // height, fontSize
const { width = 100, height = 100, color = 'blue', fontSize = 25} = settings;

console.log(width, height, color, fontSize);
```

### Destructuring Arrays

- 為 array 中的元素取名字
- 取名數量可以少於 array 元素數量
- 有時候你會拿到逗點分隔的字串，可以用 [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) 轉換成 array 後再解構
- 如果只有前面幾個重要，剩下的可以利用 [rest operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) 處理

### Swapping Variables with Destructuring

通常做法會用暫存變數處理，久而久之就看不懂他在幹嘛，現在利用解構就可以輕鬆解決

```javascript
let inRing = 'Hulk Hogan';
let onSide = 'The Rock';
console.log(inRing, onSide);
[inRing, onSide] = [onSide, inRing];
console.log(inRing, onSide);
```

### Destructuring Functions - Multiple returns and named defaults

當 function 回傳的物件裡，你只需要幾個屬性時使用

```javascript
function convertCurrency(amount) {
   const converted = {
     USD: amount * 0.76,
     GPB: amount * 0.53,
     AUD: amount * 1.01,
     MEX: amount * 13.30
   };
   return converted;
}

const hundo = convertCurrency(100);
console.log(hundo.USD);
console.log(hundo.AUD);

const { AUD, USD } = convertCurrency(100);;
console.log(USD, AUD);
```

function 參數解構時，要注意所有參數都有預設值的時候，你要額外再把 function 參數給解構

```javascript
  function tipCalc({ total = 100, tip = 0.15, tax = 0.13 } = {}) {
    return total + (tip * total) + (tax * total);
  }
  const bill1 = tipCalc({ tip: 0.20, total: 200 });
  const bill2 = tipCalc();
  console.log(bill1, bill2);
```

## Iterables & Looping

Iterable：任何可以 loop 的東西(DOM, collection, arguments, string, array, map, set)，以下介紹幾類

- 普通
- forEach
- for in
- for of
- for of by entries()
- arguments
- string
- objects

普通的寫法會比較囉唆、不好懂，要設定 index 變數，還要用 index 取得元素

```javascript
const maps = ['Asia', 'Africa', 'Europe', 'North America', 'Oceania', 'South America'];

for (let i = 0; i < maps.length; i++) {
  console.log(maps[i]);
}
```

forEach 使用時，無法中斷(break, continue)

```javascript
const maps = ['Asia', 'Africa', 'Europe', 'North America', 'Oceania', 'South America'];

maps.forEach( (map) => {
  console.log(map);
});
```

for in 讓你可以使用 index 取得元素

```javascript
const maps = ['Asia', 'Africa', 'Europe', 'North America', 'Oceania', 'South America'];

for (const index in maps) {
  console.log(maps[index]);
}
```

使用時 for in 時，改變 Array 的元素或 prototype，他們都會出現，某些 library 就會做這些事，例如 [MooTools](https://mootools.net/)

```javascript
Array.prototype.shuffle = function() {
    var input = this;
  
    for (var i = input.length-1; i >=0; i--) {
      var randomIndex = Math.floor(Math.random()*(i+1));
      var itemAtIndex = input[randomIndex];

      input[randomIndex] = input[i];
      input[i] = itemAtIndex;
    }
    return input;
}

const maps = ['Asia', 'Africa', 'Europe', 'North America', 'Oceania', 'South America'];

maps.shop = '7-11';

for (const index in maps) {
  console.log(index, maps[index]);
}
```

for of 除了物件以外都可以使用，並可中斷

```javascript
const maps = ['Asia', 'Africa', 'Europe', 'North America', 'Oceania', 'South America'];

for (const map of maps) {
  if (map == 'North America') {
    break;
  }
  console.log(map);
}
```

for of 想要取得 index 時，利用 `entries()` 並解構

```javascript
const maps = ['Asia', 'Africa', 'Europe', 'North America', 'Oceania', 'South America'];

for (const [index, map] of maps.entries()) {
  console.log(`item ${index + 1} is ${map}`);
}
```

arguments 的 prototype 是 Object，使用時要先轉換成 array

```javascript
function addNums() {
  let sum = 0;
  for (num of arguments) {
    sum += num;
  }
  console.log(sum);
  return sum;
}

addNums(24,54,32,78,90);
```

字串也可以處理

```javascript
const greeting = 'hello, how are you?';
for (const char of greeting) {
  console.log(char);
}
```

for of 可以利用用在非 array 的 Iterables

範例：取用所有的 paragraph

```javascript
const paragraph = document.querySelectorAll('p'); // prototype is NodeList

for ( const item of paragraph) {
  console.log(item);

  item.addEventListener('click', function(){
    console.log(this.textContent);
  })
}
```

影片錄製時 Object 還無法 iterate，因為 `Object.entires` 制定中 ([TC39](https://github.com/tc39/proposal-object-values-entries))，想用的話要使用 polyfill [object.entries](https://github.com/es-shims/Object.entries)

MDN 顯示已經支援 [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

```javascript
// 使用 Object.entries
  const apple = {
    color: 'Red',
    size: 'Medium',
    weight: 50,
    sugar: 10
  };
  for (const [index, item] of Object.entries(apple)) {
    console.log(index, item);
  }
```

```javascript
// 使用 for in
  const apple = {
    color: 'Red',
    size: 'Medium',
    weight: 50,
    sugar: 10
  };
  for (const prop in apple) {
    const value = apple[prop];
    console.log(value, prop);
  }
```

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
