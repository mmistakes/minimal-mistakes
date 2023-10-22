---
layout: single
title:  "JAVA - extends"
categories: Java
tag: [JAVA]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆extends(상속)

-부모 클래스(parent class) 와 자식 클래스(children class)는 자바 지정예약어 **extends**에 의하여 정해진다.<br/>-하나의 클래스는 하나의 클래스로부터 **단일상속**을 받아 속성(필드,메소드)들을 갖는 것을 말한다.<br/>-모든 선언/정의를 부모가 하며, 자식은 오버라이딩 할 필요 없이 부모의 메소드/변수를 그대로 사용할 수 있다.<br/>-private인 필드와 메소드는 상속대상에서 제외된다.<br/>

```java
//문법
class 자식클래스 extends 부모 클래스 {
      멤버요소(상태, 행위)
 }
```

<br/>







# ◆super()

-자식 클래스의 생성자에서 **부모 클래스의 생성자를 호출하기 위해서 사용**됩니다.<br/>-super( )는 생성자 코드안에서 사용 될 때, 다른 코드에 앞서 **첫줄에 사용**되어야 합니다. <br/>-**자식 클래스의 모든 생성자는 부모 클래스의 생성자를 포함하고 있어야 합니다.** 그런데 만약 **자식 클래스의 생성자에 부모 클래스의 생성자가 지정되어 있지 않다면, 컴파일러가 자동으로 부모 클래스의 기본생성자를 호출**합니다. (이러한 경우, 부모클래스에 매개변수가 있는 생성자만 있고, 기본생성자가 없어 기본생성자를 호출할수 없다면 에러가 발생합니다.)

<br/>

**<예제1>**

```java
//부모 클래스
public class Parent {
	
	public String name1;
	
	public Parent(String name1) {
		this.name1 = name1;
        System.out.println(this.name1 + "부모클래스 생성자 입니다.")
	}

}
```

```java
//자식 클래스
public class Child extends Parent{
    
    public String name2;
    
    public Child(String name1, String name2){
        super(name1);
        this.name2 = name2;
        System.out.println(this.name2 + "자식클래스 생성자 입니다.")
    }
	
}
```

```java
//출력 메서드
public class Main{
    public static void main(String[] args){
        Child child = new Child("황혜진" , "짱구");
        
    }
}
```

결과 예측 : 황혜진 부모클래스 생성자 입니다. 짱구 자식클래스 생성자 입니다.

<br/>





**<예제2>**

```java
//부모 메서드
public class Parent {
	
	String name1 = "황혜진";
    
    public void printName(){
        System.out.println(name1);
    }
}
```

```java
//자식 메서드
public class Child extends Parent{
    
    String name = "짱구";
    
    public void printDetails(){
        super.printName();
        System.out.println(name);
    }
    
    public void details(){
        System.out.println(super.name1 + "은 " + name + "을 좋아합니다.");
    }
    
}
```

```java
// 출력 메서드
public class Main{
    public static void main (String[] args){
        Child child = new Child();
        
        child.printDetails();
        child.details();
    }
}
```

부모 클래스인 Parent에서 생성자와 메서드를 자식클래스인 Child에서 접근할 수 있다.<br/>결과는 "황혜진 짱구 황혜진은 짱구을 좋아합니다"<br/>



**문제점**

-상속을 받은 부모클래스의 추상 메서드는 자식클래스에서 재정의(override)을 해야하는데 놓치는 경우가 있다. 이를 보안하기 위해 추상과 인터페이스를 사용한다.
