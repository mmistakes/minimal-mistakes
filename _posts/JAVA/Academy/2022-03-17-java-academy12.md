---
layout: single
title:  " DAY-12. 자바 상속"
categories: JAVA-academy
tag: [JAVA, 상속, super]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

# 📌2022-03-17

## 자바  

<!--Quote-->

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 


## 1️⃣ toString 오버라이딩

```java
				 
	public String toString() {
			return "Student [no=" + no + ", name=" + name + ", 
			age=" + age + ", gender=" + gender + "]";
		}
	Student std = new Student(no,name,age,gender);
	System.out.println(std);
	System.out.println(std.toString());
```

- toString으로 오버라이딩 되서 std와 std.toString과 같다

## 2️⃣ 메서드 주의 사항

- 메서드 내에서는 출력문을 작성하지 않는다

## 3️⃣ Object

![1.png](/assets/images/posts/2022-03-17/1.png)

- 모든 자료형의 최고 조상
- 회색부분의 글씨가 의미하는 것 : 메서드가 존재하는 클래스의 이름을 보여준다 ex) setName은 Product라는 클래스 안에 존재한다

## 4️⃣ 상속

부모 

```java
package com.oop.shop01;

public class Product {
	private String product_no;
	private String name;
	private int price;
	
	public Product() {
		
	}

	public Product(String product_no, String name, int price) {
		this.product_no = product_no;
		this.name = name;
		this.price = price;
	}
	
	public String getProduct_no() {
		return product_no;
	}
	public void setProduct_no(String product_no) {
		this.product_no = product_no;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	
	
}
```

자식 

```java
package com.oop.shop01;

// extends 상속받고 싶은 클래스명 
public class IceCream extends Product{

	public IceCream() {
		super();
	}

public IceCream(String product_no, String name, int price) {
		// private 접근제한자 때문에 멤버필드에 접근이 불가
		// this.product_no = product_no;
		// this.name = name;
		// this.price = price;
		this.setProduct_no(product_no);
		this.setName(name);
		this.setPrice(price);

		// 부모의 매개변수 있는 생성자 활용
		super(product_no,name,price);
	}
}
```

- super()를 통해 iceCream형 생성자를 호출하면 부모 클래스의 인스턴스 또한 생성된다.
- 부모클래스의 기본생성자를 호출하는 작업이다
- super()는 코드의 가장 첫 줄에 와야한다

## 5️⃣ 오버라이딩

부모 

```java
package com.oop.shop01;

public class Product {
	private String product_no;
	private String name;
	private int price;
	
	public Product() {
		
	}
	
	public Product(String product_no, String name, int price) {
		this.product_no = product_no;
		this.name = name;
		this.price = price;
	}

	public String getProduct_no() {
		return product_no;
	}
	public void setProduct_no(String product_no) {
		this.product_no = product_no;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	
	// 0.02 프로의 할인률이 적용된 가격을 반환 해주는 메서드
	public double getPromotionPrice() {
		return this.price * 0.02;		
	}
}
```

자식

```java
package com.oop.shop01;

// extends 상속받고 싶은 클래스명 
public class IceCream extends Product{

	public IceCream() {
		super();
	}
	
	public IceCream(String product_no, String name, int price) {
		super(product_no,name,price);
	}
	

	// 메서드 오버라이딩 
	// 부모클래스가 가지고 있는 메서드를 재정의하는 작업 
	public double getPromotionPrice() {
		return this.getPrice() * 0.01;		
	}
}
```

- 부모클래스가 가지고 있는 메서드를 재정의하는 작업
- 똑같은 이름의 메서드, 똑같은 반환타입, 똑같은 매개변수
- 오버라이딩된 메서드가 (부모보다) 우선 실행
- 부모의 price는 private이기 때문에 getPrice()로 값 가져오기
- 여기서 오버로딩은 똑같은 이름의 메서드를 매개변수 자료형이나 개수를 달리해주는 작업