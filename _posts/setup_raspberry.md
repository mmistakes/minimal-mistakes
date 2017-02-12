---
title: "Setup a Raspberry PI 3"
excerpt_separator: "<!--more-->"
categories:
  - Home automation
tags:
  - Raspberry PI
---

### Setup a Raspberry PI 3

#### What you need

- A Raspberry PI 3
- A micro USB Power Supply (2500mA-3000mA, output 5V)
- A miscro SD Card (8 Go class 10)

Note: You can buy it on [Farnell](https://www.farnell.com), [Amazon](https://www.amazon.com), [ebay](https://www.Ebay.com)...
It's also possible to buy a kit.

In order to interface with your Raspberry PI two solutions:
 1) over SSH with another computer.
 2) directly with a monitor, keyboard and mouse.
 
Note: If you use the solution 2, you can go to step ?.

See more: 
- https://www.raspberrypi.org/learning/hardware-guide/equipment
- https://www.raspberrypi.org/learning/hardware-guide/quickstart/

#### Download and install Raspbian

Download the latest version of Raspbian: https://www.raspberrypi.org/downloads/raspbian

Next follow this guide according to your OS version: https://www.raspberrypi.org/documentation/installation/installing-images/README.md

##### Example Write Image to SD Card from MacOS

Follow this excellent thread: http://michaelcrump.net/the-magical-command-to-get-sdcard-formatted-for-fat32/
 
Below my commands
```
 diskutil list
 sudo diskutil eraseDisk FAT32 RASPBIAN MBRFormat /dev/disk1
 diskutil unmountDisk /dev/disk1
 sudo dd bs=1m if=/Users/Lucci/Downloads/2016-11-25-raspbian-jessie.img  of=/dev/rdisk1
 sudo diskutil eject /dev/rdisk1
```

Now your Raspberry is ready to start!!! But how can I retrieve it in my LAN ?

#### Retrieve Raspberry PI 3

Follow this thread: https://www.raspberrypi.org/documentation/remote-access/ip-address.md

```
nmap -sn 192.168.0.0/24
```

#### Connect to your Raspberry PI 3

```
ssh pi@192.168.0.11
```

Default password: raspberry

Note: first of all change your password with command "passwd"

#### Set a static IP Address and Enable WIFI Interface

Follow these threads: 
 - http://weworkweplay.com/play/automatically-connect-a-raspberry-pi-to-a-wifi-network/
 - https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md

Below my config, it's an example: 

```
sudo vim /etc/network/interfaces
```

```
..
allow-hotplug wlan0
iface wlan0 inet static
    address 192.168.0.11
    netmask 255.255.255.0
    gateway 192.168.0.254
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
...
```

```
sudo vim /etc/wpa_supplicant/wpa_supplicant.conf
```
Adapt according to your security protocol
```
network={
 ssid=”YOUR_SSID″
 psk=”YOUR_PASSWORD”
 proto=WPA 
 key_mgmt=WPA-PSK
 pairwise=TKIP
 auth_alg=OPEN
}
```

#### Configure WIFI as primarely interface

```
sudo vim /etc/network/interfaces
```
Set auto to the wlan interface set above.
```
auto wlan0
```
 
Great !! now you can access to your Raspberry PI anywhere.

Note: if you want to access to your Raspberry outside your LAN. You must
forward port of your router.



