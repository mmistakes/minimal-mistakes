---
layout: single
title: 자료구조
categories: dataStructure
toc: true
author_profile: false
sidebar:
    nav: "docs"
search: ture
---

# 자료구조 - Stack

## 구조

- 나중에 쌓은 데이터를 먼저 빼닐 수 있는 구조를 가진 자료구조, 쌓아놓은 책을 생각하면 된다
- LIFO : Last In, First Out
- 컴퓨터 내부의 프로세스 구조의 함수 동작 방식
  - 기능
    - push : 스택에 데이터 삽입
    - pop : 스텍에서 데이터를 꺼내기
  - 장점/단점
    - 장점
      1. 구조가 단순, 구현이 쉬움
      2. 저장/읽기 속도가 빠름
    - 단점
      1. 데이터의 최대 갯수를 정해야 한다
      2. 저장 공간 낭비가 있음

```java
Stack<Integer> stack = new Stack<>();

//삽입
stack.push(1);
stack.push(2);
stack.push(3);

//출력 및 삭제
System.out.println(stack.pop()); //3
System.out.println(stack.pop()); //2
```

# 프로그래밍 연습

## arrayList로 stack 구현해보기

