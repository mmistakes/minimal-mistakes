---
layout: single
title:  " DAY-08. 자바 국비지원 수업"
categories: JAVA-academy
tag: [JAVA, 국비지원, 배열]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

# 📌2022-03-07

## 자바 수업 
<!--Quote-->
> *본 내용은 국비수업을 바탕으로 작성*

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 


## **1️⃣** 오류 잡기

### 틀린코드

```java
import java.util.Scanner;

public class Example {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		char a = sc.nextLine().charAt(0);
		if(a.equals('k')) {   
		// cannot invoke equals(char) on the primitive type char 발생
			
		}
		
	}

}
```

- equals라는 메서드를 사용하기 위해서는 Character를 사용해야 한다.
- 반면 == 을 이용해서 사용하려면 원시형 타입인 char 이용
    
    ![1.png](/assets/images/posts/2022-03-07/1.png)
    
<details>
<summary>👈stackoverflow </summary>
<div markdown="1">       
[https://stackoverflow.com/a/18781579](https://stackoverflow.com/a/18781579) 참조
</div>
</details> 


### 옳바른 코드

```java
import java.util.Scanner;

public class Example {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		Character a = sc.nextLine().charAt(0);
		if(a.equals('k')) {  
			
		}
		
	}

}
```

## **2️⃣** 배열(Array)

- 같은 자료형의 집합
- 같은 자료형 변수들을 모아서 하나의 이름으로 관리

```java
import java.util.Arrays;
import java.util.Collections;

public class Exam01_Intro {

	public static void main(String[] args) {
		int[] arr = new int[5];
		arr[0] = 1;
		arr[1] = 2; 
		arr[2] = 3;
		arr[3] = 4;
		arr[4] = 5;
		
		// 배열 생성과 함께 초기화
		int[] arr2 = new int[] {1,2,3,4,5};
		int[] arr3 = {1,2,3,4,5};

	}

}
```

- int[] -> int형 배열을 의미(자료형)
- arr -> 변수명_ 참조변수
- new -> heap 영역에 저장 -> 배열은 참조자료형
- int[5] -> heap 영역에 5칸짜리 공간(변수)을 만들겠다
    
    
    ![2.jpg](/assets/images/posts/2022-03-07/2.jpg)
    

### Quiz-1

```java

public class Intro {

	public static void main(String[] args) {
		// int형 배열 100칸짜리를 만들어서 0 ~ 99 까지 담아보기 
		int[] arr = new int[100];
		for(int i = 0; i < arr.length; i++) {
			System.out.println("arr[" + i + "] : " + i);
		}
		
		// int형 배열 100 칸짜리 만들어서 99~0까지 담아보기 
		int[] arr2 = new int[100];
		for(int i = arr2.length - 1; i >= 0 ; i--) {
			System.out.println("arr[" + i + "] : " + i);
		}
	}

}
```

### Quiz-2

```java
public class Quiz01_AtoZ {

	public static void main(String[] args) {
		
		// char형 배열 26칸짜리 만들어서 알파벳 A부터 Z까지 저장
		// 가능하면 출력까지 ** 아스키코드 활용
		// 아스키코드 A = 65 a = 97
		
		// 방법 1
		char[] arr = new char[26];
		
		for(int i = 0; i <arr.length; i++) {
			arr[i] =(char)(65+i);
			System.out.println(arr[i]);

		// 방법 2
		char[] al = new char[26];
		for(int i = 0, num = 65; i < al.length; i++,num++) {
			al[i] =(char)num;
			System.out.println(al[i]);
		}

		}
		
	}

}
```

### Quiz-3

```java
import java.util.Scanner;

public class Array {

	public static void main(String[] args) {
		
		// 사용자에게 입력받은 정수만큼 int 형 배열의 크기를 할당
		// 그리고 1부터 순차적으로 값을 저장
		Scanner sc = new Scanner(System.in);
		System.out.print("수를 입력하세요 : ");
		int input = sc.nextInt();
		
		int[] arr = new int[input];
		for(int i = 0; i < arr.length; i++) {
			arr[i] = i+1;
			System.out.println("arr[" + i +"] : " + arr[i]);
		}
		
	}

}
```

### for each

```java
public class Quiz01_AtoZ {

	public static void main(String[] args) {
		
		char[] arr = new char[26];
		
		for(int i = 0; i <arr.length; i++) {
			arr[i] =(char)(65+i);
			System.out.println(arr[i]);
		}
		
		// foreach : 향상된 for 문 
		// 배열의 첫 인덱스로부터 가장 마지막 인덱스까지 순차적으로 반복
		for(char i : arr) {
			System.out.print(i + " "); // A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
		}
		
		
	}

}
```

### 오류

```java
import java.util.Arrays;
import java.util.Collections;

public class Arrays {

	public static void main(String[] args) {
		Integer[] arr = new Integer[5];  // int가 아닌 Integer
		arr[0] = 1;
		arr[1] = 4;
		arr[2] = 3;
		arr[3] = 2;
		arr[4] = 5;
		// Collection 클래스를 사용하려면 Integer로 해야한다 int로 하면 에러 
		// 배열을 내림차순으로 
		Arrays.sort(arr,Collections.reverseOrder());
		
	}

}
```

- int / Integer 주의

### try ~ catch

```java
import java.util.Scanner;

public class Array {

	public static void main(String[] args) {
		// 사용자에게 입력받은 정수만큼 int 형 배열의 크기를 할당
		// 그리고 1부터 순차적으로 값을 저장

		// NumberFormatException : 숫자가 아닌 다른 수를 입력했을때
		Scanner sc = new Scanner(System.in);
		System.out.print("수를 입력하세요 : ");

		// try ~ catch : 예외(에러) 처리
		try {   // 에러가 없을 때 실행 
			int input = Integer.parseInt(sc.nextLine());
			int[] arr = new int[input];
			for (int i = 0; i < arr.length; i++) {
				arr[i] = i + 1;
				System.out.println("arr[" + i + "] : " + arr[i]);
			}

		} catch (Exception e) {   // 에러가 발생 했을 때 실행 
			System.out.println("숫자를 입력하세요");
		}

	}

}
```

![3.png](/assets/images/posts/2022-03-07/3.png)

<aside>
💡 수 입력을 하는 공간에 “가나다” 를 입력해서 에러 발생 → catch 안에 있는 코드 실행

</aside>

- try : 에러가 없을 때 코드 실행
- catch : try에서 에러가 발생했다면 코드 실행

### 🔨 배열의 수정

```java

public class Array {

	public static void main(String[] args) {
		// 배열의 수정 / 삭제 
		// CRUD / CREATE / READ / UPDATE /DELETE
		
		// 배열의 수정 기본
		int[] arr1 = {1,2,3,4,5};
		System.out.println("arr1 수정 전 : " + arr1[0]);
		arr1[0] = 10; // arr1[0]이 1이 였는데 10으로 변경
		System.out.println("arr1 수정 후 : " + arr1[0]);
		int[] arr2 = Arrays.copyOf(arr1,5);
		
		
		// hello를 안녕하세요로 수정 
		char[] charArr = {'h', 'e', 'l', 'l', 'o'};
		
		/*
		// 방법1 : 인덱스 번호 이용 
		charArr[0] = '안';
		charArr[1] = '녕';
		charArr[2] = '하';
		charArr[3] = '세';
		charArr[4] = '요';
		
		System.out.println("수정 후");
		for(char i : charArr) {
			System.out.print(i+ " ");
		}
		*/
		
		// 방법2 
		char[] charArr2 = {'안', '녕', '하', '세', '요'};
		for(int i = 0; i < charArr.length; i++) {
			charArr[i] = charArr2[i];
			System.out.print(charArr[i] + " ");
		}
		
		
	}

}
```

1. Quiz-1

```java
public class Swap {
	public static void main(String[] args) {
		
		// A와 B의 스왑 
		char[] arr = new char[]{'A', 'B'};
		System.out.println(arr[0] + " " + arr[1]);
		char temp;
		temp = arr[0];
		arr[0] = arr[1];
		arr[1] = temp;
		for(char c : arr) {
			System.out.print(c + " ");
		}
	}
}
```

![4.png](/assets/images/posts/2022-03-07/4.png)

2. Quiz-2

```java

public class Exam03_Swap {
	public static void main(String[] args) {
		
		char[] hello = {'h','e','l','l','o'};

		/* 
		//hello를 거꾸로 출력해보기
		// 방법1. 
		char temp1;
		char temp2;
		temp1 = hello[4];
		hello[4] = hello[0];
		hello[0] = temp1;
		temp2 = hello[3];
		hello[3] = hello[1];
		hello[1] = temp2;
		for(char c : hello) {
			System.out.println(c);
		}
		*/
		
		// 방법2.
		char tmp;
		for(int i = 0; i < hello.length/2; i++) { // hello.length / 2 = 2.5 인데 int 여서 2 
			tmp = hello[i];
			hello[i] = hello[hello.length-1-i]; // hello.length-1 : hello의 마지막 인덱스 
			hello[hello.length-1-i] = tmp;
		}
		
	}
}
```

- 방법2번 for문에서 조건식 hello.length/2 를 생각하지 못함


### 📙 배열의 복사 

1. 얕은 복사 

```java
public classCopy {

	public static void main(String[] args) {
		// 배열 복사 
		// 얕은 복사 / 깊은 복사 
		
		// 1.얕은 복사
		int[] arr = {1,2,3};
		System.out.println("arr 주소 : " + arr); // I@48cf768c
		System.out.println("복사 전 : " + arr[0]); // 1
		
		int[] arr2 = arr; // arr의 주소값을 arr2에 대입 
		arr2[0] = 10; // arr2와 arr의 주소값이 같아서 arr2[0]을 바꿔도 arr[0]도 바뀌게 된다.
		System.out.println("arr2 주소 : " + arr2); // I@48cf768c
		System.out.println("복사 후 : " + arr[0]); // 10 
		
	}

}
```

![5.jpg](/assets/images/posts/2022-03-07/5.jpg)

- 같은 주소값을 가지는 공간을 가르키게 된다면 얕은 복사
- 한 참조 변수를 통해 값을 수정하면 다른 참조 변수의 주소값의 데이터도 수정된다.



1. 깊은 복사

```java
public class Exam04_Copy {

	public static void main(String[] args) {
		// 깊은 복사 
		int[] arr = {1,2,3};
		System.out.println("arr 주소 : " + arr);
		System.out.println("복사 전 : " + arr[0]); // 1

		int[] arr3 = new int[3];
		for(int i = 0; i < 3; i++) {
			arr3[i] = arr[i];
		}
		arr3[0] = 10;
		System.out.println("arr3 주소 : " + arr3); // I@59f95c5d
		System.out.println("복사 후 : " + arr[0]); // 1
	}

}
```

![6.jpg](/assets/images/posts/2022-03-07/6.jpg)

- 실제 배열 안에 들어있는 값만 복사가 이루어지는 것
- 원본 데이터에 영향을 미치지 않음


### 🧨배열의 삭제
```java
public class Delete {

	public static void main(String[] args) {

		// int 
		int[] arr = {1,2,3};
		// int의 초기값인 0을 이용해 의미없는 값으로 만들어 버리기. 
		arr[1] = 0;
		for(int i : arr) {
			System.out.println(i);
		}
		
		int[] temp = new int[2];
		for(int i = 0; i < temp.length; i++) {
			temp[i] = arr[i];
			System.out.println(temp[i]);
		}
		
		//String 
		String[] temp2 = {"abc" , "가나다", "50"};
		temp2[0] = null;
		for(String i : temp2) {
			if(i != null) //null 값 빼고 출력
			System.out.println(i); 
		}
		
	}

}
```

1. Quiz-1
```java
public class Delete {

	public static void main(String[] args) {

//int 형 배열 안에서 사용자가 입력한 값만 삭제하기.
// 사용자가 입력한 값이 들어있는 인덱스를 0으로 바꾸시오. 
		
		int[] intArr = {1,2,3,4,5,6,7,8,9,10};
		Scanner sc = new Scanner(System.in);
		System.out.print("숫자를 입력하세요 >> ");
		int input = sc.nextInt();
		
		for(int i = 0; i<intArr.length; i++) {
			if(input == intArr[i]) {
				intArr[i] = 0;
			}
		}
		
		for(int i : intArr) {
			System.out.println(i);
		}
	}

}

```

- int 배열은 0으로 String 배열은 null로 삭제