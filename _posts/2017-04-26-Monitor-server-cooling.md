---
Layout: post
title: Monitoring  the server-cooling with Powershell
Author_profile: true
Tags: 'PS, PushBullet'
published: true
date: '2017-04-26'
---
This post does not contain the full script because it would become to messy to read.
I took the most important parts and posted them here. The full script will be available in the repository on Github.

So our servers are being cooled by a closed air-cooling system.
The system displays the current temperatures on a display. These and other values are approachable through SNMP.

The company that installed these systems, provided me with the MIB file. From there i could easily find out what OID numbers  i needed for my SNMPwalk.

The idea is to set a threshold. If this is exceeded, a SMS notification  needs to be send to certain people within the company.
## Pushbullet function
So i started out with writing a function to send a message. After some research i landed on [pushbullet.com](https://www.pushbullet.com/). It's free service (for about 600 messages a month) and provides the possibilty to send a message to more than just a phone. A tablet or computer is also a possibility. This might come in handy in the nearby future for other monitoring purposes.

I found an interesting article over on
>[https://foxdeploy.com/functions/powerbullet-pushbullet-for-powershell/](https://foxdeploy.com/functions/powerbullet-pushbullet-for-powershell/)


With this information i was able to create my own function on a very short time.

## Function to retrieve the SNMP data
So after i created
```powershell
Function Send-PushMessage {}
```
and we created an account on pushbullet.com we already had half our solution.

So the next step was to get the temperatures  via SNMP.
I found a script that did just that over on : [https://www.powershellgallery.com/packages/SNMP/1.0](https://www.powershellgallery.com/packages/SNMP/1.0)

This made things fairly simple considering that i was already provided with the MIB file.
I used an MIB browser provided by www.networksoftware.biz to find out the OID's i needed.
Furthermore  i used a tool called snmpwalk.exe to help this process along.
I found this tool over on [snmpsoft.com](http://www.snmpsoft.com) thanks to a user on [reddit.com](https://www.reddit.com).


So basically there are 4 temperatures, 2 per "closet" (up and down).
Since warm air rises, i'll focus on the UP temperatures. If they are getting too hot, it's time to send e message.

```powershell
$M1_returntemp_up  = ([int](Get-SnmpData $ipminkels1 .1.3.6.1.4.1.39983.1.1.1.1.0 -Version v2).Data/10)
$M1_returntemp_down  = ([int](Get-SnmpData $ipminkels1 .1.3.6.1.4.1.39983.1.1.1.2.0 -Version v2).Data/10)

$M2_returntemp_up  = ([int](Get-SnmpData $ipminkels2 .1.3.6.1.4.1.39983.1.1.1.1.0 -Version v2).Data/10)
$M2_returntemp_down  = ([int](Get-SnmpData $ipminkels2 .1.3.6.1.4.1.39983.1.1.1.2.0 -Version v2).Data/10)
```
Temps get devided by 10 to make them into actual temps. Otherwise the temp would be (for instance) 249 in stead of 24.9

## Insert data into a database
Next i created a function that inputs all data into the database.
The function is designed to receive the same data as the send-pushbullet function.
This so that the code doesn't get messy AND that the messages being sent to people, can easily be found in the DB. (for whatever reason that might be)

```powershell
FUNCTION INSERT_IN_DB ($bool)
    {
        # INSERT NEW RECORDS IN DB
        Try {
                    $Connection.Open()
                    #INSERT RECORD
                    $MYSQLCommand.Connection = $connection
                    $MYSQLCommand.CommandText="insert into tbl_Monitor (name,temp_up,temp_down,date,smssent,message) values('$name','$currenttemp','$temp_down','$now','$bool','$message')";
                    [void]$MYSQLCommand.ExecuteNonQuery()
                    $MYSQLCommand.Dispose()
                    $connection.Close()
             }
             Catch {
              write-host "ERROR : Unable to run query : $query `n$Error[0]" -ForegroundColor red
             }
             Finally {
               $Connection.Close()
               WRITE-HOST "INSERT IN DB WAS A SUCCESS" -ForegroundColor YELLOW
             }
    }
```
Note that i did not make parameters for all values, i just did not see any need for it. This might not be best practice, i don't really know.
But this works fine. The only new value here is $bool. This will be used to determine if a message was sent or not. (see later on)
Every 60 seconds a record will be inserted into the DB.

## A function that combines all

So the next and final step, was the hardest one.
We need to define under what circumstances a message needed to be sent.

So basically it comes down to:

```powershell
################################## IF IT'S TOO WARM ##################################
                                # LOGIC - CONDITIONS FOR SMS

# IF CURRENT TEMP IS TOO HIGH
if($CurrentTemp -gT $MaxTemp)
{
    # IF CURRENT TEMP > MAXTEMP AND LAST TEMP < MAXTEMP --> MEANS THAT ALL WAS OK BUT NOW IT HAS REACHED OVER ITS TRESHOLD
    if ($LastTemp -lt $Maxtemp) {
        write-debug "SEND SMS: $name ALARM ALARM"
        if( ([datetime]$now - [datetime]$lastsms).totalseconds -gt 600){ # langer dan 10 minuten (600 seconden)
        # SEND SMS
            $message = "SEND SMS: $name ALARM temp above treshold, currenttemp: $currentTemp C"
            INSERT_IN_DB -bool 1 -message $message
            Send-PushMessage  -title "$Now Koeling server $name" -msg $message
        }
    }

    # IF CURRENT TEMP > MAXTEMP AND CURRENT TEMP > LASTTEMP --> MEANS THAT TEMP HAS BEEN RISING SINCE THE ALARM.
    if ($CurrentTemp -gt $LastTemp -and $LastTemp -ge $MaxTemp){

       if( ([datetime]$now - [datetime]$lastsms).totalseconds -gt 600){ # langer dan 10 minuten (600 seconden)
        # SEND SMS
            $message = "SEND SMS: $name Current temp rising currenttemp : $currenttemp C"
            INSERT_IN_DB -bool 1 -message $message
            write-debug "SEND SMS: $name Current temp rising"
            Send-PushMessage  -title "$Now Koeling server $name" -msg $message
        }else{
            $message = "SITUATION RISING, BUT TOO SOON FOR NEXT SMS currenttemp : $currenttemp C"
            INSERT_IN_DB -bool 0 -message $message
            write-debug "SEND SMS: $name Current temp rising"
            write-host "SITUATION RISING, BUT TOO SOON FOR NEXT SMS" -ForegroundColor red
        }
    }

    # IF CURRENT TEMP IS > MAXTEMP AND CURRENT TEMP IS < LASTTEMP --> MEANS THAT TEMP HAS BEEN LOWERING COMPARED
    # TO PREVIOUS CHECK BUT IS STILL TOO HIGH.
    if ($CurrentTemp -lt $LastTemp -and $LastTemp -gt $MaxTemp){

        if( ([datetime]$now - [datetime]$lastsms).totalseconds -gt 600){ # langer dan 10 minuten (600 seconden)
        # SEND SMS
            $message = "SEND SMS: $name STABALIZING currenttemp : $currenttemp C"
            INSERT_IN_DB -bool 1 -message $message
            write-debug "SEND SMS: $name STABALIZING"
            Send-PushMessage  -title "$Now Koeling server $name" -msg $message
        }else{
            $message = "SITUATION STABALIZING, BUT TOO SOON FOR NEXT SMS currenttemp : $currenttemp C"
            INSERT_IN_DB -bool 0 -message $message
            write-debug "SEND SMS: $name STABALIZING"
            write-host "SITUATION STABALIZING, BUT TOO SOON FOR NEXT SMS" -ForegroundColor red
        }
    }
    # IF CURRENT TEMP > MAXTEMP AND CURRENT TEMP >= LAST TEMP
    if($CurrentTemp -EQ $lasttemp)
    {
        if( ([datetime]$now - [datetime]$lastsms).totalseconds -gt 600){ # langer dan 10 minuten (600 seconden)
        # SEND SMS
            $message = "SEND SMS: $name TEMP REMAINS EQUAL : $currenttemp"
            INSERT_IN_DB -bool 1 -message $message
            write-debug "SEND SMS: $name TEMP REMAINS EQUAL"
            Send-PushMessage  -title "$Now Koeling server $name" -msg $message
        }else{
            $message = "SITUATION REAMAINS THE SAME, BUT TOO SOON FOR NEXT SMS: $currenttemp C"
            INSERT_IN_DB -bool 0 -message $message
            write-debug "SEND SMS: $name TEMP REMAINS EQUAL"
            write-host "SITUATION REAMAINS THE SAME, BUT TOO SOON FOR NEXT SMS" -ForegroundColor red
        }
    }
} # END IF CurrentTemp > MaxTemp

################################## IF IT'S (BACK TO) NORMAL ##########################

# IF TEMP at last sms > MAXTEMP AND CURRENT TEMP < MAXTEMP --> MEANS THAT AT LAST CHECK AND SMS THE TEMP WAS STILL OVER
# ITS TRESHOLD BUT THAT THE CURRENT TEMP HAS BEEN LOWERED INTO THE SAFE ZONE.
    if ($CurrentTemp -lt $MaxTemp -and $tempatlastsms -ge $Maxtemp) {
        Write-Debug "SEND SMS: $name droped below treshold, back to normal currenttemp : $currenttemp C"
        if( ([datetime]$now - [datetime]$lastsms).totalseconds -gt 600){ # langer dan 10 minuten (600 seconden)
           # SEND SMS
           $message =  "SEND SMS: $name droped below treshold, back to normal currenttemp : $currenttemp C "
           INSERT_IN_DB -bool 1 -message $message
           Send-PushMessage  -title "$Now Koeling server $name" -msg $message
        }else{
             # DONT SEND SMS JUST YET BUT KEEP TRACK OF TEMPS INTO DB
            write-host "SITUATION BACK TO NORMAL, BUT TOO SOON FOR NEXT SMS currenttemp : $currenttemp C" -ForegroundColor red
            $message = "OK"
            INSERT_IN_DB -bool 0 -message $message
        }
    }elseif($CurrentTemp -lt $MaxTemp){ # IF ALL IS JUST OK, KEEP TRACK OF TEMPS INTO DB
        # DONT SEND SMS
        $message = "SITUATION IS NORMAL"
        INSERT_IN_DB -bool 0 -message $message
    }

```
This covers all possible scenario's. 
This was the hardest part about this project. I first wanted to work without a DB but quickly came to the conclusion that this wasn't an option.
At the moment of this writing, this is in beta and is being tested. Since we can't just disable the cooling system for testing purposes, we play around with the variables from time to time. 

## A webpage to display the data in a graph.

So since we now keep track of the temperatures, we might aswell create an interface so we can look back a few days. I created a PHP page that fetches the data from the DB and throws them into a JQuery graph.
With a very basic interface you can choose to see the previous temp from the last 5 minutes up to the last 72 hours.
The 72 hours limit was just so that we could see what went wrong during a weekend.

![PHP]({{site.baseurl}}/assets/images/MonitorSystem/a.PNG)

## CLEAN the database continuesly
The main function ends with a call to a function that i gave the name "CLEAN_DB".
Each time it is called it will remove records that are older than 72 hours. So in theory each minute, two records are being deleted.

The function ends with a MYSQl query that optimizes the database so that empty record don't take up any HDD space.

```php
		$sql = "OPTIMIZE TABLE tbl_monitor";
```        

### To do
- upload script to repository after scrubbing it from sensitive info
