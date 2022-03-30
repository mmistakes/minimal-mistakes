---
layout: single
title:  " DAY-03. 자바 "
categories: JAVA-academy
tag: [JAVA, String, 형변환, 연산자, Scanner]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---
# 📌2022-02-25


## 자바  
<!--Quote-->

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 



## **1️⃣ String : 참조형 변수**

![1.jpg](/assets/images/posts/2022-02-25/1.jpg)

- 기본형은 값이 저장 되지만, 참조형은 주소값이 저장된다

## **2️⃣ 형변환(Casting)**

- 데이터의 자료형을 변환
- 개발자가 데이터의 타입의 범위를 예측하지 못했을때
- 개발자가 원하는 대로 데이터 타입을 사용하기 위해서 강제적으로 형변환

### 형변환 종류

1. 자동 형변환(promotion) : 작은 자료형에서 큰 자료형으로 변환이 이루어지는 경우 ex) byte → int

```java
public class Casting {
	public static void main(String[] args) { 
		// 자동 형변환
		byte a1 = 127;
		System.out.println("a1 : " + a1); // a1 : 127
		short a2 = a1;
		System.out.println("a2 : " + a2); // a2 : 127
		int a3 = a2;
		System.out.println("a3 : " + a3); // a3 : 127
		long a4 = a3;
		System.out.println("a4 : " + a4); // a4 : 127
	}
}
```

1. 강제 형변환(down casting) : 큰 자료형에서 작은 자료형으로 변환이 이루어지는 경우 (데이터의 손실이 일어날 수 있음)

```java

public class Casting {
	public static void main(String[] args) { 
		// 강제 형변환 
		long a1 = 123456789123456789L;
		System.out.println("a1 : " + a1); // l2 : 123456789123456789
		int a2 = (int)a1;
		System.out.println("a2 : " + a2); // i2 : -1395630315
		short a3 = (short)a2;
		System.out.println("a3 : " + a3); // s2 : 24341
		byte a4 = (byte)a3;
		System.out.println("a4 : " + a4); // b2 : 21

		// 정수 → 실수 : 형변환 필요없다 
		int i3 = 50;
		float f3 = i3; 
		System.out.println("f3 : " + f3); // f3 : 50.0
		
		// 실수 → 정수 
		double d4 = 3.14;
		int i4 = (int)d4;
		System.out.println("i4 : " + i4); // i4 : 3

		// char : 실제로는 내부적으로 문자와 매칭되는 숫자(코드)가 들어있음
		char c5 = 'a';
		System.out.println("c5 : " + c5); // c5 : a
		int i5 = c5;
		System.out.println("i5 : " + i5); // i5 : 97 아스키코드 
	}
}
```

- 값의 범위가 큰 자료형을 값의 범위가 작은 자료형으로 변환
- 강제 형변환 시 데이터 손실 발생 → 데이터의 변형, 손실을 감수하고 변환
- 바꾸고 싶은 자료형을 ( ) 안에 기입
- 실수 → 정수  형변환 필요

### 형변환 Quiz

```java
public class Quiz01_Casting {
	public static void main(String[] args) {
		// 퀴즈 1 : 주어진 값을 모두 int 형으로 변환해서 모두 더한 값을 출력 
		char a = '2';
		double b = 5.6;
		long c = 1250000L;
		int d = 10000;
		
		/* 방법 1 
		int i1 = a;
		int i2 = (int)b;
		int i3 = (int)c;
		int i4 = d;
		int rs = i1 + i2 + i3 + i4;
		*/
		
		/* 방법 2
		int rs = a + (int)b + (int)c + d; 
		*/
		
		/* 방법 3 
		int rs = (int)(a+b+c+d);
		*/
		
		int rs = (int)(a+b+c+d);
		System.out.println(rs);
	}
}
```

## 3️⃣ 연산자(Operation)

1. 산술 연산자(+, -, *, /, %)
2. 대입 연산자(=, +=, -=, *=, /=, %=)
3. 비교 연산자(<, >, >=, <=, ==, !=)
4. 증감 연산자(전위 연산, 후위 연산)
5. 논리 연산자(&&, ||)
6. 삼항 연산자 ( 조건식? 식1 : 식2 ) 

### 산술 연산자

