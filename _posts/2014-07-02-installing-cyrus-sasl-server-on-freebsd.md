---
layout: post
title: "Installing Cyrus SASL Server on FreeBSD"
date: 2014-07-02 11:00:00
categories: sysadmin
---

###Instalation using FreeBSD ports

Login as root then enter ports directory of Cyrus SASL and run following command.

	# cd /usr/ports/security/cyrus-sasl2-saslauthd
	# make config ; make install clean
	# rehash

Create file *smtpd.conf* in directory */usr/local/lib/sasl2/*.
	
    # ee /usr/local/lib/sasl2/smtpd.conf

Then add following lines.

    pwcheck_method: saslauthd
    mech_list: plain login

Edit file *rc.conf* so that SASL Authentification server can start at boot time.

	# ee /etc/rc.conf
    saslauthd_enable="YES"
    saslauthd_flags="-a pam"
    
if you want to use other authentication mechanism such as LDAP, use following flags.

    saslauthd_flags="-a ldap"

Save and run the startup script.

    # /usr/local/etc/rc.d/saslauthd start
    # /usr/local/etc/rc.d/saslauthd status

If SASL Authentification server is running, the terminal will show output similar to this.

	saslauthd is running as pid 1234.
