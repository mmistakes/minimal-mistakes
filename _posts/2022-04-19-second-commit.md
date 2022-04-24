---
layout: post
title:  "SwiftUI Day1"
categories: SwiftUI
tag: [iOS, blog, jekyll]
toc: true
author_prifile: false
sidebar:
    nav: "docs"
---

# Welcome

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



![image-20220419150815188](../images/2022-04-19-second-commit/image-20220419150815188.png)

# Variables and Constants

```swift
import SwiftUI
```
## Swift gives us two ways of storing data, depending on whether you want the data to change over time. The first options is  Variables.
```swift
var greeting = "Hello, playground"


var name = "Ted"
name = "Joe"
name = "Matt"

print(name)

var playerName = "Roy"
print(playerName)
```



let managerName = "Michael Scott"
let dofBreed = "Samoyed"
let meaningOfLife = "How many roads must a man wak down?"
print(dofBreed)


let quote = "Then he tapped a sign saying \"belive\" and waled away"
print(quote)

let movie = "A day the life Apple"
print(movie)
print(movie.count)

let nameLength = movie.count
print(nameLength)

print(movie.uppercased())

print(movie.hasPrefix("A day"))
print(quote.hasSuffix("away"))

let burns = """
    the best laid schems
    O' mice and men
    Gang aft agley
    """
print(burns)

let score = 10
let reallyBig = -100_000_000
print(reallyBig)

let lewerScore = score - 2 
let higherScore = score + 10
let doubledScore = score * 2
let squaredScore = score * score

var counter = 10
counter += 5
print(counter)

counter *= 2
print(counter)
counter -= 10

let number = 120

print(number.isMultiple(of: 3))
print(120.isMultiple(of: 3))



let decimalNumber = 0.1 + 0.2
print(decimalNumber)

let a = 1
let b = 2.0

var name2 = "Niclas"
var rating = 5.0
rating *= 2
```
