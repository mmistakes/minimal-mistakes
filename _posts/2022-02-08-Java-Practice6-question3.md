---
title: 'Java - Practice6 - question3'
categories:
  - Java
tags:
  - Java
toc: true
toc_sticky: true
toc_label: 'Java'
---

# 문제 3

다음 조건을 만족하는 Arr클래스를 작성하고 test클래스를 생성하세요.

- Arr클래스는 int array를 변수로 갖는다.
- Arr클래스는 array크기를 파라미터로 받아서 객체를 생성한다.
  객체 생성시 사용자로부터 int array의 원소들을 입력받게 된다.
- Arr클래스에는 max, min 함수를 이용해서 array의 웑소 중 가장 큰 원소와 가장 작은 원소를 출력하는 기능을 한다.
- Arr클래스의 정적함수 avr은 2개의 Arr클래스, xrr, yrr을 parameter로 사용하여 xrr, yrr 속 array원소들의 평균을 출력하는 기능을 한다.  
  <br>

> **Answer**

- Arr.java

```java
package practice6;

import java.util.Scanner;

public class Arr {
	int[] array;
	static int size;

	Arr(int size) {
		Scanner sc = new Scanner(System.in);

		this.size = size;
		array = new int[size];

		System.out.println("array의 원소를 입력하세요");
		for (int i = 0; i < size; i++)
			array[i] = sc.nextInt();
	}

	void max() {
		int tmp = array[0];
		for (int i = 0; i < size - 1; i++) {
			if (tmp < array[i + 1])
				tmp = array[i + 1];
		}
		System.out.println("array의 원소 중 가장 큰 원소는 " + tmp);
	}

	void min() {
		int tmp = array[0];
		for (int i = 0; i < size - 1; i++) {
			if (tmp > array[i + 1])
				tmp = array[i + 1];
		}
		System.out.println("array의 원소 중 가장 작은 원소는 " + tmp);
	}

	static void avr(Arr xrr, Arr yrr) {
		int sum_xrr = 0, sum_yrr = 0, avr_xrr = 0, avr_yrr = 0;

		for (int i = 0; i < size; i++)
			sum_xrr += xrr.array[i];
		for (int j = 0; j < size; j++)
			sum_yrr += yrr.array[j];

		avr_xrr = sum_xrr / size;
		avr_yrr = sum_yrr / size;

		System.out.println("xrr 속 array 원소들의 평균: " + avr_xrr);
		System.out.println("yrr 속 array 원소들의 평균: " + avr_yrr);
	}
}
```

- test3.java

```java
package practice6;

import java.util.Scanner;

public class test3 {
	public static void main(String args[]) {
		int size;

		Scanner sc = new Scanner(System.in);

		System.out.println("array의 크기를 입력하시오");
		size = sc.nextInt();

		Arr a1 = new Arr(size);
		Arr a2 = new Arr(size);
		a1.max();
		a1.min();
		a2.max();
		a2.min();

		Arr.avr(a1,a2);
	}
}

```
