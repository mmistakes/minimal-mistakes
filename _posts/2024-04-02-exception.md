---
layout: single
title: '[JAVA][Spring] Exception Handling'
categories: JAVA
tag: [JAVA]
toc: true 
author_profile: false
sidebar:
    nav: "counts"
published: true

---

Spring을 이용한 웹 개발 미니프로젝트 중 효율적인 Exception 처리 로직에 관해 공부할 필요성을 느껴 예외 처리 방법에 대해 정리했다.

### 예외(Exception) vs 오류(Error)
종종 예외와 오류를 동일하게 생각하는 경우가 있는데 둘은 명확히 다른 개념이다.

오류는 시스템 비정상적인 상황이 생겼을 때 발생한다. 이는 시스템 레벨에서 발생하는 심각한 수준의 문제이다. 

예외는 프로그래머가 작성한 로직에서 발생하는 문제이다. 미리 예측하고 처리할 수있기 때문에 올바르게 핸들링하는것이 중요하다. 

### Exception 클래스  

<div style="display: flex; justify-content: center;">
    <img src="{{site.url}}\images\2024-04-02-exception\exception2.png" alt="Alt text" style="width: 70%; height: 70%; margin: 10px;">
</div>
 Error와 Exception 클래스르 보면 Throwable 클래스를 상속받고 있다. Exception은 주로 개발자가 작성한 코드에 의해 런타임, 컴파일 중 발생한다.  Error는 시스템레벨에서 처리해야하지만 Exception은  Exception Handling, 즉 개발자가 로직을 추가하여 처리할 수 있다. 

 Exception의 자식 클래스 중 RuntimeException 은 CheckedException 과 Unchecked Exception 을 구분하는 기준이다 .  
 
 CheckedException은 컴파일 단계에서 체크하기 때문에, 예외 처리를 하지 않는다면 컴파일 중 에러가 발생한다. 반면에 Unchecked Exception 은 예외처리가 필수가 아니며, 컴파일과 실행까지 가능하다.  Unchecked Exception은 개발자에 부주의로 발생하는 경우가 대부분이다. 

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2024-04-02-exception\exception_example.png" alt="Alt text" style="width: 100%; margin: 50px;">
</div>



### 예외 처리 방법
일반적으로 JAVA 에서 예외 처리 방법의 구조는 try-catch 문이다. 

```java
try {
    // 예외가 발생할 가능성이 있는 코드
} catch(Exception e1) {
    // 예외를 처리하는 코드1
} catch(Exception e2) {
    // 예외를 처리하는 코드2
}finally{
    // 예외 발생 여부에 관계없이 수행되는 코드 
}
```
예외가 발생할 가능성이 있는 코드를 try 블럭으로 감싸고, 잡고싶은 예외를 catch 블럭에 명시해 주는 방식이다. 

catch블럭에서 정의한 예외 타입과 동일한 예외가 발생하면 catch 블럭에서 예외를 처리해준다. 

java7 이상부터는  **multi catch** 문,  **try-catch-resource**이  사용 가능하다. 

```java

try{
    // Exception 발생 코드
}catch(예외1 | 예외2 e){
    e.printStackTrace();
}finally{
    //finally 코드
}

```

```java
try(FileInputStream fis = new FileInputStream("존재하지않는파일.txt")){
    /* 
    try-with-resources
    try 블록 내에서 자원을 선언하고 사용하는데, 이 자원은 try 블록을 벗어나면 자동으로 닫힙니다.

    try() Exception 발생시 바로 fis.close() 메소드 실행
    명시적으로 close() 메소드를 호출하지 않아도 된다.

    */

    System.out.println(fis.read());
}catch(IOException e){
    e.printStackTrace();
}

```



### 예외 던지기 

예외 발생 시 try-catch 문으로 처리하는 것이 기본이지만, 경우에 따라 메소드에서 자신을 호출한 상위 메소드로 예외를 떠넘길 수 있다. 


- 일반적인 예외 처리 
    - try-catch 문 일일히 감싸줌 
    - 가독성이 떨어진다 

```java

public class Throws {
    public static void main(String[] args) {
        exception1();
        exception2();
    }

    public static void exception1(){
        try {
            throw new NullPointerException("NullPointerException");
        }catch(NullPointerException e){
            System.out.println(e.getMessage());
        }
    }

    public static void exception2(){
        try {
            throw new ClassNotFoundException("ClassNotFoundException");
        }catch(ClassNotFoundException e){
            System.out.println(e.getMessage());
        }
    }

}

```
```
NullPointerException
ClassNotFoundException
```

- 예외 던지기 Throws
    - 자신을 호출한 메서드에게 예외를 전달하여 예외를 처리한다.

```java

public class Throws {
    public static void main(String[] args) {
     try{
        exception1();
        exception2();
        }catch(NullPointerException | ClassNotFoundException e){
            System.out.println(e.getMessage());
        }
    }

      public static void exception1() throws NullPointerException{
        throw new NullPointerException("NullPointerException");
    }

    public static void exception2() throws ClassNotFoundException{
        throw new ClassNotFoundException("ClassNotFoundException");
    }

}

```

