---
layout: post
title:  "Vagrant AWS provider with private repositories"
excerpt: Vagrant AWS provider with private repositories
tags: [vagrant, AWS, provider, vm, virtual machine]
modified: "2016-02-15"
comments: true
---

As you probably know, [Vagrant](http://docs.vagrantup.com/v2/getting-started/index.html) is a very powerful tool powered by [Mitchell Hashimoto](https://github.com/mitchellh) and many [providers](http://docs.vagrantup.com/v2/getting-started/providers.html) are available with vagrant such as:

* VirtualBox
* AWS
* Vmware
* ...

I often use Vagrant with [Virtualbox](https://www.virtualbox.org/) for my dev environments and it's very easy to deal with it thanks to the good documentation and community.

But I recently faced a problem when trying to use the same vagrant provisioning through [Jenkins](http://jenkins-ci.org/) and [AWS provider](https://github.com/mitchellh/vagrant-aws).

## The facts

Actually, when working with AWS provider, you use the features offered by AWS to start virtual machines in the cloud, like every other VMs you could use with AWS.
With a good Vagrantfile you can start a VM, run your provisioning, stop the VM,... **in the cloud**, just like you do on your local machine (but configurations are a little bit different).

Plugin installation:

{% highlight bash %}
vagrant plugin install vagrant-aws
{% endhighlight %}

The Vagrantfile will look like the following:

{% highlight ruby %}
Vagrant.configure("2") do |config|
  config.vm.box = "dummy"

  config.vm.provider :aws do |aws, override|
    aws.access_key_id = "YOUR KEY"
    aws.secret_access_key = "YOUR SECRET KEY"
    aws.session_token = "SESSION TOKEN"
    aws.keypair_name = "KEYPAIR NAME"

    aws.ami = "ami-7747d01e"

    override.ssh.username = "ubuntu"
    override.ssh.private_key_path = "PATH TO YOUR PRIVATE KEY"
  end
end
{% endhighlight %}

And the command line will be:

{% highlight bash %}
vagrant up --provider='aws'
{% endhighlight %}


In my case, I start VMs through AWS provider from a Jenkins server **(installed on an AWS virtual machine instance)** to run my tests or to build vagrant boxes.

In my projects, I use public repositories from Github (works perfectly well), but I also use **private repositories hosted on a private Gitlab server**.

And the problem is there, with private repositories because.... **it's PRIVATE !! And authorizations, keys,... are required**.

This is the macro description of my Jenkins/vagrant/projects interactions:

* I push my code to my private Gitlab repository (on AWS).
* Jenkins (on AWS too) pull the latest changes from the repo (on AWS).
* Jenkins start the building process to test my code.
* Jenkins stop and destroy VM when process is complete

**Every build of jenkins use the AWS provider to run tests on a VM, so it's a VM (Jenkins), starting another VM (through AWS provider).**

During the building process, many private repositories are called with git commands (sometimes through [Composer](https://getcomposer.org/doc/00-intro.md)).

## The problems

* **Problem 1 -** The Jenkins server must have:
    * an SSH key usable with the private Gitlab repositories
    * a correct host key in its .ssh/known_hosts file to avoid this famous question:

    {% highlight bash %}
    The authenticity of host '[hostname] ([IP address])' can't be established.
    RSA key fingerprint is [key fingerprint].
    Are you sure you want to continue connecting (yes/no)?
    {% endhighlight %}

* **Problem 2 -** Each VM started through AWS provider by Jenkins must have:
    * an SSH key usable with the private Gitlab repositories
    * a correct host key in its .ssh/known_hosts file

## The solutions

**The first problem** can be solved putting a valid SSH key on the Jenkins server.
Be careful the ssh key used by default is named `id_rsa`.
If you want to use a specific ssh key for a specific domain just add this code in a `.ssh/config` file:

{% highlight bash %}
Host HOST_NAME
    User USER_NAME
    HostName DOMAIN_NAME
    IdentityFile PATH_TO_YOUR_SSH_KEY_FILE
{% endhighlight %}

You could also use the following command to change the default key used by ssh:

{% highlight bash %}
$ ssh-add ~/.ssh/CUSTOM_KEY.pem
{% endhighlight %}

To avoid the "known hosts question", just connect to the server with ssh, and execute a manual `git clone` or a ssh connection to the gitlab server.
Then answer **yes** to the question and the fingerprint will be added in the known_hosts file once and for all.

This way the Jenkins server can pull everything needed from the private repositories.

**The second problem** is a little bit more difficult to solve because every VM started by Jenkins automatically, must have a valid SSH key and a correct host key in its .ssh/known_hosts file.
And we have no choice, these information need to be defined automatically too.

And a good way to do this, is to use provisioning, the provisioning launched on every VM started with AWS provider.

**Ansible tasks for ssh key, config and known host files**

{% highlight yaml %}
- name: Copy SSH private key
  sudo: no
  copy: src=~/.ssh/id_rsa dest=~/.ssh/gitlab.pem mode=600

- name: Copy SSH config
  sudo: no
  copy: src=/var/lib/jenkins/ec2_config_ssh dest=~/.ssh/config mode=600

- name: Copy SSH known hosts
  sudo: no
  copy: src=/var/lib/jenkins/ec2_known_hosts_ssh dest=~/.ssh/known_hosts mode=600
{% endhighlight %}

To create the `/var/lib/jenkins/ec2_known_hosts_ssh` file just get the finger print from the `~/.ssh/known_hosts` file from Jenkins server.

Indeed, we can't connect to a VM and do a manual `git clone` or ssh connection, because VMs are started and destroyed for each building process.

**Of course, the files mentioned in the example above must be present on the Jenkins server to be used for each build process**

Another solution to the second problem could be to build a base AMI containing all these configurations and remove the previous provisioning.

You want to build your own AMI ?

* [https://www.packer.io/intro/getting-started/build-image.html](https://www.packer.io/intro/getting-started/build-image.html)
* [https://www.packer.io/docs/builders/amazon.html](https://www.packer.io/docs/builders/amazon.html)
