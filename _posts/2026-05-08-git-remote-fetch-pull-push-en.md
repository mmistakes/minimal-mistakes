---
layout: single
title: "Git 04. Separating remote, fetch, pull, and push"
description: "A beginner-focused explanation of remote repository flow through remote, fetch, pull, and push."
date: 2026-05-08 09:00:00 +0900
lang: en
translation_key: git-remote-fetch-pull-push
section: development
topic_key: devops
categories: DevOps
tags: [git, remote, fetch, pull, push]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/git-remote-fetch-pull-push/
---

## Summary

The key distinction in remote Git work is fetching versus integrating versus publishing. `fetch` brings remote commits and refs into the local repository. `pull` fetches and then integrates into the current branch. `push` updates remote refs using local refs.

The conclusion of this post is that `pull` should not be treated as a magic sync button. Before moving into Jenkins, it is worth understanding how `fetch` relates to merge or rebase.

## Document Information

- Written on: 2026-04-21
- Verification date: 2026-04-21
- Document type: tutorial
- Test environment: Windows PowerShell, temporary local Git repository and bare remote repository
- Test version: Git 2.45.2.windows.1. Git official documentation was checked on 2026-04-21.
- Source level: Git official documentation and local reproduction results.
- Note: this post does not cover authentication, SSH keys, or credential helper setup.

## Problem Definition

Beginners often get stuck on these points:

- They think `origin` means GitHub itself.
- They treat `fetch` and `pull` as the same command.
- They do not distinguish file upload from remote ref updates.
- They are surprised when `pull` creates a merge commit or hits a conflict.

This post separates remote flow from the perspective of Git commands, not from a hosted Git UI.

## Verified Facts

- According to the `git remote` manual, remote manages the set of tracked repositories.
  Evidence: [git remote](https://git-scm.com/docs/git-remote)
- According to the `git remote add` documentation, after adding a remote, `git fetch <name>` can create and update remote-tracking branches.
  Evidence: [git remote](https://git-scm.com/docs/git-remote)
- According to the `git fetch` manual, fetch downloads objects and refs from another repository.
  Evidence: [git fetch](https://git-scm.com/docs/git-fetch)
- According to the `git pull` manual, pull fetches from another repository or local branch and integrates into the current branch.
  Evidence: [git pull](https://git-scm.com/docs/git-pull)
- According to the `git push` manual, push updates remote refs using local refs and sends required objects.
  Evidence: [git push](https://git-scm.com/docs/git-push)

The roles can be separated like this:

```powershell
git remote -v
git fetch origin
git merge origin/main --ff-only
git push origin main
```

`pull` is convenient, but troubleshooting is harder if you do not know what it combines.

## Directly Reproduced Results

- Directly checked result: on 2026-04-21, I created a temporary bare repository, added it as `origin`, pushed, cloned as a coworker, committed from the coworker clone, fetched, and fast-forward merged.

```powershell
git init --bare remote.git
git remote add origin ../remote.git
git push -u origin main
git clone remote.git coworker
# commit and push from the coworker clone
git fetch origin
git status --short --branch
git merge origin/main --ff-only
```

- Result summary: `git push -u origin main` created `main` on the bare remote and set the upstream. After another clone pushed an `Add remote work` commit, `git fetch origin` updated `origin/main`. `git merge origin/main --ff-only` exited with code `0`.

## Interpretation / Opinion

My judgment is that beginners benefit from learning `fetch` before relying on `pull`. Fetch does not immediately change the current branch, so it teaches the habit of first asking "what changed remotely?"

`pull` is not bad. The problem is that its result depends on whether the team uses merge, rebase, or fast-forward-only policies. Before CI/CD, it is safer to separate "get remote information" from "integrate it into my branch."

## Limits and Exceptions

This post does not cover SSH keys, HTTPS tokens, credential helpers, signed commits, or protected branches. It also excludes shallow clones, partial clones, submodules, and mirror remotes.

The reproduction used only a local bare repository. Permissions, branch protection, and pull request refs on GitHub or GitLab were not tested.

## References

- Git, [git remote](https://git-scm.com/docs/git-remote)
- Git, [git fetch](https://git-scm.com/docs/git-fetch)
- Git, [git pull](https://git-scm.com/docs/git-pull)
- Git, [git push](https://git-scm.com/docs/git-push)

