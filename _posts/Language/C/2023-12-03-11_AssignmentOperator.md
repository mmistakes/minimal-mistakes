---
layout: single
title: Chapter 11 대입 연산자
date: 2023-12-03 11:58:07 +09:00
categories: Language
tags: C
excerpt: 대입 연산자에 관한 글입니다.
toc: true
---

# 1 대입 연산자(assignment operator)

- 대입 연산자(assignment operator)

> 대입 연산자(assignment operator)란 변수에 값을 대입할 때 사용하는 이항 연산자를 의미한다.

> 피연산자들의 결합 방향은 오른쪽에서 왼쪽이다.             
또한, 산술 연산자와 결합한 다양한 복합 대입 연산자가 존재한다.

![](https://velog.velcdn.com/images/ecg/post/261fda28-96ee-4f71-9bf9-5c9695e2ab99/image.png)

- 예제

```c
int num01 = 7;
int num02 = 7;
int num03 = 7;  

num01 = num01 - 5;
num02 -= 5;
num03 =- 5;  

printf("- 연산자에 의한 결괏값은 %d입니다.\n", num01);
printf("-= 연산자에 의한 결괏값은 %d입니다.\n", num02);
printf("=- 연산자에 의한 결괏값은 %d입니다.\n", num03);  
```

- 실행 결과

```c
-  연산자에 의한 결괏값은 2입니다.
-= 연산자에 의한 결괏값은 2입니다.
=- 연산자에 의한 결괏값은 -5입니다.
```

> 위의 예제에서 num03 =- 5 연산은 단순히 -5를 변수 num03에 대입(=)하는 연산이 되었다.             
이처럼 복합 대입 연산자에서 연산자의 순서는 매우 중요하다.
