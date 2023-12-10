---
layout: single
title: Chapter 14 논리 연산자
date: 2023-12-03 11:58:35 +09:00
categories: Language
tags: C
excerpt: 논리 연산자에 관한 글입니다.
toc: true
---

# 1 논리 연산자(logical operator)

- 논리 연산자(logical operator)

> 논리 연산자(logical operator)란 주어진 논리식을 판단하여, 참(true)과 거짓(false)을 결정하는 연산자를 의미한다.

> AND 연산과 OR 연산은 두 개의 피연산자를 가지는 이항 연산자이며,          
피연산자들의 결합 방향은 왼쪽에서 오른쪽이다.          
NOT 연산자는 피연산자가 단 하나뿐인 단항 연산자이며,             
피연산자의 결합 방향은 오른쪽에서 왼쪽이다.          

![](https://velog.velcdn.com/images/ecg/post/4a5a994c-e71e-4366-a9bc-4febee2b452a/image.png)

> C언어에서 거짓(false)은 0이며, 0이 아닌 모든 것은 참(true)으로 인식된다.

> 다음은 논리 연산자의 모든 동작의 결과를 보여주는 진리표(truth table)이다.

![](https://velog.velcdn.com/images/ecg/post/4111ff52-cf54-4b52-8edb-159ad319ec0d/image.png)

- 예제

```c
int num01 = 3;
int num02 = -7;
int result01, result02;  

result01 = (num01 > 0) && (num01 < 5);
result02 = (num02 < 0) || (num02 > 10);  

printf("&& 연산자에 의한 결괏값은 %d입니다.\n", result01);
printf("|| 연산자에 의한 결괏값은 %d입니다.\n", result02);
printf(" ! 연산자에 의한 결괏값은 %d입니다.\n", !result02);
```

- 실행 결과

```c
&& 연산자에 의한 결괏값은 1입니다.
|| 연산자에 의한 결괏값은 1입니다.
 ! 연산자에 의한 결괏값은 0입니다.
```

> 컴퓨터에서 참(true)은 보통 1로 표현되고, 거짓(false)은 0으로 표현된다.             
하지만 C언어에서는 음수를 포함해 0이 아닌 모든 수가 참(true)으로 취급된다.

