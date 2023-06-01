---
layout: single
title:  "Javascript - 기본개념"
Categories: Javascirpt
Tag: [Javascirpt]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





# ◆Javascript란?

-자바스크립트는 웹페이지를 동적으로 다양하게 제작할 수 있게 도와주는 스크립트 언어이다. (확장자는 .js)

<br/>





# ◆Javascript 적용방법



## 1)내부 자바스크립트 코드

-적용할 웹페이지의 HTML문서의 < head>태그나 < body>태그에 < script>태그를 사용하여 작성하면 된다.<br/>

## 2)외부 자바스크립트 파일

-외부파일로 생성하여 javascript코드를 작성하고 적용할 웹페이지 HTML문서의 < head>태그 안에 외부 자바스크립트 파일을 포함시킨다.<br/>

```html
<head>
    <script src = "main.js"></script>
</head>
```

<br/>





# ◆자료형과 연산자

## 1)자료형

|     자료형     | 설명                                                         |
| :------------: | :----------------------------------------------------------- |
| string(문자열) | 큰따옴표, 작은따옴표안에 들어간 데이터를 말한다.(문자, 단어, 문장) |
|      숫자      | 큰따옴표,작은따옴표안에 안들어간 데이터를 말한다.            |
|    boolean     | 논리연산에 사용하는 데이터를 말한다.(true, false)            |



## 2)단축 연산자

| 단축 연산자 | 설명                               |
| :---------: | :--------------------------------- |
|      +      | 기존변수의 값에 값을 더합니다.     |
|      -      | 기존변수의 값에 값을 뺍니다.       |
|      /      | 기존변수의 값에 값을 곱합니다.     |
|      %      | 기존변수의 값에 나머지를 구합니다. |



## 3)관계 연산자

| 관계 연산자 | 사용 예시 | 설명                                       |
| :---------: | :-------: | :----------------------------------------- |
|     ==      |   A==B    | A와 B의 값이 같은지 비교                   |
|     ===     |   A===B   | A와 B의 값뿐만 아니라 자료형도 같은지 비교 |
|     !=      |   A!=B    | A와 B의 값이 다른지 비교                   |
|      >      |    A>B    | A가 B보다 큰지 비교                        |
|     >=      |   A>=B    | A가 B보다 크거나 같은지 비교               |
|      <      |    A<B    | A가 B보다 작은지 비교                      |
|     <=      |   A<=B    | A가 B보다 작거나 같은지 비교               |



## 4)논리 연산자

| 논리 연산자 | 사용 예시 | 설명                                                |
| :---------: | :-------: | :-------------------------------------------------- |
|     &&      |   A&&B    | and 연산, A와 B 둘다 참일 때만 참이다.              |
|     II      |  A II B   | or연산, A와 B 둘 중에 하나만 참이면 참이다.         |
|      !      |    !A     | not연산, A가 참이면 거짓이 되고, 거짓이면 참이된다. |

<br/>





# ◆변수(variable)



## 1)변수 사용법

```
let color = "black"
```

1) let : 선언하다.<br/>
2) color : 변수의 이름(변수의 이름은 겹치면 안됨.)<br/>
3) =  오른쪽에 있는 값을 왼쪽에 대입시켜준다.<br/>



## 2)변수 선언방법



### 2_1.const

-블록범위를 가지고 있기 때문에 같은 공간에 있어야 사용이 가능하고 주로 변하고 싶지 않은 값들을 만들 때 사용한다(ex password).<br/>- 재선언 및 재할당 할 수 없다. <br/>



### 2_2.let

-블록범위를 가지고 있기 때문에 같은 공간에 있어야 사용이 가능하고 재선언할 수 없지만 재할당 할 수 있다.

```javascript
//javascript 재할당 예제
let color = "pink"
color = "black"
console.log(color) // -> black

//javascript 블록범위 예제
let blockLet1 = 1;
{
    let blockLet1 = 2;
    let blockLet2 = 2;
    console.log(blockLet1); // -> 2
    console.log(blockLet2); // -> 2
}
console.log(blockLet1); // -> 1
console.log(blockLet2); // -> ReferenceError(블럭 안에서만 선언 가능하기 때문)
```



### 2_3.var

-블록범위가 없기때문에, 어디서 변수의 값이 바뀌든 마지막에 변경된 값으로 선언된다. 함수에서만 지역변수로 호이스팅 되기 때문에 함수에서 선언된 var 변수는 함수에서만 사용이 가능하다.<br/>-재선언 재할당 가능하다.<br/>

