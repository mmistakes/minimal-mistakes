---
title: "TelOne Directory Enquiry using PowerShell"
description: ""
category: 
tags: []
---


[TelOne](http://www.telone.co.zw) operates the Plain old telephone service (POTS) in Zimbabwe and provides a handy [web page](http://www.telone.co.zw/search-page) for doing phone number enquiries.
But what if I want to do it in PowerShell or Python? What if I don't want to open a browser and do enquiries?

Meet [cURL](https://technet.microsoft.com/en-us/library/hh849901.aspx) and then stab at the [TelOne enquiry page](http://www.telone.co.zw/search-page) for a minute.
Observe that the website makes a GET request to telpay.co.co.zw with this query string `Directory?term=<subscriber number|name>`.

The image below shows a snapshot of this request in IE with the Developer Tools open. Also observe the Content type returned.

![TelOne GET Request in Browser Developer Tools](/assets/telone_dom.png)


As a result using `curl` or the `Invoke-WebRequest` cmdlet in PowerShell we can grab subscriber details on a phone number OR person name lookup.

{% highlight PowerShell %}
$telone = [System.UriBuilder]::new("https://telpay.co.zw/api/telpay/Directory?term=ngezi")

# InvokeWebRequest
$response = curl $telone.Uri -Method GET
{% endhighlight %}

In the example above we are search for subscriber details for someone with the name `ngezi`.

Running `$response.Content` outputs a string containing the response which in this case is json. Visually inspecting the json you can quickly see the results of an expected query. 


