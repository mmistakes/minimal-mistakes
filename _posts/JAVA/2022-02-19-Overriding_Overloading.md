---
layout: single
title:  "오버라이딩 ( Overriding ) vs 오버로딩 ( Overloading )"
categories: 
    - JAVA
tags: 
    - [2022-02, JAVA, STUDY]
sidebar:
    nav: "docs"

---

## <a style="color:#00adb5">오버라이딩 ( Overriding )</a>

### <a style="color:#00adb5">Overriding</a> 란 무엇일까?
상위 클래스가 가지고 있는 멤버변수를 하위 클래스로 상속되는 것 처럼 메서드도 하위 클래스로 상속되어 하위 클래스에서 사용할 수 있다.<br><br>
그런데 하위 클래스에서 메서드를 재정의 해서 사용할 수 있다. 이것이 오버라이딩이다.<br>
간단하게 덮어씌우는 것이라고 생각하면 쉽다<br><br>

<a style="color:red"><b>상속 관계에 있는 클래스 간에 같은 이름의 메소드를 재정의 하는 기술</b></a><br><br>
메서드 이름이 같더라도 어떤 클래스의 객체를 생성하냐에 따라 출력되는 값이 달라진다.<br>

### <a style="color:#00adb5">Overriding</a> 의 조건
- 상속관계일 때만 사용 가능하다.
- static 메서드는 클래스에 속하는 메서드이기 때문에 상속되지 않고 오버라이딩 되지도 않는다.
- final, private를 가진 메서드는 성립되지 않는다.
- interface를 구현하여 오버라이딩 할 때는 반드시 public 접근 제어자를 사용해야 한다.
- 메서드 이름은 같아야 한다.
- 매개변수의 개수, 순서, 타입이 같아야 한다.
- 리턴 타입도 동일해야 한다.

### <a style="color:#00adb5">Overriding</a> 의 장점
- 메서드 하나로 여러 객체를 다루고 객체마다 다른 기능을 사용할 수 있다.
- 가독성이 증가한다.
- 오류의 가능성을 줄일 수 있다.
- 메서드 이름을 절약할 수 있다.

### <a style="color:#00adb5">Overriding</a> 실습

OverridingParent

```java
public class OverridingParent {
    String name;

    // 부모 메서드
    void introduce(){
        System.out.println("저는 "+this.name+ "입니다.");
    }
}
```

Overriding

```java
public class Overriding extends OverridingParent{
        public String name_m;
        public int age;

    @Override
    // 부모의 메서드를 재정의
        public void introduce() {
        System.out.println("저는 "+ this.name_m + "이고 나이는 " + this.age + "입니다.");
    }
}

```


OverridingTest

```java
public class OverridingTest {
    public static void main(String[] args) {

        // 자식 클래스 객체 생성
        Overriding ov = new Overriding();

        ov.name_m = "jack";
        ov.age = 17;

        // 자식 클래스 메서드 호출
        ov.introduce();

    }
}
```

<hr>

실행결과<br>

```java
저는 jack이고 나이는 17입니다.
```

<hr>


## <a style="color:#00adb5">오버로딩 ( Overloading )</a>

### <a style="color:#00adb5">Overloading</a> 란 무엇일까?
<a style="color:red"><b>같은 이름의 메서드를 여러개를 가지면서 매개변수의 유형과 개수가 다르도록 하는 기술</b></a><br><br>
동일한 기능을 수행하는 메서드의 추가 작성<br>
메서드를 호출할 때 매개변수의 개수, 순서, 타입에 따라 각기 다른 메서드를 호출한다.<br>
메서드 오버로딩도 있지만 생성자 오버로딩도 있다.<br>
생성자를 매개변수에 따라 각각 정의해주면 된다.<br>

### <a style="color:#00adb5">Overloading</a> 의 조건
- 메서드 이름은 같아야 한다.
- 매개변수의 개수, 순서가 달라야 한다.
- 매개변수의 타입이 달라야 한다.
- 리턴 타입은 의미가 없다.
- 매개변수는 같고 반환 타입이 다른 경우 오버로딩은 성립되지 않는다.

### <a style="color:#00adb5">Overloading</a> 의 장점
- 가독성이 증가한다.
- 오류의 가능성을 줄일 수 있다.
- 메서드 이름을 보고 같은 기능이라고 예측할 수 있다.
- 메서드 이름을 절약 할 수 있다.
- ex) 가장 많이 쓰는 println() 도 오버로딩을 통한 메서드 호출이다.

### <a style="color:#00adb5">Overloading</a> 실습

Overloading class

```java
public class Overloading {

    // 매개변수가 없는 경우
     void sum(){
        System.out.println("매개변수 없음");
    }

    // 기본
     void sum(int a, int b){
         System.out.println(a+b);
    }

    // 매개변수 수가 다른 경우
     void sum(int a, int b, int c){
         System.out.println(a+b);
    }


    // 매개변수 타입이 다른 경우
     void sum(double a, double b){
         System.out.println(a+b);
    }

}
```
<br>

OverloadingTest class

```java
public class OverloadingTest {
    public static void main(String[] args) {
        Overloading ov = new Overloading();

        // 매개변수가 없는 sum 호출
        ov.sum();

        // sum(double a, double b) 호출
        ov.sum(1.5, 3.2);

        // sum(int a, int b) 호출
        ov.sum(1,2);

        // sum(int a, int b, int c) 호출
        ov.sum(2,3,4);

    }
}
```

<hr>

실행결과<br>

```java
매개변수 없음
4.7
3
5
```

<hr>

## <a style="color:#00adb5">오버라이딩 ( Overriding ) vs 오버로딩 ( Overloading )</a> 마무리
다형성은 프로그래밍에서 요구하는 아주 중요한 특성이다.<br>
다형성이랑 하나의 클래스나 함수가 다양한 방식으로 동작하는 것이다.<br>
오버라이딩과 오버로딩이 대표적으로 다형성을 나타내는 기능이다.<br>
오버라이딩은 여러 클래스의 다른 기능을 하나의 메서드로 제어할 수 있었고,<br>
오버로딩은 하나의 메서드로 여러 동작을 할 수 있었다.<br>
그래서 다형성은 프로그래밍에 있어 효율성을 아주 높여주는 객체지향개념의 중요한 특징 중 하나이다.<br>
따라서 오버라이딩과 오버로딩도 중요한 특징 중 하나이다.<br>
면접에 자주 질문하는 기초적인 지식 중 하나이다. 잘 알고 있어야 한다 !!




<br><br><br><br>
참조<br>
<a href="https://wooono.tistory.com/262" target=_blank>https://wooono.tistory.com/262</a><br>
<a href="https://programmingnote.tistory.com/29" target=_blank>https://programmingnote.tistory.com/29</a>