---
layout: single
title:  "[study] prepend 함수 공부하기 (append, before, after)"
categories: study
tags: [javaScript, blog, study] 
toc : true
author_profile : false 
---

### Prepend
***

#### Prepend함수란?
목적
- 특정 요소의 자식 노드의 맨 앞에 새 노드를 추가할 때 사용

기능
- 기존 자식 노드의 맨 앞에 새 노드를 삽입
- 텍스트 노드 추가 가능
- 하나 이상의 노드 or 문자열을 인자로 받을 수 있음
- 문자열을 전달하면 자동으로 텍스트 노드로 변환

***
#### Prepend함수 사용법

```js
element.prepend(nodesOrStrings);

todoList.prepend(li);
```

> prepend()는 기존 자식 노드를 삭제하지 않고 새로운 노드를 맨 앞에 삽입한다.

***
### 유사 함수 append(), before(), after()
목적
- JavaScript에서 DOM요소에 노드를 삽입할 때 유용한 함수

***
#### append()
기능
- prepend()와 반대되는 개념
- 요소의 자식 노드의 맨 끝에 새로운 노드를 추가
- 텍스트 노드 삽입가능
- 하나 이상의 노드 or 문자열 전달 가능

```js
element.append(nodesOrStrings);
```
***
#### before()
기능
- 선택한 요소 바로 앞에 새로운 노드를 삽입
- 요소의 부모 노드 안에서 동작
- 하나 이상의 노드 or 문자열을 전달할 수 있음

```js
element.before(nodesOrStrings);
```
***
#### after()
기능
- before()와 반대되는 개념
- 선택한 요소 바로 뒤에 새로운 노드를 삽입
- 요소의 부모 노드 안에서 동작
- 하나 이상의 노드 or 문자열을 전달할 수 있음

```js
element.after(nodesOrStrings);
```
***

> append(), before(), after()은 기존 자식 노드를 삭제하지 않고 새로운 노드를 맨 앞에 삽입한다.

***