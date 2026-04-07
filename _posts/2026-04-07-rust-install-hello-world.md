---
layout: single
title: "Rust 01. \uC124\uCE58\uC640 Hello World \uC2E4\uD589\uD558\uAE30"
date: 2026-04-07 09:00:00 +0900
section: development
categories: Rust
tags: [rust, rustup, cargo, rustc, vscode, windows]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

Rust를 처음 시작할 때는 컴파일러만 따로 설치하기보다 공식 설치 도구인 `rustup`으로 한 번에 설치하는 방법이 가장 편하다. 이 글은 Windows와 VS Code 기준으로 Rust를 설치하고, `Hello, world!`를 출력하는 가장 기본적인 흐름을 정리한 내용이다.

## Rust 설치 도구 사이트 위치

Rust 공식 설치 페이지와 `rustup` 사이트는 아래 경로에서 확인할 수 있다.

- Rust install page: <https://www.rust-lang.org/tools/install>
- rustup site: <https://rustup.rs/>

보통 Rust 설치라고 하면 `rustup`을 설치하는 과정을 의미한다. `rustup`을 설치하면 `rustc`, `cargo`, 표준 라이브러리, 툴체인 관리 기능까지 함께 사용할 수 있다.

## Rust 설치 도구 설치 방법

Windows 기준 설치 순서는 아래와 같다.

1. 위 공식 사이트에 접속한다.
2. Windows용 `rustup-init.exe`를 다운로드한다.
3. 다운로드한 설치 파일을 실행한다.
4. 설치 메뉴가 나오면 기본값 기준으로 `1) Proceed with standard installation`을 선택한다.
5. 설치가 끝나면 PowerShell 또는 명령 프롬프트를 새로 연다.
6. 아래 명령으로 정상 설치 여부를 확인한다.

```powershell
rustc --version
cargo --version
```

설치가 정상적으로 끝났다면 아래처럼 버전 정보가 출력된다. 버전 번호는 설치 시점에 따라 달라질 수 있다.

![rustc 버전 확인]({{ '/images/rust-install/rustc.png' | relative_url }})

![cargo 버전 확인]({{ '/images/rust-install/cargo.png' | relative_url }})

## VS Code에서 Rust로 Hello World 출력하기

VS Code에서 Rust를 작업할 때는 확장 메뉴에서 `rust-analyzer`를 같이 설치해 두면 자동완성, 문법 검사, 오류 표시를 편하게 사용할 수 있다.

새 폴더를 하나 만든 뒤 VS Code로 열고, `hello.rs` 파일을 생성한 다음 아래 코드를 작성한다.

```rust
fn main() {
    println!("Hello, world!");
}
```

위 코드는 Rust에서 가장 기본적인 시작 코드다. `main` 함수가 프로그램의 시작점이며, `println!` 매크로를 이용해 콘솔에 문자열을 출력한다.

## rustc로 빌드하는 방법

단일 파일을 빠르게 테스트할 때는 `rustc` 명령으로 바로 빌드할 수 있다.

먼저 `hello.rs` 파일에 아래 코드를 저장한다.

```rust
fn main() {
    println!("Hello, world!");
}
```

이후 PowerShell에서 해당 파일이 있는 위치로 이동한 다음 아래 명령으로 빌드한다.

```powershell
rustc hello.rs
```

빌드가 완료되면 같은 폴더에 `hello.exe` 파일이 생성된다. 실행은 아래처럼 하면 된다.

```powershell
.\hello.exe
```

정상적으로 실행되면 아래 문자열이 출력된다.

```text
Hello, world!
```

## cargo로 빌드하는 방법

실제 프로젝트는 보통 `cargo`를 사용해 생성하고 관리한다. `cargo`는 빌드뿐 아니라 실행, 의존성 관리, 프로젝트 구조 생성까지 함께 처리해 준다.

먼저 새 프로젝트를 생성한다.

```powershell
cargo new hello-rust
cd hello-rust
```

프로젝트를 만들면 `src/main.rs` 파일이 생성된다. 해당 파일 내용은 아래와 같이 작성하면 된다.

```rust
fn main() {
    println!("Hello, world!");
}
```

이제 아래 명령으로 빌드할 수 있다.

```powershell
cargo build
```

빌드가 끝나면 실행 파일은 `target\debug\hello-rust.exe` 경로에 생성된다. 직접 실행하려면 아래 명령을 사용한다.

```powershell
.\target\debug\hello-rust.exe
```

또는 빌드와 실행을 한 번에 하려면 아래처럼 `cargo run`을 사용해도 된다.

```powershell
cargo run
```

정상적으로 실행되면 결과는 동일하게 아래처럼 출력된다.

```text
Hello, world!
```

## 마무리

Rust를 설치할 때는 공식 설치 도구인 `rustup`을 사용하는 것이 가장 일반적이다. 간단한 실습은 `rustc`로도 가능하지만, 실제 개발에서는 `cargo` 기반으로 프로젝트를 생성하고 빌드하는 방식이 훨씬 편하다. 처음에는 `Hello, world!`부터 실행해 보고, 이후 `cargo run`, `cargo build`, `cargo check` 같은 명령에 익숙해지면 Rust 개발 흐름을 빠르게 익힐 수 있다.
