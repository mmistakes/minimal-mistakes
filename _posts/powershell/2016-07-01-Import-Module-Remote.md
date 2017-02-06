---
excerpt: Consume a module installed on a remote server. Develop clean Code as configuration scripts that target remote servers.
tags:
- PowerShell
- Remote
date: 2016-07-01 09:41:28
categories: Tips
title: Import and use module from a remote server

---



When I try to create scripts for [code as configuration]({% link _posts/2016-05-17-code-configuration.md %}) I've faced the following dilemma.

Let's assume that I have a module available on my system named `PSMyModule` and it offers three cmdlets:

- `Set-MyFirstObject`
- `Set-MySecondObject`
- `Get-MyStatus`

When I develop my script against my local environment then I have this script 

```powershell
Set-MyFirstObject
Set-MySecondObject
Get-MyStatus
```

The above fragment will automatically load the `PSMyModule` and execute well. 
This is very nice and clean and if I put the dummy module name and cmdlets into context with [code as configuration]({% link _posts/2016-05-17-code-configuration.md %}) then the fragment is still compliant. 

But in many cases I want to run this block on one or more remote servers. 
The obvious solution would be to wrap each segment into a script block and then execute them remotely using `Invoke-Command`. 

For example 
```powershell
$scriptBlock= {
    Set-MyFirstObject
    Set-MySecondObject
    Get-MyStatus
}

Invoke-Command -ComputerName SERVER01 -ScriptBlock $scriptBlock
```

At the point the script has extra noise and it gets even worse when you need to feed parameters in each cmdlet. 
There is also the noise of conditionally executing `Invoke-Command` depending on if `-ComputerName` is `$null`. 
I've discussed all of these issues and more in a previous post [Enhanced Invoke-Command for local and remote execution]({% link _posts/powershell/2016-06-17-enhanced-invoke-command.md %}). 
In that post I've suggested an enhanced cmdlet [Invoke-CommandWrap](https://gist.github.com/Sarafian/a277cd64468a570dff74682eb929ff3c) that hides many of the problems. 

As good as it gets with  `Invoke-CommandWrap` the script will still look like this 
```powershell
$scriptBlock= {
    Set-MyFirstObject
    Set-MySecondObject
    Get-MyStatus
}

Invoke-CommandWrap -ComputerName SERVER01 -ScriptBlock $scriptBlock -BlockName "PSMyModule"
```

If the script does only this then it is ok, but as the script will grow with more and more functionality, it will start breaking compliance with the concept of [code as configuration]({% link _posts/2016-05-17-code-configuration.md %}). 
For this reason I started thinking that it would be nice if we could wrap every cmdlet with a proxy that abstracts away the remote call. 
The script would hypothetically look like this:

```powershell
$computerName="SERVER01"

# Uncomment for local development
$computerName=$null

Set-MyFirstObject  -ComputerName $computerName
Set-MySecondObject -ComputerName $computerName
Get-MyStatus -ComputerName $computerName
```

