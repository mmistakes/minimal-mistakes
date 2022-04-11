---
layout: single
title: "Code Kata 07"
categories: Algorithm
tag: [total, javascript]
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
  let length = 0;
  let count = 0;

  sortArr.forEach((item, index) => {
    if (index === 0 || item === sortArr[index + 1]) {
      if (length <= count) {
        result = item;
        length = count;
      }
    } else {
      count = -1;
    }
    ++count;
  });
  return result;
}

let input = [1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2];
console.log(moreThanHalf(input)); // 2

module.exports = { moreThanHalf };
```

1. 최종 반환 변수 `result`

2. 숫자배열을 정렬하여 같은 숫자들끼리 모은 `sortArr` 변수

3. 반복 카운트를 저장하지만 중복숫자가 끝났을 때 0으로 초기화 되는 `count` 변수

4. 가장 중복이 많은 숫자를 담는 `length` 변수

5. 정렬된 배열을 반복문으로 돌리고 `++count` 로 반복 횟수를 증가 시킨다.

6. 조건문은 `첫번째 반복이거나, 현재 인덱스의 숫자가 다음 인덱스의 숫자와 같다면 true이다.` 라는 뜻이다.

7. 조건문에 `index === 0` 을 넣은 이유는 배열의 길이가 1개일때 다음 인덱스의 숫자가 없어서 예외처리했다.

8. 조건문 내부의 조건문은 현재 중복된 수보다 다음 중복된 수가 많으면 `result` 는 현재 숫자로 변경하고 `length` 는 다음 중복 수로 변경한다.

9. `else` 내부는 중복값이 변경되었다면 `count`를 초기화 한다.

10. 값 초기화를 `count = -1` 로 한 이유는 바로 밑에 `++count` 가 있어서 `0`으로 맞추기 위함이다.
