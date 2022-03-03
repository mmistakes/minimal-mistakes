---
layout: single
title:  " DAY-06. 자바 국비지원 수업"
categories: JAVA-academy
tag: [JAVA, 국비지원, 반복문 탈출, labelling]
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



# 2022-03-03

## **1️⃣ 반복문 탈출**

## 1) break 2번 쓰기

```java
import java.util.Scanner;

public class VendingMachine {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int balance = 3000; 
		
		while(true) {
		System.out.println("=====자판기 시뮬레이터=====");
		System.out.println("음료수를 선택하세요.");
		System.out.println("1. 콜라(1000) 2. (사이다) 3. 매실차(1500) [0.소지품 확인] 10. 자판기 종료");
		System.out.print(">> ");
		int menu = Integer.parseInt(sc.nextLine());
		switch(menu) {
			case 1 : // 콜라 
				if(balance < 1000) { 
					System.out.println("잔액이 부족합니다");
				}
				System.out.println("콜라를 구매 했습니다");
				System.out.println("");
				break;
			
			case 2 : // 사이다
				if(balance < 800) { 
					System.out.println("잔액이 부족합니다");
				}
				System.out.println("매실차를 구매했습니다");
				System.out.println("매실차 ");
				System.out.println("소지금 ");
				break;
			
			case 3 : // 매실차
				if(balance < 1500) { 
					System.out.println("잔액이 부족합니다");
				}
				System.out.println("매실차를 구매했습니다");
				System.out.println("매실차 ");
				System.out.println("소지금 ");
				break;
			
			case 0 : // 소지품 확인
				System.out.println("==== 소지품 목록 ====");
				System.out.println("소지금 : ");
				System.out.println("콜라 : ");
				System.out.println("사이다 : ");
				System.out.println("매실차 : ");
				System.out.println("===================");
				break;
			
			case 10 : // 자판기 종료
				System.out.println("자판기 종료");
				break; // 1) 여기서의 break는 switch 문을 빠져나오게 한다 
			
			default : // 메뉴 다시 선택
				System.out.println("메뉴를 잘못 골랐습니다");
		}
			break; // 2) 여기서의 break는 while문을 빠져나오게 한다. 
           	       // → 여기의 break가 없다면 10을 입력해도 반복문에서 빠져나오지 못한다 
		}
	}

}

```

- switch 문안에서 break; 사용 switch 문 밖에서 break 사용 해야 10을 눌렀을때 반복문 탈출

## 2) labeling

```java
import java.util.Scanner;

public class VendingMachine {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int balance = 3000; 
		
		vening : while(true) {
		System.out.println("=====자판기 시뮬레이터=====");
		System.out.println("음료수를 선택하세요.");
		System.out.println("1. 콜라(1000) 2. (사이다) 3. 매실차(1500) [0.소지품 확인] 10. 자판기 종료");
		System.out.print(">> ");
		int menu = Integer.parseInt(sc.nextLine());
		switch(menu) {
			case 1 : // 콜라 
				if(balance < 1000) { 
					System.out.println("잔액이 부족합니다");
				}
				System.out.println("콜라를 구매 했습니다");
				System.out.println("");
				break;
			
			case 2 : // 사이다
				if(balance < 800) { 
					System.out.println("잔액이 부족합니다");
				}
				System.out.println("매실차를 구매했습니다");
				System.out.println("매실차 ");
				System.out.println("소지금 ");
				break;
			
			case 3 : // 매실차
				if(balance < 1500) { 
					System.out.println("잔액이 부족합니다");
				}
				System.out.println("매실차를 구매했습니다");
				System.out.println("매실차 ");
				System.out.println("소지금 ");
				break;
			
			case 0 : // 소지품 확인
				System.out.println("==== 소지품 목록 ====");
				System.out.println("소지금 : ");
				System.out.println("콜라 : ");
				System.out.println("사이다 : ");
				System.out.println("매실차 : ");
				System.out.println("===================");
				break;
			
			case 10 : // 자판기 종료
				System.out.println("자판기 종료");
				break vending;  // while 문 앞에 라벨링을 해줘서 break를 줄 때 라벨링의 이름을 써준다.
			
			default : // 메뉴 다시 선택
				System.out.println("메뉴를 잘못 골랐습니다");
		} 
		}
	}

}

```

- while 문 앞에 원하는 이름의 라벨링을 붙여준다
- break문 뒤에 라벨링의 이름을 붙여준다.

## **2️⃣ 랜덤 함수 (Random)**

```java
public class Random_Intro {

	public static void main(String[] args) {
		System.out.println(Math.random());
		System.out.println( (int)(Math.random() * 10) );  ( 0부터~9까지의 값 반환 ) 
		System.out.println( (int)(Math.random() * 10) +1 ); ( 1부터~10까지의 값 반환 )
		
		// 지정한 숫자 범위 내에서 랜덤한 수를 뽑아내고 싶을 때 
		// (Math.random() * (최대값 - 최소값 + 1)) + 최소값

		// 아스키코드로 바꾸기 
		System.out.println((char)(int)(Math.random() * (122-65+1) + 65) );
		System.out.println((char)((Math.random() * (122-65+1)) + 65) );
	}

}
```

- Math.random() : 0.0 ~ 1.0 사이의 난수를 생성

### 랜덤 Quiz

1. 오류 

```java
import java.util.Scanner;

public class Intro {

	public static void main(String[] args) {
	
		
		int min = 1;
		int max = 10;
		String rs ;
		int ranNum = (int)(Math.random() * (max - min + 1) + min);
		
		if(ranNum % 2 == 0) {
			 rs = "짝";
		}else if(ranNum % 2 == 1) {
			 rs = "홀";
		}
		System.out.println(rs); // 오류 발생 
		
	}

}
```

![1.png](/assets/images/posts/2022-03-03/1.png)

- if 문에서 충족 안되고, else if 에서도 충족이 안되면 String에는 공간 만 할당이 되어있지 데이터가 담기지 않아 있다 그래서 오류가 발생

1. 오류 해결법

1) 

```java
import java.util.Scanner;

public class Intro {

	public static void main(String[] args) {
	
		
		int min = 1;
		int max = 10;
		String rs = null;
		int ranNum = (int)(Math.random() * (max - min + 1) + min);
		
		if(ranNum % 2 == 0) {
			 rs = "짝";
		}else if(ranNum % 2 == 1) {
			 rs = "홀";
		}
		System.out.println(rs); 
		
	}

}
```

- String rs에 null값을 넣어 놓는다
- 그 후 조건문이 실행되면 null값 에서 “짝” 이나 “홀” 로 데이터가 바뀐다

2)

```java
import java.util.Scanner;

public class Intro {

	public static void main(String[] args) {
	
		
		int min = 1;
		int max = 10;
		String rs ;
		int ranNum = (int)(Math.random() * (max - min + 1) + min);
		
		if(ranNum % 2 == 0) {
			 rs = "짝";
		}else (ranNum % 2 == 1) {
			 rs = "홀";
		}
		System.out.println(rs); 
		
	}

}
```

- String rs를 할당만 해둔다
- 조건문을 if / else if 가 아닌 if / else로  한다
- if / else if 는 if가 아니면 다른 else if를 보고 거기서도 아니면 또 다른 else나 else if를 필요로 한다.
- 반면 if / else는 if가 아니면 무조건 else의 코드가 실행이 된다. 그래서 if / else를 쓴다.

##