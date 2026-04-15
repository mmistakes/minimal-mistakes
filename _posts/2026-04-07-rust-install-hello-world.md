---
layout: single
description: "Windows와 VS Code 기준으로 Rust를 설치하고 Hello World를 실행하는 입문 가이드."
title: "Rust 01. 설치와 Hello World 실행하기"
lang: ko
translation_key: rust-install-hello-world
date: 2026-04-07 09:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, rustup, cargo, rustc, vscode, windows]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

Rust를 처음 시작할 때는 컴파일러만 따로 찾기보다 공식 설치 도구인 `rustup`으로 한 번에 설치하는 편이 가장 단순하다. 이 글은 Windows와 VS Code 기준으로 Rust 설치, 버전 확인, `rustc` 단일 파일 실행, `cargo` 프로젝트 실행까지 가장 짧은 입문 경로를 정리한다.

결론부터 말하면 "설치는 `rustup`, 빠른 단일 파일 실습은 `rustc`, 실제 프로젝트 시작은 `cargo`"로 구분해 이해하면 가장 덜 헷갈린다.

## 문서 정보

- 작성일: 2026-04-07
- 검증 기준일: 2026-04-15
- 문서 성격: tutorial
- 테스트 환경: Windows PowerShell, VS Code, `rustup`, `rustc`, `cargo`
- 테스트 버전: rustc 1.94.0, cargo 1.94.0
- 출처 등급: 공식 문서만 사용했다.
- 비고: 설치 화면과 설치기 UI는 시점에 따라 바뀔 수 있다. 이 글은 Windows 로컬 환경 기준의 가장 기본 흐름만 다룬다.

## 문제 정의

Rust 입문 단계에서 가장 먼저 헷갈리는 지점은 아래 세 가지다.

- Rust를 설치한다는 말이 `rustc` 설치를 뜻하는지 `rustup` 설치를 뜻하는지 모호하다.
- `rustc`와 `cargo`가 각각 언제 필요한지 감이 잘 안 잡힌다.
- 설치가 끝난 뒤 무엇을 실행해야 "정상 설치"라고 볼 수 있는지 불분명하다.

이 글은 위 혼란을 줄이기 위해 설치, 버전 확인, `Hello, world!` 실행까지 최소 경로만 정리한다. 고급 설치 옵션, WSL, macOS/Linux, toolchain override 같은 주제는 범위에서 제외한다.

## 확인된 사실

