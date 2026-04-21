---
layout: single
title: "Rust 11. 파일 I/O와 커맨드라인 입력"
description: "std::fs::read_to_string, write, std::env::args, Result를 이용해 파일과 CLI 입력을 다루는 Rust 가이드."
date: 2026-04-18 09:00:00 +0900
lang: ko
translation_key: rust-file-io-and-cli-input
section: development
topic_key: rust
categories: Rust
tags: [rust, file-io, cli, std-fs, env-args]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Rust 기초 문법과 컬렉션을 익힌 뒤 실제 도구를 만들기 시작하면 결국 파일을 읽고, 인자를 받고, 에러를 처리해야 한다. 이 지점에서 `std::env::args`, `std::fs::read_to_string`, `std::fs::write`, `Result`를 한 흐름으로 이해하면 작은 CLI 프로그램을 만드는 장벽이 크게 낮아진다.

이 글은 텍스트 파일을 읽고, 커맨드라인 인자를 받아서, 간단한 요약을 출력하는 가장 기본적인 패턴을 정리한다. 결론부터 말하면 초급 단계에서는 "인자는 `main`에서 받고, 파일은 표준 라이브러리로 읽고, 핵심 계산은 별도 함수로 빼고, 실패는 `Result`와 `?`로 위로 올린다"는 흐름이 가장 단순하고 유지보수하기 쉽다.

## 문서 정보

- 작성일: 2026-04-15
- 검증 기준일: 2026-04-16
- 문서 성격: tutorial
- 테스트 환경: Windows 11 Pro, Windows PowerShell, Cargo CLI 예시
- 테스트 버전: rustc 1.94.0, cargo 1.94.0
- 출처 등급: 공식 문서만 사용했다.
- 비고: 이 글은 작은 UTF-8 텍스트 CLI 기준의 기본 패턴만 다루며, 대용량 스트리밍 처리나 고급 인자 파서는 범위에서 제외한다.

## 문제 정의

문법 설명만으로는 Rust를 배웠다고 느끼기 어렵다. 실제로는 아래 흐름이 들어가야 비로소 "도구 하나를 끝까지 만들었다"는 감각이 생긴다.

- 파일 경로나 옵션을 커맨드라인에서 받는다.
- 파일을 읽는다.
- 내용을 가공한다.
- 결과를 화면이나 다른 파일로 돌려준다.

이번 글은 이 흐름 중에서도 가장 기본적인 텍스트 파일 처리 패턴에 집중한다. 대용량 파일 스트리밍, binary 파일, 정교한 인자 파싱 라이브러리 사용은 범위에서 제외한다.

읽는 기준은 "외부 세계와 만나는 코드"와 "계산만 하는 코드"를 분리하는 것이다. 파일 경로를 받고 파일을 읽는 부분은 실패할 수 있지만, 읽어 온 문자열을 세는 함수는 입력만 같으면 같은 결과를 내야 테스트하기 쉽다.

## 확인된 사실

