---
title: Moving to Ubiquiti UniFi for my Home Network
excerpt: How and why I went all in with Ubiquiti UniFi for my home network
date: 2020-3-14 11:32:00 +0000
layout: single
categories: posts
tags:
 - networking
 - wireless
 - ubiquiti
 - unifi
---

## Background
I’ve had consumer routers forever. I’ve always tried to do everything with a single all-in-one router. 3 things forced me to re-think that this year:
 * We moved to a larger house and coverage was spotty in some places (particularly 5G)
 * I wanted at least 3 networks:
     - Main/trusted
     - Guest
     - IoT - Internet of Things (i have a lot of these now)
 * My old network was unstable - it would just stop working sometimes and i’d have to reboot the whole thing a few times a month

## Options
I polled some of my technically inclined friends and the recommendations came down to 2 main groupings:
 * Get a mesh system like Google or Eero
 * Get Ubiquiti

After I made the decision to go the Ubiquiti route, I spoke to even more folks and almost without fail that’s what most of my friends/colleagues were using that had moved beyond a single home router.

## Ubiquiti Options
Let me say first that I’m not a network guy. I had a couple of constraints I was interested in when trying to pick out the right gear (I only looked at the UniFi line since it’s all controlled by the awesome UniFi Controller software). 
 * I already had a decent amount of Cat5e running through my house
 * I wanted to move all my network gear to my basement where my Internet connection comes into my house

So the options were:
 * UniFi Dream Machine - an all-in-one router, firewall, switch, and high end access point (AP)
 * Mix-and-match gear to fit my house

I went with mix-and-match for 3 reasons: 
1. I wanted to use the Cat5e in my house (minimize wireless backhauls)
2. I wanted the bulk of the network gear in the basement (having the Dream Machine in the basement of the 3 story house makes no sense)
3. I still needed another AP on the top floor

## What I Bought
### Main Gear
 * Ubiquiti UniFi Switch 8 60W (w/ 4 POE ports)
 * 2 x Ubiquiti UniFi 802.11ac PRO AP
 * Ubiquiti UniFi Security Gateway (USG)
 * Raspberry Pi 4 (4GB) - to run the UniFi Controller Software
 * Power supply and 128GB Memory Card for RPI

All Total: ~$600

So this part confused me at first since I’m not a networking guy and have never bought separate networking gear. The bare minimum you need to get started replacing your existing home wireless network with UniFi gear is a USG, a switch, an AP, and the UniFi Controller software. The USG is the router and firewall. The switch is just a switch (no routing) and can have Power over Ethernet (PoE) if you need it. And the Access Point (AP) is just a wireless access point. That seemed weird to me but now I love the simplicity of having each piece of equipment be specialized in one thing. This also allows for very easy expansion (some UniFi networks have hundreds of UniFi devices: switches, APs, etc.). 

Note on UniFi Controller software: the software is free, but to take full advantage of it you need to run it on a device that is always powered on and connected to your network. You can buy a UniFi Cloud Key from Ubiquiti or you can run it on your own computer. I used a Raspberry Pi 4. 

UniFi has many options for each one of these types of devices. For the most part I went with the entry level on each. The exceptions are I wanted PoE so that was a slightly more expensive switch and I went with the nicer APs. 

### Additional Supporting Kit
 * 24 Port Patch Panel - for the Cat5e (i had a crappy, almost useless patch panel before)
 * 2U 6in Wall Mount Bracket for patch panel
 * Punch Down Tool for patch panel work
 * 8 outlet surge protector
 * Cable Tester + Crimper kit

Additional Total: ~$120

## My Setup

### Physical Setup
{% include figure image_path="/assets/images/ubiquiti_home_setup.png" alt="My Physical Ubiquiti Setup" caption="Diagram of my physical Ubiquiti setup - taken from UniFi Controller" %}

### Network Setup

#### Wireless Networks
I have 3 wireless SSIDs (UniFi APs max out at 4)
 * Main trusted network (for my laptops and phones)
 * Guest network
 * IoT network (for plugs, cameras, etc.)

*Note: these are Star Wars themed of course.*

#### VLANs
One of the things I love about UniFi is that I can have as many VLANs as I want. For my purposes I have 4 VLANs:
 * LAN Mgmnt - things connected physically to the switch
 * Guest - guest network
 * Trusted - main network for trusted devices (laptops, phones, etc)
 * IoT - Internet of Things

You may notice a complete overlap between my wireless networks and the VLANs. That’s because you can configure a wireless network to always associate with a VLAN.

#### Firewall
There are several specific things I wanted to prevent/enable that I never could on previous setups. UniFi lets me do them all. In no particular order, here are some things this awesome setup lets me do:
 * Prevent all IP cameras (I set up an IP group for this) from accessing the Internet
 * Preventing the guest and IoT networks from accessing the trusted network
 * Allowing limited access from the trusted network to devices in the IoT network (ex: printer)
 * Forcing all traffic from trusted and IoT through my pihole

## Conclusion
I highly recommend the Ubiquiti UniFi gear for home networks. For me it was worth every additional penny over mesh solutions. And I've already planned my next expansion! (to the porch since their APs are weather resistant)


## References
* <https://lazyadmin.nl/home-network/installing-unifi-controller-on-a-raspberry-pi-in-5-min/>
* <https://community.ui.com/questions/Step-By-Step-Tutorial-Guide-Raspberry-Pi-with-UniFi-Controller-and-Pi-hole-from-scratch-headless/e8a24143-bfb8-4a61-973d-0b55320101dc>
* <https://www.ui.com/products/#unifi>

