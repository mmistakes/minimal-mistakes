---
date: 2016-06-17 08:15:07
title: enhanced invoke-command for local and remote execution
tags:
- PowerShell
- Remote
excerpt: To use Invoke-Command for local and remote targets we need conditions around in the script and some additional overhead in each script block. In this post I'll try to improve an improved alternative.

---



A while ago I posted two entries

- [Invoke script blocks locally or remotely](https://sarafian.github.io/post/powershell/Wrap%20Invoke-Command/) where I proposed an enhanced version of `Invoke-Command`.
- [Code as configuration](https://sarafian.github.io/post/code%20as%20configuration/) where I explain the basics of the concept.

With [SDL] I try to establish a no login culture. That is we should not have to Remote Desktop into a target computer but we should do everything from our client machine. 
With PowerShell that is easy and you can execute script blocks on a remote target with `Invoke-Command` or you establish a remote session to the target with `Enter-PSSession`. 
When automating, `Invoke-Command` becomes the focus point because a remote session cannot execute scripts.

Let's build up the case. Let's hypothesize that I want to execute this script block locally or on a remote target `$ComputerName`.

```powershell
$scriptBlock1= {
    Write-Host "$($env:COMPUTERNAME) says hello"
}

if ($ComputerName)
{
    Invoke-Command -ComputerName $ComputerName -ScriptBlock $scriptBlock1
}
else
{
    Invoke-Command -ScriptBlock $scriptBlock1
}
```

A while ago, I've also posted the [Code as configuration](https://sarafian.github.io/post/code%20as%20configuration/) where I explain the basics of the concept. 
A key requirement is that the scripts need to be as clean as possible. The conditional invocation of the `$scriptBlock1` is not the best example of clean. 
This becomes more complicated as the number of script blocks and script files increase. 
For this reason a while ago I posted the [Invoke script blocks locally or remotely](https://sarafian.github.io/post/powershell/Wrap%20Invoke-Command/) where an enhanced version of `Invoke-Command` can do this

```powershell
$scriptBlock1= {
    Write-Host "$($env:COMPUTERNAME) says hello"
}

Invoke-CommandWrap -ComputerName $ComputerName -ScriptBlock $scriptBlock1
```

This is much better. One line invokes a script block regardless of the value of `$ComputerName`. This is simple and clean and complies with the basics of **code as configuration**.

As I started building scripts another problem started to become apparent. Let’s assume I want to improve the script and I want to control what the script block *says* in `Write-Host "$($env:COMPUTERNAME) says hello"` 
There are two options here:

- Add script block parameters
- Use script scope parameters directly.

For example
```powershell
#region example with script block parameter
$scriptBlockWithParam= {
    param($Message)
    Write-Host "$($env:COMPUTERNAME) says hello"
}
Invoke-CommandWrap -ComputerName $ComputerName -ScriptBlock $scriptBlockWithParam -ArgumentList "Hello"
#endregion

#region example with direct reference to script variables
$message="Hello"
$scriptBlockWithVariable= {
    Write-Host "$($env:COMPUTERNAME) says $message"
}
Invoke-CommandWrap -ComputerName $ComputerName -ScriptBlock $scriptBlockWithVariable
#endregion
```

The second example works only when `$ComputerName` is `$null`. When a script block executes remotely then the variables in the script do not flow into the remote execution context. 
To make it work we need to use the `$Using:variableName` assignment like this
```powershell
#region example with direct reference to script variables
$message="Hello"
$scriptBlockWithVariable= {
    
    Write-Host "$($env:COMPUTERNAME) says $($Using:message)"
}
Invoke-CommandWrap -ComputerName $ComputerName -ScriptBlock $scriptBlockWithVariable
#endregion
```

This will work remotely but not locally because `$Using` is not allowed in non-remote invocation. It turns out that the same principal applies when feeding the script blocks to PowerShell jobs.
To fix the script block we need a conditional variable assignment. PowerShell offers the `$PSSenderInfo` variable when a block executes remotely. When not then it is `$null`. 
The script becomes
```powershell
$message="Hello"
$scriptBlockWithVariable= {
    if($PSSenderInfo) {
        $message=$Using:message
    }   
    Write-Host "$($env:COMPUTERNAME) says $($Using:message)"
}
Invoke-CommandWrap -ComputerName $ComputerName -ScriptBlock $scriptBlockWithVariable
```

The above works with all cases. You might be wondering why I focus on this paradigm and not the one with the parameterized script block. I have two reasons:

- When trying to create scripts for code as configuration you need to keep the script as clean and easy to understand as possible. 
The definition of parameters in the script block and the additional reference in the invocation line do not comply. 
A script block is like a function. Very useful for executing multiple times with some variations but in code as configuration that is not the goal. 
The only reason we need a script block is to make a remote call. The variations will be expressed in different cmdlets within the script block body.
- I like promoting my session's `$DebugPreference` and `$VerbosePreference` values into the remote execution context. As with any other parameters, the local values do not automatically flow into the remote executions so I need to resort to conditional `$PSSenderInfo` assignment as mentioned above.
I need to do this regardless of my implementation flavour, that is using script block parameters or not.

Let's see how it looks
```powershell
$message="Hello"
$scriptBlockWithVariable= {
    if($PSSenderInfo) {
        $DebugPreference=$Using:DebugPreference
        $VerbosePreference=$Using:VerbosePreference
    }

    if($PSSenderInfo) {
        $message=$Using:message
    }
    Write-Debug "Going to say something"
    Write-Host "$($env:COMPUTERNAME) says $($Using:message)"
    Write-Verbose "Said something"
}
Invoke-CommandWrap -ComputerName $ComputerName -ScriptBlock $scriptBlockWithVariable
```

The last three lines represent my code as configuration blocks. This is where I get to execute multiple cmdlets which internally output Debug and Verbose messages. 
It actually looks more clean than this but at this moment I can't show an example yet. The rest of the block is just noise. 
Imagine you have multiple script blocks in one script file. Then most of my script is focused in facilitating the remote call and not the actual code as configuration parts.
I don't need this and it’s too noisy and complicated. Also, it doesn't help people to copy paste examples into the file, without having deep knowledge of what makes remoting tick.

So I enhanced even more the `Invoke-CommandWrap` and I updated the online [gist](https://gist.github.com/Sarafian/a277cd64468a570dff74682eb929ff3c).

* When the script will execute remotely then the cmdlet will
  1. Create a new array of script block
  1. Add the section for the `$DebugPreference` and `$VerbosePreference` in the array.
  1. When optional parameter `-UseParameters` is defined then add a section with script variables that are referenced  in the array.
  1. Add the originally script block  in the array.
  1. Merge the array items into a new script block and replace the original value.
* Brand the execution of the script block. Added optional parameter `-BlockName`. This is a personal flavor for logging purposes. It is not actually required.

{% gist Sarafian/a277cd64468a570dff74682eb929ff3c %}

The above script is simplified into this:
```powershell
$message="Hello"
$scriptBlock= {
    Write-Debug "Going to say something"
    Write-Host "$($env:COMPUTERNAME) says $($Using:message)"
    Write-Verbose "Said something"
}
Invoke-CommandWrap  -BlockName 'Talk' -ComputerName $ComputerName -ScriptBlock $scriptBlock -UseParameters @("message")
```

Now my script block is pure and clean. It contains only the lines that are relevant to my intention. 
The only ugly thing is that I need to remember to reference the dependent parameters in the invocation. Please notice the extra `-UseParameters @("message")`.

What happened internally? 

- If the `$ComputerName` is `$null` then nothing happened. This is really nice because I still get to debug my script block.
- If the `$ComputerName` has a value then internally the value fed to the `-ScriptBlock` parameter was modified. 
Because the original block was replaced, debug capability is lost but to be honest, since I could never debug remote script blocks through PowerShell ISE, I don't see the problem.
You can actually see the new generated body for the script block that is going to execute when the `$DebugPreference` is `Continue`.

It is possible to skip the necessity for `-UseParameters @("message")` by promoting all script variables in the generated script block. 
But at this point I don't feel comfortable with the idea. For this reason I would appreciate any feedback you can provide.
