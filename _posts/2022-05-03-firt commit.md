---
layout: post
title:  "Day3"
categories: SwiftUI
tag: [iOS, SwiftUI, blog, jekyll]
toc: true
toc_label: "Table of Contents"
toc_icon: "cog"
author_prifile: true
sidebar:
    nav: "docs"
---


# Day3

# Arrays
Rather than hold just one data, Array can hold zero, 1, 2, 50 million, or even more strings, Int, Double.

```swift
import SwiftUI

var beatles = ["John", "Paul", "george", "Ringo"] //Array of strings
let numbers = [4, 8, 15, 16 ,23 ,42] //Array of integers
var temperatures = [25.3, 29.2, 26.4] //Array of decimals
```

Swift counts an item's index from zero rather than one. beatles[0] is the first element, and beatles[1] is the second element. So, we can read some values out from our arrays. 
```swift
print(beatles[0])
print(numbers[1])
print(temperatures[2])
```

If your array is variable, you can modify it after creating. we can use 'append()' to add new items. you can add items more than once. 
```swift
beatles.append("Joseph")
beatles.append("Allen")
beatles.append("Adrian")

print(beatles[4]) //result: Joseph
```

Arrays only ever contains one type of Data at a time. this code is not Allowed. 
```swift
//temperatures.append("Chris")
```

Swift doesn't let us mix two different types of data together, so this kind of code isn't allowed
```swift
//let 1beatle = beatles[0]
//let 1number = numbers[0]
//let notAllowed = 1beatle + 1number
```

when we want to start with an empty array, we can add items to it one by one. 
```swift
var scores = Array<Int>()
scores.append(15)
scores.append(30)
scores.append(40)

print(scores[0])
```

Rather than writing 'Array<Int>()', we can instead write '[Int]()'
```swift
var scores1 = [Int]()
scores1.append(15)
scores1.append(30)
scores1.append(40)

print(scores1[1])
```


Swift must know what type of data an array is storing. So, if we provide some initial values, Swift can figure it out for itself. 

```swift
var scores2 = [15]
scores2.append(30)
scores2.append(40)

print(scores2[2])
```


we can use '.count' to read how many items are in an array. 
```swift
print(scores2.count)
```


we can remove items from an array by using either 'remove(at: _)' or 'removeAll()'
```swift
var characters = ["Lana", "Pam", "Ray", "Sterling"]
print(characters.count)
print(characters[1])

characters.remove(at: 1)
print(characters[1])
print(characters.count)

characters.removeAll()
print(characters.count)
```


we can check whether an array contains a particular item by using 'contains()'
```swift
let boundMovies = ["Casino Royal", "Spectre", "No time to die"]
print(boundMovies.contains("Frozen")) //false
```


we can sort an array using 'sorted()'. That returns a new array with its items sorted in ascending order, which means alphabetically for strings but numerically for numbers. But the original array remains unchanged. 
```swift
let cities = ["London", "Tokyo", "Rome", "Melbourne", "Z--", "A--"]
print(cities.sorted()) //alphabetically ascending order
```



we can reverse an array by calling 'reversed()' on it. it doesn't actually do the work of rearranging all the items, but instead just remembers to itself that we want the items to be reversed.
```swift
let presidents = ["Bush", "Obama", "A--", "Z--", "Biden"]
print(presidents.sorted())

let reversedPresidents = presidents.reversed()
print(reversedPresidents)
```



# How to store and find data in Dictionaries
## Dictionaries don't store items according to their position like arrays do, nut insetad let us decide where items should be stored. when we wanna print from a dictionary, we can provide a default value to use if the key doesn't exist. 
```swift
let employee = [
    "name": "Taylor swift",
    "job": "singer",
    "location": "USA"]
print(employee["name", default: "Unknown"])
print(employee["manager", default: "Unknown"])
```


we could track which students have graduated from school using strings for names and Booleans for their graduations status
```swift
let hasGraduated = [
    "Eric": false,
    "maeve": true,
    "Omar": true,
]
print(hasGraduated["Eric"])
```

we could track years when Olympics took place along with their locations
```swift
let olympics = [
    2012: "London",
    2016: "Rio",
    2021: "Tokyo"
]
print(olympics[2021, default: "Unknown"])
```


we can also create an empty dictionary using whatever explicit types we want to store. 
```swift

var heights = [String: Int]()
heights["Yao Ming"] = 229
heights["Shaquille O'Neal"] = 216
heights["LeBron James"] = 206
print(heights["Yao Ming", default: 0])
```


Dictionaries don't allow duplicate keys to exist. If you set a value for a key that already exists, Swift will overwrite whatever was the previous value. 
```swift
var archEnemies = [String: String]()
archEnemies["Batman"] = "The Joker"
archEnemies["Superman"] = "Lex Luthor"
archEnemies["Batman"] = "Penguin" //setting another value for a key, Batman
print(archEnemies["Batman", default: "Unknown"])
```



# Sets for fast data lookup

The set will automatically remove any duplicate values, and it won't remember the exact order that was used in the array. Every time you re-run the code, we get a completely different order eveytime. the set just doesn't care what order its items come in. 
```swift

let people = Set(["Tom", "Nicolas", "Sam", "Joe"])
print(people)
```


when we add items individually to a set. we use 'insert()'. 'append()' doesn't make sense here. we aren't adding an item to the end of the set. because the set will store the items in whatever order it wants.
we can use contains(), count, sorted() in a set. 
```swift

var people2 = Set<String>()
people2.insert("Tom")
people2.insert("Nicolas")
people2.insert("Joe")
people2.insert("Sam")

print(people2)
print(people2.contains("Joe"))
print(people2.count)
print(people2.sorted())
```

So, Why we need sets? if we have an array of 1000 movie names and use something like 'contains()' to check whether it contains a movie. Swift needs to go through every items until it finds one that matches. 
in comparison, calling 'contains()' on a "set" runs So Fast. even though we have 10 million items, it would still run instantly. 



# enums = short for enumeration. 
## we get to list up front the range of values it can have, and Swift will make sure you never make a miske using them. this calls the new enum Weekday, and provides five cases to handle the five weekdays.
```swift

enum Weekday {
    case monday
    case tuesday
    case wednesday
    case thursday
    case friday
}
```

Now rather than using strings, we are gonna us the enum we just made. we see Swift offer up all possible options when we've typed 'Weekday.', because it knows we're going to select one of the cases. 
```swift

var day = Weekday.monday
day = Weekday.tuesday
```


When we have many cases in an enum, we can just write case once, then separate each case with a comma. 
```swift

enum Weekday1 {
    case monday, tuesday, wednesday
}
```


Swift knows that '.tuesday' must refer to 'Weekday.tuesday'. 
```swift
var day1 = Weekday1.monday
day1 = .tuesday
day1 = .wednesday
```

Remeber that we can't set a variable to a string at first, then an integer later on. value's data type becones fixed. 
