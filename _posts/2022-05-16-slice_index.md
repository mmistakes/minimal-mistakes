---
layout: single
classes: wide
title:  "More JS. slice()"
categories: JavaScript
tags: [30DaysOfJS, slice, MoreJS]
sidebar:
    nav: docs
---

# Further Study: [Negative index in slice()][1]

+ `start` parameter can take negative index value, which means it starts from the end. `slice(-2)` will extract last two elements in the sequence.
<br>

+ `end` parameter can also take negative index value, meaning that it starts from the end of the sequence. `slice(2, -1)` will extract the third element through the second-to-last element in the sequence.

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant', 'falcon'];

/* starts from index 1,
  count 2 elements from the end(excluded) */
console.log(animals.slice(1, -2));
// ['bison', 'camel', 'duck']

console.log(animals.slice(2, -1));
// (3) ['camel', 'duck', 'elephant']

console.log(animals.slice(2, -3));
// ['camel']
```

> To separate an array - all elements without last element and the last element - Use `arr.slice(0, -1)` and `arr.slice(-1)` ( `arr[arr.length - 1]` would also work).


<br>

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice#parameters