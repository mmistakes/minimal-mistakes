---
layout: single
title: "Rust 02. rust-analyzer\uC640 CodeLLDB\uB85C \uB514\uBC84\uAE45\uD558\uAE30"
lang: ko
translation_key: rust-debugging-with-rust-analyzer
date: 2026-04-08 10:00:00 +0900
section: development
topic_key: rust
categories: Rust
tags: [rust, rust-analyzer, codelldb, vscode, debug, cargo]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

Rust를 VS Code에서 디버깅할 때는 `rust-analyzer`와 `CodeLLDB`를 함께 사용하는 구성이 가장 이해하기 쉽다. 이 글은 기본 디버깅 키 사용법부터 브레이크 포인트, 변수 창, Call Stack 확인 방법, 그리고 `launch.json`을 이용한 인자 전달 디버깅까지 한 번에 정리한 내용이다.

## 먼저 알아둘 점

이 글에서 설명하는 방식은 반드시 `cargo new 프로젝트명`으로 만든 Cargo 프로젝트 기준이다.

예를 들어 아래처럼 프로젝트를 만든 뒤 VS Code로 여는 방식이다.

```powershell
cargo new rust-debug-demo
cd rust-debug-demo
code .
```

반대로 `rustc hello.rs`처럼 단일 파일만 두고 실행하는 방식은 이 글에서 설명하는 `rust-analyzer`와 `CodeLLDB` 디버깅 흐름이 잘 맞지 않는다. 즉, 이 글의 내용은 Cargo 프로젝트 기준으로 따라가는 것이 가장 편하다.

## rust-analyzer 설치

VS Code의 확장 메뉴에서 `rust-analyzer`를 설치한다.

![rust-analyzer]({{ '/images/rust_02/rust-analyzer.png' | relative_url }})

설치가 끝나고 Cargo 프로젝트를 VS Code로 열면 `fn main()` 위쪽에 `Run | Debug` 버튼이 나타난다.

![Run Debug]({{ '/images/rust_02/run_debug_%EB%B2%84%ED%8A%BC.png' | relative_url }})

여기서 `Debug`를 클릭하면 바로 디버깅 모드로 들어갈 수 있다.

## CodeLLDB 설치

실제 디버깅 기능을 더 안정적으로 사용하려면 `CodeLLDB` 확장도 함께 설치하는 것이 좋다.

![CodeLLDB install]({{ '/images/rust_02/codeLLDB%EC%84%A4%EC%B9%98.png' | relative_url }})

`CodeLLDB`는 LLDB 기반 디버거 확장으로, Rust 같은 네이티브 언어를 VS Code에서 디버깅할 때 자주 사용된다.

## Ctrl+Shift+D로 Debug 모드 진입

왼쪽 사이드바의 Run and Debug 메뉴를 열거나 `Ctrl+Shift+D`를 누르면 디버깅 화면으로 들어갈 수 있다.

디버그 구성이 아직 없다면 아래처럼 `create a launch.json file` 링크가 보인다.

![Create launch.json]({{ '/images/rust_02/create_a_launch_json.file.png' | relative_url }})

이 버튼을 클릭한 뒤 디버거 목록에서 `CodeLLDB`를 선택하면 된다.

![Select CodeLLDB]({{ '/images/rust_02/launch_json_codeLLDB.png' | relative_url }})

## launch.json 파일이란?

`launch.json`은 VS Code가 디버깅을 시작할 때 어떤 디버거를 사용할지, 어떤 실행 파일을 띄울지, 현재 작업 폴더는 어디인지, 인자를 무엇으로 넘길지를 저장하는 설정 파일이다.

파일 위치는 보통 아래 경로다.

```text
.vscode/launch.json
```

즉, 이 파일 하나로 디버깅 실행 방식 전체를 제어할 수 있다고 생각하면 된다.

## launch.json 파일 생성과 예시 코드