throws 예외클래스명을 기재하면 예외를 호출자에게 던지게된다. 해당 메서드 안에서 예외가 발생할 경우 try - catch 문이 없으면 해당 메서드를 호출한 상위 스택 메서드로 가서 예외 처리를 하게 된다.

```
NullPointerException
```

## 트랜잭션 (Transaction)

위에 표에서 확인했듯이 트랜잭션과 예외처리는 매우 밀접한 관련이 있다.

예외 발생시 트랜젝션 처리에 관한 내용을 보면 Checked Exception은 roll-back 하지 않고 Unchecked Exception은 roll-back 을 실행한다. 

> 트랜잭션이란 하나의 작업 단위이며, 롤백(roll-back) 은 작업을 모두 취소하는 행위를 말한다. 

메서드 블록내의 코드들이 예외가 발생해도 모두 실행되느냐 아니면 예외가 발생하면 그 상태로 중지하느냐에 따라 작업 단위에 대해 개발자가 적절한 예외 처리를 해야한다. 

'상품발송' 이라는 트랜잭션을 가정해보자

<div style="display: flex; justify-content: center;">
  <img src="{{site.url}}\images\2024-04-02-exception\transaction.png" alt="Alt text" style="width: 100%; margin: 50px;">
</div>

"상품발송" 트랜잭션 중 하나라도 실패하면 3가지를 모두 취소하고  "상품발송" 전의 상태로 되돌리고 싶을 경우에 어떻게 예외처리를 해야할까? 

위에 예제 던지기 코드 예시를 보면 try-catch 문으로 예외 처리를 일일히 해준 경우 에러가 발생해도 모든 메소드가 실행되지만, throws 로 던져준 경우 한 곳에 예외가 발생하면 그 뒤 코드들은 실행되지 않게된다. 

```java

    public static void main(String[] args) {
        productShipment()
    }

    public void productShipment(){
        try{
            Packaging();
            Receipt();
            Shipment();
        }catch(Exception e){
            // 모두 취소();
        }
    }
    
    public void Packaging() throws Exception{

    }
    public void Receipt() throws Exception{
        
    }
    public void Shipment() throws Exception{
        
    }

```

다음과 같이 포장, 영수증발행, 발송 메서드에서는 예외를 던지고 상품발송 메서드에서 넘겨받은 예외를 처리하여 모두 취소하는 것이 완벽한 트랜잭션 처리 방법이다.

## 예외처리 방법 

예외를 처리하는 일반적인 방법은 **예외 복구, 예외처리 회피, 예외 전환** 3가지 이다. 

-  **예외 복구 : 예외가 발생하면 다른 작업 흐름으로 유도**
-  **예외 처리 회피 : 처리를 하지 않고 호출한 쪽으로 던짐**
-  **예외 전환 : 호출한 쪽으로 던질 때 명확한 의미를 전달하기 위해 다른 예외로 전환**

### 예외 복구
예외 복구의 핵심은 예외가 발생하여도 애플리케이션은 정상적인 흐름으로 진행하는 것이다. 

```java
    int maxretry = 10;

    while(maxretry-- > 0){
        try{
            // 예외가 발생할 가능성이 있는 코드 
                return;
        }catch(____Exception e){
            // 정해진 시간만큼 대기 후 재시도 
            e.getStackTrace();
        }finally{
            // 리소스 반납 및 정리 작업 
        }
    }
```

위 코드는 특정 상황에서 에러가 발생할 때 그 예외를 잡아서 일정 시간만큼 대기하고 다시 재시도를 반복한 후 최대 재시도 횟수를 넘기면 예외를 발생시킨다. 

재시도를 통해 정상적으로 어플리케이션을 작동시키거나 다른 흐름으로 유도시켜 예외가 발생하였어도 정상적으로 작업을 종료할 수 있다.


### 예외 처리 회피 
예외가 발생하면 호출한 쪽으로 예외를 던져 처리를 회피하는 방법이다. 

호출 부분에서 Exception을 Handling 하는 것이 더 바람직할 경우에만 사용해야한다.

```java

public class Throws {
    public static void main(String[] args) {
     try{
        exception1();
        exception2();
        }catch(NullPointerException | ClassNotFoundException e){
            System.out.println(e.getMessage());
        }
    }

      public static void exception1() throws NullPointerException{
        throw new NullPointerException("NullPointerException");
    }

    public static void exception2() throws ClassNotFoundException{
        throw new ClassNotFoundException("ClassNotFoundException");
    }

}

```

### 예외 전환

예외 전환은 예외를 잡아서 다른 예외를 던지는 방법이다. 예를 들어 Checked Exception 둥 복구 불가능한 예외가 잡혔다면 이를 Unchecked Exception 으로 전환하여 핸들링 할 수도 있다.

