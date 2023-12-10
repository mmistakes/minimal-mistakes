---
layout: single
title: Chapter 12 증감 연산자
date: 2023-12-03 11:58:18 +09:00
categories: Language
tags: C
excerpt: 증감 연산자에 관한 글입니다.
toc: true
---

# 1 증감 연산자(increment and decrement operator)

- 증감 연산자(increment and decrement operator)

> 증감 연산자(increment and decrement operator)란 피연산자를 1씩 증가 혹은 1씩 감소시킬 때 사용하는 연산자를 의미한다.

> 이 연산자는 피연산자가 단 하나뿐인 단항 연산자이다.

> 증감 연산자는 해당 연산자가 피연산자의 어느 쪽에                  
위치하는가에 따라 연산의 순서 및 결과가 달라진다.

![](https://velog.velcdn.com/images/ecg/post/76c0c662-330b-43cb-9c15-5f7957b888ef/image.png)

- 예제

```c
int num01 = 7;
int num02 = 7;
int result01, result02;  

result01 = (++num01) - 5;
result02 = (num02++) - 5; 

printf("전위 증가 연산자에 의한 결괏값은 %d이고, 변수의 값은 %d로 변했습니다.\n", result01, num01);
printf("후위 증가 연산자에 의한 결괏값은 %d이고, 변수의 값은 %d로 변했습니다.\n", result02, num02);
```

- 실행 결과

```c
전위 증가 연산자에 의한 결괏값은 3이고, 변수의 값은 8로 변했습니다.
후위 증가 연산자에 의한 결괏값은 2이고, 변수의 값은 8로 변했습니다.
```

> 위의 예제에서 첫 번째 연산은 변수 num01의 값을 먼저 1 증가시킨 후에 나머지 연산을 수행한다.     
하지만 두 번째 연산에서는 먼저 모든 연산을 마친 후에 변수 num02의 값을 1 증가시킨다.      
따라서 변수 num02의 증가는 관련된 연산에 아무런 영향도 미치지 않는다.          

## 1.1 증감 연산자의 연산 순서

> 증감 연산자는 피연산자의 어느 쪽에 위치하는가에 따라 연산의 순서가 달라진다.

> 다음 예제는 증감 연산자의 연산 순서를 살펴보기 위한 예제이다.

- 예제

```c
int x = 10;
int y = x-- + 5 + --x;

printf("변수 x의 값은 %d이고, 변수 y의 값은 %d입니다.\n", x, y);
```

- 실행 결과

```c
변수 x의 값은 8이고, 변수 y의 값은 23입니다.
```

> 다음 그림은 위의 예제에서 수행되는 연산의 순서를 보여준다.

![](https://velog.velcdn.com/images/ecg/post/657bb35d-f99c-44d6-b90f-8bc2fba1efb3/image.png)

① : 첫 번째 감소 연산자(decrement operator)는 피연산자의 뒤쪽에 위치하므로,           
덧셈 연산이 먼저 수행된다.

② : 덧셈 연산이 수행된 후에 감소 연산이 수행된다. (x의 값 : 9)

③ : 두 번째 감소 연산자는 피연산자의 앞쪽에 위치하므로, 덧셈 연산보다 먼저 수행된다. (x의 값 : 8)

④ : 감소 연산이 수행된 후에 덧셈 연산이 수행된다.

⑤ : 마지막으로 변수 y에 결괏값의 대입 연산이 수행된다. (y의 값 : 23)


