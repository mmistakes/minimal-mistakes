---
layout: single
title: "Git 06. Why rebase, squash, and force push Need Care"
description: "An explanation of how Git rebase and squash rewrite history, and why force push should be handled carefully."
date: 2026-05-12 09:00:00 +0900
lang: en
translation_key: git-rebase-squash-force-push
section: development
topic_key: devops
categories: DevOps
tags: [git, rebase, squash, force-push]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/git-rebase-squash-force-push/
---

## Summary

`rebase` and `squash` can make history easier to read, but rewriting already shared history can disrupt other people's work. `force push` is the operation that publishes rewritten history to a remote branch, so it deserves extra care.

The conclusion of this post is that rebase and squash are useful on personal work branches, but shared branches need team policy. If a forced update is truly needed, `--force-with-lease` is generally safer to consider than plain `--force`.

## Document Information

- Written on: 2026-04-21
- Verification date: 2026-04-21
- Document type: analysis
- Test environment: Windows PowerShell, temporary local Git repository and bare remote repository
- Test version: Git 2.45.2.windows.1. Git official documentation was checked on 2026-04-21.
- Source level: Git official documentation and local reproduction results.
- Note: this post focuses on the safety boundary around rebase, squash, and force push. It is not a full guide to every interactive rebase command.

## Problem Definition

Beginners often run into these issues:

- They think rebase is just a prettier merge.
- They miss that squashing creates different commits.
- They do not understand why normal push is rejected after rebasing a pushed branch.
- They use `git push --force` as a habit.

This post explains why history-changing commands need care.

## Verified Facts

- According to the `git rebase` manual, rebase reapplies commits on top of another base tip.
  Evidence: [git rebase](https://git-scm.com/docs/git-rebase)
- According to the `git rebase` manual, interactive mode can reorder or combine commits.
  Evidence: [git rebase](https://git-scm.com/docs/git-rebase)
- According to the `git commit` manual, `--amend` replaces the tip of the current branch by creating a new commit.
  Evidence: [git commit](https://git-scm.com/docs/git-commit)
- According to the `git push` manual, push updates remote refs, and `--force-with-lease` protects the update when the remote value is not what you expected.
  Evidence: [git push](https://git-scm.com/docs/git-push)

A basic rebase flow looks like this:

```powershell
git switch feature
git rebase main
```

This reapplies the feature branch's commits on top of `main`. The resulting content may look similar, but the commits may not be the same commits.

## Directly Reproduced Results

- Directly checked result: on 2026-04-21, I created a `rebase-demo` branch, advanced `main`, and rebased `rebase-demo` onto `main`.

```powershell
git switch main
git switch -c rebase-demo
Set-Content -LiteralPath rebase.txt -Value "rebase work"
git add rebase.txt
git commit -m "Add rebase work"
git switch main
Set-Content -LiteralPath base.txt -Value "base work"
git add base.txt
git commit -m "Advance main"
git switch rebase-demo
git rebase main
```

- Result summary: after rebase, the `Add rebase work` commit was positioned after the `Advance main` commit. I then pushed `rebase-demo` to an isolated bare remote, amended the commit with `git commit --amend`, and ran `git push --force-with-lease origin rebase-demo`. The forced update succeeded in that isolated repository.

## Interpretation / Opinion

My judgment is that rebase should first be taught as "a tool that rewrites history," not merely as "a tool that makes history pretty." It is helpful for cleaning up a personal branch before review, but changing a branch that other people depend on creates recovery work for them.

Force push follows the same rule. It has legitimate uses, but it should not be a default habit. Branches such as `main`, `release`, or production deployment branches are usually better protected by branch protection and review policies.

## Limits and Exceptions

This post does not cover every interactive rebase command such as `pick`, `reword`, `edit`, `squash`, and `fixup`. It also does not treat hosted squash merge buttons as identical to local interactive rebase.

The reproduction used only an isolated bare remote. In real hosted repositories, protected branches, required reviews, or required status checks may reject force pushes.

## References

- Git, [git rebase](https://git-scm.com/docs/git-rebase)
- Git, [git commit](https://git-scm.com/docs/git-commit)
- Git, [git push](https://git-scm.com/docs/git-push)

