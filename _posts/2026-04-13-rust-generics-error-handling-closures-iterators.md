---
layout: single
description: "generics, error handling, closure, iterator를 예제로 익히는 Rust 기초 가이드."
title: "Rust 06. Generics, Error Handling, Closures, Iterators 기초"
lang: ko
translation_key: rust-generics-error-handling-closures-iterators
date: 2026-04-13 10:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, generics, error-handling, closures, iterators]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Rust를 조금 더 익숙하게 쓰기 시작하면 같은 로직을 여러 타입에 재사용하는 법, 실패를 숨기지 않고 다루는 법, 작은 로직을 값처럼 넘기는 법, 컬렉션 처리를 단계적으로 조합하는 법이 함께 등장한다. 이 지점을 대표하는 주제가 `generics`, error handling, closure, iterator다.

이 글은 위 네 가지를 하나의 Cargo 프로젝트 기준으로 연결해 정리한다. 결론부터 말하면 generic은 타입 일반화, `Result`와 `?`는 실패 전달, closure는 주변 값을 캡처하는 짧은 로직, iterator는 지연 평가 기반의 조합 가능한 순회 모델로 이해하면 입문 단계에서 흐름을 잡기 쉽다.

## 문서 정보

- 작성일: 2026-04-13
- 검증 기준일: 2026-04-16
- 문서 성격: tutorial
- 테스트 환경: Windows 11 Pro, Cargo 프로젝트, Windows PowerShell 예시 명령, `src/main.rs`
- 테스트 버전: rustc 1.94.0, cargo 1.94.0
- 출처 등급: 공식 문서만 사용했다.
- 비고: 대표 예제를 로컬에서 재실행했고, 고급 trait bound나 production error 설계는 범위에서 제외했다.

## 문제 정의

Rust 초급 구간에서 아래 네 가지는 자주 함께 나오지만 처음에는 서로 다른 문법처럼 느껴지기 쉽다.

- 같은 로직을 여러 타입에 재사용하려면 무엇이 필요한지
- 실패 가능성을 반환값에서 어떻게 드러낼지
- 짧은 로직을 함수처럼 넘기면서 바깥 값을 어떻게 참조할지
- 반복문 대신 데이터 처리 단계를 어떻게 조합할지

이 글은 위 질문을 입문 수준에서 연결해 설명한다. lifetime이 얽힌 generic 설계, custom error type 설계, iterator adaptor 전체, async stream은 다루지 않는다.

읽는 기준은 네 주제를 한 줄로 외우는 것이 아니라, 데이터 처리 흐름 안에서 역할을 나누는 것이다. generic은 같은 모양의 로직을 여러 타입에 열어 두고, `Result`는 실패 가능성을 값으로 드러내며, closure와 iterator는 변환 단계를 작게 조합하게 해 준다.

## 확인된 사실

