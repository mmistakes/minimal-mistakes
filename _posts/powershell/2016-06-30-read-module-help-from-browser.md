---
date: 2016-06-30 09:15:32
title: Read a module's help from a browser
tags: PowerShell
excerpt: A simple solution to view each cmdlet's help from your browser.

---



There are many modules in PowerShell gallery that were built before almost everyone moved to github. 
In many cases there isn't even a project site link and if there is one then it's not very helpful.

If you are lucky then the cmdlets provide enough information to understand what they do. 
The problem is that the help you read and especially the examples are specific to one cmdlet and there is not an easy way to interchange between them. 
In other words, what is missing is a method to read a module's help, if I could describe like this.

What I did in the past was to export the full help of each cmdlet and copy to clipboard. Like this:
```powershell
Get-Command -Module $moduleName |Get-Help -Full |Clip
```

Then I would paste into my editor and try to read the text. This is a bit better because 
- I have the help in a different window
- I can search within the text.

But it is not optimal. The text is noisy and difficult to read.

## Export to markdown

If have been following this blog, then you'll have noticed my preference to markdown for easy text generation and a descent rendering. 
Apparently, the PowerShell team has been facing the same issue and they are developing the [platyPS](https://www.powershellgallery.com/packages/platyPS/) module. 
This is a very interesting module and in the context of this post I'll focus only on the `Get-PlatyPSMarkdown` cmdlet. 
The module is still in pre-release and I've noticed that sometimes they brake between versions. 
When this post was written, I used version [0.3.1.213](https://www.powershellgallery.com/packages/platyPS/0.3.1.213/) of the module.

`Get-PlatyPSMarkdown` can turn the `Get-Help` of each cmdlet into a markdown file.  
The cmdlet offers three parameter sets that differ on the source of the cmdlets.  
I'll focus on the one that uses a module name for input. But you can specific path or specicic set of cmdlets. 
The example targets the [CodeCraft](https://www.powershellgallery.com/packages/CodeCraft/) which is my current driver for another pet project I'm investigating. 

```powershell
Get-PlatyPSMarkdown -module CodeCraft -OneFilePerCommand -OutputFolder C:\DashboardMD\CodeCraft
```

This will output these files 

> - ConvertTo-CodeSnippet.md
> - Get-FunctionFromScript.md
> - Get-ReferencedCommand.md
> - Get-Type.md
> - Write-CommandOverload.md
> - Write-Enum.md
> - Write-Hashtable.md
> - Write-Interface.md
> - Write-MarkupWriter.md
> - Write-Parameter.md
> - Write-PInvoke.md
> - Write-Program.md
> - Write-RemoteDataCollector.md
> - Write-ScriptCmdlet.md

## View from the browser

At this point I can open each file from any markdown editor but I'm looking for something better. 
I want the browser experience with a nice rendering and tab isolation. 
A while ago I've published [Simple markdown web server for windows]({% link _posts/2016-05-23-simple-markdown-web-server-for-windows.md %} to explain how to setup a windows service that acts as a web server for markdown files. 
At this point I just browse to `http://localhost:8000/CodeCraft/` and browse around the help of each cmdlet

**Browse the cmdlets help**

![Browse the cmdlets help](/assets/images/posts/powershell/2016-06-30-read-module-help-from-browser.Browser.png "Browse the cmdlets help")

**Read the help from the browser**

![Read the help from the browser](/assets/images/posts/powershell/2016-06-30-read-module-help-from-browser.Help.png "Read the help from the browser")
