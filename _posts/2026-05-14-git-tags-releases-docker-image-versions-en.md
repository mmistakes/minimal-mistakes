---
layout: single
title: "Git 07. Connecting tags, releases, and Docker Image Versions"
description: "A guide to separating Git tags, GitHub releases, and Docker image tags while connecting them into deployment history."
date: 2026-05-14 09:00:00 +0900
lang: en
translation_key: git-tags-releases-docker-image-versions
section: development
topic_key: devops
categories: DevOps
tags: [git, tag, release, docker, image-tag]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/git-tags-releases-docker-image-versions/
---

## Summary

Git tags and Docker image tags sound similar, but they are not the same thing. A Git tag points to a specific point in repository history. A Docker image tag is a name attached to a container image reference.

The conclusion of this post is that release and deployment history should connect Git tags, release notes, Docker image tags, and image digests. Once Jenkins enters the series, this connection becomes central to tracking build artifacts.

## Document Information

- Written on: 2026-04-21
- Verification date: 2026-04-21
- Document type: analysis
- Test environment: Windows PowerShell, temporary local Git repository
- Test version: Git 2.45.2.windows.1. Git, Docker, and GitHub official documentation were checked on 2026-04-21.
- Source level: Git, Docker, and GitHub official documentation plus local reproduction results.
- Note: this post does not explain semantic versioning itself.

## Problem Definition

Release and deployment records often mix these concepts:

- Treating Git tags and Docker image tags as the same thing.
- Assuming a GitHub release exists independently from a Git tag.
- Recording only a Docker image tag without recording a digest.
- Losing the link between source commit and built image.

This post separates Git tags from Docker image tags, then explains how to connect them in operational records.

## Verified Facts

- According to the `git tag` manual, tag creates a tag object for a Git object and is commonly used to mark release points.
  Evidence: [git tag](https://git-scm.com/docs/git-tag)
- According to GitHub Docs, releases are deployable software iterations and are based on Git tags.
  Evidence: [About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- According to Docker Docs, `docker image tag` creates a target image reference that refers to a source image.
  Evidence: [docker image tag](https://docs.docker.com/reference/cli/docker/image/tag/)
- According to Docker Docs, `docker image push` uploads an image to a registry and can report a digest in the push result.
  Evidence: [docker image push](https://docs.docker.com/reference/cli/docker/image/push/)

A practical deployment record should keep these values separate:

```text
Git commit: 8cd1bb0
Git tag: v1.0.1
Docker image tag: registry.example.com/team/app:1.0.1
Docker image digest: sha256:...
```

The Git tag points to source history. The Docker digest pins image content.

## Directly Reproduced Results

- Directly checked result: on 2026-04-21, I created an annotated tag in a temporary repository and confirmed which commit it pointed to.

```powershell
git tag -a v1.0.0 -m "Release v1.0.0"
git tag -a v1.0.1 -m "Release v1.0.1"
git tag --list
git show --stat --oneline v1.0.1
```

- Result summary: `git tag --list` printed `v1.0.0` and `v1.0.1`. `git show --stat --oneline v1.0.1` showed the `Release v1.0.1` tag message and the target commit.

## Interpretation / Opinion

My judgment is that Git tags should be learned before moving deeper into Docker deployment automation. If "which source created this?" and "which image was deployed?" are separated, incident response becomes slower.

Git tags alone are not enough. Even from the same source commit, image output may differ due to build arguments, base images, build-time dependencies, or multi-platform settings. Operational records should therefore include both Git commit/tag and image digest.

## Limits and Exceptions

This post does not compare semantic versioning, CalVer, or release branch strategies. Signed tags, provenance, SBOM, SLSA, and image signing are left for security-focused topics.

The reproduction only created Git tags. Docker image build and push are based on the earlier Docker 05 reproduction; this post did not run a Docker registry push again.

## References

- Git, [git tag](https://git-scm.com/docs/git-tag)
- GitHub Docs, [About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- Docker Docs, [docker image tag](https://docs.docker.com/reference/cli/docker/image/tag/)
- Docker Docs, [docker image push](https://docs.docker.com/reference/cli/docker/image/push/)
