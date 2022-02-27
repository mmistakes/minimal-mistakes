---
layout: single
title:  " DAY-02. 자바 국비지원 수업"
categories: JAVA-academy
tag: [JAVA, 국비지원, 환경설정, 출력(print), 변수]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

## 📌 자바 수업 
<!--Quote-->
> *본 내용은 국비수업을 바탕으로 작성*

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 

# 2022-02-24

## **1️⃣** 자바 환경 설정

- Eclipse protable EE사용
- Eclipse protable EE파일 압축 해제 후, 환경 설정 시작 → 숨긴파일 해제 후 eclipse.ini 파일에서 vm 부분을 설치한 jdk 파일의 위치로 변경
- Eclipse 실행 → file → new → project (반드시 프로젝트를 생성 해야한다)

## **2️⃣ 출력**

### 1. println : 한 줄씩 출력

### 2. print : 같은 줄에 출력

```java
public class Print {
	public static void main(String[] args) {
		// println : 한 줄씩 출력(개행)
		System.out.println("A");
		System.out.println("B");
		System.out.println("C");
		
		// print : 같은 줄에 A,B,C 출력 
		System.out.print("A");
		System.out.print("B");
		System.out.print("C");
	}
}
```

출력
    
![1.png](/assets/images/posts/2022-02-24/1.png)
    

### “” 와 ‘’ 의 차이 (더블 vs 싱글)

```java
public class Intro {

	public static void main(String[] args) {
		System.out.println("a"); 
		System.out.println('b'); // 이상없다 
		System.out.println("abc");
		System.out.println('abc'); // 컴파일 에러(Invalid character constant)
		System.out.println(" "); // 내용이 없어도 된다
		System.out.println(' '); // 내용이 있어야 한다
	}
}
```

- 자바에서 " " 와 ' ' 는 다르다
- 자바에서 " " : 문자열 , ““ 내용이 없어도 된다
- 자바에서 ‘ ‘ : 문자(한 글자만 가능) , ‘‘ 사이에 내용이 있어야 한다

### + : 문자열 연결 / 덧셈

```java

public class Intro {
	public static void main(String[] args) {

	// + : 문자열 연결 / 덧셈 
	System.out.println("안녕하세요?");
	System.out.println("저의 이름은 홍길동입니다 영어 이름은 HONG GILDONG입니다");
	System.out.println("제 나이는 " + 27 + "살 입니다");
	System.out.println("오늘의 체온 측정 결과는 " + 36.5 + "도입니다");
	}
}
```

![2.png](/assets/images/posts/2022-02-24/2.png)

### + : 문자열 + 숫자

```java
public class Intro {
	public static void main(String[] args){
		// 문자와 숫자를 연결할 떄 주의해야 하는 점 
		System.out.println("a" + "b" + 5 + 10); //ab510 출력
		// +는 왼쪽에서 오른쪽으로 더해짐 
		// 1. a + b = ab 
		// 2. ab + 5 = ab5
		// 3. ab5 + 10 = ab510

		System.out.println(5 + 10 + "a" + "b"); // 
		// 1. 5 + 10 =15
		// 2. 15 + a = 15a 
		// 3. 15a + b = 15ab
	}
}

```

- +는 왼쪽에서 오른쪽으로 더해짐
- 문자 + 숫자 = 문자

## 3️⃣ 변수

### 개념 정리

- 변수 : 메모리(RAM)에 값을 기록하기 위한 공간
- CPU :  사람의 뇌 , 기억은 못하고 처리(연산)만 한다
- RAM :  휘발성 메모리, CPU에서 처리한것을 기억
- HDD :  비휘발성 메모리
- Heap : new 연산자에 의해 동적으로 할당하고 저장되는 공간, 객체, 배열등
- Stack : 메소드를 호출하면 자동생성 메소드가 끝나면 자동소멸 지역변수, 매개변수 , 메소드 호출 스  택등

### 변수의 선언

❓ 메모리 공간에 데이터를 저장할 수 있는 공간을 항당하는 것 

- 선언 방법 : 자료형 + 변수명 + ;
- 자료형

![3.png](/assets/images/posts/2022-02-24/3.png)

``` java
public class Variable {
	public static void main(String[] args) {

 	// boolean : 참(true) 혹은 거짓 (false)을 저장하는 자료형
	boolean t = true;
	boolean f = false;
		
	// char : 문자를 저장하는 자료형 ('' 싱글 쿼테이션을 이용)
	char c1 = 'b';
	char c2 = '나';
	char c3 = '7';		
	System.out.println("c1 : " + c1); // c1 : b 출력
 	System.out.println("c2 : " + c2); // c2 : 나 출력 
	System.out.println("c3 : " + c3); // c3 : 7 출력

	// 숫자를 저장하는 자료형 
	// 정수형 
	byte b1 = -128;
	byte b2 = 127;
	System.out.println("b1 : " + b1); // -128 출력
	System.out.println("b2 : " + b2); // 127 출력

	// -32,768 ~ 32,767 
	short s1 = -32768;
	short s2 = 32767; 
	System.out.println("s1 : " + s1); // -32768 출력
	System.out.println("s2 : " + s2); // 32767 출력

	// int형 → 정수의 대표타입
	// 자바의 default 값은 int형 
	System.out.println(100);

	// long 
	long l1 = 321321321;
	System.out.println("11: " + 11); // l1: 321321321 출력
	long l2 = 321321321321L; // 에러 long은 L을 숫자 마지막에 붙여준다. 
	System.out.println(l2);  // l2: 321321321321 출력 

	// 실수형
	// 1. float
	float f1 = 3.14f;
	System.out.println(f1); // 3.14 출력

	// 2. double → 실수의 대표 타입
	double f2 = 3.14;
	System.out.println(f2); // 3.14 출력

	}
}

```


변수명 짓기 ❗ 나쁜 예
```java
public class Variable {
	public static void main(String[] args) {
		// 변수명의 첫 글자는 숫자로 시작 x
		// int 40var = 40;
		
		// 특수문자로 시작 x 
		// int %var = 40; 
		
		// 변수 이름은 짧고 의미있게 짓기 
		// int asdasdasdasasas qweq = 40;
	}
}
```

