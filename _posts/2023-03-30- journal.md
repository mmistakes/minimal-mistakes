---
title: "면접 준비: Java"

---
### <mark style='background-color: #fff5b1'><font color='#951d47'>Java 장단점?</font></mark>


- 장점
  - JVM(자바가상머신) 위에서 동작하기 때문에 운영체제에 독립적이다.
  - GabageCollector를 통한 자동적인 메모리 관리가 가능하다.
- 단점
  - JVM 위에서 동작하기 때문에 실행 속도가 상대적으로 느리다.
  - 다중 상속이나 타입에 엄격하며, 제약이 많다.

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>Jvm 역할?</font></mark>

- JVM은 스택 기반으로 동작하며, Java Byte Code를 OS에 맞게 해석 해주는 역할을 하고 가비지컬렉션을 통해 자동적인 메모리 관리를 해준다.

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>Java 컴파일 과정</font></mark>

- 개발자가 java 파일을 생성
- build 실행
- Java Compiler의 javac 명령어를 통해 바이트코드를 생성
- Class Loader를 통해 Jvm 메모리 내로 로드
- 실행엔진을 통해 컴퓨터가 읽을 수 있는 기계어로 해석

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>Java에서 제공하는 원시 타입들의 종류와 각 바이트?</font></mark>

- 정수형
  - byte: 1byte
  - short: 2byte
  - int: 4byte
  - long: 8byte
- 실수형
  - float: 4byte
  - double: 8byte
- 문자형
  - char: 2byte
- 논리형
  - boolean: 1byte

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>오버라이딩과 오버로딩</font></mark>

- 오버라이딩(Overriding)은 상위 클래스에 있는 메소드를 하위 클래스에서 재정의 하는 것
- 오버로딩(Overloading)은 매개변수의 개수나 타입을 다르게 하여 같은 이름의 메소드를 여러 개 정의하는 것

### <mark style='background-color: #fff5b1'><font color='#951d47'>객체지향의 특징</font></mark>

- 캡슐화
- 상속
- 다향성
- 추상화

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>불변객체</font></mark>

- 불변 객체는 객체 생성 이후 내부의 상태가 변하지 않는 객체를 말한다.
- Java에서는 필드가 원시 타입인 경우 final 키워드를 사용해 불변 객체를 만들 수 있다.

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>참조 타입</font></mark>

- 참조 타입을 대표적으로 객체를 참조할 수 있고 배열이나 List 등을 참조할 수 있다.
- 참조 변수가 일반 객체인 경우 객체를 사용하는 필드의 참조 변수도 불변 객체로 변경해야 한다.
- 배열일 경우 배열을 받아 copy해서 저장하고, getter를 clone으로 반환하도록 하면 된다.

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>불변 객체나 final을 굳이 사용해아 하는 이유?</font></mark>

- Thread-safe하여 병렬 프로그래밍에 유용하며, 동기화를 고려하지 않아도 된다.
- 어떠한 예외가 발생되더라도 메소드 호출 전의 상태를 유지할 수 있어 예외나 오류가 발생하여 실행이 중단되는 현상
- 메소드 호출 시 파라미터 값이 변하지 않는다는 것을 보장할 수 있다.
- 가비지 컬렉션 성능을 높일 수 있다. -> 카비지 컬렉터가 스캔하는 객체의 수가 줄기 때문에 Gc 수행 시 지연시간도 줄어든다.

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>추상 클래스와 인터페이스를 설명과 차이</font></mark>

- 추상 클래스는 클래스 내 추상 메소드가 하나 이상 포함되거나 abstract로 정의된 경우를 말한다.
- 인터페이스는 모든 메소드가 추상 메소드로만 이루어져 있는 것을 말한다.
- 공통점
  - new 연산자로 인스턴스 생성 불가능
  - 사용하기 위해서는 하위 클래스에서 확장/구현 해야 한다.
- 차이점
  - 인터페이스는 그 인터페이스를 구현하는 모든 클래스에 대해 특정한 메소드가 반드시 존재하도록 강제함
  - 추상클래스는 상속받는 클래스들의 공통적인 로직을 추상화 시키고, 기능 확장을 위해 사용한다.
  - 추상클래스는 다중상속이 불가능하지만, 인터페이스는 다중 상속이 가능하다.

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>싱글톤 패턴</font></mark>

- 싱글톤 패턴은 단 하나의 인스턴스를 생성해 사용하는 디자인 패턴
- 인스턴스가 1개만 존재해야 한다는 것을 보장하고 싶은 경우와 동일한 인스턴스를 자주 생성해야 하는 경우에 주로 사용한다.(메모리 낭비 방지)
- 대표적인 싱글톤 패턴으로 Spring Bean이 있다.

---

### <mark style='background-color: #fff5b1'><font color='red'>가비지 컬렉션</font></mark>

- 가비지 컬렉션은 JVM의 메모리 관리 기법 중 하나로 시스템에서 동적으로 할당됐던 메모리 영역 중에서 필요없어진 메모리 영억을 회수하여 메모리를 관리해주는 기법
- 실행 과정
  - GC의 작업을 수행하기 위해 JVM 어플리케이션의 실행을 잠시 멈추고, GC를 실행하는 쓰레드를 제외한 모든 쓰레드들의 작업을 중단 후 사용하지 않는 메모리를 제거하고 작업을 재개한다.
