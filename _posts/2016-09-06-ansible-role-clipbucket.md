---
title: "Automatically Deploying ClipBucket with Ansible"
excerpt: "An Ansible role love story"
tags:
  - ansible
  - clipbucket
  - docker
---

{% include base_path %}

## Overview

[ClipBucket](http://www.clipbucket.com/) is an open source video hosting platform, similar in functionality to YouTube or Vimeo. In this guide, we'll walk through how to deploy ClipBucket to a server using the configuration management tool, Ansible. 

## tl; dr - Just Install ClipBucket<a id="just-install-clipbucket"></a>

> I don't care about Ansible or any of your thoughts and feelings about using
it to install ClipBucket. Just tell me how to install ClipBucket!

If you came here just looking for an easy way to deploy ClipBucket to a server,
the series of commands below will install ClipBucket on a bare Ubuntu 14.04
server with just a few commands:

```bash
sudo apt-get update

# Install Ansible and dependencies
sudo apt-get install -y \
  libffi-dev \
  libyaml-dev \
  libpython2.7-dev \
  libssl-dev \
  python-pip \
  python2.7-dev
sudo pip install ansible paramiko PyYAML Jinja2 httplib2 six

# Install the Ansible ClipBucket role
sudo ansible-galaxy install mtlynch.clipbucket

# Create a minimal Ansible playbook to install ClipBucket
echo "- hosts: localhost
  roles:
    - { role: mtlynch.clipbucket }" > install.yml

# Run the ClipBucket playbook locally
sudo ansible-playbook install.yml \
  --extra-vars "mysql_root_password=root" \
  --extra-vars "clipbucket_mysql_password=clipbucketpw" \
  --extra-vars "clipbucket_admin_password=admin"
```

At the end of the above commands, you will find ClipBucket running on your
server at [http://localhost/](http://localhost/). You can log in with the
Admin credentials of:

* **Username**: `admin`
* **Password**: `admin` (*change this password after logging in*)

## Why Automate ClipBucket Deployment?

ClipBucket doesn't provide much documentation about deployment. All I could find as far as official documentation was this [instructional video](http://clip-bucket.com/index.php?mode=view_guide&action=13), but it assumes that the user has already installed many of ClipBucket's dependencies.

I found [this excellent and very thorough guide](http://linoxide.com/linux-how-to/setup-clipbucket-video-sharing-website-linux/), but it's still a very manual process. The user is forced to copy/paste many different commands and it's difficult for the user to customize for their particular system.

Even after installing ClipBucket and all of its dependencies, a new deployment of ClipBucket requires the user to manually click through a web UI and enter information about their installation.

[![Complete ClipBucket installation steps]({{ base_path }}/images/2016-09-06-ansible-role-clipbucket/clipbucket-install-steps.png)]({{ base_path }}/images/2016-09-06-ansible-role-clipbucket/clipbucket-install-steps.png)

A web UI is probably nice for new users, but it's not the kind of thing you'd want to go through over and over every time you have to deploy a new server.

## Automating Installation

ClipBucket's major dependencies are Linux, Apache, MySQL, and PHP (a "LAMP stack"). Fortunately, Ansible has a concept called "roles" that allow users to package automation logic for a component and allow others to re-use this logic, even composing multiple roles together to create new roles.

We can avoid duplicating effort with [Ansible Galaxy](https://galaxy.ansible.com/list#/roles), which allows us to search for existing roles for the software we want. A quick search of Ansible Galaxy yielded the following roles:

* Apache - [geerlingguy.apache](https://galaxy.ansible.com/geerlingguy/apache/)
* MySQL - [pcextreme.mariadb](https://galaxy.ansible.com/detail#/role/2462) (actually installs MariaDB, a community-maintained drop-in replacement for MySQL)
* PHP - [geerlingguy.php](https://galaxy.ansible.com/geerlingguy/php/)

ClipBucket has some smaller dependencies, such as ImageMagick and FFMpeg, which are straightforward to install with a a command or two within our Ansible playbook (see all installation steps [here](https://github.com/mtlynch/ansible-role-clipbucket/blob/master/tasks/main.yml)).

## Automating Post-Install Steps

As mentioned earlier, ClipBucket expects the user to walk through a web UI to complete the installation. We'd like to eliminate this manual step, but this is a challenge. Ansible is designed to automate command line tasks, but is not well suited for automating user actions in a web UI.

I asked in the [ClipBucket forums](http://discourse.clipbucket.com/t/deploy-and-configure-clipbucket-automatically/2166) if there was an alternative to the web UI install and Saqib Razzaq, one of ClipBucket's developers, was kind enough to point me to some PHP and SQL scripts in the ClipBucket source that would allow me to script the post-install steps.

Many of the SQL scripts are (strangely) [just broken](https://github.com/arslancb/clipbucket/issues/223) and ClipBucket's PHP code seems to silently ignore the errors. I preferred not to silently ignore the SQL errors, so I wrote a [hacky Ansible playbook](https://github.com/mtlynch/ansible-role-clipbucket/blob/master/tasks/fix-sql-scripts.yml) to fix or delete the erroneous lines in the ClipBucket SQL scripts.

Once this was complete, I could run the ClipBucket role and completely automate the installation process. I could kick off a single command, wait for Ansible to run through the installation process, and when it was complete, I had a complete ClipBucket server running.

```shell
$ ansible-playbook install.yml

PLAY [clipbucket] *************************************************************

TASK [setup] *******************************************************************
ok: [clipbucket]

...many commands elided...

PLAY RECAP *********************************************************************
clipbucket                : ok=77   changed=48   unreachable=0    failed=0
```

[![Complete ClipBucket installation]({{ base_path }}/images/2016-09-06-ansible-role-clipbucket/clipbucket-install-complete.png)]({{ base_path }}/images/2016-09-06-ansible-role-clipbucket/clipbucket-install-complete.png)

## Automating Playbook Testing

Once I created a working playbook, I still had some work to do in refactoring my Ansible role to make the logic cleaner and more reusable. I quickly realized that it was easy to accidentally break my role this way (e.g. by accidentally deleting a necessary command). I tested for this by repeatedly running my role against a bare VM and then testing that the installation was successful, but this became a very manual and tedious process. Given that the goal of this whole endeavor is automation, I sought a way to automate the process of verifying that my Ansible role still created a working ClipBucket server.

Jeff Geerling, author of [*Ansible for DevOps*](https://leanpub.com/ansible-for-devops), has a very helpful [blog post](http://www.jeffgeerling.com/blog/testing-ansible-roles-travis-ci-github) that describes how to test Ansible playbooks automatically. Using Geerling's examples, I created a [build script](https://github.com/mtlynch/ansible-role-clipbucket/blob/master/build) that does the following:

1. Creates a bare Ubuntu 14.04 Docker container
1. Copies the ClipBucket role into the Docker container under the role name `role_under_test` (the naming is to facilitate re-use of test scripts on other roles)
1. Performs Ansible syntax and lint checks on my role
1. Installs the ClipBucket role into the Docker container
1. Runs the same install script to verify that the role is idempotent (running the same role a second time should not change state)
1. Verifies that web server within the Docker container is serving the ClipBucket application's landing page, indicating a successful install.

I'm considering expanding the testing by writing more sophisticated web flows, such as creating a new account or uploading a new video. For something of that complexity, we'd want to go beyond simple shell commands and use a browser automation tool like [Selenium](http://www.seleniumhq.org/). Perhaps this will be a topic for a future blog post.

## Final Product

My ClipBucket Ansible Role is available:

* [On Github](https://github.com/mtlynch/ansible-role-clipbucket)
* [On Ansible Galaxy](https://galaxy.ansible.com/mtlynch/clipbucket)

## Using the ClipBucket Ansible Role

*Note: If you're not familiar with Ansible and not interested in learning, see the ["Just Install Clipbucket"](#just-install-clipbucket) section at the top of this post.*

It's easy to use the ClipBucket Ansible role. To get started, you'll need to [install Ansible](https://docs.ansible.com/ansible/intro_installation.html). Then create the following files:

#### `install.yml`

```yaml
---
- hosts: clipbucket
  become_user: root
  become_method: sudo
  become: True
  vars_files:
    - secrets.yml
  roles:
    - { role: mtlynch.clipbucket }
```

#### `secrets.yml`

```yaml
---
# Change these passwords to secure, strong passphrases of your choosing.
mysql_root_password: rootpw321
clipbucket_mysql_password: dbpw123
clipbucket_admin_password: password123
```

#### `hosts`

```
clipbucket     ansible_host=1.2.3.4 # change to your server's IP or hostname
```

Then run the following commands:


```shell
ansible-galaxy install mtlynch.clipbucket
ansible-playbook install.yml
```

When the `ansible-playbook` command completes, you can navigate to your ClipBucket server and log in with the username `admin` and the password you specified in `clipbucket_admin_password`.

Try out the role and leave feedback, file bugs, or submit pull requests if you'd like to contribute.
