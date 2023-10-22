---
layout: single
title:  "JAVA - Interface"
categories: Java
tag: [JAVA]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>







# ◆Interface

 **극단적으로 동일한 목적 하에 동일한 기능을 수행하게끔 강제하는 것이 바로 인터페이스의 역할이자 개념이다.**<br>**자바의 다형성을 극대화하여 개발코드 수정을 줄이고 프로그램 유지보수성을 높이기 위해 인터페이스를 사용한다.**

인터페이스는 **interface** 키워드를 통해 선언할 수 있으며 **implements** 키워드를 통해 일반 클래스에서 인터페이스를 구현할 수 있다.<br>포함 되는 것 : 상수, 추상 메서드<br>추상과 다른점은 다형성과 이름은 대문자로 시작한다는 점

<br>







# ◆Interface의 특징

1. **다중 상속 가능**<br>인터페이스는 껍데기만 존재하여 클래스 상속 시 발생했던 모호함이 없습니다. 고로 다중 상속이 가능합니다.

2. **추상 메서드와 상수만 사용 가능**<br>인터페이스에는 구현 소스를 생성할 수 없습니다. 고로 상수와 추상 메서드만 가질 수 있습니다.

3. **생성자 사용 불가**<br>인터페이스 객체가 아니므로 생성자를 사용하실 수 없습니다.

4. **메서드 오버라이딩 필수**<br>자식클래스는 부모 인터페이스의 추상 메서드를 모두 오버라이딩해야 합니다. 

<br>







# ◆추상 메서드 선언방법 &  상수 선언방법

**상수** : 인터페이스에서 값을 정해줄테니 함부로 바꾸지 말고 제공해주는 값만 참조해라 (절대적)<br>**추상메소드** : 가이드만 줄테니 추상메소드를 오버라이팅해서 재구현해라. (강제적)

```java
//부모 클래스

public interface Animal {
    public static final String Dog = "강아지"; //상수
    
    public abstract void move(String name);
    public void animal();//abstract 생략가능
}
```

<br>



## 1)단일 인터페이스 상속

```java
//자식 클래스
public class Dog implements Animal{
    
    @Override
    public void move(String name) {
        if(name == Animal.Dog){
            System.out.println("터벅터벅~~");
        }else{
            System.out.println("슥슥~~");
        }
    }
    
    @Override
    public void animal(String name) {
        System.out.println(name + "은 걷습니다.");
    }
}
```

```java
//출력 메서드
public class Main{
    public static void main(String[] args){
        Dog dog = new Dog();
        
        dog.move("강아지")
        dog.animal("강아지")
        
    }
}
```





**@Override 사용하는 이유**

  부모의 클래스나 인터페이스로부터 어노테이션 바로 다음에 사용한 메서드라는 걸 말합니다. 만약 이 오버라이드 어노테이션이 없다면 부모로부터 오버 라이딩되었는지 확신할 수 없습니다. 그래서 만약 해당 어노테이션을 사용하면 컴파일러에게 부모 클래스에 있는 메서드명과 매개 변수 등이 동일한지 체크를 합니다. 그래서 정확히 해당 클래스가 오버라이딩 됐는지 확인이 가능합니다.



참고 블로그 : <a href="https://limkydev.tistory.com/197">인터페이스[limkydev.tistory.com]</a>

