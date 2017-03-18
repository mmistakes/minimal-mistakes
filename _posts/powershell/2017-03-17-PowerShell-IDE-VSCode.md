---
title: Using Visual Studio Code for PowerShell Development   
tags: PowerShell
excerpt: Visual Studio Code for PowerShell looks like the replacement IDE of PowerShell ISE.
header:
  overlay_image: https://4sysops.com/wp-content/uploads/2016/05/Installing-the-VSCode-PowerShell-extension.png
---

When working with PowerShell there seems to be a very limited set of options to use as an IDE:

- **PowerShell ISE** that is a light weight multi tab editor. In practice the ISE was nothing more than some PowerShell scripts utilizing classic Win32 and .NET (`System.Windows.Forms`) to generate UI on top of one PowerShell session.
- **Microsoft Visual Studio** that is a heavy weight editor and feels to much to use just for scripting. 

They both share a common problem. They are not cross-platform compatible which goes against the cross-platform goal of PowerShell 6. 

Over the years Microsoft has developed an alternative to Visual Studio with cross platform support known as **Visual Studio Code**, in short **VSCode**. The team developing PowerShell 6 seems to have a made choice to use VSCode as their new IDE for PowerShell. There have been plans for a better ISE but even if one was developed and released it would still work only on Windows. I perfectly understand their decision although I find my self often not liking the look and feel of VSCode.

VSCode is very light weight and by itself doesn't do much besides being a notepad editor with some git support. All additional functionality is made available by extensions and with PowerShell that extension is [ms-vscode.PowerShell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell). There is much more information on [Using Visual Studio Code for PowerShell Development](https://github.com/PowerShell/PowerShell/blob/master/docs/learning-powershell/using-vscode.md) but as a quick start:

1. Open VSCode.
1. Press `Ctrl+P` to and enter `ext install powershell`.
1. Restart.

What do you get or lose when working with VSCode in comparison with ISE?

- Multiple independent terminals where each maps to an independent powershell session.
  - This is very important because when working with ISE the session is one per ISE windows and to reset it you need to restart ISE itself which is not good as you need open files again and make sure you don't lose temporary files.
  - With VSCode you just kill the terminal process and start a new one. If you actually open [ProcessExplorer](https://technet.microsoft.com/en-us/sysinternals/processexplorer.aspx?f=255&MSPPError=-2147217396) you will notice a process for each terminal.
- Reloading of files when changed from external actors e.g. notepad or explorer.
  - This is standard with VSCode and a **very much missing** feature of ISE for a very long time as it often leads to loss of work and even worse to bugs when working with multiple ISE windows.
- Working with a folder.
  - PowerShell files are scripts and more than often a folder is the root of your project.
- Git support.
  - For many, a big gap with ISE. For me not that important as I always use other tools that are more powerful. But still a nice feature to have.
- Edit other files with their own syntax highlighting, for example markdown.
{: .notice--success}

- No probing yet for modules and cmdlets.
  - This was offered by ISE with the **Commands** add-on. Sad but not a disaster as you can always keep an ISE open for probing. On a different platform though it's much more important.
{: .notice--danger}

In general, the extension is not yet complete. I haven't used it myself on daily basis but I plan to because I see potential. As with many tools in development, when you decide there is potential, you just need to dive in and maybe help improve the tool with feedback.
{: .notice--warning}