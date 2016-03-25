---
layout: post
title: "MongoDB on CentOS 6"
date: 2015-02-21 08:00:00
categories: sysadmin
---

[MongoDB](https://www.mongodb.org/) is the only database that harnesses the innovations of NoSQL (flexibility, scalability, performance) and builds on the foundation of relational databases (expressive query language, secondary indexes, strong consistency). In this documentation, I will show how to install MongoDB on CentOS 6.

---
Add MongoDB repository to yum

	sudo vi /etc/yum.repos.d/mongodb.repo
    
	[mongodb]
	name=MongoDB Repository
	baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
	gpgcheck=0
	enabled=1
Install **MongoDB**

	sudo yum install mongo-10gen mongo-10gen-server --exclude mongodb-org,mongodb-org-server
Add this to `/etc/yum.conf` to prevent **MongoDB** from being upgraded

	sudo vi /etc/yum.conf
    
    ...
    exclude=mongo-10gen,mongo-10gen-server

Start **MongoDB** service and configure it to start at boot

	sudo service mongod start
    sudo chkconfig mongod on
    
Reference: https://docs.mongodb.org/v2.4/tutorial/install-mongodb-on-red-hat-centos-or-fedora-linux/
