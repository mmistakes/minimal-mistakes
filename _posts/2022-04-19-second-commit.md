---
layout: post
title:  "Day1"
categories: SwiftUI
tag: [iOS, SwiftUI, blog, jekyll]
toc: true
author_prifile: false
sidebar:
    nav: "docs"
---


[**Watch out!** This is my **first coding**.]
{: .notice--danger}

<div class="notice--success">
<h4>I'm learning the skills below!</h4>
<ul>
    <li>Swift</li>
    <li>SwiftUI</li>
    <li>GitHub</li>
</ul>
</div>

# Day 1

![image-20220419150815188](../images/2022-04-19-second-commit/image-20220419150815188.png)

```swift
// we are going to store some data. it could be anyting, names, news, stories etc.. 
// To store som data, we need a variable that we write 'var'. so variable can vary. it can change as program runs. 'var' means 'crate a new variable', it saves a little typing. and we are going to call variable 'greeting'. you can call it anything you want. 

import SwiftUI

var greeting = "Hello, playground"
print(greeting)

    // we can change variable over time

var name = "Ted"
name = "Jeo"
name = "Matt"
print(name)

var playerName = "Roy"
print(playerName)

    // if we don't ever want to change a value, we need to use a 'constant' instead. we write 'let'. 

let managerName = "Michael Scott"
let dogBreed = "Samoyed"
let meaningOfLife = "How many roads must a man wak down?"
print(dogBreed)

    // we can use punctuation, emoji and other characters. 

let filename = "paris.jpg"
print(filename)

let result = "🔥fire"
print(result)


    // we can even use other double quotes inside our string, as long as we're careful to put a backslash before them.
let quote = "Then he tapped a sign saying \"belive\" and waled away"
print(quote)

    // if we want to break line in it's strings, we use three quotes

let movie = """
    A day in
    the life of an
    Apple engineer
    """
print(movie)

    // we can read the length of a string by writing .count after the name of the variable or constant. Swift also counts spacing and new lines

print(movie.count)

    // we don't have to print the length of a string directly if we don't want to. we can assign it to another constant. 
let nameLength = movie.count
print(nameLength)

    // we can make string uppercase by writing .uppercased()

print(movie.uppercased())

    //a piece of helpful sting functionality is 'hasPrefix', which lets us know whether a string starts with some letters of our choosing. This funtionality distinguishes between upper and lower case letters

print(movie.hasPrefix("A day"))
print(movie.hasPrefix("a day"))

    // we also have 'hasSuffix()' which checks whether a string ends with some text of our choosing

print(filename.hasSuffix(".jpg"))

    //Now, we're working with integers wich is numbers, 'int' for short. Making a new interger works just like making a string. 

let score = 10

// intergers can be really big - billions,trillions, quadrillions, auintillions - and they can be really small too. if we were writing that by hand we'd probably write '100,000,000' at which point it's clear that the number is 100 million. Swift has something similar. we can use underscores'_'. Swift doesn't actually care about the underscores
let reallyBig = 100_000_000
print(reallyBig)
let reallySmaill = -100____000___000
print(reallySmaill)

    // we can use arithmetic operators we learned at school. addition, subtraction, multiplication, division.
let lewerScore = score - 2 
let higherScore = score + 10
let doubledScore = score * 2
let squaredScore = score * score
let halvedScore = score / 2
print(score)
print(higherScore)
print(squaredScore)

    // we can use the shorthand operator '+=', which adds a number directly to the interger in question
var counter = 10
counter += 5 // = 'counter = counter + 5'
print(counter)

counter *= 2 // = 'counter = counter * 2'
print(counter)

counter -= 10 // = 'counter = counter - 10'
print(counter)

    //we can use 'isMultiple(of:)' to find out whether it's a multiple of another integer.

let number = 120

print(number.isMultiple(of: 3))
print(120.isMultiple(of: 3))

    //Let's work with decimal numbers now. when we create a floating-point number, Swift considers it to be a Double. Swift considers decimals to be a wholly different type of data to intgers, which means we can't mix them together.
let decimalNumber = 0.1 + 0.2
print(decimalNumber)

let a = 1
let b = 2.0
// let c = a + b  -error
```