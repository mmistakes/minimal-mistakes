---
layout: single
title:  "Javscript - ES6문법"
categories: javascript
tag: [javascript, arrary, function, 객체]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





# ◆ES6문법



## 1)객체 초기화 방법

-변수와 객체의 키값을 동일하게 지정해 주는 경우, 키값을 생략할 수 있다. 

```javascript
let name ="혜진"
let age = 25
let person = {name, age}
console.log(person.name) // "혜진"
```





## 2)객체를 분해하는 방법(Destructuring)

-객체에 있는 값을 꺼내서 변수로 사용할 수 있다.(키값과 새로 지정한 변수의 이름이 같은 경우에만 사용 가능)

```javascript
let bts = {name : "방탄소년단", num : 7}

let name = bts.name
let num = bts.num

console.log(name, num) // 방탄소년단 7
```

```javascript
let bts = {name : "방탄소년단", num : 7}

let {name, num} = bts

console.log(name, num) // 방탄소년단 7
```





## 3) Template Literal 사용법

-벡틱(``)안에 문장을 넣고 변동되는 변수는 ${}안에 작성해 준다.

```javascript
let name ="황혜진"
let age = 25

//기존방식
console.log("제 이름은"+name+"입니다. 제 나이는"+age+"입니다.")

//새로운 방식
console.log(`제 이름은 ${name}입니다. 제 나이는 ${age}입니다.`)
```





## 4)배열 값 꺼내서 변수로 지정하고 싶은 경우

```javascript
let array =[1,2,3]

//기존방식
let a = array[0]
let b = array[1]
let c = array[2]
console.log(a,b,c)

//새로운 방식
let [a,b,c] = array
console.log(a,b,c) // 1,2,3
```





## 5)spread 연산자

-배열값 중 원하는 값만 변수지정 하고 싶은 경우<br/>-이때 "...rest"는 원하는 이름으로 지정 가능

```javascript
//예제1)
let array =[1,2,3]

let [a,...rest] =array
console.log(a) // 1
console.log(rest) // [2,3]

//예제2) 배열에 건너뛰고 싶은 부분이 있으면 , 을 통해 그 자리를 비울 수 있다.
function getNumber(){
    let array = [1,2,3,4,5,6]
    let [first,,third,forth] = array
    return {first,third,forth}
}
console.log(getNumber()) //  결과값 { first: 1, third: 3, forth: 4 }
```





## 6)concat함수

-변수의 값들을 하나의 배열로 합치는 방법이다.

```javascript
//예제1)
let a = [1,2]
let b = [3,4]
let c = [5,6]

let result = a.concat(b,c) // 같은 값 [...a,...b,...c]
console.log(result) //[1, 2, 3, 4, 5, 6]
console.log(...a,...b,...c) //1, 2, 3, 4, 5, 6
```





## 7)화살표 함수

-변수안에 함수를 넣어주는 방식(단, 함수에 문장이 여러개 들어가는 경우는 제외)<br/>-항상 익명이며 this, arguments, super을 바인딩 하지 않는다.<br/>-화살표함수의 경우 반드시 선언과 정의 후에 불러줘야 한다.<br/>- function은 "=>"  으로 대체함.<br/> -return 생략가능

```javascript
//기존방식
function foo(){
    console.log("hello")
}

function foo(){
    retrun "haha"
}

//새로운 방식
let foo = ()=>{
    console.log("hello")
}

let foo = ()=> "haha"
```





## 8)this 함수

-함수를 부르는 객체가 this가 된다.<br/>

```javascript
let age = 17
let person = {
    name : "혜진",
    age : 25,
    getInfo : function(){
        console.log(age)
    }
}
console.log(person.getInfo()) // 17 (전역변수의 age 17의 값이 출력된다.)


let age = 17
let person = {
    name : "혜진",
    age : 25,
    getInfo : function(){
        console.log(this.age)
    }
}
console.log(person.getInfo()) // 25 (this는 ({name : "혜진",age : 25,getInfo : function(){console.log(this.age)})을 가르키기 때문에 person의 age 25의 값이 출력된다.)
```

<br/>





# ◆ES6 문법의 배열함수

```javascript
//예제
let names = ["hyejin", "Elon Musk", "Jeff Bezos", "Larry page"]

let person =[{name : "혜진", age : 12}, {name : "철수", age :14}]

let names = [ "Steven Paul Jobs", "Bill Gates", "Mark Elliot Zuckerberg"]
```



## 1)forEach

-반환값이 없고 단순 for문과 같이 작동한다.<br/>

-형식 :``배열이름.forEach(()=>{});`` 

```javascript
name.forEach((item) => { console.log(itme) }); // "hyejin", "Elon Musk", "Jeff Bezos", "Larry page"
```



## 2)map

-반환값을 배열에 담아서 리턴해주기 때문에 retrun값을 지정해주어야 한다.<br/>-배열에 특정 객체만 출력하고 싶을 경우 사용한다.<br/>

-형식 : ``let 변수이름 = 배열이름.map(()=>{return})``

```javascript
let data = name.map((item)=>{return item}); // ["hyejin", "Elon Musk", "Jeff Bezos", "Larry page"]
let data = person.map((item)=>{return item.age}) // [12, 14]
let data = names.map((item)=>{return item.split(" ")[0]}) // [“Steven”,“Bill”,“Mark”]
```



## 3)filter

-조건에 충족하는(true) 아이템만 배열에 담아 반환한다.<br/>-반환값은 배열에 담아 출력하며 ``find``함수와 다르게 조건에 충족하는 모든 데이터를 출력한다.<br/>

-형식 : ``let 변수이름 = 배열이름.filter(()=>{return 조건문})``

```javascript
let data = person.filter((item)=>{return item.age <=12}) // [{name: '혜진', age: 12}]
```



## 4)some

-조건에 충족하는 아이템이 하나라도 있으면 true반환, 아니면 false<br/> *startsWith("L") : "L"로 시작하는 단어를 출력함.<br/>

-형식 : ``let 변수이름 = 배열이름.some(()=>{return 조건문})``

```javascript
let data = name.some((item)=>{return item.startsWith("L")}) // true
```



## 5)every

-모든 배열에 아이템이 조건을 충족하면 true반환, 아니면 false<br/>

-형식 : ``let 변수이름 = 배열이름.every(()=>{return 조건문})``

```javascript
let data = name.every((item)=>{return item.startsWith("L")}) // false
```



## 6)find

-조건에 충족하는 아이템 하나만 반환(여러개라면 첫번째것만 반환)<br/>-반환값은 string 형태로 출력된다.<br/>

-형식 :``let 변수이름 = 배열이름.find(()=>{return 조건문})``

```javascript
let data = name.find((item)=>{return item.startsWith("L")}) // Larry page
```



## 7)findIndex

-조건에 충족하는 아이템의 인덱스값 반환(여러개라면 첫번째 아이템의 인덱스 번호만 반환)<br/>

 -형식 : ``let 변수이름 = 배열이름.findIndex(()=>{return 조건문})``

```javascript
let data = name.findIndex((item)=>{return item.startsWith("L")}) // 3
```

