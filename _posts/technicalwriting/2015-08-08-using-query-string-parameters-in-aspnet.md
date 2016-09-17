---
title: "Using Query String Parameters in ASP.NET"
excerpt: &excerpt "Technical writing sample explaining the basic usage of 
query string parameters in ASP.NET, including a code sample."
category: technicalwriting
author_profile: false
related: false
share: false
image: 
  teaser: 
  thumb: 
tags: [technical writing]
fullwidth: true
featured: 
---

_Before reading..._

* _Target Audience:_ This reference document targets developers with beginner 
to intermediate experience, whom are familiar with Microsoft .NET and web 
development. 
* _Scenario:_ I provide an overview of query string parameters, how they’re 
used in ASP.NET, and a scenario that explains how to use them, including a 
code sample. 
* _Sources:_ I wrote 100% of the content, including code samples, without 
an editor providing input. The information was obtained through my own 
experience, a few RFCs and Microsoft documentation on MSDN and TechNet.

_...and here's the sample._

---

When developing a web application, you often have scenarios that require 
input from users. Or you might need to pass information from one part of 
your application to another, such as between html pages or aspx web forms. 
Perhaps you need to process a name, address, product name, a combination 
of these things, or many others. Using a Query String parameter is a simple 
and efficient manner of communicating this information.

