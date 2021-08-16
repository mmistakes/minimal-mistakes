---
layout: single
tags: 
 - javascript
title: "[javascript] wecode 사전스터디 week1"
---


## 01. console.log

`console.log`는 괄호 안의 메세지를 콘솔창에 출력하는 명령어

```javascript
console.log(300);      // 300
console.log("apple");    // apple
console.log("만나서 반갑습니다!"); // 만나서 반갑습니다!
```

## 02. 주석 처리하기

코드에서 주석은 코드를 설명하는 코멘트로 실제 동작하는 코드가 아니다.

```javascript
// console.log(300);
```

여러 줄을 주석처리하는 경우

```javascript
/* 
  console.log(300);
  console.log("apple");
  console.log("만나서 반갑습니다!")
*/
```

## 03. 데이터타입

타입(data type)이란 프로그램에서 다룰 수 있는 값의 종류를 의미

자바스크립트의 기본 타입은 크게 원시 타입과 객체 타입으로 구분할 수 있다.

원시 타입(primitive type)은 

- 숫자(number)
- 문자열(string)
- 불리언(boolean)
- 심볼(symbol) : ECMAScript 6부터 제공됨
- undefined

객체 타입(object type)은 

- 객체(object)

####  01. 숫자(number)

자바스크립트는 다른 언어와는 달리 정수와 실수를 따로 구분하지 않고, 모든 수를 실수 하나로만 표현한다.

또한, 매우 큰 수나 매우 작은 수를 표현할 경우에는 e 표기법을 사용할 수 있다.

```js
var firstNum = 10;     // 소수점을 사용하지 않은 표현

var secondNum = 10.00; // 소수점을 사용한 표현

var thirdNum = 10e6;   // 10000000

var fourthNum = 10e-6; // 0.00001
```

####  02. 문자열(string)

자바스크립트에서 문자열은 큰따옴표("")나 작은따옴표('')로 둘러싸인 문자의 집합을 의미한다.

큰따옴표는 작은따옴표로 둘러싸인 문자열에만 포함될 수 있으며, 작은따옴표는 큰따옴표로 둘러싸인 문자열에만 포함될 수 있다.

```js
var firstStr = "이것도 문자열입니다.";      // 큰따옴표를 사용한 문자열

var secondStr = '이것도 문자열입니다.';     // 작은따옴표를 사용한 문자열

var thirdStr = "나의 이름은 '홍길동'이야."  // 작은따옴표는 큰따옴표로 둘러싸인 문자열에만 포함될 수 있음.

var fourthStr = '나의 이름은 "홍길동"이야.' // 큰따옴표는 작은따옴표로 둘러싸인 문자열에만 포함될 수 있음.
```

자바스크립트에서는 숫자와 문자열을 더할 수도 있다.

이럴 경우에 자바스크립트는 숫자를 문자열로 자동 변환하여, 두 문자열을 연결하는 연산을 수행.

```js
ar num = 10;

var str = "JavaScript";

document.getElementById("result").innerHTML = (num + str); // 10JavaScript
```

####  03. 불리언(boolean)

불리언 값은 참(true)과 거짓(false)을 표현한다.

자바스크립트에서 불리언 값은 예약어인 true와 false를 사용하여 나타낼 수 있다.

```js
var firstNum = 10;

var secondNum = 11;

document.getElementById("result").innerHTML = (firstNum == secondNum); // false
```

####  04. 심볼(symbol)

심볼 타입은 ECMAScript 6부터 새롭게 추가된 타입.

심볼은 유일하고 변경할 수 없는 타입으로, 객체의 프로퍼티를 위한 식별자로 사용.

```js
var sym = Symbol("javascript");  // symbol 타입

var symObj = Object(sym);        // object 타입
```

####  05. typeof 연산자

typeof 연산자는 피연산자의 타입을 반환하는 피연산자가 단 하나뿐인 연산자.

```js
typeof 10;        // number 타입

typeof "문자열";  // string 타입

typeof true;      // boolean 타입

typeof undefined; // undefined 타입

typeof null;      // object 타입
```

