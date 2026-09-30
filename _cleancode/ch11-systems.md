---
title: "Clean Code Chapter 11: Systems"
chapter: 11
part: "Principles"
collection: cleancode
---

At system scale, cleanliness is about separation of concerns: how the whole is constructed, wired, and evolved.

## Construction vs use

- Separate building the object graph from running business logic
- Use dependency injection / factories / modular composition so startup wiring stays explicit
- Don't let "architecture" become a dumping ground for unclear dependencies

## Growth

- Systems should stay understandable as they scale
- Cross-cutting concerns (logging, transactions, security) belong in clear mechanisms, not copy-paste
- Optimize for clarity and testability first; premature infrastructure is still premature

A clean system is one a new engineer can navigate without tribal knowledge.

