---
excerpt: Use NodeJS MarkServ module and NSSM - the Non-Sucking Service Manager to create a simple markdown enabled web server for windows.
tags: markdownps
date: 2016-05-23 21:39:15
categories: Tips
title: simple markdown web server for windows

---



I'll start directly with what I need:

- A web server that will on the fly serve markdown as html while respecting links to other markdown files.
- The web server must run on windows and must be always available. Therefore I need a windows service.
- The web server must accept external requests.

I've researched this subject a lot and most solutions end up using markdown processors like Jekyll, Hugo and others to render static html files that any other web server can serve (e.g. IIS). This site is in fact powered by Hugo as discussed in this [post](/post/building%20the%20site%20with%20hugo/). But such engines require a significant overhead in at least choosing a theme and then setting up a content structure. I need something simpler.

As I haven't seen many questions like mine, I'll explain my reasons. 
Generating data with PowerShell is super easy. The available functionality is overwhelming and if you combine multiple data streams then you can easily get a very rich data set. 
The problem is how to save this data into a format that renders both **nice** and **easy**. There are some cmdlets such `ConvertTo-Html` but they are very limited both in functionality and aesthetics.

Markdown is a format that is easy to generate and renders very nice. Overcoming the limitations of PowerShell was the reason I've created the PowerShell module [MarkdownPS](/post/markdownps/markdownps/). 
With this module rendering markdown files from reach data sets has never been easier. To share the files, I need a markdown processor or something that acts as a markdown web server.

After searching around I found two potential solutions both powered by NodeJS modules. 

## GFM 

When I tested this [module](https://github.com/gagle/node-gfm) I was initially very satisfied. But in time I figured out that it was restricted in throughput. This was due to the throttling of the api from github that the module depends on to render markdown into html.
Also while writing this post I noticed this

> THIS MODULE IS DEPRECATED, NO MORE FIXES, NO MORE ADDITIONS

So two major problems. Let's look into something else.

## MarkServ .
This [module](https://www.npmjs.com/package/markserv) is really good and works great for my needs. No throttling and good support for Github flavoured markdown. 
My only complaint is that I've recognized some weirdness with the markdown syntax. A couple of examples:

- First line in the markdown file must be empty.
- More line breaks are required than expected.

But those are small issues and with some minor adaptations to the PowerShell script, the problem is fully overcome.

The next issue to address is how to turn a MarkServ into a standalone windows service. At first I though to compile a standalone executable but I couldn't make it work. 
My knowledge with NodeJS is limited so I didn't insist a lot on this approach. Maybe I'll try another time in the future. My alternative route was to figure out the command line arguments of the executing process and make that a windows service. 

Lets assume that you installed **markserv** from within the folder `C:\markserv` using `npm`.
```
C:\markserv>npm install markserv
```

This means that the module's "executable" script is `C:\MarkServ\node_modules\markserv\server.js`. Then the node command line arguments become
```
C:\Program Files\nodejs\node.exe C:\MarkServ\node_modules\markserv\server.js 
```

MarkServ provides some extra commandline arguments. To serve the contents of a specific folder `C:\markdown\` from port `1234` then the command line becomes:

```
C:\Program Files\nodejs\node.exe C:\MarkServ\node_modules\markserv\server.js -p 1234 -h C:\markdown -x
```

This works except from the fact that the port parameter is not respected and markserv always opens the **8000** port. Small problem in my opinion and maybe it is already fixed as an issue.


The last remaining issue is how to register a windows service with this command line arguments. For those unfamiliar with programming a windows service, you should know that for the operating system to register an executable as a service, it must it must implement specific hooks that facilitate the coordination of the service from the operating system. 

## NSSM - the Non-Sucking Service Manager

![image-left](https://nssm.cc/images/logo.jpg){: .align-left}[NSSM](https://nssm.cc/) is an amazing utility that wraps this detail and literally turns any executable into a windows service. NSSM provides a graphical user interface but since we are automating everything, I'll show a batch file that registers the markserv module as a windows service named **MarkServ** with delayed auto start. Administration rights are required.

```
nssm install MarkServ "C:\Program Files\nodejs\node.exe"
nssm set MarkServ AppDirectory "C:\Program Files\nodejs"
nssm set MarkServ AppParameters """C:\MarkServ\node_modules\markserv\server.js""" -p 1234 -h C:\markdown -x
nssm set MarkServ Start SERVICE_DELAYED_AUTO_START
nssm set MarkServ DisplayName MarkServ
```

If you need to specify a specific logon user then add this line also
```
nssm set MarkServ ObjectName "username" "password"
```

To verify the service use PowerShell `Get-Service MarkServ`

```
Status   Name               DisplayName                           
------   ----               -----------                           
Running  MarkServ           MarkServ                              
```

## Troubleshooting 

When there is a problem then NSSM logs entries in the Event Viewer. I've found them helpful to understand if at least the service is configured correctly. All other problems are NodeJS specific and solving them requires reading or good experience with NodeJS.


