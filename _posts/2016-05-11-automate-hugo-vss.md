---
excerpt: Automating Hugo build and publish to github pages in Visual Studio Services
header:
  overlay_image: https://gohugo.io/img/hugo-logo.png
tags:
- PowerShell
- Visual Studio Services
- Git
date: 2016-05-11 11:24:44
title: Build and publish Hugo from Visual Studio Services

---



This web site and blog is powered by [Hugo](https://gohugo.io/). Hugo is similar to Jekyll and in short it generates static pre-rendered pages. 
The main format of content is typically markdown. More about the site is described on a previous post [Building the site with Hugo](/post/building%20the%20site%20with%20hugo/).

The goal is to use **Visual Studio Services** as the automation platform to populate the **master** branch of [sarafian.github.io](https://github.com/Sarafian/sarafian.github.io) with the Hugo build. 
In Visual Studio Services, I create a Build definition using **hosted** as the default agent queue. Also I setup up the repository and triggers to establish a continuous integration with my private bitbucket repository.

![General tab](/assets/images/posts/2016-05-11-automate-hugo-vss.general.png "Build general tab")
![Repository tab](/assets/images/posts/2016-05-11-automate-hugo-vss.repository.png "Build repository tab")
![Triggers tab](/assets/images/posts/2016-05-11-automate-hugo-vss.triggers.png "Build triggers tab")

The entire automation is implemented in PowerShell script that is references by a PowerShell build step.
![Build PowerShell step](/assets/images/posts/2016-05-11-automate-hugo-vss.powershell.png "Build PowerShell step")
This can be split in multiple steps. Remember that the environment of the agent is the same among each step. The output of one step could be the input for the next one.

What does `VSS\Automate.ps1` do?

1. Download Hugo binary from [hugo_0.15_windows_amd64](https://github.com/spf13/hugo/releases/download/v0.15/hugo_0.15_windows_amd64.zip) in a temp directory
1. Expand the zip
1. Clone the [sarafian.github.io](https://github.com/Sarafian/sarafian.github.io) into a temp location. For access I use a [github personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).
1. Invoke the Hugo build.
1. Copy the generated files from the `public` folder into the clone folder
1. Add all files to local git repository.
1. Commit all files to the local git repository.
1. Push the local git to origin.

At this point the [web site](https://sarafian.github.io) is refreshed.

Let's go over the script block of each step. 

## Download Hugo and expand
```powershell
$sourceRepositoryPath=Resolve-Path "$PSScriptRoot\..\"
Write-Verbose "sourceRepositoryPath=$sourceRepositoryPath"
Push-Location $sourceRepositoryPath
$hugoName="hugo_0.15_windows_amd64"

#region download hugo
$url = "https://github.com/spf13/hugo/releases/download/v0.15/$hugoName.zip"
$downloadPath = Join-Path $env:TEMP "$hugoName.zip"
if(Test-Path ($downloadPath))
{
    Remove-Item $downloadPath -Force -Recurse | Out-Null
}

Write-Debug "Downloading $url to $downloadPath"
$wc = New-Object System.Net.WebClient
$wc.DownloadFile($url, $downloadPath)
Write-Verbose "Downloaded $url to $downloadPath"
#endrergion

#region expand
$expandPath=Join-Path $env:TEMP $hugoName
if(Test-Path ($expandPath))
{
    Remove-Item $expandPath -Force -Recurse | Out-Null
}

New-Item -Path $expandPath -ItemType Directory|Out-Null
Write-Verbose "Created directory $expandPath"

Write-Debug "Expanding $downloadPath to $expandPath"
[System.Reflection.Assembly]::LoadWithPartialName('System.IO.Compression.FileSystem')|Out-Null
[System.IO.Compression.ZipFile]::ExtractToDirectory($downloadPath, $expandPath)|Out-Null
Write-Verbose "Expanded $downloadPath to $expandPath"
#endregion
```

## Clone the github repository 

There are two dependencies for the following code block:

- The url includes variable `$GitToken` that is fed to the script from a parameter `-GitToken`. It represents the personal access token. All further git actions will use this access token. 
The lifetime of the cloned repository is the same as with the hosted agent. Once the agent recycles, so does the cloned repository and any trails of the access token. 
There is one catch though. The access token will show up in the build log but some extra code this can be fixed.
- Invoking Git from PowerShell has its problems. [How to execute git.exe from PowerShell and visual studio services](/post/powershell/execute%20git%20from%20powershell%20and%20visual%20studio%20services/) goes over the issue and provides the defintion of `$invokeGit` script block. 

```powershell
#region checkout master sarafian.github.io
$githubUrl="https://$GitToken@github.com/Sarafian/sarafian.github.io.git"
$clonePath=Join-Path $env:TEMP "clone"
if(Test-Path ($clonePath))
{
    Remove-Item $clonePath -Force -Recurse | Out-Null
}
New-Item $clonePath -ItemType Directory |Out-Null
Write-Verbose "Cloning $githubUrl to $clonePath"
Push-Location $clonePath
try
{
    $arguments=@(
        "clone"
        "-b"
        "master"
        "$githubUrl"
    )
    Invoke-Command -ScriptBlock $invokeGit -ArgumentList "Clone",$arguments
}
finally
{
    Pop-Location

}
$targetRepositoryPath="$clonePath\sarafian.github.io"
Write-Verbose "targetRepositoryPath=$targetRepositoryPath"

#endregion
```

## Build the web site with Hugo
```powershell

#region build
$hugoPath=Join-Path $expandPath "$hugoName.exe"
Write-Verbose "hugoPath=$hugoPath"

Write-Debug "Executing $hugoPath"
$arguments=@()
if($BuildDrafts)
{
    $arguments+="--buildDrafts"
}
$arguments+="-v"
$hugoBuild=& $hugoPath $arguments
$hugoBuild| ForEach-Object {Write-Host $_}

if($hugoBuild -match "ERROR")
{
    Write-Error "Hugo build failed"
    exit 1
}
Write-Verbose "Hugo build success"
Write-Verbose "Executed $hugoPath"

$publicPath=Join-Path $sourceRepositoryPath public
Copy-Item "$publicPath\*" "$targetRepositoryPath" -Recurse -Force -Verbose
#endregion
```   

## Commit and push
At this point, the cloned git repository has the newly rendered files. To push them into remote/origin repository we must 

1. Log status `git status`. This is not necessary but I use it for logging purposes. You can get a report of which files are different.
1. Add them `git add -A`.
1. Commit them `git commit -m "message"`.
1. Push to origin `git push`.

```powershell
#region push to origin master
try
{
    Push-Location $targetRepositoryPath
    $arguments=@(
        "status"
    )
    Invoke-Command -ScriptBlock $invokeGit -ArgumentList "Status",$arguments

    $msg="rebuilding site $(Get-Date)"
    $arguments=@(
        "add"
        "-A"
    )
    Invoke-Command -ScriptBlock $invokeGit -ArgumentList "Add",$arguments

    $arguments=@(
        "commit"
        "-m"
        '"'+$msg+'"'
    )
    Invoke-Command -ScriptBlock $invokeGit -ArgumentList "Commit",$arguments

    if($Push)
    {
        $arguments=@(
            "push"
        )
        Invoke-Command -ScriptBlock $invokeGit -ArgumentList "Push",$arguments
    }
    else
    {
        Write-Warning "Did not push"
    }
}
catch
{
    Write-Error $_
    throw
}
finally
{
    Pop-Location
}
#endregion
```
