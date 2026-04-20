---
layout: single
title: "Docker 01. What Is Different Between Containers and VMs?"
description: "Explains Docker containers versus VMs from a beginner perspective, including images, writable layers, volumes, and bind mounts."
date: 2026-04-22 09:00:00 +0900
lang: en
translation_key: docker-containers-vs-vms
section: development
topic_key: devops
categories: DevOps
tags: [docker, container, vm, volume, bind-mount]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/docker-containers-vs-vms/
---

## Summary

The most common beginner mistake in Docker is to treat "a container is a lightweight VM" as if it were a precise technical description. That phrase is only loosely useful. In practice, a container is closer to an isolated process than to a full virtual machine, and the real behavior becomes clear only when you also understand images, writable layers, volumes, and bind mounts together.

This post starts the Docker section by clarifying the difference between containers and VMs. The practical conclusion is that Docker is easiest to understand when you treat a container as an isolated runtime instance created from an image, and when you treat persistent data as something handled through mounts rather than through the default writable container layer.

## Document Information

- Written on: 2026-04-20
- Verification date: 2026-04-20
- Document type: analysis
- Test environment: no direct execution test. In the current Windows PowerShell writing environment, the `docker` CLI was unavailable, so this post is organized from official Docker documentation and official command examples.
- Test version: local Docker CLI/Engine version unavailable; Docker official docs checked on 2026-04-20
- Source grade: only official Docker documentation is used.
- Note: this is not a deep kernel-level security article about cgroups or namespaces. It focuses on the minimum runtime model needed before moving to Dockerfile and registry topics.

## Problem Definition

Several beginner concepts tend to get mixed together very early.

- People confuse containers with VMs.
- People use "image" and "container" as if they were the same thing.
- People do not understand why files written inside a container disappear later.
- People assume containers always share the host kernel directly, even when using Docker Desktop on Windows or macOS.

This post only covers Docker’s basic runtime model. Image-building, Dockerfiles, build cache, and registry push flow are handled in later posts.

## Verified Facts

- According to the official documentation, Docker is an open platform for developing, shipping, and running applications, and the container becomes the unit for distributing and testing software.
  Evidence: [What is Docker?](https://docs.docker.com/get-started/docker-overview/)
- According to the official documentation, a container is an isolated process for an application component and is described as self-contained, isolated, independent, and portable.
  Evidence: [What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
- According to the official documentation, a VM includes its own operating system and kernel, while multiple containers can share the same kernel.
  Evidence: [What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
- According to the official documentation, Docker Desktop runs all containers inside a customized Linux virtual machine except for native Windows containers.
  Evidence: [Container security FAQs](https://docs.docker.com/security/faqs/containers/)
- According to the official documentation, files created inside a container are stored by default in a writable container layer on top of the read-only image layers, and that data does not persist when the container is destroyed.
  Evidence: [Storage](https://docs.docker.com/engine/storage/)
- According to the official documentation, volumes are persistent storage managed by the Docker daemon, while bind mounts directly link a host path and a container path.
  Evidence: [Storage](https://docs.docker.com/engine/storage/)

The official beginner flow shows a container run sequence like this:

```powershell
docker run -d -p 8080:80 docker/welcome-to-docker
docker ps
docker stop <container-id>
```

That example captures Docker’s shortest core path: start from an image, run it as a container, inspect it, and stop it.

## Directly Reproduced Results

- Directly confirmed result: as of 2026-04-20, the `docker` command was not available in the current PowerShell writing environment.

```powershell
docker --version
```

- Result summary: the shell could not resolve the `docker` CLI, so I could not directly rerun container examples from this environment.
- No direct reproduction: the command examples and runtime descriptions in this post therefore follow the official Docker documentation as verified on 2026-04-20.

## Interpretation / Opinion

My view is that "container = small VM" is the first explanation beginners should outgrow. It may help for a minute, but it quickly causes wrong expectations. If you assume a container behaves like a mini operating system, it becomes harder to understand why images and containers are different, why writable container state is disposable, and why volumes or bind mounts matter so early.

A more useful mental model is this: an image is a read-only package of files and configuration, and a container is a running instance of that image plus a thin writable layer and runtime settings. From that perspective, losing data when a container is removed is not a surprising failure. It is the default behavior unless you mount data outside the writable layer.

It is also important not to oversimplify across environments. On Linux hosts, "containers share the host kernel" is central to the explanation. But on Docker Desktop, Linux containers run inside a Linux VM. If you flatten those two cases into a single absolute sentence, beginners get confused later when they try to understand host file sharing, bind mounts, or what "the host" really means in local development.

For a beginner, the three most important takeaways are:

- a container is closer to an isolated process than to a full VM
- an image and a container are not the same object
- persistent data should usually be handled with a volume or bind mount, not by trusting the default writable layer

## Limits and Exceptions

This post does not explain Docker isolation at the kernel-feature level. Topics such as namespaces, cgroups, capabilities, seccomp, rootless mode, and user namespace isolation belong in a deeper systems or security discussion.

This post also stays with Linux-container mental models. The Docker docs explicitly treat native Windows containers as a different case, so Windows-container image compatibility and storage-driver details are outside the scope here.

Most importantly, the current writing environment does not have the Docker CLI installed, so I could not directly rerun the container and storage examples. The factual layer in this post is therefore limited to what the official Docker documentation explicitly describes.

## References

- Docker Docs, [What is Docker?](https://docs.docker.com/get-started/docker-overview/)
- Docker Docs, [What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
- Docker Docs, [Storage](https://docs.docker.com/engine/storage/)
- Docker Docs, [Container security FAQs](https://docs.docker.com/security/faqs/containers/)
