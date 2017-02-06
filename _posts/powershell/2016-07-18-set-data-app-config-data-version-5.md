---
date: 2016-07-18 15:42:32
title: AppDomain SetData for APP_CONFIG_FILE on PowerShell v5.0
tags: PowerShell
excerpt: Powershell v5.0 behavior difference to v4.0 for [System.AppDomain]::CurrentDomain.SetData(\"APP_CONFIG_FILE\",$configPath)

---



If in your scripts you are trying to set your own configuration file for the `AppDomain` then most probably you have a line of code similar to this

```powershell
[Void][reflection.assembly]::LoadWithPartialName("System.Configuration")
[System.AppDomain]::CurrentDomain.SetData("APP_CONFIG_FILE", $configPath)
```

Then you would access an app setting like this

```powershell
[System.Configuration.ConfigurationManager] ::AppSettings[$settingName]
```

If the script consumes functionality from an assembly that drives its configuration form section or sectiongroup then it will be loaded from the file ` $configPath`.

But with PowerShell v5.0 such a script doesn't work without any warning. 
You notice this because all returned values from the configuration are empty.

It turns out that the configuration file is loaded before execution of the script. 
This behavior is different between v4.0 and v5.0. 
When not using pure PowerShell cmdlets but direct .NET code, then you always have to be careful about cross version compatibility especially if the .NET code references the AppDomain and Assembly .NET types. 
In terms of .NET, the configuration is initialized with the default file before the line that changes the target file. 
Therefore it returns empty values as non are defined in the default file.

To fix the issue reset the internal state of the .NET pipeline.

```powershell
[Configuration.ConfigurationManager].GetField("s_initState", "NonPublic, Static").SetValue($null, 0)
```

With this command the next command that will access the configuration will force a load from the `$configPath`.

The code looks like this

```powershell
[Void][reflection.assembly]::LoadWithPartialName("System.Configuration")
[System.AppDomain]::CurrentDomain.SetData("APP_CONFIG_FILE", $configPath)
[Configuration.ConfigurationManager].GetField("s_initState", "NonPublic, Static").SetValue($null, 0)
[System.Configuration.ConfigurationManager]::AppSettings[$settingName]
```

Many thanks to the following that found or suggested the solution

- [German Syroezhkin]() who did the internal investigation.
- [Using CurrentDomain.SetData(“APP_CONFIG_FILE”) doesn't work in PowerShell ISE](http://stackoverflow.com/questions/13420545/using-currentdomain-setdataapp-config-file-doesnt-work-in-powershell-ise)
- [How to load config file in PowerShell?](http://blog.andersdissing.com/2013/11/how-to-load-config-file-in-powershell.html)

While browsing online some people suggested to do more. 
If the above doesn't work then try the following

```powershell
[Configuration.ConfigurationManager].GetField("s_initState", "NonPublic, Static").SetValue($null, 0)
[Configuration.ConfigurationManager].GetField("s_configSystem", "NonPublic, Static").SetValue($null, $null)
[Configuration.ConfigurationManager].Assembly.GetTypes() | where {$_.FullName -eq "System.Configuration.ClientConfigPaths"})[0].GetField("s_current", "NonPublic, Static").SetValue($null, $null)
```
