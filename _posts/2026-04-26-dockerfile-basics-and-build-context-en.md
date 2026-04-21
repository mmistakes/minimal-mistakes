---
layout: single
title: "Docker 03. How to Understand Dockerfile Basics and Build Context"
description: "Explains Dockerfiles, WORKDIR, CMD, ENTRYPOINT, build context, and .dockerignore from a beginner perspective."
date: 2026-04-26 09:00:00 +0900
lang: en
translation_key: dockerfile-basics-and-build-context
section: development
topic_key: devops
categories: DevOps
tags: [docker, dockerfile, build-context, workdir, entrypoint, cmd]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/dockerfile-basics-and-build-context/
---

## Summary

When people first write a Dockerfile, the most confusing part is often not the syntax itself but what the file actually defines and why the trailing `.` in `docker build -t name .` matters so much. A Dockerfile is not just a shell script. It is closer to an image build specification, and the last `.` in the build command specifies the build context. If you miss that distinction, `COPY` fails unexpectedly, unnecessary files get sent to the build, and `CMD` or `ENTRYPOINT` behave differently from what you expected.

The practical conclusion is that beginners should understand Dockerfiles as "image build instructions plus build-context boundaries." Memorizing `FROM`, `WORKDIR`, `COPY`, `RUN`, `CMD`, and `ENTRYPOINT` is less important than first understanding which files the build can see and which instructions affect runtime defaults versus filesystem state.

## Document Information

- Written on: 2026-04-20
- Verification date: 2026-04-21
- Document type: analysis
- Test environment: Windows PowerShell with Docker Desktop for Windows. After restarting Docker Desktop and the `docker-desktop` WSL distribution, tests ran on the `desktop-linux` context with Linux containers.
- Test version: Docker Desktop 4.70.0(224270), Docker CLI/Engine 29.4.0(API 1.54), Docker Compose v5.1.2, Docker Buildx v0.33.0-desktop.1. Docker official docs were checked on 2026-04-20.
- Source grade: official Docker documentation and local reproduced results are used.
- Note: this post stays with the fundamental relationship between Dockerfiles and build context. It does not yet cover multi-stage builds, build secrets, or advanced build arguments.

## Problem Definition

Beginners usually trip over a few recurring issues.

- They read a Dockerfile like a shell script.
- They ignore what the trailing `.` in `docker build -t test .` actually means.
- They do not realize that `COPY` works against the build context, not against the Dockerfile path.
- They mix up the roles of `CMD` and `ENTRYPOINT`.

This post focuses on the base writing model only. Image optimization and cache invalidation come next.

## Verified Facts

