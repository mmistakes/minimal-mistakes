---
title: Avoid If with Fantsy-Pants
---
I've grown rather fond of nice looking code lately and have been looking for ways to cleanup my logic and improve my code overall. That lead me to getting some assistance from the *ALWAYS* helpful [Joel Tallow]('https://github.com/vexx32'). He looked through some of my code and gave me some improvements. He also showed me some really cool pieces of logic that I haven't seen before. Let's check out a really cool way to avoid having to use if

## Quick Refresher

If you are newer to PS or are unfamiliar with some constructs then let's quickly cover them before jumping to the important bit. If you'd prefer to jump ahead then go for it!

### Arrays


```powershell
# This creates an array of 2 values. Arrays are good at holding multiple values
@('value1','Value2')

# To verify that this is of the array type, Run
@('value1','value2') -is [array]
True
```

### Indexing

```powershell
# We can use an index number to select which value we want out of the array
# We put the index number inside []
# [0] returns the first  value in the array, which is value1.
@('value1','Value2')[0]
value1

# [1] returns the second value in the array (counting starts at 0), which is value2.
@('value1','value2','value3')[1]
value2

# to get the last value in the array, we specify [-1]
@('value1','value2','value3')[1]
value3
```

### Comparison Operators

```powershell
# Comparison operators compare things and then tell us if the comparison was true or false.
# Is 'Toby' the same string as 'Scranton Strangler'?
'Toby' -eq 'Scranton Strangler'
False
# darn, we almost had him.

'Pinocchio' -eq 'Real Boy'
False
# ouch, poor guy


# We can also determine if things are Null or not
'Michael' -eq $null
False

# We haven't defined the variable, so it doesn't exist yet.
$NonExistentVariable -eq $null
True
```

## Code Time

Here's the code! This goes from 6 lines of code if you use the formatting that I do for If, Else statements.

#### Let's Paint the Office

```powerShell
$newOfficeColor = @($preference, "CorporateGrayscale" -ne $null)[0]
Write-Host "Our Office will be $newOfficeColor"
Our Office will be CorporateGrayscale

# This is how I traditionally would have handled something like this
if ($preference){
    $newOfficeColor = $preference
}
else {
    $newOfficeColor = "CorporateGrayscale"
}
Write-Host "Our Office will be $newOfficeColor"
Our Office will be CorporateGrayscale
```

#### Actual Code and What it Replaced

```powershell
# Super clean and fancy new code
$mimeType = [System.Web.MimeMapping]::GetMimeMapping($File)
$ContentType = @($mimeType, "application/octet-stream" -ne $null)[0]

# Old long code
$mimeType = [System.Web.MimeMapping]::GetMimeMapping($File)
if ($mimeType) {
    $ContentType = $mimeType
}
else {
    $ContentType = "application/octet-stream"
}
```


## Read More

[https://stackoverflow.com/questions/28732025/what-does-mean-in-powershell](https://stackoverflow.com/questions/28732025/what-does-mean-in-powershell)

[https://blogs.technet.microsoft.com/heyscriptingguy/2015/11/06/powertip-find-if-variable-is-array-2/](https://blogs.technet.microsoft.com/heyscriptingguy/2015/11/06/powertip-find-if-variable-is-array-2/)

[Everything You Wanted to Know About Arrays - Kevin Marquette](https://kevinmarquette.github.io/2018-10-15-Powershell-arrays-Everything-you-wanted-to-know/?utm_source=reddit&utm_medium=post)

[https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_arrays?view=powershell-6](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_arrays?view=powershell-6)