---
layout: post
title: Get-Help is a friend
subtitle : Yeah seriously its your friend..!!
tags: [Powershell,Basic]
---
<!--more-->

# Index

* TOC
{:toc}

When I started PowerShell in 2012, I'm not aware that powershell has this great command (in PowerShell we call them as `cmdlet` ”command-let”) for help..SURPRISED..!! If you ask me, I should say begin learning powershell with this cmdlet. This will help you with almost every cmdlet available out there in powershell.

Let's get started, `Get-Help` followed a command displays the provided command help information.

Let's use `Get-Help` against `Get-Help` and find out how this works.

## Basic synatax (Get-Help Get-Help)

{% highlight posh linenos %}
    Get-Help Get-Help
{% endhighlight %}

![example1](/img/Posts/Gethelp/GetHelp1.PNG)

It helps you with syntax,description,related links,remarks.

## Help with Parameters

{% highlight posh linenos %}
    Get-Help Get-Help -Parameter *
{% endhighlight %}

![example2](/img/Posts/Gethelp/GetHelp2.PNG)

This helps to display all parameters available with the `cmdlet`.

## For Examples

{% highlight posh linenos %}
    Get-Help Get-Help -examples
{% endhighlight %}

![example3](/img/Posts/Gethelp/GetHelp3.PNG)

This helps to display examples about the provided `cmdlet` and tell us how to use `cmdlet`. don't miss to check it.

## Online Help

{% highlight posh linenos %}
    Get-Help Get-Help -Online
{% endhighlight %}

This will kick off your default web browser with detailed online help page.

## Full and Detailed

{% highlight posh linenos %}
    Get-Help Get-Help -full
    Get-Help Get-Help --Detailed
{% endhighlight %}

These commands helps with more detailed information.

## Should try `showwindow`

{% highlight posh linenos %}
    Get-Help Get-Help -ShowWindow
{% endhighlight %}

![example9](/img/Posts/Gethelp/GetHelp9.PNG)

This will pop-out complete help in a window and best about this is you can search any word in this.
Don't miss to check it out.

## Other ways to use Get-Help

{% highlight posh linenos %}
    Help Get-Help
    Get-Help -?
{% endhighlight %}

![example4](/img/Posts/Gethelp/GetHelp4.PNG)

![example5](/img/Posts/Gethelp/GetHelp5.PNG)

These are the otherways to access PowerShell `Get-Help`.

# Help for anything

Think and anything and put it towards `Get-Help`.
for example -- format, operator, comparison
`Get-Help` will find all the available options in PowerShell.

{% highlight posh linenos %}
    Get-Help operator
{% endhighlight %}

![example6](/img/Posts/Gethelp/GetHelp6.PNG)

{% highlight posh linenos %}
    Get-Help about_operator
{% endhighlight %}

![example7](/img/Posts/Gethelp/GetHelp7.PNG)

{% highlight posh linenos %}
    Get-Help format
{% endhighlight %}

![example8](/img/Posts/Gethelp/GetHelp8.PNG)

Here you can see towards every available command is Categorized and respective module information is also available.

Like this we can put across any word in your mind towards `Get-Help`, it will find solution for you.
get used to this `cmdlet` soon. then you can learn powershell more easily.

# Parameters I use most

{% highlight posh linenos %}
    -examples
    -parameter
    -online
    -showwindow
{% endhighlight %}

These parameters make my life more easy with PowerShell and `-showwindow` helps a lot, you can search anything easily.
