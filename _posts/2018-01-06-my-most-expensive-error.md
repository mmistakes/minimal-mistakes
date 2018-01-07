---
published: false
---
The title for this may be a little over the top but it is not that far from the truth. I am wanting to show how Units of Measure in F# can protect against some of the most insidious types of errors.

Up to this point one of the most difficult parts of putting together algorithms has been making sure that the Units of Measure for the numbers that I am using match. For example, you shuold not be able to add lbs. and cm, it doesn't make sense. In most programming languages though, a number is just a number. You may be working with a strict language which requires to convert from `int` to `float` before multiplying, but many will do this implicility.

When I am writing in R, Python, or C# I don't have any kind of type checking for the numbers that I am working with. This has led to a lot of frustrating debugging in the past which I missed some simple multiplication or division in my code. These types of bugs can be really nefarious because you can often get numbers 