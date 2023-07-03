---
layout: single
title:  "Javscript - split"
categories: javascript
tag: [javascript]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>



# ◆split()함수

-문자열을 잘라서 크기 이하의 배열에 잘라진 문자열을 저장하여 리턴한다.<br/>

-형식 : `` 배열이름.split(separator, limit)`` 



## 1)파라미터를 입력하지 않은 경우

-문자열 전체를 length 1인 배열에 담아서 리턴한다.

```javascript
let names = 'apple banana orange'

let data = names.split();
console.log(data)// ['apple banana orange']
console.log(data.length) // 1
```



## 2)단어별로 배열에 담기

-" "(스페이스)를 지정하면, 문자열을 구분자로 잘라서 각각의 잘라진 조각들을 배열에 저장하여 리턴한다.

```javascript
let names = 'apple banana orange'

let data = names.split(" ");
console.log(data.length) // 3
console.log(data[0]) // apple
console.log(data[3]) // undefined
```



## 3)글자별로 잘라서 배열에 담기

-문자열을 각각의 문자별로 잘라서, 한 글자씩(공백 포함) 배열에 저장하여 리턴한다.

```javascript
let names = 'apple banana orange'

let data = names.split("")
console.log(data.length) // 19
console.log(data[0]) // a
console.log(data[1]) // p
console.log(data[5]) // ""
```



## 4)특정 구분자로 잘라서 배열에 담기

-문자열을 separator로 잘라서 만들어진 조각들을 배열에 담아서 리턴한다.

```javascript
let names = 'apple, banana, orange'

let data = names.split(",")
console.log(data.length) // 3
console.log(data[0]) // apple
console.log(data[1]) // banana
console.log(data[2]) // orange
```



## 5) limt 값 지정하기

-위의 예제에서 문자열을 ','로 자르면 총 3개의 배열이 만들어지지만,  limit 값을 2로 지정하였기 때문에 2개의 배열만 생성된다.

```javascript
let names = 'apple, banana, orange'

let data = names.split(",", 2)
console.log(data.length) // 2
console.log(data[0]) // apple
console.log(data[1]) // banana
console.log(data[2]) // undefined
```

