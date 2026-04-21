---
layout: single
title: "Git 05. Reproducing and Resolving a Basic Conflict"
description: "A beginner-focused guide to why Git merge conflicts happen and how to resolve them with status, file edits, add, and commit."
date: 2026-05-10 09:00:00 +0900
lang: en
translation_key: git-conflict-resolution-basics
section: development
topic_key: devops
categories: DevOps
tags: [git, conflict, merge, status]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/git-conflict-resolution-basics/
---

## Summary

A Git conflict does not mean Git is broken. It means Git could not automatically turn different changes into one final result. The basic resolution path is to inspect state, edit the conflicted file, mark it resolved with `git add`, and commit.

The conclusion of this post is that conflicts are easier to handle after you intentionally reproduce one in a tiny repository. Once you have seen the flow, PR/MR conflicts become less mysterious.

## Document Information

- Written on: 2026-04-21
- Verification date: 2026-04-21
- Document type: tutorial
- Test environment: Windows PowerShell, temporary local Git repository
- Test version: Git 2.45.2.windows.1. Git official documentation was checked on 2026-04-21.
- Source level: Git official documentation and local reproduction results.
- Note: this post covers the basic merge conflict flow only. It excludes rerere and mergetool setup.

## Problem Definition

Beginners commonly make these mistakes during conflicts:

- They think conflict markers mean Git corrupted the file.
- They choose one side without checking the intended final result.
- They edit the file but forget `git add`.
- They do not understand what the conflict resolution commit represents.

This post creates and resolves a conflict with the smallest practical flow.

## Verified Facts

- According to the Git glossary, when changes conflict during merge, manual intervention may be required to complete the merge.
  Evidence: [Git Glossary](https://git-scm.com/docs/gitglossary)
- According to the `git merge` manual, when automatic merge fails, Git leaves conflict markers in files that could not be merged automatically.
  Evidence: [git merge](https://git-scm.com/docs/git-merge)
- According to the `git status` manual, status can show unmerged path states.
  Evidence: [git status](https://git-scm.com/docs/git-status)
- According to the `git add` manual, add updates the index with working tree content, so after resolving a conflict it can mark the resolved file.
  Evidence: [git add](https://git-scm.com/docs/git-add)
- According to the `git commit` manual, commit creates a new commit from the current index content.
  Evidence: [git commit](https://git-scm.com/docs/git-commit)

The basic flow is:

```powershell
git merge other-branch
git status
# edit conflicted files
git add conflict.txt
git commit
```

Editing the file and telling Git it is resolved are separate steps.

## Directly Reproduced Results

- Directly checked result: on 2026-04-21, I created `conflict-left` and `conflict-right` branches that changed the same file differently, then reproduced a merge conflict.

```powershell
git switch -c conflict-left main
Set-Content -LiteralPath conflict.txt -Value "left"
git add conflict.txt
git commit -m "Left conflict"
git switch -c conflict-right main
Set-Content -LiteralPath conflict.txt -Value "right"
git add conflict.txt
git commit -m "Right conflict"
git merge conflict-left
```

- Result summary: `git merge conflict-left` exited with code `1` and did not complete the automatic merge. After I edited `conflict.txt` to `left and right`, ran `git add conflict.txt`, and committed with `git commit -m "Resolve conflict"`, a conflict resolution commit was created.

## Interpretation / Opinion

My judgment is that the core of conflict resolution is not the Git command sequence but the decision about the final content. You should not blindly pick one side. For code, run tests. For configuration, check actual precedence and deployment impact.

Large conflicts often come from large branches. Small, frequent integration and separating formatting-only changes from feature changes can reduce conflict cost.

## Limits and Exceptions

This post only covers text file conflicts. Binary files, generated files, lock files, and submodule conflicts can require different handling.

The reproduction used one file and a simple merge. Rebase conflicts, cherry-pick conflicts, mergetool, and IDE merge UIs were not tested.

## References

- Git, [Git Glossary](https://git-scm.com/docs/gitglossary)
- Git, [git merge](https://git-scm.com/docs/git-merge)
- Git, [git status](https://git-scm.com/docs/git-status)
- Git, [git add](https://git-scm.com/docs/git-add)
- Git, [git commit](https://git-scm.com/docs/git-commit)

