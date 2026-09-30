---
title: "Clean Code Chapter 12: Emergence"
chapter: 12
part: "Principles"
collection: cleancode
---

Kent Beck's four rules of simple design, in priority order:

1. **Runs all the tests** — correctness first
2. **Contains no duplication** — DRY as design pressure
3. **Expresses the intent of the programmers** — names, structure, obviousness
4. **Minimizes the number of classes and methods** — no speculative structure

Simple design *emerges* from following these rules while refactoring. You don't need to invent the perfect architecture up front; you need continuous pressure toward clarity.

Duplication is often the best hint that an abstraction is waiting to be born — extract only when the duplication is real, not imagined.

