---
layout: single
title: "Git 08. PR/MR Collaboration Flow and Review Criteria"
description: "A guide to understanding pull requests and merge requests on top of Git branch collaboration, with practical review criteria."
date: 2026-05-16 09:00:00 +0900
lang: en
translation_key: git-pr-mr-collaboration-review
section: development
topic_key: devops
categories: DevOps
tags: [git, pull-request, merge-request, review, collaboration]
author_profile: false
sidebar:
  nav: "sections"
search: true
permalink: /en/devops/git-pr-mr-collaboration-review/
---

## Summary

PRs and MRs are not Git commands themselves. They are collaboration units provided by hosted Git services. They let you propose branch changes, review diffs, inspect automated checks, and decide whether to merge.

The conclusion of this post is that a PR/MR should be treated as a quality gate, not merely as the step before pressing a merge button. Once Jenkins or another CI system is connected, PR/MR becomes the meeting point between code review and automated verification.

## Document Information

- Written on: 2026-04-21
- Verification date: 2026-04-21
- Document type: analysis
- Test environment: Windows PowerShell, temporary local Git repository. No hosted PR/MR UI execution test.
- Test version: Git 2.45.2.windows.1. GitHub Docs and GitLab Docs were checked on 2026-04-21.
- Source level: GitHub/GitLab official documentation and local Git branch/remote reproduction.
- Note: this post focuses on the common collaboration flow, not on detailed UI differences between GitHub and GitLab.

## Problem Definition

Teams often misunderstand PR/MR in these ways:

- They think PR/MR is a Git command.
- They assume using a branch is enough even without review.
- They separate CI failures from review feedback.
- They pack too much change into one PR/MR.

This post frames PR/MR as a flow of branch, diff, review, checks, and merge.

## Verified Facts

- According to GitHub Docs, pull requests let you propose, review, and merge code changes.
  Evidence: [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- According to GitHub Docs, the Files changed tab shows differences between proposed changes and existing code.
  Evidence: [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- According to GitHub Docs, pull requests support reviewing and discussing commits, changed files, and diffs between base and compare branches.
  Evidence: [Reviewing changes in pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)
- According to GitLab Docs, merge requests provide a central place for code review, discussion, code change tracking, and CI/CD pipeline information.
  Evidence: [Merge requests](https://docs.gitlab.com/user/project/merge_requests/)

The minimum PR/MR flow can be summarized as:

```text
feature branch push
open PR/MR
review diff and discussion
run checks or pipelines
merge or request changes
```

Git commands handle branch and remote movement. PR/MR adds review and policy on top.

## Directly Reproduced Results

- Directly checked result: on 2026-04-21, I used a local bare remote and two clones to reproduce the branch push and fetch flow that sits underneath PR/MR.

```powershell
git push -u origin main
git clone remote.git coworker
# commit and push from the coworker clone
git fetch origin
git merge origin/main --ff-only
```

- Result summary: local Git reproduced branch push and remote fetch/merge. I did not create a real PR/MR on GitHub or GitLab. PR/MR UI behavior, required reviews, required status checks, and pipeline display were verified only through official documentation.

## Interpretation / Opinion

My judgment is that a good PR/MR is small enough to review. Reviewers should be able to understand the intent, and CI failures should be easy to connect to a specific change.

At minimum, a review should ask:

- Is the purpose of the change explained?
- Does the diff stay within the stated scope?
- Is there a test or direct verification result?
- Are configuration, deployment, or rollback impacts documented?
- Does it affect Docker image tags or release flow?

These questions help avoid the weak quality gate of "merge as long as the build passes" when Jenkins enters the workflow.

## Limits and Exceptions

This post does not compare every GitHub and GitLab PR/MR setting. CODEOWNERS, branch protection, merge queues, approval rules, required status checks, and GitLab approval rules should be handled as separate operations topics.

The reproduction used only a local Git remote without a hosted service. Real PR/MR creation, review comments, CI pipeline integration, and merge button behavior were not reproduced.

## References

- GitHub Docs, [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
- GitHub Docs, [Reviewing changes in pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests)
- GitLab Docs, [Merge requests](https://docs.gitlab.com/user/project/merge_requests/)

