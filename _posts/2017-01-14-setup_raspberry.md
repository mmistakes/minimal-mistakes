---
title: "Setup a Raspberry PI 3"
excerpt_separator: "<!--more-->"
categories:
  - Home automation
tags:
  - Raspberry PI
---
### Setup a Raspberry PI 3

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Retrieve Raspberry PI 3](#retrieve-raspberry-pi-3)
- [Connect via SSH](#connect-via-ssh)
- [Set a static IP Address](#set-static-ip-address)
- [Enable Wifi](#enable-wifi)


#### Prerequisites

- Components < 60 EUR:

| Component        | Site           | Price  |
| ------------- |:-------------:| -----:|
| Raspberry PI 3   | [Farnell](https://www.farnell.com) | 37.69 EUR |
| Power supply Micro USB 5V 2500mA   | [Amazon](https://www.amazon.com) | 8.99 EUR |
| Micro SD Card (16 Go class 10)  | [Amazon](https://www.amazon.com) | 9.99 EUR |
| Total: |      |    56.67 EUR |

Note: This is an example as a guide. You can buy all components in others sites
and maybe with better prices.

#### Installation

 1) Download the latest version of [Raspbian image](https://www.raspberrypi.org/downloads/raspbian)
 2) Follow this [guide](https://www.raspberrypi.org/documentation/installation/installing-images/README.md) according to your OS
    or Follow this [tutorial](http://michaelcrump.net/the-magical-command-to-get-sdcard-formatted-for-fat32/). Here my commands on 
    my Mac.
    
    ```bash
     diskutil list
     sudo diskutil eraseDisk FAT32 RASPBIAN MBRFormat /dev/disk1
     diskutil unmountDisk /dev/disk1
     sudo dd bs=1m if=/Users/Lucci/Downloads/2016-11-25-raspbian-jessie.img  of=/dev/rdisk1
     sudo diskutil eject /dev/rdisk1
    ```

 3) Enable SSH

See more [here](https://www.raspberrypi.org/blog/a-security-update-for-raspbian-pixel/)

```bash
cd /boot 
touch ssh
```

 4) Plug an ethernet cable and swicth on the power supply.
 
 See more [here](https://www.raspberrypi.org/learning/hardware-guide/quickstart/)
 
 Now your Raspberry PI is ready!!! But how can I retrieve it in my LAN ?
 
 Note: If you use a screen monitor, keyboard and mouse with your Raspberry, you can skip this part and
 go to "Set a static IP Address" section.

 See more [here](https://www.raspberrypi.org/learning/hardware-guide/equipment)
 
 
#### Retrieve Raspberry PI 3
 
Follow this [tutorial](https://www.raspberrypi.org/documentation/remote-access/ip-address.md)
Example:
```bash
nmap -sn 192.168.0.0/24
```

#### Connect via SSH

```bash
ssh pi@192.168.0.11
```
with X11

```bash
ssh -Y pi@192.168.0.11
```

Note: 
```
Default username: pi
Default password: raspberry
```

Note: first of all change your password with command 

```bash
passwd
```

See this post in order to perform Raspbian basic administration [here](2017-02-28-setup_linux.md)


#### Set a static IP Address

```bash
sudo vim /etc/network/interfaces
```

Adapt with your own configuration
```text
iface eth0 inet static
    address 192.168.0.11
    netmask 255.255.255.0
    gateway 192.168.0.254
```

#### Enable WIFI

a) Edit
```
sudo vim /etc/wpa_supplicant/wpa_supplicant.conf
```

b) Adapt according to your security protocol
```text
network={
 ssid=”YOUR_SSID″
 psk=”YOUR_PASSWORD”
 proto=WPA 
 key_mgmt=WPA-PSK
 pairwise=TKIP
 auth_alg=OPEN
}
```

c) Edit 
```bash
sudo vim /etc/network/interfaces
```

d) Adapt according to your own configuration
```text
auto wlan0

allow-hotplug wlan0
iface wlan0 inet static
    address 192.168.0.11
    netmask 255.255.255.0
    gateway 192.168.0.254
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
```

e) Reboot
```bash
sudo reboot
```
 
Great !! now you can access to your Raspberry PI anywhere. You can reboot and unplug the
ethernet cable.

Note: if you want to access to your Raspberry outside your LAN. You must
forward port of your router.

Useful links: 
 - http://weworkweplay.com/play/automatically-connect-a-raspberry-pi-to-a-wifi-network/
 - https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md

#### To go further

[Interacting with GPIO](2017-02-28-test-gpio.md)



