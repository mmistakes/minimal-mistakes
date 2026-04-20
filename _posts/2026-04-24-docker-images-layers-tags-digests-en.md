---
layout: single
title: "Docker 02. How to Understand Images, Layers, Tags, and Digests"
description: "Explains the differences between Docker images, layers, tags, and digests, and what should stay mutable versus pinned for deployment."
date: 2026-04-24 09:00:00 +0900
lang: en
translation_key: docker-images-layers-tags-digests
section: development
topic_key: devops
categories: DevOps
tags: [docker, image, layer, tag, digest]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/docker-images-layers-tags-digests/
---

## Summary

As soon as you start using Docker, the terms `image`, `layer`, `tag`, and `digest` appear together everywhere. For beginners, they can all feel like slightly different versions of "the image version." But they do different jobs. An image is an immutable package, a layer is a filesystem change unit inside that image, a tag is a human-friendly label, and a digest is a content-fixed identifier.

The practical conclusion is simple. Tags are convenient for people and workflows, while digests matter when you need exact reproducibility and deployment pinning. If you trust tags alone, you can easily meet "the same name with different content" later. If you use only digests, daily operations become harder than necessary. In practice, you want both, but for different reasons.

## Document Information

- Written on: 2026-04-20
- Verification date: 2026-04-20
- Document type: analysis
- Test environment: no direct execution test. In the current Windows PowerShell writing environment, the `docker` CLI was unavailable, so this post follows official Docker documentation and official command examples.
- Test version: local Docker CLI/Engine version unavailable; Docker official docs checked on 2026-04-20
- Source grade: only official Docker documentation is used.
- Note: this post does not cover multi-platform manifests or image signing. It stays with the minimum concepts needed to separate tags from digests.

## Problem Definition

Beginners usually get stuck at a few recurring points.

- They confuse an image with a container.
- They do not understand what a layer actually represents.
- They treat tags such as `latest` as if they were fixed versions.
- They see a digest and assume it is too long and too awkward to matter in real work.

This post focuses on the image side of Docker. Registry push flow comes in the next post.

## Verified Facts

- According to the official documentation, a container image is a standardized package containing the files, binaries, libraries, and configuration needed to run a container.
  Evidence: [What is an image?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)
- According to the official documentation, images are immutable and are composed of layers.
  Evidence: [What is an image?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)
- According to the official documentation, a container gets its own writable layer on top of the read-only image layers, and data in that writable layer does not persist after the container is destroyed.
  Evidence: [Storage](https://docs.docker.com/engine/storage/)
- According to the official documentation, `docker image tag` creates a new tag that refers to a source image.
  Evidence: [docker image tag](https://docs.docker.com/reference/cli/docker/image/tag/)
- According to the official documentation, `docker image pull` prints the digest after a pull, and a digest can be used in place of a tag when pulling an image.
  Evidence: [docker image pull](https://docs.docker.com/reference/cli/docker/image/pull/)
- According to the official documentation, tags can change while digests are treated as immutable references.
  Evidence: [Image validation](https://docs.docker.com/build/policies/validate-images/)

The official CLI examples reduce the tag-versus-digest difference to patterns like these:

```powershell
docker pull ubuntu:24.04
docker pull ubuntu@sha256:<digest>
docker image tag myapp:1.0 myorg/myapp:stable
```

The first and third lines are human-friendly naming flows. The second is the exact-content flow.

## Directly Reproduced Results

- Directly confirmed result: as of 2026-04-20, the `docker` command was not available in the current PowerShell writing environment.

```powershell
docker --version
```

- Result summary: without the Docker CLI, I could not directly rerun `docker pull`, `docker image tag`, or `docker image inspect` examples here.
- No direct reproduction: the command patterns and distinctions in this post therefore follow the official Docker documentation verified on 2026-04-20.

## Interpretation / Opinion

My view is that the first misconception to fix is "a tag is the version." A tag can be used like a version label, but it is fundamentally closer to a convenient human-facing pointer. Within one repository, tags such as `stable`, `prod`, `latest`, or even `1.0` can later be moved to point to different image content depending on your release policy.

By contrast, a digest is awkward for people but useful for content pinning. That is the more accurate way to treat it. In operations, the healthiest pattern is often to store both: a readable tag for communication and an exact digest for release records, CI metadata, or deployment manifests.

Layers matter early, too. If you think of an image only as one opaque bundle, it becomes harder to understand build cache and partial rebuild behavior later. If you already understand that an image is made of immutable filesystem layers, Dockerfile and cache behavior become much easier to reason about.

In practice, this four-part model is enough for a beginner:

- image: immutable runtime package
- layer: internal filesystem change unit
- tag: human-friendly mutable label
- digest: content-fixed identifier

## Limits and Exceptions

This post does not cover multi-platform images, manifest lists, OCI layout details, or content trust. The explanation of digests here stays within the scope of beginner-level image references.

Also, saying "tags can change" does not mean "never use tags." Tags are still useful for development, QA, collaboration, and release naming. The real point is that when exact reproducibility matters, you should record the digest alongside the tag.

Because the Docker CLI is unavailable in the current writing environment, I could not include direct `pull`, `tag`, or `inspect` outputs. The factual layer of this post is therefore limited to what the official Docker documentation explicitly describes as of 2026-04-20.

## References

- Docker Docs, [What is an image?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/)
- Docker Docs, [Storage](https://docs.docker.com/engine/storage/)
- Docker Docs, [docker image pull](https://docs.docker.com/reference/cli/docker/image/pull/)
- Docker Docs, [docker image tag](https://docs.docker.com/reference/cli/docker/image/tag/)
- Docker Docs, [Image validation](https://docs.docker.com/build/policies/validate-images/)
