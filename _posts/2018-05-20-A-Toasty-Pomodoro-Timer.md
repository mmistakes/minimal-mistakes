---
classes: wide
toc: true
header:
  image: /assets/tomatoman.jpg

---

I've been putting some thought into how I can use my time more effectively and stumbled upon the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique). The overly-simplified concept is that you work for 25 minutes and then take a 5 minute break. These are called Pomodoro timers and we are going to make our own with PowerShell

## PowerShell Time

This seems like a cool opportunity to come up with a function. This is a function that is for personal use so we can have some fun with it! I want a fancy toast notification when it's finished, and for that I will be using the [BurntToast module](https://github.com/Windos/BurntToast). This module requires PowerShell version 5 and Windows 10. Install it by running:

```powershell
    Install-Module BurntToast -Scope CurrentUser
```

This is a module that allows us to easily display toast notifications. It's one of my favorite modules to play with because you can get instant results and it just makes you feel powerful :) Once you have the module installed you can quickly generate your first toast notification by running:

```powershell
    New-BurntToastNotification -Text 'Is it toasty in here, or is it just me?'
```

That's nice and works fine, but let's spice it up a bit. One of the [cool things](https://king.geek.nz/tags/#crouton) we can do with this module is quickly turn our toast into an alarm. We can add sound and a snooze/dismiss button by using the -Sound and -SnoozeandDismiss button, respectively. You will also notice that there is a new command, Start-Sleep. We are going to be using this to delay the toast in a bit. We'll play around with just a few seconds for now, but will end up using 25 minutes in the final functions.

```powershell
    Start-Sleep -Seconds 3
    New-BurntToastNotification -Text 'Timer complete' -SnoozeandDismiss -Sound Alarm
```

## This is a job for... Start-Job

After running the function I want control to return to the console. Our goal is to increase productivity and having a PowerShell terminal dedicated to our timer isn't very productive. We are going to create a job named 'Pomodoro Timer' that will contain our Start-Sleep and New-BurntToastNotification commands. Let's try some code.

```powershell
    $sb = {
        Start-Sleep -Seconds 3
        New-BurntToastNotification -Text 'Timer complete' -SnoozeandDismiss -Sound Alarm
    }
    Start-Job -Name 'Pomodoro Timer' -ScriptBlock $sb
```

That works well on it's own, but variables are awesome and we should use some because we are going to end up parameterizing this and turning it into a function anyways. Let's try this again, but this time let's use a variable to hold the number of seconds.

```powershell
    $seconds = 10
    $sb = {
        Start-Sleep -Seconds $seconds
        New-BurntToastNotification -Text 'Timer complete' -SnoozeandDismiss -Sound 'Alarm'
    }
    Start-Job -Name 'Pomodoro Timer' -ScriptBlock $sb
```

## Ruh Roh

Our toast notification went off, but we didn't get that nice 10 second delay. Let's check the output of our job and see if it points us in the right direction.

```powershell
Get-Job -Name 'Pomodoro Timer' | Receive-Job
```

![Yucky red text]({{"/assets/secondserrorpomodoro.jpg" | absolute_url}})

This error is from the -seconds parameter. Jobs run in seperate runspaces from your powershell console. This means that it doesn't know what $seconds is because it was defined in our console, not inside the job. To get around this we need to pass our arguments to the -ArgumentList parameter of Start-Job. We will also need to call our variables with a prepended 'using:' Let's take a look

```powershell
    $seconds = 10
    $sb = {
        Start-Sleep -Seconds $using:seconds
        New-BurntToastNotification -Text 'Timer complete' -SnoozeandDismiss -Sound Alarm
    }
    Start-Job -Name 'Pomodoro Timer' -ScriptBlock $sb -Argumentlist $seconds
```

## Friendly Reminder

We now have the important code, but we gotta do some more fun stuff so let's ditch the lame 'Timer Complete' and get a nice message. After a 25 minute work session wouldn't it be nice to get a friendly message? Let's do it.

```powershell
    # Create an array of nice messages :)
    $messages = ('Rest your eyes','Go refill your water','Go for a short walk')

    # run this until you are convinced it's working
    $messages | Get-Random
```

## Sounds Good

The -Sound parameter of New-BurntToastNotification is good, but not fun enough for me. Let's borrow some code from [Jeff Wouters](http://jeffwouters.nl/index.php/2012/03/get-your-geek-on-with-powershell-and-some-music/) to add some flavor. It's also a bit of a shoutout to everyone's favorite PowerShell Stormtrooper :)

```powershell
    # This is a banger *fire emoji*
    [console]::beep(440, 500)
    [console]::beep(440, 500)
    [console]::beep(440, 500)
    [console]::beep(349, 350)
    [console]::beep(523, 150)
    [console]::beep(440, 500)
    [console]::beep(349, 350)
    [console]::beep(523, 150)
    [console]::beep(440, 1000)
    [console]::beep(659, 500)
    [console]::beep(659, 500)
    [console]::beep(659, 500)
    [console]::beep(698, 350)
    [console]::beep(523, 150)
    [console]::beep(415, 500)
    [console]::beep(349, 350)
    [console]::beep(523, 150)
    [console]::beep(440, 1000)
    # worth
```

It's worth noting that there is a lot of fun stuff you can do with audio here, I just wanted to keep things simple for this post so I didn't take advantage of playing any external files, but you can find more about using custom sounds with BurntToast [here](https://king.geek.nz/2018/04/02/crouton-sounds/).

## Finished Function

I took the liberty of throwing together all that we've looked at so far into a function. I put this function into my profile so I can reuse it easily.

I'll keep an updated version [here](https://github.com/AndrewPla/PowerShell-Toolery-and-Foolery/tree/master/Start-PomodoroTimer)

```powershell
function Start-PomodoroTimer
{
<#
	.SYNOPSIS
		Creates a Pomodoro Timer that displays a toast notification when complete.
	
	.DESCRIPTION
		Creates a Pomodoro Timer that displays a toast notification when complete. It creates a job
		This function requires the BurntToast module by Josh King @WindosNZ
	
	.PARAMETER Minutes
		Length of timer
	
	.PARAMETER Sound
		Credit to Jeff Wouters for the Imperial March: http://jeffwouters.nl/index.php/2012/03/get-your-geek-on-with-powershell-and-some-music/
	
	.EXAMPLE
		PS C:\> Start-PomodoroTimer
	
	.NOTES
		You can download the BurntToast Module by running: Install-Module BurntToast -Scope CurrentUser
		This requires Windows 10 and PowerShell v5
#>
	
	[CmdletBinding()]
	param (
		[int]
		$Minutes = 25,
		
		# There are a lot more sounds available, but that takes up too much space
		[ValidateSet('Alarm',
					 'SMS',
					 'Imperial March'
					 )]
		[String]
		$Sound = 'Imperial March'
		
	)
	
	$Messages = @(
		'Go stretch a bit',
		'Call a loved one',
		'Rest your eyes',
		'Go refill your water',
		'Fix your posture',
		'Go for a short walk',
		'Clean up your workspace',
		'Relax, you earned it'
	)
	
	if ($Sound -match 'Imperial March')
	{
		Start-Job -Name 'Pomodoro Timer' -ArgumentList $Messages, $Minutes -ScriptBlock {
			Start-Sleep -Seconds (60 * $using:Minutes)
			New-BurntToastNotification -Text "Timer complete. Suggestion: $($using:Messages | Get-Random)." -SnoozeAndDismiss
			# Waiting for toast ding to finish, then IMPERIAL MARCH
			Start-Sleep -Seconds 1
			[console]::beep(440, 500)
			[console]::beep(440, 500)
			[console]::beep(440, 500)
			[console]::beep(349, 350)
			[console]::beep(523, 150)
			[console]::beep(440, 500)
			[console]::beep(349, 350)
			[console]::beep(523, 150)
			[console]::beep(440, 1000)
			[console]::beep(659, 500)
			[console]::beep(659, 500)
			[console]::beep(659, 500)
			[console]::beep(698, 350)
			[console]::beep(523, 150)
			[console]::beep(415, 500)
			[console]::beep(349, 350)
			[console]::beep(523, 150)
			[console]::beep(440, 1000)
		}
	}
	else
	{
		Start-Job -Name 'Pomodoro Timer' -ArgumentList $Messages, $Minutes -ScriptBlock {
			Start-Sleep -Seconds (60 * $using:Minutes)
			New-BurntToastNotification -Text "Pomodoro Timer complete. Suggestion: $($Using:Messages | Get-Random)." -SnoozeAndDismiss -Sound $Sound
		}
	}
}
```

## Closing Thoughts

One of my favorite things about PowerShell is how it empowers you and is also so much fun. This function is by no means complete and there are a lot of cool things that you can do with it still:

- Play an mp3 when your toast completes
- Add a -Silent parameter
- Write pomodoro info to a logfile to keep track of your day
- Customize $messages and put your own happy reminders in there
- Add an image to your toast
- Whatever your heart desires

If you end up making any improvements to it, do me a favor and drop a pull request so we can all benefit from your work. This post is the first of its kind and I would appreciate any and all feedback! You can reach me on twitter [@PlaAndrew22](https://twitter.com/PlaAndrew22)