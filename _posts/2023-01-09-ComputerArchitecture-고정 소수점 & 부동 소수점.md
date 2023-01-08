---
published: true
title: '2023-01-09-ComputerArchitecture-고정 소수점 & 부동 소수점'
categories:
  - ComputerArchitecture
tags:
  - ComputerArchitecture
toc: true
toc_sticky: true
toc_label: 'ComputerArchitecture'
---

컴퓨터에서 실수를 표현하는 방법은 **고정 소수점**과 부동 소수점 두 가지 방식이 존재한다.

<br>

### **1. 고정 소수점**

> 소수점이 찍힐 위치를 미리 정해놓고 소수를 표현하는 방식<br>

```
-3.141592는 부호(-)와 정수부(3), 소수부(0.141592) 3가지 요소 필요함
```

![image](https://raw.githubusercontent.com/222SeungHyun/222SeungHyun.github.io/c69c8ecb97eb84a8768007d0977d507d038ee892/_images/%EA%B3%A0%EC%A0%95%20%EC%86%8C%EC%88%98%EC%A0%90%20%EB%B0%A9%EC%8B%9D.png)

**장점**: 실수를 정수보와 소수부로 표현하여 단순하다.

<br>

**단점**: 표현의 범위가 너무 적어서 활용하기 힘들다.(정수부는 15bit, 소수부는 16bit)

### **2. 부동 소수점**

> 실수를 가수부 + 지수부로 표현한다.<br>
>
> - 가수: 실수의 실제값 표현 -지수: 크기를 표현함. 가수의 어디쯤에 소수점이 있는지 나타냄

**지수의 값에 따라 소수점이 움직이는 방식**을 활용한 실수 표현 방법이다.<br>
즉, 소수점의 위치가 고정되어 있지 않다.

![image](https://camo.githubusercontent.com/3f982c8c64e1f5bf0837e08593c05b45dfce1c9a2bf53fc31e2cbec3d2caf9ea/687474703a2f2f7463707363686f6f6c2e636f6d2f6c656374757265732f696d675f635f666c6f6174696e675f706f696e745f33322e706e67)

**장점**: 표현할 수 있는 수의 범위가 넓어진다.(현재 대부분 시스템에서 활용 중)

<br>

**단점**: 오차가 발생할 수 있다.(부동소수점으로 표현할 수 있는 방법이 매우 다양함)
