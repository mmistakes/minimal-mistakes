---
layout: post
title: "Installing BIND DNS Server on CentOS 6.5"
date: 2014-02-09 07:00:00 +0700
categories: sysadmin
---

When we rent a [VPS](http://en.wikipedia.org/wiki/Virtual_private_server), we will get a public [IP address](http://en.wikipedia.org/wiki/IP_address) so we can access our VPS from anywhere in this world. But, sometimes we want a better way to access our VPS using [Domain Name](http://en.wikipedia.org/wiki/Domain_name). We will have to rent a domain name from a [Domain Name Registrar](http://en.wikipedia.org/wiki/Domain_name_registrar) and then set up our [Name server](http://en.wikipedia.org/wiki/Name_server) so that our domain name refer to our IP address. There is usually an easier way by using our registrar control panel to set up [NS records](http://en.wikipedia.org/wiki/List_of_DNS_record_types). But, if you still want to set up your own Name server, I hope this documentation will be useful for you.
#### BIND Name Server
[BIND](https://www.isc.org/downloads/bind/) or Berkeley Internet Domain Name is open source software that implements the [Domain Name System](http://en.wikipedia.org/wiki/Domain_Name_System) protocols. This is a documentation of installing BIND on CentOS 6.5 operating system.
###Getting Started
Before we install BIND, or another software, always upgrade our system first.

	# yum update

Install BIND using **yum**.

	# yum install bind bind-utils
    
Use this if you don't use IPv6.

	# echo 'OPTIONS = "4"' >> /etc/sysconfig/named

Edit file *named.conf*.

	# vi /etc/named.conf
    
    options {
        listen-on-v6 port 53 { none; };
        directory       "/var/named";
        dump-file       "/var/named/data/cache_dump.db";
        statistics-file "/var/named/data/named_stats.txt";
        memstatistics-file "/var/named/data/named_mem_stats.txt";
        allow-query     { any; };
        allow-transfer  { localhost; };
        recursion no;

        dnssec-enable yes;
        dnssec-validation yes;
        dnssec-lookaside auto;

        /* Path to ISC DLV key */
        bindkeys-file "/etc/named.iscdlv.key";

        managed-keys-directory "/var/named/dynamic";
	};

	logging {
        channel default_debug {
                file "data/named.run";
                severity dynamic;
        };
	};

	zone "." IN {
        type hint;
        file "named.ca";
	};

	zone "server.net" {
        type master;
        file "/etc/server.net.hosts";
        allow-update { none; };
	};

	zone "45.168.192.in-addr.arpa" IN {
        type master;
        file "/etc/45.168.192.db";
        allow-update { none; };
	};

	include "/etc/named.rfc1912.zones";
	include "/etc/named.root.key";

Configure zone *server.net.hosts*.

	# vi /etc/server.net.hosts
    
    $TTL 86400
	@       IN      SOA     ns1.server.net. server.server.net. (
    	            2014011807      ;serial, todays date + todays serial #
	                28800           ;refresh, seconds
	                7200            ;retry, seconds
	                604800          ;expire, seconds
	                86400           ;minimum, seconds;
	)
	server.net.  	NS      ns1.server.net.
	server.net.  	NS      ns2.server.net.
	ns1             A       192.168.45.32
	ns2             A       192.168.45.32
	server          A       192.168.45.32
	mail            A       192.168.45.32
	server.net.		A       192.168.45.32
	                MX 10   mail.server.net.
	www             A       192.168.45.32

Configure reverse *45.168.192.db*.

	# vi /etc/45.168.192.db
    
    $TTL 86400
	@       IN      SOA     ns1.server.net. server.server.net. (
    	            2014011807      ;serial, todays date + todays serial #
        	        28800           ;refresh, seconds
            	    7200            ;retry, seconds
                	604800          ;expire, seconds
	                86400           ;minimum, seconds;
	)
	45.168.192.in-addr.arpa.        IN      NS      ns1.server.net.
	45.168.192.in-addr.arpa.        IN      NS      ns2.server.net.
	32     IN      PTR     deuterion.net.

Start BIND.

	# service named start
    # chkconfig named on

For PTR record, if you are having difficulties to set the PTR record in your NS server (the IP still does not point to your domain name), ask your registrar to configure it for you.
###Testing NS Server
Change your DNS resolver to your NS server.

	# vi /etc/resolv.conf
    
    nameserver	192.168.45.32

Try to resolve domain names and IP address.

	# dig server.net
    
    ; <<>> DiG 9.8.2rc1-RedHat-9.8.2-0.23.rc1.el6_5.1 <<>> @192.168.45.32 server.net
	; (1 server found)
	;; global options: +cmd
	;; Got answer:
	;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 35404
	;; flags: qr aa rd; QUERY: 1, ANSWER: 1, AUTHORITY: 2, ADDITIONAL: 2
	;; WARNING: recursion requested but not available

	;; QUESTION SECTION:
	;server.net.                 IN      A

	;; ANSWER SECTION:
	server.net.          86400   IN      A       192.168.45.32

	;; AUTHORITY SECTION:
	server.net.          86400   IN      NS      ns2.server.net.
	server.net.          86400   IN      NS      ns1.server.net.

	;; ADDITIONAL SECTION:
	ns1.server.net.      86400   IN      A       192.168.45.32
	ns2.server.net.      86400   IN      A       192.168.45.32

	;; Query time: 0 msec
	;; SERVER: 192.168.45.32#53(192.168.45.32)
	;; WHEN: Sun Feb  9 21:10:38 2014
	;; MSG SIZE  rcvd: 115
    
    # dig -x 192.168.45.32
    
	; <<>> DiG 9.8.2rc1-RedHat-9.8.2-0.23.rc1.el6_5.1 <<>> @192.168.45.32 -x 192.168.45.32
	; (1 server found)
	;; global options: +cmd
	;; Got answer:
	;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 50675
	;; flags: qr aa rd; QUERY: 1, ANSWER: 1, AUTHORITY: 2, ADDITIONAL: 2
	;; WARNING: recursion requested but not available

	;; QUESTION SECTION:
	;32.45.168.192.in-addr.arpa.   IN      PTR

	;; ANSWER SECTION:
	32.45.168.192.in-addr.arpa. 86400 IN   PTR     server.net.

	;; AUTHORITY SECTION:
	45.168.192.in-addr.arpa. 86400  IN      NS      ns1.server.net.
	45.168.192.in-addr.arpa. 86400  IN      NS      ns2.server.net.

	;; ADDITIONAL SECTION:
	ns1.server.net.      86400   IN      A       192.168.45.32
	ns2.server.net.      86400   IN      A       192.168.45.32
	
	;; Query time: 0 msec
	;; SERVER: 192.168.45.32#53(192.168.45.32)
	;; WHEN: Sun Feb  9 21:13:23 2014
	;; MSG SIZE  rcvd: 140

That's all, we have a working NS server.
