---
title: "Generating new SSH Key"
related: true
header:
  overlay_image: /assets/images/ssh.jpg
  teaser: /assets/images/ssh.jpg
categories:
  - Linux
tags:
  - SSH
  - Unix
---
The objective of this tutorial is to generate a SSH Key in order to connect to your server without set your 
password each time.


- [Prerequisites](#prerequisites)
- [Generating new SSH Key](#generating-new-ssh-key)
- [Useful commands](#useful-commands)
- [Sending SSH key to a server](#sending-ssh-key-to-a-server)

### Prerequisites

- SSH installed (ex: OpenSSH, OpenBSD Secure Shell server)

### Generating new SSH Key

1. Execute this command below, substuting in your email address
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```
2. Add the ssh key into ssh-agent

```bash
ssh-add ~/.ssh/id_rsa
```
You can see more in this [tuto](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

### Useful commands:

a. Get list of key:
```bash
ssh-add -L
```
b. Remove a key
```bash
ssh-add -D ~/.ssh/id_rsa
```
c. Copy the key into the clipboard

```bash
pbcopy < id_rsa_git_evs.pub
```
If you don't have pbcopy, you can install it easily. Here an example for
[ArchLinux](https://gist.github.com/chriscandy/753eb149e9735e852b0b) users.


### Sending SSH key to a server 

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub -p X username@address
```

### Create Alias

```
cd ~/.ssh/
touch config
subl -a config
```

```
Host syno
 Hostname luccihermes.synology.me
 User jluccisano
 Port 87
 AddKeysToAgent yes
 UseKeychain yes
 IdentityFile ~/.ssh/id_rsa_syno
```

```
ssh syno
```