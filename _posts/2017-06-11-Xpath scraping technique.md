---
Layout: post
Author_profile: true
Tags: 'AD, Powershell, XPath'
date: '2017-11-06'
published: true
---
Today i tackled a daily inconvenience of my own.
When i need to call an employee, I use Active Directory as a source to find the phone number.
Now you can type in the name in Outlook and look for it, but i find this too cumbersome.
We also have this great tool called Lansweeper. It's a network-inventory tool that scan's your network and keeps everything up to date (inventory wise).

Lansweeper has a connection with Active Directory, so i could find the user's phone number here as well.
But again that's too slow and cumbersome.

So i first started this idea with a small simple script almost a year ago.

```javascript
function Get-phone {
    [cmdletbinding()]
    param(
             [parameter(ValueFromPipeline=$True,ValueFromPipelineByPropertyName=$True)]
             [string[]]$user
    )
    begin{}
    process
	{
        if($user -match "[0-9]"){
            $payload = Get-ADUser -Filter "SamAccountName -eq '$user'" -SearchBase "OU=workers,OU=Account,OU=Company,OU=Departments,DC=domain,DC=com" -prop TelephoneNumber, Mobile, MobilePhone,Description,mail,givenname,pobox   | Select Name, SamAccountName, Mobile, MobilePhone, TelephoneNumber,Description,POBox| sort Name
            $payload
            get-fromlansweeper($user) # Explained later in the article
        }
        else{
            $payload = get-aduser  -LDAPFilter "(name=*$user*)" -SearchBase "OU=workers,OU=Account,OU=Company,OU=Departments,DC=domain,DC=com" -prop TelephoneNumber, Mobile, MobilePhone , Description,mail,POBox | Select Name,SamAccountName,Mobile, MobilePhone, TelephoneNumber,Description,POBox | sort Name
            $payload
        }
    }
    end{}
}
```
So this basically means that if you **know** the SamAccountName, it will retrieve the following attributes:
- Name
- SamAccountName
- Mobile
- MobilePhone
- TelephoneNumber
- Description
- POBox

Some of these values are self-explanatory but some aren't. POBox is used as an internal reference code, some users forget them so it's easy to add it to the list for a quick retrieval.
The description holds the department for which the user works.

Else, if you **don't know** the SamAccountName, you can look for the normal name like "Jan" or "Matthews".

So running the code :
```javascript
 Get-phone SamAccountName
 ```
 Would get you:

```javascript
 Name            :  Smith John
SamAccountName  :  smjxyz
Mobile          :  (089) / 636-48018
MobilePhone     :  (089) / 636-48018
TelephoneNumber :  (089) / 636-48018
Description     :  Marketing
POBox           :  012345
 ```
 Obviously, this isn't real data but you get the idea.

 Now, this was cool and useful, but when i wanted to remotely help them, i often still had to go to Lansweeper to see on what workstation he/she was working.

 So i decided to create a new function that scrapes the data i want from our local hosted Lansweeper webserver and show that along with the previously mentioned data.
 I decided to use HTMLAgilityPack in combination with *XPath*. A technique i have not used very much since i only recently discovered it's existence.

### Problem : Windows authentification

 The first and biggest problem i ran into, was the fact that Lansweeper uses Windows-Authentication.
 The authentication  is based on the membership of an Active Directory group.

 So when i started my scraping, i was getting "Unauthorized" messages.

 There is some documentation that exist, but none that i could find that related to Powershell.
 So the resources i've used were the following:

