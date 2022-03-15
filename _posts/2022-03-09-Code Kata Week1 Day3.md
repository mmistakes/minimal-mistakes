---
layout: single
title: "Code Kata Week1 Day3"
categories: Algorithm
tag: [TIL, Javascript, Algorithm]
---

### 문제

String 형인 str 인자에서 중복되지 않은 알파벳으로 이루어진 제일 긴 단어의 길이를 반환해주세요.

str: 텍스트 return: 중복되지 않은 알파벳 길이 (숫자 반환)

예를 들어, str = "abcabcabc" return 은 3 => 'abc' 가 제일 길기 때문

str = "aaaaa" return 은 1 => 'a' 가 제일 길기 때문

str = "sttrg" return 은 3 => 'trg' 가 제일 길기 때문

### 해결

```js
const getLengthOfStr = (str) => {
  let arr = [];
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    const item = str[i];
    if (arr.indexOf(item) === -1) {
      arr.push(item);
      if (count < arr.length) {
        count = arr.length;
      }
    } else {
      arr = arr.slice(arr.indexOf(item) + 1);
      arr.push(item);
    }
    console.log(arr);
  }
  return count;
};
console.log(getLengthOfStr("abcdefghcijklmnop"));

module.exports = { getLengthOfStr };
```

이 문제의 요점은 **중복되지 않은 값의 길이다.**

반복문으로 함수 인자 `str` 을 인덱스 단위로 나누고 `item` 이라는 변수에 담았다.

전역 배열변수 `arr` 를 **같은 문자가 없을 시 푸시하는 조건으로 했고** 조건문 안에 조건문으로 `arr.length` 즉 **배열의 길이가 전역 숫자변수인 `count` 보다 크다면 `count` 변수를 `arr.length` 길이 값으로 수정해준다.**

그치만, **첫 조건문의 `else` 는 같은 문자열이 발견 되었을 때 실행된다.**

발견된 문자값을 `indexOf()` 에 담으면 **배열 맨 앞부터 매칭되는 문자의 인덱스가 반환된다.**

중복되는 문자는 `c` 이고 `indexOf()` 의 반환값은 2가 된다. 그래서 매칭되는 `c` 까지 `slice()` 로 잘라버리고 **중복된 문자열부터 다시 배열에 담는다.**

그렇게 중복되는 값이 계속 나타나지 않으면 첫번째 조건문 `if` 문 안으로 계속 담기면서 `arr.length` 가 `count` 보다 커지면 `count` 는 또 수정되게 한다.

**최종적으로 `count` 를 반환하면 중복이 안되는 문자열 중에 가장 긴 길이를 숫자로 반환한다.**
