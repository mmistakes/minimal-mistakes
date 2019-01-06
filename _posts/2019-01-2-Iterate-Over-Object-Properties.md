---
title: Iterate over Object Properties by Using PSObject
excerpt: "Got a pscustomobject that you want to iterate through? Use the .psobject hidden property!"
tags:
- PowerShell
- pscustomobject
- Get-Member
---

I was writing a script earlier this week and came across the need to iterate over the properties of a `[pscustomobject]`. I started writing a `foreach` loop and realized that I forgot how to iterate over each property in a pscustomobject. Sounds like the perfect excuse to freshen up on it and document it for myself for the next time I forget!

## Code Sample

<script src="https://gist.github.com/AndrewPla/650209134a3ea887a31104085628bd9c.js"></script>

## Hidden PSObject Property

PSCustomObjects have a hidden property named psobject. This property contains base object metadata. Let's look at the hidden properties of a `pscustomobject` using the `-force` parameter of Get-Member.

```powershell

> $object = [pscustomobject]@{ Key1 = 'Val1' ; Key2 = 'Val2' }

> $object | Get-Member -Force

   TypeName: System.Management.Automation.PSCustomObject

Name        MemberType   Definition
----        ----------   ----------
pstypenames CodeProperty System.Collections.ObjectModel.Collection...
psadapted   MemberSet    psadapted {ToString, Equals, GetHashCode, GetType}
psbase      MemberSet    psbase {ToString, Equals, GetHashCode, GetType}
psextended  MemberSet    psextended {Key1, Key2}
psobject    MemberSet    psobject {Members, Properties, Methods, ImmediateB...
Equals      Method       bool Equals(System.Object obj)
GetHashCode Method       int GetHashCode()
GetType     Method       type GetType()
ToString    Method       string ToString()
Key1        NoteProperty string Key1=Val1
Key2        NoteProperty string Key2=Val2
```

Let's grab all of the properties by using the .psobject property. We only want to grab noteproperties because there will be other properties that we dont want to iterate over.
```powershell
$objMembers = $object.psobject.Members | where-object membertype -like 'noteproperty'
```

### Read More

These are some great posts that go a bit deeper on things and provide lots of relevant info.

- [https://powershellexplained.com/2016-10-28-powershell-everything-you-wanted-to-know-about-pscustomobject/](https://powershellexplained.com/2016-10-28-powershell-everything-you-wanted-to-know-about-pscustomobject/)

- [https://ramblingcookiemonster.wordpress.com/2014/11/22/exploring-powershell-objects-flattening/](https://ramblingcookiemonster.wordpress.com/2014/11/22/exploring-powershell-objects-flattening/)

- [https://stackoverflow.com/questions/37688708/iterate-over-psobject-properties-in-powershell](https://stackoverflow.com/questions/37688708/iterate-over-psobject-properties-in-powershell)