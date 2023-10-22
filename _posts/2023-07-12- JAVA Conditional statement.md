---
layout: single
title:  "JAVA - Conditional statment"
categories: Java
tag: [JAVA, Conditional statment]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





# ◆조건문

개발자가 작성한 코드를 **조건에 따라 코드의 실행 흐름을 다르게 동작하도록 제어하는 것**이다.<br/>즉, 입력된 값에 따라 원하는 방향으로 동작하도록 할 수 있다.

<br/>





# ◆if문

-if문은 특정조건 만족 시 실행하는 명령의 집합이며, if는 필수 else if는 추가조건으로 조건이 여러개일 때 넣어줄 수 있다.<br/>-if문 작성 시 주의해야될 점은 범위를 작은것 부터 큰거순으로 적용해야 된다.<br/>-if문의 **조건식은 boolean값으로 표현**되도록 한다.(주로 비교연산자 또는 논리연산자 사용)<br/>-else는 생략가능하다.<br/>



## 1)단순 if

-조건을 판단하여 참일 경우에만 실행 하는 기능이다.<br/>-**조건식**의 산출값이 **boolean(true, false)**형태로 표현되어야 한다.<br/>

```java
/*형식
 if(조건식){
    조건식이 참일때만 실행되는 문장;
 }
*/

public class Main {

	public static void main(String[] args) {
		int num = 11; 
		boolean modData = num % 2 == 0; // 조건식은 변수선언해주는게 유지관리가 편리하다.

		if (modData) {
			System.out.println(num + "은 짝수입니다.");
		}
		if (!modData) { // modData값이 false일때, 또는 변수를 사용하지 않을경우 num % 2 != 0 조건식 표현가능

			System.out.println(num + "은 홀수 입니다.");
		}
	}
}
```

위의 예제에서 if문의 조건식을 변수로 선언하는 이유는,<br/>**!modData** 처럼 조건식에 연산자를 사용하기 편리하고 추후에 유지관리가 편리하기 때문에 논리형타입(boolean)에 조건식을 담아서 표현하는 방법이 좋다.<br/>

modDate변수의 반대값을 표현해 주기 위해서는 **논리부정연산자(! ,!= )**를 사용하여 표현한다. <br/>

 



## 2)if_else

-조건식을 판단하여 true이면 if절에 작성한 문장을 실행하고, false이면 else절에 작성한 문장을 실행한다.<br/>

```java
/*형식
 if(조건식) { 
    참일때 실행되는 문장; 
 } 
 else{ 
    거짓일때 실해되는 문장; 
 }
*/

public class Main {

	public static void main(String[] args) {
		int a = 10;
		
		if (a % 2 == 0) {
			System.out.println("짝수입니다.");
		} else {
			System.out.println("홀수입니다.");
		}
	}
}
```

변수 a 의 값이 10으로 주어졌을 때 2로 나눈값이 0이기 때문에 "짝수입니다."가 출력된다.<br/>





## 3) elseif

-여러개의 조건을 판단하여 조건을 만족할 경우 실행한다.

```java
/*형식
 if(조건식1){ 
    조건식1이 참일때 실행되는 문장; 
 }else if(조건식2){ 
    조건식2가 참일때 실행되는 문장; 
 }... 
 else{ 
    거짓일때 실행되는 문장; 
 }
*/

public class Main {

	public static void main(String[] args) {
		int genCode = 5;

		if (genCode == 1 || genCode == 3) {
			System.out.println("남자");
		} else if (genCode == 2 || genCode == 4) {
			System.out.println("여자");
		} else {
			System.out.println("오류");
		}
	}
}
```

위의 예제에 if문의 조건식은 비교연산자와 논리연산자를 사용하여 표현을 해주었다.<br/>genCode값이 1또는 3인 경우에는 "남자"가 출력되도록 하고, 만약 아니라면 else if절로 넘어가서<br/>genCode값이 2또는 4인 경우에는 "여자"가 출력되도록 하고, 그 외의 값은 오류가 출력되도록 설정한 else if문 이다.



### 4) 이중 if문

-if문 안에 다른 if문이 있는 구문이다.<br/>

```java
/*형식
 if(조건식A){ 
    if(조건식1){ 
       조건식1이 참일 때 실행되는 문장; 
    }
  }
*/

public class Main {

	public static void main(String[] args) {
		int j = 89;

		if (j >= 0 && j <= 100) {
			if (j >= 90) {
				System.out.println("A");
			} else if (j >= 80) {
				System.out.println("B");
			} else if (j >= 70) {
				System.out.println("C");
			} else {
				System.out.println("F");
			}
		} else {
			System.out.println("에러");
		}
	}
}
```

첫번째 if문의 조건식에는 점수의 범위를 지정하여 0부터 100사이의 값이 변수 j 에 담겼을 때  다음 if문으로 실행되고, 그 외의 값이 변수 j 값에 담기면 "에러"문구가 출력 되도록 설정한것이다.

<br/>





# ◆switch문

-switch는 **기준값이 딱 하나로 떨어지는 값(정수)**을 가지기 때문에 그 값에 해당되는 case를 바로 찾아가 명령문을 출력하는 문법이다.<br/>-그래서 조건을 단계별로 분석하는 if문보다 switch문이 속도가 더 빠르다.<br/>-값이 딱 하나로 떨어지는 경우에만 사용이 많이 되기 때문에 주로 산술연산자를 사용하여 기준값을 표현한다.<br/> -string 타입도 표현가능하다.(자바 7버전부터)<br/>-default값 생략가능.<br/>

```javascript
/*형식
  switch(기준값){ 
    case 값1 : 
       값1이 참일때 실행되는 문장; 
       break; 
    case 값2 : 
       값2이 참일때 실행되는 문장; 
       break; 
    default : 
       거짓일때 실행되는 문장;
       break;
      //default값 생략 가능
   }
 */

public class Main {

	public static void main(String[] args) {
		int j = 95;
		
		switch (j / 10) {
		case 10: //10~9까지
		case 9:
			System.out.println("A");
			break;
		case 8:
			System.out.println("B");
			break;
		case 7:
			System.out.println("C");
			break;
		default:
			System.out.println("F");
		} 
        sc.close();
	}
}
```

switch의 기준값은 변수 j에 10을 나눈 나머지의 값에 따라 명령문을 출력하도록 설정을 하였다. <br/>그래서 case 10 :, case 9: 는 100점부터 90점까지를 표현을 해주었고 case10: 의 명령문은 ``System.out.println("A");``으로 중복되기 때문에 생략하였다. <br/>명령문마다 **break;**를 작성하여 다음 case값과 상관없이 연달아서 실행되지 않도록 하였다.
