---
layout: single
title:  "JAVA - variable"
categories: Java
tag: [JAVA, variable]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





# ◆변수(variable)

-값을 저장할 수 있는 메모리 공간을 말한다.

<br/>





# ◆변수 명명 규칙



## 1. 식별자 규칙

-첫문자가 문자나 '_' , '$'의 특수문자로 시작되어야 한다.<br/>-숫자로 시작될 수 없다.<br/>-대소문자를 구분한다.<br/>-자바의 예약어(키워드)를 사용할 수 없다.<br/>



## 2. 명칭 표기법

|     표기법      | 설명                                                         | 예제            |
| :-------------: | ------------------------------------------------------------ | --------------- |
|   카멜 표기법   | 여러단어가 이어지면 첫 단어 시작만 소문자로 표시하고, 각 단어의 첫글자는 대문자로 지정함. | inputFunction   |
|  파스칼 표기법  | 여러단어가 이어지면 각 단어의 첫글자를 대문자로 지정함.      | InputFunction   |
| 스네이크 표기법 | 여러단어가 이어지면 단어 사이에 언더바를 넣음.               | input_function  |
| 헝가리안 표기법 | 식별자 표기시에 접두어에 자료형을 붙임.  int일 경우 n, char일 경우 c, 문자열인 경우 sz | nScore : 정수형 |



## 3.일반적인 관례

-패키지 이름은 도메인 주소를 거꾸로 정의 ex)net.bizpoll.기능<br/>-클래스 이름은 워드 단위로 첫 글자를 대문자로 정의(파스칼 표기법) ex)AccountManager, ClassName <br/>-메서드 이름은 첫 글자를 소문자로 정의(카멜 표기법)  ex)getValue, get_Value<br/>-변수는 첫 글자를 소문자로 정의(카멜 표기법)  ex)$value, variable_Value<br/>-상수는 대문자의 명사  ex)CONSTANT_VALUE

<br/>





## 1)변수 선언 및 초기화

-변수는  사용되기 전에 선언되어야한다.<br/>-변수를 사용하기 위해서는 선언(생성)하고 값을 저장(초기화)해줘야 하며 2가지 형식으로 표현이 가능하다.<br/>

-1번째 형식 : ``int(데이터 타입 선택) i;(변수명)``<br/>                        ``i;(변수명) = 10;(데이터)``

```java
public class Main{
    public static void main(String[] args){
        int i, j;  //변수 선언
        i = 10; //변수 초기화
        j = 11;
    }
}
```

-2번째 형식 : ``int(데이터 타입 선택) i(변수명) = 10;(데이터)``

```java
public class Main{
    public static void main(String[] args){
        int i = 10;
    }
}
```

<br/>





## 2)변수 데이터 타입

-기본자료형과 객체자료형으로 나뉜다.<br/>-기본 자료형은 제일 앞이 소문자로시작하고 객체 자료형은 제일 앞이 대문자로 시작한다.<br/>



### 2_1. 기본 자료형

-기본자료형과 변수명을 정해서 변수를 선언하면 자료형에 해당하는 크기를 가지는 변수명으로 된 공간을 메모리 확보하고 데이터 값을 저장하는 방식이다.<br/>-비객체 타입이여서 null값을 가지면 에러가 뜨기 때문에, 조건문``<if test = ' '>``형식으로 null값을 처리하는 방식으로 사용하는것을 권장한다.<br/>

![images](...\images\2023-07-12-Java variable\자료형_기초자료형-1689402438043-6-1689402456256-8.png)

```java
public class Main{
    public static void main(String[] args){
        char c = '씨';
        int i = 10;
        float f = 3.14f;
        double d = 3.14;
        boolean b = true;
        Long g = 15000000000L;
    }
}
```

-char : 문자 1개를 저장 (작은따옴표 사용)<br/>-int : 정수타입으로 숫자가 들어간다.<br/>-float : 자바에서 실수의 기본타입은 double형이므로 float형에는 알파벳 'F'를 붙여서 float형임을 명시해줘야함.<br/>-double : 소수점 형태의 실수 타입을 넣어준다.<br/>-boolean : true 또는 false의 값이 나오는 데이터를 넣어준다.<br/>-Long : 4바이트가 넘어가는 숫자를 사용할때에는 Long데이터 타입을 사용한다. 이때, 데이터 끝에 "L"을 붙여서 사용한다.<br/>





### 2_2. 자료형 변환(casting)

-묵시적 변환 : 작은 공간의 메모리에서 큰 공간의 메모리로 이동을 뜻하며 컴파일러가 자동으로 실행해주는 타입변환을 말한다.

```java
int i = 100;
double d = i;
```

-명시적 변환 : 큰 공간의 메모리에서 작은 공간의 메모리로 이동을 뜻하며 사용자가 타입 캐스트 연산자를 사용하여 강제적으로 수행하는 타입변환을 말한다.

```java
double d = 10;
int i = (int)d
```

