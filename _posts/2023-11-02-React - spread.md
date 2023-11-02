---
layout: single
title:  "React- spread"
categories: React
tag: [React, spread]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"


---

<br>







# ◆spread

배열이나 문자열과 같이 반복 가능한 문자를 0개 이상의 인수 (함수로 호출할 경우) 또는 요소 (배열 리터럴의 경우)로 확장하여, 0개 이상의 키-값의 쌍으로 객체를 확장시킨다.. 즉, 배열, 문자열, 객체 등을 개별 요소로 분리한다.

<br>



## 1) 배열에서 spread

```react
const array = ["a", "b", "c", "d"]

const good = [...array]

good.push("o")

console.log(array) // ["a", "b", "c", "d"]
console.log(good) // ["a", "b", "c", "d", "o"]
```

good은 array의 아이템들의 나열된 값을 배열에 복사했기 때문에  **array의 원본배열에 영향을 받지않는다.**

<br>







## 2) 객체에서 spread

```react
const human1 = {
  lastName: "kim",
  firstName: "haseong"
};

const human2 = {
  position: "short step"
};


const obj1 = {human1, human2}
const obj2 = {...human1, ...human2}
console.log(obj1); // {human1 : Object, human2 : Object}
conosle.log(obj2); // {lastName: "kim", firstName: "haseong", position: "short step"}
```

스프레드 연산자를 사용해 객체 자체가 아닌 속성을 전개하여 합치니, 두 객체의 속성을 모두 갖는 새 객체 obj2가 탄생했다.