- According to the official documentation, Docker builds images by reading instructions from a Dockerfile, and a Dockerfile is a text file for building an image.
  Evidence: [Dockerfile overview](https://docs.docker.com/build/concepts/dockerfile/)
- According to the official documentation, `docker build` and `docker buildx build` use both a Dockerfile and a build context, and the build context is the set of files the build can access.
  Evidence: [Build context](https://docs.docker.com/build/concepts/context/)
- According to the official documentation, in `docker build -t test:latest .`, the final `.` sets the current directory as the build context.
  Evidence: [Dockerfile overview](https://docs.docker.com/build/concepts/dockerfile/)
- According to the official documentation, `COPY` and `ADD` can refer to files and directories inside the build context.
  Evidence: [Build context](https://docs.docker.com/build/concepts/context/)
- According to the official documentation, `.dockerignore` lives at the root of the build context and removes matching files and directories from the context sent to the builder.
  Evidence: [Build context](https://docs.docker.com/build/concepts/context/)
- According to the official documentation, `WORKDIR` sets the working directory for subsequent `RUN`, `CMD`, `ENTRYPOINT`, `COPY`, and `ADD` instructions, and explicitly setting it helps avoid unintended operations.
  Evidence: [Dockerfile reference](https://docs.docker.com/reference/dockerfile)
- According to the official documentation, `CMD` provides a default command or default arguments, and if multiple `CMD` instructions exist, only the last one takes effect.
  Evidence: [Dockerfile reference](https://docs.docker.com/reference/dockerfile)
- According to the official documentation, with exec-form `ENTRYPOINT`, extra `docker run` arguments are appended, and `CMD` can act as default arguments for the entrypoint.
  Evidence: [Dockerfile reference](https://docs.docker.com/reference/dockerfile)

The minimum Dockerfile flow can be summarized like this:

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY app.py .
CMD ["python", "app.py"]
```

And the basic build invocation looks like this:

```powershell
docker build -t hello-app:0.1.0 .
```

The example uses a fixed tag value (`0.1.0`) instead of `latest` so the naming stays closer to the post's reproducibility message.

The key is that the last `.` matters as much as the Dockerfile itself, because it defines what the build can actually see.

## Directly Reproduced Results

- Directly confirmed result: on 2026-04-21, I created temporary build contexts from Windows PowerShell and verified Dockerfile build, `.dockerignore` exclusion, exec-form `CMD`, and the `ENTRYPOINT` plus `CMD` relationship.

```powershell
docker build -t codex/context-test:0.1.0 <temp-context>
docker run --rm codex/context-test:0.1.0
docker build -t codex/entrypoint-test:0.1.0 <temp-context>
docker run --rm codex/entrypoint-test:0.1.0
docker run --rm codex/entrypoint-test:0.1.0 custom
```

- Result summary: in a context where `.dockerignore` excluded `ignored.txt`, running the image built with `COPY . .` printed `context-ok:app-ok`. That test confirms `app.txt` was copied and `ignored.txt` was excluded. For an image with `ENTRYPOINT ["echo", "entry"]` and `CMD ["default"]`, the default run printed `entry default`, and passing `custom` printed `entry custom`.

## Interpretation / Opinion

My view is that the most important beginner point is that a Dockerfile is not simply a shell script. Yes, `RUN` can execute shell commands. But the file as a whole is closer to a layered image specification that accumulates filesystem changes and runtime defaults. If that model is unclear, it becomes harder to understand why `COPY` fails, why `WORKDIR` should be explicit, or why only the last `CMD` matters.

The second key point is build context. Beginners often confuse the Dockerfile path with the context boundary. In practice, those are not the same. You might run `docker build -f docker/prod.Dockerfile .`, where the Dockerfile is inside a subdirectory but the context is the repository root. That means what `COPY` can reach depends more on the context than on where the Dockerfile sits.

`CMD` and `ENTRYPOINT` are also easier when separated early:

- `ENTRYPOINT`: use it when the image should behave like an executable
- `CMD`: use it for the default command or default arguments

At the beginner stage, being explicit with `WORKDIR`, keeping `COPY` narrow, and preferring exec-form `CMD` or `ENTRYPOINT` usually makes Dockerfiles much easier to reason about.

## Limits and Exceptions

This post does not cover multi-stage builds, `ARG`, `ENV`, build secrets, cache mounts, health checks, or non-root-user setup. The scope here is limited to the first conceptual wall most beginners hit: Dockerfiles and build context.

Also, a base image may already define a `WORKDIR`. Still, as the official docs point out, explicitly setting `WORKDIR` in your own image is usually safer because it avoids unintended operations in unknown directories.

The direct reproduction used small temporary contexts based on `alpine:3.20`. I did not separately run multi-stage builds, `ARG`, `ENV`, build secrets, cache mounts, health checks, or non-root-user setup. Those advanced Dockerfile topics remain outside the scope of this post.

## References

- Docker Docs, [Dockerfile overview](https://docs.docker.com/build/concepts/dockerfile/)
- Docker Docs, [Build context](https://docs.docker.com/build/concepts/context/)
- Docker Docs, [Dockerfile reference](https://docs.docker.com/reference/dockerfile)
