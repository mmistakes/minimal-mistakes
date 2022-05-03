---
layout: single
title: "JavaScript의 연산자"
categories: javascript
tag: [javascript]
toc: true
toc_label: "포스트 목차"
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---
JavaScript의 연산자에 대하여 알아보자.  
<br>

# 문자 연산자  
<br>

```javascript
console.log(`JS` + `Example`);
// 기본 문자 연산. 결과 : JSExample 
console.log(`1` + 2);
// ``의 사용으로 1이 숫자가 아닌 문자로 인식된다. 결과 : 12
console.log(`one + two = ${1 + 2}`);
// ${}를 이용한 연산. 결과 : one + two = 3
```  
<br>
JavaScript는 변수를 선언할 때,  
따로 타입을 설정해주지 않아도  
변수에 할당된 값에 따라서  
데이터 타입이 정해진다.  
<br>
이 때, 역 따옴표 ``이 사용되면  
값에 상관없이 문자로써 인식된다.  
때문에 위의 예시와 같이 `1`로 입력하면  
JavaScript는 1을 문자로 정했으므로,  
뒤따라오는 + 2 또한 문자연산으로 사용한다.   
<br>
또한 문자열을 작성할 때,  
역 따옴표 `` 를 이용하게 되면  
줄 바꿈이나 특수기호또한 표시되며,  
추가로 ${}를 사용할 수 있다.  
${} 안에 변수값을 입력하면,  
할당된 값을 가진 변수가 된다.  

<br>
<hr>
<br>

# 숫자 연산자  
<br>

```javascript
console.log(1 + 1);         //2 덧셈
console.log(1 - 1);         //0 뺄셈
console.log(1 / 1);         //1 나누기
console.log(1 * 1);         //1 곱하기
console.log(1 % 1);         //1 나누기의 나머지값
console.log(1 ** 1);        //1 제곱 (1의 1승)
```  
<br>
<hr>
<br>

# 증가, 감소 연산자
<br>

```javascript
let counter = 2;
const preIncrement = ++counter;
// counter = counter + 1; 
// preIncrement = counter;

const postIncrement = counter++;
// preIncrement = counter;
// counter = counter + 1; 
```  

<br>
++, -- 는 증가와 감소 연산자로써,  
이 연산자가 변수에 선언되면 값이  
1씩 증가하거나 감소한다.  
반복문, 조건문에서 많이 사용되며  
위 예시처럼 연산자의 위치에 따라  
순서가 정해진다.  
<br>
<hr>
<br>

# 할당 연산자
<br>

```javascript
let x = 1;
let y = 2;

x += y; // x = x + y; 값 = 3
x -= y; // x = x - y; 값 = -1
x *= y; // x = x * y; 값 = 2
x /= y; // x = x / y; 값 = 0.5
```  
<br>
<hr>
<br>

# 비교 연산자
<br>

```javascript
console.log(10 < 5);    //false 작을 경우 true
console.log(10 <= 5);   //false 작거나 같은 경우 true  
console.log(10 > 5);    //true  큰 경우 true
console.log(10 >= 5);   //true  크거나 같은 경우 true
```  
<br>
<hr>
<br>

# 논리 연산자
<br>

```javascript
const a = false;
const b = 2 < 1;    // false

function check(){
    return true;
}

console.log(`${a || b || check()}`);
// a와 b가 false 여도 check()가 true값이므로 true를 리턴한다.
// 결과 = true

console.log(`${a && b && check()}`);
// a나 b가 false 이면 연산을 멈추고 false 리턴
// 결과 = flase

console.log(!a);
// ! 연산자는 false나 true의 값을 반대값으로 변경한다.
// 결과 = true

```  
<br>

`||` 나 `&&` 연산자는  
진행하다 조건을 만족하면  
연산을 멈춘다.  
만약 복잡한 함수를 연산해야  
하는 경우라면, 가장 마지막에  
배치하여, 쓸데없는 연산을  
막을 수 있다.  
<br>
<hr>
<br>

# 비교 연산자
<br>

```javascript
const string = `1`; // 문자
const number = 1;   // 숫자

// ==의 경우 할당된 값만을 보아서,
// 타입이 달라도 할당된 값이 동일하면 true
console.log(string == numer); //true
console.log(string != numer); //false

// ===의 경우 할당된 값과 타입까지 같아야 true 
console.log(string === numer); //false
console.log(string !== numer); //true
```  
<br>
위와 같이 object가 아닌 경우에는,  
비교적 이해하기 쉬운 연산을 한다.  
하지만, 변수를 object로 선언하게 되면  
이해하기 어려운 현상을 보여준다.  
<br>

```javascript
const object1 = { value: `a` };
const object2 = { value: `a` };
const object3 = object1;

console.log(object1 == object2);    //false
console.log(object1 === object2);   //false
console.log(object1 === object3);   //true

```  
<br>
똑같은 값이 할당되어 있고,  
똑같은 타입으로 저장되어도  
object로 저장된 변수들은  
비교연산자에서 false를 return한다.  
<br>
이유는, object로 저장된 변수들은,  
각자 <span>주소값을 가지고 저장된다.</span>  
object는 각자 주소값을 가진 채  
다른 공간에 저장되는데, 이 주소값 또한  
비교연산에 포함되어 false가 리턴된다.  
<br>
마지막 비교연산의 경우 이 주소값까지  
통째로 변수에 선언되어 있으므로,  
true를 리턴하였다.  
<br>