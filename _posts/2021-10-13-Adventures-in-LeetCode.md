# Adventures in Leet Code: PowerShell Twist

I've been looking into new challenges recently and decided to give LeetCode a shot. I quickly realized that I haven't been working on this kind of problem since I took a couple programming classes where I didn't learn much. Leetcode doesn't support PowerShell, so I'm going to post these here and if anyone has any constructive feedback I'd appreciate it if you shared it in the comments below.

I found that I was having to look up things that I haven't encountered much while using PowerShell. I really enjoy how these are pushing me to grow. This blog post aims to share some problems and solutions that I've worked on.

# Examples

## Problem 1
Given two binary strings a and b, return their sum as a binary string.

Example 1:

Input: a = "11", b = "1"
Output: "100"

### My Solution

```powershell
function Convert-BinaryStringtoInteger {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)]
        [int]$a,

        [Parameter(Mandatory)]
        [int]$b
    )
    $aInt = [Convert]::ToInt32($a,2)
    $bInt = [Convert]::ToInt32($b,2)
    $cInt = $aInt + $bInt
    $cBinaryString = [Convert]::ToString($cInt,2)
    Write-Output $cBinaryString
}
```

### Test it

```powershell
Convert-BinaryStringtoInteger -a 11 -b 1
100

Convert-BinaryStringtoInteger -a 1010 -b 1011
10101
```

## 2 - Remove All Adjacent Duplicates In String

### Problem

[https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/)

Remove All Adjacent Duplicates In String.  You are given a string s consisting of lowercase English letters. A duplicate removal consists of choosing two adjacent and equal letters and removing them.

We repeatedly make duplicate removals on s until we no longer can.

Return the final string after all such duplicate removals have been made. It can be proven that the answer is unique.

### My Solution

```powershell
function Remove-AdjacentDuplicates {
    param(
        [Parameter(Mandatory)]
        [ValidateScript({
                if (-not ($_ -cmatch '[a-z]')) {
                    throw 'lowercase English letters only'
                }
                else { $true }
            })]
        [ValidateLength(1, 100000)]
        [string]
        $s
    )
    for ($i = 0; $i -lt $s.length ; $i++) {

        if ($s[$i] -eq $s[$i + 1]) {
            $stringToReplace = "$($s[$i])$( $s[ $i + 1 ])"
            $s = $s.replace($stringtoReplace, '')
            $i = -1 # set to negative because it get +1 every iteration and we want it to be on 0
        }
    }
    Write-Output $s
}
```

### Test it

```powershell
Remove-AdjacentDuplicates -s abbaca
ca

Remove-AdjacentDuplicates -s azxxzy
ay
```


## 3 - Valid Word Abbreviation

