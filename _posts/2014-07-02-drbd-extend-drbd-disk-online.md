---
layout: post
title: "DRBD: Extend DRBD Disk Online"
date: 2014-07-02 07:00:00
categories: sysadmin
---

When using DRBD, we can grow DRBD disk online so we do not need to disturb the production process we have in the server. The requirement to this feature is the backing block device can be resized online so it is possible to resize the DRBD disk. There are two criterias that must be filled.

####1. The backing device must be managed by a logical volume manager such as LVM
####2. The resource must currently be in the Connected connection state.
First, we need to grow the backing device on both nodes and make sure only one node in Primary node.

	# lvextend -L 16GB /dev/VolGroup00/LogVol01
    
Then, resize the DRBD service to trigger a synchronization of the new section from primary node to secondary node.

	# drbdadm resize <resource>
    
If the additional space is clean, we can skip syncing the additional space by using the --assume-clean option.

	# drbdadm -- --assume-clean resize <resource>
    
After that resize the file system of DRBD device.

	# resize2fs /dev/drbdX
    
IMPORTANT: Always create backup, better safe than sorry.

References:
http://www.drbd.org/users-guide/s-resizing.html
http://lists.linbit.com/pipermail/drbd-user/2008-August/009908.html
