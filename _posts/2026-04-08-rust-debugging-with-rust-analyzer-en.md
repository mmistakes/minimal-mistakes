---
layout: single
description: "Practical VS Code guide to debugging Rust projects with rust-analyzer and CodeLLDB."
title: "Rust 02. Debugging with rust-analyzer and CodeLLDB"
lang: en
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
permalink: /en/rust/debugging-with-rust-analyzer-and-codelldb/
---

## Summary

When you debug Rust in VS Code, one of the easiest stacks to understand is `rust-analyzer` together with `CodeLLDB`. This post focuses on the most common beginner path inside a Cargo project: entering debug mode, creating `launch.json`, setting breakpoints, inspecting variables and the call stack, and passing command-line arguments.

The practical takeaway is: create a Cargo project first, install `rust-analyzer`, add `CodeLLDB`, and use `launch.json` to make the debug conditions reproducible.

## Document Information

- Written on: 2026-04-08
- Verification date: 2026-04-15
- Document type: tutorial
- Test environment: Cargo project, VS Code, `rust-analyzer`, `CodeLLDB`, Windows-style example paths
- Test version: VS Code, `rust-analyzer`, and `CodeLLDB` versions not fixed
- Source quality: only official documentation and the upstream repository are used.
- Note: this post intentionally stays with the `rust-analyzer + CodeLLDB` path because it is one of the easiest debugger stacks for beginners to follow consistently.

## Problem Definition

At the beginning, Rust debugging in VS Code usually feels unclear in four places.

- It is not obvious whether debugging should be explained around a single file or a Cargo project.
- The roles of `rust-analyzer` and `CodeLLDB` are easy to mix up.
- `launch.json` often feels abstract until it is tied to a real executable path and arguments.
- Breakpoints, variables, the call stack, and argument passing do not always feel like one connected workflow.

This post only covers the basic Cargo-project path needed to reduce that confusion. It does not cover WSL, remote containers, multiple binaries, test debugging, or advanced LLDB settings.

How to read this post: separate the layer that helps the editor understand code from the layer that actually stops and inspects a running program. `rust-analyzer` helps with analysis and debug entry points. `CodeLLDB` and `launch.json` define the executable, working directory, and arguments for a reproducible debug session.

## Verified Facts

- The official VS Code Rust guide explains the workflow around Cargo projects and `rust-analyzer`.
  Evidence: [Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)
  Meaning: opening a Cargo project gives VS Code and `rust-analyzer` enough structure to connect editor features with the Rust build flow.