```javascript
//javascript
var varTest = 1;
function ab()
{
    var varTest = 2;
    console.log(varTest); 
}
var varTest = 3;

ab(); // ->2
console.log(varTest); // -> 3( varTest 재선언으로 결과가 3 나온다.)
```

*지역변수 : 블락 안에서 선언된 변수, 블락안에서만 쓸 수 있음.<br/>
*전역변수 : 블락 밖에서 선언을 한 어디서든 쓰일 수 있는 변수.<br/>

*따라서 var 보단 let을 사용하는게 적합한 이유는 if, for안에 사용하는 변수가 전역변수로 인식되어 값이 잘못 나오거나 변수가 재선언이 가능하게 되면 협업하는 과정에서 값의 변동이 생길 수 있기 때문이다.<br/>



### 2_4.호이스팅

-함수가 실행되기 전에있는 모든 변수의 선언들을 최상단으로 끌어올리고  모든 변수의 선언들을 메모리에 저장하는 과정을 말한다.<br/> -자바스크립트 호이스팅 과정 : 변수를 생성 및 등록 ->등록된 변수를 메모리에 저장하고 동시에 초기화값을 넣어준다->변수에 값을 할당한다.<br/>



**1) let, const**

```javascript
//javascript
console.log(a); // ReferenceError
let a = 1;
console.log(a); 
```

-let과 const의 경우, 변수의 선언문 전에 변수에 접근하였기 때문에 TDZ에 접근되어 "ReferenceError" 출력된다.<br/>-Temporal Death Zone(TDZ): 호이스팅으로 a변수가 메모리에 저장이 되었지만, a의 값이 아직 할당되지 않았기 때문에 a에 접근할 수 없어서 "ReferenceError" 에러가 뜬다.<br/>



**2) var**

```javascript
//javascript
console.log(a); // ReferenceError
let a = 1;
console.log(a); // 1
```

-var는 let,const와 달리 TDZ가 존재하지 않고, 호이스팅으로 변수 a를 인식하면서 동시에 undefined로 초기화를 같이 실행된다.<br/>그래서 출력전 a의 변수 선언문이 정의 되지 않은 상태이면, 초기화(undefined)로 출력되고 a의 변수 선언문이 정의 된 뒤에는 값을 출력하게 된다.

<br/>





# ◆배열(Arrary)

-관련있는 데이터들을 하나로 묶어서 하나의 변수 아래에 저장할때 배열을 사용한다.<br/>
-인덱스 : 배열에 들어가있는 아이템에는 모두 인덱스 번호가 부여되고 시작점은 0부터 부여된다.<br/>

```javascript
//javascript
let fruit = ["banana","apple","grape"]

console.log(fruit)    // "banana","apple","grape"
console.log(fruit[0]) // "banana"
```



## 1)배열함수

| 종류                   | 설명                                                       |
| :--------------------- | :--------------------------------------------------------- |
| 1.pop()                | 배열 끝에있는 아이템을 제거, 그 아이템값을 리턴.           |
| 2.push('아이템')       | 배열 끝에 아이템 추가, 배열의 최종길이 리턴.               |
| 3.includes('아이템')   | 배열에 아이템이 포함되어 있으면 ture리턴 아니면 false리턴. |
| 4.indexOf('아이템')    | 아이템의 인덱스 번호를 리턴.                               |
| 5.slice(시작점, 끝점)  | 시작점~끝점(미포함)까지 배열을 복사해서 리턴.              |
| 6.splice(시작점, 개수) | 시작점부터 개수만큼 실제 배열에서 아이템 제거.             |
| 7.length               | 배열함수는 아니지만 배열의 크기를 리턴해주는 속성.         |

```javascript
//javascript
let furit =["banana","apple","grape"]

1. furit.pop() 
   console.log(furit) // "banana","apple"
2. furit.push("pineapple")
   console.log(furit) // "banana","apple","grape","pineapple"
3. console.log(furit.includes("banana")) // ture
4. console.log(furit.indexOf("banana")) // 0
5. console.log(furit.slice(1,2)) // "apple"
6. furit.splice(1,2)
   console.log(furit) // "banana"
7. console.log(furit.length) // 4
```

***slice와 splice의 차이점**
:slice는 기존의 배열을 건드리지 않고 새로운 배열을 만들기 때문에 console.log(furit.slice())출력하면, slice의 함수가 적용되서 출력된다.<br/>-splice는 기존의 배열을 수정하기 때문에 console.log(furit.slice())출력하면, slice의 함수가 적용되지 않는다.

