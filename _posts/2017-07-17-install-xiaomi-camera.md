---
title: "Install Xiaomi Camera "
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
The objective of this tutorial is to set up a Xiaomi Camera 

- [Prerequisites](#prerequisites)


http://rostylesbonstuyaux.fr/tuto-jeedom-camera-ip-xiaomi-xiaofang-1080p/

http://www.gearbest.com/blog/how-to/ap-mode-to-connect-xiaomi-1080p-smart-ip-camera-to-phone-1323



```bash
sudo diskutil eraseDisk FAT32 CAMERA MBRFormat /dev/disk1

Started erase on disk1
Unmounting disk
Creating the partition map
Waiting for partitions to activate
Formatting disk1s1 as MS-DOS (FAT32) with name CAMERA
512 bytes per physical sector
/dev/rdisk1s1: 60746752 sectors in 1898336 FAT32 clusters (16384 bytes/cluster)
bps=512 spc=32 res=32 nft=2 mid=0xf8 spt=32 hds=255 hid=2 drv=0x80 bsec=60776446 bspf=14831 rdcl=2 infs=1 bkbs=6
Mounting disk
Finished erase on disk1


diskutil unmountDisk /dev/disk1

Unmount of all volumes on disk1 was successful


sudo dd bs=1m if=/Users/Lucci/Downloads/fanghacks_v0.2.0.img  of=/dev/disk1
```

CTRL-T

160+0 records in
159+0 records out
166723584 bytes transferred in 99.281523 secs (1679301 bytes/sec)

Eject

power on camera

Put sd card wait clanking

```bash
nmap -sn 192.168.0.0/24
```

``` bash
Starting Nmap 7.12 ( https://nmap.org ) at 2017-07-18 22:08 CEST
Nmap scan report for 192.168.0.10
Host is up (0.0099s latency).
Nmap scan report for 192.168.0.12
Host is up (0.012s latency).
Nmap scan report for 192.168.0.14
Host is up (0.0041s latency).
Nmap scan report for 192.168.0.15
Host is up (0.00029s latency).
Nmap scan report for 192.168.0.18
Host is up (0.0023s latency).
Nmap scan report for 192.168.0.254
Host is up (0.0025s latency).
Nmap done: 256 IP addresses (6 hosts up) scanned in 2.69 seconds
```

http://192.168.0.18/cgi-bin/hello.cgi