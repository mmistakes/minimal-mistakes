---
title: 'Java - Practice6 - question1'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 1

아래의 test class 코드를 완성하고 Car 클래스를 생성하여 실행한 결과

> test.java

```java
package practice6;

public class test {
	public static void main(String args[]) {
		Car car_a = new Car();
		Car car_b = new Car(3000,"c_name","Hy","Black");
		Car car_c = new Car(4000,"c_name2","DD","Red");

		Car.printInfo(car_a);
		System.out.println();
		Car.printInfo(car_c);
		System.out.println();
		Car.printNum();
	}
}
```

```
차가 생성되었습니다.
차가 생성되었습니다.
차가 생성되었습니다.
자동차의 이름은unknown
자동차의 가격은0
자동차의 브랜드는unknown
자동차의 색은black

자동차의 이름은c_name2
자동차의 가격은4000
자동차의 브랜드는DD
자동차의 색은Red

자동차는 총 3대가 있습니다.
```

  <br>

> **Answer**

```java
package practice6;

public class Car {
	int price;
	String name;;
	String brand;
	String color;

	static int car_num = 0;

	Car() {
		System.out.println("차가 생성되었습니다.");
		price = 0;
		name = "unknown";
		brand = "unknown";
		color = "black";
		car_num++;
	}

	Car(int price, String name, String brand, String color) {
		System.out.println("차가 생성되었습니다.");
		this.price = price;
		this.name = name;
		this.brand = brand;
		this.color = color;
		car_num++;
	}

	public static void printInfo(Car c) {
		System.out.println("자동차의 이름은" + c.name);
		System.out.println("자동차의 가격은" + c.price);
		System.out.println("자동차의 브랜드는" + c.brand);
		System.out.println("자동차의 색은" + c.color);
	}

	public static void printNum() {
		System.out.println("자동차는 총 " + car_num + "대가 있습니다.");
	}
}

```