Windows 기준으로 Rust 바이너리를 직접 지정하는 가장 단순한 예시는 아래와 같다.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "lldb",
      "request": "launch",
      "name": "CodeLLDB: Rust Debug",
      "program": "${workspaceFolder}/target/debug/${workspaceFolderBasename}.exe",
      "args": ["abcd", "efgh"],
      "cwd": "${workspaceFolder}"
    }
  ]
}
```

각 항목의 의미는 아래처럼 이해하면 된다.

- `type`: 사용할 디버거 종류다. CodeLLDB는 `lldb`를 사용한다.
- `request`: 디버깅 시작 방식이다. 일반 실행은 `launch`를 사용한다.
- `name`: VS Code 디버그 목록에 표시되는 이름이다.
- `program`: 실제로 디버깅할 실행 파일 경로다.
- `args`: 실행 파일에 넘길 인자 목록이다.
- `cwd`: 디버깅 시작 시 현재 작업 폴더다.

위 설정은 `target/debug` 아래에 생성된 실행 파일을 기준으로 동작하므로, 디버깅 전에 `cargo build`를 한 번 실행해 두면 편하다.

## 가장 먼저 익히면 좋은 키

디버깅을 시작한 뒤 처음에는 아래 4개 키만 익혀도 충분하다.

- `F5`: 실행하거나 다음 브레이크 포인트까지 계속 진행
- `F9`: 현재 줄에 브레이크 포인트 설정
- `F10`: 한 줄씩 실행
- `F11`: 한 줄씩 실행하되 함수가 나오면 함수 내부로 들어감

실제로는 `F9`로 멈출 위치를 잡고, `F5`로 실행한 다음 `F10`, `F11`을 섞어서 흐름을 보면 가장 이해하기 쉽다.

## 브레이크 포인트 설정

디버깅할 줄 왼쪽 여백을 클릭하거나 `F9`를 누르면 브레이크 포인트를 걸 수 있다. 아래처럼 빨간 점이 생기면 정상적으로 설정된 것이다.

![Breakpoint]({{ '/images/rust_02/break_point.png' | relative_url }})

브레이크 포인트를 건 뒤 `Debug`를 누르거나 `F5`를 누르면 해당 줄에서 실행이 멈춘다. 이 상태에서 변수 값이나 함수 호출 흐름을 하나씩 확인할 수 있다.

## 변수 값 확인

디버깅이 멈춘 상태에서는 왼쪽 디버그 패널의 `VARIABLES` 영역에서 현재 변수 상태를 볼 수 있다.

![Variables]({{ '/images/rust_02/%EB%B3%80%EC%88%98%20%ED%98%84%ED%99%A9.png' | relative_url }})

예를 들어 `x = 10`, `y = 5`, `sum` 같은 값이 들어간 변수를 이 영역에서 바로 확인할 수 있다. 브레이크 포인트 위치에 따라 어떤 값은 아직 계산 전일 수 있고, 경우에 따라 일부 항목은 `optimized away`처럼 보일 수도 있다. 그래도 현재 실행 지점 기준으로 어떤 값이 잡혀 있는지 빠르게 확인하는 데 매우 유용하다.

## Call Stack 확인

함수 호출 흐름은 `CALL STACK` 영역에서 확인할 수 있다.

![Call Stack]({{ '/images/rust_02/call_stack.png' | relative_url }})

이 영역을 보면 지금 어떤 함수 안에 들어와 있는지, 그리고 어떤 함수 순서로 여기까지 왔는지를 확인할 수 있다. `F11`을 사용하면 함수 내부로 직접 들어가면서 Call Stack이 어떻게 바뀌는지도 함께 확인할 수 있다.

## 인자 전달을 확인하는 예제 코드

이번에는 `launch.json`의 `args` 항목으로 인자를 넘겼을 때 실제로 어떻게 들어오는지 확인해 보자. `src/main.rs` 파일에 아래 코드를 넣는다.

```rust
fn main() {
    let args: Vec<String> = std::env::args().collect();

    if args.len() > 0 {
        println!("args[0] = {}", args[0]);
    }

    if args.len() > 1 {
        println!("args[1] = {}", args[1]);
    } else {
        println!("args[1]이 없습니다.");
    }

    if args.len() > 2 {
        println!("args[2] = {}", args[2]);
    } else {
        println!("args[2]이 없습니다.");
    }
}
```

이 코드는 실행 시 들어온 인자 목록을 출력하는 간단한 예제다. 여기서 중요한 점은 `args[0]`에는 보통 실행 파일 경로가 들어가고, 우리가 `launch.json`의 `args` 배열에 넣은 값은 `args[1]`, `args[2]`부터 확인된다는 점이다.

## args에 인자 전달하는 방법

앞서 만든 `launch.json`에서 아래 부분이 인자를 넘기는 구간이다.

```json
"args": ["abcd", "efgh"]
```

즉, 위처럼 작성한 뒤 디버깅을 시작하면 프로그램에는 `abcd`, `efgh`가 인자로 전달된다.

## 인자 전달 결과 확인

설정을 저장한 뒤 다시 디버깅을 실행하면 출력 결과에서 인자가 정상적으로 들어온 것을 확인할 수 있다.

![Args output]({{ '/images/rust_02/%EC%9D%B8%EC%9E%90%EC%A0%84%EB%8B%AC%20%ED%99%95%EC%9D%B8.png' | relative_url }})

예시 화면처럼 `args[0]`에는 실행 파일 경로가 출력되고, `args[1] = abcd`, `args[2] = efgh`가 보이면 `launch.json`의 `args` 설정이 정상적으로 적용된 것이다.

## 정리

Rust를 VS Code에서 디버깅할 때는 `rust-analyzer`로 기본 Rust 환경을 잡고, `CodeLLDB`와 `launch.json`으로 디버깅 구성을 세팅하면 훨씬 편하다. `Ctrl+Shift+D`로 Run and Debug 화면에 들어가고, `create a launch.json file`에서 CodeLLDB를 선택한 뒤, `args` 항목으로 필요한 인자를 넘겨 주면 실행 흐름 확인부터 인자 테스트까지 한 번에 진행할 수 있다.
