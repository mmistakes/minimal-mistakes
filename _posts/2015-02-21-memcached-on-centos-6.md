---
layout: post
title: "Memcached on CentOS 6"
date: 2015-02-21 07:00:00
categories: sysadmin
---

[Memcached](http://memcached.org/) is free & open source, high-performance, distributed memory object caching system, generic in nature, but intended for use in speeding up dynamic web applications by alleviating database load. Memcached is an in-memory key-value store for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering. In this documentation I will show how to install **memcached** using yum package manager with [Atomicorp](https://www.atomicorp.com/) repository.

---
Install the latest Atomicorp repository from http://www6.atomicorp.com/channels/atomic/centos/6/x86_64/RPMS/

	sudo rpm -Uvh atomic-release*rpm
Then install memcached
	
    sudo yum install memcached
    
Reference: http://pkgs.org/centos-6/atomic-x86_64/memcached-1.4.22-4.el6.art.x86_64.rpm.html
