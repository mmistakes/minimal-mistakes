---
layout: single
title: "Rust 08. Vec, String, &str, HashMap 기초"
description: "Vec, String, &str, HashMap를 예제로 익히고 단어 빈도 수 예제로 연결하는 Rust 기초 가이드."
lang: ko
translation_key: rust-vec-string-str-hashmap
date: 2026-04-15 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, vec, string, hashmap, collections]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Rust 기본 문법을 익힌 뒤 실제 코드를 쓰기 시작하면 가장 자주 마주치는 타입은 `Vec`, `String`, `&str`, `HashMap`이다. 이 네 가지를 이해하면 입력을 읽고, 문자열을 나누고, 결과를 누적하는 초반 실습이 훨씬 자연스러워진다.

이 글은 위 네 가지를 입문 기준으로 연결해 정리한다. 결론부터 말하면 여러 값을 순서대로 담을 때는 `Vec`, 소유하고 수정하는 문자열은 `String`, 빌려 읽는 문자열은 `&str`, 키-값 누적과 조회는 `HashMap`으로 이해하면 된다.

## 문서 정보

- 작성일: 2026-04-15
- 검증 기준일: 2026-04-16
- 문서 성격: tutorial
- 테스트 환경: Windows 11 Pro, Cargo 프로젝트, Windows PowerShell 예시 명령, `src/main.rs`
- 테스트 버전: rustc 1.94.0, cargo 1.94.0
- 출처 등급: 공식 문서만 사용했다.
- 비고: 대표 예제를 로컬에서 재실행했고, `HashMap` 순회 순서와 UTF-8 세부 처리는 입문 수준에서 필요한 범위만 다뤘다.

## 문제 정의

Rust 초급 단계에서 아래 네 가지는 자주 같이 등장하지만 처음에는 경계가 흐리기 쉽다.

- 여러 값을 순서대로 모을 때 어떤 컬렉션을 써야 하는지
- 문자열을 소유할지 빌릴지 어떻게 구분할지
- 문자열 길이와 슬라이스를 UTF-8 기준으로 어떻게 이해할지
- 단어 수나 설정 값처럼 키 기준 누적 결과를 어디에 저장할지

이 글은 위 질문을 하나의 흐름으로 연결한다. `BTreeMap`, `Cow`, `entry()` API 심화, UTF-8 내부 표현 전체는 다루지 않는다.

읽는 기준은 "순서가 필요한가", "문자열을 소유해야 하는가", "키로 찾아야 하는가"를 먼저 묻는 것이다. 이 글의 예제는 컬렉션 이름을 암기하기 위한 것이 아니라, 입력을 읽고 문자열을 나눈 뒤 결과를 누적하는 초급 프로그램의 기본 흐름을 보여 주기 위한 것이다.

## 확인된 사실

