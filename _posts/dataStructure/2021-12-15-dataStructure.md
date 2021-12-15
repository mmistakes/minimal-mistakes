---
layout: single
title: 자료구조
categories: dataStructure
toc: true
author_profile: false
sidebar:
    nav: "docs"
search: ture
---

# 자료구조-배열(array)

## 배열이란? 

- 데이터를 하나의 변수에 나열해서 저장하고 인덱스를 활용해 구성한 데이터 구조

## 배열의 장/단점

- 장점
  - 빠른 접근이 가능하다
    - 인덱스 번호로 접근하기 때문에 빠르게 접근할 수 있다
- 단점
  - 데이터의 수정이 어렵다
    - 미리 최대 길이를 지정해야 하며 데이터 삭제 시 전체 인덱스를 당겨야 한다.
- 필요성
  - 같은 종류의 데이터의 관리가 효울적이다
  - 순차적인 저장이 유용하다



# List와 ArrayList

- 공부를 하다보면 다음과 같은 형태 두가지를 자주 만날 수 있다.

```java
List<Integer> list1 = new ArrayList<>();
ArrayList<Integer> list2 = new ArrayList<>();
```

- 이 두가지 형태에서의 기능적 차이는 없다.  List는 인터페이스, ArrayList는 클래스이다. 이 차이로 인해 List는 선언할 때 좀 더 높은 유연성을 가지며 다음과 같은 선언도 가능하게 해준다.

```java
List<Integer> list1 = new ArrayList<>();
list1 = new LinkedList<>();
```

## List



### 선언

- 리스트의 선언은 다음과 같이 한다.

```java
Integer [] list1 = {1,3,4,5,6};
```

- 이것 외에도 다양한 선언 방식이 있지만 그것들은 여기서 다루지 않겠다.

### 출력

- 출력은 다음과 같이 인덱스를 사용한다.

```java
Integer [] list1 = {1,3,4,5,6};
System.out.println(list1[0]);
```

![출력결과](../../images/2021-12-15-dataStructure/출력결과.PNG)

### 형태

- 자바의 배열의 형태를 보면 왜 이렇게 출력되는지 쉽게 이해할 수 있다. 이는 java에서 확인하자



## ArrayList



### 선언

- arrayList의 선언은 앞에서 언급한 것과 같이 다음과 같다

```java
List<Integer> list1 = new ArrayList<>();
ArrayList<Integer> list2 = new ArrayList<>();
```

### 입력

- 입력은 [리스트명].add(값); 의 형태로 입력하면 순차적으로 입력된다.

```java
List<Integer> list1 = new ArrayList<>();
ArrayList<Integer> list2 = new ArrayList<>();

list1.add(1);
list1.add(2);
list1.add(3);
list1.add(4);
list1.add(5);

System.out.println(list1.size());
```

![사이즈출력](../../images/2021-12-15-dataStructure/사이즈출력.PNG)

### 출력

- 출력은 [리스트명].get(인덱스);이며 해당 인덱스에 저장되어 있는 값을 반환한다.

```java
System.out.println(list1.get(4));
```

![인덱스](../../images/2021-12-15-dataStructure/인덱스.PNG)

### 변경

- arrayList는 값을 변경 할 수 있다.
  - [리스트명].set(index, 값);

```java
System.out.println(list1.get(2));
list1.set(2,10);
System.out.println(list1.get(2));
```

![변경](../../images/2021-12-15-dataStructure/변경.PNG)

### 삭제

- arrayList는 인덱스 삭제 시 자동으로 줄어든다

```java
list1.remove(2);
System.out.println(list1.get(2));
```

![삭제](../../images/2021-12-15-dataStructure/삭제.PNG)