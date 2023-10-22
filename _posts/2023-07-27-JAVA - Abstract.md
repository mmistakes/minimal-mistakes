---
layout: single
title:  "JAVA - Abstract"
categories: Java
tag: [JAVA]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆Abstract(추상)

-멤버필드, 생성자 , 메서드(일반메서드, 추상메서드)로 이루어져 있고 **단일 상속**만 가능하다.<br/>-클래스 선언 시 **abstract**라는 키워드를 붙여서 사용한다.<br/>-추상메서드는 메서드로써 구현이 안되기 때문에 자식클래스에서 **오버라이딩**하여 사용한다.<br/>

-**사용하는 이유?? **변수와 메서드의 명칭은 각각의 클래스마다 최대한 통일을 시켜줘야 하는데 이때 추상클래스를 사용하여 하나의 클래스명을 작성하고 추상클래스의 아래객체가 상속 받는 형태로 네이밍을 통일하여 소스의 가독성을 높일 수 있다.<br/>

-**인터페이스와 다른점??** 추상은 클래스 상속은 하나만 되고 두개 이상은 인터페이스만 가능하다는 점이다.

```java
//부모 클래스
public abstract class Parent{
    public String name;
    
    public Parent(String name){
        this.name = name;
    }
    
    public void move(){
        System.out.println(name +"는 먹는다.");
    }
    
    public abstract void bark(); // 추상 메서드
}
```

추상클래스는 접적인 인스턴스화가 불가능 하다 뿐이지, super() 메소드를 이용해 추상 클래스 생성자 호출이 가능하다

```java
//자식 클래스
public class Child extands Parent{
    //public String name2;
    
    public Child(String name){
        super(name);
        
    }
    
    @override
    public void bark(){
        System.out.println("멍멍!!")
    }
}
```

```java
//출력 클래스
public class Main{
    Child child = new Child("강아지");
    
    child.bark();
    child.move();
}
```

Parent 클래스에 bark의 추상메서드를 만들고 Chiild클래스에 오버라이딩해서 메서드의 내용을 지정해주었다.<br/>

결과는 "멍멍!! 강아지 먹는다."

<br>







## 추상클래스

자바에서는 abstract 키워드를 클래스명과 메서드명 옆에 붙임으로서 컴파일러에게 추상 클래스와 추상 메서드임을 알려주게 된다.

추상 메서드는 작동 로직은 없고 이름만 껍데기만 있는 메서드라고 보면 된다. 즉, 메서드의 선언부만 작성하고 구현부는 미완성인 채로 남겨둔 메소드인 것이다. (메소드의 구현부인 중괄호가 없는 형태)

추상 클래스는 클래스의 일종이라고 하지만 new 생성자를 통해 인스턴스 객체로 직접 만들 수 없다. 왜냐하면 추상클래스는 상속 구조에서 부모 클래스를 나타내는 역할로만 이용 되기 때문이다.
