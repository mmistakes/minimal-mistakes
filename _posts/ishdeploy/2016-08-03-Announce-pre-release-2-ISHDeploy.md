---
excerpt: Announcing pre release version 0.2 for SDL Knowledge Center 2016 Content Manager
tags:
- PowerShell
- ISHDeploy
- SDL
- Knowledge Center
- Content Manager
date: 2016-08-03 13:22:57
categories:
- SDL
- Knowledge-Center
- SDL
- Knowledge-Center
- Content-Manager
title: ISHDeploy pre-release version 0.2 is available

---



The second **pre-release** version for **ISHDeploy.12.0.0** PowerShell module is now available

- [PowerShell Gallery](http://www.powershellgallery.com/packages/ISHDeploy.12.0.0/)
- [Documentation portal](https://sdl.github.io/ISHDeploy/12.0.0/)
- Release artifact on [github](https://github.com/sdl/ISHDeploy/releases/tag/0.2) and code

With the new items in this release you can in total:

- Toggle UI features such as Content Editor, Quality Assistant, External Preview, Translation Job and Event Monitor tabs.
- Integrate with an ADFS or another compliant 3rd party STS
- Configure ISHSTS for Window Light Weight Authentication **[New]**
- Configure ISHSTS’s relying parties **[New]**
- Certificate roll overs. Among many options the most characteristic are
    - Single certificate vanilla deployment **[New]**
    - STS token signing certificate
    - Service certificate thumbprint **[New]**

- Reset ISHSTS **[New]**

All above have an backing article

## Known issues

- `Set-ISHSTSConfiguration` is not working. You can’t do light weight windows authentication
- `Get-ISHDeployment | ForEach-Object {}` doesn’t work as Frank Closset figured out in the workshop
- Anything else that others find during the workshop

## Where to reach out for feedback and questions?

- Bellow in the comments
- On the github [repository](https://github.com/sdl/ISHDeploy/)
