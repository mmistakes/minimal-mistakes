---
layout: single
title: "Rust 12. Serde with JSON and TOML Basics"
description: "serde, serde_json, toml로 Rust 타입과 JSON/TOML 데이터를 직렬화·역직렬화하는 기초 가이드."
date: 2026-04-19 09:00:00 +0900
lang: ko
translation_key: rust-serde-json-toml-basics
section: development
topic_key: rust
categories: Rust
tags: [rust, serde, json, toml, serialization]
author_profile: false
sidebar:
  nav: "sections"
search: true
---

## 요약

실제 Rust 프로그램은 문자열, 숫자, 컬렉션만 다루고 끝나지 않는다. 설정 파일, API 응답, 로그, 외부 데이터 포맷을 읽고 써야 하므로 결국 "Rust 타입과 외부 데이터 형식 사이를 어떻게 오갈 것인가"가 중요해진다.

이 글은 `serde`, `serde_json`, `toml`을 이용해 JSON과 TOML을 Rust struct로 읽고 다시 문자열로 내보내는 가장 기본적인 패턴을 정리한다. 결론부터 말하면 초급 단계에서는 `struct`를 데이터 경계로 정하고 `Serialize`, `Deserialize` derive를 붙인 뒤, 포맷별 crate에서 `from_str`과 `to_string_pretty` 같은 API를 사용하는 흐름이 가장 이해하기 쉽다.

## 문서 정보

- 작성일: 2026-04-15
- 검증 기준일: 2026-04-15
- 문서 성격: tutorial
- 테스트 환경: Windows 11, PowerShell, Cargo CLI 예시
- 테스트 버전: rustc 1.94.0, cargo 1.94.0, serde 1.x, serde_json 1.x, toml 1.x

## 문제 정의

파일 I/O와 CLI 입력까지 익히고 나면 다음 단계는 외부 데이터 형식이다. 그런데 초급자는 보통 아래 지점에서 막힌다.

- JSON 문자열을 바로 map으로 다뤄야 하는지 struct로 받아야 하는지 헷갈린다.
- `serde`, `serde_json`, `toml`의 역할 구분이 잘 안 된다.
- `Serialize`와 `Deserialize`가 "언제 어떤 방향"인지 처음에는 바로 떠오르지 않는다.

이번 글의 범위는 가장 기본적인 typed data 변환이다. 커스텀 serializer, 고성능 스트리밍 파서, 복잡한 enum tagging 전략은 제외하고, 초급자가 설정 파일과 JSON payload를 다루는 기본 패턴만 다룬다.

## 확인된 사실

- 공식 문서 기준으로 Serde는 Rust 데이터 구조를 serialize/deserialize하기 위한 프레임워크이고, 핵심 경계는 `Serialize`와 `Deserialize` trait이다.
  근거: [Serde crate docs](https://docs.rs/serde/latest/serde/), [Serde 소개](https://serde.rs/)
- 공식 문서 기준으로 `derive` 기능을 사용하면 struct와 enum에 `Serialize`, `Deserialize` 구현을 자동 생성할 수 있다.
  근거: [Using derive](https://serde.rs/derive.html)
- 공식 문서 기준으로 `serde_json::from_str`과 `serde_json::to_string_pretty`는 JSON 문자열과 Rust 타입 사이 변환에 쓰인다.
  근거: [serde_json crate docs](https://docs.rs/serde_json/latest/serde_json/)
- 공식 문서 기준으로 `toml::from_str`과 `toml::to_string_pretty`는 TOML 문자열과 Rust 타입 사이 변환에 쓰인다.
  근거: [toml crate docs](https://docs.rs/toml/latest/toml/)

검증 기준일인 2026-04-15에 docs.rs의 latest 페이지 기준으로 확인한 의존성 라인은 아래와 같이 잡을 수 있다.

```toml
[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
toml = "1"
```

가장 기본적인 데이터 경계는 아래처럼 struct 하나를 두는 방식이다.

```rust
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct AppConfig {
    app_name: String,
    port: u16,
    debug: bool,
}
```

JSON 문자열을 Rust 타입으로 읽는 예제는 아래처럼 볼 수 있다.

```rust
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let json = r#"{
        "app_name": "rust-tool",
        "port": 8080,
        "debug": true
    }"#;

    let config: AppConfig = serde_json::from_str(json)?;
    println!("JSON => {:?}", config);

    Ok(())
}
```

같은 struct를 TOML에서도 재사용할 수 있다.

```rust
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let text = r#"
app_name = "rust-tool"
port = 8080
debug = true
"#;

    let config: AppConfig = toml::from_str(text)?;
    let pretty = toml::to_string_pretty(&config)?;

    println!("TOML => {:?}", config);
    println!("{}", pretty);

    Ok(())
}
```

여기서 핵심은 JSON과 TOML이 달라도 애플리케이션 내부에서는 같은 `AppConfig` 타입을 쓸 수 있다는 점이다. 즉, 외부 포맷이 달라져도 내부 로직은 struct 경계로 안정화할 수 있다.

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

- 직접 확인한 결과: `serde`, `serde_json`, `toml` 의존성을 추가한 임시 Cargo 프로젝트에서 위 JSON/TOML 예제를 한 `main`에 묶어 순서대로 실행했을 때 출력은 아래와 같았다.

```powershell
cargo run --quiet
```

- 관찰된 결과:

```text
JSON => AppConfig { app_name: "rust-tool", port: 8080, debug: true }
TOML => AppConfig { app_name: "rust-tool", port: 8080, debug: true }
app_name = "rust-tool"
port = 8080
debug = true
```

- 직접 재현 범위의 한계: JSON/TOML 기본 변환 예제는 임시 Cargo 프로젝트에서 실행했지만, 중첩 타입, enum tagging, 커스텀 attribute 같은 확장 케이스는 검증하지 않았다.

## 해석 / 의견

- 내 판단으로는 Serde 입문에서 가장 중요한 것은 "JSON을 직접 문자열로 만지지 말고 먼저 타입 경계를 만든다"는 감각이다.
- 의견: 작은 설정 파일이나 API 응답을 다룰 때는 `serde_json::Value`나 임의 map부터 시작하기보다, 필요한 필드만 가진 struct로 바로 deserialize하는 편이 변경 추적과 테스트에 유리하다.
- 의견: 포맷별 파서는 바뀔 수 있지만, 애플리케이션 내부 타입은 비교적 오래 유지되므로 struct 설계를 먼저 안정화하는 편이 좋다.

## 한계와 예외

- 이 글은 기본적인 struct 변환만 다루며, 중첩 enum, 커스텀 field attribute, flatten, rename, lifetime이 있는 borrowed deserialization은 제외했다.
- 대용량 JSON 스트리밍이나 매우 엄격한 validation이 필요한 경우에는 별도 전략이 필요하다.
- TOML과 JSON은 표현 방식이 다르므로 같은 struct라도 모든 케이스가 자연스럽게 1:1 대응되지는 않을 수 있다.
- 의존성 버전은 시간이 지나며 바뀔 수 있으므로, 실제 프로젝트에서는 문서의 `검증 기준일`과 최신 crate 페이지를 함께 확인하는 편이 안전하다.

## 참고자료

- [Serde 소개](https://serde.rs/)
- [Using derive](https://serde.rs/derive.html)
- [Serde crate docs](https://docs.rs/serde/latest/serde/)
- [serde_json crate docs](https://docs.rs/serde_json/latest/serde_json/)
- [toml crate docs](https://docs.rs/toml/latest/toml/)
