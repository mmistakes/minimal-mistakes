---
layout: single
title: "Rust 02. rust-analyzer\uB85C \uB514\uBC84\uAE45\uD558\uAE30"
lang: ko
translation_key: rust-debugging-with-rust-analyzer
date: 2026-04-07 10:00:00 +0900
section: development
categories: Rust
tags: [rust, rust-analyzer, vscode, debug, cargo]
author_profile: false
sidebar:
  nav: "sections"
search: false
---

Rust를 VS Code에서 디버깅할 때 가장 편하게 시작하는 방법은 `rust-analyzer`를 사용하는 것이다. 이 글은 `rust-analyzer`를 설치하고, `Run | Debug` 버튼으로 디버깅에 들어간 뒤 브레이크 포인트, 변수 창, Call Stack을 확인하는 기본 흐름을 정리한 내용이다.

## 먼저 알아둘 점

이 글에서 설명하는 방식은 반드시 `cargo new 프로젝트명`으로 만든 Cargo 프로젝트 기준이다.

예를 들어 아래처럼 프로젝트를 만든 뒤 VS Code로 여는 방식이다.

```powershell
cargo new rust-debug-demo
cd rust-debug-demo
code .
```

반대로 `rustc hello.rs`처럼 단일 파일만 두고 실행하는 방식은 이 글에서 설명하는 `rust-analyzer` 디버깅 흐름이 잘 잡히지 않는다. 즉, `Run | Debug` 버튼을 이용한 디버깅은 Cargo 프로젝트 기준으로 생각하는 것이 편하다.

## rust-analyzer 설치

VS Code의 확장 메뉴에서 `rust-analyzer`를 설치한다.

![rust-analyzer]({{ '/images/rust-debug/rust-analyzer.png' | relative_url }})

설치가 끝나고 Cargo 프로젝트를 VS Code로 열면 `fn main()` 위쪽에 `Run | Debug` 버튼이 나타난다.

![Run Debug]({{ '/images/rust-debug/run_debug_%EB%B2%84%ED%8A%BC.png' | relative_url }})

여기서 `Debug`를 클릭하면 바로 디버깅 모드로 들어갈 수 있다.

## 사용한 예제 코드

`src/main.rs` 파일에 아래 코드를 넣고 진행하면 된다.

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("0으로 나눌 수 없습니다.".to_string())
    } else {
        Ok(a / b)
    }
}

fn call_stack() -> i32 {
    add(2, 1)
}

fn main() {
    let x = 10;
    let y = 5;

    let sum: i32 = add(x, y);
    println!("sum = {}", sum);

    for i in 0..3 {
        println!("i = {}", i);
    }

    match divide(x, y) {
        Ok(result) => println!("result = {}", result),
        Err(msg) => println!("error = {}", msg),
    }

    match divide(x, 0) {
        Ok(result) => println!("result = {}", result),
        Err(msg) => println!("error = {}", msg),
    }

    let sum2: i32 = call_stack();
    println!("sub2 = {}", sum2);
}
```

이 코드는 함수 호출, 반복문, `match`, 에러 처리, Call Stack 확인에 필요한 요소가 모두 들어 있어서 디버깅 연습용으로 적당하다.

## 가장 먼저 익히면 좋은 키

디버깅을 시작한 뒤 처음에는 아래 4개 키만 익혀도 충분하다.

- `F5`: 실행하거나 다음 브레이크 포인트까지 계속 진행
- `F9`: 현재 줄에 브레이크 포인트 설정
- `F10`: 한 줄씩 실행
- `F11`: 한 줄씩 실행하되 함수가 나오면 함수 내부로 들어감

실제로 처음에는 `F9`로 멈출 위치를 잡고, `F5`로 시작한 다음 `F10`, `F11`을 섞어서 흐름을 보는 식으로 사용하면 가장 이해하기 쉽다.

## 브레이크 포인트 설정

디버깅할 줄 왼쪽 여백을 클릭하거나 `F9`를 누르면 브레이크 포인트를 걸 수 있다. 아래처럼 빨간 점이 생기면 정상적으로 설정된 것이다.

![Breakpoint]({{ '/images/rust-debug/break_point.png' | relative_url }})

브레이크 포인트를 건 뒤 `Debug`를 누르거나 `F5`를 누르면 해당 줄에서 실행이 멈춘다. 이 상태에서 변수 값이나 함수 호출 흐름을 하나씩 확인할 수 있다.

## 변수 값 확인

디버깅이 멈춘 상태에서는 왼쪽 디버그 패널의 `VARIABLES` 영역에서 현재 변수 상태를 볼 수 있다.

![Variables]({{ '/images/rust-debug/%EB%B3%80%EC%88%98%20%ED%98%84%ED%99%A9.png' | relative_url }})

예를 들어 `x = 10`, `y = 5`, `sum` 같은 값이 들어간 변수를 이 영역에서 바로 확인할 수 있다. 브레이크 포인트 위치에 따라 어떤 값은 아직 계산 전일 수 있고, 경우에 따라 일부 항목은 `optimized away`처럼 보일 수도 있다. 그래도 현재 실행 지점 기준으로 어떤 값이 잡혀 있는지 빠르게 확인하는 데 매우 유용하다.

## Call Stack 확인

함수 호출 흐름은 `CALL STACK` 영역에서 확인할 수 있다.

![Call Stack]({{ '/images/rust-debug/call_stack.png' | relative_url }})

이 영역을 보면 지금 어떤 함수 안에 들어와 있는지, 그리고 어떤 함수 순서로 여기까지 왔는지를 확인할 수 있다. 예제 코드에서는 `main()`에서 `call_stack()`을 호출하고, 그 안에서 다시 `add()`를 호출하므로 함수 호출 관계를 따라가며 보기 좋다.

`F11`을 사용하면 함수 내부로 직접 들어가면서 Call Stack이 어떻게 바뀌는지도 함께 확인할 수 있다.

## 정리

Rust를 VS Code에서 디버깅할 때는 `rust-analyzer`와 Cargo 프로젝트 조합으로 시작하는 것이 가장 편하다. `cargo new`로 프로젝트를 만든 뒤 `Run | Debug` 버튼으로 진입하고, `F5`, `F9`, `F10`, `F11`만 익혀도 기본적인 디버깅 흐름은 충분히 익힐 수 있다. 여기에 변수 창과 Call Stack까지 함께 보면 코드가 어떤 순서로 실행되는지 훨씬 쉽게 이해할 수 있다.
