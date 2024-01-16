---
title: "[Java] 자바 예외처리"
excerpt: "자바 예외 클래스의 계층구조와 예외처리하기 try-catch문 실습"

categories:
  - Java
tags:
  - [java, exception]

permalink: /java/java6/

toc: true
toc_sticky: true

date: 2024-01-16
last_modified_at: 2024-01-16
---

ref -Java의 정석(남궁성) 
{: .notice--info}

## 📌예외처리(exception handling)

### ✅프로그램 오류란?
프로그램이 실행 중 어떤 원인에 의해서 오작동을 하거나 비정상적으로 종류되는것을 프로그램 오류 또는 에러라고 한다. 

프로그램 오류 3가지로 나눈다

```
컴파일 에러 : 컴파일 시에 발생하는 에러
런타임 에러 : 프로그램 실행시 발생하는 에러
논리적 에러 :실행은 되지만, 의도와 다르게 작동하는것(ex 창고의 제고가 음수가 된다거나,
게임 프로그램에서 비행기가 총알을 맞아도 죽지 않는 경우)
```

* **컴파일 에러**는 소스코드가 컴파일 하면 컴파일러가(.java)에 대한 오타나 잘못된 구문,자료형 체크 등의 기본적인 검사를 수행하여 오류가 있는지 알려준다. 컴파일러가 알려준 에러들을 모두 수정해서 컴파일을 성공적으로 마치면, 클래스 파일(.class)아 생성이되고, 생성된 클래스 파일을 실행할수 있게 되는것이다.

* **런타임 에러**는 **에러(error)와** **예외(exception)** 두가지로 구분함.


```
런타임 에러 종류
에러(error): 프로그램 코드에 의해서 수숩될 수없는 심각한오류
예외(exception): 프로그램 코드에 의해서 수습될 수 있는 덜 심각한 오류
```

---


### ✅예외 클래스 게층구조

자바에서는 실행시 발생할수 있는 오류(Exception과 Error)를 클래스로 정의하였다.

![image description](/assets/images/exception.png.)<br>

![image description](/assets/images/exception2.png.)<br>

예외 클래스들은  두 그룹으로 나눠진다. 
* Exception 클래스와 그자손들 (RuntimeException과 자손들 제외)
* runtimeException 클래스와 그 자손들과 

```
* Exception 클래스들: 사용자가 발생하는 예외. ex) 존재하지 않는 파일의 이름을 적는경우
입력된 데이터 형식이 잘못된 경우.
* Excepton클래스들은 컴파일러가 예외 처리 여부를 확인하는 checked 예외임.
예외처리가 필수임.

RuntimeException 클래스들: 프로그래머 실수로 발생하는 예외.
 ex)배열범위를 벗어나거나, 형변환을 잘못했거나 등등.
RuntimeException 클래스들은 컴파일러가 예외 처리 여부를 확인하지 않는 uncheck예외이다.
그래서 예외처리를 꼭해주지 않아되 된다.

```

---


### ✅예외 처리하기 -try-catch문

```
예외처리(exception handling)
정의- 프로그램 실행 시 발생할 수 있는 예외에 대비한 코드를 미리 작성하는것
목족- 프로그램의 비정상 종류를 막고,정상적인 상태를 유지하는것
```

```java

try{
    //예외가 발생할 가능성이 있는 문장들을 넣는다
}catch(Exception e1){
    //Ecception e1이 발생할 경우, 이를 처리하기 위한 문장을 적음.
}catch(Exception e2)(
    //Ecception e1이 발생할 경우, 이를 처리하기 위한 문장을 적음.
)
```

* 여러 catch 블럭이 올수있으나 이중 발생한 예와의 종류와 일치하는 단 **한 개의** catch블럭만 수행된다.
* 발생한 예외의 종류와 일치하는 catch 블럭이없으면 예외는 처리되지 않음.

---

### ✅try-catch문 흐름

```java
package exception;

public class ExceptionTest1 {
    public static void main(String[] args) {
        //예외가 발생한 코드
        System.out.println(1);
        try{
            System.out.println(0/0); //예외발생  ArithmeticException 예외 객체 생성 
            System.out.println(2);  //실행안됨
        }catch (ArithmeticException ae){  //예외 객체가 참조변수로 ae 들어감
            System.out.println(3);  //try -- catch문 벗어남 4번 실행
        } //try_ catch의 긑
        System.out.println(4);
    }// main
}

/*출력
1
3
4
 */
```

* 예제 실행 흐름
1.  try문에서 ArithmeticException 예외 발생하면 ->  ArithmeticException 객체 생성함
2. catch 블럭으로 가서 ()간에  ArithmeticException 처리하고하자는 예외와 같은 타입을 찾는다.
3. 찾으면 catch블럭내의 코드를 수행하고 try-catch 문을 빠져나간다
4. 다음 문장을 계속 수행한다.

---

### ✅try-catch문 흐름2



* printStackTrace():예외발생 당시의 호출스택(Call Stack)에 있었던 메서드의 정보와 예외 메세지를 화면에 출력한다.

* getMessage():발생한 예외 클래스의 인스턴스에 저장된 메시지를 얻을수있다.




