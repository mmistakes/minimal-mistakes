---
layout: single
title: "Code Kata 02"
categories: Algorithm
tag: [total, javascript]
---

### 문제

reverse 함수에 정수인 숫자를 인자로 받습니다. 그 숫자를 뒤집어서 return해주세요.

x: 숫자 return: 뒤집어진 숫자를 반환!

예들 들어, x: 1234 return: 4321

x: -1234 return: -4321

x: 1230 return: 321

---

### 해결

```js
const reverse = (x) => {
  return (
    parseInt(
      x
        .toString() // -1234
        .split("") // ['-','1','2','3','4']
        .reverse() // ['4','3','2','1','-']
        .join("") // 4321-
    ) * Math.sign(x)
  );
};

console.log(reverse(-1234));
```

1. reverse 함수의 인자값으로 숫자 `-1234` 가 들어온다.

2. `x` 를 `toString()` 으로 문자값으로 바꾼다.
3. `split('')` 으로 문자값을 배열로 나눈다. **(reverse 를 하기 위함, split 사이에 `''` 를 쓰지 않으면 문자숫자가 각각으로 나뉘지 않는다.)**
4. `reverse()` 으로 배열 순서를 뒤집는다.
5. `join('')` 으로 배열을 문자열로 합친다. **(join 사이에 `''` 를 쓰지 않으면 배열을 나누는 `,` 까지 문자로 합쳐진다.) **
6. `join()` 까지 마친 문자열을 `pareseInt()` 한다. **이유는 인자값이 실수로 들어왔기 때문에 문자열에 숫자가 아닌 `-` 가 포함 되어있다. `pareseInt()` 를 사용한다면 문자를 제거해준다.**
7. 여기부터가 핵심이다. `Math.sign(x)` 를 `pareseInt()` 한 값에 곱하는데 `Math.sign()` 은 인자로 들어오는 값이 **상수이면 1을 반환, 실수이면 -1을 반환한다.** 그래서 `pareseInt()` 한 값에 곱하면 상수/실수를 나타낼 수 있다.
