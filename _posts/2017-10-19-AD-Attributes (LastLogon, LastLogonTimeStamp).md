---
Layout: post
Author_profile: true
Tags: 'AD, Powershell, StaleObjects'
date: '2017-10-19'
---
# AD-objects and its attributs - finding stale objects.
The idea was to clean up stale objects in Active Directory, starting with user accounts. This was a lot more complex than i had anticipated. (Well unless i would have taken the cmdlet Search-ADAccount for granted and just accepted its magic. I didn't ... . )

Here goes ...
## LastLogonTimeStamp
According to most documentation, you should use **LastLogonTimeStamp** to find old/stale objects. The most referred to  resource was over at [Technet.](https://social.technet.microsoft.com/wiki/contents/articles/22461.understanding-the-ad-account-attributes-lastlogon-lastlogontimestamp-and-lastlogondate.aspx)

The page provides a detailed explanation (sort of) and shows you how to retrieve stale objects with the use of Powershell.

```Powershell
Search-ADAccount -AccountInactive -DateTime ((get-date).adddays(-30)) -UsersOnly
| select Name, LastLogonDate,SamAccountName
```
That would give us:

| Name                     | LastLogonDate       | SamAccountName |
|----------------------------|-----------------------|------------------|
| User K   | 19-01-2017 9:02:00  | 209        |


I wrote my own Powershell-script that would retrieve the needed data and did the necessary calculations.
I started by checking users of whom i knew to be at home due to reason X or Y.

### Not a stale object
But when i looked at the LastLogonTimeStamp for such a user, i got confused. Have a look at the data my script pulled for user E.

| SamAccount | Name   | Server   | DaysSinceLastActivity | LastLogon        | LastLogonDate    | LastLogonTimeStamp |
|------------|--------|----------|--------------------------|------------------|------------------|--------------------|
| 1160       | User E | Server1  | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server2  | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server3  | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server4  | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server5  | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server6  | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server7  | **383**                  | 30-09-2016 8:47  | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server8  | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server9  | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server10 | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server11 | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server12 | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server13 | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server14 | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server15 | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server16 | **845**                  | 25-06-2015 13:08 | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server17 | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server18 | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server19 | N/A                      | N/A              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server20 | **319**                  | 02-12-2016 21:21 | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server21 | **319**                  | 03-12-2016 6:58  | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server22 | **319**                  | 03-12-2016 7:04  | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server23 | **319**                  | 02-12-2016 15:44 | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server24 | N/F                      | N/F              | 12-10-2017 12:10 | 12-10-2017 12:10   |
| 1160       | User E | Server25 | N/F                      | N/F              | 12-10-2017 12:10 | 12-10-2017 12:10   |

I knew that User E had been at home for a long time, so i assumed this would turn up as a stale object.
Except, it didn't. This is where all the confusion started (at least for me). The LastLogon value confirmed my expectations, but the LastLogonTimeStamp didn't. How could there be such a big gap?

So it took me a while before i figured it out. This isn't explicitly told in the documentation that i found online (or i must have missed it).
But based on feedback i got over at [reddit](https://www.reddit.com/r/sysadmin/comments/76xw9z/ad_lastlogontimestamp_not_working_as_its_supposed/) i now understand WHY this isn't a stale object.

A user suggested that each form of communication, being a VPN connection, reading email via OWA, would affect/update the lastlogontimestamp.

It makes sense that these actions would affect the record in some way.
But because it wasn't mentioned anywhere, the possibility never popped up in my head.
This means that the user (in a way), is stil active and not stale, thus not to be removed.

So looking back at User E, the most recent logon was in december 2016, but has been checking his/her email at home in the recent past.

**That is why the LastLogonTimeStamp is so recent and why this isn't considered as a stale object !**
### Stale object

User K is no longer employed by us. For some reason this user wasn't removed from AD.
The Powershell line i got from Technet showed user K as a stale object. *But why?*

Easy: the lastlogon is well back in time **AND more importantly** the LastLogonTimeStamp is not within the accepted parameters of 30 days (so it's older). So this tells us that there was NO activity for this account. Not in the office and not elsewhere (e.g at home reading his/her email).
Although i mention the LastLogon, it is irrelevant. Search-ADAccount cmdlet doesn't even take look at it.

The fact that the LastLogonTimeStamp is earlier than the LastLogon of 27-01-2017 is probably due to the fact of the 9-15 days before its being updated.

At the time or pulling this data, there is only a 8 day difference (19/01 to 27/01) between the latest LastLogonTimeStamp and the latest LastLogon. So the value was about to be updated. If she would have worked a few more days, my guess is that the data would probably have been different.

If we would have done the same query, on the same day with the same parameters, she would not have been seen as a stale object just yet (due to the then more recent value for LastLogonTimeStamp).

| SamAccount | Name  | Server   | DaysSinceLastActivity | LastLogon        | LastLogonDate   | LastLogonTimeStamp |
|------------|--------|----------|--------------------------|------------------|-----------------|--------------------|
| 209        | User K | Server1  | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server2  | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server3  | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server4  | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server5  | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server6  | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server7  | **264**                  | 27-01-2017 8:52  | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server8  | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server9  | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server10 | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server11 | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server12 | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server13 | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server14 | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server15 | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server16 | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server17 | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server18 | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server19 | N/A                      | N/A              | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server20 | **264**                  | 27-01-2017 12:23 | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server21 | **265**                  | 26-01-2017 9:05  | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server22 | **279**                  | 11-01-2017 15:48 | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server23 | **271**                  | 20-01-2017 13:02 | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server24 | **364**                  | 18-10-2016 13:06 | 19-01-2017 9:02 | 19-01-2017 9:02    |
| 209        | User K | Server25 | N/F                      | N/F              | 19-01-2017 9:02 | 19-01-2017 9:02    |


## LastLogon
Before the working of LastLogonTimeSpan became more clear to me, i was thinking about using the LastLogon value to find my stale AD-objects.
I was under the impression that only **writable** DC's had these values since they were responsible for the authentication proces.

Since i was thinking that the LastLogonTimeSpan was a wrong value, it would have made sense to retrieve just these (LastLogon) values.

But this was not the case. There were more than a few instances where a RODC had a LastLogon value.
I had no clue as to why that was and so i posted a new topic over on [Reddit.](https://www.reddit.com/r/sysadmin/comments/76q4km/ad_lastlogon_date_replication/)
There i got the following reply:

> If you have configured them as allowed in the password replication Policy, then credentials can be cached on an rodc,allowing it to authenticate those Users/computers without contacting a rwdc. In that case lastlogon would be populated on the rodc

Having done a little bit of research after reading this post, i came across [the following documentation.](https://technet.microsoft.com/en-us/library/cc730883%28v=ws.10%29.aspx)
This seems to be confirming the theory.




----------


### My script

This script is a leftover from what i initialy made seeing that i was building my script based on the idea of using LastLogon instead of LastLogonTimeStamp.
In this script i do a check on the server name to slightly show different data. This is not needed anymore.
I've left it in because you'll see N/A or N/F mentioned in the explanation above and more specifically within the tables. This is so you would know where it originates from.

```Powershell
## PARAMETERS
$DCs  = Get-ADDomainController -Filter * | Select-Object name -ExpandProperty Name # List all RODC and DC's

$now = Get-Date
$Result = @()
$ou = whatever
$outputFolderProblemPossibleProblemCases = "$env:USERPROFILE\desktop\AD_ANALYSIS\$ou\PossibleProblemCases_$ou.csv"

# Check if path to save output exists, if not, create it.
if(!(Test-Path -Path $env:USERPROFILE\desktop\AD_ANALYSIS\$ou)){
    Write-Debug "Create directory on local desktop."
    New-Item $env:USERPROFILE\desktop\AD_ANALYSIS\$ou -Force -ItemType Directory | Out-Null
}

Write-Debug "Starting to traverse DC's."

<#  Go through all the domain controllers and for each domaincontroller retrieve the LastLogon,
    Name and SamAccountname for each users in our OU. #>

foreach ($dc in $DCs) {
    Write-Debug "Gathering information from $dc."
    $users = get-aduser -ldapfilter "(samaccountname=9319147)" -SearchBase $OU -server $dc  -prop lastlogon, Name, SamAccountName,LastLogonTimeStamp,LastLogonDate
    foreach ($user in $users)
    {
        $lastlogon = $null
        $DaysSinceLastActivity = $null

        if ($user.lastlogon) {
            $lastlogon = [datetime]::FromFileTime($user.lastLogon)
            $DaysSinceLastActivity = ($now - $lastlogon).Days
        }
        else {
            if($dc -like "*s51*"){
                $lastlogon = "N/F" <# If a Writable doesn't contain the value, we need to catch that #>
                $DaysSinceLastActivity = "N/F"
            }else{
                $lastlogon = "N/A" <# Because some users have never been on a certain RODC, we need to catch that too #>
                $DaysSinceLastActivity = "N/A"
            }
        }
            $Result += New-Object PSObject -Property @{
                "Days Since Last Activity" = $DaysSinceLastActivity
                SamAccount                 = $user.SamAccountName
                LastLogon                  = $lastlogon
                Name                       = $user.name
                Server                     = $dc
                LastLogonTimeStamp         = [datetime]::FromFileTime($user.LastLogonTimeStamp)
                LastLogonDate              = $user.LastLogonDate
            }
        #  }# if
    }# foreach user
}# foreach dc

$Result.GetEnumerator() |
ConvertTo-Csv -Delimiter ";" -NoTypeInformation  |
out-file $outputFolderProblemPossibleProblemCases -Force

    ## OPTIONAL, add "sep;" so that if you double click the CSV, it automatically formats it into columns.
    $Content = Get-Content $outputFolderProblemPossibleProblemCases
    $seperator = '"sep=;"'
    Set-Content $outputFolderProblemPossibleProblemCases -value $seperator,$content

$Result.GetEnumerator() | Sort-Object -Property 'SamAccount' | ft # TECHNIQUE TO SORT A HASH-TABLE
Write-Output "Script finished."
```


## Used resources
    https://blogs.technet.microsoft.com/askds/2009/04/15/the-lastlogontimestamp-attribute-what-it-was-designed-for-and-how-it-works/
    https://blogs.technet.microsoft.com/ashleymcglone/2013/12/20/back-to-the-future-working-with-date-data-types-in-active-directory-powershell/
    https://social.technet.microsoft.com/wiki/contents/articles/22461.understanding-the-ad-account-attributes-lastlogon-lastlogontimestamp-and-lastlogondate.aspx
    https://www.reddit.com/r/PowerShell/comments/2xoysj/unreliable_info_from_lastlogontimestamp_property/
    https://www.reddit.com/r/sysadmin/comments/76q4km/ad_lastlogon_date_replication/
    https://www.reddit.com/r/sysadmin/comments/76xw9z/ad_lastlogontimestamp_not_working_as_its_supposed/

## Stuff i learned along the way

This trick adds "sep=;" on the first line of your CSV file. When you double click it, Excel will now know how to split the data into columns. This way you don't have to import it to get it in a readable format.
 ```Powershell
 $Content = Get-Content $outputFolderProblemPossibleProblemCases
 $seperator = '"sep=;"'
 Set-Content $outputFolderProblemPossibleProblemCases -value $seperator,$content
 ```

Next is a little trick to sort a Hash-table.

 ```Powershell
$Result.GetEnumerator() | Sort-Object -Property 'SamAccount' | ft
 ```

More information can be found over at [Technet.](https://blogs.technet.microsoft.com/heyscriptingguy/2014/09/28/weekend-scripter-sorting-powershell-hash-tables/)