- `Vec<T>`는 같은 타입 값을 순서대로 저장하는 growable collection이다.
  근거: [Storing Lists of Values with Vectors](https://doc.rust-lang.org/book/ch08-01-vectors.html), [Vec in std::vec](https://doc.rust-lang.org/std/vec/struct.Vec.html)
  의미: 항목의 순서가 중요하고 개수가 늘어날 수 있으면 `Vec`를 먼저 떠올리면 된다.
- `String`은 소유권이 있는 UTF-8 문자열이고, `str`은 primitive string slice 타입이며 보통 `&str` 형태로 빌려 사용된다.
  근거: [Storing UTF-8 Encoded Text with Strings](https://doc.rust-lang.org/book/ch08-02-strings.html), [String in std::string](https://doc.rust-lang.org/std/string/struct.String.html), [str primitive type](https://doc.rust-lang.org/std/primitive.str.html)
  의미: 문자열을 저장하거나 수정해야 하면 `String`, 이미 있는 문자열을 읽기만 하면 `&str`로 시작하는 편이 자연스럽다.
- `HashMap<K, V>`는 키-값 연관 데이터를 저장하는 표준 컬렉션이다.
  근거: [Storing Keys with Associated Values in Hash Maps](https://doc.rust-lang.org/book/ch08-03-hash-maps.html), [HashMap in std::collections](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
  의미: "이 단어가 몇 번 나왔는가"처럼 키로 값을 누적하거나 조회해야 하면 `HashMap`이 기본 선택지다.
- `Vec::get`은 `Option<&T>`를 반환하고, `str::len()`은 글자 수가 아니라 바이트 수를 반환한다.
  근거: [Vec in std::vec](https://doc.rust-lang.org/std/vec/struct.Vec.html), [str primitive type](https://doc.rust-lang.org/std/primitive.str.html)
  의미: Rust는 실패 가능성이 있는 접근과 UTF-8 문자열 처리를 숨기지 않는다. 없는 인덱스는 `Option`으로, 문자열 길이는 바이트와 문자 개수를 구분해서 다뤄야 한다.
- 입문 실습 흐름은 `cargo new` 프로젝트 기준으로 설명하는 편이 가장 재현하기 쉽다.
  근거: [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
  의미: 컬렉션 예제는 작은 입력을 바꿔 가며 출력 변화를 보는 방식이 가장 이해하기 쉽다.

## 직접 재현한 결과

### 1. 새 Cargo 프로젝트에서 `src/main.rs`를 교체하며 반복 실행하는 방식이 가장 단순했다

- 직접 확인한 결과: 아래처럼 새 프로젝트를 만들고 `cargo run`을 반복하는 흐름이 가장 편했다.

```powershell
cargo new rust-collections-basics
cd rust-collections-basics
code .
cargo run
```

### 2. `Vec`, `String`, `&str`, UTF-8 길이 차이는 짧은 예제로 바로 확인됐다

- 직접 확인한 결과: 아래 예제로 vector 접근, owned string과 borrowed string, 바이트 수와 문자 수 차이를 한 번에 확인할 수 있었다.

```rust
fn main() {
    let mut scores: Vec<i32> = Vec::new();
    scores.push(10);
    scores.push(20);
    scores.push(30);

    println!("len = {}", scores.len());
    println!("scores[0] = {}", scores[0]);
    println!("index 10 = {:?}", scores.get(10));

    let literal: &str = "Rust";
    let mut owned = String::from("Rust");
    owned.push_str(" language");
    println!("literal = {}", literal);
    println!("owned = {}", owned);

    let text = "한글";
    println!("bytes = {}", text.len());
    println!("chars = {}", text.chars().count());
}
```

- 관찰된 결과:

```text
len = 3
scores[0] = 10
index 10 = None
literal = Rust
owned = Rust language
bytes = 6
chars = 2
```

- 읽는 법: `scores[0]`은 값이 있다고 가정하는 접근이고, `scores.get(10)`은 없을 수도 있음을 `None`으로 드러낸다. `"한글"`의 바이트 수가 6이고 문자 수가 2인 결과는 Rust 문자열이 UTF-8 바이트 위에 있다는 점을 보여 준다.

### 3. 단어 빈도 수 예제로 `Vec`, `&str`, `String`, `HashMap` 연결이 분명해졌다

- 직접 확인한 결과: 여러 문장을 합친 뒤 단어 빈도 수를 세는 흐름을 아래처럼 재현할 수 있었다.

```rust
use std::collections::HashMap;

fn count_words(text: &str) -> HashMap<String, usize> {
    let mut counts = HashMap::new();

    for word in text.split_whitespace() {
        let normalized = word.to_lowercase();

        if let Some(count) = counts.get_mut(&normalized) {
            *count += 1;
        } else {
            counts.insert(normalized, 1);
        }
    }

    counts
}

fn main() {
    let lines = vec![
        "Rust makes systems programming safer",
        "Rust makes concurrency easier to reason about",
        "safer code starts with clear data ownership",
    ];

    let joined = lines.join(" ");
    let counts = count_words(&joined);

    println!("rust = {:?}", counts.get("rust"));
    println!("safer = {:?}", counts.get("safer"));
}
```

- 관찰된 결과:

```text
rust = Some(2)
safer = Some(2)
```

- 읽는 법: `lines`는 여러 문장을 순서대로 담는 `Vec`, `joined`는 소유 문자열인 `String`, `count_words`의 인자는 빌려 읽는 `&str`, `counts`는 단어별 누적 결과를 담는 `HashMap`이다. 이 예제는 네 타입이 따로 노는 것이 아니라 하나의 처리 흐름에서 이어진다는 점을 보여 준다.

## 해석 / 의견

- 이 단계에서 중요한 판단: 컬렉션 이름을 외우는 것이 아니라 "언제 소유하고, 언제 빌리고, 언제 누적 저장할 것인가"를 구분하는 일이다.
- 선택 기준: 읽기 전용 문자열 인자는 `&str`, 수정하거나 보관할 문자열은 `String`, 순서 있는 목록은 `Vec`, 키 기반 누적은 `HashMap`으로 시작한다.
- 해석: `HashMap`은 결과 누적에는 편하지만 순회 순서를 보장하지 않으므로, 출력 순서가 중요한 상황은 별도로 구분해서 설명하는 편이 좋다.

## 한계와 예외

- 이 글은 초급자 기준의 가장 자주 쓰는 패턴만 다룬다. `BTreeMap`, `Cow`, `entry()` API 심화는 범위 밖이다.
- `HashMap` 순회 순서는 보장되지 않으므로 예제 출력의 마지막 부분은 실행마다 달라질 수 있다.
- 문자열의 `len()`은 바이트 수이며, 모든 문자열 처리를 바이트 인덱스로 직접 다루는 것은 안전하지 않을 수 있다.
- UTF-8 내부 표현 전체와 고급 문자열 최적화는 다루지 않았다.
- 이 글을 읽고도 남는 질문은 `entry()` API, 정렬 가능한 map 선택, 문자열 slice 인덱싱 전략이며, 이는 컬렉션과 문자열 심화에서 다루는 편이 좋다.

## 참고자료

- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Storing Lists of Values with Vectors](https://doc.rust-lang.org/book/ch08-01-vectors.html)
- [Storing UTF-8 Encoded Text with Strings](https://doc.rust-lang.org/book/ch08-02-strings.html)
- [Storing Keys with Associated Values in Hash Maps](https://doc.rust-lang.org/book/ch08-03-hash-maps.html)
- [String in std::string](https://doc.rust-lang.org/std/string/struct.String.html)
- [str primitive type](https://doc.rust-lang.org/std/primitive.str.html)
- [Vec in std::vec](https://doc.rust-lang.org/std/vec/struct.Vec.html)
- [HashMap in std::collections](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
