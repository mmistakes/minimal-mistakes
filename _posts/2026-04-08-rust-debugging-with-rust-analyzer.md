---
layout: single
description: "rust-analyzer와 CodeLLDB로 Rust 프로젝트를 디버깅하는 VS Code 실전 가이드."
title: "Rust 02. rust-analyzer와 CodeLLDB로 디버깅하기"
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

## 요약

VS Code에서 Rust를 디버깅할 때는 `rust-analyzer`와 `CodeLLDB`를 함께 쓰는 구성이 가장 이해하기 쉽다. 이 글은 Cargo 프로젝트 기준으로 디버그 진입, `launch.json` 생성, 브레이크포인트, 변수/Call Stack 확인, 인자 전달 디버깅까지 가장 많이 쓰는 흐름만 정리한다.

결론부터 말하면 초급자는 "Cargo 프로젝트 생성 -> `rust-analyzer` 설치 -> `CodeLLDB` 설치 -> `launch.json`으로 실행 조건 고정" 순서로 잡는 편이 가장 덜 흔들린다.

## 문서 정보

- 작성일: 2026-04-08
- 검증 기준일: 2026-04-15
- 문서 성격: tutorial
- 테스트 환경: Cargo 프로젝트, VS Code, `rust-analyzer`, `CodeLLDB`, Windows 예시 경로
- 테스트 버전: VS Code, `rust-analyzer`, `CodeLLDB` 버전 미고정
- 출처 등급: 공식 문서와 원저자 저장소만 사용했다.
- 비고: 이 글은 여러 디버깅 조합 중에서도 입문자가 흐름을 이해하기 쉬운 `rust-analyzer + CodeLLDB` 구성을 중심으로 정리한다.

## 문제 정의

Rust 입문자가 VS Code 디버깅 단계에서 자주 막히는 지점은 아래와 같다.

- 단일 파일과 Cargo 프로젝트 중 무엇을 기준으로 디버깅해야 하는지 모호하다.
- `rust-analyzer`와 `CodeLLDB`가 각각 어떤 역할인지 헷갈린다.
- `launch.json`이 왜 필요한지, 언제 만들어야 하는지 감이 잘 안 잡힌다.
- 브레이크포인트, 변수 창, Call Stack, 인자 전달이 하나의 흐름으로 연결되지 않는다.

이 글은 위 혼란을 줄이기 위해 Cargo 프로젝트 하나를 기준으로 가장 기본적인 디버깅 흐름만 다룬다. WSL, remote container, 다중 바이너리, test debugging, 고급 LLDB 설정은 범위에서 제외한다.

읽는 기준은 "에디터가 코드를 이해하는 층"과 "프로그램을 멈춰서 살펴보는 층"을 분리하는 것이다. `rust-analyzer`는 코드 분석과 실행 진입점을 찾는 데 도움을 주고, `CodeLLDB`와 `launch.json`은 어떤 실행 파일을 어떤 조건으로 디버깅할지 고정한다. 이 둘을 섞어 하나의 확장처럼 외우면 설정이 꼬일 때 원인을 찾기 어렵다.

## 확인된 사실

- VS Code의 공식 Rust 문서는 Cargo 프로젝트와 `rust-analyzer` 기반 흐름을 중심으로 설명한다.
  근거: [Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)
  의미: VS Code에서 Rust를 안정적으로 다루려면 단일 파일보다 Cargo 프로젝트를 열어 두는 편이 에디터 기능과 빌드 흐름을 연결하기 쉽다.
