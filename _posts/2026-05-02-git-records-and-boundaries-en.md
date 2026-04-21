---
layout: single
title: "Git 01. What Git Records and What It Does Not Record"
description: "A beginner-focused explanation of how Git treats commits, the index, and the working tree, and what Git does not automatically guarantee."
date: 2026-05-02 09:00:00 +0900
lang: en
translation_key: git-records-and-boundaries
section: development
topic_key: devops
categories: DevOps
tags: [git, commit, repository, index, working-tree]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/git-records-and-boundaries/
---

## Summary

When learning Git, the first useful mental model is not "Git saves files" but "Git records project states as connected commits." Editing a file does not immediately create Git history. The change becomes history only after you stage the intended content in the index and create a commit.

The conclusion of this post is that Git becomes confusing if you treat it as a backup tool or a deployment tool. Git is the foundation for change history and collaboration, but it does not automatically prove what was built, deployed, or running on a server.

## Document Information

- Written on: 2026-04-21
- Verification date: 2026-04-21
- Document type: analysis
- Test environment: Windows PowerShell, temporary local Git repository
- Test version: Git 2.45.2.windows.1. Git official documentation was checked on 2026-04-21.
- Source level: Git official documentation and local reproduction results.
- Note: this post stays with the minimum concepts needed before branch, remote, and PR/MR posts. It does not go deep into Git object internals.

## Problem Definition

Beginners often mix up these points:

- They think saving a file automatically records it in Git.
- They do not distinguish `git add` from `git commit`.
- They understand branches as copied folders.
- They assume Git proves the actual deployment state.

This post separates what Git records from what Git does not record. The next post covers the basic command flow in more detail.

## Verified Facts

- According to the Git glossary, a commit is a point in Git history, and committing stores the current state of the index as a new commit while advancing `HEAD`.
  Evidence: [Git Glossary](https://git-scm.com/docs/gitglossary)
- According to the Git glossary, the index is a stored version of the working tree. During a merge, it can also contain multiple versions of a file.
  Evidence: [Git Glossary](https://git-scm.com/docs/gitglossary)
- According to the Git glossary, a branch is a line of development, and a branch head points to the tip commit of that branch.
  Evidence: [Git Glossary](https://git-scm.com/docs/gitglossary)
- According to the `git commit` manual, commit creates a new commit from the current index content and a log message.
  Evidence: [git commit](https://git-scm.com/docs/git-commit)
- According to the `git add` manual, add updates the index with content prepared for the next commit.
  Evidence: [git add](https://git-scm.com/docs/git-add)

The basic flow is easier to understand as separate steps:

```powershell
git status
git add app.txt
git commit -m "Add app"
git log --oneline
```

Editing a file and recording history are not the same action. Git history consists of committed states. Unstaged or uncommitted changes are not yet part of that history.

## Directly Reproduced Results

- Directly checked result: on 2026-04-21, I created a temporary repository, added `app.txt`, and created a commit.

```powershell
New-Item -ItemType Directory -Path git-record-demo
Set-Location git-record-demo
git init -b main .
git config user.name "Codex Test"
git config user.email "codex@example.invalid"
Set-Content -LiteralPath app.txt -Value "line 1"
git status --short
git add app.txt
git commit -m "Add app"
git log --oneline -1
```

- Result summary: before staging, `git status --short` printed `?? app.txt`. After `git add app.txt`, `git commit -m "Add app"` exited with code `0`, and `git log --oneline -1` showed the `Add app` commit.

## Interpretation / Opinion

My judgment is that the first sentence beginners should internalize is this: Git does not automatically remember every file you save. A change becomes collaborative history only when you choose it, stage it, and commit it.

Git is also not a complete record of runtime reality. A commit alone does not prove which Docker image digest was deployed, which Jenkins environment variables were used, or which Kubernetes manifest is currently applied. Those facts must be connected through tags, release notes, CI logs, and deployment records.

At the beginner level, keep these three layers separate:

- working tree: changes currently present in the filesystem
- index: content prepared for the next commit
- commit: the shareable and traceable history unit

## Limits and Exceptions

This post does not cover Git object internals, packfiles, reflog, or garbage collection. It also excludes Git LFS and other extensions for large file handling.

The reproduction used only a local repository. Remote repositories, branch protection, and hosted Git PR/MR policies were not tested. The conclusion here is about Git's basic recording model, not about any specific team's collaboration policy.

## References

- Git, [Git Glossary](https://git-scm.com/docs/gitglossary)
- Git, [git add](https://git-scm.com/docs/git-add)
- Git, [git commit](https://git-scm.com/docs/git-commit)
