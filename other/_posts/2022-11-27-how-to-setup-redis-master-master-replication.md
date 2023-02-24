---
title: "How to Setup a Redis Master-Master Replication"
classes: wide
permalink: /how-to-setup-redis-master-master-replication/
---

As you might know Master-Master replication is only available for Redis labs enterprise version of Redis, however for doing master-master replication in open source redis cluster we can use Dynomite which is a tool created by Netflix.

>The ultimate goal with Dynomite is to be able to implement high availability and cross-datacenter replication on storage engines that do not inherently provide that functionality. The implementation is efficient, not complex (few moving parts), and highly performant.

More information about dynomite can be found here :
https://github.com/Netflix/dynomite/wiki/Topology

In this tutorial I will use a simple 2 server topology which both will have 1 redis instances running on them at port 6379.

Everything described on this tutorial has been tested using Debian 10 with Redis v5 and Dynomite v0.6.

<!--more-->

## Requirements

- Debian >= 9 or Ubuntu >= 16 
- Redis Server >= v5
- Dynomite >= v0.6


## Installation

- Redis installation:

```
$ sudo apt update

$ sudo apt install redis-server
```

The configuration files for redis can be found in "/etc/redis" directory.

- Dynomite Installation :

```
$ sudo apt-get -y install libtool autoconf automake
$ cd /root
$ git clone https://github.com/Netflix/dynomite.git
$ cd dynomite
$ autoreconf -fvi
$ ./configure --enable-debug=yes
$ make
$ ln -s /root/dynomite/src/dynomite /usr/local/sbin/dynomite
```

## Configuration

Our static IP settings for this tutorial are:

Server 1 IP : 1.0.0.1
Server 2 IP : 1.0.0.2

Redis ports on both server : 6379
Dynomite ports on both server : 8379

Make sure your redis instances are running in all servers, you can check with:

```
$ systemctl status redis
```

### Configure Dynomite :

**On Server 1:**

Create a yaml_files directory and create file called a-rack1-node1.yaml 

Enter this :

```
dyn_o_mite:
  datacenter: dc-a
  rack: rack1
  dyn_listen: 1.0.0.1:7379
  dyn_seeds:
  - 1.0.0.2:7379:rack1:dc-b:0
  listen: 0.0.0.0:8379
  servers:
  - 127.0.0.1:6379:1
  tokens: '0'
  secure_server_option: datacenter
  pem_key_file: dynomite.pem
  data_store: 0
  stats_listen: 127.0.0.1:22222
  read_consistency : DC_QUORUM
  write_consistency : DC_QUORUM
```

Change the "pem_key_file:" with the location of dynomite rsa pem file, you can find it in dynomite folder you downloaded from git or create your own pem key.


**On Server 2 :**

Create a yaml_files directory and create a file called b-rack1-node1.yaml 

Enter this :

```
dyn_o_mite:
  datacenter: dc-b
  rack: rack1
  dyn_listen: 1.0.0.2:7379
  dyn_seeds:
  - 1.0.0.1:7379:rack1:dc-a:0
  listen: 0.0.0.0:8379
  servers:
  - 127.0.0.1:6379:1
  tokens: '0'
  secure_server_option: datacenter
  pem_key_file: dynomite.pem
  data_store: 0
  stats_listen: 127.0.0.1:22222
  read_consistency : DC_QUORUM
  write_consistency : DC_QUORUM
```

Change the "pem_key_file:" with the location of dynomite rsa pem file, you can find it in dynomite folder you downloaded from git or create your own pem key.

***Make sure to change dyn_listen lines on both file according to the IP settings of your servers!***

Open ports 7379 and 7380 between two servers on your firewall settings as Dynomite uses those ports for transferring data.

## Testing our Setup

For testing our setup run dynomite instances in both servers, while you are in the yaml_files directory run dynomite instances using these commands:

On Server 1 :

```
$ dynomite -c a-rack1-node1.yaml
```

On Server 2 :

```
$ dynomite -c b-rack1-node1.yml
```

You can now connect to each server using redis-cli and try setting database values and see if it's been copied to other redis instance.

```
$ redis-cli -h 1.0.0.1 -p 8379
$ > SET beyaz 123


$ redis-cli -h 1.0.0.2 -p 8379
$ > GET beyaz 
# result: 123
```

### Creating systemd services for dynomite

In order to make this work on startup and start-stop easily we have to create  systemd services on both servers.

In both servers :

In the "/etc/systemd/system/" directory create 'dynomite_rack1_node1.service" file:

```
[Unit]
Description=Dynomite - Rack 1 - Node 1
ConditionPathExists=/root/dynomite
After=network.target
[Service]
Type=simple
User=root
Group=root
LimitNOFILE=1024
Restart=on-failure
RestartSec=1
startLimitIntervalSec=60
WorkingDirectory=/root/dynomite
ExecStart=/usr/local/sbin/dynomite -c /root/dynomite/yaml_files/a-rack1-node1.yaml
PermissionsStartOnly=true
[Install]
WantedBy=multi-user.target
```

Change the path and filename in the ExecStart line with correct path and name of the yaml file.

Enable the systemd service :

```
$ systemctl daemon-reload
$ systemctl enable dynomite_rack1_node1
$ systemctl start dynomite_rack1_node1
```

That's it! If you want to create a larger master-master replication setup you can change dynomite configuration YAML files.


### Resources 

https://github.com/Netflix/dynomite/wiki
