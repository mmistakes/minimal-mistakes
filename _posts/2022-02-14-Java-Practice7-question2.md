---
title: 'Java - Practice7 - question2'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 2

아래 설명을 보고 코드를 작성하시면 됩니다.

1. Shape 클래스 안에는 한 개의 변수가 존재한다.  
   Shape 클래스는 생성될 때 숫자를 하나 입력 받는다.
2. Interface Clac 안에는 Area()함수가 존재한다.
3. 원, 정삼각형, 정사각형에 대한 클래스가 존재한다.
4. 각 클래스에서 Area()함수를 실행하면 넓이를 구할 수 있어야 한다.  
   <br>

> **Answer**

- Shape.java

```java
package practice7;

import java.util.Scanner;

abstract class Shape implements Calc{
	Scanner sc = new Scanner(System.in);

	int a;
	public Shape() {
		a = sc.nextInt();
	}
}
```

- Circle.java

```java
package practice7;

public class Circle extends Shape implements Calc {
	private double result;

	public void Area() {
		result = a * a * 3.14;

		System.out.println(result);
	}
}
```

- Triangle.java

```java
package practice7;

public class Triangle extends Shape implements Calc {
	private double result;

	public void Area() {
		result = Math.sqrt(3) / 4 * a * a;

		System.out.println(result);
	}
}
```

- Square.java

```java
package practice7;

public class Square extends Shape implements Calc {
	private double result;

	public void Area() {
		result = a * a;

		System.out.println(result);
	}
}
```

- Test2.java

```java
package practice7;

public class Test2 {
	public static Shape[] shapes;

	public static void main(String[] args) {
		shapes = new Shape[3];
		shapes[0] = new Circle();
		shapes[1] = new Triangle();
		shapes[2] = new Square();

		for(int i=0; i<shapes.length; i++) {
			shapes[i].Area();
		}
	}
}
```

- 콘솔화면

```

1
2
3
3.14
1.7320508075688772
9.0

```
