---
title: "Setup a Raspberry PI 3"
related: true
header:
  image: /assets/images/ben-moore-101.jpg
  overlay_image: /assets/images/ben-moore-101.jpg
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
 or follow this [tutorial](http://michaelcrump.net/the-magical-command-to-get-sdcard-formatted-for-fat32/). Here my commands on 
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

1) unplug the ethernet cable and run the nmap command
 
Follow this [tutorial](https://www.raspberrypi.org/documentation/remote-access/ip-address.md)
Example:
```bash
nmap -sn 192.168.0.0/24
```

Output 
```bash
tarting Nmap 7.12 ( https://nmap.org ) at 2017-04-07 13:24 CEST
Nmap scan report for 192.168.0.10
Host is up (0.016s latency).
Nmap scan report for 192.168.0.12
Host is up (0.019s latency).
Nmap scan report for 192.168.0.14
Host is up (0.0040s latency).
Nmap scan report for 192.168.0.18
Host is up (0.0017s latency).
Nmap scan report for 192.168.0.20
Host is up (0.077s latency).
Nmap scan report for 192.168.0.254
Host is up (0.0075s latency).
Nmap done: 256 IP addresses (7 hosts up) scanned in 3.04 seconds
```
2) plug the ethernet cable et re-run the nmap command
Example:
```bash
nmap -sn 192.168.0.0/24
```

Output 
```bash
tarting Nmap 7.12 ( https://nmap.org ) at 2017-04-07 13:24 CEST
Nmap scan report for 192.168.0.10
Host is up (0.016s latency).
Nmap scan report for 192.168.0.12
Host is up (0.019s latency).
Nmap scan report for 192.168.0.14
Host is up (0.0040s latency).
Nmap scan report for 192.168.0.18
Host is up (0.0025s latency).
Nmap scan report for 192.168.0.19
Host is up (0.0017s latency).
Nmap scan report for 192.168.0.20
Host is up (0.077s latency).
Nmap scan report for 192.168.0.254
Host is up (0.0075s latency).
Nmap done: 256 IP addresses (7 hosts up) scanned in 3.04 seconds
```
As we can see, a new IP address 192.168.0.19 was scanned. It's your Raspberry PI.

```bash
Host is up (0.0025s latency).
Nmap scan report for 192.168.0.19
```


### Connect via SSH

```bash
ssh pi@192.168.0.19
```
if you want to use X11

```bash
ssh -Y pi@192.168.0.119
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
output
```bash
Changing password for pi.
(current) UNIX password:
Enter new UNIX password:
Retype new UNIX password:
passwd: password updated successfully
````
See this post in order to perform Raspbian basic administration [here]({{ site.url }}{{ site.baseurl }}/raspberry/setup-linux)

### Update the Rasbpian

```bash
sudo apt-get update && sudo  apt-get upgrade
```

### Set a static IP Address

```bash
sudo apt-get install vim
sudo vim /etc/network/interfaces
```

```bash
systemctl (start|stop) vncserver-x11-serviced.service

# interfaces(5) file used by ifup(8) and ifdown(8)

# Please note that this file is written to be used with dhcpcd
# For static IP, consult /etc/dhcpcd.conf and 'man dhcpcd.conf'

# Include files from /etc/network/interfaces.d:
source-directory /etc/network/interfaces.d

auto lo
iface lo inet loopback

iface eth0 inet manual

allow-hotplug wlan0
iface wlan0 inet manual
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf

allow-hotplug wlan1
iface wlan1 inet manual
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
```

Adapt with your own configuration
```text
iface eth0 inet static
    address 192.168.0.18
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
country=FR
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
network={
 ssid="YOUR_NETWORK_SSID"
 psk="xxxxxxxxxx"
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

Set wlan0 as primary interface to lookup.
```text
auto wlan0
```
e. Set static IP and wpa-conf to wlan0
```text
allow-hotplug wlan0
iface wlan0 inet static
    address 192.168.0.18
    netmask 255.255.255.0
    gateway 192.168.0.254
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
```

Final config
```bash
# interfaces(5) file used by ifup(8) and ifdown(8)

# Please note that this file is written to be used with dhcpcd
# For static IP, consult /etc/dhcpcd.conf and 'man dhcpcd.conf'

# Include files from /etc/network/interfaces.d:
source-directory /etc/network/interfaces.d

auto wlan0
iface lo inet loopback

iface eth0 inet static
    address 192.168.0.18
    netmask 255.255.255.0
    gateway 192.168.0.254

allow-hotplug wlan0
iface wlan0 inet static
    address 192.168.0.18
    netmask 255.255.255.0
    gateway 192.168.0.254
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf

allow-hotplug wlan1
iface wlan1 inet manual
    wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf
```

f. Check config

```bash
iw dev
```

```bash
phy#0
	Interface wlan0
		ifindex 3
		wdev 0x1
		addr b8:27:eb:62:22:ca
		ssid YOUR_NETWORK_SSID
		type managed
```

g. Connection

```bash
ip link show wlan0
```
As we can see wlan0 is currently DOWN
```bash
3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state DOWN mode DORMANT group default qlen 1000
     link/ether b8:27:eb:62:22:ca brd ff:ff:ff:ff:ff:ff
```
Start UP the interface
```bash
sudo ip link set wlan0 up
```
Check
```bash
ip link show wlan0
```
```bash
 3: wlan0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP mode DORMANT group default qlen 1000
      link/ether b8:27:eb:62:22:ca brd ff:ff:ff:ff:ff:ff
```

h. Reboot

You can now unplug your ethernet wire and reboot
```bash
sudo reboot
```
 
Great !! now you can access to your Raspberry PI anywhere on your LAN with static IP address over Wifi or Ethernet. 

Note: if you want to access to your Raspberry outside your LAN. You must
forward port on your router.

Useful links: 
 - [Automatically connect a raspberry pi to a wifi network]("http://weworkweplay.com/play/automatically-connect-a-raspberry-pi-to-a-wifi-network/")
 - [Raspberry wireless configuration]("https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md")
 - [Connect to WiFi network from command line in Linux]("https://www.blackmoreops.com/2014/09/18/connect-to-wifi-network-from-command-line-in-linux")




