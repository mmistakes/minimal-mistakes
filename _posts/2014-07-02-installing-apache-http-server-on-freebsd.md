---
layout: post
title: "Installing Apache HTTP Server on FreeBSD"
date: 2014-07-02 10:00:00
categories: sysadmin
---

###Installation using FreeBSD ports

Login as root, then to make sure our server's hostname can be identified locally we need to edit */etc/hosts*.

	# ee /etc/hosts
	::1               localhost localhost.example.com
	127.0.0.1         localhost localhost.example.com
	192.168.1.11      host.example.com

Install Apache HTTP Server using following command, choose default for options, select OK.

    # cd /usr/ports/www/apache22
    # make config; make install clean
    # rehash

After installation proses finished, change Apache configuration file.

	# ee /usr/local/etc/apache22/httpd.conf
	ServerAdmin you@example.com
	ServerName host.example.com:80

To enable SSL support, uncomment following line.

	Include etc/apache22/extra/httpd-ssl.conf

Save, then exit **ee** and open Apache' SSL configuration file.

	# ee /usr/local/etc/apache22/extra/httpd-ssl.conf
    ServerName host.example.com:443
    ServerAdmin you@example.com
	SSLCertificateFile /usr/local/openssl/certs/host.example.com-cert.pem
  	SSLCertificateKeyFile /usr/local/openssl/certs/host.example.com-unencrypted-key.pem

Save and exit.

###Testing Apache HTTP Server Installation

Check possible error on configuration files.

	# apachectl configtest
    
If it shows **Syntax OK** then there is no error in configuration files. Change */etc/rc.conf* so that Apache can start at boot time.
	
    # ee /etc/rc.conf
    apache22_enable="YES"
    apache22_http_accept_enable="YES"

Save and exit from text editor and start Apache with following command.

	# /usr/local/etc/rc.d/apache22 start

Test Apache by opening our domain in internet browser.

	http://host.example.com/

Test SSL support by opening our domain in HTTPS protocol. 
	
    https://host.example.com/
