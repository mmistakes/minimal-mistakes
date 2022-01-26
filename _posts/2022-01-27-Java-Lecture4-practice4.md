---
title: 'Java - Lecture4 - practice4'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 분기문: continue문

다음과 같은 코드의 출력값을 생각해 보세요.

```java
package lecture4;

public class practice4 {
	public static void main(String[] args) {
		for (int i = 0; i <= 5; ++i) {
			if (i % 2 == 0)
				continue;
			System.out.println("This is a " + i + " iteration");
		}
	}
}
```

> **Answer**

```java
This is a 1 iteration
This is a 3 iteration
This is a 5 iteration
```
