---
title: "Core Knowledge"
permalink: /categories/career/technical_experience/core_knowledge
layout: single
author_profile: false
categories:
  - technical_experience
sidebar:
  nav: "technical_experience"
tag:
  - technical_experience
  - devops
  - tech
  - personal
  - Linux
  - C
  - Kernel
  - Networking
header:
  overlay_image: "/assets/images/categories/career/technical_experience/general/core_knowledge_1.jpg"
  teaser: "/assets/images/categories/career/technical_experience/general/core_knowledge_1.jpg"
---

# Overview

Throughout my career as a software engineer, I have acquired skills with various frameworks, technologies, and languages. Underneath all the high-level technology lies the core foundational components that make creating our applications, infrastructure, and tech stacks possible. While high-level technology is vast and far-reaching, it all relies on the foundation.

I learned from senior developers very early in my career that it is absolutely crucial to understand _what's happening under the hood_. While high-level technology drastically changes every few years, the fundamental concepts are cemented (although the implementation is subject to improvement). By understanding the core elements of technology, you will be able to understand high-level applications at a much deeper level.

# The Linux Kernel

I started my career as a Linux systems admin, and as an admin, I quickly fell in love with Linux. Although I have worked with Linux from the start of my career, it wasn't until I started working with low-latency and system-intensive applications that I started to learn about the Linux Kernel. My first insight into core kernel functionality was by trying to keep up with a conversation that the senior developers were having.

I decided that I wanted to be able to have productive conversations with the senior developers, and I would not be able to do that without a core understanding of the Linux Kernel. Therefore, I decided to pick up Robert Love’s book, “[Linux Kernel Development, 3rd Edition](https://www.amazon.com/Linux-Kernel-Development-Robert-Love/dp/0672329468/ref=as_li_ss_tl?ie=UTF8&tag=roblov-20 "https://www.amazon.com/Linux-Kernel-Development-Robert-Love/dp/0672329468/ref=as_li_ss_tl?ie=UTF8&tag=roblov-20").” Robert Love quickly transported me from _user space_ to _kernel space_ and helped me understand the magic that happens behind the curtains.

## Understanding Kernel Space

I quickly learned many interesting topics from the book such as **process management, memory management, interrupt handlers, system calls, locks, time management**, and much more. By learning these core kernel components, I was able to provide productive insight and ideas in conversations with the senior developers. I applied my newfound knowledge to applications and systems that use **kernel bypass** (via Solar Flare NICs), **network interrupts,** **time-stamping, system calls,** and **device drivers**.

Out of all the technical books I have read, Robert Love’s “[Linux Kernel Development, 3rd Edition](https://www.amazon.com/Linux-Kernel-Development-Robert-Love/dp/0672329468/ref=as_li_ss_tl?ie=UTF8&tag=roblov-20 "https://www.amazon.com/Linux-Kernel-Development-Robert-Love/dp/0672329468/ref=as_li_ss_tl?ie=UTF8&tag=roblov-20")” was by far the most important. It allowed me to look at every new application and system from the perspective of the kernel. Wearing my kernel glasses helped me find flaws in a system, as well as robust solutions that would play nice with the kernel. By understanding what goes on in _kernel space,_ I was able to envision and create a better _user space._

It is a professional goal of mine to make meaningful contributions to the Linux kernel because it is the greatest and most important piece of software ever written. It would bring me great joy to give back to the software that helped change my life.

# Network Protocols

While the kernel is the powerhouse of our systems and applications, the network is the glue that connects all the pieces of the puzzle. The cloud has done a marvelous job of abstracting core networking concepts and making it incredibly easy to build network infrastructures. This boosts productivity, but there is a downside: many young engineers are no longer learning the nuts and bolts of networking.

While this clearly boosts productivity, there is a downside to it, many young engineers are no longer learning the nuts and bolts of networking.

While working for a high-frequency, low-latency trading desk, I learned the significance of networking. I rapidly learned about all the network devices within our on-prem environment, from **Cisco** **switches** to **Metamako** devices, I read all the white pages to try to pick up as much as I could. I learned the _high-level_ configurations, setup, and topography.

## A Closer Look

I understood the value of understanding network protocols at a low level when I started analyzing the trading desk's latency with a microscope and analyzing market data. Previously, all I needed to know about **TCP/IP** was that it was slower and more reliable than **UDP** and how to configure applications to use it. But the closer I looked, the more I saw.

With the assistance of Eric Hall and his fantastic book, “[Internet Core Protocols, The Definitive Guide](https://www.oreilly.com/library/view/internet-core-protocols/1565925726/ "https://www.oreilly.com/library/view/internet-core-protocols/1565925726/"),” I was able to understand what I was seeing, and more importantly, I was able to find areas of improvement. I started to understand the core components of **TCP, IP, UDP, Multicast, DNS, ARP,** and **ICMP.** I was introduced to concepts and features like **TCP and IP headers, MRU’s and MTU’s, window sizing and protocols (sliding window protocol, slow start, Karn’s Algorithm, etc), routing, BGP, HTTP(s),** and so much more.

The information learned here helped me analyze specific components of the internal network and applications. When attempting to save nano/microseconds, analyzing every implementation counts. Although I did not have the opportunity to work with all the components highlighted in “[Internet Core Protocols, The Definitive Guide](https://www.oreilly.com/library/view/internet-core-protocols/1565925726/ "https://www.oreilly.com/library/view/internet-core-protocols/1565925726/"),” the knowledge I acquired was still impactful. The insight forced me to follow a hop from its origin, to its destination, back to its origin, and most importantly, at every pit stop along the way.

Considering all the layers of networking allowed me to configure the infrastructure and the trading systems in a more robust and impactful way. It also made it easier for me to debug and troubleshoot networking issues. In my future role, I would love to develop applications that incorporate these core networking components. I would also love to contribute meaningful code to popular networking libraries like [Requests](https://docs.python-requests.org/en/master/ "https://docs.python-requests.org/en/master/") and [Poco](https://pocoproject.org/ "https://pocoproject.org/").
