---
title: "Clean Code Chapter 10: Classes"
chapter: 10
part: "Principles"
collection: cleancode
---

Classes should be small and focused on a single responsibility (SRP).

## Guidelines

- Few instance variables; high cohesion (methods use the fields they share)
- If a class has many reasons to change, split it
- Organize for change: isolate what varies
- Prefer open for extension, closed for modification where it earns its keep
- Hide internals; expose a small, intention-revealing interface

Getting to green first is fine. Then refactor toward SRP and clear boundaries before the class grows roots everywhere.

