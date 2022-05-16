---
layout: single
classes: wide
title:  "More JS. JSON.parse()"
categories: JavaScript
tags: [30DaysOfJS, JSON, MoreJS]
sidebar:
    nav: docs
---

<br>

# Further Study: How to use the reviver function in JSON.parse()

> While solving the exercises of Day 16, I couldn't understand the concept of `reviver` parameter of `JSON.parse()`. In this page, let's get the point of using the function and look through some examples.
<br>

## 1. Understanding the concept
+ [MDN Doument: Using the reviver parameter][1]

If a `reviver` is specified, the value computed by parsing is transformed before being returned. The computed value and all its properties(from properties to their values) are individually run through the `reviver`.
<br>

Then it is called, with the object containing the property being processed as `this`, and with the property name as a string, and the property value as arguments. If the `reviver` function returns `undefined` or if it returns no value(e.g. the execution falls off the end of the function), the property is deleted from the object. Otherwise, the property is redefined to be the return value.
<br>

If the `reviver` only transforms some values and not others, be sure to return all the untransformed values as it is. Otherwise they will be deleted from the resulting object.

```js
JSON.parse('{"p": 5}', (key, value) =>
  typeof value === 'number'
    // for number data type
    ? value * 2
    // for data types except number
    : value
);  // {p: 10}


// the value that isn't a number is deleted before the output
JSON.parse('{"p": 5, "q": "text"}', (key, value) => {
  if (typeof value === 'number') 
    console.log(value * 2);
  }
);  // 10
```

<br>

## 2. Examples of JSON.parse() with reviver function

+ [Using the Reviver Function in JSON.parse][2]





<br>

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#using_the_reviver_parameter
[2]: https://usefulangle.com/post/112/json-parse-reviver-function