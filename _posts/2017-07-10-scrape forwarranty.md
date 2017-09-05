---
Layout: post
title: HP warranty checker with Powershell
Author_profile: true
Tags: 'PS, Scrape, Warranty'
published: true
date: '2017-07-10'
---

In the scope of a big project, i was asked to make up a list with our current hardware situation.
We needed to know how many devices were no longer within their warranty period.

We use this great tool called Lansweeper. It keeps track of most of the things we want to know inventory wise. It also keeps track of the warranty.

Due to internal migrations and the implementation of new security rules, the tool was temporarily unable to scrape the warranty-dates of of their manufactures websites. In my case mainly HP.

Since we have quite a few devices that needed to be checked (and we couldn't wait for the issue with Lansweeper to get resolved), i descided to script it.

So since we still have other information already available in Lansweeper, i decided to start from there.
I created a list with the following headers & data :

```javascript
    AssetName;Serialnumber;ADDESCRIPTION;SystemSKU
    D08W0BT;CZC6437K7Z;HR;L1G76AV
```
The SKU is for the cases where the website asks for it (for some unknown reason it does).

Before going into scripting itself, i started out by doing a manual check, just to see how things work. 
I browsed to the following website: [https://support.hp.com/us-en/checkwarranty](https://support.hp.com/us-en/checkwarranty)

![]({{site.baseurl}}/assets/images/scrapeforwarranty/warranty1.PNG)

I typed in the serial and did a submit. But the URL above wasn't what was getting sent as a request. So using Chrome and their integrated webtools (F12), i was able to capture the URL that was sent to their server to retrieve my requested data.

![]({{site.baseurl}}/assets/images/scrapeforwarranty/warranty2.PNG)

So looking for the XHR it gave me this URL : 

[https://support.hp.com/hp-pps-services/os/getWarrantyInfo?serialnum=CZC6437K7Z&counpurchase=us&cc=us&lc=en&redirectPage=WarrantyResult](https://support.hp.com/hp-pps-services/os/getWarrantyInfo?serialnum=CZC6437K7Z&counpurchase=us&cc=us&lc=en&redirectPage=WarrantyResult)

I manually browsed to this URL and found out that this gave me an awesome JSON-formatted overwiew of my device information.


![]({{site.baseurl}}/assets/images/scrapeforwarranty/warranty3.PNG)


So all that was left for me to do now, it to do this for all the devices in the by Lansweeper created CSV. 

Because a devicename itself doesn't really tell me where the device is at, i also included the Active Directory "Description" field (data that is also retrieved and stored by Lansweeper).

We use the description field to identify where the device is at (physically). 

So after i did all this, it was time to script this. I came up with the following solution:

```powershell
$output = $null
$sourcefile = $null

# get needed values to do the work
# needed values in the sourcefile: AssetName;Serialnumber;ADDESCRIPTION;SystemSKU
$sourcefile = Get-Content C:\temp\source.csv  | sort-object $_.AssetName | ConvertFrom-Csv -Delimiter ";"

function Get-HPwarranty
{
<#
  .SYNOPSIS
  Scrape Warranty information from HP website
  .DESCRIPTION
  Provide a CSV file with the following data:
    AssetName;Serialnumber;ADDESCRIPTION;SystemSKU
    D08W0BT;CZC6437K7Z;DMSScan;L1G76AV
    The
#>
  [CmdletBinding()] # Added for verbose purposes
  param()

    write-verbose "Scraping data"

    foreach($line in $sourcefile)
    {
            #assign the values to variables in order to do the scrape
            $serial = $line.Serialnumber
            $modelSKU = $line.SystemSKU

            # do the scrape and save its payload
            $payload = Invoke-WebRequest -uri "https://support.hp.com/hp-pps-services/os/getWarrantyInfo?serialnum=$serial&counpurchase=us&cc=us&lc=en&redirectPage=WarrantyResult&modelNum=$modelSKU"

            # the payload is JSON-format so we need to convert it into a normal object
            $json = $payload.content | ConvertFrom-Json

            #add a value to the hashtable with the computername and ADDESCRIPTION
            $json |  Add-Member -Name 'Computer' -MemberType Noteproperty -Value $line.AssetName
            $json |  Add-Member -Name 'ADDESCRIPTION' -MemberType Noteproperty -Value $line.ADDESCRIPTION

            # create a custom object in the form of an array (hash) and save it
            $output += @([pscustomobject]@{Computer=$json.Computer;BeginDate=$json.overAllWarantyStartDate;EndDate=$json.endDate;SeriesName=$json.newProduct.seriesName.replace(" Small Form Factor PC","").replace(" Notebook PC","");ADDESCRIPTION=$json.ADDESCRIPTION})
            $output | format-table
    }
    # after all the work is done, save the output into a CSV file seperated by tab
    write-verbose "Save to file ... "
    $output | ConvertTo-Csv -Delimiter "`t" -NoTypeInformation  | Out-File -FilePath c:\temp\HPwarranty_scraped.csv -Append -Force
    write-verbose "Done. "
}

Get-HPwarranty -verbose

```
