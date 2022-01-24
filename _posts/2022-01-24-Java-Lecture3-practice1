---
title: 'Java - Lecture3 - practice1'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 산술 연산자 - 무한 연산

다음과 같은 코드의 출력값을 생각해 보세요.

```java
package lecture3;

public class practice1 {
	public static void main(String[] args) {
		double x=Double.POSITIVE_INFINITY, y=Double.NEGATIVE_INFINITY;
		double z=Double.MAX_VALUE;
		System.out.println(" POSITIVE_INFINITY + POSITIVE_INFINITY = " + (x+x));
		System.out.println(" POSITIVE_INFINITY - POSITIVE_INFINITY = " + (x-x));
		System.out.println(" POSITIVE_INFINITY + NEGATIVE_INFINITY = " + (x+y));
		System.out.println(" POSITIVE_INFINITY * 0.0 = " + (x*0.0));
		System.out.println(" Double.MAX_VALUE / POSITIVE_INFINITY = " + (z / x));
		System.out.println(" 0.0 / 0.0 = " + (0.0/0.0));
		}
}
```

> **Answer**

```java
 POSITIVE_INFINITY + POSITIVE_INFINITY = Infinity
 POSITIVE_INFINITY - POSITIVE_INFINITY = NaN
 POSITIVE_INFINITY + NEGATIVE_INFINITY = NaN
 POSITIVE_INFINITY * 0.0 = NaN
 Double.MAX_VALUE / POSITIVE_INFINITY = 0.0
 0.0 / 0.0 = NaN
```