####  06. null과 undefined

변수는 처음 선언된 경우 초기 값으로 `undefined`, 즉 정의되지 않은 값을 갖는다.

```js
let a;
console.log(a) // --> return undefined
```

즉, 변수를 선언하는 것과 값을 대입하는 것은 별개이고

선언된 변수가 특정한 값을 갖기 위해서는 대입연산자를 사용해 그 값을 대입해주어야 한다.

```js
let a;
console.log(a) // --> return undefined
 
a = "hello" // 한 번 선언된 변수는 값만 대입해주면 됨.
console.log(a) // --> return "hello"
```

`null`과 `undefined`는 모두 자바스크립트의 데이터 타입이다.

`undefined`는 선언은 됐지만 아직 value가 할당되지 않은 경우를 의미하고. null은 '빈 값(blank)'을 의미하는데 사용자가 준 value이다. 그래서 `undefined`와 다르게 자바스크립트가 자동적으로 null 이란 값을 줄 수는 없다.

```js
let name;            // undefined
let name = null;     // null
 
console.log(null == undefined);   // true
console.log(null === undefined);  // false
```

엄격일치연산(`===`)는 value뿐만 아니라 `type`도 같아야 true가 나온다.

```js
console.log(typeof null);       // object
console.log(typeof undefined);  // undefined
```

`null`은 '값이 없음(blank)'을 의미하는 '할당된' value이기 때문에 type이 object로 나온다.

####  01. 객체(object)

자바스크립트의 기본 타입은 객체(object)다.

객체는 여러 프로퍼티(property)나 메소드(method)를 같은 이름으로 묶어놓은 일종의 집합체.

```js
var dog = { name: "해피", age: 3 }; // 객체의 생성

// 객체의 프로퍼티 참조

document.getElementById("result").innerHTML =

    "강아지의 이름은 " + dog.name + "이고, 나이는 " + dog.age + "살 입니다.";
```

## 04. 변수

자바스크립트에서는 변수를 사용하여 여러가지 형태의 데이터를 저장할 수 있다.

변수를 선언하는 방식에는 `var` , `let` ,`const ` 방식이 있다.

```javascript
    var name = 'hello'
    console.log(name) // hello

    var name = 'javascript'
    console.log(name) // javascript
```

변수를 한번 더 선언해도 오류가 나지 않고 정상적으로 작동한다. 

이는 유연한 변수 선언으로 간단한 테스트에는 편리 할 수 있겠으나, 코드량이 많아 진다면 어디에서 어떻게 사용 될지도 파악하	기 힘들뿐더러 값이 바뀔 우려가 있다.

```js
  let name = 'hello'
    console.log(name) // hello

    let name = 'javascript'
    console.log(name) 
    // Uncaught SyntaxError: Identifier 'name' has already been declared
```

`let` 키워드는 `name` 이 이미 선언되었다는 오류가 나오며 변수 재선언이 되지 않는다.

`let` 과 `const` 의 차이점은 immutable 여부이다.

```js
 let name = 'hello'
    console.log(name) // hello

    let name = 'javascript'
    console.log(name) 
    // Uncaught SyntaxError: Identifier 'name' has already been declared

    name = 'javascript'
    console.log(name) //javascript
```

`let` 은 변수에 재할당이 가능하다.

```js
const name = 'hello'
    console.log(name) // hello

    const name = 'javascript'
    console.log(name) 
    // Uncaught SyntaxError: Identifier 'name' has already been declared

    name = 'javascript'
    console.log(name) 
    //Uncaught TypeError: Assignment to constant variable.
```

`const` 는 재할당도 불가능하다.

#### 변수와 대입연산자

자바스크립트에서는 변수를 사용하여 특정한 값(데이터)을 저장할 수 있다.

```js
let myVariable = 5;
```

위에서 알 수 있듯이 변수(variable)에 값을 할당할 때 **대입연산자(=)를 사용한다.**

