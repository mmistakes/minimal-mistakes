---
title: "Java Stream"
date: 2021-04-09 12:00:00 +0900
categories: java
comments: true
---

## Stream sorted

```java
String fruits[] = {"cherry", "cranberry", "durian", "blueberry", "guava", "grape", "gooseberry", "lemon", "kiwi", "coconut", "jackfruit", "lime", "apple", "blueberry"};
String sortedFruits[] = Arrays.stream(fruits).sorted().toArray(String[]::new);
// Arrays.toString(sortedFruits) -> [apple, blueberry, blueberry, cherry, coconut, cranberry, durian, gooseberry, grape, guava, jackfruit, kiwi, lemon, lime]
```

### Arrays.sort()
Arrays.sort(fruits) 는 fruits Array 자체가 정렬됨

## Stream filter
* Spring 3까지는 권장되었지만 4.3부터는 Constructor based Injection을 권장함

```java
String fruits[] = {"cherry", "cranberry", "durian", "blueberry", "guava", "grape", "gooseberry", "lemon", "kiwi", "coconut", "jackfruit", "lime", "apple", "blueberry"};

String berry[] = Arrays.stream(fruits).filter( v -> v.contains("berry")).toArray(String[]::new);
// -> [blueberry, blueberry, cranberry, gooseberry]

long berryCnt = Arrays.stream(fruits).filter( v -> v.contains("berry")).count();
// -> 4

long berryCntNotDup = Arrays.stream(fruits).filter( v -> v.contains("berry")).distinct().count();
// 중복제거 : distinct() -> 3

List<String> fruitList = Arrays.asList(fruits);
List<String> berryList = fruitList.stream().filter( v -> v.contains("berry")).collect(Collectors.toList());
// -> [blueberry, blueberry, cranberry, gooseberry]
```

### Array <-> List

```java
String fruits[] = {"cherry", "cranberry", "durian", "blueberry", "guava", "grape", "gooseberry", "lemon", "kiwi", "coconut", "jackfruit", "lime", "apple", "blueberry"};

List<String> fruitList = Arrays.asList(fruits);
// Array to List

String newFruits[] = fruitList.toArray(new String[fruitList.size()]);
// List to Array
```

## Stream sum

```java
int numbers[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
    	
int total1 = Arrays.stream(numbers).sum();
// -> 45

int total2 = Arrays.stream(numbers).reduce((a, b) -> (a + b)).getAsInt();
// -> 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 = 45

int mTotal = Arrays.stream(numbers).reduce((a, b) -> (a * b)).getAsInt();
// -> 1 * 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9 = 362880
```

## Stream map

```java
int numbers[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
int newNumbers[] = Arrays.stream(numbers).map(v -> v * v).toArray();
// -> [1, 4, 9, 16, 25, 36, 49, 64, 81]
```