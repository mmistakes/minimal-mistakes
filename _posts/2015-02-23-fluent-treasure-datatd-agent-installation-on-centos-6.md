---
layout: post
title: "Fluent Treasure Data (TD) Agent Installation on CentOS 6"
date: 2015-02-23 08:00:00
categories: sysadmin
---

[Fluentd](https://www.fluentd.org/) is an open source data collector, which lets you unify the data collection and consumption for a better use and understanding of data. In this documentation, I will show how to install **fluentd** (**td-agent**) on CentOS 6.

---
Pre-installation: increase number of maximum file descriptors

	ulimit -n
    sudo vi /etc/security/limits.conf
    
    *               soft    nofile          65535
	*               hard    nofile          65535
	root            soft    nofile          unlimited
	root            hard    nofile          unlimited
    
    sudo reboot
Pre-installation: network kernel optimization

	sudo vi /etc/sysctl.conf
    
    net.ipv4.tcp_tw_recycle = 1
	net.ipv4.tcp_tw_reuse = 1
	net.ipv4.ip_local_port_range = 10240 65535
    
    sudo sysctl -p
Install **fluentd** (**td-agent**)

	curl -L http://toolbelt.treasuredata.com/sh/install-redhat-td-agent2.sh | sudo sh
    sudo chkconfig td-agent on
    sudo chkconfig td-agent start

Reference: http://docs.fluentd.org/articles/install-by-rpm
