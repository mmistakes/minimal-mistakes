---
title: 'Java - Lecture4 - practice3'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 분기문: break문

다음과 같은 코드의 출력값을 생각해 보세요.

```java
package lecture4;

public class practice3 {
	public static void main(String[] args) {
		JAVA: for (int i = 0; i < 10; i++) {
			PROGRAM: for (int j = 0; j < 10; j++) {
				if (j == 2)
					break PROGRAM;
				if (i == 3)
					break JAVA;
				System.out.println("i = " + i + ", j = " + j);
			}
		}
	}
}
```

> **Answer**

```java
i = 0, j = 0
i = 0, j = 1
i = 1, j = 0
i = 1, j = 1
i = 2, j = 0
i = 2, j = 1
```
