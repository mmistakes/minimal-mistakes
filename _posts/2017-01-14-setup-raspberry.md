---
title: "Setup a Raspberry PI 3"
related: true
header:
  overlay_color: "#333"
  overlay_filter: "0.5"
  overlay_image: /assets/images/ben-moore-101.jpg
  caption: ""
  teaser: /assets/images/ben-moore-101.jpg
categories:
  - Raspberry
tags:
  - Raspberry PI
  - Linux
  - SSH
---
The objective of this tutorial is to set up a Raspberry PI 3 from scratch.


- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Retrieve Raspberry PI 3](#retrieve-raspberry-pi-3)
- [Connect via SSH](#connect-via-ssh)
- [Set a static IP Address](#set-a-static-ip-address)
- [Enable Wifi](#enable-wifi)


### Prerequisites

- Components < 60 EUR:

| Component        | Site           | Price  |
| ------------- |:-------------:| -----:|
| Raspberry PI 3   | [Farnell](https://www.farnell.com) | 37.69 EUR |
| Power supply Micro USB 5V 2500mA   | [Amazon](https://www.amazon.com) | 8.99 EUR |
| Micro SD Card (16 Go class 10)  | [Amazon](https://www.amazon.com) | 9.99 EUR |
| Total: |      |    56.67 EUR |

Note: This is an example as a guide. You can buy all components in others sites
and maybe with better prices.

### Installation

 1. Download the latest version of [Raspbian image](https://www.raspberrypi.org/downloads/raspbian)
 2. Write image into the SD Card
 
 Follow this [guide](https://www.raspberrypi.org/documentation/installation/installing-images/README.md) according to your OS
 or Follow this [tutorial](http://michaelcrump.net/the-magical-command-to-get-sdcard-formatted-for-fat32/). Here my commands on 
 my Mac.
    
a. Retrieve the SD card mount point

```bash
    diskutil list
```
    
Output:
```bash
/dev/disk0 (internal, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:      GUID_partition_scheme                        *500.1 GB   disk0
   1:                        EFI EFI                     209.7 MB   disk0s1
   2:                  Apple_HFS Macintosh HD            499.2 GB   disk0s2
   3:                 Apple_Boot Recovery HD             650.0 MB   disk0s3

/dev/disk1 (external, physical):
   #:                       TYPE NAME                    SIZE       IDENTIFIER
   0:     FDisk_partition_scheme                        *15.9 GB    disk1
   1:             Windows_FAT_32 NO NAME                 15.9 GB    disk1s1 
```
    
Note: We can see the SD Card is mounted on "dev/disk1 (external, physical)" 
    
b. Format the SD Card 

```bash
 sudo diskutil eraseDisk FAT32 RASPBIAN MBRFormat /dev/disk1
```

Template: 
```bash
diskutil eraseDisk {filesystem} {Name} MBRFormat /dev/{disk identifier}
```
Output:

```bash
Password:
Started erase on disk1
Unmounting disk
Creating the partition map
Waiting for partitions to activate
Formatting disk1s1 as MS-DOS (FAT32) with name RASPBIAN
512 bytes per physical sector
/dev/rdisk1s1: 31085888 sectors in 1942868 FAT32 clusters (8192 bytes/cluster)
bps=512 spc=16 res=32 nft=2 mid=0xf8 spt=32 hds=255 hid=2 drv=0x80 bsec=31116286 bspf=15179 rdcl=2 infs=1 bkbs=6
Mounting disk
Finished erase on disk1
```

c. Unmount the SD Card

```bash
 diskutil unmountDisk /dev/disk1
```

Output:

```bash
Unmount of all volumes on disk1 was successful
```

d. Write image into the SD Card

```bash
sudo dd bs=1m if=/Users/Lucci/Downloads/2017-03-02-raspbian-jessie.img  of=/dev/disk1
```

template: 
```bash
sudo dd bs=1m if={raspbian image path} of=/dev/{disk identifier}
```

Output:

```bash
4190+0 records in
4190+0 records out
4393533440 bytes transferred in 437.696112 secs (10037863 bytes/sec)
```

e. Enable SSH

In order to enable SSH, all you need to do is to put a file called ssh in the /boot/ directory.
 
 ```bash
cd /Volumes/boot
```
```bash
boot touch ssh
```

See more [here](https://www.raspberrypi.org/blog/a-security-update-for-raspbian-pixel/)

f. Eject the SD Card
  
```bash
diskutil eject /dev/disk1
``` 

Output:

```bash
Disk /dev/disk1 ejected
```
Now, the SD Card is ready to use.

g. Plug an ethernet cable and swicth on the power supply.
 
 See more [here](https://www.raspberrypi.org/learning/hardware-guide/quickstart/)
 
 Now your Raspberry PI is ready!!! But how can I retrieve it in my LAN ?
 
 Note: If you use a screen monitor, keyboard and mouse with your Raspberry, you can skip this part and
 go to "Set a static IP Address" section.

 See more [here](https://www.raspberrypi.org/learning/hardware-guide/equipment)
 
 
### Retrieve Raspberry PI 3
 
Follow this [tutorial](https://www.raspberrypi.org/documentation/remote-access/ip-address.md)
Example:
```bash
nmap -sn 192.168.0.0/24
```

### Connect via SSH

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

See this post in order to perform Raspbian basic administration [here]({{ site.url }}{{ site.baseurl }}/linux/setup-linux)


### Set a static IP Address

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

### Enable WIFI

a. Edit
```
sudo vim /etc/wpa_supplicant/wpa_supplicant.conf
```

b. Adapt according to your security protocol
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

c. Edit 
```bash
sudo vim /etc/network/interfaces
```

d. Adapt according to your own configuration
```text
auto wlan0

allow-hotplug wlan0
iface wlan0 inet static
    address 192.168.0.11
    netmask 255.255.255.0
    gateway 192.168.0.254
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
```

e. Reboot
```bash
sudo reboot
```
 
Great !! now you can access to your Raspberry PI anywhere. You can reboot and unplug the
ethernet cable.

Note: if you want to access to your Raspberry outside your LAN. You must
forward port of your router.

Useful links: 
 - [Automatically connect a raspberry pi to a wifi network]("http://weworkweplay.com/play/automatically-connect-a-raspberry-pi-to-a-wifi-network/")
 - [Raspberry wireless configuration]("https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md")



