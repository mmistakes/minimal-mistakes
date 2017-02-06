---
excerpt: 
header:
  overlay_image: http://media.tumblr.com/tumblr_lgahz0tmNB1qbolbn.jpg
tags:
- PowerShell
- Remote
date: 2016-07-05 14:26:42
title: PowerShell remoting caveats

---



I've mentioned a couple of times that the remoting functionality of PowerShell is just amazing. 
If I would summarize in one sentence then 

> It has never been easier to execute complex instructions on a remote server without logging into the box.

PowerShell remoting is engineered on top of the existing Windows Remoting sub system and therefore it inherits the same limitations.

Before I go over about these limitation lets first acknowledge the following to help with the rest of the text. 
I've a remote server e.g. `SERVER01` on which I've installed [WcfPS](https://www.powershellgallery.com/packages/WcfPS/). 
I've blogged about [WcfPS]({% link _posts/powershell/2016-06-07-wcfps.md %}) on an earlier post so read please more about the module there. 
I'm just going to use this as an example that is not easily found on a normal system.

Now, let's take a look into some of the important caveats.

## Awareness of where a command executes

For example lets assume that I plan to use the WcfPS module on the remote server like this. 

```powershell
$block= {
    $wsImporter=New-WcfWsdlImporter -Endpoint $svcEndpoint -HttpGet
    $proxyType=$wsImporter | New-WcfProxyType
    $endpoint=$wsImporter | New-WcfServiceEndpoint -Endpoint $svcEndpoint
}
Invoke-Command -ComputerName SERVER01 -ScriptBlock $block
``` 

All cmdlets `New-WcfWsdlImporter`, `New-WcfProxyType`, `New-WcfServiceEndpoint` and `New-WcfChannel` are offered from the WcfPS PowerShell module and are executed on the remote `SERVER01`. 
Of coarse `SERVER01` needs to have the module installed. 
I really don't need the WcfPS module installed on my system unless I want to help my authoring experience with intellisense. 
PowerShell offers code intellisense capabilities by probing inside all available modules and their exported cmdlets. 
This is a very nice feature but you have to watch out because what you see in your local system doesn't necessary map to what is available on each remote server. 
You are not even guaranteed to work against the same PowerShell version.

The point here, that you always need to be aware where a script block executes.

## Not everything as it looks

If you execute this block locally and remotely you will see the same result
```powershell
$block= {
    $wsImporter=New-WcfWsdlImporter -Endpoint $svcEndpoint -HttpGet
    $proxyType=$wsImporter | New-WcfProxyType
    $endpoint=$wsImporter | New-WcfServiceEndpoint -Endpoint $svcEndpoint

    $endpoint
}
```

`Invoke-Command -ScriptBlock $block` returns the following obfuscated result

```text
Address           : uri
EndpointBehaviors : {}
Behaviors         : {}
Binding           : System.ServiceModel.Channels.CustomBinding
Contract          : System.ServiceModel.Description.ContractDescription
IsSystemEndpoint  : False
Name              : CustomBinding_Application1
ListenUri         : uri
ListenUriMode     : Explicit
```

`Invoke-Command -ComputerName SERVER01 -ScriptBlock $block` returns the following obfuscated result

```text
PSComputerName    : SERVER01
RunspaceId        : 1b038c54-93ab-404b-a668-3056824e7c6f
Address           : uri
EndpointBehaviors : {}
Behaviors         : {}
Binding           : System.ServiceModel.Channels.CustomBinding
Contract          : System.ServiceModel.Description.ContractDescription
IsSystemEndpoint  : False
Name              : CustomBinding_Application1
ListenUri         : uri
ListenUriMode     : Explicit
```

But if you look closely then the return object types are different.

```powershell
"Remote returned type: "+(Invoke-Command -ComputerName MECULAB12001 -ScriptBlock $block).GetType().Name
"Local returned type: "+(Invoke-Command -ScriptBlock $block).GetType().Name
```

returns

```text
Remote returned type: PSObject
Local returned type: ServiceEndpoint
```

What PowerShell did behind the scenes was to analyze the properties of `ServiceEndpoint` and create a mimic based on `PSObject`. 
It looks the same but it’s not. 
For this very reason implicit import of WcfPS would not work.

```powershell
Import-Module WcfPS -PSSession (New-PSSession SERVER01)
$wsImporter=New-WcfWsdlImporter -Endpoint $svcEndpoint -HttpGet
$proxyType=$wsImporter | New-WcfProxyType
$endpoint=$wsImporter | New-WcfServiceEndpoint -Endpoint $svcEndpoint
```

What will trully happen is that `New-WcfProxyType` expects a specific type of object and `$wsImporter` is of `PSObject`. 
Here is the error

```
The input object cannot be bound to any parameters for the command either because the command does not take pipeline input or the input and its properties do not match any of the parameters 
that take pipeline input.
    + CategoryInfo          : InvalidArgument: (System.ServiceM...on.WsdlImporter:PSObject) [New-WcfProxyType], ParameterBindingException
    + FullyQualifiedErrorId : InputObjectNotBound,New-WcfProxyType
    + PSComputerName        : MECULAB12001
```    

The point here is that you need to know what is the actual return type of a cmdlet if you are planning to use it as a return value from `Invoke-Command`. 
If it is not a basic type e.g. `string`, `int` etc then implicit `Import-Module` will not work and you will probably have to limit processing the value within a script block. 
This is very important because when developing locally everything seems to work but if you intend to execute remotely then you should consider first this limitation.

## Single and double hop

This is something that is only a problem when the target servers are part of Windows Active Directory and Kerberos is responsible for authorization. 
To help visualize, I've lent some pictures from the internal PowerPoint slide deck that I've created.

Here is a simple script

```powershell
$scriptBlock={
    #Do something
}
Invoke-Command -ComputerName SERVER01 -ScriptBlock $block
```

It really depends what we want to execute in the script block. 
Let's see three distinct representative cases 

### Single hop

The script accesses only local resources. 
`Get-ChildItem` is a good example and it looks like this 

![Remoting with single hop](/assets/images/posts/powershell/2016-07-05-remoting-caveats.single-hop.png "Remoting with single hop")

### Double hop (No Kerberos)

The script accesses external resources and that adds the addition (double) hop.
`((new-object net.webclient).DownloadString($uri))` is a good example of this case. 
As long as the the external resource `$uri` is accessed without dependencies to Kerberos then it looks like this

![Remoting with double hop without kerberos](/assets/images/posts/powershell/2016-07-05-remoting-caveats.double-hop-without-kerberos.png "Remoting with double hop without Kerberos")

### Double hop (With Kerberos)  

In the previous example if there was a proxy with windows authentication or the script executed something like this `Get-ChildItem \\Server02\c$` then we would have a problem. 
This is almost the same as before but the request to the external assets is very different because it embeds Kerberos authorization. 
This is not something we can control and its inherited by the Windows Active Directory ecosystem. 
Microsoft has for many years disallowed by design such double hops for security reasons. 
Imagine for example that a web server gets hacked and code injection tries to access external resources while executing under the IIS application pool identity. 
It looks like this

![Remoting with double hop with kerberos](/assets/images/posts/powershell/2016-07-05-remoting-caveats.double-hop-kerberos.png "Remoting with double hop with Kerberos")

It is possible to overcome this by using secure WinRM but it is fairly complicated I'll leave skip this until another post.  
If you are still looking for a solution, then the keyword to search for is `CredSSP`.
