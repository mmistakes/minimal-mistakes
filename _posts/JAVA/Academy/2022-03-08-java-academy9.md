---
layout: single
title:  " DAY-09. 자바"
categories: JAVA-academy
tag: [JAVA,  메서드, 오버로딩]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

# 📌2022-03-08

## 자바  
<!--Quote-->

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 


## **1️⃣ 메서드(Method)**

```java
	public 반환자료형 메서드명(매개변수..) {
		처리할 기능 코드 
		(리턴값);
 	}

	ex) 
	  --정의부 
		public static int plus(int a, int b) { // 매개변수 a와 b
		int rs = a + b;
		return rs;
	}

	-- 호출부 
	plus(1,5); // 인수는 1,5
```

- 메서드란, 어떤 특정한 작업을 수행하기 위해서 모아놓은 명령문의 집합 => function(함수)
- 정의부 : 메서드를 정의하는 영역 / 어떤 기능을 수행하게 될지에 대한 코드가 들어가는 영역
- 호출부 : 정의된 메서드 호출하는 영역 -> 즉 이미 정의된 메서드를 호출해서 그 기능을 쓰겠다 선언하는 영역
- 매개변수의 자료형과 인자값을 자료형과 수는 반드시 일치 해야함
- return 할게 없으면 반환자료형은 void
- 매개변수 인자값은 반드시 있어야 하는게 아님 -> 필수 x

### 1. Quiz-1 : 입력받은 만큼 출력

```java
import java.util.Scanner;

public class Greet {

	public static void greeting(int input) {
		for(int i = 0; i < input; i++) {
			System.out.println("안녕하세요");			
		}
	}
	public static void main(String[] args) {
		// 사용자에게 입력받은 정수만큼 '안녕하세요!' 를 출력해주는 메서드 
		Scanner sc = new Scanner(System.in);
		System.out.println("수를 입력하세요");
		int input = Integer.parseInt(sc.nextLine());
		greeting(input);
	}

}
```

### 2. Quiz-2 : 사용자가 입력한 채소를 영어 단어로 바꿔서 반환

```java
import java.util.Scanner;

public class Dictionary {
	
	public static void main(String[] args) {
		// 원하는 과일의 이름을 입력하세요. 
		// - > dict() 메서드는 이용해서 사용자가 입력한 채소를 영어 단어로 바꿔서 반환해주는 메서드를 구성 
		// - > 사용자한테 "입력한 oo은 영어로 oo입니다"
		// fruits = 사과, 복숭아, 포도외의 값을 입력하면 "사전에 등록된 단어가 없습니다".
		Scanner sc = new Scanner(System.in);
		System.out.print("원하는 과일을 입력하세요 \n>> "); String fruit = sc.nextLine();
		String result = dict(fruit);
		System.out.println("입력한 "+ fruit + "은/는 영어로 " + result + "입니다");
	}
	
	public static String dict(String fruit) {
		String eng = "";
		if(fruit.equals("사과")) {
			return eng = "apple";
		}
		else if(fruit.equals("복숭아")) { 
			return eng = "peach";
		}
		else if(fruit.equals("포도")) { 
			return eng = "grape";
		}
		else {
			return eng = "사전에 등록되지 않은 단어";
		}
	}

}
```

## **2️⃣ 오버로딩(Overloading)**

```java
  // 2개의 정수를 더하는 메서드
	public static int plus(int a, int b) {
		return a + b;
	}
	
  // 3개의 정수를 더하는 메서드
	public static int plus(int a, int b, int c) {
		return a + b + c;
	}

  // 메서드명은 같지만 매개변수의 자료형이 다름
  public static double plus(double num1, double num2, double num3) {
		return num1 + num2 + num3;
	}

  // 메서드명은 같지만 매개변수의 개수와 매개변수의 자료형이 다름 = 오버로딩
	public static int plus(char char1, char char2, char char3) {
		return char1 + char2 + char3;
	}
	
	// 오버로딩 o
	public static int plus() {
		return 5 + 10;
	}
```

- 메서드명은 같지만 매개변수의 개수가 다름
- 메서드명은 같지만 매개변수의 자료형이 다름
- 매개변수의 갸수나 혹은 자료형 혹은 둘 다 다르다면 오버로딩 성립

### 오버로딩 성립 x

```java
// A. 2개의 정수를 더하는 메서드 오버로딩
	public static int plus(int a, int b) {
		return a + b;
	}

// B. 오버로딩이 성립이 안되는 경우
	public static void plus(int a, int b) {  // Duplicate method 발생
		a + b;
	}

// C. 리턴 자료형이 달라지고 + 매개변수의 형태 달라지게 되면 다른 메서드로써 같은 이름을 사용하는게 가능 
	public static void plus(float num1, float num2) {
		float rs = num1 + num2;
	}
```

![1.png](/assets/images/posts/2022-03-08/1.png)

- 반환타입이 A와 B코드의 차이는 int에서 void로 다르다
- C 코드 : 리턴 자료형이 달라지고 + 매개변수의 형태 달라지게 되면 다른 메서드로써 같은 이름을 사용하는게 가능 → 오버로딩 X

