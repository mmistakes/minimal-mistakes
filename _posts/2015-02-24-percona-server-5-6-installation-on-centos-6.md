---
layout: post
title: "Percona Server 5.6 Installation on CentOS 6"
date: 2015-02-24 08:00:00
categories: sysadmin
---

[Percona Server 5.6](https://www.percona.com/software/percona-server/ps-5.6) is the latest release of drop-in replacement for MySQL®. The new version offers all the improvements found in MySQL 5.6 Community Edition plus scalability, availability, backup, and security features found only in MySQL 5.6 Enterprise Edition, which requires a support contract from Oracle to access. Percona Server 5.6 is free, open source software which includes superior diagnostics and improved integration with other Percona software. In this documentation, I will show how to install **Percona Server 5.6** on CentOS 6.

---
Install Percona repository

	sudo yum install http://www.percona.com/downloads/percona-release/redhat/0.1-3/percona-release-0.1-3.noarch.rpm
Install **Percona Server 5.6**

	sudo yum install Percona-Server-client-56 Percona-Server-server-56
Enable and start **Percona Server 5.6**

	sudo chkconfig mysql on
    sudo service mysql start
Run **mysql\_secure\_installation** to secure **Percona Server 5.6** installation

	sudo /usr/bin/mysql_secure_installation
Create user defined function (UDF) from Percona Toolkit

	mysql -u root -e "CREATE FUNCTION fnv1a_64 RETURNS INTEGER SONAME 'libfnv1a_udf.so'"
    mysql -u root -e "CREATE FUNCTION fnv_64 RETURNS INTEGER SONAME 'libfnv_udf.so'"
    mysql -u root -e "CREATE FUNCTION murmur_hash RETURNS INTEGER SONAME 'libmurmur_udf.so'"
	
Reference: https://www.percona.com/doc/percona-server/5.6/installation.html