<br/>





# ◆객체(object)

-자바스크립트의 기본타입으로써 키(key)과 값(value)로 구성된 속성(property)의 정렬되지 않은 집합이다.<br/>-속성 값으로 함수가 올 수 있는데, 이러한 속성을 메소드(method)라고 한다.<br/>



## 1)객체의 구성

-키 : name, age, disease<br/>-값 : "hyejin", 25, "cold"<br/>

```javascript
//javascript
//객체의 구성
let patient = {
    name : "hyejin", age : 25, disease : "cold"
    };

patient.name    // hyejin
patient["name"] // hyejin
```

```javascript
//javascript
//객체의 메소드
let patient = {
    age : 25,
    name : function(name){
        return `제 이름은 ${name}입니다.`
        
    };
 };
patient.name("혜진") // 제 이름은 혜진입니다.
```



## 2)객체속성의 추가, 수정, 삭제

```javascript
//javascript
let patient = {
    name : "hyejin", age : 25, disease : "cold"
    };

//추가
patient.Gender = "woman"
console.log(patient); //{name: 'hyejin', age: 25, disease: 'cold', Gender: 'woman'}

//수정
patient.name = "sumin"
console.log(patient); //{name: 'sumin', age: 25, disease: 'cold'}

//삭제
delete patient.age
console.log(patient); //{name: 'hyejin', disease: 'cold'}
```



## 3) 배열안에 객체 활용

```javascript
//javascript
let patientList = [{name : "hyejin", age : 24},{name : "jimin", age : 18}]

console.log("첫번째 환자?",patientList[0]) //첫번째 환자? name : "hyejin", age : 24
console.log("첫번째 환자 나이?",patientList[0].age) // 첫번째 환자 나이? 24
```

<br/>





# ◆if문

-if문은 특정조건 만족 시 실행하는 명령의 집합이며, if는 필수 else if는 추가조건으로 조건이 여러개일 때 넣어줄 수 있다.<br/>-if문 작성 시 주의해야될 점은 범위를 작은것 부터 큰거순으로 적용해야 된다.<br/>



## 1)if 문법

### 1_1. 기본문법

```javascript
//javascript
if(조건문1){
조건문1이 충족되면 할일 들
}else if(조건문2){
조건문1이 충족하지 않고 조건문2가 충족되면 할일 들
}else {
 조건문1, 조건문2가 충족되지 않으면 할일 들
}

//예제
let age = 18

if(age>20){
console.log("운전이 가능합니다.");
}else if(age>=18){
cosole.log("오토바이 운전이 가능합니다.");
}else{
console.log("운전이 불가능 합니다.");
}
//오토바이 운전이 가능합니다.
```

### 1_2. 이중 if문

```javascript
//javascript
//이중 if문 예제
let age =21
let licence = false

if(age>20){
    if(licence == true){
        console.log("운전이 가능합니다.");
    }else{
        console.log("면허를 따세요.");
    }
}else{
    console.log("운전불가.");
}
//면허를 따세요.
```



## 2)switch문법

-if문의 대안으로 사용할 수 있으며, 값이 딱 하나로 떨어지는 경우에만 사용 가능하다.<br/>

```javascript
//javascript
switch ( 변수 ){
    case A: // 값 A
        // 변수 값이 A 일때 실행할 명령문
        break;
    case B:
        // 변수 값이 B 일때 실행할 명령문
        break;
    case C:
        // 변수 값이 C 일때 실행할 명령문
        break;
    default:
        // 모든 CASE에 부합하지 않을때 실행할 명령문
        break;
}

//예제
let menu = 2;

switch(menu) {
    case 1 :
        console.log("물건사기");
        break;
    case 2 :
        console.log("잔고확인");
        break;
    case 3 :
        console.log("히스토리확인");
        break;
    default : 
        console.log("홈으로 돌아가기");
}
//잔고확인
```



## 3)삼항연산식

-if문의 대안으로 조건이 많지 않고, 반환하고싶은 값이 한가지 있는 경우 사용한다.<br/>

```javascript
//javascript
조건식? 참일때:거짓일때

//예제
let food = "햄버거"
if (food=="피자"){
    console.log("피자가 좋아");
}else if(food=="햄버거"){
    console.log("햄버거가 좋아");
}else{
    console.log("다 싫어");
}

//위의 if문을 삼항연산자로 표현했을 때
let food = "햄버거"
let answer = food=="피자"? "피자가 좋아" : 
food=="햄버거"? "햄버거가 좋아" : "다싫어"

console.log(answer); // 햄버거가 좋아
```

