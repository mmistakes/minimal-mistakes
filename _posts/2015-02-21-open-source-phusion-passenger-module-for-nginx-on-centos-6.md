---
layout: post
title: "Open Source Phusion Passenger Module for Nginx on CentOS 6"
date: 2015-02-21 09:00:00
categories: sysadmin
---

[Phusion Passenger](https://www.phusionpassenger.com/) is a web server and application server for your web apps which built upon Ruby or NodeJS. In this documentation I will show how to install open source version of **Phusion Passenger** on CentOS 6.6 using Ruby gem installation.

---

Check your Ruby location

    which ruby
    /usr/local/rvm/rubies/ruby-2.1.5/bin/ruby
In this tutorial I assume your Ruby is installed using RVM
Install passenger using **gem** command

	gem install passenger -V

Install passenger module for nginx

	rvmsudo passenger-install-nginx-module
Follow the installation steps and you can customize your nginx installation if you want
Download init script for nginx and install

	wget https://gist.githubusercontent.com/prasetiyohadi/90355ce4b02487261f58/raw/35319a9b63331a9503424c40489d7be27387584d/nginx
    mv nginx /etc/init.d/nginx
    sudo chmod +x /etc/init.d/nginx
    
Start nginx service

	sudo chkconfig nginx on
    sudo service nginx start
    sudo service nginx status
   
Reference:
https://www.phusionpassenger.com/documentation/Users%20guide%20Nginx.html#rubygems\_generic\_install
https://www.digitalocean.com/community/tutorials/how-to-deploy-rails-apps-using-passenger-with-nginx-on-centos-6-5
