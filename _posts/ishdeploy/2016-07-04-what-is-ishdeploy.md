---
excerpt: What is PowerShell module ISHDeploy? Code as configuration and automation for SDL Knowledge Center Content Manager deployments.
header:
  overlay_image: /assets/images/posts/ishdeploy/2016-07-04-what-is-ishdeploy.feature.png
tags:
- PowerShell
- ISHDeploy
- SDL
- Knowledge Center
- Content Manager
date: 2016-07-04 13:45:04
categories:
- SDL
- Knowledge-Center
- SDL
- Knowledge-Center
- Content-Manager
title: What is ISHDeploy?

---



On a previous post I shared the announcement of the first pre-release of PowerShell Module [ISHDeploy.12.0.0](http://www.powershellgallery.com/packages/ISHDeploy.12.0.0/) available on PowerShell gallery. 
The source code of the module is available on [SDL GitHub](http://sdl.github.io/) in repository [ISHDeploy](https://github.com/sdl/ISHDeploy/).  
A documentation [portal](https://sdl.github.io/ISHDeploy/12.0.0/Index.html) is also available to get you started, cmdlet online documentation and how to articles.

But what is ISHDeploy to Knowledge Center Content Manager?

## Knowledge Center Content Manager

[SDL Knowledge Center](http://www.sdl.com/cxc/knowledge-delivery/documentation-management-dita/structured-content-management.html) is a well-known and accomplished CMS over DITA. 
As with many mature product lines, it is powered by several services and one of them is Content Manager. 
You may also know this as InfoShare or Trisoft but next to the marketing name we use the code `ISH` to refer to anything specific to the Content Manager services. 
This is where the **ISH**Deploy originates from. 
Future upcoming PowerShell modules for Content Manager will be also prefixed with **ISH**. 

Content Manager has a big legacy for very a open setup with configuration and customization. 
Though many aspects are available through `.xml` files, many other files are of types such as `.ps1`, `.asp` etc. 
Even the '.xml` files can become very complicated as they combine multiple layers into one file.

Although this allows very powerful integrations it also makes deployments difficult. 
It's not easy to implement a deployment yet alone upgrade one or even maintain one. 
With the introduction of Federated services with version 10.0.0, many certificates were added into the mix and that made the situation even more difficult.

## Understanding the problem and the solution

You can approach the subject from many different angles and we had our fair share of discussions about **configuration vs customization** when we were discussing the problem and the solution. 
At the end of the day it all comes down to automation and here is where my role starts.

In order to automate a process you need first to understand it. 
I did my investigations and discussed the issues with many people that represented different angles. 
My angle is simplicity and a Content Manager deployment as anything but that.

It all comes down to this: 
For many different reasons, good or bad, too many modifications are applied on top of the original delivery. 
Those affect core product files but also the DITA files which is by definition customizable. 
When the volume of modifications increases then it becomes very difficult to design delta upgrades. 
To give you an example of how difficult it is, engineering had had several times difficulty with creating upgrade scripts and although there were some gaps left, to my surprise they did an amazing job on such a difficult task. 
And those files were "easy" because they were fully backed by xml versioned schemas and each version is compliant with the executing code.  
The fact that professional engineers with vast experience in XML require a significant time to implement such a transformation is a testimony to how difficult this task is. 
And it becomes even more difficult when other file formats are added to the equation. 
It is virtually impossible.

This is not a problem that Content Manager was the first service ever to face. 
If you notice the trend in the industry, all services are considered what I refer to as **throw away assets**. 
People care about making the service work and they don't care about it when the service needs to be replaced. 
This is something that the virtualization technology has helped to establish, because opposite to a physical server, a Virtual Machine is by definition recyclable. 
Since you really don't care about what happens to all assets on a VM when its deleted, that makes all assets on the VM "throw away". 
Teams who have transitioned to this concept focus more on how to deliver a functioning service of the latest and greatest and not how to update it. 
There is an entire industry developed for seamless service updates on cloud hosted environments and none of them actually modify any existing live tier in the cluster. 
Instead a new upgraded element with the same expected behavior is added to the cluster and little by little the older version ones are replaced by the newer ones. 
Sure the implementation is not that simple as I describe it but the core principal is.

This is where ISHDeploy comes in. 
My angle of simplicity means, not to try solve the difficult problem of implementing and maintaining delta scripts across so many versions with uncontrolled changes.
Instead make it easy to take the latest released version, deploy and configure to satisfy the expected behavior. 
Obviously, automation plays a key role because it can help establish control and confidence.

First we implement this approach on Content Manager but soon enough the rest of the services of Knowledge Center will follow.     

During the last months I've been in lead of this approach. 
Almost everything in this blog up to this moment of time was a byproduct of this thought process. 
Explaining it and laying out the foundation in this blog helps me also better understand the problem.

## Meet ISHDeploy

ISHDeploy is the tooling necessary to implement [code as configuration]({% link _posts/2016-05-17-code-configuration.md %}) for Content Manager deployments. 
I've written about code as configuration on previous posts and it all comes down to describing intention in code. 
When I wrote about the concept on my initial post, ISHDeploy was not available yet to provide relative examples. 
That was very unfortunate but I'm a believer in abstract concepts.

This is my goal. I want to describe the expected behavior of a Content Manager deployment. 
This refers to this highlighted section in "code as **configuration**". 
I also want to automate this intention. 
As a long term goal, I want a trigger to magically convert this configuration into a live deployment. 
For many reasons that have to do with the complexity and diversity of the configuration, we've decided to implement the intention in a script. 
This refers to this highlighted section in "**code** as configuration".

Code as configuration scripts must be simple and clean. They should describe the intention as purely as possible and avoid any kind of noise. 
One of the most important aspects of PowerShell is that its great in describing intention. 
The combination of `Verb-Noun` as a cmdlet name is a very powerful convention to express this, especially when there is alignment on what each verb means. 
Microsoft offers a set of approved verbs but I consider the [page](https://msdn.microsoft.com/en-us/library/ms714428(v=vs.85).aspx) as an agreement of what to expect when you see in code a cmdlet reference. 

Let me give you an example

I want a Content Manager deployment that satisfies the following expectations:

- Content Editor is enabled and licensed.
- A new tab is added in the event monitor.
- The external preview is enabled.
- The system is integrated with a 3rd party security service provider.

I can of coarse read all the documentation provided [online](http://docs.sdl.com/LiveContent/content/en-US/SDL%20Knowledge%20Center%20full%20documentation-v2/GUID-2AB53FDA-E9CB-4D46-A393-EEE6CF256554) and start changing files but I can also do this:

```powershell
#region veriables 
$xopusLicenseKey = "your license key"
$xopusLicenseDomain= "ish.example.com"

#Issuer name
$issuerName="mySTS"
#WS Federation endpoint
$wsFederationUri="https://mysts.example.com/wsfed"
#WS Trust endpoint
$wsTrustUri="https://mysts.example.com/wstrust"
#WS Trust metadata exchange endpoint
$wsTrustMexUri="https://mysts.example.com/wstrust/mex"
#The authentication type
$bindingType="WindowsMixed"
#Token signing thumbprint
$tokenSigningCertificateThumbprint="mysts token signing thumbprint"
$issuercertificatevalidationmode = "None"

#endregion

#region Implementation
# Acquire a deployment
$deployment=Get-ISHDeployment -Name InfoShare

# Enable and license content editor
Set-ISHContentEditor -ISHDeployment $deployment -LicenseKey $xopusLicenseKey -Domain $xopusLicenseDomain
Enable-ISHUIContentEditor -ISHDeployment $deployment

# Create an event monitor tab and move it to first position
Set-ISHUIEventMonitorTab -ISHDeployment $deployment -Label="MyEvent" -Description="Show my events" -EventTypesFilter=@("MyEventType")
Move-ISHUIEventMonitorTab -ISHDeployment $deployment -Label="MyEvent" -First

# Integrate with STS
Set-ISHIntegrationSTSWSFederation -ISHDeployment $deployment -Endpoint $wsFederationUri
# Set WS Trust integration
Set-ISHIntegrationSTSWSTrust -ISHDeployment $deployment -Endpoint $wsTrustUri -MexEndpoint $wsTrustMexUri -BindingType $bindingType

# Set Token signing certificate
Set-ISHIntegrationSTSCertificate -ISHDeployment $deployment -Issuer $issuerName -Thumbprint $tokenSigningCertificateThumbprint -ValidationMode $issuercertificatevalidationmode

#endregion
```

What is really important in this script is the second region **Implementation** because the first is all about the values. 
I added them to give a sense of completeness to the script but there are much better ways to abstract that information away.

What is important is that I now have a script that:

- Describes well my intention. I read `Enable-ISHUIContentEditor` and I immediately understand the intention. I really don't care how `Enable-ISHUIContentEditor` is done. I just need to state my intention.
- It's clean. So code can be read and understood by non-experienced developers.
- It's repeatable. I can execute this script as many times as I want and at the end my intention is what is reflected from the deployment's behavior.

As a bonus I get the following:

- The script can be source controlled. It is code after all.
- I can quickly copy paste code.
- I can validate the script in a development environment. If there was a mistake ISHDeploy will complain.
- I can automate the testing of the script. I can put the script on a CI tool (e.g. Jenkins, Visual Studio Team Services) and validate that my script works.
- I can run the same script on the next version of the Content Manager and get the same result.
- I can easily enhance it as ISHDeploy grows in time, offering more cmdlets.

One of the reasons that we went for **Code** as configuration is because it allows the author of the script to inject other lines between the ISHDeploy cmdlets. 
To give an example, it is possible to acquire most of the STS related information from a Security Token Service. 
It is also possible to configure the Security Token Service just after the last command to close the loop.
Without the **code** format this kind of completeness would have been impossible.

These are advanced features and in time I'll post more examples. 
In the meantime please refer to the documentation [portal](https://sdl.github.io/ISHDeploy/12.0.0/Index.html) for getting started and how to articles.

## Vanilla deployment

Currently the ISHDeploy module works on any customized deployment. 
The supported features are possible to be safe guarded by code but future features will not always have this luxury. 
For this reason we introduced the concept of the **Vanilla** deployment. 
A Vanilla deployment is what you get when installing the out of the box derivable.

On the next version of Content Manager, the installation procedure will be massively simplified because it will aim directly for the Vanilla experience. 
I'll blog about this in the future but you have to keep in mind that the deployment model has changed into this.

1. Install Vanilla. This in the future will be taken care by ISH**Deploy**
1. Execute one or more scripts on the ISH **Deploy**ment.

Its all about the deployment, hence the highlighted segment in the name of the module.

## Purpose of the number in the module name

At this point it should be clear why we chose the name ISHDeploy. 
But the PowerShell module is named ISHDeploy.12.0.0 and not just ISHDeploy. 
`12.0.0` maps to the version of Content Manager. 

This is what you should expect in the future

| Content Manager version | Module name |
| ----------------------- | ----------- |
| 12.0.0 | ISHDeploy.12.0.0 |
| 12.0.1 | ISHDeploy.12.0.1 |
| 12.0.2 | ISHDeploy.12.0.2 |
| 13.0.0 | ISHDeploy.13.0.0 |

Please notice that *12.0.0* is part of the name of the module **ISHDeploy.12.0.0** and not the version. 
Each module version will have its own numbering as we try to provide more and more features. 
Currently only **ISHDeploy.12.0.0** is available but as soon as SDL releases the next patch of Knowledge Center a new module will become available named **ISHDeploy.12.0.1**. 
Once a new major release becomes available then **ISHDeploy.13.0.0** will become also available on the PowerShell gallery.

So why did we brand each module with the Content Manager's version even including the patch? 
Historically Content Manager has released patches that were something more than that. 
When that happens then features change a bit and as coincidence the potential configuration also. 

To summarize this is why we branded the module with the Content Manager version.

- Offer a very clear experience with the module against the Content Manager version you are developing against.
- Script author see and feels only what is possible to the matching version.
- PowerShell makes sure that if a parameter changed in cmdlet the error is raised long before any execution.  

As far as each script is concerned unless the product does not break a feature and the matching cmdlet parameters are valid, the script will run seamlessly. 
And that is how the saga started. We were told to  

> Make the upgrades easier

The only requirement is that the correct module by name is available matching the Content Manager's deployment version.  
If it doesn't then an error will be raised and that increases confidence.

## A gaze into the future

Surely we need to release an proper release. 
Most probably that will happen in the same period as with Knowledge Center 2016 SP1.
That means:

| Content Manager version | Module name | Module version |
| ----------------------- | ----------- | -------------- |
| 12.0.0 | ISHDeploy.12.0.0 | 1.0 |
| 12.0.1 | ISHDeploy.12.0.1 | 1.0 |

The first release will include all of the following: 

- Toggle UI features such as 
  - Content Editor
  - Quality Assistant
  - External editor
  - Event monitor tabs
  - Disable Translation job from the UI
- Security token service integration
  - Execute the integration
  - Maintain the integration by addressing various certificate roll over issues
- Provision the embeded Security Token Service aka ISHSTS
  - Maintain certificates
  - Light weight windows authentication
  - Add 3rd party identifiers
- Several other cmdlets that help
  - Undo-ISHDeployment provides the ability to undo everything to the original Vanilla state. Great for debugging and developing.
  - Get-ISHDeploymentHistory provides the history of the deployment. Great for back tracking what is different from Vanilla.
- General adaptation to make the module remoting friendly.

After version we are still considering the epics for the next milestone. We are considering:

- Metadata configuration for Client Tools and the Web Application aka ISHCM
- Install/Uninstall automation
- Database upgrade automation

In my vision, the module will establish itself as the automation counterpart of what the product offers in terms of configuration even if that becomes available in the UI. 
For those with Amazon Web Services or Azure experience, this is the equivalent of their respected PowerShell modules.

The future is here and I would really appreciate your feedback on ideas. 
Please feel free to ask questions or submit ideas for future posts in the commenting section below.
