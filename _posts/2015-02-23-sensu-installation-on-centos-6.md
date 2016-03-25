---
layout: post
title: "Sensu Installation on CentOS 6"
date: 2015-02-23 10:00:00
categories: sysadmin
---

[Sensu](http://sensuapp.org/) is often described as the “monitoring router”. Essentially, Sensu takes the results of “check” scripts run across many systems, and if certain conditions are met; passes their information to one or more “handlers”. Checks are used, for example, to determine if a service like Apache is up or down. Checks can also be used to collect data, such as MySQL query statistics or Rails application metrics. Handlers take actions, using result information, such as sending an email, messaging a chat room, or adding a data point to a graph. There are several types of handlers, but the most common and most powerful is “pipe”, a script that receives data via standard input. Check and handler scripts can be written in any language, and the community repository continues to grow! In this documentation, I will show how to install **Sensu** on CentOS 6.

---
Generate SSL certificates for communication of **Sensu** components (be sure that OpenSSL is installed)

	which openssl
    openssl version
    cd /tmp
    wget http://sensuapp.org/docs/0.16/tools/ssl_certs.tar
    tar -xvf ssl_certs.tar
    cd ssl_certs
    ./ssl_certs.sh generate
Install **RabbitMQ** (requires **Erlang** from EPEL repository)

	sudo rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
    sudo yum install erlang
    sudo rpm --import http://www.rabbitmq.com/rabbitmq-signing-key-public.asc
    sudo rpm -Uvh http://www.rabbitmq.com/releases/rabbitmq-server/v3.4.4/rabbitmq-server-3.4.4-1.noarch.rpm
    sudo chkconfig rabbitmq-server on
    sudo service rabbitmq-server start
Configure **RabbitMQ** SSL listenet

	sudo mkdir -p /etc/rabbitmq/ssl
    sudo cp /tmp/sensu_ca/cacert.pem /etc/rabbitmq/ssl/
    sudo cp /tmp/server/cert.pem /etc/rabbitmq/ssl/
    sudo cp /tmp/server/key.pem /etc/rabbitmq/ssl/
    sudo vi /etc/rabbitmq/rabbitmq.config
    
    [
    {rabbit, [
    {ssl_listeners, [5671]},
    {ssl_allow_poodle_attack, true},
    {ssl_options, [{cacertfile,"/etc/rabbitmq/ssl/cacert.pem"},
					{certfile,"/etc/rabbitmq/ssl/cert.pem"},
					{keyfile,"/etc/rabbitmq/ssl/key.pem"},
					{verify,verify_peer},
					{fail_if_no_peer_cert,true}]}
  		]}
	].
    
    sudo service rabbitmq-server restart
Create a RabbitMQ vhost for Sensu

    sudo rabbitmqctl add_vhost /sensu
Create a RabbitMQ user with permissions for the Sensu vhost

    sudo rabbitmqctl add_user <rabbitmq-user> <rabbitmq-password>
Create a RabbitMQ user with permissions for the Sensu vhost

    sudo rabbitmqctl set_permissions -p /sensu sensu ".*" ".*" ".*"
(Optional) Enable the RabbitMQ web management console

	sudo rabbitmq-plugins enable rabbitmq_management
Install **Redis** (you can use tutorial in this [page](http://blog.deuterion.net/redis-in-centos-6/))
Add **Sensu** repository

	sudo vi /etc/yum.repos.d/sensu.repo
    
    [sensu]
	name=sensu-main
	baseurl=http://repos.sensuapp.org/yum/el/$releasever/$basearch/
	gpgcheck=0
	enabled=1
Install **Sensu** using **yum**

	sudo yum install sensu
Add **Sensu** SSL certificates

	 sudo mkdir -p /etc/sensu/ssl
     sudo cp /tmp/ssl_certs/client/cert.pem /etc/sensu/ssl/
     sudo cp /tmp/ssl_certs/client/key.pem /etc/sensu/ssl/
Configure **Sensu** to communicate with **RabbitMQ**

	sudo vi /etc/sensu/conf.d/rabbitmq.json
    
    {
  		"rabbitmq": {
	    "ssl": {
    	  "cert_chain_file": "/etc/sensu/ssl/cert.pem",
	      "private_key_file": "/etc/sensu/ssl/key.pem"
    	},
	    "host": "<rabbitmq-ip>",
	    "port": 5671,
	    "vhost": "/sensu",
	    "user": "<rabbitmq-user>",
	    "password": "<rabbitmq-password>"
	  }
	}
Configure **Sensu** to communicate with **Redis**

	sudo vi /etc/sensu/conf.d/redis.json
    
    {
	  "redis": {
    	"host": "localhost",
	    "port": 6379
	  }
	}
Configure **Sensu** API

	sudo vi /etc/sensu/conf.d/api.json
    
    {
 	 "api": {
    	"host": "localhost",
	    "port": 4567,
    	"user": "<api-user>",
	    "password": "<api-password>"
	  }
	}
Configure **Sensu** client

	sudo vi /etc/sensu/conf.d/client.json
    
    {
	  "client": {
	    "name": "<client-name>",
	    "address": "<clien-ip>",
	    "subscriptions": [ "all" ]
	  }
	}
Enable **Sensu** services

	sudo chkconfig sensu-server on
	sudo chkconfig sensu-client on
	sudo chkconfig sensu-api on
Start **Sensu** services

	sudo service sensu-server start
    sudo service sensu-client start
    sudo service sensu-api start

Install **Sensu** dashboard: **Uchiwa**

	sudo yum install uchiwa

Configure **Sensu** dashboard: **Uchiwa**

	sudo cp /etc/sensu/{uchiwa.json,uchiwa.json.old}
	sudo vi /etc/sensu/uchiwa.json
    
    {
	    "sensu": [
	        {
	            "name": "Sensu",
	            "host": "127.0.0.1",
	            "ssl": false,
	            "port": 4567,
	            "user": "<api-user>",
	            "pass": "<api-password>",
	            "path": "",
	            "timeout": 5000
	        }
	    ],
	    "uchiwa": {
	        "user": "<uchiwa-user>",
	        "pass": "<uchiwa-password>",
	        "port": 3000,
	        "stats": 10,
	        "refresh": 10000
	    }
	}
Enable and start **Uchiwa**

	sudo chkconfig uchiwa on
    sudo service uchiwa start
You can access **Uchiwa** in http://sensu-server-ip:3000

References: 
http://sensuapp.org/docs/0.16/guide
http://www.rabbitmq.com/install-rpm.html
