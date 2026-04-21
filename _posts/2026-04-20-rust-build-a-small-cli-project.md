---
layout: single
title: "Rust 13. 작은 CLI 프로젝트 만들기"
description: "지금까지 배운 Rust 기초를 묶어 작은 word counter CLI를 만드는 실전 가이드."
date: 2026-04-20 09:00:00 +0900
lang: ko
translation_key: rust-build-a-small-cli-project
section: development
topic_key: rust
categories: Rust
tags: [rust, cli, mini-project, word-counter, cargo]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Rust 시리즈를 따라오며 설치, 디버깅, 기초 문법, ownership, module, testing, file I/O, serde까지 익혔다면 이제는 작은 결과물을 끝까지 한 번 묶어 보는 단계가 필요하다. 이 단계가 있어야 개별 개념이 흩어진 지식이 아니라 실제 작업 흐름으로 연결된다.

이 글은 `word counter` CLI를 예제로 잡아 프로젝트 구조, 파일 입력, 문자열 처리, `HashMap`, 테스트, 결과 출력이 한 프로그램 안에서 어떻게 연결되는지 정리한다. 결론부터 말하면 첫 mini project는 문제를 작게 잡고, 핵심 로직은 `lib.rs`, 입출력은 `main.rs`, 검증은 테스트로 나누는 구조가 가장 안정적이다.

## 문서 정보

- 작성일: 2026-04-15
- 검증 기준일: 2026-04-16
- 문서 성격: tutorial
- 테스트 환경: Windows 11 Pro, Windows PowerShell, Cargo CLI 예시
- 테스트 버전: rustc 1.94.0, cargo 1.94.0
- 출처 등급: 공식 문서만 사용했다.
- 비고: 이 글은 표준 라이브러리 기반 mini project 흐름에 집중하며, `clap` 같은 인자 파서나 고급 텍스트 전처리는 범위에서 제외한다.

## 문제 정의

Rust를 배우는 과정에서 흔한 문제는 "개념은 각각 알겠는데 하나의 프로그램으로 묶는 감각이 없다"는 점이다. 특히 초급자는 아래를 동시에 다루기 시작할 때 갑자기 난도가 올라간다고 느낀다.

- 커맨드라인에서 파일 경로 받기
- 파일 읽기
- 문자열을 가공해 단어 빈도 수 세기
- 결과 정렬과 출력
- 핵심 로직 테스트

이번 글의 목표는 새로운 문법을 추가하는 것이 아니라, 이미 배운 요소들을 하나의 작은 CLI로 연결하는 것이다.

읽는 기준은 기능을 많이 넣는 것이 아니라 경계를 작게 나누는 것이다. `main.rs`는 입력과 출력의 조립, `lib.rs`는 테스트 가능한 핵심 로직, `tests/`는 공개 API 검증을 맡는다고 보면 전체 구조가 덜 복잡하게 보인다.

## 확인된 사실

- 공식 문서 기준으로 Cargo package는 binary crate와 library crate를 함께 둘 수 있고, 재사용 로직은 library crate로 분리할 수 있다.
  근거: [Packages and Crates](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)
  의미: 작은 CLI라도 실행 코드와 계산 로직을 분리하면, 나중에 테스트와 기능 확장이 쉬워진다.
