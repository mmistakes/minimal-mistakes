---
layout: post
title: "SMTP: Debugging SMTP with TLS/SSL and Auth"
date: 2014-07-01 13:00:00
categories: sysadmin
---

SMTP use TLS/SSL to secure connection to server and AUTH so only authenticated user can use the SMTP service. This tutorial will show steps to debug SMTP TLS/SSL and AUTH from Linux/Unix terminal.

####1. encode your login information in base64, the following perl command which requires MIME::Base64 will do encoding
	# perl -MMIME::Base64 -e 'print encode_base64("\000your_username\000your_password")'
	AHlvdXJfdXNlcm5hbWUAeW91cl9wYXNzd29yZA==
####2. connect to smtp server
	normal non-secured SMTP
	# telnet smtp.yourdomain.com 25
    
	TLS connection, check STARTTLS support with EHLO command
	# telnet smtp.yourdomain.com 25
    220 SMTP banner
    EHLO smtp.yourdomain.com
    250 SMTP banner
    250-smtp.yourdomain.com
    250-PIPELINING
    250-SIZE 36360000
    250-VRFY
    250-ETRN
    250-STARTTLS
    250-ENHANCEDSTATUSCODES
    250-8BITMIME
    250 DSN
    quit
    # openssl s_client -starttls smtp -crlf -connect smtp.yourdomain.com:25
    
    SSL connection
    # openssl s_client -crlf -connect smtp.yourdomain.com:465
####3. check AUTH support with EHLO command
	connect to secure SMTP using TLS or SSL
	# openssl s_client -starttls smtp -crlf -connect smtp.yourdomain.com:25
	or
	# openssl s_client -crlf -connect smtp.yourdomain.com:465
	...
    EHLO smtp.yourdomain.com
    250-smtp.yourdomain.com
    250-PIPELINING
    250-SIZE 36360000
    250-VRFY
    250-ETRN
    250-AUTH PLAIN LOGIN
    250-AUTH=PLAIN LOGIN
    250-ENHANCEDSTATUSCODES
    250-8BITMIME
    250 DSN
    quit
####4. use AUTH command to authenticate
	connect to secure SMTP using TLS or SSL
    # openssl s_client -starttls smtp -crlf -connect smtp.yourdomain.com:25
    or
    # openssl s_client -crlf -connect smtp.yourdomain.com:465
    ...
    HELO smtp.yourdomain.com
    250 smtp.yourdomain.com
    AUTH PLAIN AHlvdXJfdXNlcm5hbWUAeW91cl9wYXNzd29yZA==
    235 2.7.0 Authentication successful
    if failed
    535 5.7.8 Error: authentication failed: authentication failure
####5. test sending message
    connect to secure SMTP using TLS or SSL
    # openssl s_client -starttls smtp -crlf -connect smtp.yourdomain.com:25
    or
    # openssl s_client -crlf -connect smtp.yourdomain.com:465
    ...
    HELO smtp.yourdomain.com
    250 smtp.yourdomain.com
    AUTH PLAIN AHlvdXJfdXNlcm5hbWUAeW91cl9wYXNzd29yZA==
    235 2.7.0 Authentication successful
    MAIL FROM: <your_username@yourdomain.com>
    250 2.1.0 OK
    RCPT TO: <your_destination@domain.com>
    250 2.1.5 OK
    DATA
    354 End data with <CR><LF>.<CR><LF>
    From: Your Name <your_username@yourdomain.com>
    To: Your Destination Name <your_destination@domain.com>
    Subject: Your Email Subject
    Your Email Content
    .
    250 2.0.0 Ok: queued as 6A4C1D5153E
    quit
    Connection closed by foreign host.
Reference: https://qmail.jms1.net/test-auth.shtml
