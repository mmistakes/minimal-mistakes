---
layout: single
title: "[입출력] BufferedReader vs Scanner"
categories: blog
tag: [JAVA, 코딩, TIL]
toc: true
toc_sticky: true
toc_label: 🦗목차
---

## 🌼TIL 개요
BufferedReader와 Scanner는 Java에서 입력 스트림에서 데이터를 읽는 데 사용되는 두 가지 클래스입니다. 그러나 각각의 클래스는 사용 방법과 목적이 다릅니다.

## 🍏 BufferedReader

BufferedReader는 입력 스트림에서 문자열을 읽어들이는 데에 사용됩니다. 데이터를 한 번에 읽고 저장하며, 버퍼링이 되기 때문에 매우 빠른 속도로 데이터를 읽어올 수 있습니다. 이 클래스는 기본적으로 문자 입력 스트림을 처리하기 때문에, 문자열을 읽는 데에 효과적입니다.

아래는 BufferedReader로 입력 받는 간단한 코드 예시입니다.

![image](https://user-images.githubusercontent.com/126564770/222965940-0080bd01-146d-452d-8bb8-fa34b5df0245.png)

위 예제에서는 BufferedReader를 사용하여 표준 입력에서 사용자 이름과 나이를 읽어들이고, 이를 출력합니다.

## 🍎 Scanner

Scanner는 BufferedReader와 마찬가지로 입력 스트림에서 데이터를 읽는 데 사용됩니다. 그러나 Scanner는 정규 표현식을 사용하여 토큰을 구분하기 때문에, 문자열, 숫자, 불리언 값 등 다양한 유형의 데이터를 처리할 수 있습니다.

아래는 Scanner를 사용하여 입력 받는 간단한 코드 예시입니다.

![image](https://user-images.githubusercontent.com/126564770/222965925-3135d5cf-da87-496b-bddd-47f563b1c1a7.png)

위 예제에서는 Scanner를 사용하여 표준 입력에서 사용자 이름과 나이를 읽어들이고, 이를 출력합니다.

## 🍊BufferedReader VS Scanner

BufferedReader와 Scanner는 각각의 장단점이 있습니다.


## 🍏BufferedReader의 장점:
BufferedReader는 데이터를 더 빠르게 읽을 수 있습니다.
문자열만 처리하기 때문에, 불필요한 파싱 작업이 없습니다.


## 🍎Scanner의 장점:
 Scanner는 정규 표현식을 사용하여 토큰을 분리할 수 있기 때문에, 다양한 유형의 데이터를 처리할 수 있습니다.
Scanner는 기본형 데이터 형식을 지원하기 때문에, parseInt()나 parseDouble() 등을 사용하여 타입 변환을 할 필요가 없습니다.


단점으로는, BufferedReader는 BufferedReader#readLine()이 반환하는 값이 문자열이며, Scanner는 다양한 타입으로 파싱 가능하기 때문에 잘못된 입력을 처리하기 어려울 수 있습니다.
