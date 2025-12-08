---
title: "Post with Flowchart"
---

## My Sample Diagram

Here is a simple flowchart:

```mermaid
graph TD;
    A[Start] --> B(Process Input);
    B --> C{Check Status?};
    C -- Yes --> D[Finish];
    C -- No --> B;