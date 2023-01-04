---
layout: single
title: "Using if statement and for loop in JS"
categories: JavaScript
tag: JavaScript
author_profile: false
sidebar:
    nav: "docs"
---

## How to write and use if statement and for loop in JavaScript

Today I learned how to write if statement and for loop through JavaScript. 
The format was slightly different, but I already had some knowledge on the logistics of if statement and for loop, so it was easy to get used to those.

### If statement codes

I learned and tried some operands to be able to write if statements:

```js
1+1
// 2
1+"1"
// '11'
1-"1"
// 0
"123" == 123
// true
"123" === 123
// false
true && true
// true       && => and
true && false
// false
false || true
// true       || => or
!false
// true        ! => not
```

With these operands, I practiced writing function using if statement:
```js
const profile = {
    name: "철수",
    age: 12,
    school: "다람쥐초등학교"
}

function ageDetect(P) {
    if (P.age >= 20) {
        console.log("성인입니다")
    } else if (P.age >= 8) {
        console.log("학생입니다")
    } else if (P.age > 0) {
        console.log("어린이입니다")
    } else {
        console.log("잘못 입력하셨습니다")
    }
}

ageDetect(profile)
// VM2138:5 학생입니다      <= what the console printed out
```

### For loop codes

For for loop, I practiced by using the fruits list I used before:
```js
const fruits = [
    {number: 1, title: "레드향"},
    {number: 2, title: "샤인머스캣"},
    {number: 3, title: "산청딸기"},
    {number: 4, title: "한라봉"},
    {number: 5, title: "사과"},
    {number: 6, title: "애플망고"},
    {number: 7, title: "딸기"},
    {number: 8, title: "천혜향"},
    {number: 9, title: "과일선물세트"},
    {number: 10, title: "귤"},
    ]

for (let i = 0; i < fruits.length; i++) {
    console.log(`${fruits[i].number} ${fruits[i].title}`)
}
// VM3644:2 1 레드향        <= from here is what the console printed out 
// VM3644:2 2 샤인머스캣
// VM3644:2 3 산청딸기
// VM3644:2 4 한라봉
// VM3644:2 5 사과
// VM3644:2 6 애플망고
// VM3644:2 7 딸기
// VM3644:2 8 천혜향
// VM3644:2 9 과일선물세트
// VM3644:2 10 귤
```

I kept on making little mistakes such as not closing the parenthesis for if statement, but I am getting used to the format pretty quickly.
