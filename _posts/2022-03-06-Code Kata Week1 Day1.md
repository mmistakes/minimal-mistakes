---
layout: single
title: "Code Kata Week1 Day1"
categories: Algorithm
tag: [TIL, Javascript, Algorithm]
---

### 문제

`twoSum`함수에 숫자배열과 '특정 수'를 인자로 넘기면, 더해서 '특정 수'가 나오는 `index`를 배열에 담아 `return`해 주세요.

```
nums: 숫자 배열
target: 두 수를 더해서 나올 수 있는 합계
return: 두 수의 index를 가진 숫자 배열

예를 들어,
```

`nums`은 `[4, 9, 11, 14]` `target`은 `13`

`nums[0] + nums[1] = 4 + 9 = 13` 이죠?

그러면 `[0, 1]`이 return 되어야 합니다.

```
# 가정
target으로 보내는 합계의 조합은 배열 전체 중에 2개 밖에 없다고 가정하겠습니다.
```

### 해결

```js
const twoSum = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for (let x = 0; x < nums.length; x++) {
      if (nums[i] + nums[x] === target) {
        return [i, x];
      }
    }
  }
};
let arr = [4, 9, 11, 14];
let num = 13;
console.log("result >> ", twoSum(arr, num));
module.exports = { twoSum };
```

`twoSum` 함수에 첫번째 인자에 `arr`를 넣고 두번째 인자에 `num`을 넣었다.

중첩 `for문`을 활용하여 인덱스 역할인 임의변수 `i`와 `x`를 인자 배열값인 `nums`에 담아서 조건이 같다면,

인덱스 값을 나타내는 임의변수 `i`,`x`를 배열로 담아 리턴했다.

### 다른 해결 방법

```js
for (let i = 0; i < nums.length; i++) {
  const rest = nums.indexOf(target - nums[i]);
  if (rest != -1) {
    return [i, rest];
  }
}
```

가장 깔끔하고 좋은 방법인것 같아서 위코드 풀스택 4기 김연주님의 코드를 가져왔다.

`nums`를 `for문`에 실행하고 `indexOf `함수를 사용해

`두값이 더해서 나와야 하는 값` - `nums[i]` 을 하여 `rest` 이라는 변수에 해당 값이 배열 `nums`에 존재 한다면 `인덱스`를 반환하고, 아니라면 `-1`을 나타낸다.

그래서 조건문으로 변수 `rest` 이 `-1` 이 아니라면, 즉 `인덱스` 가 존재 한다면 해당 `인덱스`가 담긴 `rest`과 `nums`의 인덱스 값인 임의 변수 `i`를 반환한다.
