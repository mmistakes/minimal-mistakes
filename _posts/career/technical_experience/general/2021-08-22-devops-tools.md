---
title: "DevOps Tools"
permalink: /categories/career/technical_experience/devops_tools
layout: single
author_profile: false
categories:
  - technical_experience
sidebar:
  nav: "technical_experience"
tag:
  - technical_experience
  - devops
  - tech
  - fintech
  - linux
  - personal
  - cicd
  - containers
  - terraform
  - ansible
header:
  overlay_image: "/assets/images/categories/career/technical_experience/general/devops_tools.png"
  teaser: "/assets/images/categories/career/technical_experience/general/devops_tools.png"
---

# Tools For All

DevOps tools are often utilized only by the DevOps team or other infrastructure teams. The shame in that is that DevOps tools are meant for **everyone**. All software engineers should be familiar with popular DevOps tools and incorporate them wherever it makes sense. It is the duty of the DevOps team not only to assist development teams but also to empower them so that they may utilize these tools on their own.

This document captures some of the popular DevOps tools and technologies that I have used. I have also created a [pipeline with most of the technologies](https://github.com/abdulrabbani00/gke-test-project-1) captured in this documentation. The repository is very simple but the intent is to show my understanding of the individual tools and their integration together.

# CI/CD Tools

Continuous integration and continuous deployment is not a tool, instead, it is a practice. Some of the tools I have worked with in the past to exercise CI/CD are **Jenkins**, **Travis**, and **GitHub Actions**. I like using Jenkins for building release/deployment pipelines, especially so that I can hand them off to applications teams. Although prefer Jenkins for complex pipelines, I must admit that GitHub Actions has grown on me for simple pipelines that do not require any manual intervention. I really enjoy its simple syntax, usability, and direct integration into GitHub’s UI.

**I have worked with** _**CI/CD Tools**_ **in the following capacity:**

- I have created robust CI/CD pipelines for build, test, deploy, containerization, and anything in between.
- I have integrated other technologies like **Terraform**, **Ansible**, and **Docker** to deploy and maintain infrastructure on the cloud.
- I have built release pipelines for development teams. This allowed development teams to perform their own releases with pre-defined inputs.

**I know** _**CI/CD tools**_ **to the following level:**

- I understand best practices for creating and maintaining CI/CD pipelines.
- I can create robust CI/CD pipelines quickly without using Google.
- I can explain the benefits of different CI/CD tools to new engineers and help them learn to practice CI/CD.

**This is how I would like to continue my growth and understanding of** _**CI/CD:**_

- I would be happy to continue using CI/CD tools to work more efficiently.
- I would be more than happy to use new CI/CD tools (Circle-CI, Azure DevOps, etc).

# Terraform

**I love Terraform**. There is no better way for me to put it. Not only is Terraform a wonderful tool, but it is also well-developed, well-maintained, robust, and ever-evolving. I have written Terraform code for **AWS**, **GCP,** and **Azure**. I have also contributed to **Microsoft’s open-source** project known as Azure Landing Zone (ALZ). There are two repositories that I have contributed to:

- [terraform-azurerm-caf](https://github.com/aztfmod/terraform-azurerm-caf) (Engine) - The repository where all the Terraform modules are written. This repository is where a **majority of my contributions occur.**
- [caf-terraform-landingzones](https://github.com/Azure/caf-terraform-landingzones) (User facing) - The repository that allows users to write robust tfvars files to create a landingzone in Azure.

**I have worked with** _**Terraform**_ **in the following capacity:**

- I have created **all** aspects of cloud infrastructure (Network, storage, VM, serverless, security, etc) using Terraform on **Azure**, **GCP**, and **AWS**.
- I have utilized **Ansible** within my Terraform code.
- I have contributed Terraform code to open-source projects.

**I know** _**Terraform**_ **to the following level:**

- I can write robust, reusable Terraform code with ease.
- I understand deep concepts of Terraform as it relates to functionality, state, and versioning.

**This is how I would like to continue my growth and understanding of** _**Terraform:**_

- I would enjoy using tools like [Terratest](https://terratest.gruntwork.io/) for testing.
- I would love to contribute more open-source code. Either Terraform code to projects like ALZ, or Go code to Terraform itself, or to Terraform providers (Azure, GCP, AWS, etc).

# Ansible

Ansible was one of the first DevOps tools that I learned, and it has since been one of my favorite. As a Linux systems admin, it made my life so easy, and its easy syntax made it hard to make mistakes.

**I have worked with** _**Ansible**_ **in the following capacity:**

- I have written robust Ansible Playbooks and roles.
- I have integrated Ansible into CI/CD pipelines and Terraform.
- I wrote a robust Python script that queried AWS, GCP, and Azure to create a dynamic inventory, allowing me to run ansible playbooks on servers across clouds.

**I know** _**Ansible**_ **to the following level:**

- I can write reusable and robust code using Ansible.
- I understand internal Ansible components allowing me to get as much as I can out of the tool.
- I understand how Python is utilized to write Ansible modules.

**This is how I would like to continue my growth and understanding of** _**Ansible:**_

- I would love to contribute to an open-source repository for Ansible.
- I would love to work with Ansible Tower or AWX.

# Containers

Out of all the DevOps tools I mentioned, I believe container technology is perhaps the most important for developers to familiarize themselves with. Container technology is growing and advancing before our eyes. As it grows and evolves, I am utilizing containers wherever I can.

## Docker

Docker was the first containerization tool that I learned and I love it. I enjoy its versatility and use.

**I have worked with** _**Docker**_ **in the following capacity:**

- I have written robust DockerFile's and docker-compose.yml files.
- I have containerized many legacy applications using Docker.
- I have utilized [dev containers](https://code.visualstudio.com/docs/remote/containers) in vscode to ensure that the entire development team was always on the same page.

**I know** _**Docker**_ **to the following level:**

- I understand how to create docker containers in an automated fashion and store them in a registry.
- I understand the things to consider when containerizing an existing application.

**This is how I would like to continue my growth and understanding of** _**Docker:**_

- I would love to understand the system dependencies and requirements of Docker containers.
- I would enjoy learning how to optimize container performance from a system level.

## Kubernetes

I have recently started using Kubernetes in a few projects. I enjoy the many features that K8s provides, and I am excited to learn more about Kubernetes by using it.

**I have worked with** _**Kubernetes**_ **in the following capacity:**

- I have created Kubernetes clusters in an automated fashion using **Terraform** (**AKS** and **EKS** clusters).
- I have utilized Helm to manage K8s applications.
- I have configured Kubernetes ingress controllers by leveraging NGINX.

**I know** _**Kubernetes**_ **to the following level:**

- I understand how to create Kubernetes clusters and deploy applications.
- I understand the individual components of Kubernetes from a high level.

**This is how I would like to continue my growth and understanding of** _**Kubernetes:**_

- I would love to continue utilizing Kubernetes so that I may be exposed to internal components.
- I would love to utilize Kubernetes for testing robust applications within my CI/CD pipelines.