1. [Overview](#overview-of-query-strings) 
2. [How to use them in ASP.NET](#how-to-use-query-strings-in-aspnet) 
3. [Scenario](#scenario) 
4. [Code sample](#code-sample) 
5. [Summary](#summary) 
6. [Further resources](#further-resources)

## Overview of query strings ##

The query string is part of the Uniform Resource Locator 
([URL](https://en.wikipedia.org/wiki/Uniform_resource_locator)) in the 
browser address field. Query string parameters are tagged on to the end 
of the URL address, following a question mark (?). The parameters consist 
of field-value pairs, which contain the attribute and its value. In the 
following example, the __bold__ portion is the query string.

&nbsp;&nbsp;&nbsp;&nbsp; http://www.yourcompany.com/products**?product=widget**

The key components to the query string are:

&nbsp;&nbsp;&nbsp;&nbsp; __?__ &ndash; The question mark tells the web app to expect the string 
parameters 

&nbsp;&nbsp;&nbsp;&nbsp; __Field__ &ndash; The attribute name, which usually describes the value 
it contains (__product__ in the preceding example).

&nbsp;&nbsp;&nbsp;&nbsp; __Value__ &ndash; The value assigned to the field (__widget__ in the 
preceding example)

Multiple parameters may be submitted by separating them with an ampersand 
(&), like so:

&nbsp;&nbsp;&nbsp;&nbsp; http://www.yourcompany.com/products**?product=widget&location=seattle**

Here’s a sample using a search for “do you feel lucky” at Google.com:

&nbsp;&nbsp;&nbsp;&nbsp; [https://www.google.com/search?**q=do%20you%20feel%20lucky**](https://www.google.com/search?q=do%20you%20feel%20lucky)

The __?__ tells Google to expect a query string; the __q=__ provides the 
name of the field, and __do%20you%20feel%20lucky__ is the value for the field.

__Note:__ &nbsp; %20 is the [URL encoded](https://en.wikipedia.org/wiki/Percent-encoding) 
value for a space character, as seen in the example of “do you feel lucky”

According to [RFC 7230 Section 3.1.1](http://tools.ietf.org/html/rfc7230#section-3.1.1) 
(Hypertext Transfer Protocol – HTTP/1.1), there is no limitation to how many 
characters can be used in an URL. Given that standard, there is no limit 
to the number of query strings that can be submitted. Realistically though, 
the different browsers and web servers impose practical limitations, not 
covered in this article.

## How to use query strings in ASP.NET ##

Query strings are processed in [Microsoft .NET](http://www.microsoft.com/net) 
using the [QueryString Property](https://msdn.microsoft.com/en-us/library/system.web.httprequest.querystring.aspx) 
of the [HttpRequest Class](https://msdn.microsoft.com/en-us/library/system.web.httprequest(v=vs.110).aspx). The QueryString Property is a [NameValueCollection](https://msdn.microsoft.com/en-us/library/system.collections.specialized.namevaluecollection.aspx), 
which means that like an array, it can be referenced by the field name or 
position. For example:

&nbsp;&nbsp;&nbsp;&nbsp; http://www.yourcompany.com/products**?product=widget&location=seattle**

The contents, or value, of the __product__ field may be referenced either of these two ways:

* _By name:_ `Request.QueryString[“product”]`

* _By position (zero [0] based):_ `Request.QueryString[0]`

## Scenario ##

Going a little further into how to use this with .NET, imagine that you 
want to use the values of __product__ and __location__ to see if a product 
is in stock at a specific warehouse. The user would select their product 
and preferred pickup location from drop-down lists on your web page. When 
they click submit, it would open a link to a URL, like the following.

&nbsp;&nbsp;&nbsp;&nbsp; http://www.yourcompany.com/warehouse?product=widget&location=seattle

This URL takes them to a page called ‘warehouse,’ which will tell them 
if the product is available for pickup at that location. In your web 
application, the C# code behind ‘warehouse’ would have a method called 
CheckQueryStrings, as shown in the following code sample. The method reads 
the query strings and submits a request to the business layer of your app.

## Code sample ##

```csharp
1  private void CheckQueryStrings()
2  {
3      if (!Request.QueryString.Count.Equals(0))
4      {
5          string productName = Request.QueryString["product"];
6          string warehouseLocation = Request.QueryString["location"];
7          if (!string.IsNullOrEmpty(productName) && !string.IsNullOrEmpty(warehouseLocation))
8          {
9              CheckAvailability(productName, warehouseLocation);
10         }
11         else
12         {
13             MessageBox.Show("Please select a product and warehouse location.");
14         }
15     }
16 }
```

_Line 3_ &ndash; Verifies that query string parameters were submitted by 
checking the length of the collection.

_Lines 5 & 6_ &ndash; Create and populate string variables for the product 
and location query strings.

_Line 7_ &ndash; Before taking action on the query strings, verifies they 
are not null or empty.

_Line 9_ &ndash; The query strings contain characters, call the method 
CheckAvailability. Presumably, this method would live in the business 
layer of your application. It would handle the business logic of the 
request, calling into the data layer of your application to retrieve the 
results and process them.

_Line 13_ &ndash; The query strings do not contain characters, are null 
or empty, then show a dialog box to the user.

## Summary ##

In this document, you’ve learned how to use query string parameters in 
ASP.NET with the following benefits.

* The ability to use multiple query strings in a single URL, allows you to 
scale easily with the demands of your web application. Although, keep in 
mind that browsers and web servers have limitations in overall URL lengths.

* Handling query string parameters in the C# code behind your ASP.NET pages 
is straightforward; allowing you to use the information throughout your web 
application.

As you can see, query string parameters are a simple and efficient method 
of communicating information throughout your web application.

### Further resources ###

* [Microsoft .NET](http://www.microsoft.com/net) Information 
    * [HttpRequest Class](https://msdn.microsoft.com/en-us/library/system.web.httprequest(v=vs.110).aspx) 
    * [NameValueCollection](https://msdn.microsoft.com/en-us/library/system.collections.specialized.namevaluecollection.aspx) 
    * [QueryString Property](https://msdn.microsoft.com/en-us/library/system.web.httprequest.querystring.aspx) 
    * [String.IsNullOrEmpty](https://msdn.microsoft.com/en-us/library/vstudio/system.string.isnullorempty(v=vs.100).aspx) 
* [Percent encoding](https://en.wikipedia.org/wiki/Percent-encoding) as described at WikiPedia 
* [Query String](https://en.wikipedia.org/wiki/Query_string) as described at WikiPedia 
* [RFC 7230 Section 3.1.1](http://tools.ietf.org/html/rfc7230#section-3.1.1) (Hypertext Transfer Protocol – HTTP/1.1) 
