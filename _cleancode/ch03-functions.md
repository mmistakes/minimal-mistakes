---
title: "Clean Code Chapter 3: Functions"
chapter: 3
part: "Principles"
collection: cleancode
---

Functions should be small, do one thing, and stay at one level of abstraction.

## Shape

- Prefer short functions; extract until each tells a clear story
- One level of abstraction per function — don't mix high-level orchestration with low-level detail
- Switch statements and large `if` chains often want polymorphism or lookup tables
- Prefer few arguments; zero is ideal, three is usually a stretch
- Flag arguments (`boolean doSomething`) usually mean two functions
- Avoid output arguments and hidden side effects
- Separate commands (change state) from queries (return info)
- Prefer exceptions over error codes; handle errors in one place when possible

A function that "does one thing" cannot be usefully split further and still names a coherent unit of work.

