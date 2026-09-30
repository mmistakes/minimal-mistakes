---
title: "Clean Code Chapter 17: Smells and Heuristics"
chapter: 17
part: "Smells and Heuristics"
collection: cleancode
---

A practical catalog of smells and heuristics spanning comments, functions, names, classes, tests, and general code shape — a checklist for reviews and refactors.

## How to use it

- Treat smells as signals, not laws
- Prefer the smallest change that removes the smell
- Cross-check: a name smell often hides a function or class smell
- Keep the list nearby during PRs until the patterns become instinct

Common themes: duplication, opacity, feature envy, long parameter lists, speculative generality, poor encapsulation, and tests that don't say what they mean.

When in doubt: make the next reader faster.

