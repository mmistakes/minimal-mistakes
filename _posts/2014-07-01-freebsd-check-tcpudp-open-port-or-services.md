---
layout: post
title: "FreeBSD Check TCP/UDP Open Port or Services"
date: 2014-07-01 09:00:00
categories: sysadmin
---

In this short tutorial I will show how to check TCP/UDP open port or services in FreeBSD box. For checking open port or services which uses port in FreeBSD simply issue the following commands.
####1. check TCP connection
	# sockstat -Ptcp
####2. check UDP connection
	# sockstat -Pudp
Combine with **grep** to search port used by specific service or service which using specific port.
####3. use grep to get service or port
	# sockstat -Ptcp | grep <port number>
    # sockstat -Ptcp | grep -i <service name>
    # sockstat -Pudp | grep <port number>
    # sockstat -Pudp | grep -i <service name>
