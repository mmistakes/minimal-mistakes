---
title: "Clean Code Chapter 2: Meaningful Names"
chapter: 2
part: "Principles"
collection: cleancode
---

Names are the primary documentation of code. A good name reveals why it exists, what it does, and how it is used.

## Rules of thumb

- Use intention-revealing names (`elapsedTimeInDays`, not `d`)
- Avoid disinformation and noise words (`list`, `info`, `data`, `manager` when they add nothing)
- Make names pronounceable and searchable
- Avoid encodings (Hungarian notation, member prefixes) in modern codebases
- Class names should be nouns or noun phrases; method names verbs or verb phrases
- Prefer one word per concept; don't mix `fetch`/`retrieve`/`get` for the same idea
- Use domain vocabulary where it clarifies; avoid cute or opaque puns

If you need a comment to explain a name, rename instead.

