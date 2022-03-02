---
layout: single
title:  " DAY-05. 자바 국비지원 수업"
categories: JAVA-academy
tag: [JAVA, 국비지원, 반복문,]
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


# 2022-03-02

## **1️⃣ 반복문**

### 1. for

```java
for(초기식; 조건식; 증감식){
		 		실행할 코드
	 }

// 초기값: 몇번부터 시작할건지
// 조건식 : 언제까지 반복할건지 
// 증감식 : for문 안쪽의 코드가 한번 반복될때마다 증가시킬 값
```


💡 Exam - 01 : 1부터 사용자가 입력한 값까지 출력한 코드를 작성

```java
import java.util.Scanner;

public class For {

	public static void main(String[] args) {
		// 언제까지 반복문을 돌려야할지 모르는 경우 
		Scanner sc = new Scanner(System.in);
		System.out.print("숫자를 입력하세요 ");
		int input = Integer.parseInt(sc.nextLine());
		for(int i = 1; i <= input; i++) {
			System.out.println(i);
		}

	}

}
```

💡 Exam - 02 :  1부터 사용자가 입력한 값까지 홀수만 출력

```java
import java.util.Scanner;

public class For {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.print("정수를 입력하세요 ");
		int input = Integer.parseInt(sc.nextLine());
		
		// 방법 1. 출력문 안쪽에서 조건식을 통해 홀수만 걸려 출력 ->
		for(int i = 1; i <= input; i++) {
			if(!(i % 2 == 0)) {
				System.out.println("방법1. 홀수 출력 : " + i);
			}
		}
		
		// 방법 2. 증감식 변경
		for(int i = 1; i <= input; i+=2) {
			System.out.println("방법2. 홀수 출력 : " + i);
		}
	}

}
```

- 방법2는 생각하지 못함

💡 Exam - 03 : Continue 이용 

```java
import java.util.Scanner;

public class For {

	public static void main(String[] args) {
		// 1~5 까지 숫자를 차례대로 출력하는데, 3만 빼고 출력 
		for(int i = 1; i <= 5; i++) {
			if(i == 3) {
				continue; // 3을 만나면 건너뛰고 4부터 출력 
				// 만약 break라면 3을 만나는 순간 반복문 종료 1, 2출력 
			}System.out.println(i);
		}
		
	}

}
```

- continue → 현재 진행되고 있는 반복 흐름이 종료

💡 Exam - 04 : 1부터 입력값까지의 전체 합을 출력 

```java
import java.util.Scanner;

public class Exam02_For {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.print("정수를 입력하세요 ");
		int input = Integer.parseInt(sc.nextLine());
		int sum = 0 ;
		for(int i = 1; i <= input; i++) {
			sum += i;
		}System.out.println(sum);
		
	}

}
```

### 2. while

```java
while(조건식) {
	 		실행할 코드 
	  }

ex) 
int i = 0;
while (i < 4) {
			실행할 코드 
			i++; 
}
```

- for문과 같은 역할(반복) → 초기식 x ,
- 무한루프가 반복되는 상황일 때 사용
- while 문은 break문과 같이 쓰여야 한다