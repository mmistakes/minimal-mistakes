---
date: 2016-05-13 15:33:44
title: CertificatePS
tags:
- PowerShell
- CertificatePS
excerpt: Small PowerShell module to enhance certificate management

---



[CertificatePS](https://www.powershellgallery.com/packages/CertificatePS/) is a very small PowerShell module that provides two cmdlets:

- `Get-CertificateTemplate`
- `New-DomainSignedCertificate`

They could have been gists or just scripts, but I chose to package them in a module because I really love the convenience package repositories offer in terms of versioning and deployment.

The github repository is [here](https://github.com/Sarafian/CertificatePS/). 

`Get-CertificateTemplate` takes a `System.Security.Cryptography.X509Certificates.X509Certificate2` instance and outputs the template name. 
By default, the template is not accessible as a property on the `X509Certificate2` .net type. The cmdlet is a written based on [these](https://social.technet.microsoft.com/Forums/ie/en-US/187698d0-5602-4301-9d0c-85e89d948ea2/user-powershell-to-get-the-template-used-to-create-a-certificate) discussions.
The certificate can be piped into the `Get-CertificateTemplate`. For example

```powershell
Get-ChildItem cert:\LocalMachine\My | Get-CertificateTemplate
```

`New-DomainSignedCertificate` requests and issues a certificate from the domain certificate authority. This only works with the Active Directory ecosystem. 
The cmdlet is in fact a wrapper around multiple invocations of `certreq.exe`
The cmdlet is a written based on [these](http://serverfault.com/questions/670160/how-can-i-create-and-install-a-domain-signed-certificate-in-iis-using-powershell).
The cmdlet needs the certificate authority. If you don't know it then execute `certutil` in a command line and copy the value of the line **config**.
 
Here is an example for hostname `example.com`. The hostname will be the common name in the issued certificate.
 
```powershell
New-DomainSignedCertificate -Hostname "example.com" -CertificateAuthority ""
```

The cmdlet will automatically generate a friendly name combining the date and hostname. e.g. `20160513.example.com`. 
You can explicitly control this value from the `-FriendlyName` parameter. You can also have more control on the data of the certificate by using the optional parameters.

- `Organization`
- `OrganizationUnit` 
- `Locality`
- `State`
- `Country`
- `Keylength`

Parameter `-workdir` controls where the intermediate files are generated.
