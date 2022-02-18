---
layout: single
title:  "ArrayList 메서드"
categories: JAVA 
tag: [JAVA, ArrayList]
toc: true
toc_sticky: true
author_profile: false
sidebar:
  nav: "docs"
---

## ✍ ArrayList 메서드

<!--Quote-->
> *본 내용은 자바의 정석을 바탕으로 작성*  

> ❗ 개인이 공부한 내용을 적은 것 이기에 오류가 많을 수도 있음


# 2022-02-09

# ArrayList 메서드

## add(값 추가)

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
		ArrayList<Integer> numbers = new ArrayList<Integer>();
		// ArrayList 선언시에 값 삽입
		ArrayList<Integer> numbers = new ArrayList<Integer>(Arrays.asList(10,20,40)); 
		
		numbers.add(10);
		numbers.add(20);
		numbers.add(40);
		numbers.add(1,30); // 1번 인덱스에 30을 넣어라 
		System.out.println(numbers); //[10, 30, 20, 40]
	
	}
}
```

## remove(값 제거)

```java
ArrayList<Integer> numbers = new ArrayList<Integer>(Arrays.asList(10,20,30,40));
numbers.remove(1);  // 인덱스 1번 값을 제거 
System.out.println(numbers);  // [10, 30, 40] 출력 
numbers.clear();  //모든 값을 제거
System.out.println(numbers); // [] 출력
```

## size(값 크기 구하기)

```java
ArrayList<Integer> numbers = new ArrayList<Integer>(Arrays.asList(10,20,30,40));
System.out.println(numbers.size()); // 4
```

## get(값 구하기)

```java
ArrayList<Integer> numbers = new ArrayList<Integer>(Arrays.asList(10,20,30,40));
System.out.println(numbers.get(1)); // 인덱스 1번의 값추출 → 20 출력
```

## contains / indexOf (값 찾기)

```java
ArrayList<Integer> list = new ArrayList<Integer>(Arrays.asList(10,20,30,40));
System.out.println(list.contains(20)); // list에 20이 있는지 검색 true 출력
System.out.println(list.contains(1));  // false 출력  
System.out.println(list.indexOf(40)); // 40이 있는 index반환 3 출력
System.out.println(list.indexOf(1)); // -1 출력
```

- contains : 해당 값이 있으면 있으면 true 출력,  없다면 false 출력
- indexOf :  값에 해당 한 인덱스 출력, 값이 없다면 -1 출력

## Iterator / for (반복)

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
		ArrayList<Integer> numbers = new ArrayList<Integer>();
		numbers.add(10);
		numbers.add(20);
		numbers.add(40);
		numbers.add(1,30);
		

		// 반복문 Iterator 
		Iterator it = numbers.iterator();
		while(it.hasNext()) {  // 가져올 게 있는지 체크 
			int value = (int)it.next(); // 리턴된 값들이 value로 하나씩 저장
			System.out.println(value); // value 값 출력 
		} 

		// 반복문 for 
			for(int value : numbers) {   // numbers에 들어있는 값 하나하나를 value에 담는다
				System.out.println(value); // value를 하나씩 호출 
		}
	}
}

// 10
// 30
// 20
// 40   출력 
```

## 📑 출처 

 - [자바의 정석 카페](https://cafe.naver.com/javachobostudy) 
 - [자바의 정석 유튜브](https://www.youtube.com/user/MasterNKS)