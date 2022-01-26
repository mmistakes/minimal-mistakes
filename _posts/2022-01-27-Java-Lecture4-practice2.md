---
title: 'Java - Lecture4 - practice2'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 혼합문

다음과 같은 코드의 출력값을 생각해 보세요.

```java
package lecture4;

public class practice2 {
	public static void main(String[] args) {
		int a = 3;
		int b = a;
		a++;
		System.out.println("a= " + a + " b= " + b);
		if (a <= b)
			a--;
		b++;
		System.out.println("a= " + a + " b= " + b);
		if (a <= b)
			a--;
		b++;
		System.out.println("a= " + a + " b= " + b);
	}
}
```

> **Answer**

```java
a= 4 b= 3
a= 4 b= 4
a= 3 b= 5
```
