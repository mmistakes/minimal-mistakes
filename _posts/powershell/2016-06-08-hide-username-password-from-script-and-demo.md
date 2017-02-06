---
date: 2016-06-08 11:10:21
title: hide username password from script and demo
tags: PowerShell
excerpt: Hide username/password from scripts. Safely do demos without worrying about revealing credentials. Automate scripts that require credentials.

---



In many cases a cmdlet or some internal functionality requires access to the values of username and password. 
Often the mistake is made to promote username and password as parameters for a cmdlet instead of working with the `PSCredential` object. 
`PSCredential` stores the password as `SecureString` and hides its value when working with the console. 
Therefore the `PSCredential` is a good container to store credentials while maintaining the ability to safely demo and share your scripts.

If a `$credential` was created by `Get-Credential` then extract the username and password like this 
```powershell
$credential=Get-Credential
$networkCredential=$Credential.GetNetworkCredential();
$username=$networkCredential.UserName
$password=$networkCredential.Password
``` 

With this ability you simply let the $credential object flow from scripts to cmdlets. When necessary the required values are extracted and put into use.

A slight problem is that `Get-Credential` will always prompt for at least a password. This is not a problem for sharing scripts but it is a problem in demos and for automation. 
What I do is to wrap the credential in cmdlet that is loaded from my profile script. This cmdlet needs access to my password in SecureString format.

So I first create the file
```powershell
$securePath=Join-Path $env:USERPROFILE "MySecurePassword.$env:COMPUTERNAME.txt"
(Get-Credential -Message "Generate MySecurePassword.txt" -UserName $env:USERNAME).Password | ConvertFrom-SecureString | Out-File $securePath
```

Now that the file is available I use this cmdlet
```powershell
function New-MyCredential
{
    $securePath=Join-Path $env:USERPROFILE "MySecurePassword.$env:COMPUTERNAME.txt"
    $secureString=Get-Content $securePath | ConvertTo-SecureString
    return New-Object System.Management.Automation.PSCredential("$env:USERDOMAIN\$env:USERNAME",$secureString)
}
```

Finally, I add the cmdlet to my PowerShell and PowerShell ISE profile by importing the file
```powershell
. "$PSScriptRoot\New-MyCredential.ps1"
Write-Host "New-MyCredential"
``` 

With my profile configured I can always execute `$credential=New-MyCredential` in my console or from a script. 

Some interesting remarks to keep in mind:

- `New-MyCredential` works for my active directory domain user.
- I add `Write-Host "New-MyCredential"` in the end of **New-MyCredential.ps1** to notify myself about this cmdlet.
- The `MySecurePassword.txt` can be used only from the computer that last saved it. I've not looked yet in how to centralize this.
- With some small adaptations you can create multiple cmdlets for other commonly used users. e.g. `New-AdminCredential`
