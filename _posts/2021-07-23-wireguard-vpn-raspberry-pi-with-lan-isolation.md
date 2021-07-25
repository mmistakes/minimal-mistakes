---
title: WireGuard VPN on Raspberry Pi with LAN Isolation
excerpt: How to setup a personal VPN on a Raspberry Pi with LAN isolation using PiVPN - WireGuard
date: 2021-07-23 11:32:00 +0000
layout: single
categories: posts
tags:
 - raspberrypi
 - vpn
 - linux
 - firewall
 - wireguard
 - pivpn
---
This guide walks through setting up a VPN server ([WireGuard](https://www.wireguard.com/)) on a Raspberry Pi using [PiVPN](http://www.pivpn.io/) and then isolating VPN traffic from your LAN.

{% include figure image_path="/assets/images/VPN_LAN_isolation.png" alt="VPN LAN Isolation Diagram" caption="Diagram of VPN with LAN isolation using Raspberry PI" %}

**Note:** These packages change daily. This was built/documented in Summer 2021 so your mileage may vary.
{: .notice--info}

**Not for OpenVpn:** These instructions apply to the WireGuard configuration for pivpn. See instructions for openvpn [here](https://www.impedancemismatch.io/posts/vpn-on-raspberry-pi-with-lan-isolation/).
{: .notice--warning}

## Setup Raspberry Pi

Follow the default [installation instructions](https://www.raspberrypi.org/documentation/installation/installing-images/README.md) to setup Raspbian on a Raspberry Pi. I used the Stretch Lite image and had reasonable success.

## Make sure packages are up to date
```bash
$ sudo apt-get update
$ sudo apt-get upgrade
```

## Install PiVPN
The good folks at PiVPN have made this part dead simple. Kudos to them!

```bash
$ curl -L https://install.pivpn.io | bash
```

Follow the prompts to configure for your particular WireGuard setup.

I used the following settings, but here is a good guide with more info: [How to turn your Raspberry Pi into a Home VPN Server using PiVPN](http://kamilslab.com/2017/01/22/how-to-turn-your-raspberry-pi-into-a-home-vpn-server-using-pivpn/)
* Network Interface: **eth0**
* Local Users: **customuser** _(it's recommended to not use the default *pi* user)_
* Enable Unattended Upgrades: **yes**
* Protocol: **UDP**
* WireGuard VPN port: **custom** _(a non-standard port selection is more secure)_
* Public IP vs DNS Name: **DNS name** _(I setup a domain for this, but an IP is okay too if it's fairly static)_
* DNS Provider: **up to you**

### Default IP space for VPN
WireGuard's default IP range for WireGuard at the time of writing is `10.6.0.0/24`. If this works for you, then you can ignore the rest of this subsection.

If you want to change the default to something else (ex: `10.7.0.0/24`) **before** adding users, modify the defaults in the pivpn WireGuard config file: `/etc/pivpn/wireguard/setupVars.conf`. If you want to change this default **after** you've added a user, you will need to update the additional following files:
- `/etc/wireguard/wg0.conf`
- `/etc/wireguard/configs/[clientname].conf` 

## Add a VPN User

```bash
$ pivpn add #follow the prompts
```

## Add Clients
There are various ways to add config files to your particular client device - I personally found the QR code approach to be the easiest, but that is beyond the scope of this tutorial.

## Network Config
If you are hosting this inside a LAN you will need to open up the port number that you configured above in your external firewall.

## Setup firewall
This section assumes that you are hosting this inside your local area network (LAN). If you plan to share your VPN connection with friends, you may want to prevent the VPN from having access to the rest of your network. If you plan to use this entirely for private use, then the extra precautions here are probably unnecessary.

This is not a tutorial on iptables. DigitalOcean and many others have good tutorials.

### Add isolation via iptables

In a typical setup, the iptables FORWARD chain is what we need to deal with to isolate VPN traffic from the LAN. This is because traffic **to** the VPN server is handled by the INPUT chain and traffic **from** the VPN server is handled by the OUTPUT chain. Traffic destined for another location but transiting the VPN server (your LAN devices for instance) is handled by the FORWARD chain.

**Note:** If you want to put restrictions on the INPUT, don't forget to add your VPN port (configured above) to be accepted - pivpn/WireGuard setup should do this for you, but it's worth verifying.
{: .notice--info}
**Note 2:** If you have configured your Raspberry Pi to be in your router's DMZ (NOT recommended), then you will definitely want to lock down the INPUT chain.
{: .notice--info}

#### Remove one of the WireGuard defaults in iptables
By default, WireGuard assumes you want the server to have no (destination) restrictions on the traffic originating (source) from the VPN IP Range. If you run `sudo iptables --list --line-numbers` you see a line like the following at the beginning (probably the 2nd one) of the FORWARD chain:
```bash
-A FORWARD -s 10.6.0.0/24 -i wg0 -o eth0 -m comment --comment wireguard-forward-rule -j ACCEPT
```
You will need to remove this rule from iptables as it will render all the following instructions useless. 

#### Limit access

We need to add at least two rules to the FORWARD section to block LAN traffic while allowing traffic to/from the Internet.
1. Allow traffic to the Internet/DNS/Gateway/etc. Find your personal routers IP address. We'll assume 192.168.0.1 for this. Now add a rule to allow traffic.
```bash
sudo iptables -A FORWARD -d 192.168.0.1/32 -j ACCEPT
```

2. Now block LAN-bound traffic. Check your OpenVPN/PiVPN settings, but for this we'll use 10.8.0.0/24 for VPN traffic and 192.168.0.0/24 as LAN traffic.
```bash
sudo iptables -A FORWARD -s 10.8.0.0/24 -d 192.168.0.0/24 -j DROP
```

### Save iptables configuration
If you want to have the iptables configuration load by default, then follow the instructions here: [Persistent Iptables Rules in Ubuntu 16.04 Xenial ](http://dev-notes.eu/2016/08/persistent-iptables-rules-in-ubuntu-16-04-xenial-xerus/)

### Allowlist device for VPN LAN access
There are cases where you may want to allow access to the LAN from certain devices. For you example, you may want your laptop to have unrestricted access while limiting any other users.

#### Check the WireGuard defauls
When you add a new client WireGuard creates a default IP address for each client - this makes this step far easier than [openvpn](https://www.impedancemismatch.io/posts/vpn-on-raspberry-pi-with-lan-isolation/#whitelist-device-for-vpn-lan-access). You can check and modify that address in the following two places (*both need to be modified and reloaded on clients* if you make a change):
- `/etc/wireguard/wg0.conf`
- `/etc/wireguard/configs/[clientname].conf`

Add the IP addresses you want on your allowlist to the iptables rules:
```bash
$ sudo iptables -I FORWARD <position num> -s 10.6.0.2 -d 192.168.0.0/24 -j ACCEPT
```
**Note:** It's important that the allowlisted IPs come before DROP line we added earlier. 
You can see the order by typing "iptables -L --line-numbers".
Make sure you choose a 'position num' that comes before the the DROP line.
{: .notice--info}

And following the instructions above, you can persist these firewall changes.

## Conclusion
Okay. That's it. You should now have a personal VPN hosted in your LAN that prevents VPN traffic from LAN access. :rocket:

## References
* <http://www.pivpn.io/>
* <http://kamilslab.com/2017/01/22/how-to-turn-your-raspberry-pi-into-a-home-vpn-server-using-pivpn/>
* <https://www.wireguard.com/quickstart/>
* <https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-using-iptables-on-ubuntu-14-04>
* <https://help.ubuntu.com/community/IptablesHowTo>
* <https://askubuntu.com/questions/872852/block-internet-access-and-keep-lan-access-firewall>
* <https://superuser.com/questions/843457/block-traffic-to-lan-but-allow-traffic-to-internet-iptables>
* <https://tecadmin.net/enable-logging-in-iptables-on-linux/#>
* <http://dev-notes.eu/2016/08/persistent-iptables-rules-in-ubuntu-16-04-xenial-xerus/>
* Awesome diagram built using <https://www.draw.io/>
* <http://dnaeon.github.io/static-ip-addresses-in-openvpn/>