[https://leetcode.com/problems/valid-word-abbreviation/](https://leetcode.com/problems/valid-word-abbreviation/)

Given a string word and an abbreviation abbr, return whether the string matches the given abbreviation.

A substring is a contiguous non-empty sequence of characters within a string.

### My Solution

```powershell
function Test-ValidWordAbbreviation {
    param(
        [Parameter(Mandatory)]
        [ValidateLength(1, 20)]
        [ValidateScript({
                if ($_ -cmatch '[a-z]0') {
                    throw "No leading zeros"
                }
                if ($_ -cmatch '[A-Z]') {
                    throw "No capital letters"
                }
                else { $true }
            })]
        [string]$Word,
    
        [Parameter(Mandatory)]
        [ValidateLength(1, 10)]
        [string]$Abbr
    )
        
    $replacedAbbr = $Abbr
    $pattern = '\d{1,}' # 1 or more digits   
    $matches = [regex]::Matches($replacedAbbr , $pattern)
        
    for ($i = 0; $i -lt $matches.Count; $i++) {   
    
        $numbers = [regex]::Matches($replacedAbbr , $pattern)
        [int]$upperBound = $numbers[0].Index + $numbers[0].value - 1    
        $replacementText = $word[ $numbers[0].index..$upperBound ] -join ''
        $replacedAbbr = $replacedAbbr.Replace( $numbers[0].Value , $replacementText )
        
    }
    
    if ($replacedAbbr -eq $Word) { Write-Output $true }
    else { Write-Output $false }
}

```


### Test it

```powershell
Test-ValidWordAbbreviation -Word internationalization -Abbr i12iz4n
True

Test-ValidWordAbbreviation -Word a2e -Abbr apple
False
```


## 4 - Valid Palindrome II

[https://leetcode.com/problems/valid-palindrome-ii/](https://leetcode.com/problems/valid-palindrome-ii/)

Given a string s, return true if the s can be palindrome after deleting at most one character from it.

### My Solution

 ```powershell
function Test-ValidPalindromeII {
    param(
        [Parameter(Mandatory)]
        [ValidateLength(1, 100000)]
        [ValidateScript({
                if ($_ -cmatch '[A-Z]') {
                    throw 'lowercase English letters only'
                }
                else {
                    Write-Output $true
                }
            })]
        [string]
        $s
    )

    # See if it's a palindrome as-is
    $reversedWord = for ($j = 1; $j -le $s.length; $j++) {
        $s[ - $j ]
    }
    $reversedWord = $reversedWord -join ''
    if ($reversedWord -eq $s) { $Palindrome = $true }

    # Iterate through and remove a character then test if it's a palindrome
    for ($i = 0; $i -lt $s.length; $i++) {
        # break from loop if $Palindrome is set to $true
        if ($Palindrome) { break }

        $replacedWord = $s.remove($i, 1)
        $reversedWord = for ($j = 1; $j -le $replacedWord.length; $j++) {
            $replacedWord[ - $j ]
        }
        $reversedWord = $reversedWord -join ''

        if ($reversedWord -eq $replacedWord) {
            $Palindrome = $true
        }
    }

    if ($Palindrome) {
        Write-Output $true
    }
    else { Write-Output $false }

}
 ```


### Test it

```powershell
Test-ValidPalindromeII -s 'aba'
True

Test-ValidPalindromeII -s 'abca'
True

Test-ValidPalindromeII -s 'abc'
False
```

## 5 - Valid Phone Number

[https://www.interviewbit.com/problems/valid-phone-number/](https://www.interviewbit.com/problems/valid-phone-number/)

Given a text file input that contains list of phone numbers (one per line).

Write a bash script to print all valid phone numbers.You may assume that a valid phone number must appear in one of the following two formats:

(xxx) xxx-xxxx
xxx-xxx-xxxx
You may also assume each line in the text file must not contain leading or trailing white spaces.

```powershell

function Get-ValidPhoneNumber {
    param(
        [Parameter(Mandatory)]
        [string[]]$Numbers
    )
    foreach($number in $Numbers){
        if ($number -match '^\(\d{3}\) \d{3}-\d{4}$'){
            Write-Output $number
        }
        if ($number -match '^\d{3}-\d{3}-\d{4}$') {
            Write-Output $number
        }
    }
}
```

### Test It

```powershell
$numbers = "987-123-4567", "123 456 7890","(123) 456-7890"
Get-ValidPhoneNumber -Numbers $numbers
```


## 6 - Lines in a given range

Write a bash script to print all the lines of the input which are in the given range.
The first line of the input contains two integers l and r separated by space.
You have to print all the lines of the file input which are in the range of [l, r].

```powershell
function Get-LinesinGivenRange {
    param(
        [Parameter(Mandatory)]
        [string[]]
        $InputContent
    )

    $ranges = ($InputContent -split "`n")[0].trim() -split ' '
    $InputContent = $InputContent -split "`n"
    $InputContent[( $range[0] -1 )..( $range[1] -1 )]

}
```

### Test It

```powershell
$content = "10 15
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
Line 11
Line 12
Line 13
Line 14
Line 15
Line 16
Line 17
Line 18
Line 19
Line 20"

Get-LinesinGivenRange -Input $content -Range 10,15
```

## 7 - Remove Punctuations

[https://www.interviewbit.com/problems/remove-punctuations/](https://www.interviewbit.com/problems/remove-punctuations/)

Write a bash script that removes all the punctuations in the given file named input
For this question, assume that all of the following symbols are punctuations:
! @ # $ % ^ & * ( ) _ - + = { } [ ] ; : ' " ` / > ? . , < ~ | \

Example:

Assume that input has the following content:

This's the sunny day.
It is the sunny day, we can go out.
Your script should output the following:

Thiss the sunny day
It is the sunny day we can go out

### My Solution

```powershell
function Remove-Punctuation {
    param(
        [Parameter(Mandatory)]
        [string]
        $InputContent
    )
    $characters = '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '}', '[', ']', ';', ':', "'", '"', '`', '/', '>', '?', '.', ',', '<', '~', '|', '\'

    $characters | Foreach-Object {
        $InputContent = $InputContent.replace($_, '')
    }
    Write-Output $InputContent
}
```

### Test it

```powershell
$string = "This's the sunny day.
It is the sunny day, we can go out."
Remove-Punctuation -InputContent $string

Thiss the sunny day
It is the sunny day we can go out
```


## 8 - Majority Element

[https://www.interviewbit.com/problems/majority-element](https://www.interviewbit.com/problems/majority-element)

Given an array of size n, find the majority element. The majority element is the element that appears more than floor(n/2) times.
You may assume that the array is non-empty and the majority element always exist in the array.

Example :

Input : [2, 1, 2]
Return  : 2 which occurs 2 times which is greater than 3/2.

### My solution

```powershell
function Get-Solution {
    [CmdletBinding()]
    param (
        [int[]]$Numbers
    )
    $numbers | Where-Object {$_ -gt ($Numbers.count / 2) } | Select-Object -First 1
}
```

### Test It

```powershell
Get-Solution -Numbers 2,1,2
2
```

## 9 - Reverse Words in a String

[https://leetcode.com/problems/reverse-words-in-a-string/](https://leetcode.com/problems/reverse-words-in-a-string/)

Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

### My Solution

```powershell
    function Reverse-WordsinString {
    [CmdletBinding()]
    param(
    [Parameter(Mandatory)]
    [string]$S
    )
    
    $words = ($S -split ' ').trim() # Split the words and remove extra spaces
    
        # the skye is blue
       $output = for ($i = 1; $i -le $words.count; $i++){
            $words[-$i] | Where-Object {$_ -Match '\w'} # only grab words, not blank lines
        }
    $output -join ' '
}
```

### Test It

```powershell
Reverse-WordsinString -S "the skye is blue"
blue is skye the

Reverse-WordsinString -S "  Bob    Loves  Alice   "
Alice Loves Bob

Reverse-WordsinString -S "Alice does not even like bob"
bob like even not does Alice
```

## 10 - Word Break

[https://leetcode.com/problems/word-break/](https://leetcode.com/problems/word-break/)

Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

 

Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false

### My Solution

```powershell
function Test-WordBreak {
    [CmdletBinding()]
    
    param(
        [Parameter(Mandatory)]
        [string]$s,
        
        [Parameter(Mandatory)]
        [string[]]$WordDict
    )
        
    $remainingWords = $s
    foreach ($word in $WordDict ) {
        $remainingWords = $remainingWords -split $word
    }
    if ( ( $remainingWords | Where-Object { $_ -match '\w' }) -gt 0) {
        return $false
    }
    else {
        return $true
    }
}
```

### Test it

```powershell

test-wordbreak -s leetcode -worddict 'leet','code'
True

test-wordbreak -s applepenapple -worddict 'apple','pen'
True

test-wordbreak -s catsandog -WordDict 'cats','dog','sand','and','cat'
False
```