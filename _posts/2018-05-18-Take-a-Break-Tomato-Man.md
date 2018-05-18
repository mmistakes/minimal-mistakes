Pomodoro Timers (https://en.wikipedia.org/wiki/Pomodoro_Technique) are a great tool to increase productivity and I regularly use them. The idea is that you work in short bursts, usually about 25 minutes, and then take a short break. I find that for me it is really effective and helps me structure my work efforts.

## PowerShell Time

I'll use any excuse to do something in PowerShell so why not make a function that starts Pomodoro Timers for me? There are very simple ways that you can make a Pomodor timer in Powershell.

# Basic timer that just writes that it's done.
Start-Sleep -seconds 3; 'Timer is done'

# This is a timer with a quick beep at the end
Start-Sleep -Seconds 3; 'Timer is done'; [console]::beep(440, 500)

Those would work fine for me, but I like cool things so let's push it a step further. I want a fancy toast notification when it's finished, and for that I will be using the the [BurntToast module](https://github.com/Windos/BurntToast) which you can install by running:

Install-Module BurntToast -Scope CurrentUser

One of the many cool things that this module gives us is the ability to have a snooze and dismiss button on our timer, this will allow us to extend our timer a bit if we get caught up in a task that may take a bit longer than 25 minutes.

Once you have that module installed you can then 

