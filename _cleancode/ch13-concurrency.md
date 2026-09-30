---
title: "Clean Code Chapter 13: Concurrency"
chapter: 13
part: "Principles"
collection: cleancode
---

Concurrency is a design concern of its own. Mixing it into ordinary business logic is a common source of subtle bugs.

## Principles

- Keep concurrent code separate and minimal
- Know your shared data; prefer immutability and isolation
- Limit the scope of synchronized/locked regions
- Understand the execution model (threads, processes, actors, event loops)
- Take copies of data when crossing boundaries if it simplifies reasoning
- Test concurrent code under load and with stress strategies that shake out races

Correct single-threaded design first; then introduce concurrency deliberately, with clear ownership of shared state.