- 표준 라이브러리 문서 기준으로 `HashMap`은 key-value 저장을 위한 표준 컬렉션이다.
  근거: [HashMap in std::collections](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
  의미: 단어 빈도 수처럼 "단어 -> 횟수" 관계를 누적할 때 `HashMap<String, usize>`는 가장 직접적인 표현이다.
- 표준 라이브러리 문서 기준으로 `std::env::args`와 `std::fs::read_to_string`을 조합하면 가장 기본적인 파일 기반 CLI 입력 흐름을 만들 수 있다.
  근거: [std::env::args](https://doc.rust-lang.org/std/env/fn.args.html), [std::fs::read_to_string](https://doc.rust-lang.org/std/fs/fn.read_to_string.html)
  의미: 이번 예제는 고급 CLI 라이브러리 없이도 "인자 받기 -> 파일 읽기 -> 처리하기" 흐름을 끝까지 보여 주기 위한 최소 구성이다.
- 공식 문서 기준으로 테스트는 `#[cfg(test)]`나 `tests/` 디렉터리에서 조직할 수 있다.
  근거: [Test Organization](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
  의미: 핵심 로직을 `lib.rs`에 두면, CLI 실행 없이도 단어 세기와 정렬 규칙을 독립적으로 검증할 수 있다.

초급용 mini project 구조는 아래 정도면 충분하다.

```text
word-counter/
  Cargo.toml
  src/
    main.rs
    lib.rs
  tests/
    word_count.rs
```

`src/lib.rs`는 핵심 로직만 가진다.

```rust
use std::collections::HashMap;

pub fn count_words(text: &str) -> HashMap<String, usize> {
    let mut counts = HashMap::new();

    for word in text.split_whitespace() {
        let normalized = word.to_lowercase();
        *counts.entry(normalized).or_insert(0) += 1;
    }

    counts
}

pub fn sort_counts(counts: HashMap<String, usize>) -> Vec<(String, usize)> {
    let mut items: Vec<_> = counts.into_iter().collect();
    items.sort_by(|a, b| b.1.cmp(&a.1).then_with(|| a.0.cmp(&b.0)));
    items
}
```

`src/main.rs`는 입력과 출력만 조립한다.

```rust
use std::{env, error::Error, fs, io};
use word_counter::{count_words, sort_counts};

fn main() -> Result<(), Box<dyn Error>> {
    let path = env::args().nth(1).ok_or_else(|| {
        io::Error::new(io::ErrorKind::InvalidInput, "usage: cargo run -- <file-path>")
    })?;

    let text = fs::read_to_string(&path)?;
    let ranked = sort_counts(count_words(&text));

    for (word, count) in ranked.into_iter().take(10) {
        println!("{}\t{}", word, count);
    }

    Ok(())
}
```

`tests/word_count.rs`에는 공개 API 중심의 검증을 둘 수 있다.

```rust
use word_counter::{count_words, sort_counts};

#[test]
fn counts_words_case_insensitively() {
    let counts = count_words("Rust rust RUST safety");

    assert_eq!(counts.get("rust"), Some(&3));
    assert_eq!(counts.get("safety"), Some(&1));
}

#[test]
fn sorts_by_frequency_descending() {
    let sorted = sort_counts(count_words("b a a c c c"));

    assert_eq!(sorted[0], ("c".to_string(), 3));
    assert_eq!(sorted[1], ("a".to_string(), 2));
}
```

이 예제는 지금까지 배운 내용이 어떻게 이어지는지 잘 보여 준다.

- `env::args`: 입력 경로 받기
- `read_to_string`: 파일 읽기
- `split_whitespace`, `to_lowercase`: 문자열 처리
- `HashMap`: 빈도 수 누적
- `lib.rs`와 `main.rs`: 프로젝트 구조 분리
- `tests/`: 검증 흐름 추가

## 직접 재현한 결과

- 직접 확인한 결과: 현재 작성 환경에서 Rust toolchain 버전은 아래와 같았다.

```powershell
rustc --version
cargo --version
```

- 관찰된 결과:

```text
rustc 1.94.0 (4a4ef493e 2026-03-02)
cargo 1.94.0 (85eff7c80 2026-01-15)
```

- 읽는 법: 이 버전은 mini project를 재현한 도구 기준이다. 코드 예제 자체는 표준 라이브러리 중심이지만, 출력 문구와 테스트 출력 형식은 Cargo 버전에 따라 조금 달라질 수 있다.

- 직접 확인한 결과: 아래처럼 `sample.txt`를 두고 본문 mini project를 실행했을 때 출력은 아래와 같았다.

```text
Rust rust safety safety safety tools
```

```powershell
cargo run --quiet -- sample.txt
```

- 관찰된 결과:

```text
safety	3
rust	2
tools	1
```

- 읽는 법: `safety`가 3회, `rust`가 2회, `tools`가 1회로 집계됐고, 빈도 내림차순으로 출력됐다. 이 결과는 파일 입력, 단어 정규화, `HashMap` 누적, 정렬, 상위 결과 출력이 한 흐름으로 연결됐다는 확인 지점이다.

- 직접 확인한 결과: 같은 구조에서 `cargo test --quiet`를 실행했을 때 핵심 출력은 아래와 같았다.

```powershell
cargo test --quiet
```

- 관찰된 결과:

```text
running 2 tests
..
test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

- 읽는 법: 실행 결과가 맞는 것과 테스트가 통과하는 것은 다른 확인이다. 이 출력은 대표 입력에서 보이는 동작뿐 아니라, `count_words`와 `sort_counts`의 핵심 규칙도 자동 검증된다는 뜻이다.

- 직접 확인 범위의 한계: 대표 입력 파일 기준의 실행과 테스트는 임시 Cargo 프로젝트에서 확인했지만, 큰 입력 파일, 구두점 처리, stop-word 제거 같은 확장 요구사항까지는 검증하지 않았다.

## 해석 / 의견

- 이 단계에서 중요한 판단: 첫 mini project의 목적은 화려한 기능이 아니라 "개념들을 한 파일 구조로 묶는 경험"이다.
- 선택 기준: 초급 단계에서는 `clap`, `rayon`, 복잡한 설정 파일까지 한 번에 넣기보다, 표준 라이브러리와 작은 pure function 조합으로 끝까지 완성한다.
- 해석: 입력과 출력은 자주 바뀌지만 핵심 계산 로직은 비교적 안정적이므로, mini project일수록 `lib.rs`에 중심을 두는 편이 장기적으로 유리하다.

## 한계와 예외

- 이 예제는 공백 기준 토큰 분리만 사용하므로 구두점 처리, 형태소 분석, 유니코드 정규화 같은 고급 텍스트 처리는 포함하지 않았다.
- 큰 파일을 처리하거나 메모리 사용량이 중요한 경우에는 전부 읽기 대신 buffered reading이 필요할 수 있다.
- 실제 CLI 제품 수준으로 가면 옵션 파서, 출력 포맷, 에러 코드, 로그 처리 등을 더 설계해야 한다.
- 정렬 기준이나 stop-word 제거 여부는 문제 성격에 따라 달라질 수 있다.
- 이 글을 읽고도 남는 질문은 구두점 처리, 유니코드 정규화, stop-word 제거, CLI 옵션 설계, 대용량 입력 처리이며, 이는 mini project 확장 단계에서 별도로 결정해야 한다.

## 참고자료

- [Packages and Crates](https://doc.rust-lang.org/book/ch07-01-packages-and-crates.html)
- [HashMap in std::collections](https://doc.rust-lang.org/std/collections/struct.HashMap.html)
- [std::env::args](https://doc.rust-lang.org/std/env/fn.args.html)
- [std::fs::read_to_string](https://doc.rust-lang.org/std/fs/fn.read_to_string.html)
- [Test Organization](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
- [Accepting Command Line Arguments](https://doc.rust-lang.org/book/ch12-01-accepting-command-line-arguments.html)
