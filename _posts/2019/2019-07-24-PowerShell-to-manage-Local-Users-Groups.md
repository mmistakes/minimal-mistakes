---
layout: single
title: PowerShell to manager Local Users and Groups
subtitle : Add, View, Manage and Remove Local Users and Groups.
tags: [Powershell,Windows,ActiveDirectory]
---
<!--more-->

# Index

* TOC
{:toc}

Here let's see how to manage Windows local group using PowerShell.

Required module is “`Microsoft.PowerShell.LocalAccounts`” look below for available `cmdlets`.

# Find available cmdlets

{% highlight posh linenos %}
Get-Command | Where-Object {$_.source -eq "Microsoft.PowerShell.LocalAccounts"}
{% endhighlight %}

![example1](/img/Posts/ManagelocalusersandGroups/1.png)

Lets use this `cmdlets` we can manager local users and groups.

# Local Users

## List Local Users

{% highlight posh linenos %}
Get-LocalUser
{% endhighlight %}

This help to display all available local users

{% highlight posh linenos %}
Get-LocalUser -Name ad*
{% endhighlight %}

It will list all user names starts with "AD"

## Disable and Enable Local Users

{% highlight posh linenos %}
Disable-LocalUser -Name "testuser"
{% endhighlight %}

Here it will disable "testuser".

{% highlight posh linenos %}
Get-LocalUser test* | Disable-LocalUser
{% endhighlight %}

To disable multiple users starts with "Test", above command help to list all the users starts with "test" and disable them.
For example if local computer has users like "Test1,Test2,Test3,Test4,Test5", with above command you can disable all users at once.

{: .box-warning}
**Warning:** Before running this `cmdlet` make sure you are disabling the requires users, becasue this will disable all accounts starts with "test"

{% highlight posh linenos %}
Enable-LocalUser -Name "testuser"
{% endhighlight %}

Here it will Enable "testuser".

{% highlight posh linenos %}
Get-LocalUser test* | Enable-LocalUser
{% endhighlight %}

To Enable multiple users starts with "Test", above command help to list all the users starts with "test" and Enable them.
For example if local computer has users like "Test1,Test2,Test3,Test4,Test5", with above command you can Enable all users at once.

## Create and Delete Local Users

{% highlight posh linenos %}
$Password = Read-Host -AsSecureString
New-LocalUser "testuser" -Password $Password -FullName "Test User" -Description "This is a Test User"
{% endhighlight %}

Here we are creating a testuser with name,description and providing password as a variable($password). this account does has not expire.
when we does not specify the AccountExpires parameter.the account does not expire.
Check below screenshot for `AccountExpires` parameter [help](https://thewhatnote.com/2019-06-27-PowerShell-GetHelp/).

![example2](/img/Posts/ManagelocalusersandGroups/2.png)

{% highlight posh linenos %}
New-LocalUser -Name "testuser" -Description "This is a Test User" -NoPassword
{% endhighlight %}

This will create a "testuser" account without password and AccountExpire date. Please can be set at later stage lets see how that works.

{% highlight posh linenos %}
$Password = Read-Host -AsSecureString
Set-LocalUser -Name "testuser" -Password $Password
{% endhighlight %}

`Set-LocalUser` help to modify local user accounts.

{% highlight posh linenos %}
Get-Help Set-LocalUser -Parameter *
{% endhighlight %}

Try this command to explore all parameters using [Get-Help](https://thewhatnote.com/2019-06-27-PowerShell-GetHelp/)

{% highlight posh linenos %}
Remove-LocalUser -Name "testuser"
{% endhighlight %}

This delets testuser account.

# Local Groups

## List Local Groups

{% highlight posh linenos %}
Get-LocalGroup
{% endhighlight %}

This help to display all available local Groups

{% highlight posh linenos %}
Get-LocalGroup -Name re*
{% endhighlight %}

It will display all group names starts with "re"

## Create and Delete Local Groups

{% highlight posh linenos %}
New-LocalGroup -Name "testusers"
{% endhighlight %}

This command creates "testusers" local group.

{% highlight posh linenos %}
Remove-LocalGroup -Name "testusers"
{% endhighlight %}

This command removes "testusers" local group.

## Manage Local Groups

{% highlight posh linenos %}
Set-LocalGroup -Name "testusers" -Description "This is for test users."
{% endhighlight %}

Here we are changing description for "testusers" group.