```java
public class Intro {
	public static void main(String[] args) {

		int a = 10;
		int b = 4;
		int c = 4; 
		
		// 산술 연산자 
		System.out.println("=====산술연산자=====");
		System.out.println(a + b); // 14
		System.out.println(a - b); //  6
		System.out.println(a * b); // 40
		System.out.println(a / b); //  2(몫)
		System.out.println(a % b); //  2(나머지)
	}
}
```

### 대입 연산자

```java
public class Intro {
	public static void main(String[] args) {

		// 대입 연산자 
		int d = 5;
		d += 3; // d = d+3 여기서 우변의 d는 5
		System.out.println(d); // 8
		d -= 4; // d = d-4 여기서 우변은 위의 d의 결과값인 8
		System.out.println(d); // 4
		d *= 10; // d = d*4 여기서 우변은 위의 d의 결과값인 4
		System.out.println(d); // 40

	}
}
```

### 비교 연산자

```java
public class Intro {
	public static void main(String[] args) {
	
		int a = 10;
		int b = 4;
		int c = 4;

		// 비교 연산자 : 두 수를 비교했을 때 나오는 결과값은 true or false
		System.out.println(" a > b : " + (a > b)); // a > b : true
		System.out.println(" a < b : " + (a < b)); // a < b : false
		System.out.println(" a = b : " + (a == b)); // a = b : false
		System.out.println(" a != b: " + (a != b)); // a != b: true
		System.out.println(" a >= b: " + (a >= b)); // a >= b: true
		System.out.println(" a <= b: " + (a <= b)); // a <= b: false
		
		char c1 = 'a'; // 아스키코드로하면 97 
		char c2 = 'A'; // 아스키코드로하면 65
		System.out.println(" c1==c2 : " + (c1 == c2)); // c1==c2 : false
		System.out.println(" c1 > c2 : " + (c1 > c2)); // c1 > c2 : true
		
		// 참조 자료형 String 값에 대한 비교를 할 때는 ==을 쓰지 않고 equals()를 이용한다
		String str1 = "abc";
		String str2 = "abc";
		String str3 = "def";
		System.out.println(str1 == str2); // true
		System.out.println(str1 == str3); // false
		System.out.println(str1.equals(str2)); // true
		System.out.println(str1.equals(str3)); // false
		
		// == 는 주소값 비교 equals()는 값비교 
		String str4 = new String("벤쿠버");
		String str5 = new String ("벤쿠버");
		String str6 = str4;		
		System.out.println(str4 == str5); // false
		System.out.println(str4.equals(str5)); // true
		System.out.println(str4 == str6); // true
		System.out.println(str4.equals(str6)); // true
		
	
	}

}
```

- 참조 자료형 String 값에 대한 비교를 할 때는 ==을 쓰지 않고 equals()를 이용한다

### 증감 연산자

```java
public class Intro {
	public static void main(String[] args) {

		// 증감 연산자(전위/후위) : ++ --
		int e = 20;
		int f = 20;
		
		System.out.println("원본 데이터 : " + e + " / " + f); // 원본 데이터 : 20 / 20
		// 전위 연산 : 그 즉시 값에 +1을 해줌
		System.out.println(++e); // 21 
		System.out.println(e); // 21
		System.out.println(--e); // 20
		System.out.println(e); // 20
		
		// 후위 연산 : 값이 쓰인 후에 연산이 이루어짐 
		System.out.println(f++); // 20
		System.out.println(f); // 21
		System.out.println(f--); // 21 
		System.out.println(f); // 20

	}
}
```

### 논리 연산자

```java
public class Intro {
	public static void main(String[] args) {
		int a = 10;
		int b = 4;
		int c = 4; 

		// 논리 연산자 (and, or 연산, ! 부정 연산) 
		
		// && (and) : 양쪽의 조건 모두 true여야한다.즉 하나라도 false면 false
		System.out.println((a > b && a > c) ); // true a가 b보다 크면서 a가 c보다 크다
		System.out.println((a < b && a > c)); //  false a가 b보다 작으면서 a가 c보다 크다
		
		// || (or) : 양쪽 중에 하나라도 true이면 true 
		// true가 나오는 순간 바로 실행이 끝난다 ex) 첫 번째 연산에서 true면 두번째 연산은 실행 x 
		System.out.println((a > b || a > c) ); // true a가 b보다 크거나 a가 c보다 클때
		System.out.println((a < b || a > c)); //  true a가 b보다 작거나 a가 c보다 클때
		
		// != (not) : 같지 않다
		System.out.println( a != b ); // true
		System.our.println( !true ); // faslse
		System.our.println( !false ); // true

	}
}
```