- 표준 라이브러리 문서 기준으로 `std::env::args`는 현재 프로세스의 커맨드라인 인자를 iterator로 반환하며, 첫 번째 값은 보통 프로그램 경로다.
  근거: [std::env::args](https://doc.rust-lang.org/std/env/fn.args.html)
  의미: 사용자가 넘긴 첫 번째 파일 경로는 보통 `args[0]`이 아니라 `args[1]`에 해당하므로, 예제에서는 `nth(1)`로 꺼낸다.
- 표준 라이브러리 문서 기준으로 `std::fs::read_to_string`은 파일 전체를 읽어 `String`으로 반환하고, UTF-8이 아닌 데이터는 에러가 될 수 있다.
  근거: [std::fs::read_to_string](https://doc.rust-lang.org/std/fs/fn.read_to_string.html)
  의미: 작은 UTF-8 텍스트 파일에는 단순하지만, 파일 전체를 메모리에 올리고 UTF-8을 기대한다는 조건을 함께 이해해야 한다.
- 표준 라이브러리 문서 기준으로 `std::fs::write`는 바이트 시퀀스를 파일에 기록하며, 파일이 없으면 만들고 있으면 전체 내용을 교체한다.
  근거: [std::fs::write](https://doc.rust-lang.org/std/fs/fn.write.html)
  의미: `write`는 append가 아니라 교체 동작으로 읽어야 한다. 결과 파일을 덮어써도 되는 상황인지 먼저 판단해야 한다.
- 공식 문서 기준으로 `Result`와 `?` 연산자는 에러를 호출자에게 전달하는 기본 패턴이다.
  근거: [Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)
  의미: 파일이 없거나 읽을 수 없는 상황을 `unwrap`으로 터뜨리기보다, `Result`를 통해 실패를 호출자에게 전달하는 구조가 더 확장하기 쉽다.

가장 작은 예제는 아래처럼 파일에서 줄 수와 단어 수를 세는 CLI다.

```rust
use std::{env, error::Error, fs, io};

fn count_lines_and_words(text: &str) -> (usize, usize) {
    let lines = text.lines().count();
    let words = text.split_whitespace().count();
    (lines, words)
}

fn main() -> Result<(), Box<dyn Error>> {
    let path = env::args().nth(1).ok_or_else(|| {
        io::Error::new(io::ErrorKind::InvalidInput, "usage: cargo run -- <file-path>")
    })?;

    let contents = fs::read_to_string(&path)?;
    let (lines, words) = count_lines_and_words(&contents);

    let summary = format!("file = {}\nlines = {}\nwords = {}\n", path, lines, words);

    println!("{}", summary);
    fs::write("summary.txt", &summary)?;

    Ok(())
}
```

이 코드를 읽는 핵심 순서는 아래와 같다.

1. `env::args().nth(1)`로 첫 번째 실제 인자를 꺼낸다.
2. 인자가 없으면 `io::Error`를 만들어 `Result`로 반환한다.
3. `fs::read_to_string`으로 파일 전체를 읽는다.
4. 핵심 계산은 `count_lines_and_words` 같은 작은 함수에서 처리한다.
5. 화면 출력과 파일 저장은 `main`에서 마무리한다.

이 구조가 중요한 이유는 이후 `testing`과도 자연스럽게 연결되기 때문이다. 실제 계산 로직이 순수 함수에 있으면 파일 입출력 없이도 테스트할 수 있다.

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

- 읽는 법: 이 버전은 본문 CLI 예제를 재현한 환경이다. 파일 API 자체보다 경로 표기, 에러 메시지, shell 동작은 환경에 따라 달라질 수 있다.

- 직접 확인한 결과: 아래처럼 `sample.txt`를 두고 본문 예제를 실행했을 때 결과는 아래와 같았다.

```text
Rust makes tools practical.
Rust makes testing easier.
```

```powershell
cargo run --quiet -- sample.txt
```

- 관찰된 결과:

```text
file = sample.txt
lines = 2
words = 8
```

- 읽는 법: `cargo run --quiet -- sample.txt`에서 두 번째 `--` 뒤의 값이 프로그램 인자로 전달된다. 출력은 파일을 읽은 뒤 순수 함수가 줄 수와 단어 수를 계산하고, `main`이 화면에 보여 준 결과다.

- 직접 확인한 결과: 같은 실행에서 생성된 `summary.txt` 내용은 아래와 같았다.

```text
file = sample.txt
lines = 2
words = 8
```

- 읽는 법: 화면 출력과 파일 저장 결과가 같다는 것은 같은 `summary` 문자열을 두 목적지로 보냈다는 뜻이다. 실제 도구에서는 화면용 메시지와 파일용 포맷을 분리할지 별도로 판단해야 한다.

- 직접 확인 범위의 한계: 대표 입력 파일과 임시 Cargo 프로젝트로 예제 흐름은 재현했지만, 큰 파일, 비UTF-8 입력, 추가 에러 케이스까지는 검증하지 않았다.

## 해석 / 의견

- 이 단계에서 중요한 판단: 초급 CLI에서 가장 먼저 익혀야 할 것은 고급 인자 파서가 아니라 입출력 경계 분리다.
- 선택 기준: 파일 읽기, 인자 읽기, 에러 출력은 `main`에 두고, 텍스트 가공이나 계산은 별도 함수로 빼면 테스트와 재사용이 쉬워진다.
- 해석: 작은 UTF-8 텍스트 파일을 다루는 단계에서는 `read_to_string`이 가장 단순하다. 너무 이른 시점에 스트리밍과 버퍼 최적화까지 넣으면 오히려 구조 감각을 놓치기 쉽다.

## 한계와 예외

- `std::env::args`는 유니코드가 아닌 인자 처리에 제약이 있어, 그런 입력이 필요하면 `args_os`를 검토해야 한다.
- `read_to_string`은 파일 전체를 메모리에 올리므로 매우 큰 파일이나 binary 파일에는 적합하지 않을 수 있다.
- `write`는 기존 파일 내용을 덮어쓰므로 append가 필요한 경우에는 다른 API가 필요하다.
- 실제 CLI 도구에서는 `clap` 같은 라이브러리, `BufRead`, 더 구체적인 에러 타입이 필요할 수 있지만 이번 글에서는 가장 단순한 표준 라이브러리 패턴만 다뤘다.
- 이 글을 읽고도 남는 질문은 대용량 streaming, binary 파일 처리, CLI 옵션 파서, 에러 메시지 UX이며, 이는 실제 도구화 단계에서 별도로 설계해야 한다.

## 참고자료

- [std::env::args](https://doc.rust-lang.org/std/env/fn.args.html)
- [std::fs::read_to_string](https://doc.rust-lang.org/std/fs/fn.read_to_string.html)
- [std::fs::write](https://doc.rust-lang.org/std/fs/fn.write.html)
- [Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)
- [Accepting Command Line Arguments](https://doc.rust-lang.org/book/ch12-01-accepting-command-line-arguments.html)
