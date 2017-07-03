---
title:  "Docker or Ansible?"
excerpt: "What I answer when one ask me if they should go for Docker or Ansible"
published: true
header:
  image: https://ojacques.github.io/images/docker.or.ansible.jpg
categories:
- blog
tags:
- devops
---

I'm asked quite often if the team should go with Ansible or with Docker when 
starting to automate deployments. Those teams have been running their application
for a while either on bare metal or VMs and, as they are on the journey to 
continuous delivery, this topic comes up often.

![Docker or Ansible?](/images/docker.or.ansible.jpg)

## Starting to answer

I start my answers with a variation of "you build it, you own it". My first
message is that one need to assimilate that under this DevOps philosophy, no
architect in an ivory tower will, nor should, come up with a pre-baked solution.
Yet, there is a ton of experience and definitely tools which we came to prefer
to solve certain problems over time.

To help decide what to use in which situation, I prefer to talk about what
problems Ansible and Docker solve (tools, not toys!).

## Ansible

Ansible helps to make sure that installation is fully automated, end-to-end.
Allows to have  multiple environments, variables to configure them and implement
an automated, repeatable installation / upgrade process. Ansible will work fine
with existing infrastructure. Using Infrastructure as code – you can go one step
further and manage... Well, the infrastructure **as code**: version it, test it,
test and test  again, spawn as many environments as you need. Give Ansible API
keys, and it will create the virtual machines, assign IP addresses, put in place
the network, create storage and attach it to the VMs.

Problems that Ansible solves: 
-	Manual, error prone install procedures
- Long downtimes when upgrading / installing
- Inconsistencies between staging and production or even DEV due to manual tweaking over time
- Different install procedures for Dev, staging or production, making production deploys "surprise"
- Creating a new environment (company split/merge, need for a new staging or production) is
costly and requires high expertise
- Inability to improve the installation process over time (the install procedure
is code which can be managed as such: version control, automatically tested, ...)
- Disaster recovery relies too much on backup of the data or full systems backup. The actual
infrastructure / dependencies / software install is not taken into account and
is restored manually
- Running commands (maintenance, troubleshooting) across machines in a cluster
is cumbersome. Even more so when machines have different roles and inventory
of machines evolves constantly

## Docker

Docker creates lightweight wrappers around entire applications / clusters and/or
small utilities to encapsulate a runtime in a safe, known environment.
Containers are spawned in few seconds and destroyed as easily.

Problem that Docker solves:
- Deploying tools, utilities or services running concurrently on one machine
 leads to dependency management nightmare (Java, NodeJS, Python, libC, other)
- Having to manage servers / VMs separately to manage process/dependency
 separation, leading to CPU/Memory and storage wastage (Docker overhead is
 minimal).
- Inability to run multiple versions of the same application on the same host without
interfering. Making Continuous Integration / automated testing concurrently
very hard (the static test environment becomes a bottleneck).
- Installing VMs, then dependencies, then software is slow (~in hours for a
cluster). Even using pre-baked VM images (packer.io or similar). 
- Over provisioning infrastructure for dev and test purposes

# Additional considerations

And then, there are some additional elements which I like to consider on top:
-	Managing infrastructure as code will not be fully cloud agnostic (unless you
use cloud wrappers which are not ideal either). When using automation
to create/manage your infrastructure, this code will be linked to the
cloud APIs. The good news is that everything which is above the
infrastructure (dependencies, then the solution itself)
is cloud agnostic. We usually look at a 2 steps approach:
  - Ansible playbooks to manage the infrastructure and its inventory
  - Ansible playbooks to manage the application on top of the infrastructure 
  (leveraging the inventory from above)
-	It's not all Docker or all Ansible (at least in a first phase). Both 
help solve problems and a combination is most certainly needed.
-	Many teams use Docker for CI/CD use case, as it allows to have multiple
instances of the same application run in parallel on the same host (Jenkins), without
conflicts and minimum overhead. Perfect for automated regression testing. 
  - This can also be used to create micro/on demand test environments for 
    developers ("docker-compose up" and you get a fully functional Hadoop 
    cluster in minutes) or even for SIT/UAT.
-	Many teams implement their automated deployment procedure with Ansible, and
target their existing staging / production infrastructure. 
-	Docker is often used for CI/CD and get rapid feedback when introducing code
changes. Later in the automated CD pipeline, there is a step to deploy the
entire solution – using Ansible - to a cloud/IaaS and run another batch
of tests. This multilayer approach combine the best of both world: fast/rapid
testing for fast feedback, and constant rehearsals of actual install on
staging/production infrastructure.

# And more...

True, there is a ton of additional considerations to take into account when looking
to automate deployments. Yet, the biggest error would be to not **get started now**.