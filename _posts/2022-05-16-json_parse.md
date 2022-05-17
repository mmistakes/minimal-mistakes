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

**Then it is called, with the object containing the property being processed as** `this`, and with the property name as a string, and the property value as arguments. If the `reviver` function returns `undefined` or if it returns no value(e.g. the execution falls off the end of the function), the property is deleted from the object. Otherwise, the property is redefined to be the return value.
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

### + Access to the object being revived

+ [JSON.parse Reviver function: Access to object being revived?][3]

The link is a question at stackflow about the bold part of the upper paragraph. If I call certain keys at some conditionals, the object that is being revived is only the object that is in the same level. The subordinate levels wouldn't be fully logged.

```
let aTestStr = '{
  "prop1": "this is prop 1", 
  "prop2": {
    "prop2A": 25, 
    "prop2B": 13, 
    "prop2C": "This is 2-c"
  }
}';
```

```js
let aTestStr = '{"prop1": "this is prop 1", "prop2": {"prop2A": 25, "prop2B": 13, "prop2C": "This is 2-c"}}';
let aTestObj = JSON.parse(aTestStr, function(key, value) {
  //at this point, 'this' refers to the object being revived
  //E.g., when key == 'prop1', 'this' is an object with prop1 and prop2
  //when key == prop2B, 'this' is an object with prop2A, prop2B and prop2C
    if (key == "prop2B") {
      // the object being revived('this') is an object named 'prop2'
      // add a prop to 'this'
      this.prop2D = 60;
      console.log(this);
    }
});
// {prop2B: 13, prop2C: 'This is 2-c', prop2D: 60}
```
The interesting part was that `this` didn't log all the key-value pairs that I expected. Notice that `prop2A` is missing. I guess it's because `this` is detected after the conditional finds `prop2B`. 
<br>

```js
let aTestStr = '{"prop1": "this is prop 1", "prop2": {"prop2A": 25, "prop2B": 13, "prop2C": "This is 2-c"}}';
let aTestObj = JSON.parse(aTestStr, function(key, value) {
  if (key == "prop2C") {
    this.prop2D = 60;
    this.prop2E = "the last key";
    console.log(Object.keys(this));
  }
});
// (3) ['prop2C', 'prop2D', 'prop2E']


let aTestStr = '{"prop1": "this is prop 1", "prop2": {"prop2A": 25, "prop2B": 13, "prop2C": "This is 2-c"}}';
let aTestObj = JSON.parse(aTestStr, function(key, value) {
  if (key == "prop2A") {
    this.prop2D = 60;
    this.prop2E = "the last key";
    console.log(Object.values(this));
  }
});
// (5) [25, 13, 'This is 2-c', 60, 'the last key']
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
From the upper example, I can see that all the key-value pairs all run through the reviver function. It means that I don't have to track down the properties to modify the values.

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

## More links to read through

+ [Stackoverflow: How to edit a certain value in a reviver function][4]

<br>





[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#using_the_reviver_parameter
[2]: https://usefulangle.com/post/112/json-parse-reviver-function
[3]: https://stackoverflow.com/questions/55688816/json-parse-reviver-function-access-to-object-being-revived
[4]: https://stackoverflow.com/questions/24374186/json-parse-using-reviver-function
[5]: https://stackoverflow.com/questions/208105/how-do-i-remove-a-property-from-a-javascript-object
