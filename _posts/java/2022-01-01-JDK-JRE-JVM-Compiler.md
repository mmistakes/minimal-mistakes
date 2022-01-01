---
layout: single
title: "[Java] JDK, JRE, JVM 정리"
categories: Java
tag: [Java, Enviroment]
toc: true
author_profile: true
# sidebar:
#   nav: "docs"
---

## ✔ Goal

- 무의식적으로 인지하지 않고 쉽게 넘어갔던 부분을 다시 정리한다
- **얕은 지식**을 조금 더 구체화하여 재정리한다

## ✔ Java

- **썬 마이크로 시스템즈**에서 개발하여 **1996년** 공식적으로 발표한 **객체지향 언어**
- 객체지향 언어이기에 설계 단계에서는 시간이 걸리지만, **유지보수**에 용이함
- 운영체제에 상관없이 실행이 될 수 있다

### 컴퓨터가 자바를 알아먹는 방법

```yaml
0과 1 (이진법):
  - 컴퓨터는 0과 1의 숫자를 통해 명령을 처리한다
  - 즉, 우리가 인간이 이해하는 영역과, 컴퓨터가 이해하는 영역을 분리
```

```java
public static void main(String[] args) {
  System.out.println("Hello World");
}
```

- 자바에서의 위 코드는 운영체제(**OS**)가 그대로 인식할 수 없다
- **컴파일 과정**을 통해 해당 코드는 **바이너리코드**로 변경이 된다
  - 이 때, 해당 고급 언어를 기계어 코드로 변경해주는 것이 `컴파일러`
