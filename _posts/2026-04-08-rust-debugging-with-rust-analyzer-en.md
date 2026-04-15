---
layout: single
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

When debugging Rust in VS Code, one of the most practical setups is to use `rust-analyzer` together with `CodeLLDB`. This post walks through the basic debugging flow, including breakpoints, variables, the call stack, and argument-based debugging with `launch.json`.

## Verification scope and reproducibility

- As of: April 15, 2026, checked against the current VS Code, rust-analyzer, and CodeLLDB documentation.
- Source grade: only official documentation and the original CodeLLDB repository are used.
- Reproduction environment: Cargo project, VS Code, `rust-analyzer`, `CodeLLDB`, with Windows-style example paths.
- Opinion: this post chooses the `rust-analyzer + CodeLLDB` workflow because it is one of the easiest setups for beginners to reason about step by step.

## What to Know First

The approach in this post assumes you are working with a Cargo project created with `cargo new project-name`. The official VS Code Rust guide describes the debugging workflow around Cargo projects and `rust-analyzer` ([Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)).


For example:

```powershell
cargo new rust-debug-demo
cd rust-debug-demo
code .
```

If you only compile a single file like `rustc hello.rs`, the `rust-analyzer` and `CodeLLDB` workflow described here does not fit as naturally. This guide is much easier to follow with a Cargo project.

## Install rust-analyzer

