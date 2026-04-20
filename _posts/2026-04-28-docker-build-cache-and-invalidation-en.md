---
layout: single
title: "Docker 04. Why Docker Builds Become Slow and Where Cache Gets Invalidated"
description: "Explains how Docker build cache is reused, when cache gets invalidated, and why Dockerfile ordering matters."
date: 2026-04-28 09:00:00 +0900
lang: en
translation_key: docker-build-cache-and-invalidation
section: development
topic_key: devops
categories: DevOps
tags: [docker, build-cache, dockerfile, buildkit, cache-invalidation]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/docker-build-cache-and-invalidation/
---

## Summary

When you build Docker images repeatedly, some builds finish quickly while others feel like they start over from scratch. Most of that difference comes from build cache and cache invalidation rules. Docker reuses a previous layer when an instruction and the files it depends on have not changed, and once a middle layer changes, the layers that follow it are rebuilt too.

The practical conclusion is that, at the beginner stage, perceived build speed depends at least as much on how well your Dockerfile separates rarely changing inputs from frequently changing ones as it does on raw machine power. In particular, placing `COPY . .` too early often causes expensive dependency-install layers to rebuild far more often than necessary.

## Document Information

- Written on: 2026-04-20
- Verification date: 2026-04-20
- Document type: analysis
- Test environment: no direct execution test. In the current Windows PowerShell writing environment, the `docker` CLI was unavailable, so this post follows official Docker documentation and official command examples.
- Test version: local Docker CLI/Engine version unavailable; Docker official docs checked on 2026-04-20
- Source grade: only official Docker documentation is used.
- Note: this post covers the basic cache rules and the most important beginner optimization patterns. It does not go deep into remote cache configuration for CI systems.

## Problem Definition

Beginners usually hit the same build-speed problems.

- They change one source file, but dependency installation runs again.
- They expect `RUN apt-get update` to automatically fetch newer packages on the next build.
- They do not see why `.dockerignore` matters for cache behavior.
- They miss how directly Dockerfile instruction order affects build time.

This post focuses on how build cache works and which beginner-level structuring habits make the biggest difference.

## Verified Facts

- According to the official documentation, a build layer is reused from cache when the instruction and the files it depends on have not changed.
  Evidence: [Optimize cache usage in builds](https://docs.docker.com/build/cache/optimize/)
- According to the official documentation, once a layer changes, the layers that follow it need to be rebuilt as well.
  Evidence: [Optimize cache usage in builds](https://docs.docker.com/build/cache/optimize/)
- According to the official documentation, `COPY`, `ADD`, and bind-mounted `RUN --mount=type=bind` instructions participate in cache checks using file metadata. A change in `mtime` alone does not invalidate the cache.
  Evidence: [Build cache invalidation](https://docs.docker.com/build/cache/invalidation/)
- According to the official documentation, `RUN` cache is not automatically refreshed between builds. The same command string can still hit cache on a later build.
  Evidence: [Build cache invalidation](https://docs.docker.com/build/cache/invalidation/)
- According to the official documentation, Docker recommends ordering layers carefully, keeping the context small, and using bind mounts, cache mounts, and external cache when appropriate.
  Evidence: [Optimize cache usage in builds](https://docs.docker.com/build/cache/optimize/)
- According to the official documentation, placing a `.dockerignore` file at the root of the context lets you exclude unnecessary files and directories from the build context.
  Evidence: [Build context](https://docs.docker.com/build/concepts/context/)

The official docs reduce the "bad order versus better order" pattern to examples like these:

```dockerfile
# cache-breaking pattern
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
```

```dockerfile
# easier cache reuse for dependency layers
FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
```

And a minimal `.dockerignore` example looks like this:

```text
node_modules
tmp*
```

## Directly Reproduced Results

- Directly confirmed result: as of 2026-04-20, the `docker` command was not available in the current PowerShell writing environment.

```powershell
docker --version
```

- Result summary: I could not directly compare `docker build`, `--no-cache`, or `docker builder prune` behavior in this environment.
- No direct reproduction: the cache rules, invalidation patterns, and Dockerfile examples in this post therefore follow the official Docker documentation verified on 2026-04-20.

## Interpretation / Opinion

My view is that the most common beginner cause of slow Docker builds is not a lack of advanced optimization but copying frequently changing files too early. In Node, Python, or Java projects especially, putting `COPY . .` before dependency installation often means that even a tiny source change forces a costly reinstall step.

Another common misunderstanding is expecting a command like `RUN apt-get update` to "refresh itself" on the next build. The official docs make clear that `RUN` cache is not automatically invalidated by changes inside the container filesystem. If the instruction still matches, Docker may reuse the old cached result. That is why people sometimes rebuild and still see old package state.

At the beginner level, the three most valuable rules are probably these:

- copy rarely changing files first
- keep the build context small
- focus first on what breaks cache, not only on the fact that cache exists

By the time you move into CI/CD, external cache and cache mounts become more important. But even before that, fixing Dockerfile order alone often produces the most noticeable improvement.

## Limits and Exceptions

This is not a benchmark post with measured timings from repeated builds across real projects. It does not claim that one structure is always "N times faster."

Also, cache mounts, external cache, and registry cache depend on the builder and CI environment you use. This post stays with the concepts and beginner-level optimization patterns explicitly documented by Docker.

Because the Docker CLI is unavailable in the current writing environment, I could not directly run repeated builds here to observe cache reuse and invalidation. The factual layer is therefore limited to what the official Docker documentation explicitly states.

## References

- Docker Docs, [Optimize cache usage in builds](https://docs.docker.com/build/cache/optimize/)
- Docker Docs, [Build cache invalidation](https://docs.docker.com/build/cache/invalidation/)
- Docker Docs, [Build context](https://docs.docker.com/build/concepts/context/)
