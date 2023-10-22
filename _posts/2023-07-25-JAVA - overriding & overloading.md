---
layout: single
title:  "JAVA - overriding & overloading"
categories: Java
tag: [JAVA]
author_profile: true
toc: true
toc_label: 목차
toc_icon: "fas fa-list"

---

<br>









# ◆overriding & overloading

- **오버라이딩 과 오버로딩의 공통점**

  클래스의 인스턴스 멤버인 메소드를 재정의 또는 확장의 개념이다.

  <br>



- **오버라이딩과 오버로딩의 차이점**

  **오버라이딩** : 부모 클래스의 상속을 받은 자식 클래스에서 확장하는 개념

  ​	-메소드 이름이 일치해야된다.<br>	-메소드 매개변수의 개수, 순서 , 데이터 타입 일치해야된다.<br>	-메소드의 return 타입이 일치해야 한다.

  **오버로딩** : 하나의 클래스 내부에서 확장하는 개념이다.

  ​	-메소드의 이름이 일치해야된다.<br>	-메소드의 매개변수의 개수, 타입이 달라야 한다.<br>	-매소드의 return타입이 달라야 한다.



<br>







# ◆오버라이딩(overriding)

-상속의 관계에 있는 클래스 간에 하위 클래스가 상위 클래스의 필드나 메서드를 재정의하여 사용하는 것이다.<br/>-오버라이딩을 통해 슈퍼클래스를 부르고 싶다면 super()을 쓰면 된다.

```java
class Car{
    int speed = 0;

    public int setSpeed(int speedChange){
        this.speed = this.speed + speedChange;
        return this.speed;
    }
}

class Car2 extends Car{
    int maxSpeed = 80;

    @Override
    public int setSpeed(int speedChange) {
        this.speed = this.speed + speedChange;
        this.speed = this.speed > maxSpeed ? maxSpeed : this.speed;
        return this.speed;
    }
}

public class Overriding {

    public static void main(String[] args) {
        Car car = new Car();
        car.setSpeed(100);
        System.out.println(car.speed);//100

        Car2 car2 = new Car2();
        car2.setSpeed(100);
        System.out.println(car2.speed);//80
    }
}
```

위 코드에서 Car 와 Car 를 상속받은 Car2 두개의 클래스가 있다.

Car2 는 Car 에서 상속 받은 setSpeed 메소드를 Overriding 하여 메소드 기능을 변경하였다.

<br>







# ◆오버로딩(overloading)

-클래스 내부에서 메소드를 확장하여 사용한다.

예제)

```java
class Car{
	int modelNum;
	String model;
	
	public int setModel(int modelNum){
		this.modelNum = modelNum;
		return this modelNum;
	}
	
	public String setModel(int modelNum, String brand){
		this.model = modelNum + brand;
		return this.model;
	}
}


public class CarOverloadingTest {
    public static void main(String[] args) {
        Car car = new Car();
        car.setModel(7362);   // 7362
        car.setModel(2407, "sonata");   // sonata2407
    }
}
```

**오버로딩을 사용하는 이유**

1. 같은 기능을 하는 메소드를 하나의 이름으로 사용할 수 있다.<br>
2.  메소드의 이름을 절약할 수 있다.

![ovrriding과 overloading 차이점](C:\Users\hwang\pueser.github.io\images\2023-07-25- JAVA - overriding & overloading\ovrriding과 overloading 차이점.png)

