---
layout: single
title:  "[study] LocalStorage 공부하기"
categories: study
tags: [javaScript, blog, study] 
toc : true
author_profile : false 
---

### LocalStorage
***
#### LocalStorage란?

기능
- 브라우저에서 제공하는 웹 저장소
- 브라우저를 닫아도 데이터가 유지됨
- 최대 약 5MB까지 저장 가능
- 문자열만 저장 가능

목적
- 키-값 쌍을 저장하고 불러오는 데 사용

***
### LocalStorage 사용법

#### 데이터 저장

-  setItem()

> setItem(key, value);
```js
localStorage.setItem('username', 'John');
localStorage.setItem('theme', 'bright');
```

***
#### 데이터 불러오기
- getItem()
> getItem(key);
```js
const username = localStorage.getItem('username');
console.log(username); // "John"
```

***
#### 데이터 삭제
- removeItem()
> removeItem(key);
```js
localStorage.removeItem('username');
```
- clear()
> clear();
```js
localStorage.clear();
```

***

### JSON
#### JSON(JavaScript Object Notation)이란?

기능 
- 모든 데이터는 텍스트 기반
- 데이터를 키-값 쌍으로 저장
- 문자열, 숫자, 배열, 객체, 불리언, null을 지원

목적
- API 데이터 전송: 서버와 클라이언트 간 데이터를 주고받을 때 사용
- 설정 파일: package.json과 같은 설정 파일
- 데이터 저장: 간단한 데이터를 저장하고 불러올 때 활용 (예: LocalStorage)

***

### JSON 사용법

#### 데이터 저장
- 객체(Object)
```js
{
  "name": "Alice",
  "age": 25,
  "city": "Seoul"
}
```

- 배열(Array)
```js
[
  "apple",
  "banana",
  "cherry"
]
```

- 중첩된 구조
```js
{
  "user": {
    "name": "Bob",
    "skills": ["JavaScript", "Python", "HTML"]
  }
}
```

***

### JSON과 JavaScript

#### JavaScript에서 JSON 사용

- 객체를 JSON문자열로 변환

**객체를 문자열로 변환해 저장**

> stringify();

```js
const user = { name: "Alice", age: 25 };

localStorage.setItem('user', JSON.stringify(user));
```

***


- JSON문자열을 객체로 변환

**문자열을 객체로 변환해 불러오기**

> parse();

```js
const userData = localStorage.getItem('user');

const user = JSON.parse(userData);
console.log(user.name); // "Alice"
```

***
