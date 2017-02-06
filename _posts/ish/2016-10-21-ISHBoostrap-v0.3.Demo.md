---
excerpt: Go over the ISHBootstrap repository changes with the v0.3 pre-release and discuss how to run a simple demo.
tags:
- SDL
- Knowledge Center
- Content Manager
- ISHBootstrap
date: 2016-10-21 15:09:09
categories:
- SDL
- Knowledge-Center
- SDL
- Knowledge-Center
- Content-Manager
- Tips
title: ISHBootstrap v0.3 pre release and easy demo

---



There's much progress regarding the [ISHBootstrap](https://github.com/Sarafian/ISHBootstrap) repository. 
As a reminder the [ISHBootstrap](https://github.com/Sarafian/ISHBootstrap) is an automation repository to bootstrap a default Windows Server installation with a functioning SDL Knowledge Center Content Manager. 

## Improving the work flow of the repository

I started developing this repository as my own pet project and the development was done on the same master branch. 
When the code base matured enough that it could be used by other or demo purposes I ran into the issue of breaking the code for others. 
Because of that the repository now uses the usual git branching model master, develop and feature branches. 

As there is not published deliverable for this repository, I've also started creating release artifacts. 

## ISHBootstrap pre-release v0.3

The latest pre-release is [v0.3](https://github.com/Sarafian/ISHBootstrap/releases/tag/v0.3) and the improvements are focused on 

- Enabling the server to download it dependencies from an FTP server. 
- Antenna House licensing is not considered any more a pre-requisite. Can be updated as often as necessary.

## Working with FTP

Using FTP to download dependencies is big deal because it allows the code to work anywhere. For example

- Azure
- AWS
- My home
- Your server on premise

The only requirement is a FTP account for Knowledge Center and as far as I know all customers get one. 
The only requirement is for your account on SDL's ftp to have the required files available. 

As an example these are the FTP paths I use for a special account I use for development.  

| Dependency | Path |
| ---------- | ---- |
| xISHServer pre-requisites | Download/InfoShare120/ISHServer/ |
| Content Manager 12.0.1 CD | Download/InfoShare120/SP1/20160815.CD.InfoShare.12.0.3215.1.Trisoft-DITA-OT.exe |

At the moment of writing this, my FTP account is the only that can reference the  xISHServer pre-requisites. 
If you want to get access, please communicate to your SDL contact and I'm sure they'll be happy to enhance your SDL account. 
Unfortunately it is out of my control.

## Running a demo

As the next [SDL Connect](http://www.sdl.com/event/sdl-connect/palo-alto/) is soon to become a reality, I wanted to make an easy demo possible. 

My goal was very simple. 
During a live session in [SDL Connect](http://www.sdl.com/event/sdl-connect/palo-alto/) take a Windows Server 2012R2 instance, run a non-interactive process and get a functioning SDL Knowledge Center Content Manager 12.0.1 vanilla with Content Editor enabled. 
Make it as simple as possible so there are no deep technical PowerShell things happening. 
Just a rolling install.

So I created [ISHBootstrapDemo](https://github.com/Sarafian/ISHBootstrapDemo) that is powered by the example structure on [ISHBootstrap](https://github.com/Sarafian/ISHBootstrap). 
Please read more about the example structure in [How to use the repository (Examples)](https://github.com/Sarafian/ISHBootstrap/blob/master/Topics/How%20to%20use%20the%20repository%20(Examples).md).

Here is how it works. 

You need to prepare a JSON file from [ISHBootstrap.json](https://github.com/Sarafian/ISHBootstrapDemo/blob/master/ISHBootstrap.json) and store it on a location that the host can access. 
For example `http://myish.example.com/ISHBootstrap.json`.

```json
{
  "OSUserCredentialExpression": "Get-Variable -Name 'ISHBootstrap.OSUser' -Scope Global -ValueOnly",
  "ISHVersion": "12.0.1",
  "PSRepository": [
    
  ],
  "FTP": {
    "Host": "host",
    "CredentialExpression": "Get-Variable -Name 'ISHBootstrap.FTP' -Scope Global -ValueOnly",
    "ISHServerFolder": "Download/InfoShare120/ISHServer/",
    "ISHCDFolder": "Download/InfoShare120/SP1/",
    "ISHCDFileName": "20160815.CD.InfoShare.12.0.3215.1.Trisoft-DITA-OT.exe"
  },
  "Configuration": [
    {
      "XOPUS": [
        {
          "LisenceKey": "license",
          "Domain": "domain"
        }
      ],
      "ExternalID": "ServiceUser"
    }
  ],
  "ISHDeployment": [
    {
      "Name": "InfoShare",
      "IsOracle": false,
      "LucenePort": 9010,
      "UseRelativePaths": false,
      "Scripts": [
        "ISHDeploy\\Set-ISHCMComponents.ps1",
        "ISHDeploy\\Set-ISHCMMenuAndButton.ps1"
	  ],
      "ConnectionString": "connectionstring"
    }
  ]
}
```  

You only need to adjust the `LisenceKey`, `Domain` and `ConnectionString` according to your operating system and license.

Then execute this script block on the host as an administrator

```powershell
# Specify source for ISHBootstrap.json
$jsonPath="http://myish.example.com/ISHBootstrap.json"

# Download ISHBootstrap.ps1
$scriptUrl="https://raw.githubusercontent.com/Sarafian/ISHBootstrapDemo/master/ISHBootstrap.ps1"
$scriptPath=Join-Path $env:TEMP "ISHBootstrap.ps1"
Remove-Item -Path $scriptPath -Force -ErrorAction SilentlyContinue
Invoke-WebRequest -Uri $scriptUrl -UseBasicParsing -OutFile $scriptPath

# Change the parameter do match your use case
& $scriptPath -JSONPath $jsonPath -PromptCredential
```

There are more options on how to orchestrate the execution on the [ISHBootstrapDemo](https://github.com/Sarafian/ISHBootstrapDemo) repository. 
There are also a couple of conditions to consider before executing.

## The next steps?

There are many things still to do but as the functionality is growing, my main concern is the lack of automation testing for [ISHBootstrap](https://github.com/Sarafian/ISHBootstrap). 
Granted that is not that easy to implement because the flow requires a functioning database, I want to be able to create an automation tests. 
The tests need to execute for the following permutations

- Operating System
  - Windows Server 2012R2
  - Windows Server 2016 (Core)
  - Windows Server 2016 with Desktop Experience 
- Operating system is member of Active Directory
- Content Manager Versions
  - 12.0.0 (Released)
  - 12.0.1 (Released)
  - 12.0.2 (Next service pack and in development)
  - 13.0.0 (Next release and in development)
- Remote and local execution

With what I've already described I'm actually much closer now because

- [ISHBootstrap.ps1](https://raw.githubusercontent.com/Sarafian/ISHBootstrapDemo/master/ISHBootstrap.ps1) from the demo, demonstrates 
  - how to download and execute any branch or release of [ISHBootstrap](https://github.com/Sarafian/ISHBootstrap)
  - use a private JSON to power the sequence
- The [ISHBootstrap](https://github.com/Sarafian/ISHBootstrap) pre-release [v0.3](https://github.com/Sarafian/ISHBootstrap/releases/tag/v0.3) allows execution of ISHBootstrap anywhere as long as there is an FTP to provide the dependencies.

This is my other driver for building the demo repository. 

All the pieces are there I just need a database and some build agents!
