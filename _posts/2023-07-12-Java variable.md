# ◆변수(variable)

-값을 저장할 수 있는 메모리 공간을 말한다.<br/>



## 1)변수 선언 및 초기화

-변수를 사용하기 위해서는 선언(생성)하고 값을 저장(초기화)해줘야 하며 2가지 형식으로 표현이 가능하다.<br/>

-1번째 형식 : ``int(데이터 타입 선택) i;(변수명)``<br/>                        ``i;(변수명) = 10;(데이터)``

```java
public class JavaVariableExample{
    public static void main(String[] args){
        int i;  //변수 선언
        i = 10; //변수 초기화
    }
}
```

-2번째 형식 : ``int(데이터 타입 선택) i(변수명) = 10;(데이터)``

```java
public class JavaVariableExample{
    public static void main(String[] args){
        int i = 10;
    }
}
```



**참고사항** : 변수명은 중복되어선 안된다!!!!

![그림입니다.](file:///C:\Users\hwang\AppData\Local\Temp\Hnc\BinData\EMB00001e705b36.bmp)  

-----> 기존의 변수 C에 데이터 ('비‘)를 대입하려고 했더니 **“Duplicate local variabe c”** 에러가 떳다..  이유는 변수명은 중복이 되면 안되기 때문에 위에 ``char c; c = '씨’;``구문을 없애거나, 재할당  ``c = '비'``을 함으로써  변수 C의 값을 변경할 수 있다.<br/>

  ![그림입니다.](file:///C:\Users\hwang\AppData\Local\Temp\Hnc\BinData\EMB00001e705b39.bmp)  



## 2)변수 데이터 타입

기본 자료형은 제일 앞이 소문자로시작! 객체 자료형은 제일 앞이 대문자로 시작!



### 2_1. 기본 자료형

-기본자료형은 반드시 사용전에 선언 되어야 하며 비객체 타입이여서 null값을 가질 수 없다.

![자료형_기초자료형](C:\Users\hwang\OneDrive\사진\스크린샷\자바 기본문법\JAVA 변수\자료형_기초자료형.png)

![스크린샷(24)](C:\Users\hwang\OneDrive\사진\스크린샷\자바 기본문법\JAVA 변수\스크린샷(24).png)

-char : 문자 1개를 저장 (작은따옴표 사용)<br/>-byte : 2진 데이터를 다루는데 사용<br/>-float : 자바에서 실수의 기본타입은 double형이므로 float형에는 알파벳 'F'를 붙여서 float형임을 명시해주어야 함.





### 2_2. 객체 자료형....???

여러가지 데이터들이 모여 있는 복잡한 데이터로 기본 자료형에 비해 크기가 크다. (예. String, System, ArrayList 등등..) 연산 안됨..



### 2_3. 자료형 변환(casting)

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





## 3) 변수 명명 규칙

1.``식별자 규칙`` <br/>-첫문자가 문자나 '_' , '$'의 특수문자로 시작되어야 한다.<br/>-숫자로 시작될 수 없다.<br/>-대소문자를 구분한다.<br/>-자바의 예약어(키워드)를 사용할 수 없다.<br/>



2.``명칭 표기법``<br/>-카멜 표기법 : 여러단어가 이어지면 첫 단어 시작만 소문자로 표시하고, 각 단어의 첫글자는 대문자로 지정함. ex)inputFunction<br/>-파스칼 표기법 : 여러단어가 이어지면 각 단어의 첫글자를 대문자로 지정함.  ex) InputFunction<br/>-스네이크 표기법 : 여러단어가 이어지면 단어 사이에 언더바를 넣음.  ex)input_function<br/>-헝가리안 표기법 : 식별자 표기시에 접두어에 자료형을 붙임.  int일 경우 n, char일 경우 c, 문자열인 경우 sz  ex)nScore : 정수형<br/>



3.``일반적 관례``<br/> -패키지 이름은 도메인 주소를 거꾸로 정의 ex)net.bizpoll.기능<br/> -클래스 이름은 워드 단위로 첫 글자를 대문자로 정의(파스칼 표기법) ex)AccountManager, ClassName <br/>-메서드 이름은 첫 글자를 소문자로 정의(카멜 표기법)  ex)getValue, get_Value<br/>-변수는 첫 글자를 소문자로 정의(카멜 표기법)  ex)$value, variable_Value<br/>-상수는 대문자의 명사  ex)CONSTANT_VALUE

<br/>



