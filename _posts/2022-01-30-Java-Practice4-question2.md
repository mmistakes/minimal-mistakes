---
title: "Java - Practice4 - question2"
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: "Java"
---

# 문제 2

간단한 코드를 통해서 명시적 형변환의 예를 보여주세요.  
또한 명시적 형변환 사용시 주의해야 될 점을 서술하세요.  
<br>

> **Answer**

```java
package practice3;

public class Problem2 {

	public static void main(String[] args) {
		int x;
		float y,z;

		x = 7/2;
		y = (float)7/2;
		z = 7/2;

		System.out.println("x = "+x+", y= "+y+", z = "+z);
	}
}
```

**주의사항**

1. boolean형태는 명시적 형변환을 할 수 없다.
2. 큰 형(ex)double)에서 작은 형 (ex)int)로 명시적 형변환을 할 시에는 데이터가 손실될 수 있다.
