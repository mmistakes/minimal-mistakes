---
layout: post
title: "Playing with Ansible and FreeBSD"
date: 2015-06-08 07:00:00
categories: sysadmin
---

By default, FreeBSD doesn't install a python package in its standard distribution. So, we need to install python, either manually or using __ansible__ module.

	$ ansible freebsd-host -m raw -a 'env ASSUME_ALWAYS_YES=YES pkg install python' -u root

Of course before we can use __ansible__ we have to install public key authentication and enable SSH to root user in FreeBSD host from controller machine. FreeBSD install python in different path than Linux machine, so we must set variable for the python interpreter, either in host file or variable files.

	ansible_python_interpreter: "/usr/local/bin/python"

Then test installed python interpreter.

	$ ansible freebsd-host -m ping -u root
	<ip address> | success >> {
		"changed": false,
		"ping": "pong"
    }

For new installation of FreeBSD, we should update port distribution using __portsnap__.
The ad-hoc command

	$ ansible freebsd-host -m command -a "/usr/sbin/portsnap fetch extract"

The playbook

	---
	- hosts: freebsd-host
      remote_user: root
      vars:
        ansible_python_interpreter: /usr/local/bin/python
      tasks:
      - name: update portsnap
        command: /usr/sbin/portsnap fetch extract

After that we are ready to begin using __ansible__ to automate our servers.
