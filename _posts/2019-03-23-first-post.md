---
layout: single
title:  "The Linux Admin Project"
date:   2019-03-22 22:45:00
categories: [Linux Administration]
tags: linux hardware personal homelab
comments: true
---

It doesn't take long for me to get bored. I can only come home after work and watch Fraiser re-runs so many times before I get antsy- before I need a project.  

It was this very need that drove me to begin what I'm dubbing "The Linux Admin Project". Over the next few months (or longer) I'm going to be completing a series of server builds, configurations, and excercies with the goal of making me a better Linux administrator.  

My inspiration, in part, was this [Reddit comment](https://www.reddit.com/r/linuxadmin/comments/2s924h/how_did_you_get_your_start/cnnw1ma?utm_source=share&utm_medium=web2x) by user [/u/IConrad](https://www.reddit.com/user/IConrad). According to the poster, if all steps in his list are completed, "you will be fully exposed to every aspect of Linux Enterprise systems administration." After doing a lot of my own research and seeing his comment quoted on [/r/sysadmin](https://reddit.com/r/sysadmin) more than once, I decided to use it as the foundation for this undertaking. 

### Some Background

Linux was first introduced to me in high school after I started tinkering with the [eeePC](https://en.wikipedia.org/wiki/Asus_Eee_PC): the cheap, tiny computer that would start the short-lived "Netbook" era (and eventually inspire Chromebooks). The whole idea of an alternative operating system fascinated me ("and they give it away for free?!?") and soon enough I was trying to install it on everything.  

After years of distro-hopping and repeatedly attempting to make Desktop Linux my daily driver, I finally made the full-time switch in 2015 and haven't looked back. I'm currently running [Solus](https://getsol.us/home/) on all my desktop systems, but most of my experience lies in Ubuntu and derivative distros. 

Lately I've had more opportunities to get my feet wet with Linux servers- maintaining a [Nextlcoud](https://nextcloud.com/) server for myself and some basic web-applications for work- and it's made me more hungry to learn than ever before.  

### The Homelab

What's any project if not an excuse to buy new hardware? Below is what I'll be working with:

  * Dell PowerEdge T30 Tower
    * Ubuntu 18.04 Server - *Chosen mainly for the built-in ZFS support, running KVM hypervisor*
    * Intel Xeon E3-1225 v5 3.3GHz Quad Core
    * 128GB Crucial SSD - *OS install*
    * (3) 4TB WD Red HDDs - *Configured in RAIDZ1 for fast and reliable VM storage*
    * 16GB DDR4 ECC RAM
  * Ubiquiti EdgeRouter X
  * Ubiquiti CloudKey Gen1
  * Ubiquiti Unfifi AC-LR Access Point
  * Raspberry Pi Model B - *Raspbian + PiHole*

As you can see, I've done some of the configuration already, but I'm planning on writing a future blog post on both KVM and ZFS configuration under Ubuntu. Ubiquiti and wireless networking won't be a focus of this blog, but I'll probbably throw in a few bonus posts as I go.  

### How's my driving?

Your feedback on my work is more than welcome- it is desperately needed! I'm an un-checked wannabe Linux admin with root privileges and I'm almost certainly going to wreck some servers before this is over, so if you see me doing something blatantly wrong or just irresponsible, please chime in! Leave comments below the posts or send me an [email](mailto:ray@raylyon.net), either way I'll definitely get back to you in short order. I'm happy to listen to critiques, answer questions, or just shoot the shit about Linux and tech. Let's do this!

Thanks for reading and Happy Hacking!

