---
layout: post
title: "Heartbeat Using Different UDP Ports for Different Clusters on Same Network"
date: 2014-07-02 09:00:00
categories: sysadmin
---

**Heartbeat** is a daemon that provides cluster infrastructure (communication and membership) services to its clients. This allow clients to know appearance or disappearance of peer processes on other machines and to easily exchange message with them.([Heartbeat - Linux-HA](http://linux-ha.org/wiki/Heartbeat))

Heartbeat clusters work only one on same network so if we setup different cluster (different authkeys) on same network it will show up as an error in log file. We can still setup more than one cluster in same network by setting different communication port for heartbeat.

The following example show configuration file for two different clusters in same network.
####host configuration
	192.168.123.1	host1.cluster1
    192.168.123.2	host2.cluster1
    192.168.123.3	host1.cluster2
    192.168.123.4	host2.cluster2
####first cluster
#####/etc/ha.d/ha.cf
	debugfile /var/log/ha-debug
    logfile /var/log/ha-log
    logfacility local0
    keepalive 2
    deadtime 20
    udpport 694
    udp eth0
    bcast eth0
    node host1.cluster1 host2.cluster1
    auto_failback on
    debug 1
####second cluster
#####/etc/ha.d/ha.cf
	debugfile /var/log/ha-debug
    logfile /var/log/ha-log
    logfacility local0
    keepalive 2
    deadtime 20
    udpport 695
    udp eth0
    bcast eth0
    node host1.cluster2 host2.cluster2
    auto_failback on
    debug 1
Reference: http://www.gossamer-threads.com/lists/linuxha/users/57074