- [https://msdn.microsoft.com/en-us/library/system.net.webclient.usedefaultcredentials(v=vs.110).aspx](https://msdn.microsoft.com/en-us/library/system.net.webclient.usedefaultcredentials%28v=vs.110%29.aspx)
- [https://forums.asp.net/t/2027997.aspx?HtmlAgilityPack+Stuck+trying+to+understand+HtmlWeb+Load+NetworkCredential](https://forums.asp.net/t/2027997.aspx?HtmlAgilityPack+Stuck+trying+to+understand+HtmlWeb+Load+NetworkCredential)
- [https://msdn.microsoft.com/en-us/library/system.net.webclient.usedefaultcredentials.aspx](https://msdn.microsoft.com/en-us/library/system.net.webclient.usedefaultcredentials.aspx)
- [https://stackoverflow.com/questions/571429/powershell-web-requests-and-proxies](https://stackoverflow.com/questions/571429/powershell-web-requests-and-proxies)

A user over at Reddit suggested to use :
- [https://msdn.microsoft.com/en-us/library/system.net.webclient.usedefaultcredentials.aspx](https://msdn.microsoft.com/en-us/library/system.net.webclient.usedefaultcredentials.aspx)

So i used get-member on the .load() function of the HTMLAgilityPack. This reveiled it's secrets:

>TypeName   : HtmlAgilityPack.HtmlWeb
Name       : Load
HtmlAgilityPack.HtmlDocument Load(string url, string proxyHost, int proxyPort, string userId, string password),
HtmlAgilityPack.HtmlDocument Load(**string url, string method, System.Net.WebProxy proxy, System.Net.NetworkCredential credentials**)

So putting those two together got me to
```javascript
$cred = new-object System.Net.NetworkCredential
$defaultCredentials =  $cred.UseDefaultCredentials

[HtmlAgilityPack.HtmlDocument]$doc = $web.Load($url,"GET","ourproxy:80",$defaultCredentials)
 ```
This solved the authentication issues. I also experimented a little with Proxy-authentification.
I've commented out that code in the [full script]() for future reference.

### Selecting data with XPath
The next step was using the XPath-technique to select a certain row in a table. I used the chrome-web-developer tools to go through the HTML code.

![Lansweeper]({{site.baseurl}}/assets/images/xpathscraping/lansweeper.png)

<sup> Please note that i have highly sanitized this image and filled it up with mock-up data (a part from my name).<sup>

```javascript
$lastknownpc = ([HtmlAgilityPack.HtmlNodeCollection]$nodes = $doc.DocumentNode.SelectNodes("//html[1]/body[1]//div[@id='Maincontent']//td[@id = 'usercontent']//table[5]//tr[2]//td[3]")).innerText
$lastdatelist = ([HtmlAgilityPack.HtmlNodeCollection]$nodes = $doc.DocumentNode.SelectNodes("//html[1]/body[1]//div[@id='Maincontent']//td[@id = 'usercontent']//table[$td]//tr//td[2]")).innerText
 ```
This code would give me the second row of that table. But then i got thinking, maybe it be nice to see some sort of history of a user.

So i changed my code to :

```javascript
$lastknownpclist = ([HtmlAgilityPack.HtmlNodeCollection]$nodes = $doc.DocumentNode.SelectNodes("//html[1]/body[1]//div[@id='Maincontent']//td[@id = 'usercontent']//table[$td]//tr//td[3]")).innerText
$lastdate = ([HtmlAgilityPack.HtmlNodeCollection]$nodes = $doc.DocumentNode.SelectNodes("//html[1]/body[1]//div[@id='Maincontent']//td[@id = 'usercontent']//table[5]//tr[2]//td[2]")).innerText
 ```
 The only thing that changed was **tr[2]** became **tr**. This way, it selects ALL table-rows in that specific table. So at this point $lastknowpc holds all table rows.

 I wanted to showcase the lastknown pc (and most likely the active one) a bit more so i wrote a quick and dirty solution:

```javascript
write-host "Last logged on to computer:"($lastknownpclist | select -First 1 -Skip 1)"@"($lastdatelist | select -First 1 -Skip 1)  -ForegroundColor Green
```
This will print me the last and probably active using computer in a green color in my prompt window.

The next and final step is to show the history of different devices where the user has logged on to.

```javascript
$arr = @()
for($i = 1; $i -lt $lastknownpclist.count; $i ++) # $i has to be 1 because of the TH (table-header)
{
	$output = get-adcomputer $lastknownpclist[$i] -Properties Description | select -ExpandProperty Description
	if($output)
	{
		$arr += [pscustomobject]@{
		"Computer" =  $lastknownpclist[$i]
		"Date" = $lastdatelist[$i]
		"AD Description" =  $output
		}
	}#end if
	else
	{
		$arr += [pscustomobject]@{
		"Computer" =  $lastknownpclist[$i]
		"Date" = $lastdatelist[$i]
		"AD Description" = ""
		}
	}
}
($arr | select -First 5 -Skip 0)  | ft
 $ErrorActionPreference = ‘Continue’
```
With this code i look for how many computers that are in the list so that i have a way of telling how long my loop should be.

For each computer in that list, i make a query to Active Directory and retrieve it's description value. We use it to store the department to which it belongs.
When this is retrieved i place the computer name, date and AD description into a Hash-table.
If it doesn't find a description value in AD, i'll fill it up with "an empty string".

So now that i have created this hash-table, all that is left to do is to display it in a table.
I wrapped everything up into a function called **get-fromlansweeper**.

Finally i include this function within the **get-phone** function i showed your earlier.
So the final output of the get-phone function would now be :

![shell]({{site.baseurl}}/assets/images/xpathscraping/shell.png)

<sup> Please note that i have sanitized this image and filled it up with mock-up data (a part from my name).</sup>

So now i have all the data i need with one simple function. :)
