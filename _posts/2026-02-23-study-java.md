---
layout: post
title: "Java Stream API 마스터하기: 함수형 프로그래밍의 핵심"
date: 2026-02-23 10:07:24 +0900
categories: [java]
tags: [study, java, spring, backend, automation]
---

## 왜 Stream API가 중요한가?

Stream API는 Java 8 이후 컬렉션 데이터를 처리하는 표준 방식입니다. 실무에서는 대량의 데이터를 효율적으로 필터링, 변환, 집계해야 하는데, Stream을 모르면 복잡한 반복문을 작성하게 됩니다.

현대적인 Java 코드는 Stream을 기본으로 사용합니다. 레거시 코드 유지보수나 새 프로젝트 모두에서 필수 기술입니다.

## 핵심 개념

- **지연 평가(Lazy Evaluation)**
  중간 연산은 실행되지 않고, 최종 연산이 호출될 때만 실행됩니다.

- **불변성(Immutability)**
  Stream 연산은 원본 컬렉션을 변경하지 않고 새로운 Stream을 반환합니다.

- **함수형 인터페이스**
  람다식으로 동작을 정의하며, 코드가 간결해집니다.

- **중간 연산 vs 최종 연산**
  filter, map은 중간 연산이고, collect, forEach는 최종 연산입니다.

- **병렬 처리 지원**
  parallelStream()으로 멀티스레드 처리가 가능합니다.

## 실전 예제

### 기본 Stream 사용법

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

// 짝수만 필터링하고 2배로 변환
List<Integer> result = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .collect(Collectors.toList());

System.out.println(result); // [4, 8, 12]
```

### 실무 예제: 사용자 데이터 처리

```java
class User {
    private String name;
    private int age;
    private String department;
    
    // 생성자, getter 생략
}

List<User> users = Arrays.asList(
    new User("김철수", 28, "개발"),
    new User("이영희", 35, "마케팅"),
    new User("박민준", 26, "개발")
);
```

개발팀 직원만 추출하고 이름을 수집하는 코드입니다.

```java
List<String> devTeam = users.stream()
    .filter(user -> "개발".equals(user.getDepartment()))
    .map(User::getName)
    .collect(Collectors.toList());

System.out.println(devTeam); // [김철수, 박민준]
```

### 그룹화와 집계

```java
// 부서별로 그룹화하고 인원수 계산
Map<String, Long> deptCount = users.stream()
    .collect(Collectors.groupingBy(
        User::getDepartment,
        Collectors.counting()
    ));

System.out.println(deptCount); // {개발=2, 마케팅=1}
```

## 흔한 실수

- **Stream을 여러 번 사용하려고 시도**
  Stream은 일회용입니다. 한 번 최종 연산을 실행하면 닫혀서 재사용할 수 없습니다.

- **지연 평가를 무시하기**
  중간 연산만 작성하고 최종 연산을 빼먹으면 아무것도 실행되지 않습니다.

- **작은 데이터에 parallelStream() 사용**
  병렬 처리의 오버헤드가 성능 이득보다 클 수 있습니다. 대량 데이터(수천 개 이상)에만 사용하세요.

- **null 처리 미흡**
  Stream에 null 값이 포함되면 NullPointerException이 발생합니다. filter로 미리 제거하세요.

- **복잡한 람다식 작성**
  람다식이 3줄 이상이면 메서드로 분리하는 것이 가독성이 좋습니다.

## 오늘의 실습 체크리스트

- [ ] filter()와 map()을 조합하여 데이터 변환하기
- [ ] collect()로 List, Set, Map으로 수집하기
- [ ] groupingBy()를 사용해 데이터 그룹화하기
- [ ] flatMap()으로 중첩된 컬렉션 평탄화하기
- [ ] 자신의 프로젝트에서 for 반복문 하나를 Stream으로 리팩토링하기
- [ ] 작은 데이터셋과 큰 데이터셋에서 parallelStream() 성능 비교하기
