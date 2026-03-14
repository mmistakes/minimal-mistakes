---
layout: post
title: "Java Stream API 마스터하기: 함수형 프로그래밍의 핵심"
date: 2026-03-14 10:04:26 +0900
categories: [java]
tags: [study, java, spring, backend, automation]
---

## 왜 Stream API가 중요한가?

Stream API는 Java 8부터 도입된 함수형 프로그래밍 패러다임입니다. 실무에서 컬렉션 데이터를 처리할 때 코드를 간결하고 읽기 쉽게 만들어줍니다.

대규모 데이터셋을 효율적으로 필터링, 변환, 집계할 수 있습니다. 병렬 처리도 간단하게 구현할 수 있어 성능 최적화에 도움됩니다.

## 핵심 개념

- **Lazy Evaluation(지연 평가)**
  중간 연산은 실행되지 않고, 최종 연산이 호출될 때만 실제 처리가 시작됩니다.

- **Immutability(불변성)**
  Stream 처리 중에 원본 컬렉션이 변경되지 않습니다. 함수형 프로그래밍의 기본 원칙입니다.

- **중간 연산(Intermediate Operations)**
  filter(), map(), sorted() 등이 있으며, 다시 Stream을 반환합니다.

- **최종 연산(Terminal Operations)**
  collect(), forEach(), reduce() 등이 있으며, 최종 결과를 반환합니다.

- **병렬 처리(Parallel Streams)**
  parallelStream()을 사용하면 멀티스레드로 데이터를 처리할 수 있습니다.

## 실전 예제

### 기본 Stream 처리

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

// 짝수만 필터링하고 제곱하기
List<Integer> result = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .collect(Collectors.toList());

System.out.println(result); // [4, 16, 36, 64, 100]
```

### 객체 리스트 처리

```java
class User {
    String name;
    int age;
    
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

List<User> users = Arrays.asList(
    new User("Alice", 25),
    new User("Bob", 30),
    new User("Charlie", 22)
);

// 25세 이상 사용자의 이름만 추출
List<String> adultNames = users.stream()
    .filter(user -> user.age >= 25)
    .map(user -> user.name)
    .collect(Collectors.toList());

System.out.println(adultNames); // [Alice, Bob]
```

### 집계 연산

```java
List<Integer> scores = Arrays.asList(85, 90, 78, 92, 88);

// 평균 계산
double average = scores.stream()
    .mapToInt(Integer::intValue)
    .average()
    .orElse(0.0);

System.out.println("평균: " + average); // 평균: 86.6

// 합계 계산
int sum = scores.stream()
    .reduce(0, Integer::sum);

System.out.println("합계: " + sum); // 합계: 433
```

## 자주 하는 실수

- **Stream 재사용 시도**
  Stream은 일회용입니다. 한 번 최종 연산을 실행하면 다시 사용할 수 없습니다. 필요하면 새로운 Stream을 생성해야 합니다.

- **병렬 처리의 무분별한 사용**
  작은 데이터셋에서 parallelStream()을 사용하면 오버헤드가 더 커서 성능이 떨어집니다. 충분히 큰 데이터셋에서만 사용하세요.

- **null 처리 누락**
  filter() 조건에서 null 체크를 하지 않으면 NullPointerException이 발생합니다. Optional을 활용하거나 명시적으로 null을 처리하세요.

- **지연 평가의 오해**
  중간 연산만으로는 아무것도 실행되지 않습니다. 최종 연산(collect, forEach 등)이 반드시 필요합니다.

- **부작용(Side Effects) 포함**
  Stream 내에서 외부 상태를 변경하면 예측 불가능한 결과가 발생합니다. 순수 함수를 사용하세요.

## 오늘의 실습 체크리스트

- [ ] filter()와 map()을 조합한 간단한 Stream 코드 작성하기
- [ ] 객체 리스트에서 특정 조건으로 필터링하고 필드 추출하기
- [ ] reduce()를 사용해 합계, 곱셈, 최댓값 구하기
- [ ] Collectors.groupingBy()로 데이터 그룹화하기
- [ ] 작은 데이터셋과 큰 데이터셋에서 parallelStream() 성능 비교하기
- [ ] Optional과 함께 Stream 사용하여 null 안전하게 처리하기
