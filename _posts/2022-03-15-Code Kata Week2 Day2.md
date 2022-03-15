---
layout: single
title: "Code Kata Week2 Day2"
categories: Algorithm
tag: [TIL, Javascript, Algorithm]
---

#### 문제

숫자로 이루어진 배열인 nums를 인자로 전달합니다. 숫자중에서 과반수(majority, more than a half)가 넘은 숫자를 반환해주세요.

예를 들어,

```js
nums = [3, 2, 3];
return 3;

nums = [2, 2, 1, 1, 1, 2, 2];
return 2;
```

#### 가정

`nums` 배열의 길이는 무조건 `2`개 이상

---

#### 해결

```js
function moreThanHalf(nums) {
  let result = 0;
  let sortArr = nums.sort((a, b) => {
    return a > b ? 1 : -1;
  });
  let count = 0;
  let length = 0;

  sortArr.forEach((item, index) => {
    if (index === 0 || (item === sortArr[index + 1] && length < count)) {
      result = item;
      ++length;
      count = 0;
    }
    ++count;
  });
  return result;
}

let input = [1];
console.log(moreThanHalf(input)); //1

module.exports = { moreThanHalf };
```

1. 최종 반환 변수 `result`
2. 숫자배열을 정렬하여 같은 숫자들끼리 모은 `sortArr` 변수
3. 반복 카운트를 저장하지만 중복숫자가 끝났을 때 0으로 초기화 되는 `count` 변수
4. 가장 중복이 많은 숫자를 담는 `length` 변수
5. 정렬된 배열을 반복문으로 돌리고 `++count` 로 반복 횟수를 증가 시킨다.
6. 조건문은 `첫번째 반복이거나, 현재 인덱스의 숫자가 다음 인덱스의 숫자와 같으면서 현재 가장 중복이 많은 수보다 다음 중복 수가 많다면 true이다.` 라는 뜻이다.
7. `index === 0` 을 넣은 이유는 배열의 길이가 1개일때 `result` 에 값을 넣기 위함이다.
8. if문 내부 로직은 중복되는 값을 `result` 에 담고 반복되고 있는 횟수만큼 `length`가 증가되고 중복되고 있는 동안 `count` 를 0으로 리셋 시킨다.
