---
layout: post
title: "Elasticsearch on CentOS 6"
date: 2015-02-23 07:00:00
categories: sysadmin
---

[Elasticsearch](https://www.elasticsearch.org/overview/elasticsearch) is a distributed restful search and analytics. In this documentation, I will show how to install **Elasticsearch** on CentOS 6.

---
Install Oracle Java

	wget --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u31-b13/server-jre-8u31-linux-x64.tar.gz
    sudo mkdir /opt/jre
    sudo tar zxf server-jre-8u31-linux-x64.tar.gz -C /opt/jre
    sudo update-alternatives --install /usr/bin/java java /opt/jre/jdk1.8.0_31/bin/java 2000
    sudo update-alternatives --install /usr/bin/javac javac /opt/jre/jdk1.8.0_31/bin/javac 2000
    sudo update-alternatives --display java
    sudo update-alternatives --display javac
Import **Elasticsearch** GPG key

	sudo rpm --import https://packages.elasticsearch.org/GPG-KEY-elasticsearch
Add **Elasticsearch** repository

	sudo vi /etc/yum.repos.d/elasticsearch.repo
    
    [elasticsearch-1.4]
	name=Elasticsearch repository for 1.4.x packages
	baseurl=http://packages.elasticsearch.org/elasticsearch/1.4/centos
	gpgcheck=1
	gpgkey=http://packages.elasticsearch.org/GPG-KEY-elasticsearch
	enabled=1
Install **Elasticsearch** using **yum**

	sudo yum install elasticsearch
Start **Elasticsearch** service

	 sudo service elasticsearch start
     sudo chkconfig elasticsearch on

Reference: https://www.elasticsearch.org/guide/en/elasticsearch/reference/current/setup-repositories.html
