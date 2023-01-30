---
layout: single
title: "Using Math Functions in JavaScript to create Random Digit Numbers"
categories: JavaScript
tag: JavaScript
author_profile: false
---
## How to create random 6 digit numbers using math functions in JavaScript

Today I learned how to create a random 6-digit number in JavaScript using math function.
It was fairly simple once I understood the elements that are used to make the number.

### My code for today

```javascript
Math.floor(Math.random() * 1000000)
// 688870
String (Math.floor(Math.random() * 1000000))
// '374871'
String (Math.floor(Math.random() * 1000000)).padStart(6,"0")
// '007196'
```
I generated a random number with ```Math.random()``` that's less than 1,000,000. And rounded down the number using ```Math.floor()```
And then I made the number to be a string by ```String()``` and then added the "0" to the string if the number is less than 6-digits using ```padStart(6,"0")```
