---
layout: post
title: "Varnish 4 on CentOS 6"
date: 2015-02-21 12:00:00
categories: sysadmin
---

[Varnish Cache](https://www.varnish-cache.org/) is a web application accelerator also known as a caching HTTP reverse proxy. You install it in front of any server that speaks HTTP and configure it to cache the contents. Varnish Cache is really, really fast. It typically speeds up delivery with a factor of 300 - 1000x, depending on your architecture. In this documentation, I will show how to install Varnish 4 on CentOS 6.

---
For first installation install **Varnish** repository

	sudo rpm --nosignature -i https://repo.varnish-cache.org/redhat/varnish-4.0.el6.rpm
Then install **Varnish**

	sudo yum install varnish
Start **Varnish** service and configure it to start at boot

	sudo service varnish start
    sudo chkconfig varnish on
    
Reference: https://www.varnish-cache.org/installation/redhat
