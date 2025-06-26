---
title: "Return an Array from PowerAutomate to PowerApps (Split Method without Premium)"
date: 2022-05-23
permalink: "/article/powerplatform/2022/05/23/return-an-array-from-powerautomate-to-powerapps-split-method/"
updated: 2025-06-26
categories:
  - Article
  - PowerPlatform
excerpt: "Basically, there are already some posts and videos on this topic. However, I would like to point out a great post incl. app for generating the function by Brian Dang. A comprehensive guide to returning arrays from PowerAutomate to PowerApps without premium connectors."
header:
  overlay_color: "#2dd4bf"
  overlay_filter: "0.5"
  teaser: https://lehmann.ws/wp-content/uploads/2022/05/etma65lrc.png
toc: true
toc_sticky: true
tags:
  - PowerApps
  - PowerAutomate
  - PowerPlatform
  - Arrays
  - Split Method
  - No Premium
---

![Array Split Method](https://lehmann.ws/wp-content/uploads/2022/05/etma65lrc.png){: .align-center}

Basically, there are already some posts and videos on this topic. However, I would like to point out a great post incl. app for generating the function. (by [Brian Dang](https://powerapps.microsoft.com/en-us/blog/author/brdang/))

You can find the complete tutorial under this link:
[https://powerapps.microsoft.com/en-us/blog/return-an-array-from-a-sql-stored-procedure-to-powerapps-split-method/](https://powerapps.microsoft.com/en-us/blog/return-an-array-from-a-sql-stored-procedure-to-powerapps-split-method/)

Below you will find a shortened version.
As already written, [Brian Dang](https://powerapps.microsoft.com/en-us/blog/author/brdang/) has not only provided a detailed tutorial for us in the linked post but also a downloadable PowerApp to generate the code.

**Download the App**: [https://aka.ms/splitarray](https://aka.ms/splitarray)

**UPDATE 11.2022**: Since a while there is also a direct solution to Parse JSON in the PowerApps. The main thing is, that this solution is an experimental feature and could have massive bugs. ([Link](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-parsejson))
{: .notice--warning}

## Preparation in the flow (PowerAutomate)

![Flow Preparation Step 1](https://acomblogimages.blob.core.windows.net/media/PowerApps/Audrie/blog%20-%20stored%20proc%207.png){: .align-center}

![Flow Preparation Step 2](https://acomblogimages.blob.core.windows.net/media/PowerApps/Audrie/blog%20-%20stored%20proc%204.png){: .align-center}

![Flow Preparation Step 3](https://acomblogimages.blob.core.windows.net/media/PowerApps/Audrie/blog%20-%20stored%20proc%205.png){: .align-center}

## Parsing the Array in PowerApps

Open an existing app or create a blank one to test out your flow.

As mentioned before, you can download an [app for generating a formula](https://aka.ms/splitarray) that can split the text string from Flow back into an array.

### Steps to use the Array Generator App

1. Open another instance of the Power Apps Studio
2. Click File, then Open
3. Browse for the msapp file that you downloaded

When the app opens, fill out the text boxes with details for your app:

- **Name of your flow**: include single quotes if your flow's name would require them
- **Name of text field returned from flow**: the name of the field you chose in the last step of your flow
- **Name of variable for flow response**: the name of a variable that will be receiving the string from the flow
- **Name of collection for records**: the name of the collection that will be the array you use throughout the app
- **Delimiter from join**: the delimiter you chose for the Join step in your flow

Click '+ New column' to add the column names in your app. Use the drop down menu beside each column to determine its type. This tool is limited to only strings, numbers, and Boolean values.

## Key Benefits

- **No Premium Connectors Required**: This method works with standard PowerApps and PowerAutomate
- **Automated Code Generation**: Brian Dang's app generates the necessary code for you
- **Flexible Data Types**: Support for strings, numbers, and Boolean values
- **Scalable Solution**: Works with arrays of various sizes

## Alternative: ParseJSON (Experimental)

Since November 2022, PowerApps includes an experimental ParseJSON function that can handle JSON data directly. However, be aware that this is still an experimental feature and may contain bugs.

Learn more about ParseJSON: [Microsoft Documentation](https://learn.microsoft.com/en-us/power-platform/power-fx/reference/function-parsejson)

---

*Original tutorial and app created by [Brian Dang](https://powerapps.microsoft.com/en-us/blog/author/brdang/) from the Microsoft PowerApps team.*


