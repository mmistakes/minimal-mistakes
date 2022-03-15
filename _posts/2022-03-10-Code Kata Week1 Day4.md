---
layout: single
title: "Code Kata Week1 Day4"
categories: Algorithm
tag: [TIL, Javascript, Algorithm]
---

### 문제

숫자인 num을 인자로 넘겨주면, 뒤집은 모양이 num과 똑같은지 여부를 반환해주세요.

num: 숫자 return: true or false (뒤집은 모양이 num와 똑같은지 여부)

예를 들어, num = 123 return false => 뒤집은 모양이 321 이기 때문

num = 1221 return true => 뒤집은 모양이 1221 이기 때문

num = -121 return false => 뒤집은 모양이 121- 이기 때문

num = 10 return false => 뒤집은 모양이 01 이기 때문

### 해결

```js
const sameReverse = (num) => {
  return Number(num.toString().split("").reverse().join("")) === num;
};

console.log("result >> ", sameReverse(-121));
module.exports = { sameReverse };
```

`num` 인자로부터 `-121` 을 받았다.

인자를 스트링으로 변경한 후 배열로 각각 나누고 그 배열을 뒤집었다.

뒤집은 배열을 다시 스트링으로 합친 후 `Number()` 로 숫자로 변경한 후 인자값과 비교해서 값을 반환했다. `-` 부호 경우 `Number()` 함수를 거치면 어처피 `NaN` 이 나오기 떄문에 `false` 를 반환하게 된다.
