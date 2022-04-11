---
layout: single
title: "Code Kata 09"
categories: Algorithm
tag: [total, javascript]
---

## 문제

`nums`는 숫자로 이루어진 배열입니다. 가장 자주 등장한 숫자를 `k` 개수만큼 return해주세요.

```jsx
(nums = [1, 1, 1, 2, 2, 3]), (k = 2);
return [1, 2];

nums = [1];
k = 1;
return [1];
```

## 해결

```jsx
function topK(nums, k) {
  let set = [...new Set(nums)]; // [1,2,3]
  let result = [];
  let arr = [];

  set.forEach((item) => {
    arr.push({
      key: item,
      count: 0,
    });
  });

  for (let i = 0; i < nums.length; i++) {
    arr.map((item) => {
      if (nums[i] === item.key) {
        item.count = item.count + 1;
      }
      return item;
    });
  }

  arr.sort((a, b) => {
    return a.count > b.count ? -1 : 1;
  });

  arr = arr.slice(0, k);

  result = arr.map((item) => item.key);

  return result;
}

console.log("res >> ", topK([1, 1, 1, 2, 2, 3], 2));
module.exports = { topK };
```

1. 들어온 인풋 배열에 중복을 없애서 `set` 변수에 배열형태로 담았다.
2. 객체타입으로 바꾸기 위해서 `set` 배열을 반복문으로 돌려서 `arr` 배열에 객체타입으로 `{ key : 1 , count : 0 (초기값) }` 형태로 담았다.
3. 인풋 배열을 `for문`으로 돌리고 내부에는 배열객체가 담긴 `arr`를 `map` 함수로 돌려서 `nums` 배열에 `index` 값과 같은 `key (숫자)` 값이 같다면 `count` 필드를 `+1` 해줬다.
4. 숫자가 중복되는 만큼 `count` 가 담긴 객체들을 `sort` 함수로 정렬하고 k 개수만큼 `slice` 했다.
5. 최종으로 `k` 개수만큼 남음 배열객체를 `map`함수로 돌려서 `key` 필드의 값만 배열로 리턴하게 해줬다.
