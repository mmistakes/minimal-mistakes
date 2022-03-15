---
layout: single
title: "Code Kata Week2 Day1"
categories: Algorithm
tag: [TIL, Javascript, Algorithm]
---

#### 문제

로마자에서 숫자로 바꾸기

1~3999 사이의 로마자 s를 인자로 주면 그에 해당하는 숫자를 반환해주세요. 로마 숫자를 숫자로 표기하면 다음과 같습니다.

```
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

로마자를 숫자로 읽는 방법은 로마자를 왼쪽부터 차례대로 더하면 됩니다. III = 3 XII = 12 XXVII = 27 입니다.

그런데 4를 표현할 때는 IIII가 아니라 IV 입니다. 뒤의 숫자에서 앞의 숫자를 빼주면 됩니다. 9는 IX입니다.

I는 V와 X앞에 와서 4, 9 X는 L, C앞에 와서 40, 90 C는 D, M앞에 와서 400, 900

---

#### 해결

```js
function romanToNum(s) {
  let arr = s.split("");
  let total = 0;
  let nexNum = 0;
  let curNum = 0;

  function toNum(num) {
    return num === "I"
      ? 1
      : num === "V"
      ? 5
      : num === "X"
      ? 10
      : num === "L"
      ? 50
      : num === "C"
      ? 100
      : num === "D"
      ? 500
      : num === "M"
      ? 1000
      : 0;
  }

  arr.forEach((item, index) => {
    curNum = toNum(item);
    nexNum = toNum(arr[index + 1]);
    if (curNum >= nexNum) {
      if (index === 0) {
        total = total + curNum + nexNum;
      } else {
        total = total + nexNum;
      }
    } else {
      if (index === 0) {
        total = nexNum - curNum;
      } else {
        total = total - curNum + (nexNum - curNum);
      }
    }
  });

  return total;
}

console.log("res >> ", romanToNum("MCMXCIV")); //1994
module.exports = { romanToNum };
```

1. `aar` 변수에 인풋값을 배열로 나눠서 담았다. `arr` 변수로 코드카타 진행하기 위함.
2. `total` 변수로 로마숫자 값을 더할 최종 결과 변수를 선언했다.
3. `nexNum` 변수는 반복문을 실행하여 들어오는 값의 다음 값을 넣기 위함.
4. `curNum` 변수는 반복문에서 현재 값을 담당한다.
5. 위에 `nexNum` 과 `curNum` 을 따로 선언한 이유는 로마문자를 숫자로 변환하기 위해서 `toNum()` 함수를 만들어서 로마문자에 일치하는 인풋인자를 숫자로 반환하여 `nexNum` 과 `curNum` 변수에 담는다.
6. `forEach()` 함수로 반복문을 실행하고 `nexNum` 변수는 `index + 1` 을 하여 현재 값의 다음 값을 넣는다.
7. 문제대로 조건문은 **앞에 로마문자가 뒤에 로마문자보다 클 경우 더하게 되고 뒤에 문자가 앞 문자보다 클 경우 뺄셈을 했다.**
8. 조건문 if 내부와 else 내부에 조건문으로 `index === 0` 을 비교하는 이유는 맨 처음 반복문 실행 시 `total` 값에 현재 값과 다음 값을 넣고, 그 다음 부터는 똑같은 숫자가 또 더해지지 않게 다음 값만 더하게 했다.
9. else 문에 else 문 내부에 ` total = (total - curNum) + (nexNum - curNum)` 은 문제를 생각하면 다음값이 현재값보다 크다면 빼는것 이니까 일단 `(nexNum - curNum)` 을 하였고 그것을 `(total - curNum)` 한 값과 더했다.
