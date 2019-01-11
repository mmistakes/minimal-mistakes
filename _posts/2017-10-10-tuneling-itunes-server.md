---
title: "Tunelling itunes server"
related: true
header:
  overlay_image: /assets/images/maico-amorim-57141.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/maico-amorim-57141.jpg
categories:
  - Computer
tags:
  - ssh
---

Tunneling Itunes server over SSH

Itunes server 

###  Prerequisites

#### SSH Config

Check your SSH server config:

```bash
vim /etc/sshd_config
```

You need to have these params

```text
AllowTcpForwarding yes
```

#### Router config

Don't forget forwarding port

#### Restart the SSH daemon

```bash
sudo synoservicectl --restart sshd
```

### Manual

### Scripting

#### Create an RSA key

```bash
sudo synoservicectl --restart sshd
```

read + write
chmod 600 Authorized_keys 
RSAAuthentication yes

sudo synoservicectl --restart sshd
sudo chmod -R 755 /volume1/homes/YOUR_USER

http://www.uponmyshoulder.com/blog/2010/tunneling-itunes-through-ssh/

ssh -p 87 -N jluccisano@81.56.136.120  -L 3690:localhost:3689 -f
ssh -A -L 3690:localhost:3689 -N -f jluccisano@81.56.136.120
ssh -p 87 -N -L 3690:localhost:3689 jluccisano@81.56.136.120
ssh -p 87 -C -N -L  3692:localhost:3689 jluccisano@81.56.136.120

dns-sd -P jluccisano _daap._tcp local 3690 localhost 127.0.0.1 &
dns-sd -P name type domain port host IP [key=value ...]
dns-sd -P jluccisano _daap._tcp local. 3690 localhost. 127.0.0.1
dns-sd -P jluccisano _daap._tcp local 3692 localhost.local 127.0.0.1 "ffid=12345"

lsof -i -n | egrep '\<ssh\>'
lsof -i tcp | grep ^ssh
 
The following just searches for iTunes Home Sharing instances

dns-sd -B
dns-sd -B _home-sharing._tcp
dns-sd -B _daap._tcp