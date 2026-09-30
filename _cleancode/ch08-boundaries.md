---
title: "Clean Code Chapter 8: Boundaries"
chapter: 8
part: "Principles"
collection: cleancode
---

Code you don't control — libraries, vendors, legacy modules — should meet your code at a clear boundary.

## Techniques

- Wrap third-party APIs in adapters that expose only what you need
- Keep learning tests: small tests that encode how a library behaves, so upgrades don't surprise you
- Don't sprinkle foreign types through the whole codebase; confine them to the boundary
- Prefer depending on interfaces you own when the other side is volatile

Clean boundaries let you swap implementations and isolate breakage when the outside world changes.

