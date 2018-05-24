---
title: "Raspbian basic administration"
related: true
header:
  overlay_image: /assets/images/linux.jpg
  teaser: /assets/images/linux.jpg
categories:
  - Raspberry
tags:
  - Raspberry PI
  - Linux
---
The objective of this tutorial is to set up basic configuration of Raspbian distribution.


- [Prerequisites](#prerequisites)
- [Create user](#create-user)
- [Configure SSH](#configure-ssh)
- [Install zsh](#install-zsh)

### Prerequisites

### Create user

Change password root

Why use "adduser" instead of "useradd" ?

a. Add user
```bash
adduser new_user
```
b. Set password
```bash
passwd new_user
```
install sudo

apt-get install sudo

c. Add new user as sudoers


d. Add new user in groups root,adm,sudo
```bash
usermod -a -G root,adm,sudo new_user
```

### Configure SSH

a. Create group 
```bash
addgroup sshusers
```
b. Add new_user into the group
```bash
addgroup new_user sshusers
```

a. Edit ssh config
```
vim /etc/ssh/sshd_config
```
b. Change default parameters

- Change ssh default port
```text
Port X
```

see more [here](https://mediatemple.net/community/products/dv/204643810/how-do-i-disable-ssh-login-for-the-root-user)

- Allow a specific group and user is a good practices
```text
AllowGroups sshusers
```

c. Restart service

```bash
systemctl restart ssh.service
```

exit

example: 
```bash
ssh new_user@server-address -p X
```

```
sudo vim /etc/ssh/sshd_config
```

- No permit root login
```text
PermitRootLogin no
```

```bash
sudo systemctl restart ssh.service
```
Create a key

PubkeyAuthentication yes

See create an ssh rsa key

Host nextrun2
 Hostname hostname
 User jluccisano
 Port 22
 AddKeysToAgent yes
 UseKeychain yes
 IdentityFile ~/.ssh/id_rsa

ssh-copy-id -i ~/.ssh/id_rsa.pub -p 85 user@hostname

ssh nextrun2


- Get list of services
```bash
systemctl list-units --type=service 
```

image configure_rsync_backup.png

#### Rsync 

sudo apt-get install rsync

sudo vi /etc/default/rsync
et modifier la ligne RSYNC à true

RSYNC_ENABLE=true


sudo adduser rsync_user

sudo vi /etc/rsyncd.conf


```txt
uid = rsync_user
gid = rsync_user
max connections = 4
[nas_rsync]
path = /home/rsync_user
comment = Synchro des fichiers avec mon NAS
read only = false
```

sudo chown -R rsync_user:rsync /home/rsync_user

sudo chmod -R 775  /home/rsync_user

sudo systemctl status rsync.service

sudo systemctl enable rsync.service

addgroup sshusers rsync_user

sudo systemctl restart ssh.service


### Install zsh and oh-my-zsh (optional)

```bash
apt-get update
apt-get install curl
apt-get install zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
see more [here](https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH)
