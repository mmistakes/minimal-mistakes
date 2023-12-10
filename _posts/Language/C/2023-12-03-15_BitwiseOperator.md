---
layout: single
title: Chapter 15 비트 연산자
date: 2023-12-03 11:58:45 +09:00
categories: Language
tags: C
excerpt: 비트 연산자에 관한 글입니다.
toc: true
---

# 1 비트 연산자(bitwise operator)

- 비트 연산자(bitwise operator)

> 비트 연산자(bitwise operator)란 비트(bit) 단위로 논리 연산을 할 때 사용하는 연산자를 의미한다. 

> 또한, 비트 단위로 전체 비트를 왼쪽이나 오른쪽으로 이동시킬 때도 사용한다.

![](https://velog.velcdn.com/images/ecg/post/24c86468-2b2d-41c5-b9c1-5584c59d6ee8/image.png)

> 다음 그림은 비트 AND 연산자(&)의 동작을 나타낸다.            
이처럼 비트 AND 연산자는 대응되는 두 비트가 모두 1일 때만 1을 반환하며,               
다른 경우는 모두 0을 반환한다.

![](https://velog.velcdn.com/images/ecg/post/7cec40d3-b84a-4eb5-81b7-a547f59ea2b4/image.png)

> 다음 그림은 비트 OR 연산자(|)의 동작을 나타낸다.            
이처럼 비트 OR 연산자는 대응되는 두 비트 중 하나라도 1이면 1을 반환하며,              
두 비트가 모두 0일 때만 0을 반환한다.

![](https://velog.velcdn.com/images/ecg/post/8fdf9f18-94e6-48c4-b69a-b50d65b2fe5d/image.png)

> 다음 그림은 비트 XOR 연산자(^)의 동작을 나타낸다.           
이처럼 비트 XOR 연산자는 대응되는 두 비트가 서로 다르면 1을 반환하고,              
서로 같으면 0을 반환한다.

![](https://velog.velcdn.com/images/ecg/post/b18082b3-eeff-4b4a-8c28-8cf88e9ce27f/image.png)

> 다음 그림은 비트 NOT 연산자(~)의 동작을 나타낸다.              
이처럼 비트 NOT 연산자는 해당 비트가 1이면 0을 반환하고, 0이면 1을 반환한다.           

![](https://velog.velcdn.com/images/ecg/post/8872793a-1d5b-4bb6-8bd5-413460192262/image.png)

> 다음 예제는 비트 NOT 연산자(~)와 시프트 연산자(<<, >>)의 예제이다.

- 예제

```c
int num01 = 15; int num02 = 8;  

printf(" ~ 연산자에 의한 결괏값은 %d입니다.\n", ~num01);     // 1의 보수
printf("<< 연산자에 의한 결괏값은 %d입니다.\n", num02 << 1); // 곱하기 2
printf(">> 연산자에 의한 결괏값은 %d입니다.\n", num02 >> 1); // 나누기 2
```

- 실행 결과

```c
 ~ 연산자에 의한 결괏값은 -16입니다.
<< 연산자에 의한 결괏값은 16입니다.
>> 연산자에 의한 결괏값은 4입니다.
```