- true가 나오는 순간 바로 실행이 끝난다 ex) 첫 번째 연산에서 true면 두번째 연산은 실행 x

### 삼항 연산자

```java
public class Intro {
	public static void main(String[] args) {
		int a = 10;
		int b = 4;
		int c = 4; 
			
		// 삼항 연산자 
		// 비교식? A : B → 비교식이 true이면 A실행 false면 B실행 
		System.out.println(a > b ? a : b); // 10 출력 
		System.our.println(a < b ? a : b); // 4 출력 
	}
}
```

## 4️⃣ Scanner

```java
import java.util.Scanner;

public class Exam01_Scanner {
	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);
		// next()는 한번에 여러개의 입력을 받을 수 없다. → 띄어쓰기, 엔터키 직전의 값만 받아준다  
		// nextLine()이여야 한번에 여러개의 입력을 받을 수 있다 
		
		String input = sc.nextLine(); // hello world 입력 
		String input2 = sc.next(); // hello world 입력 
		sc.close();
		System.out.println("input : " + input); // hello world 출력
		System.out.println("input2 : " + input2); // hello 출력
	
	}
}
```

- Scanner : 출력용으로만 쓰던 console 창에 입력도 가능하게 해주는 자바(jdk)에 내장된 도구
- Scanner를 사용하기 위해서 java.util.Scanner를 import 해줘야 한다
- next()는 한번에 여러개의 입력을 받을 수 없다. → 띄어쓰기, 엔터키 직전의 값만 받아준다
- nextLine()이여야 한번에 여러개의 입력을 받을 수 있다

![2.png](/assets/images/posts/2022-02-25/2.png)

### Scanner 연습

```java
import java.util.Scanner;

public class Exam01_Scanner {
	public static void main(String[] args) {
	
		// 사용자에게 이름, 나이, 직업을 입력받아서 출력해 보세요.
		Scanner sc = new Scanner(System.in);
		
		// 1. 사용자의 이름을 입력받기 		
		System.out.println("당신의 이름은?");
		String name = sc.nextLine();
		
		// 2. 사용자의 나이를 입력받기 
		// 여기서 nextInt()를 활용하게 되면 나이를 입력하고 끝이 실행이 끝난다
		// int age = sc.nextInt();
		System.out.println("당신의 나이는?");
		String age = sc.nextLine();
		
		// 3. 사용자의 직업을 입력받기 
		System.out.println("당신의 직업은?");
		String job = sc.nextLine();
		
		// 4. 사용자의 이름 + 나이 + 직업을 한번에 출력 
		System.out.println("이름 :" + name + " 나이 : " + age + " 직업 : " + job);

	}
}
```
- 항목 하나하나 입력을 받을 때는 nextLine() 사용

### Scanner 연습2
```java
import java.util.Scanner;

public class Exam01_Scanner {
	public static void main(String[] args) {
		// 사용자에게 숫자 그대로를 입력받기 위한 방법 2가지
		// 1. nextInt() 사용
		// 명시적인 자료형을 이용한 next 기능을 사용할 때 주의해야하는 점 
		System.out.println("나이를 입력하세요");
		int input = sc.nextInt();
		System.out.println("input : " + input);
		
		sc.nextLine();
		System.out.println("직업을 입력하세요");
		String job = sc.nextLine();
		System.out.println("직업 : " + job);
		
		
		// 2. nextLine() 사용 → String → 형변환해서 사용 
		// nextLine()을 이용해 String → int
		System.out.println("나이를 입력하세요");
		int input = Integer.parseInt(sc.nextLine()); // String 값을 int로 변환
		System.out.println("age : " + input);
		
		
		// nextLine()을 이용해 String → boolean
		System.out.println("true 혹은 false를 입력하세요");
		boolean b = Boolean.parseBoolean(sc.nextLine());
		System.out.println("input2 : " + b);
		
		// nextLine()을 이용해 String → char
		System.out.println("성별을 입력하세요");
		char c = sc.nextLine().charAt(0); // 인덱스가 0인 부분을 받아옴 ex)남자 입력시
		System.out.println("c : " + c); // 남 출력

	}
}
```




