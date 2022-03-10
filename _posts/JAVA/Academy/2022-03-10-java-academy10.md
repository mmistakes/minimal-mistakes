---
layout: single
title:  " DAY-10. 자바 국비지원 수업"
categories: JAVA-academy
tag: [JAVA, 객체, 라이브러리]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

# 📌2022-03-10

## 자바 수업 
<!--Quote-->
> *본 내용은 국비수업을 바탕으로 작성*

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 


## **1️⃣ 과제 코드 리뷰**

- 메서드 내에서 System.out.println을 해주는 것이 아닌 메서드의 타입을 Void가 아닌 String으로 한뒤 return으로 돌려주기

## **2️⃣ 클래스와 객체**

```java
package com.oop.cls;

public class Laptop {
	/*
	 * 추상화 : 노트북이 가지고 있는 특성, 기능을 추려내는 작업 
	 * 
	 * 특성 : 브랜드, 색상, 가격, 사이즈
	 * 기능 : 전원 on/off
	 * 
	 * 
	 * */
	
	// 맴버변수(맴버필드)를 특성을 기준으로 해서 작성
	String brand;
	String color; 
	int price;
	double size;
	
	// 기능 -> 메서드(맴버 메서드)
	public void powerOn() {
		System.out.println("전원이 켜졌습니다");
	}
	
	public void powerOff() {	
		System.out.println("전원을 종료합니다");
	}
	
}
```

- 패키지명은 소문자로 작성
- Laptop을 특성과 기능으로 나뉘어서 생각 → 특성은 맴버 변수 , 기능은 맴버 메서드



Laptop 클래스를 실행하는 파일

```java
package com.oop.cls;

public class Run {

	public static void main(String[] args) {
		// 사용자가 정의해 만들어진 클래스는 참조자료형
		Laptop laptop = new Laptop();
		System.out.println(laptop); // com.oop.cls.Laptop@4aa8f0b4 주소값이 나옴
	}

}
```

```java
package com.oop.cls;

public class Run {

	public static void main(String[] args) {
		// 사용자가 정의해 만들어진 클래스는 참조자료형
		Laptop laptop = new Laptop();
		laptop.brand = "L"; // 기존의 디폴트 값인 null 값에서 LG로 바뀜
		laptop.color = "white"; // 기존의 디폴트 값인 null 값에서 white로 바뀜
		laptop.price = 500000;  // 기존의 디폴트 값인 0에서 500000로 바뀜 
		laptop.size = 16.5; // 기존의 디폴트 값인 0.0d에서 16.5로 바뀜
	}

}
```

![1.jpg](/assets/images/posts/2022-03-10/1.jpg)

![2.jpg](/assets/images/posts/2022-03-10/2.jpg)

- new는 Heap영역에 저장을 의미

### 특징

1. 추상화 : 노트북이 가지고 있는 특성, 기능을 추려내는 작업
2. 정보은닉(캡슐화) : 사용자가 접근하면 안되는 데이터들을 내부적으로 숨기거나 접근을 제한하는 것, 접근제한자 사용

### 접근 제한자

1. public : 외부, 모든 곳에서 접근이 가능
2. private : 반드시 해당 클래스 내부에서만 접근 가능 
3. protected : 같은 패키지 혹은 상속
4. default : 같은 패키지 안에서는 모두 접근이 가능

## 3️⃣ getter / setter - 정보은닉

```java
package com.oop.cls;

public class Car {
	private String brand; 
	private int speed;
	private int oil;
	
	public String getBrand() {
		return this.brand;
	}
	
	public void setBrand(String brand) {
		if(brand.equals("BMW")) { // BMW입력을 받으면 Hyundai로 전달 
			this.brand = "Hyundai";
		}
		else this.brand = brand;
	}
}

package com.oop.cls;

public class Run02 {

	public static void main(String[] args) {
		Car avante = new Car();
		avante.setBrand("BMW");
		System.out.println(avante.getBrand()); // Hyundai 출력
		
	}
}
```

- private으로 맴버변수를 설정하면 getter / setter 필수
- getter와 setter의 이름설정은 get + 맴버변수 이름 / set + 맴버변수 이름
- getter : read-only > setter : write-only(getter와 setter는 반드시 public 으로 해야한다)
- setter는 메서드이기에 조건을 둘수있다.
- 자동생성 방법 : 우측마우스 → source → Generate Getters and Setters

## 4️⃣ 생성자 (Constructor)

- 리턴타입 없음
- 클래스명과 이름이 같음
- 인스턴스가 만들어질 때 초기화 해주는 역할
- 기본생성자는 명시하지 않아도 알아서 생성해줌
- 다만 매개변수가 있는 생성자를 정의하는 순간부터는 기본생성자를 자동으로 만들어주지 않음
- 생성자 또한 메서드이기 때문에 오버로딩이 가능
- 자동생성 방법 : 우측마우스 → source → Generate Constructors using fileds

## 5️⃣ JOptionPane

### 1) showInputDialog

```java
String name = JOptionPane.showInputDialog("1. 이름을 입력하세요."); //String으로 반환된다.
System.out.println(name);
```

![3.png](/assets/images/posts/2022-03-10/3.png)

- JOptionPane.showInputDialog의 반환은 String으로 된다. → 정수나 다른 형으로 바꾸려면 Parse사용

### 2)showMessageDialog

```java
String name = JOptionPane.showInputDialog("1. 이름을 입력하세요."); //String으로 반환된다.
JOptionPane.showMessageDialog(null, name); // 첫번째는 null 값
// JOptionPane.showMessageDialog(null, args); // args는 String 뿐만 아니라 다른타입도 가능
```

- 이름을 톰이라고 입력했을 때의 결과

![4.png](/assets/images/posts/2022-03-10/4.png)

### 3) 예제 코드

 

```java
		String name = JOptionPane.showInputDialog("1. 이름을 입력하세요."); //String으로 반환된다.
		JOptionPane.showMessageDialog(null, name+"님 어서오세요"); // 첫번째는 null 값
		
		int count = Integer.parseInt(JOptionPane.showInputDialog("2. 인원수를 입력해 주세요"));
		if(count == 1) JOptionPane.showMessageDialog(null, "혼밥 손님입니다");
		else JOptionPane.showMessageDialog(null, "손님 " + count + "명 입장하였습니다.\n");
		
		
		double temp = Double.parseDouble(JOptionPane.showInputDialog("3. 현재 체온을 입력해 주세요."));
		if(temp >= 36.5 && temp <= 37) JOptionPane.showMessageDialog(null, "정상 체온입니다.");
			else if(temp > 37) JOptionPane.showMessageDialog(null, "체온이 너무 높습니다.");
				else JOptionPane.showMessageDialog(null, "체온이 너무 낮습니다.");
		
		boolean tf = Boolean.parseBoolean(JOptionPane.showInputDialog("4. 매장 식사 여부를 입력해 주세요."));
		if(tf) JOptionPane.showMessageDialog(null, "매장 손님입니다");
		else JOptionPane.showMessageDialog(null, "포장 손님입니다");
```

## 6️⃣ 라이브러리 사용

- 패키지 우측 마우스 build path 클릭 > java bulid path >  Libraries > Classpath > Add External jars
- try ~ catch 문에서 catch 안에 e.printStackTrace(); 사용