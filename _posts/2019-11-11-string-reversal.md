---
layout: "single"
title: "String Reversal: Algorithm Practice in JavaScript"
category: "algorithm"
tags: ["algorithm", "javascript", "string reversal"]
---
{% capture notice %}

#### 참고사항

* 이 포스트는 개인적으로 공부한 내용을 기록하기 위함이며, 몇몇 오류나 비효율적인 방법을 담고 있을 수 있습니다.
* 이 문제와 해답은 [The Coding Interview Bootcamp: Algorithms + Data Structures](https://www.udemy.com/course/coding-interview-bootcamp-algorithms-and-data-structure/)에서 발췌하였습니다.

{% endcapture %}

<div class="notice--info">{{ notice | markdownify }}</div>

> ### Direction
>
> Given a string, return a new string with the reversed order of characters.

> ### Examples
>
> reverse('apple') === 'leppa'  
> reverse('hello') === 'olleh'  
> reverse('Greetings!') === '!sgniteerG'

### Solution 1: 내장 함수를 이용하는 방법

JavaScript의 기본 자료형인 배열에는 배열 내 요소들의 위치를 뒤집는 [`reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) 함수가 내장되어 있다. 하지만 문자열은 배열이 아니므로 이 함수를 직접 호출할 수는 없다. 따라서,

1. 문자열을 문자배열로 전환하고, [`split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
2. 그 문자배열을 역순으로 뒤집은 후, [`reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
3. 다시 문자배열을 문자열로 전환하는, [`join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/join)

총 3단계를 거쳐야 한다.

```javascript
// 1. Turn 'str' into an array
// 2. Call 'reverse' method on the array
// 3. Join the array back into a string
// 4. Return the result

function reverse(str) {
  return str.split('').reverse().join('');
}
```

이 때의 시간 복잡도와 공간 복잡도는 모두 `O(n)`이다.

> #### Limitation
>
> 하지만, 이 해답은 완벽한 해답은 아니다. 첫 번째 이유는 [`JavaScript의 내부적인 문자 인코딩 방식`](https://mathiasbynens.be/notes/javascript-encoding) 때문이다. ECMAScript 표준은 **UCS-2** 혹은 **UTF-16** 방식을 이용하며, 특별하게 명시되어 있지 않다면 **UTF-16** 방식을 따른다. 그런데 **UTF-16** 방식의 경우 문자의 비트 수는 가변적이기에, 두 쌍의 16비트로 이루어진 **Surrogate Pair**의 경우 [`split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) 함수가 의도한대로 동작하지 않을 수 있다. 두 번째 이유는 **tilde**와 같은 부연부호가 문자에 포함되어 있는 경우 또한 잘못된 결과를 불러 일으키기 때문이다.

```javascript
reverse("a 😲 b"); // "b �� a"
reverse("résumé"); // "́emuśer"
```

이를 해결하려면 [`Esrever`](https://github.com/mathiasbynens/esrever)과 같은 외부 라이브러리 사용을 고려할 수 있다. 하지만 면접에서 이 문제를 마주했다고 가정했을 때는, 사전 질문을 통해 입력 자료를 제한하는 방식의 접근을 할 수 있을 것 같다.

### Solution 2: 반복문을 이용하는 방법

내장 함수를 이용하는 접근법 외에도, 더 손이 가는 알고리즘 설계를 요구할 수 있다. 가장 쉽게 생각할 수 있는 것은 반복문을 이용하는 접근법이다. 한 가지 주의해야 하는 부분은 JavaScript에서 문자열은 불변`immutable`하다는 것이다. 주어진 문자열을 내부에서 문자끼리 위치를 전환할 수 없다는 것을 고려해야 한다. 반복문을 통해 문자열을 순회하는 방법으로 [`for...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)를 사용할 수 있음을 알아두어야 한다.

```javascript
// 1. Create an empty string called 'reversed'
// 2. for each character in the provided string
//    - Take the character and add it to the start of 'reversed'
// 3. Return the variable 'reversed;

function reverse(str) {
  let reversed = '';
  for (let ch of str) {
    reversed = ch + reversed;
  }

  return reversed;
}
```

이 때의 시간 복잡도와 공간 복잡도는 모두 `O(n)`이다.

> #### Advanced
>
> `+` 연산을 사용하는 대신, 처음에 배열을 생성하고, 반복문 내에서는 배열에 각각의 문자를 `push`한 후, `join`한 결과값을 반환하는 방법이 더 낫지 않을까하는 의문이 생겼다. JavaScript의 문자열은 불변하다는 특성 때문에, `+` 연산의 경우 기존의 문자열을 활용하지 못하고 매번 새로운 문자열을 생성하고 기존의 문자열은 버려진다. 이로 인한 성능상 비효율이 발생하지 않을까 하는 우려가 있었다.
>
> 하지만 결과적으로 `+` 연산을 이용하는 것이 대체로 더 효율적이라는 것을 알게 되었다. 그 이유는 [`모던 브라우저에서는 내부적으로 `+`연산을 최적화하는 알고리즘을 가지고 있기 때문`](https://stackoverflow.com/questions/7299010/why-is-string-concatenation-faster-than-array-join)이다. 이 때문에, 보편적인 환경에서는 굳이 이해하기 쉽고 간편한 `+`연산을 사용하지 않을 이유는 없을 것 같다.

### Solution 3: [`reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 함수를 이용하는 방법

어떤 배열을 순회해서 단일한 결과값을 반환하는 경우, 내장 함수인 [`reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)를 이용하는 것을 고려할 수 있다. 이 문제를 풀기 위해서라기보다, 이 함수의 사용방법을 익히는데 의의가 있다고 본다. 물론 여기서도 입력 자료에 따라 잘못된 결과값이 반환될 수 있음을 유의해야 한다.

```javascript
function reverse(str) {
  return str.split('').reduce((reversed, ch) => ch + reversed, '');
}
```

이 때의 시간 복잡도와 공간 복잡도는 모두 `O(n)`이다.
