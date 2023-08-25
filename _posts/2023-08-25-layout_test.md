---
layout: single
title:  "Layout test: collection"
categories: [blog, jekyll]
tag: [blog, jekyll, github]
toc: true
author_profile: false
---

# 레이아웃 테스트입니다.

## layout: collection

### 1. 조건문

조건문은 다양한 조건에 따라 다양한 작업을 수행하는 데 사용됩니다.


- 'if' 문

조건을 테스트하고 조건이 참이면 본문을 실행합니다.
```java
int number = 10;

// Check if the number is positive
if (number > 0) {
    System.out.println("Number is positive");
}

```
- 'if...else' 문

조건을 테스트하고 조건이 true이면 첫 번째 코드 블록을 실행하고, 그렇지 않으면 'else' 블록을 실행합니다.
```java
int number = -10;

if (number > 0) {
    System.out.println("Number is positive");
} else {
    System.out.println("Number is negative or zero");
}

```
- if...else if...else 문

여러 조건을 확인하는 데 사용됩니다.
```Java
int number = 0;

if (number > 0) {
    System.out.println("Number is positive");
} else if (number < 0) {
    System.out.println("Number is negative");
} else {
    System.out.println("Number is zero");
}

```
- 'switch' 문

실행할 많은 코드 블록 중 하나를 선택하는 데 사용됩니다.
```java
int day = 3;

// Print which day of the week it is
switch (day) {
    case 1:
        System.out.println("Sunday");
        break;
    case 2:
        System.out.println("Monday");
        break;
    case 3:
        System.out.println("Tuesday");
        break;
    // ... other days here
    default:
        System.out.println("Invalid day");
}

```
### 2. 루프 문

루프는 코드 블록을 여러 번 실행하는 데 사용됩니다.


- 'for' 루프

지정된 횟수만큼 코드 블록을 반복합니다.
```java
// Print numbers from 1 to 5
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}

```
- 'while' 루프

조건이 true인 동안 루프는 계속 실행됩니다.
```java
int i = 1;

// Print numbers from 1 to 5
while (i <= 5) {
    System.out.println(i);
    i++;  // Don't forget to increase the value of i to avoid infinite loop!
}

```
- do...while 루프

루프는 조건이 true인지 확인하기 전에 코드 블록을 한 번 실행한 다음 조건이 true인 동안 루프를 반복합니다.
```java
int i = 1;

// Print numbers from 1 to 5
do {
    System.out.println(i);
    i++;
} while (i <= 5);

```
- '각각' 루프

향상된 for 루프라고도 하며 주로 배열과 컬렉션을 순회하는 데 사용됩니다.
```java
String[] fruits = {"Apple", "Banana", "Cherry"};

// Print all the fruits in the array
for (String fruit : fruits) {
    System.out.println(fruit);
}

```

- 예제가 초보자가 java에서 조건문 및 루프문을 사용하는 방법을 명확히 하는 데 도움이 되기를 바랍니다. 학습하는 가장 좋은 방법은 연습이라는 것을 기억하세요!
