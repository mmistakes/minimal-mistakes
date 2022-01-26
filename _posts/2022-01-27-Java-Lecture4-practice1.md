---
title: 'Java - Lecture4 - practice1'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 배정문

다음과 같은 코드의 출력값을 생각해 보세요.

```java
package lecture4;

public class practice1 {
	public static void main(String[] args) {
		short s; int i;
		float f; double d;

		s=526;
		d=f=i=s;
		System.out.println("s = "+s+"\ti = "+i);
		System.out.println("f = "+f+"\td = "+d);
	}
}
```

> **Answer**

```java
s = 526	i = 526
f = 526.0	d = 526.0
```
