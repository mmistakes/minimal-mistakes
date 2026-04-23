---
layout: single
description: "Explains how to write a Codex AGENTS.md with repository purpose, inspection paths, working rules, and verification criteria."
title: "Practical Codex 04. How to Write AGENTS.md for Codex"
lang: en
translation_key: how-to-write-agents-md-for-codex
date: 2026-04-29 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, agents-md, project-instructions, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/how-to-write-agents-md-for-codex/
---

## Summary

`AGENTS.md` is not a replacement for each task request. It is the entry point for persistent repository operating rules that Codex should know before work begins.

A good `AGENTS.md` briefly records repository purpose, first inspection paths, edit boundaries, verification criteria, and review checkpoints. Long tutorials, history, and one-off plans belong elsewhere.

## Document Information

- Written on: 2026-04-23
- Verification date: 2026-04-23
- Document type: tutorial
- Test environment: No execution test. This is a documentation procedure based on official OpenAI Codex documentation.
- Tested version: OpenAI Codex documentation checked on 2026-04-23

## Problem Definition

The common mistake is to put every rule into one project instruction file. But if Codex reads the file before work, persistent guidance and one-time explanations should be separated.

This post defines the role and minimum structure of a Codex-oriented `AGENTS.md`.

## Verified Facts

According to official documentation, Codex reads `AGENTS.md` before doing work and layers global and project guidance. Source: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

According to official documentation, Codex walks from the project root down to the current working directory and combines guidance files, with closer files appearing later and able to override earlier guidance. Source: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

According to official documentation, Codex stops adding files once the combined project guidance reaches `project_doc_max_bytes`, which defaults to 32 KiB. Source: [OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)

## Directly Reproduced Results

No direct reproduction was performed. This post did not run Codex to print active instruction sources. It summarizes the discovery rules documented on 2026-04-23 and turns them into authoring guidance.

## Interpretation / Opinion

### Tutorial Application Criteria

- Prerequisites: You roughly know the repository purpose, important directories, off-limit areas, and default verification commands.
- Reproduction steps: Create a root `AGENTS.md`, fill in the structure below, and move directory-specific exceptions into closer instruction files when needed.
- Success criteria: When Codex opens the repository, it can quickly identify the first places to inspect, the boundaries to respect, and the checks required before completion.
- Failure conditions: If one-off plans, long background explanations, or stale commands are mixed into the file, the guidance gets longer and the actual working rules become harder to see.

My preferred root `AGENTS.md` skeleton is:

```md
# AGENTS.md

## Repository purpose

- Explain what this repository is for.

## First places to inspect

- List directories and files to check before work.

## Working rules

- Record edit boundaries, prohibitions, and implementation preferences.

## Verification

- List checks to run by change type.

## Review checklist

- List risks and regressions to check before finishing.
```

If a lower directory needs different rules, place local guidance there. For example, if frontend and backend areas use different validation commands, do not overload the root file with every detail.

Opinion: the purpose of `AGENTS.md` is not to give Codex more information. It is to prevent the first judgment from going wrong: what to inspect first, what not to change, and which checks cannot be skipped.

## Limits and Exceptions

Small repositories may only need a single root `AGENTS.md`. Monorepos or multi-team repositories may need directory-specific guidance.

Too short is also risky if it hides important constraints. The goal is not brevity for its own sake. The goal is to keep only durable rules that matter across tasks.

## References

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