```java
try{
     // 예외가 발생할 가능성이 있는 코드 
}catch(____Exception e){
    throw CustomSpecificExceltion("예외 전환")
}
```

#### 연결된 예외 (Chained Exception)

특정 예외에서 다른 예외를 발생시키는 것을 연결된 예외라고 한다. 예외도 마치 부모 예외로 감싸서 보내 마치 예외의 다형성 처럼 다룰 수 있다.
예를 들어 예외A가 예외B를 발생시켰다면, A를 B의 **'원인 예외(cause exception)'**라고 한다. 

Exception 클래스가 상속하고 있는 Throwable 클래스에는 chained exception을 가능하게 해주는 다음 메서드를 지원한다.

-  **Throwable initCause (Throwable cause) : 지정한 예외를 원인 예외로 등록**

-  **Throwable getCause() : 원인 예외를 반환**


```java
    public static void main(String[] args) {
        try {
            // 예시로 IOException 발생
            throwCheckedException();
        } catch (RuntimeException e) {
            // Unchecked Exception으로 변환된 IOException 잡기
            System.out.println("Unchecked Exception occurred: " + e.getMessage());
            System.out.println("Caused: " + e.getCause());

        }
    }

    public static void throwCheckedException() {
        try {
            // Checked Exception 발생
            throw new IOException("This is a checked exception.");
        } catch (IOException e) {
            // Checked Exception을 Unchecked Exception으로 전환하여 다시 던지기
            IllegalArgumentException uncheckedIOException = new IllegalArgumentException("Unchecked IOException occurred.");
            uncheckedIOException.initCause(e); // IOException을 원인으로 설정
            throw uncheckedIOException;
        }
    }

    
```

```
Unchecked Exception occurred: Unchecked IOException occurred.
Caused: java.io.IOException: This is a checked exception.
```
<br>

위 코드는 연결된 예외(chained exception)을 이용해, checked 예외를 unchecked 예외로 전환하여  필수처리(Exception) 을 선택처리(RuntimeException)로 변경해준다. 따라서 호출자가 예외를 처리할 필요가 없어져 코드가 간소화되어 예외 처리 코드의 양이 줄어든다.

## Exception Handling 주의 사항
**1. Exception을 catch한 후에 아무 로직 없이 catch만 하는 것은 적합하지 않다.**

**2. Log를 출력하거나 로직을 원상 복구 시키는 로직을 첨가하여 catch만 수행하지 않고 해당 Exception에 대한 처리를 해야한다.**

**3. 예외 메세지만 남기기보다, 전체 Exception Stack을 다 넘기기 위해 Logging Framework (slf4j, log4j .. ) 를 사용하자.**


<br>
<br>

----
Reference

- Exception Handling    
    - <a href = 'https://www.nextree.co.kr/p3239/'>Java 예외처리에 대한 작은 생각 by nextree</a>
    - <a href = 'https://inpa.tistory.com/entry/JAVA-%E2%98%95-Exception-Handling-%EC%98%88%EC%99%B8%EB%A5%BC-%EC%B2%98%EB%A6%AC%ED%95%98%EB%8A%94-3%EA%B0%80%EC%A7%80-%EA%B8%B0%EB%B2%95#1._%EC%98%88%EC%99%B8_%EB%B3%B5%EA%B5%AC'>자바 예외를 처리하는 3가지 기법 by Inpa Dev</a>
    - <a href = 'https://velog.io/@gillog/Java-Exception-Handling%EB%B3%B5%EA%B5%AC-%ED%9A%8C%ED%94%BC-%EC%A0%84%ED%99%98'> Exception Handling(복구, 회피, 전환) by gil.log</a>
    - <a href = 'https://cheese10yun.github.io/checked-exception/'>Checked Exception을 대하는 자세 by cheese10yun</a>

- Java7 Multi catch & try - catch - resource
    - <a href = 'https://catch-me-java.tistory.com/46'>java 예외처리 기본기 by maru's 원자적 사고</a>   

- 연결된 예외
    - <a href = 'https://dev-cini.tistory.com/70'>예외 던지기(exception re-throwing) / 연결된 예외(chained exception) by 개발자 시니</a>

- 트랜잭션 roll back
    -  <a href = 'https://wikidocs.net/229'>예외 처리 by 점프 투 자바</a>
    -  <a href = 'https://ttl-blog.tistory.com/351#Unchecked%20Exception%EC%9C%BC%EB%A1%9C%20%ED%8F%AC%EC%9E%A5%ED%95%98%EC%97%AC%20%EB%8D%98%EC%A0%B8%EB%9D%BC!-1'>예외 종류에 따른 트랜잭션 롤백처리 by 말 랑</a>

- Image
    -  <a href = 'https://www.scaler.com/topics/java/exception-handling-in-java/'>Exception Handling in Java by Aditi Patil</a>
