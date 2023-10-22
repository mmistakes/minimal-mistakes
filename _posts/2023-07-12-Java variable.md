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







# ◆변수 선언 및 초기화

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







# ◆변수 데이터 타입

-기본자료형과 객체자료형으로 나뉜다.<br/>-기본 자료형은 제일 앞이 소문자로시작하고 객체 자료형은 제일 앞이 대문자로 시작한다.<br/>







## 1) 기본 자료형

-기본자료형과 변수명을 정해서 변수를 선언하면 자료형에 해당하는 크기를 가지는 변수명으로 된 공간을 메모리 확보하고 데이터 값을 저장하는 방식이다.<br/>-비객체 타입이여서 null값을 가지면 에러가 뜨기 때문에, 조건문``<if test = ' '>``형식으로 null값을 처리하는 방식으로 사용하는것을 권장한다.<br/>

![images](\images\2023-07-12-Java variable\자료형_기초자료형-1689402438043-6-1689402456256-8.png){: .img-row-center}

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







## 2) 자료형 변환(casting)

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







## 3)객체 자료형

-객체자료형은 메모리 상에서 데이터가 저장된 주소값을 가지는 자료형이며, 해당 값은 객체를 참조하는 변수 타입을 의미한다.

<br/>

