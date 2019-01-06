---
title: PowerShell Golf Introduction
toc: true
---

# Let's Golf

In the context of PowerShell, cod golfing is the practice of writing code to solve a given problem in the fewest characters possible. This is similar to golf in the sense that the fewest strokes, or characters, wins. Golfing can be a fun way to challenge yourself and to get more familiar with PowerShell.

## Purpose

The purpose of this post is to put all of the golf techniques that I learn in one place.

I am putting together a list of the different techniques that are used in PS to golf, most of which I am getting from [https://codegolf.stackexchange.com/questions/191/tips-for-golfing-in-powershell](https://codegolf.stackexchange.com/questions/191/tips-for-golfing-in-powershell)

### Remove Spaces

You can skip a lot of spaces in PowerShell, particularly in comparisons.

```powershell
$x -eq $i -and $x -ne 9
```

vs

```powershell
$x-eq$i-and$x-ne9
```

### Pipe arrays of integers to foreach

When you know exactly how many iterations you want for a foreach you can just pipe an array rather than doing a `for` loop

```powershell
for($x=1;$x-le10;$x++){ ... }
```

vs

```powershell
1..10|%{ ... }
```

### Use `Switch` Instead of `If/Else`

Throwing a condensed switch together doesn't take up much space and provides the ability to interact to multiple results, rather than an `if/else` for each condition

```powershell
if($x%2-eq0){'even'}else{'odd'}
```

vs

```powershell
switch($x%2){0{'even'}1{'odd'}}
```

#### `Switch` vs `If/Elseif/If`

```powershell
if($x%2-eq0){'even'}elseif($x%2-eq1){'odd'}else{'error'}
```

vs

```powershell
switch($x%2){0{'even'}1{'odd'}2{'error'}}
```

### Array + Modulus when dealing with math results

We can use  the modulus, or `%` to return the remainder of a division operation.

If a given number divided by 2 has a remained of 0 then it is an even number. If a number has a remainder of 1 when dividing by 2 then it's an odd number. This was a bit confusing to me at first so let's look at some more in depth examples.

```powershell
0..5 | % {"modulus of $_ is $($_%2)"}
```

Now let's use an array and access the value by using an index. This is possible because we know a result of 0 is even and 1 is odd.

```powershell
0..5|%{('even','odd')[$_%2]}
```

### Define Aliases

Creating an alias for a command that has no alias can svae time

```powershell
nal g Get-Random; g 10; g 10
```