---
title: Using Invoke-WebRequest to return upcoming MMA events
excerpt: "Let's look at a simple example of using Invoke-WebRequest to return upcoming MMA events from whenarethefights.com"
tags:
- PowerShell
- Invoke-WebRequest
classes: wide
toc: true
---

When I began using PowerShell I recall seeing some awesome stuff being done with `Invoke-WebRequest`. After seeing the output of `Invoke-WebRequest` I quickly became overwhelmed and moved onto a different task. The output may seem a bit overwhelming at first, but once you know what to look for it starts to become more managable.

## Goal

Our goal is to create a function that will query [whenarethefights.com](https://whenarethefights.com). I love watching MMA events, and I rarely miss a UFC event. There are also events by other promotions that I don't want to miss. Hopefully the function that we create will help me ensure that I'm aware of all upcoming events, without having to leave my favorite console!

## Invoke-WebRequest

`Invoke-WebRequest` is a command that will send a web request and output the parsed results. Your browser sends web requests and renders the html that is returned. We don't have the benefit of being able to render html in PowerShell, so we have to be creative.

### Sending a Web Request

```powershell
Invoke-WebRequest -Uri 'https://www.whenarethefights.com/'
```

The output contains several properties that have been created for us. These include Statuscode, StatusDescription, Content, RawContent, Forms, Headers, Images, InputFields, and Links. We are interested in the Links property.

### Parsing the Web Request

```powershell
$request = Invoke-WebRequest -Uri 'https://www.whenarethefights.com'
# view the 1st link
$request.links.innertext[1]
```

```text
LFA 75: Lamson vs. Estr?zulas

00days

10hours

15minutes

Sat Sep 7th 9:00:00 PM EDT
```

It looks like all of the relevant information is there.

Now all that's left is to parse the text and output an object.

## Get-MMAEvent Function

<script src="https://gist.github.com/AndrewPla/5397c72f596233c2c923362d928e6a2c.js"></script>
