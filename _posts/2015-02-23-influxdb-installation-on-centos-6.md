---
layout: post
title: "InfluxDB Installation on CentOS 6"
date: 2015-02-23 09:00:00
categories: sysadmin
---

[InfluxDB](http://influxdb.com/) is an open-source, distributed, time series database with no external dependencies. In this documentation, I will show how to install **InfluxDB** on CentOS 6.

---
Download **InfluxDB**

	wget https://s3.amazonaws.com/influxdb/influxdb-latest-1.x86_64.rpm
Install **InfluxDB**

	sudo rpm -ivh influxdb-latest-1.x86_64.rpm
Enable and start **InfluxDB** service

	sudo chkconfig influxdb on
    sudo service influxdb start
    
Reference: http://influxdb.com/download/
