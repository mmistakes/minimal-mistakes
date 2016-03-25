---
layout: post
title: "Installing Cacti on Scientific Linux 6.4"
date: 2014-02-12 07:00:00
categories: sysadmin
---

[Cacti](http://www.cacti.net/) is a network graphic monitoring tools which used the potential of [RRDTool](http://oss.oetiker.ch/rrdtool/). RRDTool is a data logging and graphing system for time series data. Cacti can show us a real time performance of network or servers which make this software become one of the most popular open source monitoring software.
![Cacti Logo](http://www.cacti.net/images/cacti_banner.png)
###Getting Started
Always update your box before we install new software.

	# yum update
    
Install dependencies for cacti.

	# yum install mysql-server mysql php-mysql php-pear php-common php-gd php-devel php php-mbstring php-cli php-snmp php-pear-Net-SMTP php-mysql httpd
    
Then create database for cacti.

	# mysql -uroot -p
    mysql> create database cacti;
    mysql> grant all privileges on cacti.* to cacti@localhost identified by 'password';
    mysql> flush privileges;
    mysql> quit
    
###Install SNMPD
Install net-snmpd.

	# yum install net-snmp-utils php-snmp net-snmp-libs
    
Edit net-snmpd config file *snmpd.conf*.

	# vi /etc/snmp/snmpd.conf
    
    com2sec local     localhost           public
	group MyRWGroup v1         local
	group MyRWGroup v2c        local
	group MyRWGroup usm        local
	view all    included  .1                               80
	access MyRWGroup ""      any       noauth    exact  all    all    none
	syslocation Unknown (edit /etc/snmp/snmpd.conf)
	syscontact Root  (configure /etc/snmp/snmp.local.conf)
	pass .1.3.6.1.4.1.4413.4.1 /usr/bin/ucd5820stat

Start snmpd.

	# /etc/init.d/snmpd start
	# chkconfig snmpd on
    
###Install Cacti
Install cacti from EPEL Repository.

	# yum --enablrepo=epel install cacti
    
Import cacti database.

	# mysql -ucacti -p cacti < /usr/share/doc/cacti-*version*/cacti.sql
    
Then edit cacti configuration file *db.php*

	# vi /etc/cacti/db.php
    
    $database_type = "mysql";
	$database_default = "cacti";
	$database_hostname = "localhost";
	$database_username = "cacti";
	$database_password = "password";
	$database_port = "3306";

Configure cacti httpd configuration to allow cacti in your network.

	# vi /etc/httpd/conf.d/cacti.conf
    
    	Allow from 192.168.45.0/24

Restart httpd.

	# service httpd restart
    
Uncomment cacti cronjob in cron directory.

	# vi /etc/cron.d/cacti
    
    */5 * * * *     cacti   /usr/bin/php /usr/share/cacti/poller.php > /dev/null 2>&1
    
Then, run cacti installer by opening your cacti URL in web browser.

	http://yourdomain/cacti

Follow the instruction and wait several moment while cacti gather the data from log files. Log in to cacti and check your graph.

###Reference
> http://www.cyberciti.biz/faq/fedora-rhel-install-cacti-monitoring-rrd-software/