Install the `rust-analyzer` extension from the VS Code extensions panel. The official VS Code Rust guide recommends installing `rust-analyzer` as the default Rust extension, and the rust-analyzer book is the primary upstream reference for the language server itself ([Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust); [rust-analyzer book](https://rust-analyzer.github.io/book/)).

![rust-analyzer]({{ '/images/rust_02/rust-analyzer.png' | relative_url }})

Direct observation: in the author's local environment, opening a Cargo project in VS Code showed a `Run | Debug` button above `fn main()`.

![Run Debug]({{ '/images/rust_02/run_debug_%EB%B2%84%ED%8A%BC.png' | relative_url }})

Click `Debug` there to enter debug mode right away. The official VS Code Rust guide documents the same flow through the `rust-analyzer` extension, including the `Run | Debug` CodeLens and the `Rust Analyzer: Debug` command ([Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)).

## Install CodeLLDB

To use a full debugger workflow more comfortably, it is a good idea to install the `CodeLLDB` extension as well.
Opinion: this post keeps using `CodeLLDB` even in the Windows example so the walkthrough stays on one debugger stack.

![CodeLLDB install]({{ '/images/rust_02/codeLLDB%EC%84%A4%EC%B9%98.png' | relative_url }})

`CodeLLDB` is an LLDB-based debugger extension commonly used for native languages such as Rust in VS Code. As of April 15, 2026, the official VS Code Rust guide points Windows users to the Microsoft C++ extension first and macOS/Linux users to `CodeLLDB`, while the original CodeLLDB repository is the upstream reference for the extension itself ([Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust); [CodeLLDB repository](https://github.com/vadimcn/codelldb)).

## Open Debug Mode with Ctrl+Shift+D

Open the Run and Debug view from the sidebar, or press `Ctrl+Shift+D` to enter the debugging screen.

If no debug configuration exists yet, you will see a link labeled `create a launch.json file`.

![Create launch.json]({{ '/images/rust_02/create_a_launch_json.file.png' | relative_url }})

Click that link and select `CodeLLDB` from the debugger list.

![Select CodeLLDB]({{ '/images/rust_02/launch_json_codeLLDB.png' | relative_url }})

## What Is launch.json?

`launch.json` is the configuration file that tells VS Code how to start debugging. It defines which debugger to use, which executable to launch, which working directory to use, and what arguments should be passed to the program. The official VS Code debug configuration guide describes `.vscode/launch.json` as the place where debugger configuration, executable path, working directory, and arguments are defined ([Visual Studio Code debug configuration](https://code.visualstudio.com/docs/debugtest/debugging-configuration)).

It is usually stored at:

```text
.vscode/launch.json
```

In practice, this file controls the overall behavior of your debug session.

## Creating launch.json and Example Configuration

On Windows, a simple Rust configuration that directly targets the generated executable can look like this:

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

Each field has a simple role:

- `type`: The debugger type. CodeLLDB uses `lldb`.
- `request`: The debug request mode. A standard launch uses `launch`.
- `name`: The label shown in the VS Code debug configuration list.
- `program`: The executable file to debug.
- `args`: The arguments passed to that executable.
- `cwd`: The working directory for the debug session.

Because this setup points to the executable under `target/debug`, it is convenient to run `cargo build` once before starting the debugger.

## The Most Useful Basic Keys

When you are just starting, these four keys are enough to understand the main flow:

- `F5`: Start or continue execution until the next breakpoint
- `F9`: Toggle a breakpoint on the current line
- `F10`: Step over one line at a time
- `F11`: Step one line at a time, but enter a function if one is called

A simple pattern is to place a breakpoint with `F9`, start with `F5`, and then use `F10` and `F11` to inspect the flow. Those keys follow the default VS Code debugging shortcuts ([Debug code with Visual Studio Code](https://code.visualstudio.com/docs/debugtest/debugging)).

## Setting a Breakpoint

You can click the gutter next to a line or press `F9` to place a breakpoint. When a red dot appears, the breakpoint is set correctly.

![Breakpoint]({{ '/images/rust_02/break_point.png' | relative_url }})

After placing a breakpoint, press `Debug` or `F5`. Execution stops on that line, and you can inspect variables and the call flow from there.

## Checking Variable Values

When execution is paused, you can inspect the current variables in the `VARIABLES` section of the debug panel.

![Variables]({{ '/images/rust_02/%EB%B3%80%EC%88%98%20%ED%98%84%ED%99%A9.png' | relative_url }})

For example, values such as `x = 10`, `y = 5`, and `sum` can be inspected directly there. Depending on the breakpoint location, some values may not have been computed yet, and some entries may appear as `optimized away`, but this panel is still one of the fastest ways to understand the current state.

## Checking the Call Stack

You can inspect the function call flow in the `CALL STACK` section.

![Call Stack]({{ '/images/rust_02/call_stack.png' | relative_url }})

This view shows which function you are currently inside and how execution reached that point. If you use `F11`, you can step into functions and see how the call stack changes as you move deeper into the code.

## Example Code for Checking Arguments

Now let us use `launch.json` to pass command-line arguments and verify them in the program. Put the following code into `src/main.rs`:

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

This program prints the arguments it receives. One important detail is that `args[0]` usually contains the executable path, while the values you place in the `args` array inside `launch.json` appear starting from `args[1]` and `args[2]`.

## How to Pass Arguments with args

In the `launch.json` file, the following section is where arguments are passed:

```json
"args": ["abcd", "efgh"]
```

With this setup, the program receives `abcd` and `efgh` as command-line arguments when you start debugging.

## Verifying the Output

After saving the configuration and starting the debugger again, you can confirm that the arguments were passed correctly in the output.

![Args output]({{ '/images/rust_02/%EC%9D%B8%EC%9E%90%EC%A0%84%EB%8B%AC%20%ED%99%95%EC%9D%B8.png' | relative_url }})

As shown in the example, `args[0]` contains the executable path, while `args[1] = abcd` and `args[2] = efgh` confirm that the `args` setting in `launch.json` was applied correctly.

## Summary

For Rust debugging in VS Code, a practical setup is to use `rust-analyzer` for the Rust development experience and `CodeLLDB` with `launch.json` for the debugger configuration. Once you open the Run and Debug view with `Ctrl+Shift+D`, create a `launch.json` file, and pass the arguments you need through `args`, it becomes much easier to inspect execution flow and test command-line input in one place.

## Sources and references

- Microsoft, [Rust in Visual Studio Code](https://code.visualstudio.com/docs/languages/rust)
- Microsoft, [Debug code with Visual Studio Code](https://code.visualstudio.com/docs/debugtest/debugging)
- Microsoft, [Visual Studio Code debug configuration](https://code.visualstudio.com/docs/debugtest/debugging-configuration)
- rust-analyzer team, [rust-analyzer book](https://rust-analyzer.github.io/book/)
- Vadim Chugunov, [CodeLLDB repository](https://github.com/vadimcn/codelldb)
