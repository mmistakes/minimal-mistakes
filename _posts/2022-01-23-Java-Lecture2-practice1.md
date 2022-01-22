---
title: 'Java - Lecture2 - practice1'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 정수형 상수 예제

다음과 같은 코드의 출력값을 생각해 보세요.

```java
package lecture2;

public class practice1 {
	public static void main(String args[]) {
		int i=255, o=0377, h=0xff;
		long l = 0xffL;
		System.out.println("i = "+i+", o = "+o+", h = "+h);
		System.out.println(i==o);
		System.out.println(o==h);
		System.out.println(h==l);
	}
}
```

> **Answer**

```java
i = 255, o = 255, h = 255
true
true
true
```
