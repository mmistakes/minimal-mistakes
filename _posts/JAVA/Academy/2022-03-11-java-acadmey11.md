---
layout: single
title:  " DAY-11. 자바"
categories: JAVA-academy
tag: [JAVA, 객체, 객체 배열, char]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

# 📌2022-03-11

## 자바 

<!--Quote-->

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 

## **1️⃣ 객체 배열**

```java

// 클래스 
public class Laptop {
	// brand, price, color 
	// printAll() -> String 반환타입 
	
	private String brand;
	private int price; 
	private String color;
	
	public Laptop() {
		
	}

	public Laptop(String brand, int price, String color) {
		this.brand = brand;
		this.price = price;
		this.color = color;
	}

	public String getBrand() {
		return this.brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public int getPrice() {
		return this.price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getColor() {
		return this.color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String printAll() {
		return this.brand +" : "+ this.price +" : "+ this.color;
	}
	
}

```

### 객체 배열의 형태

```java
// 기본 배열 
int[] arr = new int[3];

// 객체 배열 
Laptop[] laptops = new Laptop[3]; 
```

![1.jpg](/assets/images/posts/2022-03-11/1.jpg)

- new를 만나면 Heap에 저장

```java

// Main(실행) 

Laptop[] laptops = new Laptop[3];
laptops[0] = new Laptop("LG",20000,"white");
laptops[1] = new Laptop("Apple",500000,"space grey");
laptops[2] = new Laptop("Samsung",300000,"black");

for(int i = 0; i<laptops.length; i++) {
			System.out.println(laptops[i]); // 주소값 출력 
		}

for(int i = 0; i<laptops.length; i++) {
			System.out.println(laptops[i].printAll()); 
		}

// 출력 1
LG : 20000 : white
Apple : 500000 : space grey
Samsung : 300000 : black

```

### 수정

```java
// 값 수정 
laptops[2].setBrand("Dell");
laptops[2].setColor("blue");

for(int i = 0; i<laptops.length; i++) {
			System.out.println(laptops[i].printAll()); 
		}

// 출력 2 
LG : 200000 : white
Apple : 500000 : space grey
Dell : 300000 : blue

laptops[0] = new Laptop("LG",200000,"white");
laptops[1] = new Laptop("Apple",500000,"space grey");
laptops[2] = new Laptop("Samsung",300000,"black");

// 수정 
laptops[1] = null;
	
		for(int i = 0; i<laptops.length; i++) {
			if(laptops[i] != null) {
				System.out.println(laptops[i].printAll());				
			}
		}

// 출력 3 : 출력에 Apple이 안나옴
LG : 200000 : white
Samsung : 300000 : black
```

## **2️⃣ java.lang.Error: Unresolved compilation problem 오류 발생**

> 패키지에 빨간 불이 들어옴
> 

![3.png](/assets/images/posts/2022-03-11/3.png)

![4.png](/assets/images/posts/2022-03-11/4.png)

1. 패키지를 클릭 후, Refresh 선택 
2. Project 선택 후, Clean 
3. 실행 후 변함없으면 이클립스 껐다 켜보기

- char Scanner 받기 : char ch = sc.nextLine().chatAt(0);