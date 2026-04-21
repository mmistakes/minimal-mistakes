---
layout: single
title: "Rust 12. Serde with JSON and TOML Basics"
description: "Beginner-friendly Rust guide to serializing and deserializing JSON and TOML with serde, serde_json, and toml."
date: 2026-04-19 09:00:00 +0900
lang: en
translation_key: rust-serde-json-toml-basics
section: development
topic_key: rust
categories: Rust
tags: [rust, serde, json, toml, serialization]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/serde-with-json-and-toml-basics/
---

## Summary

Real Rust programs do not stop at strings, numbers, and collections. At some point they need to read configuration files, API responses, logs, or other external data formats, which means the real question becomes how to move between Rust types and serialized data safely.

This post introduces the most basic pattern for JSON and TOML using `serde`, `serde_json`, and `toml`. The practical beginner flow is to define a struct as the data boundary, derive `Serialize` and `Deserialize`, and then use crate APIs such as `from_str` and `to_string_pretty` for each format.

## Document Information

- Written on: 2026-04-15
- Verification date: 2026-04-16
- Document type: tutorial
- Test environment: Windows 11 Pro, Windows PowerShell, Cargo CLI examples
- Test version: rustc 1.94.0, cargo 1.94.0, serde 1.0.228, serde_json 1.0.149, toml 1.1.2+spec-1.1.0
- Source grade: official documentation and official crate documentation are used.
- Note: this post stays with the basic typed struct workflow for serialization and deserialization and does not cover custom attributes or advanced enum tagging strategies.

## Problem Definition

After file I/O and CLI input, the next natural step is external data formats. Beginners usually get stuck at a few common points.

- It is not obvious whether JSON should be handled as a generic map or as a typed struct.
- The roles of `serde`, `serde_json`, and `toml` can feel blurry at first.
- The direction of `Serialize` versus `Deserialize` is easy to mix up in the beginning.

This post stays with the most basic typed-data conversion flow. It does not cover custom serializers, high-performance streaming parsers, or more advanced enum-tagging strategies.

How to read this post: treat the Rust struct as the stable internal boundary and the external format as the layer being converted. It is more important to define the type your program wants than to manually inspect JSON or TOML strings.

## Verified Facts

- According to the official documentation, Serde is a framework for serializing and deserializing Rust data structures, with `Serialize` and `Deserialize` as its central traits.
  Evidence: [Serde crate docs](https://docs.rs/serde/latest/serde/), [Serde overview](https://serde.rs/)
  Meaning: Serde is not JSON-specific. It is the common framework that lets Rust types move to and from multiple data formats.
- According to the official docs, enabling the `derive` feature allows automatic generation of `Serialize` and `Deserialize` implementations for structs and enums.
  Evidence: [Using derive](https://serde.rs/derive.html)
  Meaning: for straightforward fields and names, you can start without hand-writing conversion code.
- According to the official docs, `serde_json::from_str` and `serde_json::to_string_pretty` are used to convert between JSON strings and Rust values.
  Evidence: [serde_json crate docs](https://docs.rs/serde_json/latest/serde_json/)
  Meaning: JSON can be parsed into a typed Rust value instead of being manipulated as raw strings.
- According to the official docs, `toml::from_str` and `toml::to_string_pretty` are used to convert between TOML strings and Rust values.
  Evidence: [toml crate docs](https://docs.rs/toml/latest/toml/)
  Meaning: even when the file format is TOML, the internal Rust boundary can remain the same `AppConfig` type.

As of April 16, 2026, the `latest` pages on docs.rs supported using dependency lines like:

```toml
[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
toml = "1"
```

A very common typed boundary looks like this:

```rust
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct AppConfig {
    app_name: String,
    port: u16,
    debug: bool,
}
```

Reading JSON into that type can look like this:

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

The same struct can be reused for TOML.

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

The important design point is that even when the external format changes, the application can keep using the same internal Rust type. That makes the struct the stable boundary and the file format the replaceable layer.

## Directly Confirmed Results

- Directly confirmed result: the Rust toolchain versions available in the current writing environment were:

```powershell
rustc --version
cargo --version
```

- Observed output:

```text
rustc 1.94.0 (4a4ef493e 2026-03-02)
cargo 1.94.0 (85eff7c80 2026-01-15)
```

- How to read this: the Rust toolchain version is only part of the reproduction context. For Serde examples, the `serde`, `serde_json`, and `toml` crate versions also matter.

- Directly confirmed result: when I combined the JSON and TOML examples into one `main` function in a temporary Cargo project with `serde`, `serde_json`, and `toml` added, the output was:

```powershell
cargo run --quiet
```

- Observed output:

```text
JSON => AppConfig { app_name: "rust-tool", port: 8080, debug: true }
TOML => AppConfig { app_name: "rust-tool", port: 8080, debug: true }
app_name = "rust-tool"
port = 8080
debug = true
```

- How to read this: the key result is that the same `AppConfig` type was produced from both JSON and TOML. Different external formats can still converge on one internal Rust type.

- Limitation of direct reproduction: I reproduced the basic JSON and TOML conversion flow in a temporary Cargo project, but I did not validate extended cases such as nested types, enum tagging, or custom field attributes.

## Interpretation / Opinion

- Key decision at this stage: the most important beginner Serde habit is to define a type boundary first instead of manually manipulating raw JSON strings.
- Decision rule: deserialize into a struct when the fields are reasonably known, and reserve dynamic values such as `serde_json::Value` for data that is truly flexible.
- Interpretation: format-specific parsing crates may change over time, but internal application types tend to live longer, so it is worth stabilizing the struct design early.

## Limits and Exceptions

- This post covers only basic struct conversion and leaves out nested enums, custom field attributes, flattening, renaming rules, and borrowed deserialization.
- Large JSON streams or very strict validation requirements may need different tools and patterns.
- TOML and JSON have different representation rules, so the same struct will not always map equally naturally in every case.
- Dependency versions can change over time, so in a real project it is safer to check the post's verification date together with the latest crate pages.
- Remaining questions after this post include attributes such as rename and flatten, enum tagging, borrowed deserialization, and validation layers. Those belong in a Serde deep dive.

## References

- [Serde overview](https://serde.rs/)
- [Using derive](https://serde.rs/derive.html)
- [Serde crate docs](https://docs.rs/serde/latest/serde/)
- [serde_json crate docs](https://docs.rs/serde_json/latest/serde_json/)
- [toml crate docs](https://docs.rs/toml/latest/toml/)
