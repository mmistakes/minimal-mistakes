---
layout: post
title: "Installing Postfix and Dovecot on CentOS 6.5"
date: 2014-02-09 09:00:00
categories: sysadmin
---

Hello, I want to share a documentation how to setup a mail server using CentOS 6.5 using [Postfix](http://www.postfix.org/) as [SMTP](http://tools.ietf.org/html/rfc5321) server and [Dovecot](http://www.dovecot.org/) as [IMAP](http://tools.ietf.org/html/rfc3501)/[POP3](http://tools.ietf.org/html/rfc1939) server. Postfix is a well known [Message Transfer Agent](http://en.wikipedia.org/wiki/Message_transfer_agent) that mostly used today and Dovecot is also one of the widely used [Mail User Agent](http://en.wikipedia.org/wiki/Email_client).
###Preparing The Machine
In this documentation we use a CentOS 6.5 server and before we start, let's update the system.

	# yum update

A mail server needs to have a MX record in its DNS, so make sure we have that. It is also a good thing to set the PTR record pointing to our domain too.

	# dig server.net -t ANY
    ;; ANSWER SECTION:
	server.net.          86312   IN      MX      10 mail.server.net.
	server.net.          86306   IN      A       192.168.45.32
	server.net.          80528   IN      NS      ns2.server.net.
	server.net.          80528   IN      NS      ns1.server.net.

###Installing Postfix
![Postfix Logo](http://www.postfix.org/mysza.gif)

Then install Postfix using yum if it's not already installed.

	# yum install postfix

Edit Postfix configuration file *main.cf*,

	# vi /etc/postfix/main.cf

This is a standard configuration,

	queue_directory = /var/spool/postfix
	command_directory = /usr/sbin
	daemon_directory = /usr/libexec/postfix
	data_directory = /var/lib/postfix
	mail_owner = postfix
	myhostname = mail.server.net
	myorigin = $mydomain
	inet_interfaces = all
	inet_protocols = ipv4
	mydestination = $myhostname, localhost.$mydomain, localhost, $mydomain
	unknown_local_recipient_reject_code = 550
	alias_maps = hash:/etc/aliases
	alias_database = hash:/etc/aliases
    home_mailbox = Maildir/
    smtpd_banner = $myhostname ESMTP
    debug_peer_level = 2
    debugger_command =
         PATH=/bin:/usr/bin:/usr/local/bin:/usr/X11R6/bin
         ddd $daemon_directory/$process_name $process_id & sleep 5
	sendmail_path = /usr/sbin/sendmail.postfix
    newaliases_path = /usr/bin/newaliases.postfix
    mailq_path = /usr/bin/mailq.postfix
    setgid_group = postdrop
    html_directory = no
    manpage_directory = /usr/share/man
    sample_directory = /usr/share/doc/postfix-2.6.6/samples
    readme_directory = /usr/share/doc/postfix-2.6.6/README_FILES
    
    # SASL configuration
    smtpd_sasl_type = dovecot
    smtpd_sasl_path = private/auth
    smtpd_sasl_auth_enable = yes
    smtpd_sasl_security_options = noanonymous
    smtpd_sasl_local_domain = $myhostname
    smtpd_client_restrictions =
        permit_mynetworks,
        reject_unknown_client,
        permit
	smtpd_recipient_restrictions =
        permit_mynetworks,
        permit_auth_destination,
        permit_sasl_authenticated,
        reject
        
	# TLS configuration
	smtpd_use_tls = yes
	smtpd_tls_key_file = /etc/pki/tls/private/ssl.key
	smtpd_tls_cert_file = /etc/pki/tls/cert/ssl.crt
	smtpd_tls_loglevel = 3
	smtpd_tls_received_header = yes
	smtpd_tls_session_cache_timeout = 3600s
	tls_random_source = dev:/dev/urandom

Restart Postfix,

	# service postfix restart

###Installing Dovecot
![Dovecot Logo](http://www.dovecot.org/dovecot.gif)

Install Dovecot using yum,

	# yum install dovecot
    
Edit Dovecot configuration file *dovecot.conf*,

	# vi /etc/dovecot/dovecot.conf
    
	protocols = imap pop3
    listen = *
    dict {
    }
    !include conf.d/*.conf

Edit *10-auth.conf*,

	# vi /etc/dovecot/conf.d/10-auth.conf
    
	disable_plaintext_auth = no
    auth_mechanisms = plain login
    !include auth-system.conf.ext

Edit *10-mail.conf*,

	# vi /etc/dovecot/conf.d/10-mail.conf
   
    mail_location = maildir:~/Maildir
	mbox_write_locks = fcntl

Edit *10-master.conf*,

	# vi /etc/dovecot/conf.d/10-master.conf
    
    service imap-login {
	  inet_listener imap {
	  }
	  inet_listener imaps {
	  }
	}
	service pop3-login {
	  inet_listener pop3 {
	  }
	  inet_listener pop3s {
	  }
	}
	service lmtp {
	  unix_listener lmtp {
	  }
	}
	service imap {
	}
	service pop3 {
	}
	service auth {
	  unix_listener auth-userdb {
	  }
	  unix_listener /var/spool/postfix/private/auth {
	    mode = 0666
	    user = postfix
	    group = postfix
	  }
	}
	service auth-worker {
	}
	service dict {
	  unix_listener dict {
	  }
	}

Edit *10-ssl.conf*,

	# vi /etc/dovecot/conf.d/10-ssl.conf
    
    ssl = yes
	ssl_cert = </etc/pki/tls/cert/ssl.crt
	ssl_key = </etc/pki/tls/private/ssl.key

Start Dovecot,

	# service dovecot start
    # chkconfig dovecot on

###Testing Installation
Test your Postfix installation by sending a message using our newly installed server. Use **telnet** on your mail server on port **25**.

	$ telnet mail.server.net 25
    Trying 192.168.45.32...
    Connected to mail.server.net.
    Escape character is '^]'.
	220 mail.server.net ESMTP
    EHLO mail.server.net
    250-mail.server.net
	250-PIPELINING
	250-SIZE 10240000
	250-VRFY
	250-ETRN
	250-STARTTLS
	250-AUTH PLAIN LOGIN
	250-ENHANCEDSTATUSCODES
	250-8BITMIME
	250 DSN
    MAIL FROM: <admin@server.net>
    250 2.1.0 Ok
    RCPT TO: <user@gmail.com>
    250 2.1.5 Ok
    DATA
    354 End data with <CR><LF>.<CR><LF>
    From: Administrator <admin@server.net>
	To: User <user@gmail.com>
	Subject: Test Mail Server
	Test Mail Server
	.
	250 2.0.0 Ok: queued as 54549110F

Check your Gmail inbox to see if the message sent successfully. Then check Dovecot using **telnet** on your mail server on port **143**.

	$ telnet mail.server.net 143
	Trying 192.168.45.32...
	Connected to mail.server.net.
	Escape character is '^]'.
	* OK [CAPABILITY IMAP4rev1 LITERAL+ SASL-IR LOGIN-REFERRALS ID ENABLE IDLE STARTTLS AUTH=PLAIN AUTH=LOGIN] Dovecot ready.
	aa login user password
	aa OK [CAPABILITY IMAP4rev1 LITERAL+ SASL-IR LOGIN-REFERRALS ID ENABLE IDLE SORT SORT=DISPLAY THREAD=REFERENCES THREAD=REFS MULTIAPPEND UNSELECT CHILDREN NAMESPACE UIDPLUS LIST-EXTENDED I18NLEVEL=1 CONDSTORE QRESYNC ESEARCH ESORT SEARCHRES WITHIN CONTEXT=SEARCH LIST-STATUS] Logged in
	ab select INBOX
	* FLAGS (\Answered \Flagged \Deleted \Seen \Draft $Forwarded)
	* OK [PERMANENTFLAGS (\Answered \Flagged \Deleted \Seen \Draft $Forwarded \*)] Flags permitted.
	* 0 EXISTS
	* 0 RECENT
	* OK [UIDVALIDITY 1390092598] UIDs valid
	* OK [UIDNEXT 7] Predicted next UID
	* OK [HIGHESTMODSEQ 1] Highest
	ab OK [READ-WRITE] Select completed.
	ac logout
	* BYE Logging out
	ac OK Logout completed.
	Connection closed by foreign host.

Congratulation! Now you have a working SMTP and IMAP/POP3 server! :D
