---
layout: single
title: Chapter 13 비교 연산자
date: 2023-12-03 11:58:29 +09:00
categories: Language
tags: C
excerpt: 비교 연산자에 관한 글입니다.
toc: true
---

# 1 비교 연산자(comparison operator)

- 비교 연산자(comparison operator)

> 비교 연산자(comparison operator)란 피연산자 사이의 상대적인 크기를 판단하는 연산자를 의미한다.

> 비교 연산자는 왼쪽의 피연산자와 오른쪽의 피연산자를 비교하여,           
어느 쪽이 더 큰지, 작은지, 또는 서로 같은지를 판단한다.          
> 비교 연산자는 모두 두 개의 피연산자를 가지는 이항 연산자이며,             
피연산자들의 결합 방향은 왼쪽에서 오른쪽이다.          

![](https://velog.velcdn.com/images/ecg/post/6f4f904d-d9d2-4c49-8e0a-e44d39a726ba/image.png)

> C 언어에서 거짓(false)은 0이며, 0이 아닌 모든 것은 참(true)으로 인식된다.

- 예제

```c
int num01 = 3;
int num02 = 7;  

printf("== 연산자에 의한 결괏값은 %d입니다.\n", num01 == num02);
printf("<= 연산자에 의한 결괏값은 %d입니다.\n", num01 <= num02);  
```

- 실행 결과

```c
== 연산자에 의한 결괏값은 0입니다.
<= 연산자에 의한 결괏값은 1입니다.
```
