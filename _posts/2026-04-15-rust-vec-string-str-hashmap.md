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

Rust 기본 문법을 익힌 뒤 실제 코드를 쓰기 시작하면 가장 자주 만나는 타입은 `Vec`, `String`, `&str`, `HashMap`이다. 이 글은 이 네 가지가 각각 어떤 역할을 하는지, 그리고 owned data와 borrowed data가 실제 코드에서 어떻게 함께 등장하는지를 초급자 기준으로 정리한다.

결론부터 말하면 여러 값을 순서대로 담을 때는 `Vec`, 수정 가능한 소유 문자열은 `String`, 빌려 읽는 문자열은 `&str`, 키-값 저장은 `HashMap`을 쓰면 된다. 이 감각이 잡히면 다음 단계인 file I/O, CLI 입력 처리, serde, 작은 CLI 프로젝트로 넘어갈 때 훨씬 덜 막힌다.

## 문서 정보

- 작성일: 2026-04-15
- 검증 기준일: 2026-04-15
- 문서 성격: tutorial
- 테스트 환경: Cargo 프로젝트, Windows PowerShell 예시 명령, `src/main.rs`
- 테스트 버전: 미고정
- 출처 등급: 공식 문서만 사용했다.
- 비고: 이번 글은 초급자 기준으로 가장 자주 쓰는 패턴만 다루고, `entry()` API 심화나 UTF-8 내부 표현 심화는 일부러 넓히지 않았다.

## 실습 프로젝트 만들기

아래처럼 새 프로젝트를 만든 뒤 `src/main.rs`에서 예제를 하나씩 실행해 보면 된다. Rust Book은 기본 컬렉션 실습도 `cargo new` 프로젝트 기준으로 진행한다. [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)

```powershell
cargo new rust-collections-basics
cd rust-collections-basics
code .
```

예제를 붙여 넣은 뒤에는 아래처럼 실행하면 된다.

```powershell
cargo run
```

## 먼저 한 줄로 감 잡기

- `Vec<T>`: 같은 타입의 값을 순서대로 담는 growable collection
- `String`: 소유권이 있는 UTF-8 문자열
- `&str`: 문자열을 빌려 보는 string slice
- `HashMap<K, V>`: 키로 값을 찾는 key-value collection

