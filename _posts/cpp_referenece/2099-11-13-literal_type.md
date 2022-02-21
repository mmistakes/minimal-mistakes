---
published: true
layout: single
title: "C++ 리터럴 타입"
category: cppreference
tags:
comments: true
sidebar:
  nav: "mainMenu"
---  
* * *

- void 형
- 스칼라 타입 (char, int, bool, long, float, double) 등등
- 레퍼런스 타입
- 리터럴 타입의 배열
- 혹은 아래 조건들을 만족하는 타입
    - 디폴트 소멸자를 가지고 다음 중 하나를 만족하는 타입
        - 람다 함수
        - Arggregate 타입 ex) std::pair  
        (사용자 정의 생성자, 소멸자가 없으며 모든 데이터 멤버들이 public)
        - constexpr 생성자를 가지며 복사 및 이동 생성자가 없음

#### Reference 
***
- ***<https://modoocode.com/293>***