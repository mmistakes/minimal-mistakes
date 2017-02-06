---
date: 2016-05-19 11:20:40
title: Invoke script blocks locally or remotely.
tags:
- PowerShell
- Remote
excerpt: Invoke-Command has not transparent mechanism to invoke a script block locally or remotely. Invoke-CommandWrap wraps the Invoke-Command to bridge the gap.

---



Let's assume that I have this PowerShell script block
```powershell
$block={
    param($Message)
    Write-Host "$($env:COMPUTERNAME) says $Message"
}
```

The reason is that I'm developing this script that execute both on my computer but also remotely. I wish do this for a couple of reasons

- Debug and develop the script blocks
- Give the scripts to a another person and he executes them locally

If my script is driven by a `$ComputerName` parameter, then I need to replicate conditions such as
```powershell
if ($ComputerName)
{
    Invoke-Command -ComputerName $ComputerName -ScriptBlock $block -ArgumentList "Hello"
}
else
{
    Invoke-Command -ScriptBlock $block -ArgumentList "Hello"
}
```

I don't like this. It makes the scripts noisy and it forces me to replicate certain script patterns. Therefore I developed a small cmdlet that wraps the `Invoke-Command`. 

```powershell
<#
    .SYNOPSIS
        Wraps the Invoke-Command to seamlessy execute script blocks remote or local
    .DESCRIPTION
        Invoke-Command does not provide a transparent method to execute script blocks locally or remotely without conditions. This limited wrapper commandlet does this.
        Every blocked is wrapped with logging statements
    .PARAMETER  ScriptBlock
        The script block
    .PARAMETER  BlockName
        Name of the block. This is for logging purposes.
    .PARAMETER  ArgumentList
        Arguments for the script block.
    .PARAMETER  Computer
        Target computer
    .PARAMETER  Session
        Target session
    .EXAMPLE
        $block={
            param($Message)
            Write-Host "$($env:COMPUTERNAME) says $Message"
        }
        Invoke-CommandWrap -ComputerName @("EXAMPLE01","EXAMPLE02") -BlockName "Saying hello" -ScriptBlock $block -ArgumentList "Hello"

        VERBOSE: [Saying hello] Begin on EXAMPLE01 EXAMPLE02
        EXAMPLE01 says Hello
        EXAMPLE02 says Hello
        VERBOSE: [Saying hello] Finish on EXAMPLE01 EXAMPLE02

    .EXAMPLE
        $block={
            param($Message)
            Write-Host "$($env:COMPUTERNAME) says $Message"
        }
        $session=@("EXAMPLE01","EXAMPLE01")|New-PSSession
        Invoke-CommandWrap -Session $session -BlockName "Saying hello" -ScriptBlock $block -ArgumentList "Hello"

        VERBOSE: [Saying hello] Begin on EXAMPLE02 EXAMPLE01
        EXAMPLE02 says Hello
        EXAMPLE01 says Hello
        VERBOSE: [Saying hello] Finish on EXAMPLE02 EXAMPLE01

    .EXAMPLE
        $block={
            param($Message)
            Write-Host "$($env:COMPUTERNAME) says $Message"
        }
        Invoke-CommandWrap -BlockName "Saying hello" -ScriptBlock $block -ArgumentList "Hello"

        VERBOSE: [Saying hello] Begin local
        LOCALHOST says Hello
        VERBOSE: [Saying hello] Finish local
    .LINK
        Invoke-Command
#>
Function Invoke-CommandWrap {
    param (
        [Parameter(Mandatory=$true)]
        $ScriptBlock,
        [Parameter(Mandatory=$true)]
        $BlockName,
        [Parameter(Mandatory=$false)]
        [Parameter(ParameterSetName="Local")]
        [Parameter(ParameterSetName="Computer")]
        [Parameter(ParameterSetName="Session")]
        $ArgumentList=$null,
        [Parameter(Mandatory=$true,ParameterSetName="Computer")]
        $ComputerName=$null,
        [Parameter(Mandatory=$true,ParameterSetName="Session")]
        $Session=$null
    ) 

    if($Session)
    {
        Write-Debug "Targetting remote session $($session.ComputerName)"
        Write-Verbose "[$BlockName] Begin on $($session.ComputerName)"
        Invoke-Command -Session $Session -ScriptBlock $ScriptBlock -ArgumentList $ArgumentList
        Write-Verbose "[$BlockName] Finish on $($session.ComputerName)"
        return
    }
    if($ComputerName)
    {
        Write-Debug "Targetting remote computer $ComputerName"
        Write-Verbose "[$BlockName] Begin on $ComputerName"
        Invoke-Command -ComputerName $ComputerName -ScriptBlock $ScriptBlock -ArgumentList $ArgumentList
        Write-Verbose "[$BlockName] Finish on $ComputerName"
        return
    }
    Write-Debug "Targetting local"
    Write-Verbose "[$BlockName] Begin local"
    Invoke-Command -ScriptBlock $ScriptBlock -ArgumentList $ArgumentList
    Write-Verbose "[$BlockName] Finish local"
}
```
Code is also available in [gist](https://gist.github.com/Sarafian/a277cd64468a570dff74682eb929ff3c)

By using this commadlet I'm allowed to do
```powershell
Invoke-CommandWrap -ComputerName $ComputerName -ScriptBlock $block -ArgumentList "Hello" -BlockName "Saying hello"
``` 

The `-BlockName` parameter is to group logging together. It's like it gives a name to the script block being executed.

For example the following script
```powershell
$block={
    param($Message)
    Write-Host "$($env:COMPUTERNAME) says $Message"
}
#With multiple computers
Invoke-CommandWrap -ComputerName @("EXAMPLE01","EXAMPLE02") -BlockName "Saying hello" -ScriptBlock $block -ArgumentList "Hello"

#With multiple sessions
$session=@("EXAMPLE01","EXAMPLE01")|New-PSSession
Invoke-CommandWrap -Session $session -BlockName "Saying hello" -ScriptBlock $block -ArgumentList "Hello"

#Local
Invoke-CommandWrap -BlockName "Saying hello" -ScriptBlock $block -ArgumentList "Hello"

```
will output

> VERBOSE: [Saying hello] Begin on EXAMPLE01 EXAMPLE02
> 
> EXAMPLE01 says Hello
> 
> EXAMPLE02 says Hello
> 
> VERBOSE: [Saying hello] Finish on EXAMPLE01 EXAMPLE02

> VERBOSE: [Saying hello] Begin on EXAMPLE02 EXAMPLE01
> 
> EXAMPLE02 says Hello
> 
> EXAMPLE01 says Hello
> 
> VERBOSE: [Saying hello] Finish on EXAMPLE02 EXAMPLE01

> VERBOSE: [Saying hello] Begin local
> 
> LOCALHOST says Hello
> 
> VERBOSE: [Saying hello] Finish local