- generic type parameter는 중복을 줄이면서 여러 타입에 같은 로직을 적용하는 기본 도구다.
  근거: [Generic Data Types](https://doc.rust-lang.org/book/ch10-01-syntax.html)
  의미: generic은 "아무 타입이나 받겠다"가 아니라, 필요한 조건을 만족하는 타입에 같은 구조의 코드를 적용하겠다는 뜻이다.
- recoverable error는 주로 `Result<T, E>`로 표현하며, `?` 연산자는 호환되는 반환 타입 안에서 error 전달을 간결하게 만든다.
  근거: [Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)
  의미: 실패를 예외처럼 숨기지 않고 반환 타입에 표시하면, 호출자가 성공과 실패를 모두 코드로 처리하게 된다.
- closure는 이름 없이 정의되는 함수이며, 주변 환경의 값을 캡처할 수 있다.
  근거: [Closures](https://doc.rust-lang.org/book/ch13-01-closures.html)
  의미: 짧은 변환 규칙을 함수로 따로 빼기 부담스러울 때 closure를 쓰면, 현재 스코프의 값을 함께 사용하면서 로직을 전달할 수 있다.
- iterator adaptor인 `map`, `filter` 등은 보통 지연 평가되며, `sum`, `collect`, `for` 같은 소비 시점에 실제 계산이 진행된다.
  근거: [Processing a Series of Items with Iterators](https://doc.rust-lang.org/book/ch13-02-iterators.html)
  의미: iterator 체인은 작성한 순간 바로 모든 계산을 끝내는 것이 아니라, 결과가 필요해지는 소비 지점에서 실행되는 단계 조합으로 읽어야 한다.
- 입문 실습 흐름은 `cargo new` 프로젝트 기준으로 설명하는 편이 가장 재현하기 쉽다.
  근거: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
  의미: 이 주제는 성공 경로와 실패 경로를 모두 바꿔 실행해야 하므로, Cargo 프로젝트에서 반복 확인하는 방식이 적합하다.

## 직접 재현한 결과

### 1. 실습 프로젝트를 하나 두고 예제를 바꿔 가며 실행하는 방식이 가장 편했다

- 직접 확인한 결과: 아래처럼 새 Cargo 프로젝트를 만든 뒤 `src/main.rs`에서 예제를 교체하며 `cargo run`을 반복하는 흐름이 가장 단순했다.

```powershell
cargo new rust-generics-errors-closures
cd rust-generics-errors-closures
code .
cargo run
```

### 2. generic과 `Result`는 "재사용"과 "실패 전달"을 분리해서 보여 줬다

- 직접 확인한 결과: 아래 예제로 generic 함수와 recoverable error 처리를 한 번에 확인할 수 있었다.

```rust
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn safe_divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Cannot divide by zero."))
    } else {
        Ok(a / b)
    }
}

fn main() {
    let numbers = [10, 40, 20, 30];
    println!("largest number = {}", largest(&numbers));

    match safe_divide(10.0, 0.0) {
        Ok(value) => println!("result = {}", value),
        Err(message) => println!("error = {}", message),
    }
}
```

- 관찰된 결과:

```text
largest number = 40
error = Cannot divide by zero.
```

- 읽는 법: `largest`는 타입은 달라도 비교 가능하고 복사 가능한 값이면 같은 로직을 재사용한다. `safe_divide`는 실패를 출력 문구로 숨기지 않고 `Result`로 돌려주기 때문에 호출자가 `match`로 성공과 실패를 나눠 처리한다.

### 3. closure와 iterator는 짧은 로직 전달과 단계적 데이터 처리를 잘 보여 줬다

- 직접 확인한 결과: 아래 예제로 closure의 환경 캡처와 iterator 체이닝 결과를 함께 확인할 수 있었다.

```rust
fn main() {
    let bonus = 5;
    let add_bonus = |score: i32| score + bonus;
    println!("closure result = {}", add_bonus(10));

    let total: i32 = vec![1, 2, 3, 4, 5]
        .iter()
        .copied()
        .filter(|n| n % 2 == 0)
        .map(|n| n * 2)
        .sum();

    println!("total = {}", total);
}
```

- 관찰된 결과:

```text
closure result = 15
total = 12
```

- 읽는 법: `add_bonus`는 바깥의 `bonus`를 함께 읽는 짧은 함수처럼 동작한다. iterator 체인은 짝수만 남기고 두 배로 바꾼 뒤 합산하는 데이터 처리 순서를 코드 순서 그대로 보여 준다.

### 4. 종합 예제를 돌리면 네 개념이 왜 자주 함께 나오는지 더 분명해졌다

- 직접 확인한 결과: 아래 예제는 generic, `Result`, closure, iterator를 한 흐름에 연결했다.

```rust
use std::num::ParseIntError;
use std::str::FromStr;

fn parse_values<T>(inputs: &[&str]) -> Result<Vec<T>, T::Err>
where
    T: FromStr,
{
    inputs.iter().map(|input| input.parse::<T>()).collect()
}

fn main() -> Result<(), ParseIntError> {
    let inputs = vec!["10", "20", "30"];
    let numbers = parse_values::<i32>(&inputs)?;

    let doubled_total: i32 = numbers.iter().map(|n| (n + 3) * 2).sum();

    println!("numbers = {:?}", numbers);
    println!("doubled_total = {}", doubled_total);

    Ok(())
}
```

- 관찰된 결과:

```text
numbers = [10, 20, 30]
doubled_total = 138
```

- 읽는 법: `parse_values`는 문자열 배열을 특정 타입의 `Vec<T>`로 바꾸되, 중간에 parse 실패가 있으면 `Result`로 전달한다. `?`는 실패를 숨기는 문법이 아니라 현재 함수의 반환 타입을 통해 바깥으로 넘기는 짧은 표기다.

## 해석 / 의견

- 이 단계에서 중요한 판단: generic, `Result`, closure, iterator는 실전 코드에서 따로 등장하기보다 "데이터를 읽고, 변환하고, 실패를 전달하는 하나의 흐름"으로 자주 묶인다.
- 선택 기준: 반복문이 여러 변환 단계로 길어진다면 iterator 체인을 고려하고, 실패 가능성이 있으면 반환 타입부터 `Result`로 드러낸다.
- 해석: `?` 연산자는 문법 자체보다 "실패를 바로 바깥으로 넘긴다"는 제어 흐름으로 이해해야 이후 파일 I/O나 parsing 코드로 확장하기 쉽다.

## 한계와 예외

- 이 글은 입문 예제에 맞춘 요약이다. lifetime이 섞인 generic, 고급 trait bound, custom error type, iterator adaptor 전체는 다루지 않는다.
- closure의 `Fn`, `FnMut`, `FnOnce` 차이와 borrow 규칙 심화는 범위 밖이다.
- iterator의 지연 평가는 중요하지만, 이 글에서는 `sum()`과 `collect()` 수준의 소비 시점만 간단히 다룬다.
- 출력과 에러 문구는 Rust 버전에 따라 조금 달라질 수 있으며, macOS, Linux, WSL 환경 차이는 포함하지 않았다.
- 이 글을 읽고도 남는 질문은 custom error type, lifetime이 섞인 generic API, iterator 성능 세부사항이며, 이는 실전 프로젝트 단계에서 다시 다루는 편이 좋다.

## 참고자료

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Generic Data Types](https://doc.rust-lang.org/book/ch10-01-syntax.html)
- [Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)
- [Closures](https://doc.rust-lang.org/book/ch13-01-closures.html)
- [Processing a Series of Items with Iterators](https://doc.rust-lang.org/book/ch13-02-iterators.html)
