---
title: 'Java - Lecture3 - practice2'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 증가 및 감소 연산자

다음과 같은 코드의 출력값을 생각해 보세요.

```java
package lecture3;

public class practice2 {
	public static void main(String[] args) {
		int x=3, y=5;
		y=x++;
		System.out.println("x="+x+"\t y="+y);
	}
}
```

> **Answer**

```java
x=4	 y=3
```