공식 문서 기준으로 `String`은 UTF-8로 인코딩된 growable string이고, `str`은 가장 기본적인 문자열 타입이며 보통 borrowed form인 `&str`로 사용된다. [Rust `String` 문서](https://doc.rust-lang.org/std/string/struct.String.html), [Rust `str` 문서](https://doc.rust-lang.org/std/primitive.str.html)

## Vec<T>: 같은 타입 값을 순서대로 담기

`Vec<T>`는 가장 자주 쓰는 컬렉션이다. 여러 값을 순서대로 저장하고, `push`로 값을 추가하고, 반복문으로 순회하는 패턴이 매우 흔하다.

Rust Book도 vector를 "같은 타입 값을 하나 이상 저장하는 방법"으로 설명하고, 표준 라이브러리 문서는 `Vec<T>`를 growable array type으로 제공한다. [Storing Lists of Values with Vectors](https://doc.rust-lang.org/book/ch08-01-vectors.html), [Rust `Vec` 문서](https://doc.rust-lang.org/std/vec/struct.Vec.html)

```rust
fn main() {
    let mut scores: Vec<i32> = Vec::new();
    scores.push(10);
    scores.push(20);
    scores.push(30);

    println!("len = {}", scores.len());
    println!("scores[0] = {}", scores[0]);

    match scores.get(10) {
        Some(value) => println!("value = {}", value),
        None => println!("index 10 is out of range"),
    }

    for score in &scores {
        println!("score = {}", score);
    }
}
```

실행 결과는 아래와 같다.

```text
len = 3
scores[0] = 10
index 10 is out of range
score = 10
score = 20
score = 30
```

여기서 초급자가 먼저 구분해야 할 것은 아래 두 가지다.

- `scores[0]`처럼 인덱싱하면 값이 있다고 가정하고 바로 접근한다.
- `scores.get(10)`은 `Option<&T>`를 반환하므로 범위를 벗어나도 안전하게 처리할 수 있다.

실무에서는 "이 인덱스가 반드시 존재하는가?"가 애매하면 `get` 쪽이 더 안전하다.

## String과 &str: 소유권이 있는 문자열과 빌린 문자열

문자열에서 가장 많이 헷갈리는 부분은 `String`과 `&str`의 차이다.

- `String`은 소유권이 있다.
- `&str`은 문자열을 빌려 본다.
- 문자열 리터럴 `"hello"`의 타입은 보통 `&'static str`이다.

공식 문서 기준으로 `String`은 내용을 소유하고 heap-allocated buffer에 저장하며, `str`은 primitive string slice 타입이다. [Rust `String` 문서](https://doc.rust-lang.org/std/string/struct.String.html), [Rust `str` 문서](https://doc.rust-lang.org/std/primitive.str.html), [Storing UTF-8 Encoded Text with Strings](https://doc.rust-lang.org/book/ch08-02-strings.html)

```rust
fn print_title(title: &str) {
    println!("title = {}", title);
}

fn main() {
    let literal: &str = "Rust";

    let mut owned = String::from("Rust");
    owned.push_str(" language");

    print_title(literal);
    print_title(&owned);

    let copied = literal.to_string();
    println!("copied = {}", copied);
}
```

실행 결과는 아래와 같다.

```text
title = Rust
title = Rust language
copied = Rust
```

이 예제에서 중요한 포인트는 `print_title`이 `&str`를 받기 때문에 string literal도 넣을 수 있고, `String`도 `&owned`처럼 빌려서 넣을 수 있다는 점이다. 초급 단계에서는 "읽기만 하는 함수 인자"를 `&str`로 받는 습관이 가장 실용적이다.

## 문자열 다루기: 슬라이스, 단어 분리, UTF-8 주의점

문자열을 다룰 때는 전체 문자열을 그대로 쓰는 것보다, 필요한 일부를 slice로 빌리거나 단어 단위로 쪼개는 일이 자주 생긴다.

```rust
fn main() {
    let text = String::from("rust makes systems programming safer");
    let first_word = &text[0..4];

    println!("first_word = {}", first_word);

    for word in text.split_whitespace() {
        println!("word = {}", word);
    }
}
```

실행 결과는 아래와 같다.

```text
first_word = rust
word = rust
word = makes
word = systems
word = programming
word = safer
```

이 코드는 아래 흐름으로 읽으면 된다.

- `first_word`는 `String` 전체를 복사한 것이 아니라 `&str`로 빌린 slice다.
- `split_whitespace()`는 공백 기준으로 잘라서 각 단어를 `&str`로 돌려준다.
- 즉, 문자열을 다룬다고 해서 매번 새 `String`을 만들어야 하는 것은 아니다.

다만 초급자에게 중요한 주의점도 있다. `str::len()`은 글자 수가 아니라 바이트 수를 반환하고, 문자열 슬라이스 인덱스는 UTF-8 문자 경계를 지켜야 한다. [Rust `str` 문서](https://doc.rust-lang.org/std/primitive.str.html), [Storing UTF-8 Encoded Text with Strings](https://doc.rust-lang.org/book/ch08-02-strings.html)

```rust
fn main() {
    let text = "한글";

    println!("bytes = {}", text.len());
    println!("chars = {}", text.chars().count());
}
```

실행 결과는 아래와 같다.

```text
bytes = 6
chars = 2
```

이 예제에서 `len()`은 바이트 수를 보여 준다. 그래서 문자열 처리 초반에는 임의의 바이트 인덱스로 자르기보다 `split_whitespace()`, `lines()`, `chars()` 같은 메서드를 먼저 익히는 편이 훨씬 안전하다.

## HashMap<K, V>: 키로 값 찾기

`HashMap<K, V>`는 "이름 -> 점수", "단어 -> 빈도 수", "설정 이름 -> 값"처럼 키로 값을 빠르게 찾고 싶을 때 쓴다.

Rust Book은 hash map을 key-value association 저장 방식으로 설명하고, 표준 라이브러리는 `HashMap`을 일반적인 key-value collection으로 제공한다. [Storing Keys with Associated Values in Hash Maps](https://doc.rust-lang.org/book/ch08-03-hash-maps.html), [Rust `HashMap` 문서](https://doc.rust-lang.org/std/collections/struct.HashMap.html)

```rust
use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();

    scores.insert(String::from("alice"), 95);
    scores.insert(String::from("bob"), 88);

    let target = String::from("alice");

    match scores.get(&target) {
        Some(score) => println!("alice = {}", score),
        None => println!("no score found"),
    }

    println!("contains bob = {}", scores.contains_key("bob"));

    for (name, score) in &scores {
        println!("{} = {}", name, score);
    }
}
```

실행 결과는 아래와 같다.

```text
alice = 95
contains bob = true
bob = 88
alice = 95
```

주의: `HashMap` 순회 결과의 출력 순서는 보장되지 않으므로 마지막 두 줄의 순서는 실행마다 달라질 수 있다.

여기서 기억할 점은 아래 정도면 충분하다.

- `insert`로 값을 넣는다.
- `get`은 `Option<&V>`를 돌려준다.
- `contains_key`로 키 존재 여부를 확인할 수 있다.
- 반복문으로 전체 key-value pair를 순회할 수 있다.

## 한 번에 보는 종합 예제: 단어 빈도 수 세기

이제 `Vec`, `String`, `&str`, `HashMap`을 한 번에 묶어 보자. 아래 예제는 여러 문장을 모아서 단어 빈도 수를 세는 코드다.

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

    println!("joined = {}", joined);

    let rust_key = String::from("rust");
    let safer_key = String::from("safer");

    println!("rust = {:?}", counts.get(&rust_key));
    println!("safer = {:?}", counts.get(&safer_key));

    for (word, count) in &counts {
        println!("{}: {}", word, count);
    }
}
```

이 예제에서 각 타입은 아래 역할을 한다.

- `Vec<&str>`: 여러 줄의 입력 문장을 모은다.
- `join(" ")`: 여러 `&str`를 하나의 `String`으로 합친다.
- `count_words(&joined)`: 소유한 문자열을 `&str`로 빌려 함수에 넘긴다.
- `split_whitespace()`: 각 단어를 borrowed `&str`로 순회한다.
- `HashMap<String, usize>`: 함수가 끝난 뒤에도 남아 있어야 하므로 단어를 owned `String` key로 저장한다.

이 연결이 이번 글의 핵심이다. 입력을 읽을 때는 `&str`를 많이 쓰고, 결과를 오래 보관할 때는 `String`을 많이 쓰며, 여러 개를 순서대로 모으면 `Vec`, 빈도를 누적하면 `HashMap`이 자연스럽게 따라온다.

## 정리

이번 글에서는 `Vec`, `String`, `&str`, `HashMap`을 초급자 기준으로 묶어서 정리했다. `Vec`는 여러 값을 순서대로 모을 때, `String`은 수정 가능한 소유 문자열이 필요할 때, `&str`는 읽기 전용으로 문자열을 빌려 다룰 때, `HashMap`은 키로 값을 찾고 누적할 때 가장 자주 쓴다.

다음 단계에서는 이 타입들을 실제 프로젝트 구조 안에서 어떻게 나누고 재사용하는지로 넘어가는 것이 자연스럽다. 그래서 다음 글은 `crate`, `package`, `project layout` 쪽으로 이어 가는 흐름이 잘 맞는다.

## 출처 및 참고

- Rust Project Developers, [Storing Lists of Values with Vectors](https://doc.rust-lang.org/book/ch08-01-vectors.html)
- Rust Project Developers, [Storing UTF-8 Encoded Text with Strings](https://doc.rust-lang.org/book/ch08-02-strings.html)
- Rust Project Developers, [Storing Keys with Associated Values in Hash Maps](https://doc.rust-lang.org/book/ch08-03-hash-maps.html)
- Rust Project Developers, [String in std::string](https://doc.rust-lang.org/std/string/struct.String.html)
- Rust Project Developers, [str primitive type](https://doc.rust-lang.org/std/primitive.str.html)
- Rust Project Developers, [Vec in std::vec](https://doc.rust-lang.org/std/vec/struct.Vec.html)
- Rust Project Developers, [HashMap in std::collections](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
