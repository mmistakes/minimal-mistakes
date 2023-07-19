---
layout: single
title:  "JAVA - basic gramma"
categories: Java
tag: [JAVA]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"
---

<br/>





## < 데이터 단위>

-비트 :  컴퓨터는 0과 1로만 표현이 되는데 이때, 0 또는 1을 bit라고 한다. 즉, 1bit는 컴퓨터에서 신호를 내보내는 최소단위라고 보면 된다.<br/>-바이트 : 정보를 표현을 하기 위해서 즉 한개의 문자를 만들기 위해서는 8개의 bit가 필요한데 이를 1 Byte라고 한다. 따라서 1Btye는 0과 1의 두 종류의 Bit가 8개로 구성되어 있기 때문에 2의 8승으로 계산해서 256개의 정보를 나타낼 수 있다.<br/>-데이터의 단위의 기준은 1,024 이며 0과 1의 2진법에서 2의 10승을 기준으로 단위를 구분한다.<br/>

**-비트 -> 바이트 -> 킬로바이트 -> 메가바이트 -> 기가바이트 -> 테라바이트**

![화면 캡처 2023-07-08 132836](C:\Users\hwang\github blog\pueser.github.io\images\20223-07-19-Java basic gramma\화면 캡처 2023-07-08 132836.png)

<br/>







# ◆JAVA 란?

java는 제임스 고슬링과 연구원들이 개발한 객체 지향적 프로그래밍 언이이다.  자바로 개발된 프로그램은 자바 실행환경 JRE가 설치된 모든 환경에서 실행이 가능하다.  <br/>



**특징**<br/>

1. JVM(자바가상머신)을 사용함으로써 어떠한 플랫폼에 영향을 받지 않는다.<br/>
2. garbage collection가 불필요한 메모리를 정리하여 프로그래머가 메모리 할당과 재할당을 수동으로 조작할 필요가 없게 해준다.<br/>
3. 정해진 순차적으로 실행되는 절차지향언어가 아닌 객체지향언어이기 때문에 유지보수가 편리하다.<br/>

<br/>







# ◆JAVA 언어 플랫폼



## 1)Java SE (Java Standard Edition)

Java SE의 API는 자바 프로그래밍 언어의 핵심기능들을 제공한다. 기초적인 타입부터 네트워킹, 보안, 데이터베이스 처리, 그래픽 사용자 인터페이스 등 다룰 수 있으며 가상머신, 개발도구, 배포기술 그리고 자바기술을 사용하는 어플리케이션에서 일반적으로 사용되는 부가적인 클래스 라이브러리들과 툴킷을 제공하고 있다.

<br/>





## 2)Java EE(Java Enterprise Edition)

Java EE플랫폼은 Java SE플랫폼 기반으로 그 위에 탑재된다. 대규모, 다계층, 확장성, 신뢰성 그리고 보안 네트워킹 어플리케이션의 개발과 실행을 위한 API 및 환경을 제공한다.

<br/>





## 3)Java ME (Java Platform Micro Edition)

모바일 폰과 같이 자바 프로그래밍 언어 기반의 어플리케이션이 보다 조그만 가상머신으로 동작시킬 수 있는 기능과 API를 제공한다.

<br/>







# ◆JAVA 환경구조

![images](\images\Users\hwang\github blog\pueser.github.io\images\20223-07-10-Java basic gramma\JAVA 환경구조.png){: .img-row-center}





##  1) JRE(자바실행환경, Jvav Runtime Environment)

자바프로그램을 실행 시키기 위해서는 JVM과 기타 라이브러리들이 필요한데 이것들을 묶어서 JRE라고 한다. <br/>JRE가 JVM을 담고 있으며 JVM과 시스템 라이브러리를 이용해 컴파일된 자바 코드를 실행한다. 또한 자동메모리 관리로 프로그래머가 메모리 할당과 재할당을 수동으로 조작할 필요가 없게 해주는 jre의 중요한 서비스 이다.

<br/>





## 2)JVM(자바가상머신, Java Virtual Machine)

자바 바이트 코드를 각 운영체제에 맞는 기계어로 바꾸어 실행될 수 있는 환경을 제공한다. 그래서 JVM이 운영체제 위에서 자바 바이트 코드를 받아 각 운영체제에 맞는 기계어로 바꿔주기 때문에 자바는 플랫폼 독립적으로 실행 될 수 있는것 이다.

<br/>





## 3)JDK(자바개발도구, Java Devlopment Kit)

개발자들이 Java로 프로그램을 만들 수 있도록 컴파일러(javac), 디버깅 툴 등을 제공한다. JDK가 자바 기반 소프트웨어를 개발하기 위한 도구들로 이뤄진 패키지인 반면,  JRE는 자바 코드를 실행하기 위한 도구들로 구성된 패키지라는 차이점이 있다.

<br/>