예외가 발생했을떄 생성되는 예외 클래스의 인스턴스에는 발생한 예외에 대한 정보가 담겨있으며, getMessage()와 printStacTrace() 메서드들도 갖게된다. 이를 통해서 이 정보들을 얻을수 있다.

catch블럭의 괄호()에 선언된 참조변수를 통해 인스턴스에 접근할수 있다. 


```java
package exception;

public class ExceptionTest4 {
    public static void main(String[] args) {
        //예외가 발생한 코드
        System.out.println(1);
        System.out.println(2);
        try{
            System.out.println(3);
            System.out.println(0/0); //예외발생  -->캐치블럭으로 감. 예외가 발생한 이후에 예외는 수행이 안됨 2번수행안됨
            System.out.println(4);  //실행안됨
        }catch (ArithmeticException ae){
            ae.printStackTrace();
            System.out.println("에외 메세지:" + ae.getMessage());
        }// trt- catch
        System.out.println(6);
    }// main

}

1. try 문 0/0 예외발생 -> 예외 객체생성
2. 예외 객체 안에는 예외객체 정보와,getMessage()와 printStacTrace() 메서드들등 여러 메서드들이 있음.
3. catch문으로 이동해서 괄화에() ArithmeticException객채와 동일한타입  ArithmeticException ae찾음.
4. ae 참조변수에 ArithmeticException 객체 생성된 주소값을 넘김
5. 참조변수를 통해 ArithmeticException printStackTrace,getMessage 객체에 메서드들을 통해서 예외 정보를 알수있다.
```

![image description](/assets/images/exceptionErro.png.)<br>

```
printStackTrace() 호출결과 =>java.lang.ArithmeticException: / by zero
	at exception.ExceptionTest4.main(ExceptionTest4.java:10)
    => ArithmeticException 예외가 발생했고 발생한  예외 위치를 소스파일 10번쨰줄 알려준다.

```

--- 

### ✅예외 발생시키기 throw

예외 클래스가 있으니 인스턴스를 생성할 수도 있다, 예외 클래스의 인스턴스를 생성하고, throw 키워드를 앞에 붙이면 개발자가 의도적으로 예외를 발생시킬수 있다.

```java
1. 연산자 new 를 이용해서 발생시키려는 예외 클래스의 객채를 만든다음
Exception e = new Exception ("고의로 발생시킴")
2. 키워드 thorw를 이용해 예외를 발생시킨다.
thorw e;
```

```java

// 예제 8-9
package exception;

public class ExceptionTest5 {
    public static void main(String[] args) {
        try {
            Exception e = new Exception("고의로 예외발생");
            throw e;  //예외를 발생시킴
            // thorw new Excepiton("고의로 발생시켯음")  -- 위에 두 줄을 한줄로 줄여 쓸수도있음
        } catch (Exception e){
            System.out.println("에러 메시지:" + e.getMessage());
            e.printStackTrace();
        }
        System.out.println("프로그램이 정상 종료 됩니다.");
    }
}

/*출력
에러 메시지:고의로 예외발생
프로그램이 정상 종료 됩니다.
java.lang.Exception: 고의로 예외발생
	at exception.ExceptionTest5.main(ExceptionTest5.java:6)

Process finished with exit code 0
*/
```
Exception 인스턴스를 생성할떄 생성자에 String을 넣어주면, 이 String이 Exception 인스턴스에 메세지로 저장된다.
이메세시는 getMessage()를 이용해 얻을수있다.

```java
//예제 8-10
  package exception;

  public class ExceptionTest9 {
      public static void main(String[] args) {

         throw new Exception(); //Exception을 고의로 발생시킨다

      }
  }

```

* 위 예제는 컴파일 에러가남, 예외처리가 되어야할 부분에 예외처리가 되어있지 않다는 에러이다.
* Excepiton 클래스와 그자손)들이 발생한 가능성이 있는 문장들에 대해서는 예외 처리 해주지않으면 컴파일 조자 안됌.


![image description](/assets/images/exception3.png.)<br>
<center> 컴파일 조차 안되게 빨간색으로뜸 </center>

---

```java

//예제 8-11
  package exception;

  public class ExceptionTest10 {
      public static void main(String[] args) {

          throw new RuntimeException(); //Exception을 고의로 발생시킨다

      }
  }
```
* 이 예제는 예외처리를 하지 않았음에도 불구하고 이전의 예제와 달리 성공적으로 컴파일이 된다.
* 실행 하면 RuntimeException이 발생하여 비정상적으로 종료된다.
* RuntimeException클래스와 그자손에 해당하는 예외는 프로그래머에 의해 실수로 발생하는 것들이기 떄문에 예외처리를 강제하지 않는다.

---

### ✅메서드에 예외 선언하기 thorws

* 예외를 처리하는 방법에는 try-catch 문을 사용하는것 외에, 예외를 메서드에 선언하는 방법이있다.
* 예외를 처리한다기보다는 호출한사람한테 예외를 떠넘긴다는 느낌.

* 메서드에 예외를 선언하려면, 메서드의 선언부에 키워드 **thorws**를 사용해서 메서드 내에서 발생할수 있는 예외를 적는다. 그 예외가 여러 개인 경우  쉼표(,)로 구분한다.

```
void method() throws Exception1, Exception2, .. 
    //메서드의 내용
}

```

