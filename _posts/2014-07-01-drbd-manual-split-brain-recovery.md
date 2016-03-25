---
layout: post
title: "DRBD: Manual Split Brain Recovery"
date: 2014-07-01 07:00:00
categories: sysadmin
---

Split Brain in DRBD is a condition where each host think that resource in another host is outdated, thus synchronization won't be occured. This condition often occurs because of network or power failure which is indicated by these variables:
#### log: Split-Brain detected, dropping connection
#### connection-state: StandAlone/WFConnection
To manually recover the cluster from split brain condition, the following steps is required.
#### 1. on victim connection state must be StandAlone
	# drbdadm disconnect <resource>
#### 2. set victim as secondary
	# drbdadm secondary <resource>
#### 3. reconnect victim
	# drbdadm connect --discard-my-data <resource>
#### 4. on the survivor, if the connection state StandAlone enter following command
	# drbdadm connect <resource>
Reference: http://www.drbd.org/users-guide-8.4/s-resolve-split-brain.html
