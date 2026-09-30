---
title: "Clean Code Chapter 7: Error Handling"
chapter: 7
part: "Principles"
collection: cleancode
---

Error handling is important enough to deserve its own attention — and important enough not to clutter business logic.

## Practices

- Prefer exceptions over return codes and error flags scattered through call sites
- Write `try` / `catch` / `finally` first when sketching a block that can fail
- Provide context in exceptions: what failed, with which inputs, why it matters
- Define exception classes by how callers need to handle them, not by every possible thrower
- Don't return `null`; don't pass `null` when you can avoid it — it pushes crashes downstream
- Wrap third-party exceptions at boundaries so your code depends on your types

Separate the happy path from the failure path so each stays readable.

