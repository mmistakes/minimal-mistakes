---
title: 'Java - Lecture3 - practice3'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 박싱, 언박싱

다음과 같은 코드의 출력값을 생각해 보세요.

```java
package lecture3;

public class practice3 {
	public static void main(String[] args) {
		int foo = 526;
		Object bar = foo;	//foo is boxed to bar.
		System.out.println(bar);
		try {
			bar=foo;
			System.out.println(bar);
			//double d = (Double)bar;
			//double d = (Integer)bar;
			double d = (double)(Integer)bar;
			System.out.println(d);
		}
		catch(ClassCastException e) {
			System.err.println(e.toString());
		}
	}
}
```

> **Answer**

```java
526
526
526.0
```
