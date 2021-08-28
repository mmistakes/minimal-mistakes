---
title: "JavaScript Basics"
excerpt: "Notes that I've taken as I've been learning JavaScript."
tags:
- JavaScript
classes: wide
toc: true
---

I'm learning JavaScript and this is a good place to take some notes as I go. This isn't exhaustive and is just a way for me to pick things up quickly and refer back to. I don't like actually remembering things if I can avoid it. Usually when I write them here I remember them.

I've spent the most time in PowerShell so I have a few comparisons sprinkled in.

You should probably checkout [Mozilla's JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) instead of this and I have linked to it a bunch to save myself time in the future.

As I run into other noteworthy things I'll continue to update this as I keep learning. 🙌👀🙌

## Running JS

### VS Code

Code is my bae and I will probably do most things here. You can run and debug stuff here. Pretty similar experience to other languages.

### HTML file

- Use `.html` file containing a `<Script>` or referring to a `.js` file, more commonly.

### Browser Console

- Use the console on your browser `Ctrl + Shift + I` in Chrome or right-click > inspect. Make sure to actually click the "Console" button...

### NodeJS

- Use [NodeJS](https://nodejs.org/en/). Open up a console, like **PowerShell**, and run `node` to get an interactive experience in yo shell!
  
- Run JavaScript `.js` files by running `node filename.js`
- `npm install <packagename>` installs a package
- `npm install` installs all packages for a nodeJS project including everything in package.json

## NPM - Node Package Manager

Node Package Manager, `npm`, is the package manager for Node JS. Node JS is the way that you can run JavaScript code outside of the browser. NPM comes installed with Node.js so you get both when you get Node.js.

`npm --version` - check your installed version of NPM
`npm init` - create a new project, basically just a `package.json` file.
`npm --install` - installs packaages for project

### NVM - Node Version Manager

Sometimes you need to run multiple versions of Node.js. Node version manager allows you to install different versions of Node.js.

- For Linux and MacOS, you want this one: https://github.com/nvm-sh/nvm.

- For Windows, use: https://github.com/coreybutler/nvm-windows.
## Types

Everything except for objects are primitive types

### Different Types

#### Number

All numbers are double-precision floating-point numbers.

```javascript
> Number.MIN_SAFE_INTEGER
-9007199254740991
> Number.MAX_SAFE_INTEGER
9007199254740991
```

If you need bigger stuff you can use big integers, but I don't know much about that.

You can **convert** strings to numbers using `parseFloat` or `parseInt`.

```javascript
const lilFloat = parseFloat('3.14')
const littlerFloat = parseInt('3')
```

#### Boolean

`true` or `false`
You can flip the value of a Boolean using the below example. `!` stands for not

```javascript
>let confirmation = false
>confirmation = !confirmation // flips the value
true
```

#### Null and Undefined

**Null** is when something is intentionally absent of a value. **Undefined** is when a variable is declared but not initialized. If you want to wipe out a variable you should set it to null, rather than undefined. Developers use `null`, JavaScript uses `undefined`

#### String

Use `toString()` to convert a number back to a string.

#### Symbol

#### Object

### Converting Strings and Numbers

Don't use type conversion and manually convert types.

```javascript
let amount = Number.parseFloat('123.12') // js will parse this string into a float
```

```javascript
let amount = 123
amount = amount.toString() // Hi, toString(). Nice to see you here!
```

#### NaN

`NaN` stands for Not a Number. This means a number couldn't be parsed.

## Strings Continued

### String Literals

Enclosed in single or double quotes. You can escape quotes inside a string that is delimited by the same quote type by using a `\` backslash. 

```javascript
> console.log('escape your \'quotes\'') // each \ escapes the '
escape your 'quotes' 
```

### Template Literals

⚠****YOU MUST USE BACKTICKS, NOT SINGLE QUOTES****⚠ fool me once...

These are just like PowerShell sub-expressions `"$(Do-Something)"`. You can put expressions in them. 

```javascript
> let message = 'I\'m not yelling you\'re yelling'
> let angryMessage = `${message.toUpperCase()}` // BACKTICKS!
> console.log(angryMessage)
I'M NOT YELLING YOU'RE YELLING
```

### Escape Sequences

If you need to keep your files in ASCII you can use `\u{code point}` notations

|Sequence| Name | Unicode |
|---|---|---|
| \b  |Backspace   |\u{0008}|
|\t   |  Tab |\u{0009}|
|\n   | Linefeed  |\u{000A}|
|\r |  Carriage return |\u{000D}|
|\f   | Form feed  |  \u{000C}|
| \v  | Vertical Tab  |  \u{000B} |
|  \' | Single Quote  |  \u{0027} |
|  \" |  Double Quote |  \u{0022} |
|  \\\ | Backslash  |  \u{005C} |
| \newline | continue. see example ⬇ | none

```javascript
> console.log('hell\
... o friends') // this is kinda like a PowerShell backtick
hello friends
```

## Variables

### Use `typeof` to determine the types

```javascript
> typeof 'bob'
'string'
```

### Variable Declarations

#### `let`

This is for variables that can change
`let message = 'big ole string'`

#### `const`

This is for variables that don't change.
`const price = 69.99`

#### Avoid `var`

It's legacy and screws things up. It used to be the only way of doing things, but now there are better alternatives. see above...

#### Declare Multiple Variables

Use commas to separate multiple variables.

```javascript
const companyName = 'Big and Broken Bicycles',
      pi = 3.14159
```

## Odds and Ends

### Line Termination

You can terminate lines with `;`, but you don't have to. I am going to avoid it for now, but I believe this is something that VS Code will just take care of automatically once a setting change is made. This can likely be enforceable via a `.vscode` folder that is part of a repo/project.

## Comments

- Single Line = `//commment away`

- Multi-Line = `/* comment many lines /*`

## Operators

### Arithmetic Operators

- `+-*/` are the usual suspects

- `%` is the modulus or remainder operator and is used to get the remainder

- `**` is used to raise to a power `2 ** 10`

- `+=` assigns and adds. EX: ``counter += 10``
  
- `++` can come before or after a variable. If it comes before, then the value is added before the code is ran. If it comes after, the code is ran and then the value is added, which can bee seen below. These are called **pre-increment** and **post-increment**.
- `--` 

```javascript
> let price = 20
> console.log(price++) // executes the line and THEN adds 1
20
> price
21
```

### Comparison Operators

- `===` is equals
- `!==` means not equal to
- `>`,`<`,`>=`,`<=`

## Objects

JavaScript objects are just name/value pairs. `name : value` make sure to use a `:` to separate them, rather than an `=` like in PowerShell. You can access object properties using dot notation `object.property`.

```javascript
> let person = {
       firstName : 'Andrew',
       lastName : 'Pla'
    }
> person.firstName
'Andrew'
```

### Add/Modify Property

```javascript
person.middleName = 'Michael'
```

### Remove Property

```javascript
delete person.middleName
```

### Access Properties

```javascript
>person['middlename']
'Andrew'
```

Accessing non-existent properties returns `undefined`

### Object Methods

```javascript
let person = {
    name: 'Barbara',
    age: 42,
    referral: false,
    deservesHappiness: function() {
        if(this.age > (-1) ) {
            message = `${this.name} deserves happiness`
            console.log(message)
        }
    }
}
```

### Passing Objects to Functions

You can modify object properties by "passing by reference"

```javascript
function incrementAge(person){
    person.age++
}

incrememntAge ( person )
// this actually increments the age. This would work if it were a string being passed rather than an object 
```

### Using [Symbols](https://developer.mozilla.org/en-US/docs/Glossary/Symbol)

Symbols are special in that they can be used inside an object to hide information.

```javascript
// Here are two symbols with the same description:
let Sym1 = Symbol("Sym")
let Sym2 = Symbol("Sym")

console.log(Sym1 === Sym2) // returns "false"
// Symbols are guaranteed to be unique.
// Even if we create many symbols with the same description,
// they are different values.
```

### Passing Objects to Functions

### [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

Arrays are an object whose property names are the strings `'0','1','2'` and so on. *Numbers can't be property names*
You can access using bracket notation or dot notation

```javascript
>const numbers = [1, 2 ,3, 'many']
>numbers[1] // array index up in this
2
```

## Flow Control

### if else

```javascript
if (5 === 6) { console.log('No')}
else if (5 === 5) { console.log('Yes')}
```

### Truthy and Falsy

| falsy |  truthy |
|---|---|
|  false | Everything NOT Falsy   |
|  0 | true  |
| "" or '' - empty strings  |   0.5|
| null  | "0"  |
| undefined  |  |
|  NaN |    |

### === and ==

`===` stands for equals when doing comparisions. `==` tries to convert types. Similarly, `!=` and `!==` will try to convert the types or leave them as is before comparing, respectfully. 

### Ternary Operator

Ternary works with 3 different values. It's a shortcut for an `if else` statement

```javascript
// condition ? true-statement : false-statement
let message = (5 === 5) ? 'match' : 'not a match'
```

### Block Scope

Variables declared in a code block, `{}`, with `let` or `const` are only accessible in the code block. They are block scoped. You can use a `return` statement to output a value from a code block.

### [Loops](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration)

#### [For](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)

```javascript
for (let i = 0; i < 3; i++){
    console.log(i);
}
// 0 1 2
```

#### [While](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)

```javascript
let count = 1
while (count < 5){
    console.log(count)
    count++
}
//
```

#### [Do... While](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)

Use this when you want the body of the code to run once

```javascript
let count = 1
do {
    console.log(count)
    count++
} while (count < 5)
```

## [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

It's just a block of code that is named. You can call it by it's name, "SAY MY NAME."

### Function Declaration

```javascript
>function doSomething(){
    // body of function
    console.log('we logged to tha console!')
}
>doSomething()
we logged to tha console!
```

### Function Expression

```javascript
let fn = function boringFunction () { // name the function for stack trace
// body of function
}
fn() //calls the function
```

### Passing Information to Functions

```javascript
let myFunction = function myFunction (first, second) {
    console.log(first)
    console.log(second)
}
myFunction()
```

### Return Function Values

Just use `return` to output stuff. If you don't output anything it will implicitly output `undefined`.

### Function Scope

Functions have their own scope. Parameters and local variables to that function only exist within that function. They have access to the entire outer scope, however.

### Strict Mode

Add `use-strict` to the top of `.js` files. This will make you declare your variables. This isn't required for modules and classes.

### Hoisting

You can't access variables before you declare them. You CAN access functions before you declare them. This is called **hoisting**. The actual mechanism behind hoisting is that the JavaScript files gets executed after two passes. In the first pass, the JS engine will know there's a function. In the second pass it will actually execute the code and it already knows about the function.

### Functions to Modify WebPages

You can interact with the DOM

```javascript
function showMessage(message) {
    // grabs 
    document.getElementById('message').textContent = message
}
```

The above example would modify the following part of an `.html` file. You can tell because it has the id of message. yay us!

```html
<h1 id="message" class="col-sm-12">Just Do It</h1>
```

## [Global Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)

Date, math, string, number, document are all there. Look 'em up if you need 'em. I'll probably add some date examples as time goes on.

## [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)

The `document` is an awesome object for a web document. This is the object that we use to modify a website. It has some cool methods. There are a bunch of different DOM interfaces.

### Styling DOM Elements

`HTMLElement` is a big object. Style is a property that lets us overwrite css values. 

```javascript
const header = document.getElementByID('message')

header.style.color = 'blue'
```

If you are trying to access an element with a `-` in the name you can just use camelCase instead and it works!

```javascript
// the property is actually font-weight
header.style.fontWeight
```

### Detecting Button Clicks

You can use `button.addEventListener`
[https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button]

```javascript
// this assumes that you have an anchor tag with an id of click-me
const button = document.getElementById('click-me')

button.addEventListener('click', function () {
    console.log('THE USER CLICKED, WE SHOULD DO SOMETHIN')
})
```

### Showing and Hiding DOM Elements


```html

<a id="see-review" class="btn btn-default">See Review</a>



<div id="review" class="container d-none">
    <h4>Review Title...</h3>
    <p>Review text...</p>
</div>
```

```javascript

```