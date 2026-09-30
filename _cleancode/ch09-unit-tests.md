---
title: "Clean Code Chapter 9: Unit Tests"
chapter: 9
part: "Principles"
collection: cleancode
---

Tests are what keep clean code clean under change. Without them, every cleanup is a risk.

## FIRST

- **Fast** — slow tests don't get run
- **Independent** — order and shared state shouldn't matter
- **Repeatable** — any environment, same result
- **Self-validating** — pass/fail without manual inspection
- **Timely** — written close to the production code (ideally first)

## Craft

- One concept per test; keep arrange / act / assert obvious
- Readable test names and structure matter as much as production clarity
- Dirty tests are as harmful as dirty production code — they rot and get deleted
- TDD cycle: fail → pass → refactor

Coverage is a lagging indicator; confidence to change is the goal.