- The official VS Code debug configuration guide explains that `.vscode/launch.json` is where debugger type, executable path, working directory, and arguments are defined.
  Evidence: [Visual Studio Code debug configuration](https://code.visualstudio.com/docs/debugtest/debugging-configuration)
  Meaning: `launch.json` is not just a button configuration file. It stores the conditions needed to reproduce a debug run.
- The official VS Code debugging guide documents the standard debug keys such as `F5`, `F9`, `F10`, and `F11`.
  Evidence: [Debug code with Visual Studio Code](https://code.visualstudio.com/docs/debugtest/debugging)
  Meaning: at the beginner stage, you do not need every debugger feature. Start with break, continue, step over, and step into.
- `rust-analyzer` is the main editing and language-analysis layer, while `CodeLLDB` is an LLDB-based debugger extension.
  Evidence: [rust-analyzer book](https://rust-analyzer.github.io/book/), [CodeLLDB repository](https://github.com/vadimcn/codelldb)
  Meaning: if code lenses or diagnostics are missing, inspect `rust-analyzer` first. If breakpoints or launch behavior fail, inspect `CodeLLDB` and the debug configuration first.

## Directly Confirmed Results

### 1. A Cargo project was the cleanest debugging baseline

- Direct result: the flow below matched the debugger setup much better than a single-file example.

```powershell
cargo new rust-debug-demo
cd rust-debug-demo
code .
```

- How to read this: the goal is to let VS Code recognize the Cargo project root. A single-file flow such as `rustc hello.rs` worked for compilation, but it was a poor fit for the `rust-analyzer + CodeLLDB` walkthrough used in this post.

### 2. Installing `rust-analyzer` made debug entry much easier

- Direct result: after opening a Cargo project in VS Code and installing `rust-analyzer`, a `Run | Debug` button appeared above `fn main()`.

![rust-analyzer]({{ '/images/rust_02/rust-analyzer.png' | relative_url }})
![Run Debug]({{ '/images/rust_02/run_debug_%EB%B2%84%ED%8A%BC.png' | relative_url }})

- Direct result: that button, or the `Rust Analyzer: Debug` command, was enough to enter the first debug session.

- How to read this: seeing `Run | Debug` means the editor has connected the current function to the Cargo project. If it does not appear, check that the project root is open and that `rust-analyzer` is running.

### 3. `CodeLLDB` and `launch.json` fixed the execution conditions

- Direct result: in the Run and Debug view, selecting `create a launch.json file` and then choosing `CodeLLDB` created the basic debug configuration.

![CodeLLDB install]({{ '/images/rust_02/codeLLDB%EC%84%A4%EC%B9%98.png' | relative_url }})
![Create launch.json]({{ '/images/rust_02/create_a_launch_json.file.png' | relative_url }})
![Select CodeLLDB]({{ '/images/rust_02/launch_json_codeLLDB.png' | relative_url }})

- Direct result: the simplest Windows example looked like this.

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

- It was easiest to use after building once with:

```powershell
cargo build
```

- How to read this: `program` is the executable path, `args` are the values passed to the program, and `cwd` is the working directory. When a debug session fails, these three fields are the first things to inspect.

### 4. Breakpoints, variables, and the call stack were easiest to learn in this order

- Direct result: the four keys below were enough to understand the basic flow.

1. `F9`: set a breakpoint
2. `F5`: run or continue
3. `F10`: step over
4. `F11`: step into

- Direct result: once a breakpoint was hit, the variables panel and call stack immediately made the current state easier to read.

![Breakpoint]({{ '/images/rust_02/break_point.png' | relative_url }})
![Variables]({{ '/images/rust_02/%EB%B3%80%EC%88%98%20%ED%98%84%ED%99%A9.png' | relative_url }})
![Call Stack]({{ '/images/rust_02/call_stack.png' | relative_url }})

### 5. Argument-based debugging was reproducible through `args`

- Direct result: putting the code below into `src/main.rs` and configuring `args` in `launch.json` made it easy to verify how command-line arguments entered the program.

```rust
fn main() {
    let args: Vec<String> = std::env::args().collect();

    if args.len() > 0 {
        println!("args[0] = {}", args[0]);
    }

    if args.len() > 1 {
        println!("args[1] = {}", args[1]);
    } else {
        println!("args[1] is missing.");
    }

    if args.len() > 2 {
        println!("args[2] = {}", args[2]);
    } else {
        println!("args[2] is missing.");
    }
}
```

- The `launch.json` section looked like this.

```json
"args": ["abcd", "efgh"]
```

- Observed result:

```text
args[0] = <executable path>
args[1] = abcd
args[2] = efgh
```

- How to read this: `args[0]` is not the first option you typed. It usually represents the executable path. The values from `launch.json` appeared starting at `args[1]` and `args[2]`.

## Interpretation / Opinion

- Key decision at this stage: for beginners, it is easier to learn one debugger stack consistently than to mix several debugger extensions at once. `rust-analyzer + CodeLLDB` is a practical pair for that.
- Decision rule: if the target is still a single file, first move it into a Cargo project; if the same debug setup will be repeated, pin it in `launch.json`.
- Interpretation: `launch.json` is not just an option file. It is the reproducibility layer that pins down which executable, working directory, and arguments are used during a debug session.

## Limits and Exceptions

- This post is written for local Windows VS Code usage. It does not cover macOS, Linux, WSL, Remote SSH, or Dev Container setups.
- Button placement, menu labels, and onboarding text can vary across VS Code, `rust-analyzer`, and `CodeLLDB` versions.
- The official VS Code Rust guide sometimes points Windows users to the Microsoft C++ extension first. This post stays with `CodeLLDB` to keep the walkthrough on one debugger stack.
- Test debugging, attach mode, multiple binaries, and larger workspace setups are outside the scope of this post.
- Remaining questions after this post include test debugging, attach debugging, and remote-environment debugging. Those need separate treatment because the target process and debugger connection change.

## References

- [Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)
- [Debug code with Visual Studio Code](https://code.visualstudio.com/docs/debugtest/debugging)
- [Visual Studio Code debug configuration](https://code.visualstudio.com/docs/debugtest/debugging-configuration)
- [rust-analyzer book](https://rust-analyzer.github.io/book/)
- [CodeLLDB repository](https://github.com/vadimcn/codelldb)