*API(application programming interface) :  운영체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스 이다. 대표적으로 System.out.println은 입력만하면 출력할 수 있도록 개발자들이 미리 만들어 놓은것 이다.<br/> <a href="https://https://docs.oracle.com/javase/8/docs/api/" target="blank" title=" java api document"> java api document</a>

*IDE : 통합개발환경으로써 코딩, 디버그, 컴파일, 배포 등 프로그램 개발에 관련된 모든 작업을 하나의 프로그램 안에서 처리하는 환경을 제공하는 소프트웨어이다.<br/>

*자바 바이트 코드 : 자바파일을 컴파일 하면 .class의 확장자를 가진 파일을 얻을 수 있는데 이 파일이 자바 바이트 코드로 이루어진 파일이다.  변환되는 코드의 명령어 크기가 1바이트라서 자바 바이트 코드라고 불린다.  

<br/>







# ◆연산자

-산술, 부호, 문자열, 대입, 증감, 비교 연산자로 구분하고, 피연산자 수에 따라 단항, 이항, 삼항 연산자로 구분한다.<br/>-종류 :산술, 자동증감(전위, 후위연산자), 동등비교, 관계연산자, 논리(이항), 삼항, 할당, 줄여쓰는 연산자 등<br/>

* 우선순위 : *** > % > + > - **

<br/>



## 1)연산자 종류

![연산자 종류](C:\Users\hwang\github blog\pueser.github.io\images\20223-07-19-Java basic gramma\연산자 종류.png)

연산자 중 자주 사용하는 산술연산자, 대입연산자, 논리연산자에 대해 더 자세히 정리해 보았다.

<br/>



## 1.1 산술연산자

![산술연산자](C:\Users\hwang\github blog\pueser.github.io\images\20223-07-19-Java basic gramma\산술연산자.png)

<br/>



## 1.2 대입연산자

![비교연산자](C:\Users\hwang\github blog\pueser.github.io\images\20223-07-19-Java basic gramma\비교연산자.png)

<br/>



## 1.3 논리연산자

![논리연산자](C:\Users\hwang\github blog\pueser.github.io\images\20223-07-19-Java basic gramma\논리연산자.png)

<br/>







# ◆eclips

-이클립스(eclipse)는 자바(JAVA) IDE이다.<br/>

 

**<단축키>**<br/>

|              종류               | 설명                                                         |
| :-----------------------------: | ------------------------------------------------------------ |
|      **Ctrl + Shift + F**       | 소스코드 자동 정리                                           |
|      **Ctrl + shift + R**       | Open Resource. 모든 프로젝트에서 파일명 검색                 |
|      **Ctrl + Shift + /**       | 선택 영역 Block Comment 설정                                 |
|      **Ctrl + Shift + \ **      | 선택 영역 Block Comment 제거                                 |
|    **Ctrl + Alt + up/down**     | 한줄 duplicate                                               |
|         **Ctrl + F11**          | 실행                                                         |
|          **Ctrl + D**           | 한줄삭제                                                     |
|        **Ctrl + space**         | 어휘의 자동완성(Content Assistance)                          |
| **"syso" + contrl + space bar** | 콘솔문 자동완성                                              |
|         **Alt + 방향**          | 현재 줄 위치이동                                             |
|             **TAB**             | 들여쓰기                                                     |
|          **// TODO **           | 개발을 진행해야 되는데 진행을 할 수 없어 TODO로 남겨두어 추후에 개발진행을 하려고 표시하는 기능 |
|           **crtl+H**            | Find 및 Replace                                              |
|           **crtl+y**            | 실행취소 되돌리기                                            |
|        **ctrl+shift+O**         | 소스에 필요한 패키지를 자동으로 import시킴                   |
|             **F11**             | 디버깅 시작                                                  |
|             **F8**              | 디버깅 계속                                                  |
|             **F5**              | step into                                                    |
|             **F6**              | step over                                                    |

<br/>



**<주석>**<br/>

-주석은 주로 프로그래밍한것을 기록해놓아 동료들과의 협업에 용이하게 사용한다.<br/>

|                             종류                             | 설명          |
| :----------------------------------------------------------: | ------------- |
|                        // 안녕하세요                         | 한줄 주석     |
|                       / * 안녕하세요*/                       | 문장 주석     |
| /* 안녕하세요<br/> * 반가워요 <br/> * 앞으로 <br/>잘부탁드려요*/ | 여러문장 주석 |

<br/>





# ◆패키지

-패키지는 클래스의 묶음이다. 클래스를 사용할 때 패키지를 import해서 사용한다.<br/>

```java
package com.practice.object //패키지 선언
    public class 클래스명{   //클래스 선언
        메소드지정{
            연산문장
        }
    }
```

<br/>





# ◆클래스(class)

클래스는 고유성을 가진 객체가 모여 개념화된 특성을 정의한 것이다. 즉, 클래스의 정의대로 객체가 연산자를 통해 메모리 영역에 생성되는 것이다.

<br/>





# ◆객체(object)

