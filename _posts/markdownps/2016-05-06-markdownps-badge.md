---
excerpt: Render badges with PowerShell MarkdownPS and shields.io
header:
  overlay_image: http://shields.io/logo.svg
tags:
- PowerShell
- MarkdownPS
date: 2016-05-06 15:49:35
categories: Tips
title: Shields.io badges with powershell MarkdownPS

---



In my previous post [MarkdownPS](/post/markdownps/markdownps/) I explained the basic cmdlets of the PowerShell module [MarkdownPS](https://www.powershellgallery.com/packages/MarkdownPS/).

[Shields.io](http://shields.io/) provides many interesting badges out of the box, but there is also an API that can be used to render any badge.
```
https://img.shields.io/badge/<SUBJECT>-<STATUS>-<COLOR>.svg
```
The above just renders  ![](https://img.shields.io/badge/%3CSUBJECT%3E-%3CSTATUS%3E-%3CCOLOR%3E.svg)

On version 1.4 of the [MarkdownPS](https://www.powershellgallery.com/packages/MarkdownPS/) a new parameter set was added to the `New-MDImage` cmdlet to drive this api.
```powershell
New-MDImage -Subject "<SUBJECT>" -Status "<STATUS>" -Color red
```
Renders

```markdown
![](https://img.shields.io/badge/%3CSUBJECT%3E-%3CSTATUS%3E-red.svg)
```

The produced url in the image is url encoded. The parameter `-Color` accepts only values that the shields.io API allows.

| Color                                                               | Badge                                                               |
| ------------------------------------------------------------------- | -------------------------------------------------------------------:|
| brightgreen                                                         | ![](https://img.shields.io/badge/Color-brightgreen-brightgreen.svg) |
| green                                                               | ![](https://img.shields.io/badge/Color-green-green.svg)             |
| yellowgreen                                                         | ![](https://img.shields.io/badge/Color-yellowgreen-yellowgreen.svg) |
| brightgreen                                                         | ![](https://img.shields.io/badge/Color-brightgreen-brightgreen.svg) |
| yellow                                                              | ![](https://img.shields.io/badge/Color-yellow-yellow.svg)           |
| orange                                                              | ![](https://img.shields.io/badge/Color-orange-orange.svg)           |
| red                                                                 | ![](https://img.shields.io/badge/Color-red-red.svg)                 |
| lightgrey                                                           | ![](https://img.shields.io/badge/Color-lightgrey-lightgrey.svg)     |
| blue                                                                | ![](https://img.shields.io/badge/Color-blue-blue.svg)               |

To make a badge clickable then use the `-Link` parameter like this
```powershell
New-MDImage -Subject "example.com" -Status "OK" -Color green -Link "https://example.com"
```
> [![](https://img.shields.io/badge/example.com-OK-green.svg)](https://example.com)
