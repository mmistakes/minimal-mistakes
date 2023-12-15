---
layout: single
title: Chapter 10 산술 연산자
date: 2023-12-03 11:58:02 +09:00
categories: Language
tags: C
excerpt: 산술 연산자에 관한 글입니다.
toc: true
---

# 1 연산자(operator)

- 연산자(operator)

> 연산자(operator)란 프로그램의 산술식이나 연산식을            
표현하고 처리하기 위해 제공되는 다양한 기호를 의미한다.

> C 언어에서는 여러 종류의 연산을 위해 다양한 연산자를 제공하고 있다.

## 1.1 산술 연산자(arithmetic operator)

- 산술 연산자(arithmetic operator)

> 산술 연산자(arithmetic operator)란 사칙연산을 다루는 기본적이면서도 가장 많이 사용되는 연산자를 의미한다.

> 산술 연산자는 모두 두 개의 피연산자를 가지는 이항 연산자이며,             
피연산자들의 결합 방향은 왼쪽에서 오른쪽이다.

- 항

> 항이란 해당 연산의 실행이 가능하기 위해 필요한 값이나 변수를 의미한다.             
따라서 이항 연산자란 해당 연산의 실행을 위해서             
두 개의 값이나 변수가 필요한 연산자를 의미한다.

![](https://velog.velcdn.com/images/ecg/post/8e54c925-26b2-400a-b914-a5dd0280d238/image.png)

- 예제

```c
int num01 = 10;
int num02 = 4;  

printf("+ 연산자에 의한 결괏값은 %d입니다.\n", num01 + num02);
printf("- 연산자에 의한 결괏값은 %d입니다.\n", num01 - num02);
printf("* 연산자에 의한 결괏값은 %d입니다.\n", num01 * num02);
printf("/ 연산자에 의한 결괏값은 %d입니다.\n", num01 / num02);
printf("% 연산자에 의한 결괏값은 %d입니다.\n", num01 % num02);
```

- 실행 결과

```c
+ 연산자에 의한 결괏값은 14입니다.
- 연산자에 의한 결괏값은 6입니다.
* 연산자에 의한 결괏값은 40입니다.
/ 연산자에 의한 결괏값은 2입니다.
% 연산자에 의한 결괏값은 2입니다.
```

## 1.2 연산자의 우선순위(operator precedence)와 결합 방향(associativity)

> 연산자의 우선순위는 수식 내에 여러 연산자가 함께 등장할 때,                  
어느 연산자가 먼저 처리될 것인가를 결정한다.            

> 다음 그림은 가장 높은 우선순위를 가지고 있는                  
괄호(()) 연산자를 사용하여 연산자의 처리 순서를 변경하는 것을 보여준다.             

![](https://velog.velcdn.com/images/ecg/post/a43c5d73-8507-4abb-bc7c-749e8bbcc0d6/image.png)
 
> 연산자의 결합 방향은 수식 내에 우선순위가 같은 연산자가 둘 이상 있을 때,        
먼저 어느 연산을 수행할 것인가를 결정한다.

![](https://velog.velcdn.com/images/ecg/post/480e8a55-87ff-484a-9b39-384f0364c058/image.png)

## 1.3 C 언어 연산자의 우선순위

> C 언어에서 연산자의 우선순위와 결합 방향은 다음과 같다.

- 1순위

![](https://velog.velcdn.com/images/ecg/post/2ec55668-2e92-435d-aa01-dac622419564/image.png)

- 2순위

![](https://velog.velcdn.com/images/ecg/post/1d9517d0-4cfb-42ed-aaa6-e8addbecf2ba/image.png)

- 3 ~ 7 순위

![](https://velog.velcdn.com/images/ecg/post/9e035a21-123c-4858-9ace-a9d5cc1198c1/image.png)

- 8 ~ 15 순위

![](https://velog.velcdn.com/images/ecg/post/3f43f584-f53a-4a89-998f-f4477d4a79c6/image.png)

> 위의 표에서 나온 순서대로 우선순위가 빠른 연산자가 가장 먼저 실행된다.           
또한, 같은 우선순위를 가지는 연산자가 둘 이상 있을 때에는                
결합 순서에 따라 실행 순서가 결정된다.

