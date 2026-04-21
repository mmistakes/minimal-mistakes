---
layout: single
title: "Git 02. Understanding Change Flow with status, diff, add, commit, and log"
description: "A beginner-focused walkthrough of Git's basic change flow using status, diff, add, commit, and log."
date: 2026-05-04 09:00:00 +0900
lang: en
translation_key: git-status-diff-add-commit-log
section: development
topic_key: devops
categories: DevOps
tags: [git, status, diff, add, commit, log]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/git-status-diff-add-commit-log/
---

## Summary

The basic Git commands are less about memorizing a list and more about reading the flow. Use `status` to inspect state, `diff` to inspect content, `add` to stage intended changes, `commit` to record them, and `log` to inspect history.

The conclusion of this post is that you should build the habit of checking `status` and `diff` before reaching for `git add .` and `git commit -m`. That same habit carries into Jenkins and PR/MR workflows.

## Document Information

- Written on: 2026-04-21
- Verification date: 2026-04-21
- Document type: tutorial
- Test environment: Windows PowerShell, temporary local Git repository
- Test version: Git 2.45.2.windows.1. Git official documentation was checked on 2026-04-21.
- Source level: Git official documentation and local reproduction results.
- Note: this post only covers the basic recording flow. It does not cover reset, restore, or stash.

## Problem Definition

Beginners often run into these issues:

- They commit without checking `status`.
- They skip `diff` and commit unintended changes.
- They misunderstand `add` as an upload command.
- They use `log` only as a list instead of reading history flow.

This post separates the minimum path from a file change to a commit.

## Verified Facts

- According to the `git status` manual, status shows differences between the index and `HEAD`, differences between the working tree and the index, and untracked files.
  Evidence: [git status](https://git-scm.com/docs/git-status)
- According to the `git diff` manual, diff shows changes between commits, the working tree, and the index.
  Evidence: [git diff](https://git-scm.com/docs/git-diff)
- According to the `git add` manual, add updates the index with the current content from the working tree.
  Evidence: [git add](https://git-scm.com/docs/git-add)
- According to the `git commit` manual, commit creates a new commit from the current index content and a message.
  Evidence: [git commit](https://git-scm.com/docs/git-commit)
- According to the `git log` manual, log shows commit logs.
  Evidence: [git log](https://git-scm.com/docs/git-log)

A small beginner-safe sequence looks like this:

```powershell
git status --short
git diff
git add app.txt
git diff --cached
git commit -m "Update app"
git log --oneline -2
```

The reason to use both `git diff` and `git diff --cached` is that working tree changes and staged changes can differ.

## Directly Reproduced Results

- Directly checked result: on 2026-04-21, I edited `app.txt` in a temporary repository and inspected the diff before and after staging.

```powershell
Add-Content -LiteralPath app.txt -Value "line 2"
git status --short
git diff -- app.txt
git add app.txt
git diff --cached -- app.txt
git commit -m "Update app"
git log --oneline -2
```

- Result summary: before staging, `git status --short` printed ` M app.txt`. `git diff -- app.txt` showed `+line 2`, and after staging the same change appeared in `git diff --cached -- app.txt`. After committing, `git log --oneline -2` showed `Update app` and `Add app`.

## Interpretation / Opinion

My judgment is that Git basics should start with inspection commands before write commands. If you regularly read `status` and `diff`, your commits become cleaner and PR review noise decreases.

`git add .` is convenient, but it is broad. At the beginner stage, naming files explicitly or later learning `git add -p` makes it easier to keep commits intentional. This post does not directly cover `git add -p`, but the core idea is the same: stage only the change you mean to record.

## Limits and Exceptions

This post does not cover reset, restore, checkout, or stash. Binary diffs, rename detection, submodule state, and file mode changes can also make status and diff output more complex.

The reproduction used a tiny repository with one file. Large repositories, generated files, line-ending conversion, and file mode changes were not tested.

## References

- Git, [git status](https://git-scm.com/docs/git-status)
- Git, [git diff](https://git-scm.com/docs/git-diff)
- Git, [git add](https://git-scm.com/docs/git-add)
- Git, [git commit](https://git-scm.com/docs/git-commit)
- Git, [git log](https://git-scm.com/docs/git-log)

