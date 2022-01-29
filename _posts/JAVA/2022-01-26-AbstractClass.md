---
layout: single
title:  "Abstract Class ( 추상 클래스 )"
categories: 
    - JAVA
tags: 
    - [2022-01, JAVA, STUDY]
sidebar:
    nav: "docs"
---

# <a style="color:#00adb5">Abstract Class</a>

## 추상 클래스란 무엇인가 ?
### <b><a style="color:#00adb5">Abstract Class</a></b>
추상 클래스는 <b><a style="color:red">상속 전용의 클래스이다.</a></b><br>
추상 클래스는 실체클래스의 공통적인 부분(변수, 메서드)을 추출하여 선언한 클래스이다. <br>
객체를 생성할 수 없는 클래스라는 의미로 <b><a style="color:red">'abstract'</a></b> 키워드를 클래스 선언부에 추가한다.<br>

### <b><a style="color:#00adb5">Abstract Method</a></b>
추상 메서드는 자손 클래스에서 반드시 <b><a style="color:red">재정의(overriding)</a></b>하여 사용하여야 하기 때문에 조상 클래스에서의 구현이 무의미한 메서드이다.<br>
구현부가 없다는 의미로  <b><a style="color:red">'abstract'</a></b> 키워드를 메서드 선언부에 추가한다.<br>
구현부는 없으므로 세미콜론(;)으로 대체한다.<br>
작성 되어 있지 않은 구현부는 자식 클래스에서 오버라이딩하여 작성한다.<br>

추상 클래스도 추상 메서드를 포함하고 있다는 것만 제외하면 일반 클래스와 다른 것이 없다.<br> 그래서 생성자, 일반 메서드 등등을 작성할 수 있다.<br>


클래스 안에 구현부 (body) 가 없는 메서드가 있어서 <b><a style="color:red">객체를 생성할 수 없는 클래스</a></b>이다. <br>하지만 상위 클래스 타입으로써 자식은 참조할 수 있다.<br>

- 만약 조상 클래스에서 상속받은 <b><a style="color:red">abstract 메서드를 재정의 하지 않은 경우</a></b><br>
- 자식 클래스도  <b><a style="color:red">abstract 클래스</a></b>로 선언 되어야 한다.<br>

## 추상 클래스를 사용하는 이유 ?
추상클래스를 사용하는 이유는 한 마디로 얘기하자면 <br>
 <b><a style="color:red">구현의 강제를 통해 프로그램 안정성을 향상 시키기 위해서이다.</a></b><br>
예를 들어 몇십명의 개발자들에게 자동차를 상속받아 클래스를 구현하라고 하면 변수명, 메서드명들은 다 다를 것이다. <br>만약 A자동차가 아닌 B자동차로 바꿔야한다면 변수와 메서드명이 같다면 객체 인스턴스만 변경하면 되는데 그렇지 않아서 새로 개발하는 느낌이 들 것이다. <br>그래서 !!! 추상 클래스를 사용하는 것이다. 필드와 메서드명을 통일하여 <b><a style="color:red">유지보수성과 통일성</a></b>을 유지할 수 있다. <br>
그리고 강제로 주어지는 필드와 메서드를 가지고 나만의 스타일을 구현하는데 집중할 수 있다. 즉  <b><a style="color:red">시간절약</a></b>도 된다.<br><br>

## 추상 클래스 실습 해보즈아 !
### <a style="color:#00adb5"><b>Vehicle Class</b></a>

```java
public abstract class Vehicle {             //추상 클래스
	public int price;                       //필드

	public abstract void go();              //추상 메서드

	public void start() {                   //일반 메서드
		System.out.println("시동 부르릉");
	}

}
```
<hr>
Vehicle이라는 추상 클래스를 구현했다. 앞에 abstract 키워드가 붙었기 때문에 추상 클래스임을 알 수 있다.<br>
내부에는 price 필드와 start()라는 일반 메서드, go()라는 추상 메서드가 있다. <br>추상 메서드 또한 abstract 키워드가 붙었고 구현부가 없이 세미콜론으로 마무리된 것을 볼 수 있다. 이게 추상 메서드의 특징이다.<br>
그래서 <b><a style="color:red">반드시 추상클래스를 상속받는 실체클래스들은 go()를 상속받아 재정의(overriding)</a></b> 해야한다. <br>
<hr>

### <a style="color:#00adb5"><b>Car Class</b></a>

```java
public class Car extends Vehicle {
	public Car() {
		this.price = 1000;
	}

	@Override
	public void go() {      //재정의(overriding)
		System.out.println("부와와와아아아아앙");

	}
}
```
<hr>

extends 키워드를 통해 Vehicle을 상속받은 Car 실체클래스이다. <br>
Car는 Vehicle의 자식클래스이다.<br>
go()를 오버라이딩해서 구현한 모습을 볼 수 있다.<br>

<hr>

### <a style="color:#00adb5"><b>Bus Class</b></a>

```java
public class Bus extends Vehicle {
	public Bus() {
		this.price = 300;
	}

	@Override
	public void go() {      //재정의(overriding)
		System.out.println("덜덜덜덜");

	}
}
```
<hr>
extends 키워드를 통해 Vehicle을 상속받은 Bus 실체클래스이다. <br>
Bus는 Vehicle의 자식클래스이다.<br>
go()를 오버라이딩해서 구현한 모습을 볼 수 있다.<br>

<hr>

### <a style="color:#00adb5"><b>Main Class</b></a>

```java
public class VehicleTest {
	public static void main(String[] args) {
		Car car = new Car();
		Bus bus = new Bus();

		car.start();
		car.go();
		bus.start();
		bus.go();
		System.out.println();

		// Vehicle v = new Vehicle();   객체 생성 불가
		Vehicle car2 = new Car();
		Vehicle bus2 = new Bus();

		car2.start();
		car2.go();
		bus2.start();
		bus2.go();


	}
}
```
<hr>
Main문이 있는 VehicleTest 클래스이다.<br>
객체 생성을 해주고 , 각 메서드를 호출하였다.<br>
다음은 추상 클래스가 객체 생성은 못하지만 자식이 참조할 수 있다는 것을 보여준다. ( 주석 )<br>
참조하여 메서드를 호출해도 같은 결과가 나오는 것을 볼 수 있다.<br>
<hr>

<a style="color:#00adb5">출력 결과</a>
시동 부르릉<br>
부와와와아아아아앙<br>
시동 부르릉<br>
덜덜덜덜<br>
시동 부르릉<br>
부와와와아아아아앙<br>
시동 부르릉<br>
덜덜덜덜<br>
<hr>

### 추상 클래스 마무리
<b><a style="color:red">OOJ ( Object Oriented Programming )</a></b><br>
추상 클래스를 사용하면 객체지향 프로그래밍에 한 발자국 더 가까이 갈 수 있다고 생각한다. <br>
추상 클래스를 사용하는 목적이 가장 중요하다. 무엇을 이해하기 위해서는 왜 사용하는지를 먼저 알고 이해해야 좀 더 잘 이해할 수 있다.<br>
추상 클래스의 목적 !<br>
<b><a style="color:red">구현의 강제를 통해 프로그램 안정성을 향상 시키기 위함을 기억하자</a></b> 🤗

<br><br><br><br>
참조<br>
<a href="https://limkydev.tistory.com/188" target=_blank>https://limkydev.tistory.com/188</a><br>
<a href="http://www.tcpschool.com/java/java_polymorphism_abstract" target=_blank>http://www.tcpschool.com/java/java_polymorphism_abstract</a>
