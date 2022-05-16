---
layout: single
classes: wide
title:  "More JS. JSON.parse()"
categories: JavaScript
tags: [30DaysOfJS, JSON, MoreJS]
sidebar:
    nav: docs
---

# Further Study: reviver function in JSON.parse()

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

The `reviver` funciton is an optional, second parameter in `JSON.parse()`. Its purpose is to **modify the result before returning, acting as a filter function.** All parsed values are passed through this reviver function in key-value pair before being returned.
<br>

```js
JSON.parse(jsonString, function (key, value) {
 	// all key-value pairs in the JSON object are passed here
	
	// return value for the key
	return value;
});
```
If a key-value pair passing through this reviver method causes an error, or the reviver method returns `undefined` for any pair, that key-value pair is deleted from the final parsed JSON object. 
<br>

#### Example 01. An object

```js
let jsonString = '{"1": "A", "2": "B", "3": "D", "4": "C"}';
let parsedJson = JSON.parse(jsonString, function (key, value) {
  if (key == 3) 
    return "C";

  if (key == 4)
    return "D";
  
  return value;
});

console.log(parsedJson);
// {1: 'A', 2: 'B', 3: 'C', 4: 'D'}
```
If I use `===` in the place of `==`, the values in `parsedJson` wouldn't change. I guess it's because `===` also checks if the types of values are the same. Since the key is a string and 3 is a number, it wouldn't exactly match.
<br>

#### Example 02. Objects inside an array

```
let jsonString = '[
  {
    "team": "Ferrari", 
    "drivers": [
      {"name": "Vettel"}, 
      {"name": "Raikkonen"}
    ]
  }
]'
```

```js
let jsonString = '[{"team": "Ferrari", "drivers": [{"name":"Vettel"}, {"name":"Raikkonen"}]}]';
let parsedJson = JSON.parse(jsonString, function(key, value) {
    if(value === "Ferrari")
        return "Scuderia Ferrari";

    if(value === "Raikkonen")
        return "Leclerc";

    return value; 
});

console.log(parsedJson);
// [{"team": "Scuderia Ferrari", "drivers": [{"name": "Vettel"}, {"name": "Leclerc"}]}]
```
From the upper example, I can see that all the key-value pairs all run through the reviver function. It means that I don't have to track down the values.
<br>

#### Example 03. Nested objects

When the JSON is nested, reviver **begins with the most inner properties.** 

```
let jsonString = 
'{
  "one": 1,
  "two": 2, 
  "three": {
    "four": 4, 
    "five": {
      "six": 6
    }
  }
}';
```
```js
let jsonString = '{"one": 1, "two": 2, "three": {"four": 4, "five": {"six": 6}}}';
let parsedJson = JSON.parse(jsonString, function(key, value) {
  console.log(key);
  return value;
});
/*
  one
  two
  four
  six
  five
  three
  ""
*/
```
The last key is always a blank(`" "`).

<br>



[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#using_the_reviver_parameter
[2]: https://usefulangle.com/post/112/json-parse-reviver-function