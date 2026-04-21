---
layout: single
title: "Rust 11. File I/O and Command-Line Input"
description: "Rust guide to file and CLI input with std::fs::read_to_string, write, std::env::args, and Result."
date: 2026-04-18 09:00:00 +0900
lang: en
translation_key: rust-file-io-and-cli-input
section: development
topic_key: rust
categories: Rust
tags: [rust, file-io, cli, std-fs, env-args]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/rust/file-io-and-command-line-input/
---

## Summary

Once you move from Rust syntax exercises into real tools, you eventually need to read files, accept arguments, and handle errors. Understanding `std::env::args`, `std::fs::read_to_string`, `std::fs::write`, and `Result` as one flow makes small CLI programs much easier to build.

This post focuses on the simplest pattern: accept a file path from the command line, read the file, process the text, and print or save a summary. The practical beginner approach is to read arguments in `main`, use the standard library for file access, keep the core calculation in a separate function, and propagate failures upward with `Result` and `?`.

## Document Information

- Written on: 2026-04-15
- Verification date: 2026-04-16
- Document type: tutorial
- Test environment: Windows 11 Pro, Windows PowerShell, Cargo CLI examples
- Test version: rustc 1.94.0, cargo 1.94.0
- Source grade: only official documentation is used.
- Note: this post covers only the basic pattern for small UTF-8 text CLI tools and leaves out large-file streaming and advanced argument parsers.

## Problem Definition

It is hard to feel that you have really learned Rust if every example ends at syntax. Real beginner tools usually need a flow like this:

- accept a path or option from the command line
- read a file
- process the contents
- return the result to the terminal or another file

This post stays with the most basic text-file workflow. Large-file streaming, binary data, and advanced argument parsing libraries are intentionally left out.

How to read this post: separate code that touches the outside world from code that only calculates. Reading arguments and files can fail, but a function that counts lines and words should be easy to test with the same input string every time.

## Verified Facts

- According to the standard library docs, `std::env::args` returns an iterator over the command-line arguments of the current process, and the first item is typically the program path.
  Evidence: [std::env::args](https://doc.rust-lang.org/std/env/fn.args.html)
  Meaning: the first file path from the user is usually not `args[0]`; it is the next argument, which is why the example uses `nth(1)`.
- According to the standard library docs, `std::fs::read_to_string` reads a whole file into a `String`, and non-UTF-8 data can cause an error.
  Evidence: [std::fs::read_to_string](https://doc.rust-lang.org/std/fs/fn.read_to_string.html)
  Meaning: this API is simple for small UTF-8 text files, but it also means the whole file is loaded into memory and decoded as UTF-8.
- According to the standard library docs, `std::fs::write` writes a byte sequence to a file, creating it if needed and replacing the full contents if it already exists.
  Evidence: [std::fs::write](https://doc.rust-lang.org/std/fs/fn.write.html)
  Meaning: `write` should be read as overwrite behavior, not append behavior.
- According to the official Rust Book, `Result` and the `?` operator form the basic pattern for propagating recoverable errors to the caller.
  Evidence: [Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)
  Meaning: instead of crashing through `unwrap`, the example lets missing files or invalid input travel through the function's return type.

One of the smallest useful examples is a CLI that counts lines and words in a text file.

```rust
use std::{env, error::Error, fs, io};

fn count_lines_and_words(text: &str) -> (usize, usize) {
    let lines = text.lines().count();
    let words = text.split_whitespace().count();
    (lines, words)
}

fn main() -> Result<(), Box<dyn Error>> {
    let path = env::args().nth(1).ok_or_else(|| {
        io::Error::new(io::ErrorKind::InvalidInput, "usage: cargo run -- <file-path>")
    })?;

    let contents = fs::read_to_string(&path)?;
    let (lines, words) = count_lines_and_words(&contents);

    let summary = format!("file = {}\nlines = {}\nwords = {}\n", path, lines, words);

    println!("{}", summary);
    fs::write("summary.txt", &summary)?;

    Ok(())
}
```

The key reading order for that code is:

1. Use `env::args().nth(1)` to get the first real argument.
2. If it does not exist, create an `io::Error` and return it through `Result`.
3. Read the whole file with `fs::read_to_string`.
4. Keep the core calculation in a small function like `count_lines_and_words`.
5. Let `main` handle output and saving.

That structure matters because it connects naturally to testing. Once the actual text-processing logic is separated from file I/O, it can be tested without creating files at all.

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

- How to read this: these are the tool versions used for the CLI example. Path syntax, shell behavior, and error messages can vary across environments.

- Directly confirmed result: when I placed the following `sample.txt` next to the example and ran the program, the result was:

```text
Rust makes tools practical.
Rust makes testing easier.
```

```powershell
cargo run --quiet -- sample.txt
```

- Observed output:

```text
file = sample.txt
lines = 2
words = 8
```

- How to read this: in `cargo run --quiet -- sample.txt`, the value after the second `--` is passed to the program. The output confirms that `main` received the path, read the file, and called the text-counting function.

- Directly confirmed result: the generated `summary.txt` contained:

```text
file = sample.txt
lines = 2
words = 8
```

- How to read this: the screen output and file output match because the same `summary` string is sent to both places. A real tool may choose to separate terminal messages from saved output format.

- Limitation of direct reproduction: I reproduced the flow with a sample file in a temporary Cargo project, but I did not validate larger files, non-UTF-8 input, or additional error paths.

## Interpretation / Opinion

- Key decision at this stage: the first important CLI skill is not a powerful parser library, but clean input/output boundaries.
- Decision rule: keep file reading, argument handling, and user-facing errors in `main`, while moving text processing into separate functions.
- Interpretation: for small UTF-8 text files, `read_to_string` is the simplest place to start. Going too early into buffering and streaming can hide the larger structure beginners need to learn first.

## Limits and Exceptions

- `std::env::args` has Unicode-related limitations, so `args_os` may be more appropriate when non-Unicode input matters.
- `read_to_string` loads the whole file into memory, which may not fit very large files or binary data.
- `write` replaces the existing contents, so append-style output needs a different API.
- Real CLI tools may need crates like `clap`, `BufRead`, and more specific error types, but this post intentionally stays with the simplest standard-library pattern.
- Remaining questions after this post include large-file streaming, binary file handling, CLI option parsing, and error-message UX. Those require separate design decisions for real tools.

## References

- [std::env::args](https://doc.rust-lang.org/std/env/fn.args.html)
- [std::fs::read_to_string](https://doc.rust-lang.org/std/fs/fn.read_to_string.html)
- [std::fs::write](https://doc.rust-lang.org/std/fs/fn.write.html)
- [Recoverable Errors with Result](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html)
- [Accepting Command Line Arguments](https://doc.rust-lang.org/book/ch12-01-accepting-command-line-arguments.html)
