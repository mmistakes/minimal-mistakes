---
layout: post
title: "Redis on CentOS 6"
date: 2015-02-21 10:00:00
categories: sysadmin
---

[Redis](http://redis.io/) is an open source, BSD licensed, advanced key-value cache and store. It is often referred to as a data structure server since keys can contain strings, hashes, lists, sets, sorted sets, bitmaps and hyperloglogs. In this documentation, I will show how to install **Redis** on CentOS 6.

---
Install **Development Tools**

    sudo yum groupinstall "Development Tools"
Download and extract latest Redis package from http://redis.io/
	
	wget http://download.redis.io/releases/redis-2.8.19.tar.gz
    tar zxf redis-2.8.19.tar.gz
Go to redis directory and run make

	cd redis-2.8.19
    make
it is a good idea to run make test

	sudo yum install tcl
    make test
Then run make install

	sudo make install
Add `/usr/local/bin` and `/usr/local/sbin` to your **secure_path** in `/etc/sudoers`

Install as service

	sudo ./utils/install-server.sh
    Welcome to the redis service installer
	This script will help you easily set up a running redis server

	Please select the redis port for this instance: [6379]
    Selecting default: 6379
    Please select the redis config file name [/etc/redis/6379.conf]
    Selected default - /etc/redis/6379.conf
    Please select the redis log file name [/var/log/redis_6379.log]
    Selected default - /var/log/redis_6379.log
    Please select the data directory for this instance [/var/lib/redis/6379]
    Selected default - /var/lib/redis/6379
    Please select the redis executable path [/usr/local/bin/redis-server]
    Selected config:
    Port           : 6379
    Config file    : /etc/redis/6379.conf
    Log file       : /var/log/redis_6379.log
    Data dir       : /var/lib/redis/6379
    Executable     : /usr/local/bin/redis-server
    Cli Executable : /usr/local/bin/redis-cli
    Is this ok? Then press ENTER to go on or Ctrl-C to abort.
    Copied /tmp/6379.conf => /etc/init.d/redis_6379
    Installing service...
    Successfully added to chkconfig!
    Successfully added to runlevels 345!
    Starting Redis server...
    Installation successful!
Test your redis installation

	redis-cli
    127.0.0.1:6379>INFO

Reference: http://redis.io/download
