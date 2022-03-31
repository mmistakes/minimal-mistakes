---
layout: single
title:  " DAY-14. 자바 ArrayList"
categories: JAVA-academy
tag: [JAVA, ArrayList]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

# 📌2022-03-21

## 자바 

<!--Quote-->

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음 


## 1️⃣ 다형성

- 다양한 형태의 성질을 가지는 것
- 한 클래스가 다양한 클래스의 성질을 가질 수 있는 것
- 상속관계에서 부모타입의 참조변수가 자식타입의 인스턴스를 담을 수 있는 것

```java
class A {
	public void funcA() {
		System.out.println("funcA");
	}
	
	public void funcExtra() {
		System.out.println("A");
	}
}

class B extends A {
	public void funcB() {
		System.out.println("funcB");
	}
	
	public void funcExtra() {
		System.out.println("B");
	}
}

public class Test {
	public static void main(String args[]) {

		A a1 = new B();
		// 부모형 참조변수로 자식의 기능을 사용하게 하고 싶다면? 
		// 강제 형변환 -> a라는 참조변수(상위클래스)를 B형으로(자식클래스) 다운캐스팅
		B b =(B)a1;
		b.funcB();
		//  ((B)a1).funcB(); 위의 두줄과 같은 의미 
		
	}
}
```

## 2️⃣ abstract / 추상클래스 / 추상메서드

- 추상메서드 : 메서드의 몸통을 만들지 않고 틀만 만들어 놓은 메서드 → 반드시 자식 메서드에서 재정의하여 사용해야하는 메서드
- 추상메서드를 하나라도 가진 클래스는 반드시 추상 클래스가 되어야한다
- 추상클래스 -> 더이상 직접 new를 못함

## 3️⃣ ArrayList : 똑똑한 동적 배열

```java
	// ArrayList : 똑똑한 동적 배열
	// 배열과 ArrayList 비교 
		
	// 1.생성 
	String[] arr = new String[5];
	ArrayList list = new ArrayList();// 중간에 꺽쇠괄호가 나온다 -> 사이즈를 기재해주지 않음
		
	// 2. apple 값 추가
	arr[0] = "apple";
	list.add("apple");
		
	// 3. 값 출력
	System.out.println("arr[0] : "+ arr[0]); // arr[0] : apple
	System.out.println("list.get[0] : " + list.get(0)); // list.get[0] : apple
		
	// 값을 더 추가 banana, kiwi, mango
	arr[1] = "banana";
	arr[2] = "kiwi";
	arr[3] = "mango";
		
	list.add("banana");
	list.add("kiwi");
	list.add("mango");
		
	// 길이 값 출력 
	System.out.println("arr.length : " + arr.length); // 5
	System.out.println("list.size : " + list.size()); // 4

	// 4. 값 삭제 1번 인덱스에 있는 값을 삭제
	arr[1] = null;
	System.out.println("arr[1] : " + arr[1]);
	System.out.println("arr.length : " + arr.length);
		
	System.out.println("삭제 전 list.get(1) : " + list.get(1)); // 삭제 전 list.get(1) : banana
	System.out.println("삭제 전 list.size() : " + list.size()); // 4
	list.remove(1);
	System.out.println("삭제 후 list.get(1) : " + list.get(1)); // 삭제 후 list.get(1) : kiwi
	System.out.println("삭제 후 list.size() : " + list.size()); // 3
```

### 메서드

1. add : 값 추가 (팬케익 쌓이는거 처럼 추가)
- list.add(2) →  정수 2를 리스트에 추가 , `list.add(new Integer(2)); 와 같다.`
- list.add(1,”A”) → 1번 인덱스에 “A”를 추가 → 기존의 1번 인덱스는 2번으로 밀림

1. remove : 값 삭제
- list.remove(2) → 2번 인덱스를 삭제해라
- list.remove(new Integer(2)) → 정수 2를 삭제해라

1. Collections.sort() : 오름차순으로 정렬 
- Collections.sort(list);

1. size : 배열의 길이 
- list.size(); → 들어가있는 데이터만큼만 자동으로 계산해서 배열길이를 알려준다

1. get : 해당 인덱스의 값 출력 
- list.get(1) → list에서 인덱스가 1인 부분의 값을 구하기

1. subList : 원하는 인덱스의 값을 복사 
- ArrayList list2 = new ArrayList(list.subList(2,4)); → 인덱스 2번 부터 3번까지 복사한 배열이 list2에 저 장

```java
	String[] arr = new String[3];
	arr[0] = "apple";
		
	ArrayList list = new ArrayList();
	list.add("apple");
	list.add(2);

	String a = "mango";
	char temp1 = a.charAt(0);
	System.out.println(temp1); // m출력 
		
	System.out.println(list.get(0)); // apple
	System.out.println(((String)list.get(0)).charAt(0)); // a
	int temp3 = ((int)list.get(1));
	double temp4 = ((double)list.get(2));
	boolean temp5 = ((boolean)list.get(3));
```

- ArrayList에서 charAt을 사용하려면 String으로 형변환 해준다음에 사용해야 한다
- ArrayList의 조상은 Object이다