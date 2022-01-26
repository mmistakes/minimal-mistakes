---
title: 'Java - Lecture4 - practice5'
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

public class practice5 {
	public static void main(String[] args) {
		int count = 0;
		int i, j;
		i = j = 0;
		outer: for (i = 0; i < 10; i++) {
			inner: for (j = 0; j < 10; j++) {
				if (j == 2)
					continue inner;
				if (j == 5)
					continue outer;
				++count;
			}
		}
		System.out.println("count = "+count);
	}
}
```

> **Answer**

```java
count = 40
```
