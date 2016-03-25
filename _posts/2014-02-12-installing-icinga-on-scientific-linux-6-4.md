---
layout: post
title: "Installing Icinga on Scientific Linux 6.4"
date: 2014-02-12 08:00:00
categories: sysadmin
---

[Icinga](https://www.icinga.org/) is a well-known server or [network monitoring](http://en.wikipedia.org/wiki/Network_monitoring) that runs in many Unix/Linux distribution. Server/Network monitoring is an essential part of [Network Operations Center](http://en.wikipedia.org/wiki/Network_operations_center) because by monitoring network engineers can always get the feedback and status from network and production servers. This is a simple documentation of Icinga installation in Scientific Linux 6.4 server.
###Getting started
Before we install icinga, it best to keep our system updated.

	# yum update
    
Search icinga package using **yum search** in *RPMForge* repository.

	# yum --enablerepo=rpmforge search icinga
    Loaded plugins: priorities, refresh-packagekit, security
	=============================== N/S Matched: icinga ==============================
	icinga-api.x86_64 : PHP api for icinga
	icinga-devel.x86_64 : Provides include files that Icinga-related applications may compile against
	icinga-doc.x86_64 : documentation icinga
	icinga-gui.x86_64 : Web content for icinga
	icinga-idoutils.x86_64 : database broker module for icinga
	icinga-idoutils-libdbi-mysql.x86_64 : database broker module for icinga
	icinga-idoutils-libdbi-pgsql.x86_64 : database broker module for icinga
	icinga-web-module-pnp.noarch : PNP Integration module for Icinga Web
	icinga.x86_64 : Open Source host, service and network monitoring program
	icinga-web.noarch : Open Source host, service and network monitoring Web UI
	nagios-plugins.x86_64 : Host/service/network monitoring program plugins for Nagios/Icinga
	nagios-plugins-setuid.x86_64 : Host/service/network monitoring program plugins for Nagios/Icinga requiring setuid
	Name and summary matches only, use "search all" for everything.

Install icinga and the dependencies.

	# yum --enablerepo=rpmforge install icinga icinga-gui icinga-doc icinga-idoutils-libdbi-mysql
    # yum install mysql-server mysql-client libdbi libdbi-devel libdbi-drivers libdbi-dbd-mysql
    
Create database for icinga.

	# mysql -uroot -p
    mysql> CREATE DATABASE icinga;
	mysql> GRANT USAGE ON icinga.* TO 'icinga'@'localhost' IDENTIFIED BY 'icinga' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0;
	mysql> GRANT SELECT, INSERT, UPDATE, DELETE, DROP, CREATE VIEW, INDEX, EXECUTE ON icinga.* TO 'icinga'@'localhost';
	mysql> FLUSH PRIVILEGES;
	mysql> quit
    
After we create database for icinga, import the database template to icinga database.

	# mysql -uicinga -p icinga < /usr/share/doc/icinga-idoutils-libdbi-mysql-1.8.4/db/mysql/mysql.sql
    
Don't forget to disable *Selinux* if you do not use it. Insert database credential into file *ido2db.cfg*.

	# vi /etc/icinga/ido2db.cfg
    
    db_name=icinga
    db_user=icinga
    db_pass=icinga
    
Now we can start icinga and don't forget to start ido2db too.

	# /etc/rc.d/init.d/ido2db start
    # /etc/rc.d/init.d/icinga start
    # /etc/rc.d/init.d/httpd restart
    # chkconfig ido2db on
    # chkconfig icinga on
    
Add icinga user or update password of existing one using command below.

	# htpasswd /etc/icinga/passwd youradmin
    
###Testing Icinga
We can now access icinga via this URL on browser.

	http://yourdomain/icinga

Review the status and fix errors if any. Now you have your own icinga up and running. Congrats!
