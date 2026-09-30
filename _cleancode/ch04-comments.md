---
title: "Clean Code Chapter 4: Comments"
chapter: 4
part: "Principles"
collection: cleancode
---

Comments compensate for failure to express ourselves in code. Prefer clearer names and structure over explaining messy code.

## When comments help

- Legal / license headers
- Clarifying intent that code cannot easily say
- Warning of consequences
- TODOs with clear ownership and context
- Public API documentation where the audience is outside the module

## When comments hurt

- Redundant restatements of the obvious
- Misleading or outdated comments
- Mandated noise ("this closes the file")
- Journal / changelog comments (use VCS)
- Commented-out code (delete it; git remembers)
- Position markers and HTML-in-source decoration

If you write a comment, keep it local and maintain it like code.

