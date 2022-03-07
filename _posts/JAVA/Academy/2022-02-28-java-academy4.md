---
layout: single
title:  " DAY-04. 자바 국비지원 수업"
categories: JAVA-academy
tag: [JAVA, 국비지원, 조건문]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---
# 2022-02-28


## 📌 자바 수업 
<!--Quote-->
> *본 내용은 국비수업을 바탕으로 작성*

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 



## **1️⃣  과제 코드 비교**

1. 내 코드 

```java
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
	
		Scanner sc = new Scanner(System.in);
		System.out.println("이름은?");
		String name = sc.nextLine();
		System.out.println("학년은?");
		int grade = Integer.parseInt(sc.nextLine());
		System.out.println("반은?");
		int className = Integer.parseInt(sc.nextLine());
		System.out.println("번호는?");
		int num = Integer.parseInt(sc.nextLine());
		System.out.println("성별은?");
		String gender = sc.nextLine();
		String gender2 = (gender.equlas("M") ? "남자" : "여자");
		System.out.println("성적은?");
		double score = Double.parseDouble(sc.nextLine());
		double score2 = (Math.round(score*100)/100.0);
		
		System.out.println(grade + "학년 " + className +
		"반 " + name + " " + gender2  + "의 " + "성적은 "
		+ score2 + "이다." );
		
	}
}
```

1. 강사님 코드 

```java
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("이름 >> ");
		String name = sc.nextLine();
		int grade = Integer.parseInt(sc.nextLine());
		System.out.println("반 >> ");
		int cls = Integer.parseInt(sc.nextLine());
		System.out.println("번호 >> ");
		int num = Integer.parseInt(sc.nextLine());
		System.out.println("성별(M/F) >> ");
		String gender = sc.nextLine();
		gender = gender.equals("M") ? "남학생" : "여학생";
	}
}
```

- 굳이 gender2를 다시 할당 할 필요없이 gender로 받아도 된다.

## **2️⃣ 조건문**

### 1. 기본 조건문

```java
if(조건식) {
		 // 실행 코드 
	}
```

- 조건식이 true이면 코드가 실행되고 false이면 코드가 실행되지 않는다.

### 2. else if / else

```java
import java.util.Scanner;

public class Intro {
	public static void main(String[] args) {
		
		Scanner sc = new Scanner(System.in);
		System.out.println("정수 하나를 입력하시오");
		int num1 = Integer.parseInt(sc.nextLine());
		sc.close();
		
		// if ~ else if 
		// : if부터 else if까지 하나의 조건 묶음 
		// 위쪽부터 검사해 내려오면서 하나라도 조건이 충족하는 순간 조건의 묶음을 나가버린다 → 조건검사 종료
		// else : 위 조건 모두 충족하지 않으면 실행되는 코드 

		System.out.print("직업을 입력하세요 >> ");
		if(num1 == 4) {
			System.out.println("입력한 값은 4입니다");
		}else if(num1 == 5) {
			System.out.println("입력한 값은 5입니다");
		}else {
			System.out.println("잘못된 입력 값입니다.");
		}
	}
}
```

### 3. 간단한 퀴즈 1번

```java
import java.util.Scanner;

public class Intro {
	public static void main(String[] args) {

		/*
		 * 문자열 사전 프로그램
		 * 요리사를 입력하면 cook
		 * 선생님을 입력하면 teacher
		 * 택시기사를 입력하면 taxiDriver
		 * 그 외의 다른 단어를 입력하면 "등록된 단어가 없습니다"
		 * */
		
		Scanner sc = new Scanner(System.in);
		System.out.print("과일을 입력하세요 >> ");
		String str = sc.nextLine();
		if(str.equals("요리사")) {
			System.out.println("cook");
		}else if(str.equals("선생님")) {
			System.out.println("teacher");
		}else if(str.equals("택시기사")) {
			System.out.println("taxiDriver");
		}else {
			System.out.println("등록된 단어가 없습니다.");
		}

	}
}
```

### 4. 간단한 퀴즈 2번 : 조건문으로 만든 계산기

```java
import java.util.Scanner;

public class Calculator {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("==== 계산기 프로그램 ====");
		System.out.print("숫자 입력1 >> ");
		int num1 = Integer.parseInt(sc.nextLine());
		System.out.print("숫자 입력2 >> ");
		int num2 = Integer.parseInt(sc.nextLine());
		System.out.println("");
		System.out.print("연산를 입력(+,-,*,/) ");
		String opt = sc.nextLine();
		if(opt.equals("+")) {
			System.out.println(num1 + " + " + num2 + " = " + (num1+num2));
		}else if(opt.equals("-")) {
			System.out.println(num1 + " - " + num2 + " = " + (num1-num2));
		}else if(opt.equals("*")) {
			System.out.println(num1 + " * " + num2 + " = " + (num1*num2));
		}else {
			System.out.println(num1 + " / " + num2 + " = " + (num1/num2));
		}

	}
}
```
- String은 " == " 이 아닌 equls() 로 비교한다

### 5. 심화 퀴즈 (중첩 if문)

```java
import java.util.Scanner;

public class If {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.print("수 입력 >> ");
		int input = Integer.parseInt(sc.nextLine());
		
		// 입력된 점수에 따라 해당하는 결과를 출력 
		/*
		 * 100점 : 학업우수상 
		 * 70~99점 : 시험 통과
		 * 69점 이하 : 재시험 대상
		 * 그 중 30점 이하 : 보충학습 대상 
		 * 
		 * */
		
		if(input == 100) {
			System.out.println("학업우수상");
		}else if(input >= 70 && input <= 99) {
			System.out.println("시험 통과");
		}else if(input <= 69) {
			System.out.println("재시험 대상");
			if(input <= 30) {
				System.out.println("보충학습 대상");
			}
	}
}
```

### 6. switch / case

```java
public class Switch {
	public static void main(String[] args) {
		/*
		 * switch : 조건문은 if문과 유사 
		 * 
		 * switch(값){
		 * 	case 조건 : 실행코드
		 * 	case 조건 : 실행코드
		 * 	case 조건 : 실행코드
		 * 	case 조건 : 실행코드
		 * }
		 * 
		 * */
		
		switch("사과") {
		case "바나나" :
			System.out.println("바나나 입니다");
			break;
		case "사과" :
			System.out.println("사과 입니다");
			break;
		case "파인애플" :
			System.out.println("파인애플 입니다");
			break;
		}
		
	}

}
```

- break가 없다면 아래와 같은 결과가 나온다 case가 사과 일때 실행되고 그 뒤에 코드도 실행이된다(파인애플)
    
    ![1.png](/assets/images/posts/2022-02-28/1.png)
    
- 뒤의 코드를 실행시키지 않기 위해서는 break; 를 해줘야한다
    - break를 만나는 순간 코드는 멈춘다
    
    ![2.png](/assets/images/posts/2022-02-28/2.png)


```java
public class Switch {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		System.out.println("숫자를 입력하세요 ");
		int num = Integer.parseInt(sc.nextLine());
		sc.close();
		switch(num) {
		case 1 : 
			System.out.println("1을 입력했다");
			break;
		case 2 :
			System.out.println("2를 입력했다");
			break;
		case 3 :
			System.out.println("3을 입력했다");
			break;
		default : 
			System.out.println("잘못 입력했습니다"); // 1,2,3을 제외한 숫자를 입력시
			break;
		}
	}
}
```
- 입력을 받아 해당하는 case의 코드 실행
- default는 if 조건문의 else역할