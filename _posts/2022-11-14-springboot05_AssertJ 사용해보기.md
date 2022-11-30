---
layout: single
title:  "AssertJ 사용해보기"
categories: SpringBoot
tag: [Java, Spring, JPA, Spring Boot, STS, Eclipse, AssertJ, JUnit]
toc: true
toc_sticky: true
post-header: false

---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }

    table.dataframe td {
      text-align: center;
      padding: 8px;
    }

    table.dataframe tr:hover {
      background: #b8d1f3; 
    }

    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>

## AssertJ의 특징

JUit이 기본적으로 제공해주는 Assert는 너무 불편해서 AssertJ를 사용해보았다.

## 장점

- 메소드 체이닝을 지원해주기 때문에 좀 더 깔끔하고 읽기 쉬운 테스트 코드를 작성할 수 있다.
- 테스트를 하면서 필요하다고 상상할 수 있는 거의 모든 메소드를 제공한다.

## 라이브러리 의존성 설정

Java8 이상은 3.x 버전을 사용해야 한다.

- Gradle

```yaml
testCompile 'org.assertj:assertj-core:3.6.2'
```

- Maven

```xml
<dependency>
  <groupId>org.assertj</groupId>
  <artifactId>assertj-core</artifactId>
  <!-- use 2.6.0 for Java 7 projects -->
  <version>3.6.2</version>
  <scope>test</scope>
</dependency>
```

## 사용방법

모든 테스트 코드는 assertThat() 메소드에서 출발한다. 다음과 같은 포맷으로 AssertJ에서 제공하는 다양한 메소드를 연쇄 호출하면서 작성할 수 있다.

```java
assertThat(테스트 타켓).메소드1().메소드2().메소드3();
```

### 문자열 테스트

```java
assertThat("Hello, world! Nice to meet you.") // 주어진 "Hello, world! Nice to meet you."라는 문자열은
				.isNotEmpty() // 비어있지 않고
				.contains("Nice") // "Nice"를 포함하고
				.contains("world") // "world"도 포함하고
				.doesNotContain("ZZZ") // "ZZZ"는 포함하지 않으며
				.startsWith("Hell") // "Hell"로 시작하고
				.endsWith("u.") // "u."로 끝나며
				.isEqualTo("Hello, world! Nice to meet you."); // "Hello, world! Nice to meet you."과 일치합니다.
```

### 숫자 테스트

```java
assertThat(3.14d) // 주어진 3.14라는 숫자는
				.isPositive() // 양수이고
				.isGreaterThan(3) // 3보다 크며
				.isLessThan(4) // 4보다 작습니다
				.isEqualTo(3, offset(1d)) // 오프셋 1 기준으로 3과 같고
				.isEqualTo(3.1, offset(0.1d)) // 오프셋 0.1 기준으로 3.1과 같으며
				.isEqualTo(3.14); // 오프셋 없이는 3.14와 같습니다
```