---
layout: post
title: "Installing MySQL Server on FreeBSD"
date: 2014-07-02 12:00:00
categories: sysadmin
---

### Installation using FreeBSD ports
Login as root, then to make sure our server's hostname can be identified locally we need to edit /etc/hosts.
    
    # ee /etc/hosts
    ::1               localhost localhost.example.com
    127.0.0.1         localhost localhost.example.com
    192.168.1.11      host.example.com
    
Install MySQL Server with following command.

    # cd /usr/ports/databases/mysql56-server
    # make -D BUILD_OPTIMIZED install clean
    # rehash

After installation finished, run script for installing main database and tables used by MySQL.

	# mysql_install_db --user=mysql –basedir=/usr/local/

Run following command to start MySQL daemon and create password for MySQL's root.
    # mysqld_safe &
    # mysqladmin -u root password 'localpassword'
    # mysqladmin -u root -h host.example.com password 'remotepassword'

MySQL has three types of configuration files i.e. *my-small.cnf, my-medium.cnf, my-large.cnf,* and *my-huge.cnf*. Copy suitable configuration file to */var/db/mysql*.

	# cp /usr/local/share/mysql/my-medium.cnf /var/db/mysql/my.cnf

To deactivate MySQL TCP Networking edit MySQL configuration file.

	# ee /var/db/mysql/my.cnf
	skip-networking

Save and exit text editor.

### Test MySQL Server Installation

In order MySQL to start at boot time, edit file */etc/rc.conf*

	# ee /etc/rc.conf
	mysql_enable="YES"

Restart MySQL to apply change in configuration file.

	# /usr/local/etc/rc.d/mysql-server restart

For checking if MySQL is running correctly, run following command.

	# mysqlshow –p

If MySQL running then the following output will appear.

    +---------------------------+
    |         Databases         |
    +---------------------------+
    | information_schema        |
    | mysql                     |
    | test                      |
    +---------------------------+

If there is error then the error log is saved in file */var/db/mysql/host.example.com.err*. Check the permission of */tmp* directory.

	# ls -ld /tmp 
	drwxrwxrwt    7 root  wheel      512 Feb 17 12:00 /tmp

If the output is not the same with line above, repair it with following command.

    # chown root:wheel /tmp
    # chmod 777 /tmp
    # chmod =t /tmp

Installation of MySQL Server is finished.
