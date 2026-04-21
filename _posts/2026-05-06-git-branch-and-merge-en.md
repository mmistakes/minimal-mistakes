---
layout: single
title: "Git 03. When and How to Use branch and merge"
description: "An explanation of Git branch and merge as development flow and history connection, not folder copying."
date: 2026-05-06 09:00:00 +0900
lang: en
translation_key: git-branch-and-merge
section: development
topic_key: devops
categories: DevOps
tags: [git, branch, merge, workflow]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/git-branch-and-merge/
---

## Summary

A Git branch is better understood as a line of development that points to commits, not as a copied project folder. A merge brings another branch's work into the current branch and connects the histories.

The conclusion of this post is that branches are useful as work isolation units, but the merge point should be planned around reviewable history. PR/MR and Jenkins trigger workflows sit on top of this branch and merge model.

## Document Information

- Written on: 2026-04-21
- Verification date: 2026-04-21
- Document type: analysis
- Test environment: Windows PowerShell, temporary local Git repository
- Test version: Git 2.45.2.windows.1. Git official documentation was checked on 2026-04-21.
- Source level: Git official documentation and local reproduction results.
- Note: this post does not present Git Flow or any other branching model as a universal standard.

## Problem Definition

Beginners often misunderstand branches in these ways:

- They think of a branch as a copied project folder.
- They assume creating a branch automatically makes work safe.
- They do not distinguish fast-forward merges from merge commits.
- They lack a criterion for when to branch and when to merge.

This post explains the basic meaning of branch and merge, then frames a practical collaboration criterion.

## Verified Facts

- According to the Git glossary, a branch is a line of development, and the latest commit on a branch is its tip.
  Evidence: [Git Glossary](https://git-scm.com/docs/gitglossary)
- According to the `git branch` manual, branch can create, list, and delete branches.
  Evidence: [git branch](https://git-scm.com/docs/git-branch)
- According to the Git glossary, merge brings the contents of another branch into the current branch, and conflicts may require manual intervention.
  Evidence: [Git Glossary](https://git-scm.com/docs/gitglossary)
- According to the `git merge` manual, merge joins two or more development histories together.
  Evidence: [git merge](https://git-scm.com/docs/git-merge)
- According to the Git glossary, a fast-forward is a special merge where Git moves the branch pointer without creating a new merge commit.
  Evidence: [Git Glossary](https://git-scm.com/docs/gitglossary)

The basic flow is small:

```powershell
git switch -c feature
# work and commit
git switch main
git merge feature
```

A branch separates work. A merge connects that work back.

## Directly Reproduced Results

- Directly checked result: on 2026-04-21, I created a `feature` branch, committed work there, made a separate commit on `main`, and then merged with `--no-ff`.

```powershell
git switch -c feature
Set-Content -LiteralPath feature.txt -Value "feature work"
git add feature.txt
git commit -m "Add feature"
git switch main
Set-Content -LiteralPath main.txt -Value "main work"
git add main.txt
git commit -m "Add main work"
git merge --no-ff feature -m "Merge feature"
git log --oneline --graph --decorate --all -5
```

- Result summary: `git merge --no-ff feature` exited with code `0`, and `git log --graph` showed the `Merge feature` merge commit together with the `Add feature` commit on the feature branch.

## Interpretation / Opinion

My judgment is that a branch should be taught less as "make as many branches as possible" and more as "create a reviewable unit of work." Very large branches increase merge conflicts and review cost. Very tiny branches can fragment the workflow.

Merge style should also match team policy. Fast-forward history is simple. Merge commits preserve feature integration points. Neither is universally right; the choice depends on how the team wants to preserve review and troubleshooting history.

## Limits and Exceptions

This post does not compare Git Flow, trunk-based development, or release branch strategies. It also leaves `cherry-pick`, `revert`, and `merge --squash` for separate topics.

The reproduction only tested local branch merging. GitHub, GitLab, Bitbucket branch protection and merge method settings were not tested.

## References

- Git, [Git Glossary](https://git-scm.com/docs/gitglossary)
- Git, [git branch](https://git-scm.com/docs/git-branch)
- Git, [git merge](https://git-scm.com/docs/git-merge)

