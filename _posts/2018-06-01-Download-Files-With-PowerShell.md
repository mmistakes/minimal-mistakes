---
classes: wide
toc: true
---

After my [last post](https://andrewpla.github.io/A-Toasty-Pomodoro-Timer/), I got a tweet from [Michael Teske](https://twitter.com\teskemj).

![Tweet from a #Legend!]({{"/assets/tesketweet.png" | absolute_url}})

# Music to Code By

I love finding new music and "Music to Code By" sounds awesome! I checked out the [link](https://mtcb.pwop.com), and found a pretty nice explanation of what it is.

> "This is not an album of music. It is a productivity tool. It will help you focus intently on any task. Use it for work, studying, reading, driving, or just relaxation. Music to Code By is scientifically designed to quickly get you into a state of flow and keep you there."

The full-length songs are 25 minutes long which works perfectly for us because Pomodoro timers are 25 minutes in length. Sign me up. Well, it turns out that they cost about $44. I'm a "try before you buy" type of person so let's listen to some samples. There are 13 four minute samples that we can check out. Even the act of clicking the play button 13 times brings pain to my fingers. "PowerShell all the things" right? This is no exception. Let's download all 13 samples and give them a proper 25 minute test drive!

## Invoke-WebRequest to the Rescue

Invoke-WebRequest is a pretty slick command that allows us to get content from a web page. We can use this to go through all of the sample songs and download each of them.

Let's look at the webpage to see what we are working with.

```powershell
    Invoke-WebRequest -uri 'http://mtcb.pwop.com'
```

That's a whole bunch of stuff that we don't need so let's just grab the links.

```powershell
    Invoke-WebRequest -uri 'http://mtcb.pwop.com' | Select-Object -ExpandProperty 'links'
```

Let's only grab the download links and save them to a variable for reuse.

'''powershell
    $downloads = Invoke-WebRequest -uri 'http://mtcb.pwop.com' | 
    Select-Object -ExpandProperty 'links' |
    Where-Object -Property 'innerhtml' -like 'download'
'''

Now we have all the download links inside of a variable we can loop through it and download the files. 

```powershell
# Specify whatever path you want the files to go to
foreach ($download in $downloads) {
    $songName = $download.href -split '/' | Select-Object -last 1
    Invoke-WebRequest -Uri $download.href -OutFile "C:\Music\MTCB\$name"
}
```

### Closing Thoughts

I'm a fan of [musicforprogramming.net](http://musicforprogramming.net), but find that the songs from MTCB are much higher quality. I have been enjoying listening to the samples and will be purchasing the full version of these songs as I find the interruptions annoying. Spending this much money on music is a hard thing to stomach, but if you view these songs as a tool to enable you to be more productive then I think it is a fair deal. Thanks to Michael Teske for sharing this music with me and thanks to [Carl Franklin](https://twitter.com/carlfranklin) for producing such high-quality music.

Hope you had fun and let me know on [twitter](https://twitter.com/plaandrew22) if you end up digging the tunes or if you just wanna talk PowerShell.