- 공식 설치 페이지와 `rustup` 사이트는 Rust 설치를 `rustup` 경로로 안내한다.
  근거: [Install Rust](https://www.rust-lang.org/tools/install), [rustup.rs](https://rustup.rs/)
- Rust Book의 설치 장은 설치 후 `rustc --version`으로 설치를 확인하는 흐름을 설명한다.
  근거: [Installation](https://doc.rust-lang.org/book/ch01-01-installation.html)
- Rust Book은 단일 파일 예제를 `rustc`로 컴파일하는 흐름과, 실제 프로젝트 흐름을 `cargo new`, `cargo build`, `cargo run` 기준으로 구분해 설명한다.
  근거: [Hello, World!](https://doc.rust-lang.org/book/ch01-02-hello-world.html), [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- VS Code의 공식 Rust 문서는 편집 확장으로 `rust-analyzer`를 안내한다.
  근거: [Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)

## 직접 확인한 결과

### 1. 설치 경로와 버전 확인

- 직접 확인한 결과: 공식 사이트에서 Windows용 `rustup-init.exe`를 실행하고 기본 설치를 선택한 뒤, 새 PowerShell 창에서 아래 명령으로 설치를 확인할 수 있었다.

```powershell
rustc --version
cargo --version
```

- 관찰된 결과:

```text
rustc 1.94.0 (4a4ef493e 2026-03-02)
cargo 1.94.0 (85eff7c80 2026-01-15)
```

- 재현 순서는 아래처럼 따라가면 된다.

1. [Rust install page](https://www.rust-lang.org/tools/install) 또는 [rustup.rs](https://rustup.rs/)로 들어간다.
2. Windows용 `rustup-init.exe`를 내려받아 실행한다.
3. 기본값 기준으로 `1) Proceed with standard installation`을 선택한다.
4. 설치 후 새 PowerShell 창을 열고 위 버전 확인 명령을 실행한다.

### 2. VS Code에서 가장 단순한 Hello World 코드 준비

- 직접 확인한 결과: 새 폴더를 VS Code로 열고 `hello.rs` 파일에 아래 코드를 넣으면 단일 파일 실습을 바로 시작할 수 있었다.

```rust
fn main() {
    println!("Hello, world!");
}
```

- 직접 확인한 결과: VS Code에서 Rust를 계속 볼 예정이라면 `rust-analyzer`를 함께 설치해 두는 편이 편집 경험이 훨씬 낫다.

### 3. `rustc`로 단일 파일 빌드

- 직접 확인한 결과: `hello.rs`가 있는 폴더에서 아래 명령을 실행하면 같은 폴더에 `hello.exe`가 생성됐다.

```powershell
rustc hello.rs
.\hello.exe
```

- 관찰된 결과:

```text
Hello, world!
```

- 이 경로는 "Rust 문법을 한 파일로 빨리 확인"할 때는 간단하지만, 프로젝트 구조나 의존성 관리는 다루지 않는다.

### 4. `cargo`로 프로젝트 생성과 실행

- 직접 확인한 결과: 실제 프로젝트 흐름은 `cargo`가 훨씬 자연스러웠다. 아래 명령으로 새 프로젝트를 만들고 바로 실행할 수 있었다.

```powershell
cargo new hello-rust
cd hello-rust
cargo run
```

- `src/main.rs`의 기본 코드는 아래처럼 시작한다.

```rust
fn main() {
    println!("Hello, world!");
}
```

- 관찰된 결과:

```text
Hello, world!
```

- 직접 확인한 결과: `cargo build`를 쓰면 실행 파일은 `target\debug\hello-rust.exe` 아래 생성됐다.

## 해석 / 의견

- 의견: 입문 단계에서는 Rust 설치를 "`rustup`으로 toolchain을 설치한다"로 이해하는 편이 가장 실용적이다.
- 의견: `rustc`는 단일 파일 예제를 빨리 확인할 때는 좋지만, 프로젝트를 이어서 키울 생각이라면 너무 이른 단계부터 `cargo` 흐름에 익숙해지는 편이 낫다.
- 해석: 초급자 기준으로는 "설치 확인 -> `rustc` 한 번 실행 -> `cargo new`로 프로젝트 시작" 순서가 가장 자연스럽다.

## 한계와 예외

- 이 글은 Windows PowerShell과 VS Code 기준이다. macOS, Linux, WSL, Remote Container 환경은 다루지 않았다.
- `rustup-init.exe` 화면 구성과 기본 옵션은 시점에 따라 달라질 수 있다.
- 이 글은 설치와 첫 실행만 다룬다. toolchain override, nightly, cross-compilation, C++ 빌드 도구 이슈 같은 설치 예외는 넣지 않았다.
- VS Code 사용은 선택 사항이다. Rust 설치와 `rustc`/`cargo` 실행 자체는 에디터 없이도 가능하다.

## 참고자료

- [Install Rust](https://www.rust-lang.org/tools/install)
- [rustup.rs](https://rustup.rs/)
- [The rustup book](https://rust-lang.github.io/rustup/)
- [Installation](https://doc.rust-lang.org/book/ch01-01-installation.html)
- [Hello, World!](https://doc.rust-lang.org/book/ch01-02-hello-world.html)
- [Hello, Cargo!](https://doc.rust-lang.org/book/ch01-03-hello-cargo.html)
- [Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)