- **운영체제**는 해당 바이너리코드를 읽어들이고 명령을 수행한다
- [이진법 - 0과 1의 세계](https://ledgku.tistory.com/14)

### 중간 정리

- 컴파일 : 인간이 이해하기 쉬운 언어를 기계어로 번역하는 과정
- [컴파일러](https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%8C%8C%EC%9D%BC%EB%9F%AC) : 컴파일을 수행하는 프로그램
- [바이트 코드](https://ko.wikipedia.org/wiki/%EB%B0%94%EC%9D%B4%ED%8A%B8%EC%BD%94%EB%93%9C)(Binary Code) : 0과 1로 이루어진 코드, 컴퓨터가 이해할 수 있다

### 0과 1의 조합은 운영체제마다 다르다

<img width="500" height="300" alt="스크린샷 2021-08-10 16 01 32" src="https://user-images.githubusercontent.com/53969142/128822695-6e79d944-382f-4e06-9928-4bd23f060779.png">

- **`컴파일러에 의해 컴파일된 바이너리코드의 조합은 운영체제마다 다르다`**
- 즉, 똑같은 0과 1이여도 운영체제에 따라 출력이 되지 않는 경우가 있을 수 있다는 말이다
- **C언어**의 경우 O/S(운영체제)에 따라 개별적인 컴파일러가 필요하다

## ✔ Java는 어떻게 하는가?

### Java Compiler

- Java는 다른 언어와는 다르게, 자바 **컴파일러 하나가 존재**한다
- 자바를 통해 나온 소스 코드(`.java`) 코드를 자바 가상 머신이 이해할 수 있는  
  자바 바이트 코드로 변환해주는 역할을 한다

### JVM(Java Virtual Machine)

<img width="500" alt="" src="https://user-images.githubusercontent.com/53969142/128836712-45105f04-6647-4a7f-9e14-fbe0e160c6f7.png">

- 자바 **컴파일러**에 의해 변환된 바이트 코드를 읽고 해석하는 역할을 하는 **자바 인터프리터**
- 자바 바이트코드는 **JRE**(Java Runtime Enviroment) 위에서 동작한다
- **자바로 작성된 모든 프로그램**은 자바 가상 머신에서만 실행될 수 있으므로, 자바 P/G 실행을 위해서는 반드시  
  JVM이 설치되어 있어야 한다

### 자바 애플리케이션 실행 시 JVM 동작 과정

1. 프로그램 실행 시 **JVM**은 **OS**로부터 **메모리**를 할당
2. 자바 컴파일러(javac)가 자바 소스코드(.java)를 자바 바이트코드(.class)로 컴파일
3. **Class Loader**를 통해 **JVM Runtime Data Area**로 로딩
4. 로더에 의하여 로딩 된 .class들은 **Execution Engine**을 통해 **Interpret**(해석)
5. **해석된 바이트 코드**는 Runtime Data Area의 각 영역에 배치되어 수행, 이 과정에서 Execution Engine에 의해  
   GC의 작동과 쓰레드 동기화가 이루어짐

### JVM(Java Virtual Machine) 구성 요소

1. `클래스 로더`(class loader)
2. `실행 엔진`(Execution Engine)
3. `Runtime Data Areas`
4. `가비지 컬렉터`(garbage collector)

<br>

**`Class Loader`**

```yaml
역할?:
  - 자바 컴파일러에 의해 생성된 클래스 파일들을 묶는다
  - 후에, JVM이 운영체제로부터 할당받은 메모리 영역인 Runtime Data Area에 적재하는 역할을 수행
```

**`Execution Engine`**

```yaml
역할?:
  - Class Loader에 의해 메모리에 적재된 클래스 코드를 기계어로 변경해 명령어 단위로 실행하는 역할
  - 명령어를 한 줄씩 실행하는 인터프리터 방식과 JIT 컴파일러를 이용하는 방식이 있다
```

**`Garbage Collector`**

```yaml
역할?:
  - Heap Memory 영역에 생성된 객체들 중 참조되지 않는 객체들을 제거하는 역할
  - GC가 역할을 수행하는 시간은 언제인지 알 수 가 없다
  - GC가 수행되는 동안 GC를 수행하는 쓰레드가 아닌 다른 모든 쓰레드는 일시정지 된다
```

**`Runtime Data Area`**

```yaml
역할?:
  - JVM의 메모리 영역으로 자바 애플리케이션을 실행할 때 사용되는 데이터들을 적재하는 영역
```

- **Method Area**(메소드 영역)
  - **모든 쓰레드가 공유하는 메모리 영역**
  - 클래스
  - 인터페이스
  - 메소드
  - 필드
  - static 변수
- **Heap Area**(힙 영역)
  - new 키워드로 생성된 객체 또는 배열
  - GC가 참조되지 않는 메모리를 확인하고 제거하는 영역
- **Stack Area**(스택 영역)
  - 메서드 내에서 정의하는 **지역변수의 데이터 값**이 저장되는 공간
  - 메서드가 호출될 때 메모리에 할당하고 종료되면 메모리가 해제된다

## ✔ JRE, JDK, JVM?

<img width="500" alt="" src="https://user-images.githubusercontent.com/53969142/128824359-0de7e551-20d0-40b1-a969-826a3ac04c92.png">

- **`JDK > JRE > JVM`**

### JRE?

- 자바 **실행 환경**의 약자
- (Java Runtime Enviroment)
- `JRE`은 `JVM + 자바 프로그램 실행에 필요한 라이브러리 파일(API)`의 집합 🌟
- `JRE`에서 가장 중요한 요소는 자바 바이트코드를 해석하고 실행하는 `JVM`(Java Virtual Machine)이다
- `JVM`의 `실행환경` 구현

### JDK?

- 자바 **개발 도구**의 약자
- (Java Development Kit)
- `JDK`는 JRE + 개발을 위한 도구를 포함
- `컴파일러`, `디버그 도구` 등이 포함
- `JDK를 설치`하면 JRE와 JVM도 함께 설치된다 🌟
- JAVA의 버전은 = JDK의 버전을 의미

### LTS?

```yaml
LTS (Long Time Support):
  - 프로그램에는 특이하게 LTS(Long Time Support)라는 버전이 있다
  - 즉, 오래 써도 되는 버전을 의미한다
```

### Java SE

```yaml
JAVA SE (Java Standard Edition):
  - 자바 표준 에디션은 가장 기본이 되는 에디션입니다.흔히 자바 언어라고 하는 대부분의 패키지가 포함된 에디션
  - 주요 패키지는 java.lang.*, java.io.*, java.util.*, java.awt.*, javax.rmi.*, javax.net.* 등이 존재
```

### Java EE

```yaml
JAVA EE (Java Enterprise Edition):
  - 자바로 구현되는 웹프로그래밍에서 가장 많이 사용되는 JSP, Servlet을 비롯하여, 데이터베이스에 연동하는 JDBC,
  그 외에도 JNDI, JTA, EJB 등의 많은 기술들이 포함되어 있다
  - Java EE는 Java SE의 API에 추가로(lib 디렉토리에 포함되어 있는 JAR파일들)의 차이를 의미한다
```

### 참고 자료

- [Java를 하기 위해 알아야할 기본 지식](https://www.youtube.com/watch?v=f0cAmTYo4tQ)
- [컴파일러 wiki](https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%8C%8C%EC%9D%BC%EB%9F%AC)
- [바이너리 코드 wiki](https://ko.wikipedia.org/wiki/%EB%B0%94%EC%9D%B4%ED%8A%B8%EC%BD%94%EB%93%9C)
- [JVM Internal](https://d2.naver.com/helloworld/1230)
- [자바 프로그래밍](http://www.tcpschool.com/java/java_intro_programming)
- [JVM 구조와 자바 런타임 메모리 구조](https://jeong-pro.tistory.com/148)
- [Java EE와 SE의 차이](https://210life.tistory.com/entry/Java-EE%EC%99%80-Java-SE%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90)
