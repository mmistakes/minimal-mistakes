---
layout: single
title: "[Scanner] hasNextInt(), hasNext(), nextInt(), next()"
categories: JAVA
tag: [JAVA, Scanner, TIL]
toc: true
toc_sticky: true
toc_label: 🦗목차
---

## 🌼TIL 개요
Java에서 hasNextInt(), hasNext(), nextInt(), next()는 java.util.Scanner 클래스의 메소드입니다. Scanner 클래스는 입력 스트림에서 토큰을 읽어오는 기능을 제공합니다.


## 🍏 hasNextInt(), hasNext(), nextInt(), next()
- hasNextInt()
  : 입력 스트림에서 다음 토큰이 정수인지 여부를 검사
  : 다음 토큰이 정수인 경우 true를 반환하고, 그렇지 않은 경우 false를 반환
  
- hasNext()
  : 입력 스트림에서 다음 토큰이 있으면 true를 반환 
  : 그렇지 않으면 false를 반환
  
- nextInt(): 
  : 입력 스트림에서 다음 토큰을 읽어와 정수로 변환한 후 반환
  : 입력 스트림에서 다음 토큰이 정수가 아닌 경우 InputMismatchException을 발생
  
- next()
  : 입력 스트림에서 다음 토큰을 읽어와 문자열로 반환


## 🍎 hasNextInt() 더 알아보기
이 메서드는 다음과 같이 사용됩니다.

~~~java
Scanner scanner = new Scanner(System.in);
if (scanner.hasNextInt()) {
    int num = scanner.nextInt();
    // 입력된 값이 정수일 때 수행할 코드
} else {
    // 입력된 값이 정수가 아닐 때 수행할 코드
}

~~~

위 코드에서 Scanner 클래스의 hasNextInt() 메서드는 다음 입력이 정수인지 여부를 확인하고, 그 결과에 따라 if-else 문을 통해 처리를 분기합니다. 입력이 정수일 경우에는 nextInt() 메서드를 호출하여 정수를 읽어들이고, 이 값을 이용하여 원하는 로직을 수행할 수 있습니다.


## 🌼정리
즉, hasNextInt()는 다음 토큰이 정수인지 여부를 검사하고, hasNext()는 다음 토큰이 있는지 여부를 검사합니다. nextInt()는 다음 토큰을 읽어와 정수로 변환한 후 반환하며, next()는 다음 토큰을 문자열로 반환합니다.

참고로, 입력 스트림은 콘솔, 파일 등 다양한 소스에서 데이터를 읽어올 수 있습니다.