**기본형 타입에서 boolean을 제외한 나머지 타입만 형변환이 가능하다.





### 2_3. 객체 자료형

-객체자료형은 메모리 상에서 데이터가 저장된 주소값을 가지는 자료형이며, 해당 값은 객체를 참조하는 변수 타입을 의미한다.

<br/>







# ◆객체(object)

-객체란 속성(객체가 가진 고유의 특성), 기능(객체의 행동특성)이 묶이 프로그램 단위를 말한다.<br/>자바에서 보면 속성은 멤버변수이고 기능은 메소드이다.



## 1)객체 생성과 클래스 변수

-하드웨어(DB,HDD,SDD) 클래스로부터 객체를 생성하는 방법은 new연산자를 사용하여 class을 메모리로 끌어 올릴 수 있다.<br/

예시로 Scanner 클래스와 DecimalForamt클래스에 대해 알아보자!!!!!

<br/>





### 1. import문 추가

-다른 패키지 안의 클래스를 사용하기 위해서는 import를 해주어야 한다.(eclips에서 자동생성됨)<br/>

*Scanner 클래스 : 화면으로부터 데이터를 입력받는 기능을 제공하는 클래스<br/>

*DecimalFormat 클래스 : 진수, 10진수를 형식화하는 기능을 제공하는 클래스

```java
import java.util.Scanner;

import java.text.DecimalFormat;
```

<br/>





### 2. 클래스 객체 생성(인스턴스)

-메모리 내에서 객체의 위치를 알 수 있도록 **new**연산자를 사용하여  객체를 생성후에 객체의 주소를 반환한다.<br/>-new 연산자로 생성된 객체는 힙 메모리 영역에 생성되며 이렇게 만들어진 객체를 해당 클래스의 인스턴스(instance)라고 한다. <br/>-클래스 객체를 생성하고 객체클래스 크기에 맞게 객체타입을 지정해주기 위해 클래스 이름과 똑같이 지정한다.<br/>-형식 : ``객체이름 객체참조변수명 = new 생성자(객체이름)(매개변수);``<br/>매개변수에 어떠한 값을 넣는지에 따라 기능이 바뀐다.<br/>

*System.in : 화면에서 입력을 받겠다는 의미<br/>

*0 : 값이 없는 자리는 0으로 채움 / # : 값이 없는 자리는 나타나지 않음

```java
Scanner sc = new Scanner(System.in);

DecimalFormat df = new DecimalFormat("0"); // 빈자리는 0으로 채움
```

<br/>





### 3. 객체사용

-입력받을 내용이 string이 아닌 char 이면,  변수 char inputchr 선언하고 sc.nxtLine()은 문자열을 표현해주기 때문에 charAt(0)함수를 사용하여 char(문자)타입으로 변경해준다.<br/>

*접근연산자(.) : 클래스객체에 객체참조변수는 참조주소밖에 표시가 안되기 때문에 객체에 접근하기 위해서 .을 사용하여 생성자에 접근해서 정보를 활용한다. 즉 포맷매소드 안에 있는 정보를 가져오는데 사용값을 주입한다. 

*charAt() = string 타입으로 받은 문자열을 char타입으로 한글자만 받는 함수이다. 

```java
//Scanner클래스 사용
char inputchr = sc.nextLine().charAt(0);
System.out.println(inputchr)

//DecimalFormat클래스 사용
double n = 데이터값;
System.out.println(sc.format(n));
```



*메소드 : 객체의 동장과 기능을 담당해서 변수에 저장된 데이터를 수정 및 조회할 수 있다.<br/>

| Scanner 메소드 | 설명                                                         |
| :------------: | ------------------------------------------------------------ |
|     next()     | 통째로가 사용자가 입력한 문자열 값(엔터치기 전 공백은 포함되지 않는다.) |
|   nextInt()    | 통째로가 사용자가 입력한 정수 값                             |
|   nextLine()   | 통째로가 사용자가 입력한 문자열 값(엔터치기 전 공백까지 포함한다.) |

| DecimalFormat메소드 | 설명                                             |
| :-----------------: | ------------------------------------------------ |
|       format        | 다양한 형태로 숫자형 변수를 받아 출력할 수 있다. |

<br/>





위의 객체생성과정을 표현하자면 아래와 같다.<br/>

```java
import java.util.Scanner;

public class Main {
    
 public static void main(String[] args) {
     Scanner sc = new Scanner(System.in); // new 생성자 -> 객체생성(인스턴트화)
	 System.out.println("문자를 입력해주세요");
     
	 char inputchr = sc.nextLine().charAt(0);
     System.out.println(inputchr);
  }
 }
```

```java
import java.text.DecimalFormat;

public class Main{
    public static void main(String[] args){
        DecimalFormat sc = new DecimalFormat(0.0);
        System.out.println("문자를 입력해주세요");
        
        double n = 데이터값;
        System.out.println(sc.format(n));
        
    }
}
```

