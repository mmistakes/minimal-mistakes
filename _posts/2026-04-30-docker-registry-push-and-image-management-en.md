---
layout: single
title: "Docker 05. Registry Push and Image Management Criteria for Deployment"
description: "A beginner-focused explanation of Docker registry, repository, tag, push flow, and image management criteria for deployment."
date: 2026-04-30 09:00:00 +0900
lang: en
translation_key: docker-registry-push-and-image-management
section: development
topic_key: devops
categories: DevOps
tags: [docker, registry, repository, push, tag, digest]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/docker-registry-push-and-image-management/
---

## Summary

When you use Docker only on your local machine, building an image may feel like enough. But once team workflows, Jenkins, and deployment environments enter the picture, you eventually need to understand registries and push flow. The concepts that often get mixed up here are registry, repository, tag, and digest. A registry is the overall storage service, a repository is a collection of related images inside it, a tag is a human-friendly label, and a digest identifies the actual image content.

The conclusion of this post is that deployment image management is not only about "which name should I push to the registry?" It is also about which tags are allowed to move. Relying only on `latest` can make later reproduction and rollback harder, so keeping a readable release tag together with a digest record is usually much safer.

## Document Information

- Written on: 2026-04-20
- Verification date: 2026-04-21
- Document type: analysis
- Test environment: Windows PowerShell with Docker Desktop for Windows. After restarting Docker Desktop and the `docker-desktop` WSL distribution, tests ran on the `desktop-linux` context with Linux containers.
- Test version: Docker Desktop 4.70.0(224270), Docker CLI/Engine 29.4.0(API 1.54), Docker Compose v5.1.2, Docker Buildx v0.33.0-desktop.1. Docker official docs were checked on 2026-04-20.
- Source grade: official Docker documentation and local reproduced results are used.
- Note: this post focuses on basic push flow and naming rules rather than image signing, admission policy, or content trust.

## Problem Definition

Beginners often get stuck on these registry-related points.

- They use registry and repository as if they mean the same thing.
- They are confused about the relationship between local tags and remote repository names.
- They do not know what exactly `docker push` uploads.
- They assume using `latest` is enough.

This post organizes the basic push flow and beginner-level deployment image management criteria. Multi-arch manifests and signing policies are outside the scope.

## Verified Facts

- According to the official documentation, an image registry is a centralized location for storing and sharing container images, and it can be public or private. Docker Hub is the default registry.
  Evidence: [What is a registry?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/)
- According to the official documentation, registry and repository are different. A registry is the overall storage location, while a repository is a collection of related images inside it.
  Evidence: [What is a registry?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/)
- According to the official documentation, `docker image push` uploads an image to a registry or self-hosted registry.
  Evidence: [docker image push](https://docs.docker.com/reference/cli/docker/image/push/)
- According to the official documentation, before pushing, you can use `docker image tag` to assign a target registry/repository/tag name.
  Evidence: [docker image tag](https://docs.docker.com/reference/cli/docker/image/tag/), [docker image push](https://docs.docker.com/reference/cli/docker/image/push/)
- According to the official documentation, `docker image push --all-tags` can push multiple tags under the same repository.
  Evidence: [docker image push](https://docs.docker.com/reference/cli/docker/image/push/)
- According to the official documentation, push output includes a digest, and that digest can later be used to pin exact content.
  Evidence: [docker image push](https://docs.docker.com/reference/cli/docker/image/push/), [docker image pull](https://docs.docker.com/reference/cli/docker/image/pull/)

Based on the official documentation, the most basic push pattern can be summarized like this:

```powershell
docker build -t myapp:1.0.0 .
docker image tag myapp:1.0.0 registry-host:5000/team/myapp:1.0.0
docker image tag myapp:1.0.0 registry-host:5000/team/myapp:stable
docker image push --all-tags registry-host:5000/team/myapp
```

The core idea is that you can attach multiple tags to one local image, retag it with a registry-based name, and push it by repository.

## Directly Reproduced Results

- Directly confirmed result: on 2026-04-21, from Windows PowerShell, I ran a local registry container, tagged a local image with a `localhost:5000` name, then reproduced push, remove, and pull.

```powershell
docker run -d --name codex-registry -p 5000:5000 registry:2
docker image tag codex/cache-test:0.2.1 localhost:5000/codex/cache-test:0.2.1
docker image push localhost:5000/codex/cache-test:0.2.1
docker image rm localhost:5000/codex/cache-test:0.2.1
docker pull localhost:5000/codex/cache-test:0.2.1
docker rm -f codex-registry
```

- Result summary: `docker image push localhost:5000/codex/cache-test:0.2.1` exited with code `0`, and the push output included `digest: sha256:2f16fcd4eea767e42b0f9faa3adc514f0eb7768e48bda82d13d3c69b73ed384c`. After removing the local tag, pulling the same reference also exited with code `0`, and the pulled image ID matched the original local image ID before push.

## Interpretation / Opinion

My view is that the first habit to drop when learning registries is putting all meaning into `latest`. `latest` is convenient, but it is weak for release history, rollback, incident response, and Jenkins artifact tracking. When recording what image was deployed, it is better to keep at least one readable release tag and the exact digest.

At the beginner level, even this small naming rule helps operations:

- fixed release tag: `1.0.0`
- human-friendly moving tag: `stable` or `prod`
- exact fixed value: the digest from push output

This lets people communicate with tags while systems and operation records pin the exact digest. The same distinction remains useful when moving into Jenkins pipelines.

It is also important to learn early that the repository name and registry host are part of the image reference. Locally, `myapp:1.0.0` may be enough, but in an actual deployment path, `registry-host:5000/team/myapp:1.0.0` is a more precise operational unit.

## Limits and Exceptions

This post does not cover registry authentication, access tokens, content trust, signature verification, or multi-platform manifest push. It is limited to the basic naming and push flow that beginners need first.

Not every team must use moving tags such as `stable` or `prod`. Some organizations may use only immutable release tags and manage promotion through separate metadata. Regardless of the chosen approach, keeping digest records is useful.

The direct reproduction used only a local registry at `localhost:5000` with the `registry:2` image. Docker Hub login, access tokens, private remote registries, TLS settings for self-hosted registries, content trust, signature verification, and multi-platform manifest push were not tested.

## References

- Docker Docs, [What is a registry?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/)
- Docker Docs, [docker image tag](https://docs.docker.com/reference/cli/docker/image/tag/)
- Docker Docs, [docker image push](https://docs.docker.com/reference/cli/docker/image/push/)
- Docker Docs, [docker image pull](https://docs.docker.com/reference/cli/docker/image/pull/)

