---
layout: single
title: "Code Kata 10"
categories: Algorithm
tag: [total, javascript]
---

## 문제

인자인 height는 숫자로 이루어진 배열입니다. 그래프로 생각한다면 y축의 값이고, 높이 값을 갖고 있습니다.

아래의 그래프라면 height 배열은 [1, 8, 6, 2, 5, 4, 8, 3, 7] 입니다.

저 그래프에 물을 담는다고 생각하고, 물을 담을 수 있는 가장 넓은 면적의 값을 반환해주세요.

## 가정

배열의 길이는 2이상입니다.

![screencapture-7595740](/Users/sonseongho/Library/Application Support/typora-user-images/screencapture-7595740.png)

## 해결

원하는 정답은 가장 많은 면적에 물을 담을때 높이가 낮은쪽의 빨간 막대를 기준으로 반대편 빨간 막대 길이만큼 기준값을 더한다. `7 * 7 = 49`

```jsx
function getMaxArea(height) {
  let total = 0;
  let count = 0;
  let arr = [];

  for (let i = 0; i < height.length; i++) {
    count = 0; // 다시 초기화
    for (let x = i + 1; x < height.length; x++) {
      ++count; // 만큼 곱하기
      if (height[i] * count > total) {
        total = height[i] * count;
        arr = height[i] > height[x] ? (arr = [x, i]) : (arr = [i, x]);
      }
    }
  }

  let interval = Math.abs(arr[0] - arr[1]);

  return height[arr[0]] * interval;
}

console.log(getMaxArea([35, 46, 43, 59, 59])); // 140
module.exports = { getMaxArea };
```

1. `total` 은 면적이 가장 넓은 값이 담기는 변수이다. 현재 값보다 더 큰 면적 값이 있다면 변경되는 것이다.
2. `count` 는 현재 높이와 곱해지는 수이다.
3. `arr` 는 가장 넓은 면적을 담을 수 있는 양쪽의 높이 수를 담는 배열이다.
4. 첫번째 반복문에서 `count = 0` 을 선언하여 인자가 넘어갈수록 남은 길이만큼 곱할 수 있게 한다.
5. 현재 높이 수와 길이만큼 곱했을 때 가장 넓은 값을 담은 `total` 보다 크다면 `total` 값이 변경되고 `arr` 에 낮은 수가 앞으로 가게 담는다.
6. `interval` 은 두 막대 사이의 길이이다.
7. 낮은 막대 수 기준으로 두 막대 사이에 길이를 곱하여 반환한다.