대입연산자는 말 그대로 오른쪽 항에 있는 값을 왼쪽에 있는 변수에 대입하는 역할을 한다.

```js
let myVar = 5;
let myNum = myVar;
 
// 5를 변수 myVar의 값으로 대입
// 그 후에 myVar를 myNum의 값으로 대입
```

#### Assignment

- 변수 `a`의 값으로 7을 대입해주세요.
- 변수 `b`의 값으로 `a`를 할당해주세요.
- 변수 `b`를 console.log로 출력해서 어떤 값이 담겨 있는지 확인해주세요.

```js
let a = 7;
let b = a;

console.log(b);
```

## 05. 함수

#### 함수의 정의

함수(function)란 하나의 특별한 목적의 작업을 수행하도록 설계된 독립적인 블록.

함수는 필요할 때마다 호출하여 해당 작업을 **반복해서 수행**할 수 있다.

함수의 구성요소는

- 함수의 이름
- 괄호 안에 쉼표(,)로 구분되는 함수의 매개변수(parameter)
- 중괄호({})로 둘러싸인 자바스크립트 실행문

```js
function 함수이름(매개변수1, 매개변수2,...) {

    함수가 호출되었을 때 실행하고자 하는 실행문;

}
```

#### 반환(return)문

이러한 반환문을 통해 호출자는 함수에서 실행된 결과를 전달받는다.

반환문은 함수의 실행을 중단하고, return 키워드 다음에 명시된 표현식의 값을 호출자에게 반환한다.

반환문은 배열이나 객체를 포함한 모든 타입의 값을 반환할 수 있음.

```js
function twoNum(x, y) {

    return x * y;         // x와 y를 곱한 결과를 반환함.

}

var num = twoNum(3, 4); // twoNum() 함수가 호출된 후, 그 반환값이 변수 num에 저장됨.

```

#### 함수의 호출

정의된 함수는 프로그램 내에서 호출되어야만 비로소 실행된다.

일반적인 함수의 호출은 함수의 정의문과 같은 형태로 호출할 수 있다.

```js
function addNum(x, y) {

    return x + y;

} // 함수의 정의

var sum = addNum(4, 8); // 함수 addNum()을 호출하면서, 인수로 4와 8을 전달.

                        // 함수의 호출이 끝난 뒤에는 그 반환값을 변수 sum에 대입.
```

#### Assignment 

1. 7을 반환하는 함수 `returnSeven`을 만들어주세요. 그리고 해당 함수를 호출해서 실행해주세요.
2. "I LOVE WECODE"의 길이를 계산해서 길이 값을 반환하는 함수 `getStringLength`를 만들어주세요. 그리고 해당 함수를 호출해서 실행해주세요.
3. 본인의 이름을 `name`이라는 변수에 저장해서 `name`을 반환하는 함수를 만들어주세요. 그리고 해당 함수를 호출해서 실행해주세요.

```js
function returnSeven() {
  return 7 // 함수 반환
}
returnSeven() // 함수의 실행

function getStringLength() {
  return "I LOVE WECODE".length
}
getStringLength()

function myName() {
  let name = 'chihun Park'
  return name
}
myName()
```

#### Assignment 

1. 함수의 인자로 이름을 받아서 이름의 길이를 **반환하는** 함수를 구현해주세요.
2. 함수의 인자로 나이를 받아서 나이를 **콘솔창에 출력**하는 함수를 구현해주세요.
3. 함수의 인자로 성과 이름(두 개의 인자)을 받아서 합친 후, 전체 이름을 반환하는 함수를 구현해주세요.

```js
// Assignment 1
function getLengthOfName(name) {
  return name.length
}

getLengthOfName('chihunPark')


// Assignment 2
function sayMyAge(age) {
  return console.log(age)
}

sayMyAge(30)

// Assignment 3
function getFullName(lastname, firstname) {
  return lastname + firstname

}

getFullName('Park', 'chihun')
```

## 06. if 조건문

#### 제어문

