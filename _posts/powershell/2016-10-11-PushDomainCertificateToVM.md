---
date: 2016-10-11 15:51:40
title: Bootstrap VM with certificates issued by your active directory certificate authority
tags: Powershell
excerpt: On most professional environments, there is an active directory certificate authority. Use it to bootstrap a VM with certificates issued by this free service.

---



For the requirements of my job, I need a certificate not only for the HTTPS. 
That means that the product I work for doesn't function without a proper certificate. 

We often use the active directory certificate issuer to bootstrap our own workstations and test servers through IIS and as a manual step. 
As I'm all about automation, I needed a better method one that can put on any VM certificates issued by the company's certificate issuer. 
This must work independently from whether the  target operating system is joined in the same active directory. 
When it is not, then the operating system cannot request certificates so I need to use my own host to issue a certificate. 
Then i simply need to move it to the target VM.


I wrapped this functionality in [CertificatePS](https://www.powershellgallery.com/packages/CertificatePS/) PowerShell module. 
Here is an example that 

1. Issues a certificate from the certificate authority.
1. Moves it to the remote operating system using PowerShell remoting.

```powershell
$vmName="vmname"
$credential=Get-Credential -Message "Local administrator on $vmName"
$certificateAuthority="certificateAuthority"

#Issue the certificate on my local operating system
$certificate=New-DomainSignedCertificate -Hostname $vmName -CertificateAuthority $certificateAuthority 

# Move the issued certificate to the remote operating system using PowerShell remoting
$certificate | Move-CertificateToRemote -ComputerName $vmName -Credential $credential -PfxPassword $credential.Password -MoveChain
```

To validate the certificate execute on the remote operating system the following

```powershell
Get-ChildItem Cert:\LocalMachine\My\ |Test-Certificate
```
