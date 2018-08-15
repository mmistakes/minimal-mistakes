---
title: "Regular Expressions- with Zimbabwe Id Number"
description: ""
category: Regular Expressions
tags: PowerShell, REGEX
---


The official Natonal Id for Zimbabwe looks something like this:
`69-235489 C 67`

And if we use Regular Expressions: `(^\d{2})-(\d{4,7})\s([A-Z-a-z]{1}\s(\d{2}$))`

Basically this is two digits followed by a hyphen, a group of 4-7 digits, a space separator and then 1 letter followed by another space separator and then 2 digits to end.

Using PowerShell and or .NET you can match a string to the Regular Expression using the snippet below:

{% highlight PowerShell %}
$nationalIdPattern="(^\d{2})-(\d{4,7})\s([A-Z-a-z]{1}\s(\d{2}$))"
$idNumber="69-235489 C 67"

#Using PowerShell Only. Expected output: true/false if string matches.
$idNumber -match $nationalIdPattern

#Using .NET Regex class
[Regex]::match($idNumber,$nationalIdPattern)
{% endhighlight %}

But the challenge is the standard is rarely followed so you get other formats like:

`69 235489 C 67` or `69-235489-C-67`.

In addition the hyphen can be replaced by other separators like forward or backslashes.

Using the System.Regex.Replace from the .NET framework we can take the non-standard formats and make them match the official form.
For `69 235489 C 67` or `69-235489-C-67` we could then employ this regular expression
 
`(^\d{2}) (\d{4,7}) ([A-Z-a-z]{1} (\d{2}$))|(^\d{2})-(\d{4,7})-([A-Z-a-z]{1}-(\d{2}$))`  


{% highlight PowerShell %}
$nationalIdPattern="(^\d{2}) (\d{4,7}) ([A-Z-a-z]{1} (\d{2}$))|(^<d{2})-(\d{4,7})-([A-Z-a-z]{1}-(\d{2}$))"
$idNumber="69-235489-C-67"

$matched=[Regex]::match($idNumber,$nationalIdPattern)

#Make the Id standard if match found
if($matched)
{
	$standardId = [Regex]::replace($idNumber,$nationalIdPattern,'$1-$2 $3 $4').ToUpper()
	Write-Host "Converted " + $idNumber + " to official National Id form: " + $standardId
}
{% endhighlight %}

But our Regular Expression just got complicated and we have left out a lot of other formats.

We could opt for placing the regular expressions in an array which keeps each individual regular expression simple.
Looping through the array we then determine if we have a match on our Id.

{% highlight PowerShell %}
[string[]]$IdPatterns =
	"(^\d{2})-(\d{4,7})\s([A-Z-a-z]{1}\s(\d{2}$))",
	"(^\d{2}) (\d{4,7}) ([A-Z-a-z]{1} (\d{2}$))",
	"(^\d{2})-(\d{4,7})-([A-Z-a-z]{1}-(\d{2}$))";
{% endhighlight %}

In the end though removing all commonly used separators (i.e. spaces, hypens, back/forward slashes etc.) from our given National Id and then trimming the string works just as good.
This will lead us to having to match 1 case, which is '69235489C67' and the regular expression being `(^<d{2})(\d{4,7})([A-Z-a-z]{1}(\d{2}$))`

{% highlight PowerShell %}
$nationalIdPattern = "(^\d{2})(\d{4,7})([A-Z-a-z]{1}(\d{2}$))"
$idNumber = "69-235489-C-67"

#Remove common separators and spaces
$strippedId = $idNumber.Replace("/","").Replace("-","").Replace(" ","").Replace("_","");

#Match and replace with standard format
$matched=[Regex]::match($strippedId,$nationalIdPattern)

#Make the Id standard
if($matched)
{
  $standardId = [Regex]::Replace($strippedId,
  $nationalIdPattern,'$1-$2 $3 $4').ToUpper()

  Write-Host "Converted Id " + $strippedId + " to standard format: " + $standardId
}
{% endhighlight %}

This helps format an unvalidated sequence of National-Id values either in a data file or SQL database.
A few corner case National Id strings remain but this offers a possible starting point.