<br/>





# ◆반복문(Loop)

-프로그램 내에서 똑같은 명령을 일정 횟수만큼 반복하여 수행하도록 제어하는 문법으로 for문법과 while문법이 있다.<br/>



## 1)for문

-특정조건을 불충족할 때까지 반복한다. 정확히 몇번 반복해야하는지 범위를 알때 사용한다.<br/>

### 1_1. 기본문법

```javascript
//javascript
//for문 형식
for(초기화; 조건식; 증감식){
    조건식의 결과가 참인 동안 반복적으로 실행하고자 하는 명령문;
}

//예시
for(let i =0; i<10; i++){
    console.log("좋아");
}
// "좋아" 10번 출력됨
```

`i + 1` 은 `i++`로 표현할 수 있다.<br/>
`i - 1` 은 `i--` 로 표현할 수 있다.<br/>



### 1_2. 이중 for문

-반복문 안에 또 다른 반복문이 들어간다.<br/>

```javascript
//javascript
//예제
for(let i=2; i<=9; i++){
    for(let j=1; j<=9; j++){
        console.log(i+"*"+j+"="+i*j)
    }
}

/*2*1=2
  2*2=4
  2*3=6
  2*4=8
  2*5=10
   ..
  결과값 구구단 형식으로 출력됨
  i의 값은 2로 고정된채 j값이 9까지 반복되면서 구구단2단형식으로 출력되고 j의 값이 9까지 출력되면 
  다시 i의 값이 3으로 고정된채 J값이 9까지 반복되면서 구구단 3단형식으로 출력이 계속 반복되어
  마지막 9단형식으로 출력된다.
*/
```



### 1_3. 배열 & for문

-배열안의 아이템들은 for문을 활용하여 출력할 수 있다.<br/>

```javascript
//javascript
//예제
let furit =["banana", "graph", "apple", "pineapple"]

for(let i=0; i<furit.length; i++){
    console.log(furit[i]);
}
// banana, graph, apple, pineapple
```



### 1_4. 무한반복

-데이터를 무한반복하여 출력할 수 있다.

```javascript
//javascript
for(;;){
    console.log("for문의 무한반복")
}
```

<br/>





## 2) while문

-조건식이 참인 동안 반복하여 실행문을 실행한다. 정확한 범위가 아닌 상태에서 따른 반복일때 사용한다.<br/>

### 2_1. 기본문법

```javascript
//javascript
//while문 형식
   초기화
while(조건식){
   조건식의 결과가 참인 동안 반복적으로 실행하고자 하는 명령문;
   증감문;
}

//예제
let i =2;
while(i<10){
    conosole.log("while문 실행");
    i++
}
// "while문 실행" 8번 반복
```



### 2_2. 무한반복

-데이터를 무한반복하여 출력할 수 있다.<br/>

```javascript
//javascript
while(true){
    console.log("while문의 무한반복");
}
```

<br/>





# ◆함수(function)

-특정기능을 하는 구문(알고리즘,로직)을 독립된 부품으로 만들어 재사용하고자 할 때 사용하는 문법이다.<br/>-정의된 함수는 프로그램 내에서 호출되어야 실행된다.<br/>

## 1)함수 선언문

```javascript
//javascript
//function 형식
function 함수이름 (매개변수) {
    내용입력;
    return
}

//예제
function greet(firstname, lastname){
    console.log("hello", firstname, lastname);
}
greet ("hwang","hyejin");  // hello hwang hyejin 종료

/* 매개변수 : firstname, lastname
 * 인자 : hwang, hyjin
 */
```



### 1_1. parameter(매개변수)&argument(인자)

-매개변수(parameter) : 함수를 호출할 때 인자(argument)로 전달된 값을 함수 내부에서 사용할 수 있게 해주는 변수이다.<br/>-인자(argument) : 함수가 호출될 때 전달된 인수를 배열의 형태로 저장된 객체이다.<br/>



### 1_2. return(출력)

-자바스크립트에서 함수는 반환(return)문을 포함할 수 있고 이러한 반환문을 통해 호출자는 함수에서 실행된 결과를 전달받을 수 있다.<br/>

```javascript
//javascript
function greet(){
    return "rain";
}
greet(); // rain
```

-반환문은 함수의 실행을 중단시키는 기능이 있다.<br/>

```javascript
//javascript
function greet(a, b){
    console.log(a+b);
    return;
    console.log(a-b);
}
greet(9, 3); // 12
```