- [naver D2 가비지 컬렉션](https://d2.naver.com/helloworld/1329)

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>객체지향 설계원칙</font></mark>

- SRP(단일 책임 원칙): 한 클래스는 하나의 책임만 가져야 한다.
- OCP(개방 폐쇄 원칙): 확장에는 열려있고, 수정에는 닫혀있어야 한다.
- LSP(리스코프 치환 원칙): 상위 타입은 항상 하위 타읍으로 대체할 수 있어야 한다.
- ISP(인터페이스 치환 원칙): 인터페이스 내에 메소드는 최소한 일 수록 좋다.(하나의 일반적인 인터페이스보다 여러 개의 구체적인 인터페이서가 좋다.)
- DIP(의존관계 역전 원칙): 구체적인 클래스보다 상위 클래스, 인터페이스, 추상클래스와 같이 변하지 않을  가능성이 높은 클래스와 관계를 맺어라

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>자바의 메모리 영역</font></mark>

- 메소드 영역: 전역변수와 static변수를 저장하여, Method 영역은 프로그램의 시작부터 종료까지 메모리에 남아있다.
- 스택 영역: 지역변수와 매개변수 데이터 값이 저장되는 공간이며, 메소드가 호출될 떄 메모리에 할당되고 종료되면 메모리가 해제된다. LIFO 구조를 갖고 변수에 새로운 데이터가 할당되면 이전 데이터는 지워진다.
- 힙 영역: new 키워드로 생성되는 객체(인스턴스), 배열 등이 Heap 영역에 저장되며, 가비지 컬렉션에 의해 메모리가 관리된다.

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>각 메모리 영역이 할당되는 시점</font></mark>

- 메소드 영역: JVM이 동작해서 클래스가 로딩될 때 생성
- 스택 영역: 컴파일 타임 시 할당
- 힙 영역: 런타임(컴파일 타임 이후 프로그램이 실행)시 할당

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>Wrapper Class란 무엇이며, Boxing과 UnBoxing은 무엇인지 설명해주세요</font></mark>

- 기본 자료형에 대한 객체 표현을 Wrapper class라고 한다.
- 기본 자료형 -> Wrapper class로 변환하는 것을 Boxing이라고 한다.
- Wrapper class -> 기본 자료형으로 변환하는 것을 UnBoxing이라고 한다.

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>Synchronized</font></mark>

- 여러 개의 쓰레드가 한 개의 자원을 사용하고자 할 떄, 현재 데이터를 사용하고 있는 쓰레드를 제외하고 나머지 쓰레드들은 데이터에 접근할 수 없게 막는 개념
- 데이터의 thread-safe를 하기 위해 자바에서 Synchronized 키워드를 제공해 멀티 쓰레드 환경에서 쓰레드간 동기화를 시커 데이터의 thread-safe를 보장한다.
- Synchronized는 변수와 메소드에 사용해서 동기화 할 수 있으며, Synchronized 키워드를 남발하게 되면 오히려 프로그램의 성능 저하를 일으킬 수 있다.

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>new String과 리터럴("")의 차이</font></mark>

- new String()은 new 키워드로 새로운 객체를 생성하기 때문에 Heap 메모리 영역에 저장된다.
- ""은 Heap 안에 있는 String Constant Pool 영역에 저장된다.

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>String, StringBuffer, StringBuilder 차이</font></mark>

- String은 불변 속성, Buffer와 Builder는 가변 속성
  - Java에서 String 객체들은 Heap의 String Pool 이라는 공간에 저장되는데, 참조하려는 문자열이 String Pool에 존재하는 경우 새로 생성하지 않고 Pool에 있는 객체를 사용하기 때문에 특정 문자열 값을 재사용하는 빈도가 높을 수록 상당한 성능 향상을 기대할 수 있다.
- StringBuffer는 동기화를 지원하여 멀티 쓰레드 환경에서 주로 사용
- StringBuilder는 동기화를 지원하지 않아 싱글 쓰레드 환경에서 주로 사용

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>접근 제한자</font></mark>

- 변수 또는 메소드의 접근 범위를 설정해주는 것
- public: 접근 제한이 없다.
- protected: 해당 패키지 내, 다른 패키지에서 상속받아 자손 클래스에서 접근 가능하다.
- (default): 해당 패키지 내에서만 접근 가능
- private: 해당 클래스에서만 접근 가능
- 
---

### <mark style='background-color: #fff5b1'><font color='#951d47'>Error와 Exception 차이</font></mark>

- Error는 실행 중 일어날 수 있는 치명적 오류, 컴파일 시점에서 체크할 수 없고, 오류가 발생하면 프로그램은 비정상 종료되며, 예측 불가능한 UncheckedException에 속한다.
- Exception은 Error보다 비교적 경미한 오류, try-catch를 이용해 프로그램의 비정상 종류를 막을 수 있다.

---

### <mark style='background-color: #fff5b1'><font color='#951d47'>CheckedException과 UnCheckedException의 차이를 설명해주시오</font></mark>

- CheckedException은 실행하기 전에 예측 가능한 예외, 반드시 예외 처리를 해야한다.
  - ex) IOException, ClassNotFoundException
- UnCheckedException은 실행하고 난 후에 알 수 있는 예외, 따로 예외처리를 하지 않아도된다.
  - ex) NullPointerException, RuntimeException

---
### <mark style='background-color: #fff5b1'><font color='#951d47'>컬렉션 프레임워크</font></mark>

- 다수의 데이터를 쉽고 효과적으로 관리할 수 있는 표준화된 방법을 제공하는 클래스의 집합
- 종류(각 인터페이스를 기준으로 여러 구현체가 존재)
  - List
  - Set
  - Map
  - Stack
  - Queue

---
### <mark style='background-color: #fff5b1'><font color='#951d47'>직렬화</font></mark>

- JVM의 메모리에 상주되어 있는 객체 데이터를 바이트 형태로 변환하는 기술