- VS Code의 공식 디버깅 문서는 `.vscode/launch.json`에서 디버거 유형, 실행 파일, 작업 디렉터리, 인자를 지정한다고 설명한다.
  근거: [Visual Studio Code debug configuration](https://code.visualstudio.com/docs/debugtest/debugging-configuration)
  의미: `launch.json`은 단순히 버튼을 만들기 위한 파일이 아니라, 재현 가능한 디버그 실행 조건을 저장하는 파일이다.
- VS Code의 공식 디버깅 문서는 `F5`, `F9`, `F10`, `F11` 같은 기본 디버깅 키를 표준 흐름으로 설명한다.
  근거: [Debug code with Visual Studio Code](https://code.visualstudio.com/docs/debugtest/debugging)
  의미: 초급 단계에서는 모든 디버거 기능을 알 필요가 없다. 멈추기, 계속 실행하기, 한 줄 실행하기, 함수 안으로 들어가기를 먼저 익히면 된다.
- `rust-analyzer`는 Rust 편집/분석 레이어의 기본 도구이고, `CodeLLDB`는 LLDB 기반 디버거 확장이다.
  근거: [rust-analyzer book](https://rust-analyzer.github.io/book/), [CodeLLDB repository](https://github.com/vadimcn/codelldb)
  의미: 코드 렌즈나 진단이 안 보이면 `rust-analyzer` 쪽을, 브레이크포인트 실행이 안 되면 `CodeLLDB` 또는 디버그 구성 쪽을 먼저 의심하는 식으로 문제를 나눠 볼 수 있다.

## 직접 재현한 결과

### 1. Cargo 프로젝트를 기준으로 잡는 편이 가장 자연스러웠다

- 직접 확인한 결과: 아래처럼 새 Cargo 프로젝트를 만든 뒤 VS Code로 여는 흐름이 디버깅 설명과 가장 잘 맞았다.

```powershell
cargo new rust-debug-demo
cd rust-debug-demo
code .
```

- 읽는 법: 이 단계의 핵심은 Cargo가 만든 기본 구조를 VS Code가 프로젝트로 인식하게 하는 것이다. 반대로 `rustc hello.rs` 같은 단일 파일 흐름은 이 글에서 다루는 `rust-analyzer`와 `CodeLLDB` 조합을 설명하기엔 불편했다.

### 2. `rust-analyzer` 설치 후 Debug 진입이 쉬워졌다

- 직접 확인한 결과: Cargo 프로젝트를 VS Code로 연 뒤 `rust-analyzer`를 설치하면 `fn main()` 위쪽에 `Run | Debug` 버튼이 나타났다.

![rust-analyzer]({{ '/images/rust_02/rust-analyzer.png' | relative_url }})
![Run Debug]({{ '/images/rust_02/run_debug_%EB%B2%84%ED%8A%BC.png' | relative_url }})

- 직접 확인한 결과: 이 버튼이나 `Rust Analyzer: Debug` 명령으로 디버그 세션 진입이 가능했다.

- 읽는 법: `Run | Debug`가 보인다는 것은 에디터가 현재 함수와 Cargo 프로젝트를 연결해서 이해했다는 신호다. 버튼이 없으면 먼저 프로젝트 루트를 제대로 열었는지와 `rust-analyzer` 상태를 확인하는 편이 좋다.

### 3. `CodeLLDB`와 `launch.json`으로 실행 조건을 고정할 수 있었다

- 직접 확인한 결과: Run and Debug 화면에서 `create a launch.json file`을 선택하고 `CodeLLDB`를 고르면 기본 디버그 구성을 만들 수 있었다.

![CodeLLDB install]({{ '/images/rust_02/codeLLDB%EC%84%A4%EC%B9%98.png' | relative_url }})
![Create launch.json]({{ '/images/rust_02/create_a_launch_json.file.png' | relative_url }})
![Select CodeLLDB]({{ '/images/rust_02/launch_json_codeLLDB.png' | relative_url }})

- 직접 확인한 결과: 가장 단순한 Windows 예시는 아래처럼 둘 수 있었다.

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

- 위 구성은 디버깅 전에 아래처럼 한 번 빌드해 두면 가장 덜 헷갈렸다.

```powershell
cargo build
```

- 읽는 법: `program`은 실제 실행 파일 위치, `args`는 프로그램에 전달할 인자, `cwd`는 실행 기준 폴더다. 디버깅이 실패할 때는 세 값을 먼저 확인하면 원인을 좁히기 쉽다.

### 4. 브레이크포인트, 변수, Call Stack은 아래 순서로 확인하면 쉬웠다

- 직접 확인한 결과: 아래 네 키만 익혀도 기본 흐름을 보는 데 충분했다.

1. `F9`: 브레이크포인트 설정
2. `F5`: 실행 또는 다음 브레이크포인트까지 진행
3. `F10`: 한 줄씩 실행
4. `F11`: 함수 내부로 들어가며 실행

- 직접 확인한 결과: 브레이크포인트를 걸면 변수 패널과 Call Stack에서 현재 상태를 바로 읽을 수 있었다.

![Breakpoint]({{ '/images/rust_02/break_point.png' | relative_url }})
![Variables]({{ '/images/rust_02/%EB%B3%80%EC%88%98%20%ED%98%84%ED%99%A9.png' | relative_url }})
![Call Stack]({{ '/images/rust_02/call_stack.png' | relative_url }})

### 5. `args`로 인자 전달 디버깅도 재현 가능했다

- 직접 확인한 결과: `src/main.rs`에 아래 코드를 넣고 `launch.json`의 `args`를 설정하면 실행 인자가 어떻게 들어오는지 확인할 수 있었다.

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

- `launch.json`에는 아래처럼 인자를 넣는다.

```json
"args": ["abcd", "efgh"]
```

- 관찰된 결과:

```text
args[0] = <실행 파일 경로>
args[1] = abcd
args[2] = efgh
```

- 읽는 법: `args[0]`은 사용자가 넣은 첫 번째 옵션이 아니라 실행 파일 자체를 가리키는 값으로 읽어야 한다. 직접 확인한 결과, `launch.json`에 넣은 값은 `args[1]`, `args[2]`부터 확인됐다.

## 해석 / 의견

- 이 단계에서 중요한 판단: 초급자 기준으로는 디버거 스택을 이것저것 섞기보다 `rust-analyzer + CodeLLDB` 한 조합으로 끝까지 익히는 편이 이해가 빠르다.
- 선택 기준: 디버깅 대상이 단일 파일이면 먼저 Cargo 프로젝트로 옮기고, 실행 조건이 반복되면 `launch.json`에 고정한다.
- 해석: `launch.json`은 단순 옵션 파일이 아니라 "어떤 실행 파일을 어떤 인자와 작업 디렉터리로 디버깅할지"를 고정하는 재현 장치로 이해하는 편이 좋다.

## 한계와 예외

- 이 글은 Windows 로컬 VS Code 기준이다. macOS, Linux, WSL, Remote SSH, Dev Container 환경은 따로 다루지 않았다.
- VS Code, `rust-analyzer`, `CodeLLDB` 버전에 따라 버튼 위치, 메뉴 이름, 초기 안내 문구는 달라질 수 있다.
- 공식 VS Code Rust 문서는 Windows에서 Microsoft C++ 확장을 먼저 언급하는 구간도 있다. 이 글은 설명 일관성을 위해 `CodeLLDB` 기준으로 통일했다.
- test debugging, attach 모드, 다중 바이너리, workspace 규모 프로젝트는 넣지 않았다.
- 이 글을 읽고도 남는 질문은 테스트 디버깅, attach 디버깅, remote 환경 디버깅이며, 이들은 실행 대상과 디버거 연결 방식이 달라 별도 글에서 다루는 편이 맞다.

## 참고자료

- [Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)
- [Debug code with Visual Studio Code](https://code.visualstudio.com/docs/debugtest/debugging)
- [Visual Studio Code debug configuration](https://code.visualstudio.com/docs/debugtest/debugging-configuration)
- [rust-analyzer book](https://rust-analyzer.github.io/book/)
- [CodeLLDB repository](https://github.com/vadimcn/codelldb)
