---
layout: single
title: "Rust 12. Serde로 JSON/TOML 다루기"
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
- 검증 기준일: 2026-04-16
- 문서 성격: tutorial
- 테스트 환경: Windows 11 Pro, Windows PowerShell, Cargo CLI 예시
- 테스트 버전: rustc 1.94.0, cargo 1.94.0, serde 1.0.228, serde_json 1.0.149, toml 1.1.2+spec-1.1.0
- 출처 등급: 공식 문서와 공식 crate 문서를 사용했다.
- 비고: 이 글은 typed struct 기반의 기본 직렬화·역직렬화 흐름에 집중하며, 커스텀 attribute나 고급 enum tagging 전략은 다루지 않는다.

## 문제 정의

파일 I/O와 CLI 입력까지 익히고 나면 다음 단계는 외부 데이터 형식이다. 그런데 초급자는 보통 아래 지점에서 막힌다.

- JSON 문자열을 바로 map으로 다뤄야 하는지 struct로 받아야 하는지 헷갈린다.
- `serde`, `serde_json`, `toml`의 역할 구분이 잘 안 된다.
- `Serialize`와 `Deserialize`가 "언제 어떤 방향"인지 처음에는 바로 떠오르지 않는다.

이번 글의 범위는 가장 기본적인 typed data 변환이다. 커스텀 serializer, 고성능 스트리밍 파서, 복잡한 enum tagging 전략은 제외하고, 초급자가 설정 파일과 JSON payload를 다루는 기본 패턴만 다룬다.

읽는 기준은 "외부 포맷을 내부 타입으로 고정한다"는 것이다. JSON과 TOML 문법을 많이 아는 것보다, 프로그램 내부에서 사용할 `struct`를 먼저 정하고 그 타입으로 변환이 성공하는지 확인하는 흐름이 더 중요하다.

## 확인된 사실

- 공식 문서 기준으로 Serde는 Rust 데이터 구조를 serialize/deserialize하기 위한 프레임워크이고, 핵심 경계는 `Serialize`와 `Deserialize` trait이다.
  근거: [Serde crate docs](https://docs.rs/serde/latest/serde/), [Serde 소개](https://serde.rs/)
  의미: Serde 자체는 JSON 전용 도구가 아니라, Rust 타입과 여러 데이터 포맷 사이의 변환 규칙을 정의하는 기반이다.
- 공식 문서 기준으로 `derive` 기능을 사용하면 struct와 enum에 `Serialize`, `Deserialize` 구현을 자동 생성할 수 있다.
  근거: [Using derive](https://serde.rs/derive.html)
  의미: 필드 이름과 타입이 포맷과 맞는 기본 사례에서는 변환 코드를 직접 쓰지 않고 derive로 시작할 수 있다.
- 공식 문서 기준으로 `serde_json::from_str`과 `serde_json::to_string_pretty`는 JSON 문자열과 Rust 타입 사이 변환에 쓰인다.
  근거: [serde_json crate docs](https://docs.rs/serde_json/latest/serde_json/)
  의미: JSON을 문자열 조작으로 파싱하지 않고, 타입을 지정해 읽고 다시 JSON 문자열로 내보내는 경로를 사용할 수 있다.
- 공식 문서 기준으로 `toml::from_str`과 `toml::to_string_pretty`는 TOML 문자열과 Rust 타입 사이 변환에 쓰인다.
  근거: [toml crate docs](https://docs.rs/toml/latest/toml/)
  의미: 설정 파일 포맷이 TOML이어도 내부 타입 경계는 JSON 예제와 같은 `AppConfig`로 유지할 수 있다.

검증 기준일인 2026-04-16에 docs.rs의 latest 페이지 기준으로 확인한 의존성 라인은 아래와 같이 잡을 수 있다.

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

- 읽는 법: 이 버전은 crate 예제를 실행한 Rust 도구 기준이고, 실제 변환 동작은 `serde`, `serde_json`, `toml` crate 버전도 함께 봐야 한다.

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

- 읽는 법: 같은 `AppConfig` 타입이 JSON과 TOML에서 모두 만들어졌다는 점이 핵심이다. 출력이 같다는 것은 외부 포맷은 달라도 프로그램 내부 경계는 하나의 Rust 타입으로 안정화할 수 있다는 뜻이다.

- 직접 확인 범위의 한계: JSON/TOML 기본 변환 예제는 임시 Cargo 프로젝트에서 실행했지만, 중첩 타입, enum tagging, 커스텀 attribute 같은 확장 케이스는 검증하지 않았다.

## 해석 / 의견

- 이 단계에서 중요한 판단: Serde 입문에서 가장 중요한 것은 "JSON을 직접 문자열로 만지지 말고 먼저 타입 경계를 만든다"는 감각이다.
- 선택 기준: 필드 구조가 어느 정도 정해진 데이터는 struct로 deserialize하고, 구조가 정말 유동적인 데이터만 `serde_json::Value` 같은 동적 표현을 검토한다.
- 해석: 포맷별 파서는 바뀔 수 있지만, 애플리케이션 내부 타입은 비교적 오래 유지되므로 struct 설계를 먼저 안정화하는 편이 좋다.

## 한계와 예외

- 이 글은 기본적인 struct 변환만 다루며, 중첩 enum, 커스텀 field attribute, flatten, rename, lifetime이 있는 borrowed deserialization은 제외했다.
- 대용량 JSON 스트리밍이나 매우 엄격한 validation이 필요한 경우에는 별도 전략이 필요하다.
- TOML과 JSON은 표현 방식이 다르므로 같은 struct라도 모든 케이스가 자연스럽게 1:1 대응되지는 않을 수 있다.
- 의존성 버전은 시간이 지나며 바뀔 수 있으므로, 실제 프로젝트에서는 문서의 `검증 기준일`과 최신 crate 페이지를 함께 확인하는 편이 안전하다.
- 이 글을 읽고도 남는 질문은 rename/flatten 같은 attribute, enum tagging, borrowed deserialization, validation 계층이며, 이는 Serde 심화 주제로 분리하는 편이 좋다.

## 참고자료

- [Serde 소개](https://serde.rs/)
- [Using derive](https://serde.rs/derive.html)
- [Serde crate docs](https://docs.rs/serde/latest/serde/)
- [serde_json crate docs](https://docs.rs/serde_json/latest/serde_json/)
- [toml crate docs](https://docs.rs/toml/latest/toml/)
