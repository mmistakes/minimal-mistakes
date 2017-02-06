---
date: 2016-05-17 11:48:41
title: code as configuration
header:
  overlay_image: /assets/images/posts/2016-05-17-code-configuration.jpg
excerpt: 'Code as configuration: A discipline to describe intention and not technical implementation.'

---



If you are reading this page, then **code as configuration** should not be a term strange to you. 
If you are a software engineer, then most probably you've heard about it from the **Jenkins DSL**, from **PowerShell Desired State Configuration (DSC)** or from other similar concepts such as **Infrastructure as code** etc.

I want to approach the subject from a different angle. An angle that it's essence is captured in this expression 

> ![picture is worth a thousand words](/assets/images/posts/2016-05-17-code-configuration.a-picture-is-worth-a-thousand-word.jpg "picture is worth a thousand words")
>
> [A picture is worth a thousand words](https://en.wikipedia.org/wiki/A_picture_is_worth_a_thousand_words)

## Code configuration is dense and accurate information

If a picture is worth a thousand words then in my opinion, code as configuration is worth another thousand.

For most people code is related with some sort of application development, at least in the traditional meaning. Some people write code, then it gets "compiled" and then you get a functioning program.
From this point on we deploy or install the application and then configure or customize it to our needs. This is expected to be of manual effort.  

Depending on the application, this process varies from a simple install to a very complicated and error prone process. 
Even describing the process is not easy and very often leads to a confusion between what is configuration and what is customization?

If you think about it, isn't this why we started using computers? I believe the first application was to automate repetitive tasks that it would take a human years to accomplish with a possible error destroying many man-days of effort. 

Besides the benefits of automation, a code fragment brings a couple of benefits to the table

- The strict structure of code supports more dense information than a paragraph or words.  
- The expectation of functioning code translates into a more accurate context.

This is very similar to the density and accuracy of information that a mathematical formula represents. 

## Code configuration describes intention

Not every language is built though in favor of information density. Application programming languages like e.g. C# are typically not.

But **PowerShell** is definitely one of them. 
The main reason is the cmdlet `Verb-Noun` structure where the verb should be one of the [Approved Verbs for Windows PowerShell Commands](https://msdn.microsoft.com/en-us/library/ms714428%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396).
Set aside the concept of approval, the important bit is that each verb establishes a specific expectation. The suggested approved verbs act as an implicit manual on how to choose a verb when building a cmdlet. 
People who have read PowerShell best practices guidelines, have also this knowledge and have expectations. Therefore there is an established bi-directional set of expectations when defining or reading a cmdlet's name. 
For example for `Set`

> Replaces data on an existing resource or creates a resource that contains some data.  

I believe that the syntax `Verb-Subject` can fully describe intention. The parameters of the cmdlet are supplementary to the definition of the intention. 
For example somebody wants to instruct me to register in the Antwerp town hall. In terms of human communication that would be easy and a lot would be implied but still even in the simplest form of communication this person fully defines the following intentions:

- Set a location 
- Find a building
- Register a person

These in terms of PowerShell cmdlets would be represented by 
```powershell
Set-Location -City Antwerp -Country Belgium
Find-Building -Government -Service Townhall
Register-Person  
```

And this is one of the most important aspects of code configuration. Describe intention and not the details of how its done. Nothing in this context explain how to register, what papers are required, when is the town hall open etc.. 
That is something of a bureaucracy which it this level is not interesting, not relevant and to be honest just noise.

## Code configuration helps with UI configuration

From a different angle, code configuration can help a lot with abstracting technical debt. Writing and reading PowerShell scripts denotes intention. 
As long as the script is focused and clear, then even for people without PowerShell knowledge, the script should be a good indicator of the intention. 

As long as you can code your configuration in a script, then you are talking about configuration because the cmdlets are owned by the same entity as with the product.
It really doesn't matter if behind the scenes, files were modified even in the context of customization, from the scripts perspective it is still configuration.
This is also a good exercise to the engineering teams because something as open as multiple files is now represented in one line of code. Just the mental process changes the attitude over the problem. 
Getting to one line, as simple as it sounds, is a similar exercise of creating a simple UI configuration.   

## Code configuration, do it again and again

As long as we are talking about **code** configuration, code is meant to be executed multiple times. 
To keep the code simple and help describe clearly intention, the code should avoid too much of the programming syntactical assets. 
PowerShell's cmdlet `Verb-Noun` structure is great for this purpose as long as it remains the primary asset in the script.

To put this into perspective the above PowerShell fragment should not become like
```powershell
if($currentCountry -ne "Belgium")
{
    if( $currentCity -ne "Anterp")
    {
        Set-Location -City Antwerp -Country Belgium
    }
}
Find-Building -Government -Service Townhall
Register-Person  
```

For those not comfortable with PowerShell, `-ne` means not equals.

`Set-Location` should work independently of my current location. As the verb **Set** implies, I need to set the location. If I'm already there, then that is great. If I'm not then I'll go there. 
In all cases it didn't have any effect on the intention that is in the simplest terms:

> Be in the city Antwerp of country Belgium.

## Code configuration to upgrade systems

In this context, intention is always relevant to the application it applies to. More specifically, intention is relevant to the version of an application. 
As long as the application supports a certain functionality and the fundamental principals have not been altered between versions, then the intention remains valid.
For example an intention that applies on the file system is not compatible when the functionality is moved to a database. But it can be valid if the dependent files are split from one to ten as the product evolves.

Therefore, describing intention with code configuration is a bit the same as a user clicking in the same location on the UI. 
As long as the action is applicable among version, the user doesn't care primarily because he doesn't know. Same principal applies for scripts for code configuration.

If you wouldn't adapt your documentation or you wouldn't change the UI, then most probably the intention will be fully future compatible.

A script like this will always register a person with the city of Antwerp. 

```powershell
Set-Location -City Antwerp -Country Belgium
Find-Building -Government -Service Townhall
Register-Person  
```
It really doesn't matter, if the town hall moved or if the clerk changed. The script and the intention to register is valid. 
But if the government of Belgium changes its policies and for example it does not require registrations, then the script might become invalid.
Even when something changes, most probably it didn’t change completely and that would reflect in a small adaptation of the code.

As with any process, change is not usually the first order of business. Getting the job done is.

Code configuration is the mental discipline that is required to efficiently describe and execute on what makes every user or customer unique to your product, either be application or service.
