---
title: "Java - Practice4 - question1"
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: "Java"
---

# 문제 1

다음 그림은 비트 연산자를 활용한 코드의 일부분이다.

```java
c = -1; d = -1;

System.out.println("c >>> 2 = " + (c >>> 2));
System.out.println("d >>> 2 = " + (d >>> 2));
```

이 코드의 실행결과는 다음과 같다.

```java
c >>> 2 = 1073741823
d >>> 2 = 4611686018427387903
```

왜 이러한 결과가 나오게 되었는지 상세히 설명하세요  
<br>

> **Answer**

64bit 운영체제에서 int형은 32bit, long형은 64bit로 표현된다.  
이때, -1을 표현하면 이 bit들이 모두 1로 채워지는데,  
이를 비트연산자 >>> 을 이용하여 이동시키면 앞의 두 비트가 0으로 채워진다.  
컴퓨터는 이를 양수로 인식하게 되고, 이를 출력하면 출력값 같이 결과가 나온다.
