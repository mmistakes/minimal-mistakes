---
excerpt: Toggle $DebugPreference, $VerbosePreference and $InformationPreference in PowerShell between Continue and Silently Continue with a short-cut.
header:
  overlay_image: https://lh5.ggpht.com/yUEGAXq8O-2XcXjL0NrLQRT5m6uwz1Zx4yS27uSpg09FUQrlFoEEIyPrkbQk-ebSdg8a
tags: PowerShell
date: 2016-07-27 18:19:00
categories: Tips
title: Toggle debug, verbose and information level output on and off with a short-cut

---



PowerShell is great but there are a couple of things I find very annoying.

- The inability of the console to reset itself. It would be as if the process was restarted.
- The output control using the preference variables. [about_Preference_Variables](https://technet.microsoft.com/en-us/library/hh847796.aspx?f=255&MSPPError=-2147217396)

That is ok, every technology has it perks and we judge it based on how much the offer outweighs the problems. 

I really wish the PowerShell team implements a sort of `Reset-Environment` feature in PowerShell. 
I don't believe that this can be fixed with an easy dirty trick without disrupting the environment. 

I know that in PowerShell the preference variables are not simply logging levels but to be honest almost everybody looks at them like on/off logging of the corresponding levels. 

- `$DebugPreference` for `Write-Debug`
- `$VerbosePreference` for `Write-Verbose`
- `$InformationPreference` for `Write-Information`

For most people there are two values for `$DebugPreference`, `$VerbosePreference` and `$InformationPreference`:

- `SilentlyContinue` that outputs nothing.
- `Continue` that outputs the message. 

There are even people who add this at the beginning of every script to stop the execution from breaking when some piece of code does `Write-Debug`. 

```powershell
if ($PSBoundParameters['Debug']) {
    $DebugPreference = 'Continue'
}
```  

They do this because they want to execute a script with `-Debug` parameter to capture the output. 
What is the purpose of having Debug level output if the script cannot run without supervision? 
I really think the PowerShell team has missed something here.

I find my self often in need to change the value of each and I find it disrupting to write something like `$DebugPreference=SilentlyContinue`. 
It's error prone and it also polluted the command history.

It could be me though and my background in .NET.

## Simple solution for your profile

While browsing through [#PowerShell](https://twitter.com/search?q=%23PowerShell&src=typd) on [twitter](https://twitter.com/) I noticed someone using the `Set-PSReadlineKeyHandler` to register shortcuts. 
I really liked the idea and thought what if I could press `Ctrl+1` and turn on and off the debug output? 

So I wrote this gist 

{% gist Sarafian/5f86413001c7c72f56537defaa2af4c1 %}

Save this into a file simply copy this into your PowerShell profile script `Microsoft.PowerShell_profile.ps1`. 
Next time you launch PowerShell you'll see 

```text
Key    Function                Description
---    --------                -----------
Ctrl+1 Toggle SilentlyContinue Toggle SilentlyContinue between Continue and SilentlyContiinue
Ctrl+3 Toggle SilentlyContinue Toggle SilentlyContinue between Continue and SilentlyContiinue
Ctrl+2 Toggle SilentlyContinue Toggle SilentlyContinue between Continue and SilentlyContiinue
```

Open a new PowerShell console and follow this sequence

```powershell
Write-Debug "Debug"
# Press Ctrl+1
Write-Debug "Debug"
# Press Ctrl+1
Write-Debug "Debug"
```

{% include figure image_path="/assets/images/posts/powershell/2016-07-27-Toggle-Preference.Toggle.png" alt="Toggle debug on and off" caption="Toggle debug on and off" %}

Sometimes some problems have easy solutions and this definitely looks as one.

## Known issues

There are some small problems with the current code:

- It doesn't work for ISE. I believe ISE modified the environment a lot and the script needs to match that.
- Once you press e.g. `Ctrl+1` then the message seems to appear over the cursor. Just press enter.

I've also noticed that this [PSReadLine](https://github.com/lzybkr/PSReadLine) module exist but I've not tried it out yet.
