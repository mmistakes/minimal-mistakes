---
excerpt: Render a computer badge with name and state in markdown.
tags:
- PowerShell
- MarkdownPS
date: 2016-05-10 09:53:13
categories: Tips
title: Computer state badges

---



Using [MarkdownPS](/post/markdownps/markdownps/) this is a cmdlet that 

1. Tests the state of the computer using PowerShell's `Test-Connection` cmdlet
1. Depending on the outcome it generates a badge in markdown with red or green state. 

```powershell
function New-ComputerBadge {
    param (
        [Parameter(Mandatory=$true)]
        [string]
        $Computer
    )
    try
    {
        if(Test-Connection $Computer -Quiet)
        {
            $color="green"
            $status="Live"
        }
        else
        {
            $color="red"
            $status="Not Live"
        }
        New-MDImage -Subject $Computer -Status $status -Color $color
    }
    catch
    {
        Write-Error $_
        New-MDImage -Subject "Badge" -Status "Error" -Color red
    }
}
```

Example
```powershell
New-ComputerBadge -Computer "EXAMPLE"
```
renders the following markdown
```markdown
![](https://img.shields.io/badge/EXAMPLE-Live-green.svg)
![](https://img.shields.io/badge/EXAMPLE-Not%20Live-red.svg)
```

- ![](https://img.shields.io/badge/EXAMPLE-Live-green.svg)
- ![](https://img.shields.io/badge/EXAMPLE-Not%20Live-red.svg)
