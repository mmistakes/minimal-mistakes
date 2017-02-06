---
date: 2016-05-10 08:36:29
title: How to execute git.exe from PowerShell and visual studio services
tags:
- PowerShell
- Visual Studio Services
- Git
excerpt: Execute git from a powershell script with Visual Studio Services compatibility to automate pull and push.

---



For the purposes of automating the build of this site, I've been experimenting with **git** commands automation using **PowerShell** scripts. The overall goal is to automate in [Visual Studio Services](https://www.visualstudio.com/en-us/products/visual-studio-team-services-vs.aspx) building this site using [Hugo](https://gohugo.io/) and then pushing the redenred files into a git branch to be rendered by [github pages](https://pages.github.com/). 
I'll describe more about this process in a following post. This post will focus on invoking git from PowerShell. 

The most important part of this automation is being able to **push** a certain directory into a git repository. Most of the automation examples explain such concepts with **bash** scripts and there isn't much for the Windows ecosystem. 
When landing into a **git**, **PowerShell**, **Visual Studio Services** and **Windows** related content, then the content is focused on how to consume a git repository and not how to execute the git to automate. 
Invoking git from a PowerShell script is not as easy as you would expect and it is even more complicated when the script is executed as part of a build step in **Visual Studio Services**.
Since I started using Visual Studio Services, I've noticed a couple of differences with the PowerShell environment provided by the **hosted** agent.

Generally speaking, to execute a command from a PowerShell script, e.g. `Test.exe` with parameters `-P1 -P2 Value2` you have a couple of options

- `& Test.exe -P1 -P2 Value2`
- Create an argument list variable`$arguments=@("-P1","-P2","Value2")` and then `& Test.exe $arguments`
- Use the same argument list variable `Start-Process Test.exe -ArgumentList $arguments -Wait`. Depending on what `Test.exe` does, you can control the parameters such as
    - `-Wait`
    - `-NoNewWindow`
    - `-PassThru`    

So I was expecting to do something similar for git but I run into a couple of problems:

- When using just `git` as the executable name, a new command prompt is launched regardless of the `-NoNewWindow` parameter.
- There were a lot of inconsistencies between the returned exit code, the output and error stream.

At the end and after a lot experimentation I landed into the following script block. This is not a fully optimized script and there can be many improvements. 
The important thing is that this script block executes well both from your local client and from a PowerShell build step in a Visual Studio Services build definition. 

```powershell
$invokeGit= {
    Param (
        [Parameter(
            Mandatory=$true
        )]
        [string]$Reason,
        [Parameter(
            Mandatory=$true
        )]
        [string[]]$ArgumentsList
    )
    try
    {
        $gitPath=& "C:\Windows\System32\where.exe" git
        $gitErrorPath=Join-Path $env:TEMP "stderr.txt"
        $gitOutputPath=Join-Path $env:TEMP "stdout.txt"
        if($gitPath.Count -gt 1)
        {
            $gitPath=$gitPath[0]
        }

        Write-Verbose "[Git][$Reason] Begin"
        Write-Verbose "[Git][$Reason] gitPath=$gitPath"
        Write-Host "git $arguments"
        $process=Start-Process $gitPath -ArgumentList $ArgumentsList -NoNewWindow -PassThru -Wait -RedirectStandardError $gitErrorPath -RedirectStandardOutput $gitOutputPath
        $outputText=(Get-Content $gitOutputPath)
        $outputText | ForEach-Object {Write-Host $_}

        Write-Verbose "[Git][$Reason] process.ExitCode=$($process.ExitCode)"
        if($process.ExitCode -ne 0)
        {
            Write-Warning "[Git][$Reason] process.ExitCode=$($process.ExitCode)"
            $errorText=$(Get-Content $gitErrorPath)
            $errorText | ForEach-Object {Write-Host $_}

            if($errorText -ne $null)
            {
                exit $process.ExitCode
            }
        }
        return $outputText
    }
    catch
    {
        Write-Error "[Git][$Reason] Exception $_"
    }
    finally
    {
        Write-Verbose "[Git][$Reason] Done"
    }
}
``` 

A couple of example of using the `$invokeGit` are:

- Execute `git status -b --porcelain`
```powershell
$arguments=@(
    "status"
    "-b"
    "--porcelain"
)
$status=Invoke-Command -ScriptBlock $invokeGit -ArgumentList "Status porcelain",$arguments
```

- Execute `git pull`
```powershell
$arguments=@(
    "pull"
)
Invoke-Command -ScriptBlock $invokeGit -ArgumentList "Pull",$arguments
```

To help understand the script block, a couple of remarks:

- The block first finds the location of the **git.exe**. It seems that when providing the absolute path to `Start-Process` combined with `-NoNewWindow` switch, the command prompt window does not launch. Therefore the script tries to locate first the `git.exe` path.
- In your client client executing `where git` should return only one line `C:\Program Files\Git\cmd\git.exe`. If you try to do the same inside a Visual Studio Services build agent, then you get two identical lines. So for compatibility reasons, the script checks if the outcome is an array.
Use the full path of `C:\Windows\System32\where.exe` to avoid launching a new command prompt window.
- As I mentioned there are problems with the output and error stream. At the end I'm forwarding the output and error stream to two files and the process their content. Sometimes the return exit code is not zero but the error stream is empty.
The control reasoning is as follows:
    1. Capture the error and output streams into different files.
    1. If the output's file content is not null, then pipe each line to `Write-Host`.
    1. if the returned exit code is not zero then 
        1. Write a warning
        1. If the error's file content is not null, then pipe each line to `Write-Host`. Exit the entire script with git's exit code. In my case, I can't allow the script to continue if git fails, therefore I can simply exit the script. Even better, the non zero exit code is captured by Visual Studio Services agent and marks the step as failed.
- As a personal flavor of tracing in PowerShell, I tend to wrap block actions in patterns such as `[Reason]`. The `$invokeGit` adds a prefix as `[Git][$Reason]` where the `$Reason` is provided as a parameter from the main script.
