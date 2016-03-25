---
layout: post
title: "iSCSI+LVM: Automatically Enable Volume Group Contain iSCSI Disk Physical Volume"
date: 2014-07-01 11:00:00
categories: sysadmin
---

When using iSCSI and LVM, sometimes we have to manually enable iSCSI disk that used as a physical volume in LVM. This is because LVM service is started earlier than iSCSI service so the iSCSI disk containing the physical volume is not present yet. Solution to this problem is to enable lvmetad in **/etc/lvm/lvm.conf**. The lvmetad is "LVM metadata daemon" that acts as in-memory cache of LVM metadata gathered from devices as they appear in the system. Whenever a block device appears and has PV label on it, it is automatically scanned via an udev rule. This update the lvmetad daemon with the LVM metadata found. Once the VG is complete (all the PVs making up the VG are present), the VG is activated. The lvmetad daemon is required for this LVM event-based autoactivation to work and the iSCSI disk must be present in the system after boot time.
#### enable lvmetad in lvm.conf
	use_lvmetad = 1

Reference: https://bugzilla.redhat.com/show_bug.cgi?id=474833