This is nice, clean and if the proxy could work with nullable values fed to the `-ComputerName` then the remoting noise would become significantly less. 
I searched a lot about this and I couldn't find a nice solution. I've even raised a question on stackoverflow [Dynamically create a cmdlets/module in PowerShell](https://stackoverflow.com/questions/38075571/dynamically-create-a-cmdlets-module-in-powershell). 
At the end I really missed an out of the box feature of PowerShell which it is not very well known. 
I want to first discuss the wrong path  because there are a couple of interesting things worthwhile referencing from this experience. 
If you are not interested please jump to the [correct solution](#Correct).

## Creating manually a remote module proxy [WRONG]

This was my goal

```powershell
Import-ModuleRemote -ComputerName SERVER01 -Module PSMyModule
```

Once this was executed, my session would know about the PSMyModule cmdlets. 
Each cmdlet's would drive the code intelisense with parity to the original parameters with the addition of `-ComputerName` and `-Session`. 
I'm experienced with .NET and I've worked with reflections and expression trees since they were first introduced.  
Since PowerShell is shell on top of .NET, I though similar functionality exists. 
I researched both online and I also used [ILSpy](http://ilspy.net/) (.NET assembly browser/decompiler) and Visual Studio Object explorer to browse the code of `System.Management.Automation.dll`. 
As a reminder this assembly is the core assembly for PowerShell. 
After a while I landed to the following not well known subjects:

- [Dynamic Parameters in PowerShell](http://www.powershellmagazine.com/2014/05/29/dynamic-parameters-in-powershell/): In short they allow a cmdlet to dynamically add parameters to their execution. This felt I was in the right direction.
- PowerShell MetaProgramming. This is discussed in [Extending and/or Modifying Commands with Proxies](https://blogs.msdn.microsoft.com/powershell/2009/01/04/extending-andor-modifing-commands-with-proxies/) and I have to say this is amazing. I felt i was getting somewhere.
- [CodeCraft](http://www.powershellgallery.com/packages/CodeCraft/1.0) PowerShell module. This is the only module tagged with either of `CodeGeneration` or `MetaProgramming` tags. I tracked the module from older PowerShell posts and it built before wide adoption of github. Its documentation is poor but since Microsoft added the `Show Files` feature in the gallery, looking into the code is easy and helped a lot.

For the history I managed to crank up these two scripts cmdlets. I'll repeat here that **this is the wrong path** but I'll still quote the code just in case someone finds them useful.

**Get-RemoteProxyScripts**
```powershell
function Get-RemoteProxyScripts {
    Param (
        [Parameter(Mandatory=$true)]
        [string]$Module,
        [Parameter(Mandatory=$true,ParameterSetName='ComputerName', Position=0)]
        [ValidateNotNullOrEmpty()]
        [string[]]$ComputerName,
        [Parameter(Mandatory=$true,ParameterSetName='Session', Position=0)]
        [ValidateNotNullOrEmpty()]
        [System.Management.Automation.Runspaces.PSSession[]]$Session,
        [Parameter(Mandatory=$false)]
        [string]$Suffix=$null

    )
    Begin {
        $proxyGeneratorBlock = {
            param( 
                [Parameter(Mandatory=$true)]
                [ValidateNotNullOrEmpty()]
                [string]$Module,
                [Parameter(Mandatory=$false)]
                [string]$Suffix=$null
            ) 

            if($PSSenderInfo)
            {
                $DebugPreference=$Using:DebugPreference
                $VerbosePreference=$Using:VerbosePreference
            }
            try
            {
                Write-Debug "Extract command metadata from Invoke-Command"
                [System.Management.Automation.CmdletInfo]$invokeCmdletInfo=Get-Command Invoke-Command

                Write-Debug "Extract parameter metadata for ComputerName"
                $computerNameParameterMetadata=New-Object System.Management.Automation.ParameterMetadata $invokeCmdletInfo.Parameters["ComputerName"]
                $parameterSetNamesToRemove=$computerNameParameterMetadata.ParameterSets.Keys|Where-Object {$_ -ne "ComputerName"}
                $parameterSetNamesToRemove | ForEach-Object {
                    Write-Debug "Remove parameter metadata set of $_ from ComputerName"
                    $computerNameParameterMetadata.ParameterSets.Remove($_)
                }
                Write-Verbose "ComputerName parameter metadata is ready"

                Write-Debug "Extract parameter metadata for Session"
                $sessionParameterMetadata=New-Object System.Management.Automation.ParameterMetadata $invokeCmdletInfo.Parameters["Session"]
                $parameterSetNamesToRemove=$sessionParameterMetadata.ParameterSets.Keys|Where-Object {$_ -ne "Session"}
                $parameterSetNamesToRemove | ForEach-Object {
                    Write-Debug "Remove parameter metadata set of $_ from Session"
                    $sessionParameterMetadata.ParameterSets.Remove($_)
                }
                Write-Verbose "Session parameter metadata is ready"


                Write-Debug "Get command from module $module"
                $commands=Get-Command -Module $Module
                if(-not $commands)
                {
                    throw "$Module module not found"
                }
                Write-Verbose "Creating proxies for $($commands.Name)"

                $proxyScripts=@()
                $commands | ForEach-Object {
                    Write-Debug "Process $_.Name"
                    $newCommandMetadata=New-Object System.Management.Automation.CommandMetadata $_

                    if($Suffix)
                    {
                        $newCommandMetadata.Name+="Proxy"
                        Write-Verbose "New Proxy name is $($newCommandMetadata.Name)"
                    }

                    if($newCommandMetadata.Parameters.Count -gt 0)
                    {
                        foreach($newParameterMetadata in $newCommandMetadata.Parameters.Values)
                        {
                            if($newParameterMetadata.ParameterSets.Count -eq 0)
                            {
                                #This is a parameter without parameter set. We don't need to modify it
                                continue;
                            }
                            if($newParameterMetadata.ParameterSets.ContainsKey("__AllParameterSets"))
                            {
                                #This is a common parameter
                                continue;
                            }
                            if(-not ($newParameterMetadata.ParameterSets.ContainsKey("ComputerName")))
                            {
                                Write-Debug "Add parameter set ComputerName to $($newParameterMetadata.Name)"
                                $newParameterMetadata.ParameterSets.Add("ComputerName",$computerNameParameterMetadata.ParameterSets["ComputerName"])
                            }
                            if(-not ($newParameterMetadata.ParameterSets.ContainsKey("Session")))
                            {
                                Write-Debug "Add parameter set Session to $($newParameterMetadata.Name)"
                                $newParameterMetadata.ParameterSets.Add("Session",$sessionParameterMetadata.ParameterSets["Session"])
                            }
                            Write-Verbose "Enhanced parameter sets for $($newParameterMetadata.Name)"
                        }
                    }

                    $newCommandMetadata.Parameters.Add("ComputerName",$computerNameParameterMetadata)
                    $newCommandMetadata.Parameters.Add("Session",$sessionParameterMetadata)
                    Write-Verbose "Added new parameter ComputerName,Session to $($newCommandMetadata.Name)"

            
                    $definition=" 
function $($newCommandMetadata.Name) { 
    $([Management.Automation.ProxyCommand]::GetCmdletBindingAttribute($newCommandMetadata)) 
    param( 
        $([Management.Automation.ProxyCommand]::GetParamBlock($newCommandMetadata)) 
    ) 
     
    begin { 
    } 
    process { 
        `$lineToExecute=`$psCmdlet.MyInvocation.MyCommand.Name

        foreach(`$kvp in `$psCmdlet.MyInvocation.BoundParameters.GetEnumerator()) 
        {
            if(`$kvp.Key -eq `"ComputerName`")
            {
                continue
            }
            if(`$kvp.Key -eq `"Session`")
            {
                continue
            }
            `$lineToExecute+=`" `"
            `$value=`$kvp.Value

            `$lineToExecute+=`"-`$(`$kvp.Key) `"
            
            if(`$value -is [Switch])
            {
                continue;
            }

            if(`$value -is [bool])
            {
                `$lineToExecute+=`"``$`$value`"
            }
            elseif(`$value -is [int])
            {
                `$lineToExecute+=`"`$value`"
            }
            elseif(`$value -is [string])
            {
                `$lineToExecute+=`"```"`$value```"`"
            }

            throw New-Object System.ArgumentException `"Parameter with type `$(`$value.GetType()) is not supported`"
            
        }

        `$scriptBlock=[ScriptBlock]::Create(`$lineToExecute)
        switch (`$psCmdlet.ParameterSetName) {
            ComputerName {
                Invoke-Command -ComputerName `$ComputerName -ScriptBlock `$scriptBlock
            }
            Session {
                Invoke-Command -Session `$Session -ScriptBlock `$scriptBlock
            }
        }
    } 
    end { 
    } 
}"
                    $proxyScript=New-Object PSObject
                    $proxyScript |Add-Member @{Name=$newCommandMetadata.Name}
                    $proxyScript |Add-Member @{Definition=$definition}
                    Write-Verbose "Script for $($newParameterMetadata.Name) generated"
                    $proxyScript
                }
            }
            catch 
            {
                throw
            }
            finally
            {
        
            }
        }
    }

    Process {
        try {
            $arguments=@(
                $Module
            )
            if($Suffix)
            {
                $arguments+=$Suffix
            }
            switch ($psCmdlet.ParameterSetName) {
                ComputerName {
                    Invoke-Command -ComputerName $ComputerName -ScriptBlock $proxyGeneratorBlock -ArgumentList $arguments
                }
                Session {
                    Invoke-Command -Session $Session -ScriptBlock $proxyGeneratorBlock -ArgumentList $arguments
                }
            }        
        }
        catch
        {
            throw
        }

    }


    End {
    }

}
```

**Import-ModuleRemote**
```powershell
function Import-ModuleRemote {
    Param (
        [Parameter(Mandatory=$true)]
        [string]$Module,
        [Parameter(Mandatory=$true,ParameterSetName='ComputerName', Position=0)]
        [ValidateNotNullOrEmpty()]
        [string[]]$ComputerName,
        [Parameter(Mandatory=$true,ParameterSetName='Session', Position=0)]
        [ValidateNotNullOrEmpty()]
        [System.Management.Automation.Runspaces.PSSession[]]$Session
    )
    Begin {

    }

    Process {
        switch ($psCmdlet.ParameterSetName) {
            ComputerName {
                $proxyScriptBlocks=Get-RemoteProxyScripts -ComputerName $ComputerName -Module $Module
            }
            Session {
                $proxyScriptBlocks=Get-RemoteProxyScripts -Session $Session -Module $Module
            }
        }
        $proxyScriptBlocks |Where-Object -Property Name -NE $null |ForEach-Object {
            try {
                $definition=$_.Definition
                $name=$_.Name
                Write-Debug "Import $name with defintion"
                Write-Debug $definition
                $ExecutionContext.InvokeCommand.InvokeScript($definition)
                Write-Verbose "Imported $name"
            }
            catch
            {
                Write-Error "Error when importing $_.Name"
            }
        }
    }


    End {
    }

}
```

`Get-RemoteProxyScripts` returns a collection of cmdlet names and their proxy definition. 
`Import-ModuleRemote` will then execute each and import the cmdlet into the session. 
When I stopped the effort I couldn't get the cmdlets to import but I believe that would be an easy fix around this line `$ExecutionContext.InvokeCommand.InvokeScript($definition)`. 
The hardest problems I had to face were :

- Working the PowerShell reflection equivalent types, such as `System.Management.Automation.ParameterMetadata` and `System.Management.Automation.CommandMetadata`. Please be aware that all instances returned when probing a cmdlet are by reference and they will modify the definition in your session.
- Trying to generate the line to create a script block to power the `Invoke-Command`. Not an easy task to keep parity. That part is also left incomplete.

Again **this is the wrong path** because while searching how to render the line to execute, I run into the correct out of the box feature of PowerShell.

## Windows PowerShell: Implicit Remoting {#Correct}

When I read [Remoting the Implicit Way](https://blogs.technet.microsoft.com/heyscriptingguy/2013/09/08/remoting-the-implicit-way/) I felt such an idiot. 
Really it is as simple as this script:

```powershell
$session=New-PSSession SERVER01
Import-Module PSMyModule -Session $session

Set-MyFirstObject
Set-MySecondObject
Get-MyStatus
```     

First of all let me say that it does exactly what my originally goal was. It's even better because if the script is adapted a bit, then script segment becomes even more clean:

```powershell
$computerName="SERVER01"

# Uncomment for local development
$computerName=$null

if($computerName)
{
    $session=New-PSSession SERVER01
    Import-Module PSMyModule -Session $session
}

Set-MyFirstObject
Set-MySecondObject
Get-MyStatus
```

The cherry on the cake is that if remove the session e.g. `Remove-PSSession $session` and then execute e.g. `Get-MyStatus` PowerShell we'll reestablish one. 

Once again PowerShell surprises me to what it offers for remoting. As far as I'm concerned, remoting is the strongest and most important feature that PowerShell offers. 
In all my years as a developer, I've never seen something so profound and powerful to address remote management. 
Simply **mind blowing!**

At this point I was curious how its done. Sure I've wasted a day pursuing the wrong path but I was still curious about the magic. 
So I did this
```powershell
$session=New-PSSession SERVER01
Import-Module PSMyModule -Session $session
$module=Get-Module MyPSModule
$module.Definition
```  

The code looks a lot with is described in [Extending and/or Modifying Commands with Proxies](https://blogs.msdn.microsoft.com/powershell/2009/01/04/extending-andor-modifing-commands-with-proxies/).  
I've also followed the a similar path in the `Get-RemoteProxyScripts`. 
By looking into the defintion I've also figured out how to solve the issue I had with generating the line to execute. 
From the generated code here is a small of how they do it:

```powershell
$positionalArguments = & $script:NewObject collections.arraylist
foreach ($parameterName in $PSBoundParameters.BoundPositionally)
{
    $null = $positionalArguments.Add( $PSBoundParameters[$parameterName] )
    $null = $PSBoundParameters.Remove($parameterName)
}
$positionalArguments.AddRange($args)

$clientSideParameters = Get-PSImplicitRemotingClientSideParameters $PSBoundParameters $False
```

It really helps with if you have deep knowledge of what each type in `System.Management.Automation` assembly does.
