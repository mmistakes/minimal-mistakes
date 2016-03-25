---
layout: post
title: "DRBD: Troubleshooting and Error Recovery of Hard Drive Failure or Replacement"
date: 2014-07-01 08:00:00 
categories: sysadmin
---

**DRBD** refers to block devices designed as a building block to form high availability cluster. This is done by mirroring a whole block device via an assigned network. DRBD can be understood as network based RAID-1. ([DRBD](http://www.drbd.org/))

Sometimes we have a disk failure on hard drive which contains DRBD backing device. The following steps can be used to replace or recover the failed drive.

#### 1. detach drbd resource from broken backing storage
	# drbdadm detach <resource>
#### 2. check state of drbd disk
	# drbdadm dstate <resource>
	Diskless/UpToDate
#### 3. if using internal meta data, bind DRBD device to new hard disk
	# drbdadm create-md <resource>
	# drbdadm attach <resource>
#### 4. if using external meta data DRBD unable to recognize hard drive was swapped, need additional step
	# drbdadm create-md <resource>
	# drbdadm attach <resource>
	# drbdadm invalidate <resource>
Reference: http://www.drbd.org/users-guide-8.4/ch-troubleshooting.html
