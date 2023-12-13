---
layout: single
title: Chapter 39 구조체의 기본
date: 2023-12-04 19:01:09 +09:00
categories:
  - Language
tags:
  - C
excerpt: 구조체의 기본에 관한 글입니다.
toc: true
---

# 1 구조체(structure type)

- 구조체(structure type)

>구조체(structure type)란 사용자가 C 언어의 기본 타입을 가지고    
>새롭게 정의할 수 있는 사용자 정의 타입을 의미한다.

>구조체는 기본 타입만으로는 나타낼 수 없는 복잡한 데이터를 표현할 수 있다.

>배열이 같은 타입의 변수 집합이라고 한다면,     
>구조체는 다양한 타입의 변수 집합을 하나의 타입으로 나타낸 것이다.      
이때 구조체를 구성하는 변수를            
구조체의 멤버(member) 또는 멤버 변수(member variable)라고 한다.

---

## 1.1 구조체의 정의와 선언

>C 언어에서 구조체는 struct 키워드를 사용하여 다음과 같이 정의한다.

- 문법

```c
struct 구조체이름
{
    멤버변수1의타입 멤버변수1의이름;
    멤버변수2의타입 멤버변수2의이름;
    ...  
};
```

>다음은 book이라는 이름의 구조체를 정의하는 그림이다.

![image](https://github.com/EunChong999/EunChong999/assets/136239807/18e39362-0630-4c39-9ff0-8a63445dae60)

