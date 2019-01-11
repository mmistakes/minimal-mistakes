---
title: "Install Xiaomi Camera "
related: true
header:
  image: /assets/images/ben-moore-101.jpg
  overlay_image: /assets/images/ben-moore-101.jpg
  teaser: /assets/images/ben-moore-101.jpg
categories:
  - Computer
tags:
  - Linux
  - SSH
---
The objective of this tutorial is to set up a Xiaomi Camera 

- [Prerequisites](#prerequisites)
- [Hacking](#hacking)
    - [flashing](#flashing)
    - [qr](#qr)
- [Synology Surveillance](#synology_surveillance)

### Prerequisites

- Components < 60 EUR:

| Component        | Site           | Price  |
| ------------- |:-------------:| -----:|
| Xiaomi XiaoFang Camera IP   | [Gearbest](http://www.gearbest.com/blog/how-to/ap-mode-to-connect-xiaomi-1080p-smart-ip-camera-to-phone-1323) | 37.69 EUR |
| Micro SD Card (32 Go class 10)  | [Amazon](https://www.amazon.com) | 9.99 EUR |
| Total: |      |    56.67 EUR |



diskutil partitionDisk /dev/disk2 GPT FAT32 PART1 100M ExFAT PART2 R

wget https://github.com/samtap/fang-hacks/releases/download/0.2.0/fanghacks_v0.2.0.zip



http://rostylesbonstuyaux.fr/tuto-jeedom-camera-ip-xiaomi-xiaofang-1080p/








```bash
sudo diskutil eraseDisk FAT32 CAMERA MBRFormat /dev/disk2

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


diskutil unmountDisk /dev/disk2

Unmount of all volumes on disk1 was successful


sudo dd bs=1m if=/Users/Lucci/Downloads/fanghacks_v0.2.0.img  of=/dev/disk2
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

set static ip on specific mac address on your router 

not update the firmware otherwise downgrade it

https://ahkhai.com/tag/surveillance-station/

https://miui-france.org/threads/utilisation-de-la-xiaomi-smart-camera-avec-synology.22774/

Known issue https

https://home-assistant.io/components/camera.synology/

sudo vim /volume1/@appstore/SurveillanceStation/device_pack/camera_support/Xiaomi.conf

```bash
[Xiaomi*XiaoFang]
api = custom
default_fps_h264_1920×1080 = 10
default_image-quality = 5
h264 = rtsp
mpeg4 = rtsp
mjpeg = rtsp
motion = h264,mpeg4,mjpeg
motion_param = sensitivity,threshold
rtsp_keepalive = none
rtsp_protocol = auto,udp,tcp
resolutions_mjpeg = 1280x720,1920×1080
resolutions_mpeg4 = 1280x720,1920×1080
resolutions_h264 = 1280x720,1920×1080
fps_mjpeg_[1280x720,1920×1080] = 5,10,15,20,25,30
fps_mpeg4_[1280x720,1920×1080] = 5,10,15,20,25,30
fps_h264_[1280x720,1920×1080] = 5,10,15,20,25,30
audio_format = G726,PCM
default_audio_format = PCM
```

http://www.gearbest.com/ip-cameras/pp_487830.html

sudo vim /volume1/document/SSCamExport_export-xiaomi/.ExpCam

refresh before import 

path = '/unicast'
live_path = '/unicast'
http://www.androidpimp.com/home-security-cameras/xiaomi-xiaofang-review

see more [here](https://github.com/samtap/fang-hacks)


https://github.com/EliasKotlyar/Xiaomi-Dafang-Hacks