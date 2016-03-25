---
layout: post
title: "Beanstalkd Installation on CentOS 6"
date: 2015-02-24 07:00:00
categories: sysadmin
---

[Beanstalkd](https://kr.github.io/beanstalkd/) is a simple, fast work queue. Its interface is generic, but was originally designed for reducing the latency of page views in high-volume web applications by running time-consuming tasks asynchronously. In this documentation, I will show how to install **Beanstalkd** on CentOS 6.

---
Install **Beanstalkd** from **EPEL** repository using **yum**

	sudo rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
    sudo yum install beanstalkd
Enable and start **Beanstalkd** service

	sudo chkconfig beanstalkd on
    sudo service beanstalkd start

Reference: https://kr.github.io/beanstalkd/download.html
