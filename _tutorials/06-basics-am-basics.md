---
title: "Artificial mind (AM)"
permalink: /tutorials/basics-am-basics/
excerpt: "The Basics."
last_modified_at: 2018-03-20T15:59:31-04:00
toc: true
---

`The Basics.`

## Definition

The artificial mind is a [**AM{Form}**](/tutorials/basics-am-world-and-form) embedded in the [**AM{World}**](/tutorials/basics-am-world-and-form).

## Definition explanation

For the simplicity of the example, we will use the analogy of two modules:

- **form.js**, as the equivalent of [**AM{Form}**](/tutorials/basics-am-world-and-form)
- **world.js**, as the equivalent of [**AM{World}**](/tutorials/basics-am-world-and-form)

we can say they become the mind on conditions that **world.js**:

- is the only provider of information for **form.js**.
- have the only affecting the module **form.js**.

## Examples

### Example_1

Module **form.js** can use:

```javascript
...
// (1)
const file_data = read_from_file("file.txt");
// (2)
const site_data = read_from_site("https://pioryd.github.io");
...
```

only when the module **world.js** is 100% sure, what exactly **form.js** will receive.

### Example_2

Module **form.js** cannot be runned or modified without the module **world.js** knowledge and consent.