-객체란 속성(객체가 가진 고유의 특성), 기능(객체의 행동특성)이 묶이 프로그램 단위를 말한다.<br/>자바에서 보면 속성은 멤버변수이고 기능은 메소드이다.<br/>



## 1)객체 생성과 클래스 변수

-하드웨어(DB,HDD,SDD) 클래스로부터 객체를 생성하는 방법은 new연산자를 사용하여 class을 메모리로 끌어 올릴 수 있다.<br/>

예시로 Scanner 클래스와 DecimalForamt클래스에 대해 알아보자!!!!!

<br/>





### 1_1 import문 추가

-다른 패키지 안의 클래스를 사용하기 위해서는 import를 해주어야 한다.(eclips에서 자동생성됨)<br/>

*Scanner 클래스 : 화면으로부터 데이터를 입력받는 기능을 제공하는 클래스<br/>

*DecimalFormat 클래스 : 진수, 10진수를 형식화하는 기능을 제공하는 클래스

```java
import java.util.Scanner;

import java.text.DecimalFormat;
```

<br/>





### 1_2. 클래스 객체 생성(인스턴스)

-메모리 내에서 객체의 위치를 알 수 있도록 **new**연산자를 사용하여  객체를 생성후에 객체의 주소를 반환한다.<br/>-new 연산자로 생성된 객체는 힙 메모리 영역에 생성되며 이렇게 만들어진 객체를 해당 클래스의 인스턴스(instance)라고 한다. <br/>-클래스 객체를 생성하고 객체클래스 크기에 맞게 객체타입을 지정해주기 위해 클래스 이름과 똑같이 지정한다.<br/>-형식 : ``객체이름 객체참조변수명 = new 생성자(객체이름)(매개변수);``<br/>매개변수에 어떠한 값을 넣는지에 따라 기능이 바뀐다.<br/>

*System.in : 화면에서 입력을 받겠다는 의미<br/>

*0 : 값이 없는 자리는 0으로 채움 / # : 값이 없는 자리는 나타나지 않음

```java
Scanner sc = new Scanner(System.in);

DecimalFormat df = new DecimalFormat("0"); // 빈자리는 0으로 채움
```

<br/>





### 1_3. 객체사용

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

|     메서드     | 기능                                                         |
| :------------: | ------------------------------------------------------------ |
|   **next()**   | **String**을 읽음. 단, **띄어쓰기 뒷부분은 읽지 않음**.      |
| **nextLine()** | **String**을 읽음. **띄어쓰기를 포함하여 한 줄(즉, Enter를 치기 전까지)을 읽음**. |
| **nextInt()**  | **int** 를 읽음.                                             |

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

<br/>





# ◆메소드(Method)

-메소드는 객체 간데이터의 교류되는 프로그램화한 명령 메시지 단위이다. 동작처리내용을 말한다.(다른 언어에서는 함수(function)으로 불린다.)<br/>

-형식 : ``[접근제한자 ] [리턴타입] [메소드명] [(매개변수)]{}``

![메소드](C:\Users\hwang\github blog\pueser.github.io\images\20223-07-19-Java basic gramma\메소드.png)

**매개변수 표현식**<br/>

|       표현식       | 예제                                          |
| :----------------: | --------------------------------------------- |
| 매개변수X 리턴값O  | public int info(){<br/>Return 0;<br/>}        |
| 매개변수X 리턴값X  | public int info(){<br/>}                      |
| 매개변수O 리턴값 O | public int info(int age){<br/>Return 0;<br/>} |
| 매개변수O 리턴값X  | public int info(){<br/>}                      |

<br/>





## 1)main 메소드 

-main 메소드는 **프로그램의 시작점** 역할을 하는 JAVA의 약속된 내용이다. 즉, main 메소드가 없는 프로그램은 별도로 동작할 수가 없다. 컴퓨터가 소스 코드를 읽을 때 main 메소드를 실행하고 거기에 정의된 로직에 따라 프로그램이 동작하게 된다.<br/>

-**void란** 메소드가 아무런 값도 반환 하지 않음을 의미한다. 메소드의 이름 위치에는 main이 적혀져 있고, 파라미터로는 String[] args라는 내용이 위치한다.<br/>

```java
public class Main {
  public static void main(String[] args) {
     System.out.println();
  }
}
```

<br/>



## 2)메소드 매개변수 & 인자

-매개변수(parameter)란 외부로부터 입력 값을 받기 위해 메소드의 괄호 안에 선언하는 변수이다.<br/>

```java
public class Main {
    public static int add (int a, int b) {
        return a + b;
    }
    public static void main(String[] args) {
     System.out.println(add(3,5));
    }
}
```

main 메소드가 먼저 실행이 되고 add메소드를 호출하는 add(3, 5)에서 3과5가 인자이다. add 메소드에서  3과 5값을 int형 변수 a, b로 받는다. 이때 ( )안에 있는 int a, int b가 매개변수이다.<br/>
