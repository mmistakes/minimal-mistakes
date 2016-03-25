---
layout: post
title: "RVM for Managing Ruby Version on CentOS 6"
date: 2015-02-21 11:00:00
categories: sysadmin
---

[RVM](https://rvm.io/) is a command-line tool which allows you to easily install, manage, and work with multiple ruby environments from interpreters to sets of gems. In this documentation I will show how to install RVM on CentOS 6.6.

---

Install **Development Tools**

    sudo yum groupinstall "Development Tools"

Install **mpapis public key**

    sudo gpg2 --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
or if failed

    curl -sSL https://rvm.io/mpapis.asc | sudo gpg2 --import -

Install RVM for multiuser installation

    \curl -sSL https://get.rvm.io | sudo bash -s stable

Add your user to **rvm** group

    sudo usermod -aG rvm <user>

Logout and login again then install **Ruby**

    rvm install 2.1
    rvm use --default 2.1

You have installed **Ruby** version 2.1 and set it as your default version of **Ruby**.

    ruby -v
    ruby 2.1.5p273 (2014-11-13 revision 48405) [x86_64-linux]

Reference: https://rvm.io/rvm/install
