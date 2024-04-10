---
layout: single
title:  "JAVA - Exception"
categories: Java
tag: [JAVA]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆예외처리

-java는 에러 난 상황을 크게 오류(Error)와 예외(Exception)으로 구분한다. 예외(Exception)는 개발자가 처리 할 수 있는 에러이고 오류(Error)는 시스템에서 발생하여 개발자가 처리 할 수 없는 에러이다.<br/>

-프로그램 컴파일시에 발견하지 못하는 에러를 Runtime에러라고 하는데, 프로그래머가 예기치못한 예외의 발생에 미리 대처하는 코드를 작성하는 것으로, 실행중인 프로그램의 비정상적인 종료를 막고, 상태를 정상상태로 유지하는 것이 목적이다. 

<예외처리를 무조건 작성해야 하는 경우><br/>
-IO처리 했을 경우(입출력 기능)<br/>-DB에서 연동시켰을 경우 : 예외상황을 정상으로 처리하여 리턴시켜 에러가 발생하지 않도록 할 수 있다.

<br/>







## 1.1 try catch문

```java
 try {
    에러가 발생하지 않았을 때의 로직
}
catch(Exception err){
    에러 발생했을 때의 로직
} finally {
    공통로직
}

```

여기에서 catch의 경우 여러번 사용 가능하다. 기본적으로 Exception err(모든 exception 객체의 조상)을 쓰지만 여러개의 err를 조건에 했당했을 시 catch를 여러번 사용할 수 있다.<br/>

finally는 예외 발생 여부와 상관없이 무조건 수행되어야할 로직이 있을 경우 사용하는 블럭이다. 그래서 예외가 발생하지 않는다면 try블럭이후 finally 블럭이 수행된다.<br/>



## 1. 예외

**<e.printStackTrace()>**
개발자들이 주로 사용하는 것으로 에러 메세지의 발생 근원지를 찾아서 단계별로 에러를 출력한다.<br>catch에 에러 발생했을때의 로직에 작성해주면 된다.<br/>
<br/><br/>



## 2. .close()

### 2.1 의미

Java에선 Stream이나 DB Connection처럼 다양한 자원을 외부에서 사용할 수 있다.<br>하지만 어떤 언어든지 간에 자원을 사용한 후 더 이상 사용할 필요가 없다면 자원의 효율성을 위해 반환해 줘야 한다.<br>자원반납은 finally 블록 내부에 작성하는 이유는  항상 .close()가 실행되도록 보장해 줄 수 있기 때문에 finally 문 안에 작성한다.

<br>



### 2.2 close() 메소드를 알맞게 호출해주지 않을 경우에는 다음과 같은 문제가 발생한다.

1. Statement를 닫지 않을 경우, 생성된 Statement의 개수가 증가하여 더 이상 Statement를 생성할 수 없게 된다.
2. close() 하지 않으므로 불필요한 자원(네트워크 및 메모리)을 낭비하게 된다.
3. 커넥션 풀을 사용하지 않는 상황에서 Connection을 닫지 않으면 결국엔 DBMS에 연결된 새로운 Connection을 생성할 수 없게 된다.

```java
try{
    fis = new FileInputStream("score.dat");
    dis = new DataInputStream(fis);
}catch(IOException ie){
	ie.printStackTrace();
} finally {
    try{
        if(dis != null)
           dis.close();
    }catch(IOException ie){
    	ie.printStackTrace();
    }
}
```
<br>


---

# ◆RuntimeException
RuntimeException은 Java Virtual Machine의 정상적인 작동 중에 발생할 수 있는 예외의 슈퍼 클래스이다.<br>

RuntimeException 및 해당 서브 클래스는 메서드 또는 생성자의 실행에 의해 발생한다.

![RuntimeException](https://github.com/pueser/The-Festa/assets/117990884/ab495249-7e5a-4d2c-8f9c-4b37fe8eba2c)
<br/>

**checked exception**
- 반드시 예외 처리를 해야 한다. (try~catch를 통해)
- 컴파일 단계에서 확인 가능하다.
- 예외 발생 시 트랜잭션 roll back 하지 않는다.
- RuntimeException을 제외한 Exception의 하위 클래스
  <br/>


**unchecked exception**
- 명시적 예외 처리를 강제하지 않는다.
- 실행 단계에서 확인 가능하다.
- 예외 발생 시 트랜잭션 roll back 한다.
- RuntimeException의 하위 클래스
<br/>




출처: https://steady-hello.tistory.com/55 [컨닝페이퍼:티스토리]
