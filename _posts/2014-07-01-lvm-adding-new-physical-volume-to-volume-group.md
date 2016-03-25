---
layout: post
title: "LVM: Adding New Physical Volume to Volume Group"
date: 2014-07-01 12:00:00
categories: sysadmin
---

Linux LVM is a logical volume manager for Linux kernel. Logical volume manager provides method of allocation space in mass storage device that more flexible than traditional partitioning scheme. Logical volume manager can create, resize, and combine partitions, potentially without interrupting system. ([Wikipedia](http://en.wikipedia.org/wiki/Logical_Volume_Manager_(Linux)))

#### schema: new device /dev/sda

#### 1. create needed partitions, label them with 8e (Linux LVM)
    # fdisk /dev/sda
#### 2. format partitons
	# mkfs.ext4 /dev/sda1
#### 3. create physical volume
	# pvcreate /dev/sda1
####  4. extend existing volume group
	# vgextend VolGroup00 /dev/sdb1
#### 5. extend existing logical volume
	extend LogVol01 to 16GB
	# lvextend -L 16G /dev/VolGroup00/LogVol01
	adding 1GB to LogVol01
	# lvextend -l+1G /dev/VolGroup00/LogVol01
#### 6. resize logical volume to new size
	# resize2fs /dev/VolGroup00/LogVol01
#### 7. create new logical volume
	create new logical volume with size 16GB
	# lvcreate -L 16GB -n LogVol02 VolGroup00
	create new logical volume with all free space
	# lvcreate -l+100%FREE -n LogVol02 VolGroup00
#### 8. format new logical volume
	# mkfs.ext4 /dev/VolGroup00/LogVol02

Reference: http://sujithemmanuel.blogspot.com/2007/04/how-to-add-disk-to-lvm.html
