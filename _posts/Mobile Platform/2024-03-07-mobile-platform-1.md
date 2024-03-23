---
title: "모바일 플랫폼 개요"
excerpt: "모바일 플랫폼 첫 시작"
categories: ['Mobile Platform']
# Cpp / Algorithm / Computer Network / A.I / Database / Mobile Platform / Probability & Statistics
tags: 

toc: true
toc_sticky: true
 
date: 2024-03-07
last_modified_at: 2024-03-07 
---
```dart
// 단일 줄 주석

/*
* 여러 줄 주석 
*/

/// 문서 주석
/// 함수, 매개변수, 리턴값 설명

/** 
* 문서 주석 2
*/
```

```dart
// 타입 추론 변수: 컴파일러가 자동으로 타입을 설정함
// 컴파일시 처음 초기화 된 값이 타입으로 자동 지정됨.
var name = "Bogyeom Kim"; // 컴파일러가 자동으로 name을 String 타입으로 설정함
name = "Bogamie"; // 변수이므로 당연히 값을 바꿀 수 있음
name = 10; // 오류, 한번 선언하면 타입은 변하지 않음

// 런타임시 타입을 지정함
dynamic money = 10000;
money = "Bogamie"; // 정수 타입에서 String 타입으로 변함
money = 3.14; // String 타입에서 실수 타입으로 변함

// 명시적 선언 변수: 개발자가 타입을 선언함
String game = "Minecraft";
int level = 100;
double number = 3.14; // 실수
bool flag = true; // boolean 타입
```

```dart
// 컴파일 시 상수 확정
const nowYear = 2024; // const도 타입 추론 키워드

// 런타임 시 상수 확정
final currentYear = Datetime.now().year;

const lastYear = Datetime.now().year - 1; 
/* 오류, Datetime은 런타임 시에 결정되는 함수인데 
컴파일 시에 확정되는 const에 저장하려고 하니 오류가 남*/

const int year = 2020; // const 키워드도 명시적으로 선언 가능하다.

```


###

```dart

```
&nbsp;&nbsp;

#### $\rightarrow$

```dart

```
```

```