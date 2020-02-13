---
title: "Observer"
permalink: /tutorials/basics-term-observer/
excerpt: "Each observer create point of view."
last_modified_at: 2019-08-01T21:36:11-04:00
toc: true
---

`Each observer create point of view.`

## Definition

Object that judges according to its own rules and information.  
Anything can be the observer, that is capable to judgment. For example:

- natural person (human)
- program
- function
- object

Amount of observers can be infinite, as well as the justifications and principles that the observer have. Regardless of judgment, the result will always be **correct**.

## Examples

Below examples shows conflicting states of observers to the same source code.

### Example_1

```javascript
// Observer_1 and Observer_2

function fun(enabled) {
  if (enabled) do_something();
}

fun(true);
```

**Observer_1**, who sees the whole function, state that it **does not have** AI, because do not make a choice. He explains it by the fact that the function is called by object who makes the choice.

**Observer_2**, also sees the whole function, state that it **have** AI, because make a choice according to the received data.

### Example_2

```javascript
// Observer_3

// Function body:
if (enabled) do_something();
```

**Observer_3**, who sees only function body, state that it **have** AI, because it make a choice in the instruction "if".

### Example_3

```javascript
// Observer_4

// Part of function body:
do_something();
```

**Observer_4**, who sees only part of function body, state that it **have** AI, because it is a choice according to his rules.
