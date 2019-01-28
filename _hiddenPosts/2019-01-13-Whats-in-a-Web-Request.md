---
title: What's in a Web Request?
excerpt: "Let's take a simple look at web requests using PowerShell"
tags:
- PowerShell
- Invoke-WebRequest
- Invoke-RestMethod
classes: wide
---

## Introduction

PowerShell is the first language that I have worked with web requests in. I had a fun journey learning more about it and ran into a couple of gotchas along the way. This post will attempt to document what I've learned and hopefully help you avoid some of the same mistakes that I did.

## Using Webhook.Site

[webhook.site](https://webhook.site) is a site that provides you a url. All requests sent to that url are logged and available for inspection. You can also use fiddler to look at the raw requests as well. This is particularly useful if you are troubleshooting an issue.

## Invoke-WebRequest with Webpages

When you type a website into your browser's address bar and press enter


## Related Links

- [https://www.w3schools.com/tags/ref_httpmethods.asp](https://www.w3schools.com/tags/ref_httpmethods.asp)

- [https://poshsea.blogspot.com/2018/07/when-tls-12-break-invoke-webrequest.html](https://poshsea.blogspot.com/2018/07/when-tls-12-break-invoke-webrequest.html)

- [https://robrich.org/slides/anatomy_of_a_web_request/#/](https://robrich.org/slides/anatomy_of_a_web_request/#/)