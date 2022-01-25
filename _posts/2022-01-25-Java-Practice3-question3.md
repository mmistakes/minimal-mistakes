---
title: '2022-01-25-Java-Practice3-question3'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 3

사용자로부터 숫자 x,y를 입력받은 후, y로 x를 나누는 코드를 작성해야 한다.  
결과를 나타내는 방식은 2가지로 표현해야 한다.  
첫 번째는 몫과 나머지로 나타내는 방식  
두 번째는 소수형식으로 출력하는 방식이다.

---

- 입력은 한번만 받는다. (x, y 각 한번씩)

* 결과를 나타내는 문장의 양 끝에는 " "를 붙여야 한다. (아래 화면 참고)

---

## 콘솔 입출력 결과

```java
정수 x를 입력해주세요: 10
정수 y를 입력해주세요: 5
"10/5의 몫은 2이고 나머지는 0입니다."
"10/5의 값은 2.0입니다."
```

<br>

> **Answer**

### question3.java

```java
package practice3;

import java.util.Scanner;

public class question3 {
	public static void main(String args[]) {
		Scanner sc = new Scanner(System.in);

		int x,y;

		System.out.print("정수 x를 입력해주세요: " );
		x = sc.nextInt();
		System.out.print("정수 y를 입력해주세요: " );
		y = sc.nextInt();

		System.out.println("\""+x+"/"+y+"의 몫은 "+x/y+"이고 나머지는 "+x%y+"입니다.\"");
		System.out.println("\""+x+"/"+y+"의 값은 "+(float)(x/y)+"입니다.\"");
	}
}
```
