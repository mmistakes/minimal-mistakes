---
title: "Regex and PowerShell Recap"
excerpt: "Quick start or reference for Regex with PowerShell"
tags:
- PowerShell
- Regex
classes: wide
toc: true
---

# Regular Expressions

Regular Expressions, shortened as regex, is a sequence of characters that defines a *search pattern*. We can use these search patterns to find strings. This blog aims to capture some of what I've learned about Regex. I learned Regex by watching Thomas Rayner speak at some PowerShell usergroups:

- [Regex for N00bs with Thomas Rayner - YouTube](https://www.youtube.com/watch?v=EcASUAi1B0k)
- [Regex for Rockstars - YouTube](https://www.youtube.com/watch?v=nC6ylcggHBU)

These are great presentations and were recommended to me by multiple people. This blog aims to capture some of what I've learned.

## Quick Reference

## Regex Applied in PowerShell

Many examples are used directly from Thomas Rayner, thank you for this.

### `Select-String`

`Select-String` can be used to search for regular expressions. * is implied for this, so using simple strings works fine.

```powershell

```

### `Switch -Regex ($string)`



### Filter an Array with Where-Object and -Match

This example shows a simple filter using `Where-Object` and `-Match`. This is fairly common

```powershell
$array = @('somethingone', 'somethingtwo', 'noway')
$array | Where-Object { $_ -match 'something' }
```

Output  

```
somethingone
somethingtwo
```

### Boolean `-match`ing

The output is true because the regex patter `something` is found in the string on the left.

```powershell
 'somethingone' -match 'something'
 True
```

The regex pattern `pickles` isn't found anywhere in the string `somethingone`.

```powershell
'somethingone' -match 'pickles'
False
```

### Simple Replacements

To replace, we can make use of the `-replace` operator. This operator accepts 2 arguments: the regex pattern and the string to replace it with.

```powershell
'Here is a simple string.' -replace 'simple string', 'string that got something replaced'
Here is a string that got something replaced.
```

### Parameter Validation

Using regex to validate parameters is possible with `[ValidatePattern('<pattern>')]`

`[ValidateScript]


### [Regex] Class

The `[Regex]` class has some useful methods for dealing with regex

#### [regex]::Match()

The match method searches an input string for a substring that matches a regular expression pattern and returns the **first** occurrence as a single match object.

```powershell
[regex]::Match('Bond. James Bond.', 'James\sBond').Value
James Bond
```

#### [regex]::Matches()

The matches method searches an input string for all occurrences of a regular expression and returns **all** of the matches. This is different than

This example searches the specified input string for all occurrences of a specified regular expression. The specified regular expression is looking for `\w+` which is one or more word character, followed by a `$`, which represents hte end of the line.


##### Matches(String, String)

Searches the specified input string for all occurrences of a specified regular expression.

```powershell
[regex]::Matches('domain\username', '\w+$').value
username
```
### -Match

```powershell
'Bond. James Bond.' -match  '(James)\s(Bond)'
True
```

The builtin variable, `$matches` is available with everything that matched. The output of `$matches` is below.

```
Name                           Value
----                           -----
2                              Bond
1                              James
0                              James Bond
```

## Quantifiers

Quantifiers allow you to save time and space in regex.

### * Character

Tells you that we want 0 or more of what comes before it. There are 0 or more `s` characters before `omething.txt` so this is True

```powershell
' omething.txt' -match 's*omething.txt'
True
```

### + Character

The `+` stands for 1 or more of the preceding character. In this example there is NOT 1 or more `s` character(s) at the beginning of the string.

```powershell
'omething.txt' -match 's+omething.txt'
False
```

### ? Character

`?` stands for 0 or 1 of the preceding character.

```powershell
'something.txt' -match 's?omething.txt'
True
```

## Special Symbols

### The Magic Wand

Thomas affectionately refers to the `\` symbol as a magic wand that `bonks` whatever character follows it. Look out for the `\` as you use regex! It is also used as an escape character.

### Character Classes

Character classes are strings (case-sensitive) that define certain things in a pattern

| character  | description  | example (True)   |
|---|---|--------|
| \w  | word character [a-zA-Z_0-9]  | `'hi123' -match '\w'` |
| \W  |  non-word character [^a-zA-Z_0-9] | `'...' -match '\W'` |
| \d  | Digit [0-9]  | `'1' -match '\d'` |
|  \D | non-digit [^0-9]  | `'word' -match '\D'` |
| \n  | new line  |  "`n" -match "\n" |
| \r  | carriage return  | "`r" -match "\r" |
|\t	| tabulation  | "`t" -match "\t" |
|\s	| white space  | `' ' -match '\s'` |
|\S	| non-white space  | `'abc' -match '\S'` |
|\A	| beginning of the string (multi-line match)  | "bob" -match "\Ab" |
|\Z	| end of the string (multi-line match)  | "bob" -match "b\Z" |
|\b	| word boundary, boundary between \w and \W  |
|\B	| not a word boundary  |
|\<	| beginning of a word  |
|\>	| end of a word  |

### Values

| character  | description  | example (True)   |
|---|---|--------|
|  . | matches any character except newline  | `'light' -match 'l.ght'`
| "string" | matches a literal string | `'string' -match 'st'`
| [abc] | matches at least one of these | `'b' -match '[abc]'`
| [^abc] | matches characters except these | `'d' -match '[^abc]`'
| [a-z] | match any letter in range | `'v' -match '[a-z]'`

### Quantifiers

Specify how *many* of times to match on.

| character  | description  | example (True)   |
|---|---|--------|
|{n} | matches exactly n times  | 
|{n,}	| matches a minimum of n times  |
|{x,y}	| matches a min of x and max of y  |
|*	    | matches 0 or more times  | 'abc' -match '*a'
|+	    | matches 1 or more times  |
|?	    | matches 1 or 0 times  |
|*?	    | matches 0 or more times, but as few as possible  |
|+?	    | matches 1 or more times, but as few as possible  |
|??	    | matches 0 or 1 time  |

### Quick Reference

Here is a quick list of special characters and a handle example that evaluates to `$true`.
| character  | description  | example (True)   |
|---|---|--------|

|  \ | escape character  
|^	| beginning of a line  | "bob" -match "^b"
|$	| end of a line  | "bob" -match "b$"


|(a\|b)	| ‘a’ or ‘b’  | 'aaa' -match '(a|b)'


### Curly Braces { }

Curly braces act like a custom quantifier. The quantity of what comes before it is put inside the curly braces.

This output is true because `\d` represents a digit and there are 3 of them.

```powershell
'something123' -match '\d{3}'
True
```

### Round Brackets ( )

Round brackets are used to group.

The grouping contains the string `hello123` and the 2 for the custom quantifier specifies that anything that comes before it must occur 2 times.

```powershell
'hello123hello123' -match '(hello123){2}'
True
```

### Square Brackets [ ]

Square brackets denote a set. One of the values in the square brackets should match in order to be a match.

In this example, we are looking for `f,g, or h`, followed by the end of line character, which is denoted by `$`.

```powershell
'something' -match '[fgh]$'
True
```


## Named Capturing Groups

The `<>` characters can be used to assign tags to groups

```powershell
$pat = '(?<first>James)\s(?<last>Bond)'
$match = [regex]::Match('Bond. James Bond.',  $pat)
# Output is stored in the Groups property and has a nice tag for first and last
$match.Groups.First
```

