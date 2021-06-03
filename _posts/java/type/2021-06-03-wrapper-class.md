---
title: \[JAVA\] Wrapper class 에 대한 짧은 정리

categories: 
   - java

tags:
   - java
   - wrapper class
   

last_modified_at: 2021-06-03 18:31:32.71 

---

프로그래밍을 하다 보면 기본 타입의 데이터를 객체로 표현해야 하는 경우가 종종 있습니다. 이럴 때에 기본 자료타입(primitive type)을 객체로 다루기 위해서 사용하는 클래스들을 래퍼 클래스(wrapper class)라고 합니다.

## 예시

예로, int → Integer가 있을 수 있습니다.

이는 제너릭 등의 class로 표현되야 할 때 등 다양하게 사용될 수 있습니다.

간단하게, 기본 타입은 null이 불가능합니다. 하지만 객체의 경우 null이 가능합니다.

즉, nullable한 상황에서는 wrapper class를 아닌 경우는 기본타입을 사용하시면 됩니다.

## 주의사항
wrapper class는 기본적으로 객체이기 때문에 == 비교 연산자는 객체 주소를 참조하기 때문에 원하는 비교 연산을 할 수 없고, equals 메소드를 사용하셔야 합니다.

<, > 연산자는 사용이 가능합니다.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjAyMDA0Mjg4OF19
-->