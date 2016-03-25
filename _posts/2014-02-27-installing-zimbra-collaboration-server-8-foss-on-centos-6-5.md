---
layout: post
title: "Installing Zimbra Collaboration Server 8 FOSS on CentOS 6.5"
date: 2014-02-27 07:00:00
categories: sysadmin
---

[Zimbra](http://www.zimbra.com/) is a well known collaboration suite which includes email, calendaring, file sharing, activity streams, social communities and more. The most popular product from Zimbra is Zimbra Collaboration Server. Zimbra Collaboration Server comes with two version: Network Edition and Open Source Edition (FOSS). This documentation shows a simple way to install Zimbra Collaboration Server Open Source Edition in CentOS 6.5.

![Zimbra Logo](/images/zimbrs.svg)

###Getting Started


Prepare the system

	# yum update

Disable SELinux

	# vi /etc/sysconfig/selinux
		SELINUXTYPE=disabled

Disable firewall

	# service iptables stop
	# service ip6tables stop
	# chkconfig iptables off
	# chkconfig ip6tables off

Disable postfix

	# service postfix stop
	# chkconfig postfix off

Edit hosts file

	# vi /etc/hosts
		192.168.1.91	your.zimbra-domain.com

Install dependencies

	# yum install nc wget nano make nc sudo sysstat libtool-ltdl glibc perl ntp

Edit ntp configuration file

	# vi /etc/ntp.conf
		#server 3.centos.pool.ntp.org iburst
		server your.ntp-server.com iburst

Start ntpdate service

	# service ntpdate start
	# chkconfig ntpdate on
    
Make sure you have setup your NS records for your ZCS

	your.zimbra-domain.com	IN	A		192.168.1.91
    						IN	MX 10	your.zimbra-domain.com

###Zimbra Installation


Download zimbra collaboration server open source edition from [here](http://files2.zimbra.com/downloads/8.0.6_GA/zcs-8.0.6_GA_5922.RHEL6_64.20131203103705.tgz)

	# cd /tmp
	# wget http://files2.zimbra.com/downloads/8.0.6_GA/zcs-8.0.6_GA_5922.RHEL6_64.20131203103705.tgz

Extract ZCS

	# tar zxvf zcs-8.0.6_GA_5922.RHEL6_64.20131203103705.tgz

Install ZCS and follow the instructions

	# cd zxvf zcs-8.0.6_GA_5922.RHEL6_64.20131203103705
	# ./install.sh

Set http for web access

	# su zimbra
	$ zmtlsctl http
	$ zmcontrol restart

Now you can access your new ZCS installation in http://your.zimbra-domain.com/.
