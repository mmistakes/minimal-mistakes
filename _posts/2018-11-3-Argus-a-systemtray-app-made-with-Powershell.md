# Argus, my favorite dog!

Hi!

This blog-post is about one of the projects i'm most proud of! The development of "Argus" started around March of 2018. This project grew whilst working on it. I have tried to structure this blog-post as best as i could. Here goes ...

## The birth of the idea
One part of my job is being part of the help desk. When called by a customer or colleague, i usually ask for their computer-name. Most users tend to not know the name by heart (*com'on guys!)* or have a hard time figuring out where to find it. With the deployment of Windows 10 this became even more prevalent.

So one day i was reading r/Powershell over at Reddit and i found  [this](https://www.reddit.com/r/PowerShell/comments/8ovw38/_/e06kepd/) post.

A user named *Lee_Dailey* linked to a script over at the Microsoft's script gallery. I took a look and the screenshot kinda gave me the idea to build this for our end-users. 

![enter image description here](https://i1.gallery.technet.s-msft.com/windows-powershell-system-792a1db9/image/file/181340/1/untitled.png)

This would make things SO much easier to explain to them. 

## Oh oh, XAML (WPF)
When opening the script, i found out that the GUI was in XAML-format. So it used the Windows Presentation Framework or WPF in short. When i first started with Powerhell GUI's i had came a cross WPF but I had never used this before and had always skipped past it because i always use PS Studio.

So after doing my research i concluded that the *easiest way* to edit this was to install Visual Studio Community edition, a free version of Visual Studio.

Some parts were a true struggle like creating a button with a drop-down menu or creating a hoover effect on a button. The amount of code it generated for that was, in my opinion, insane. Anyway,  I'm glad that i found my way into XAML, i'm no expert by any means but at least now i have some experience with it.

So after **a lot of googling** and tinkering i had my basic design finished and i decided on what content i needed in the application. The result looked like this :

IMAGE: DESIGN.PNG

## XAML in Powershell Studio ?
So the next big question was **" How the hell am i going to get this into an executable? "**

Since the example script was ready to go, i figured i would try to get that into an exe first. So i opened up Powershell studio 2018 and after some configuration and trial & error, i got a working sytemtray app, designed with XAML and running as a compiled EXE.

This lead me to believe that my project was a doable one. 

## One EXE - no installation needed
The application is one EXE and that's it. When the application starts, it **creates** the DLL  for MahApps  and all its images that it needs in a temp-location. This temp location is under the APPDATA of the user in question. So you have *no issues with user-permissions*.

```powershell
$env:temp
```
I'm creating the DLL and the images thanks to the following function:

```powershell
[System.Convert]::ToBase64String
[System.Convert]::FromBase64String
```

This allows you to store the data\content from the DLL or an image into a variable (hash).
This looks something like :

```powershell
$MahAppsMetro = [System.Convert]::FromBase64String('TVqQAAMAAAAEAAAA//8AALgAAAAAAAAAQA ..... ')
```
You can then create the file with the following code :

```powershell
Set-Content -Path $env:temp\MahApps.Metro.dll -Value $MahAppsMetro -Encoding Byte
```


# Expanding on the idea

Next i started to look for more useful additions. I ended up with the following features :

- a link to the helpdesk-system to create a ticket\call
- a link to our service-monitor to check if there are issues with program\service X or Y
- the incorporation of my other tool, the [TCP\IP-printtool](https://cookiecrumbles.github.io/Deploying-TCPIP-printers-with-a-Powershell-GUI/)
- a way to manage your default printer
- a SOS-warning system

### Mahapps
During my research i had come a cross [MahApps](https://mahapps.com/). This is a UI toolkit for WPF. It gives your application the Metro-look and feel. Something we are accustomed to with Windows 10. One of the features that appealed to me the most was the "fly-in" option. This would give me the option of a "hidden" menu and would keep my design nice and simple.

I'm not gonna lie, this was something i spend **a lot of time on** figuring it out. Step-by-step things became clear and some parts started to work. 

Now that i'm writing this article and i'm reviewing the XAML\MAhapps  part, it's already a bit of a blur on how i got that part done. I should re-visit it in the coming months.

Anyway, with the Helpdesk-button on the top and the wheel-cog on the buttom left, i had most of my features implemented. The gray wheel cog will open a fly-in menu that has the option to install a printer. This would open the [TCP\IP-printtool](https://cookiecrumbles.github.io/Deploying-TCPIP-printers-with-a-Powershell-GUI/) i wrote about.

The green cog will just start the command 
> control printers

This way users can quickly change there default printer.

## SOS-warning system

### Background story
Some years ago we were unfortunate enough to have both the exchange-server as the telecommunication-server down at the same time. The problem here, aside the obvious, was that we couldn't reach and inform our users about the issues. 

Afterwards a college asks if we could figure out some sort of SOS\Emergency system if this were ever to happen again.

Back when i was in high-school we used to use NET SEND to send a message to a computer or user. 

In Active Directory, we have computer groups per department. So it wouldn't be too hard to figure out what computers we'd like to reach. As long as we had network, it is doable.

One request of the end-user was that the message or notification would not be to intrusive. This brought me back to the toast-notifications that would just pop-up for a few seconds to then disappear. 

We also already have a service-monitor that i could scrape.

### Argus was born

I incorporated a function within within the system-tray application and named it Argus. This would become the name of the application.
Argus looks for a JSON-file on it's own harddrive every 60 seconds.


