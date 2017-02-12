---
title: "Raspbian basic administration"
related: true
header:
  overlay_color: "#333"
  overlay_filter: "0.5"
  overlay_image: /assets/images/caspar-rubin-224229.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/caspar-rubin-224229.jpg
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

a. Add user
```bash
useradd new_user
```
b. Set password
```bash
passwd new_user
```
c. Add new user as sudoers
```bash 
sudo echo 'new_user ALL=(ALL) ALL' >> /etc/sudoers
```
d. Add new user in groups root,adm,sudo
```bash
usermod -a -G root,adm,sudo new_user
```

### Configure SSH

a. Create group 
```bash
groupadd sshusers
```
b. Add new_user into the group
```bash
usermod -a -G sshusers new_user
```

a. Edit ssh config
```
sudo vim /etc/ssh/sshd_config
```
b. Change default parameters

- Change ssh default port
```text
Port X
```
example: 
```bash
ssh new_user@address -p X
```
- No permit root login
```text
PermitRootLogin no
```
see more [here](https://mediatemple.net/community/products/dv/204643810/how-do-i-disable-ssh-login-for-the-root-user)

- Allow a specific group and user is a good practices
```text
AllowGroups sshusers
AllowUsers new_user
```

c. Restart service

```bash
sudo /etc/init.d/ssh restart
```
or
```bash
systemctl restart ssh.service
```
- Get list of services
```bash
systemctl list-units --type=service 
```

### Install zsh and oh-my-zsh (optional)

```bash
apt-get update
apt-get install curl
apt-get install zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```
see more [here](https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH)
