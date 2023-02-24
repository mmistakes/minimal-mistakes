---
title: "How to Enable/Disable SElinux in Linux Distributions"
classes: wide
categories:
  - Tutorial
tags:
  - Linux
  - Selinux
---

Some of the Linux Distributions comes with SElinux installed, for example on Oracle Linux 7 (OL7), SELinux services were installed by default. 

Selinux can block the user from stopping certain system applications or deleting some files as it is a security application.

First check the status of SELinux to see if it's enabled or not with this command :

```
$ sestatus
```

The first line of the output should tell you the status of SElinux like this:

![enabled](https://i.imgur.com/Md2X1NK.jpg)


---


For disabling SElinux open the config file by typing :

```
$ sudo vim /etc/selinux/config
```

Change the following line :

```
SELINUX=enforcing
```

like this to disabled:

```
SELINUX=disabled
```

SElinux should now be disabled, reboot the operating system for the changes to take effect.

For enabling simply change the disabled to enforcing.