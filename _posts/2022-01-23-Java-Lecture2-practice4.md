---
title: 'Java - Lecture2 - practice4'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 열거형(enumeration type)

다음과 같은 코드의 출력값을 생각해 보세요.

```java
package lecture2;

enum Color { Red, Green, Blue }
public class practice4 {
	public static void main(String[] args) {
		for (Color col : Color.values()) {
			System.out.println(col);
		}
		Color c = Color.Red;
		System.out.println(c + "'s value is " + c.ordinal());
		c = Color.valueOf("Blue");
		System.out.println(c + "'s value is " + c.ordinal());
		c = Color.valueOf("Yellow");
		System.out.println(c + "'s value is " + c.ordinal());
	}
}
```

> **Answer**

```java
Red
Green
Blue
Red's value is 0
Blue's value is 2
Exception in thread "main" java.lang.IllegalArgumentException: No enum constant lecture2.Color.Yellow
	at java.base/java.lang.Enum.valueOf(Enum.java:273)
	at lecture2.Color.valueOf(practice4.java:1)
	at lecture2.practice4.main(practice4.java:13)
```
