---
title: "Clean Code Chapter 6: Objects and Data Structures"
chapter: 6
part: "Principles"
collection: cleancode
---

Objects hide data behind abstractions and expose behavior. Data structures expose data and have little meaningful behavior.

## The distinction

- **Object-oriented style:** easy to add new types without changing existing functions; harder to add new functions across all types
- **Procedural / data-structure style:** easy to add new functions over existing structures; harder to add new structures without touching those functions

Hybrids that expose internals *and* claim to be objects (feature envy, half-encapsulation) are usually the worst of both worlds.

## Law of Demeter

A method should talk to its own object, its parameters, objects it creates, and its direct components — not reach through a train of getters (`a.getB().getC().doThing()`). Train wrecks signal leaked structure.

Prefer telling an object to do work over asking it for data and doing the work yourself.