프로그램의 순차적인 흐름을 제어해야 할 때 사용하는 실행문을 제어문이라고 한다.

이러한 제어문에는 조건문, 반복문 등이 포함.

#### 조건문

조건문이란 프로그램 내에서 주어진 표현식의 결과에 따라 별도의 명령을 수행하도록 제어하는 실행문.

조건문 중에서 가장 기본이 되는 실행문은 if 문이다.

```js
if (표현식) {

    표현식의 결과가 참일 때 실행하고자 하는 실행문;

} // if문


if (표현식) {

    표현식의 결과가 참일 때 실행하고자 하는 실행문;

} else {

    표현식의 결과가 거짓일 때 실행하고자 하는 실행문;

} // else문

if (표현식1) {

    표현식1의 결과가 참일 때 실행하고자 하는 실행문;

} else if (표현식2) {

    표현식2의 결과가 참일 때 실행하고자 하는 실행문;

} else {

    표현식1의 결과도 거짓이고, 표현식2의 결과도 거짓일 때 실행하고자 하는 실행문;

} // else if문
```

#### Assignment

isOkayToDrive 함수를 작성하세요.

- 함수의 인자 who 가 "son" 이면 "Nope!" 리턴
- 함수의 인자 who 가 "dad" 이면 "Good!" 리턴
- 함수의 인자 who 가 "grand father" 이면 "Be careful!" 리턴
- 나머지의 경우 "Who are you?" 리턴

```js
function isOkayToDrive(who) {
  if (who === "son") {
    return "Nope!"
  }
  // 함수의 인자가 SON -> NOPE
  else if (who === "dad") {
    return "Good!"
  }
  // 함수의 인자가 DAD -> GOOD
  else if (who === "grand father") {
    return "Be careful!"
  }
  // 함수의 인자가 GRAND FATEHR -> BE CARFUL
  else {
    return "Who are you?"
  }
  // who are you
  }
```

#### Assignment

checkAge 함수를 작성하세요.

- 이름(name)과 나이(age)를 입력받는 checkAge라는 함수는 나이에 따라 다른 메시지를 리턴합니다.
- 만일 나이가 21살보다 적으면, "Go home, (name)!"
- 나이가 21살이거나 더 많으면, "Nice to meet you, (name)!" 을 리턴하세요.
- 쉼표와 공백, 느낌표까지 정확히 리턴해야 합니다.

```js
function checkAge(name, age) {
  if (age < 21) {
    return "Go home, " + name + "!"
  }
  else {
    return "Nice to meet you, " + name + "!"
  }
}
let output = checkAge('Joon', 22);
console.log(output); // --> 'Nice to meet you, Joon!'

let output2 = checkAge('Joon', 17);
console.log(output2); // --> 'Go home, Joon!'
```

#### Assignment

isEven 함수는 주어진 숫자가 짝수인지의 여부를 반환합니다.

```js
let output = isEven(11);
console.log(output); // --> false
```

```js
function isEven(num) {
if (num % 2 === 0) {
  return true
}
else {
  return false
}
}

let output = isEven(11);
console.log(output); // --> false
```

#### Assignment 

isEitherEvenAndLessThan9 함수를 작성하세요.

- 함수의 인자로 숫자 두개가 주어졌을때 함수는 2가지 조건을 검사합니다.
- 우선 두 숫자 중 적어도 하나가 짝수인지 확인합니다.
- 그리고 두 숫자 모두 9보다 작은지를 확인합니다.
- 두 조건을 모두 만족하는 경우만 true를 반환합니다.

```js
function isEitherEvenAndLessThan9(num1, num2) {
 if ((num1 % 2 === 0 || num2 % 2 === 0 ) && (num1 < 9 && num2 < 9))
 {
   return true
 }
 else {
   return false
 }
} 
let output = isEitherEvenAndLessThan9(2, 4);
console.log(output); // --> true
 
let output2 = isEitherEvenAndLessThan9(72, 2);
console.log(output2); // --> false
```

[참조 ]: http://tcpschool.com/javascript/js_datatype_basic
