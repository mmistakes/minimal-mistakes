---
layout: single
title: "Code Kata 05"
categories: Algorithm
tag: [total, javascript]
---

#### 문제

strs은 단어가 담긴 배열입니다. 공통된 시작 단어(prefix)를 반환해주세요.

예를 들어 strs = ['start', 'stair', 'step'] return은 'st'

strs = ['start', 'wework', 'today'] return은 ''

---

#### 해결

```js
const getPrefix = (strs) => {
  let compared = strs[0];
  let prefix = "";
  for (let i = 1; i < strs.length; i++) {
    for (let j = 1; j <= strs[i].length; j++) {
      if (compared.indexOf(strs[i].substring(0, j)) >= 0)
        prefix = strs[i].substring(0, j);
      else {
        compared = prefix;
      }
    }
  }
  return prefix;
};

console.log("res >> ", getPrefix(["start", "stas", "step"]));
module.exports = { getPrefix };
```

1. `compared` 변수에 공통 시작 단어를 비교할 기준 값을 넣어줬다.
2. 공통된 시작 단어를 넣어줄 `prefix` 를 선언합니다.
3. 중첩for문을 사용해서 첫 for문은 배열의 index를 `i` 에 담고 `strs[i]` 로 분리시킨 문자열을 한번 더 for문을 사용해서 문자열의 index를 `j` 에 담는다.
4. if문에 비교할 기준 값인 `compared` 변수에 `indexOf` 를 사용해서 `strs[i].substring(0,j)` 으로 문자열에서 index를 `j` 만큼 자른다.
5. index `j` 만큼 자른 문자열이 `compared` 변수에 있다면 true이고 없을 시 false를 반환한다.
6. true 라면 if 내부에서 `prefix` 에 해당 문자열을 자른 값을 넣는다.
7. false 라면 else 내부에서 비교값 `compared` 자체를 `prefix` 로 넣는다.
8. false 에서 비교 값을 `prefix` 값으로 교체하는 이유는, 시작 단어부터 공통되는 값만 찾기 때문에 인풋배열에 `start, stas` 는 3단어가 공통 단어라 해도 `step` 은 2단어만 공통이기 때문에 else 에서 비교 값을 `prefix` 로 교체하는 것이다.
