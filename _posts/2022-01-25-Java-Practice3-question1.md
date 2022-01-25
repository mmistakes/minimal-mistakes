---
title: '2022-01-25-Java-Practice3-question1'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 1

아래 표를 보고 Snack 클래스를 생성한다.  
그런 다음 객체 한 개를 생성하여 setInfo()함수를 이용해 name, price, numberofsnack에 대한 정보를 설정한 후에 printInfo()함수를 이용해 객체의 정보를 출력한다

---

- 테스트용 클래스를 만들어서 Snack 객체를 생성하셔야 합니다.
- setInfo(), printInfo()함수는 직접 만들어서 실행하여야 하며 name, price, numberofsnack은 사용자로부터 직접 값을 입력받아야 합니다.

---

## Snack 클래스

- Snack
  - name
  - price
  - numberofsnack
  * setInfo()
  * printInfo()

---

## 콘솔 입출력 결과

```java
Snack name: Ohyes
Snack price: 3000
Number of snacks: 20
Snack name is Ohyes
Snack price is 3000
There is 20 snack
```

<br>

> **Answer**

### snack.java

```java
package practice3;

public class Snack {
	public String name;
	public int price;
	public int numberofsnack;

	public void setInfo(String name, int price, int numberofsnack) {
		this.name = name;
		this.price = price;
		this.numberofsnack = numberofsnack;
	}

	public void printInfo() {
		System.out.println("Snack name is " + name);
		System.out.println("Snack price is " + price);
		System.out.println("There is " + numberofsnack + " snack");
	}
}
```

### question1.java

```java
package practice3;

import java.util.Scanner;

public class question1 {

	public static void main(String args[]) {
		Scanner sc = new Scanner(System.in);

		Snack s = new Snack();

		System.out.print("Snack name: ");
		String name = sc.nextLine();
		System.out.print("Snack price: ");
		int price = sc.nextInt();
		System.out.print("Number of snacks: ");
		int numberofsnack = sc.nextInt();

		s.setInfo(name, price, numberofsnack);
		s.printInfo();
	}
}
```
