---
layout: single
title: "Harness Engineering 03. How Far Should a Project Instruction File Go?"
lang: en
translation_key: project-instruction-files-should-not-be-control-planes
date: 2026-04-12 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/how-far-should-a-project-instruction-file-go/
---

A good instruction file is not a document that tries to contain everything. It is a document that clarifies what belongs where. In part 2, I described harness engineering as the work of designing the full environment in which AI operates. This time, I want to look at one of the closest layers in that environment: the project instruction file. Whether it is called `AGENTS.md` or `CLAUDE.md`, the more important question is what role that file should play as the project's entrypoint.

## Why Do Project Instruction Files Matter?

If an AI coding tool is going to work inside a project, it needs project-level expectations and context. Without basic information such as how to read the repository structure, what matters most, and where to find detailed procedures, the agent has to keep guessing. That is why OpenAI describes `AGENTS.md` as a guidance file for exploring a codebase, running tests, and following project conventions, while Anthropic describes `CLAUDE.md` as a file for project-specific persistent instructions. The key point is not the filename. It is the shared role of acting as an entrypoint that conveys project rules and context.

## Why Do We Want to Put Everything in One File?

In practice, it is very tempting to gather everything into one file. If role separation, scope rules, verification procedures, documentation update duties, handoff rules, and commit criteria all live in one place, the setup looks organized at first.

The temptation is understandable. If the project instruction file is the first thing an agent reads, putting every important rule there can feel safer. It seems like the easiest way to reduce ambiguity. The problem is that this is also the moment when a guide starts turning into a control tower. In this post, I use `control plane` as a metaphor for that kind of overloaded state.

## When That Happens, the Entrypoint Starts Resembling a Control Plane

Imagine a single file that contains the operating model, commit policy, team responsibility boundaries, documentation update duties, handoff rules, verification procedures, and agent mapping. At a glance, that sounds thorough. In practice, though, the information density rises too quickly, and it becomes hard to tell which items are core principles and which are exceptions or implementation details. Human-facing explanation, procedural documentation, verification rules, and operating policy all get mixed together. That is how you end up in a state where everything is important, so nothing stands out as truly important.

This is why the real problem is not file length by itself. A short file can still be overloaded, and a long file can still work if the role boundaries are clear. What matters more is information density and mixed responsibilities. An entrypoint should help the agent orient itself. Once it also starts carrying behavior that belongs in a `control plane`, the reading burden grows, and rules that should have moved into automation or validation stay buried in prose.

## The Limit I Saw After Designing It Myself

I ran into this directly while designing an `AGENTS.md` file for a Codex-based project. I tried to include role separation, scope boundaries, verification ownership, documentation update rules, and handoff criteria in detail. At the time, that seemed like the right way to reduce agent drift. It did help with early alignment. But looking back, the file had become less of an entrypoint and more like a de facto `control plane` that concentrated too many operating principles in one place.

What mattered in that experience was not a lesson like "write shorter files." The more important lesson was that writing a detailed instruction file and designing the role of the instruction file are not the same thing. The harder question was deciding what should remain at the entrypoint layer and what should move into a separated operating structure.

## What Should Stay, and What Should Move Out?

What belongs in a project instruction file is usually more limited than people expect.

- Core expectations of the repository
- Basic working principles
- Pointers to the documents that contain detailed procedures

Other things are usually better handled in separate structures.

- Detailed operating procedures
- Handoff format
- Evaluation criteria
- Documentation management policy
- Automatic validation logic

For example, a structure like this is often easier to manage:

```text
AGENTS.md or CLAUDE.md: core principles and reference paths
docs/ops/: operating procedures
docs/handoffs/: handoff format
docs/evals/: evaluation criteria
```

Once responsibilities are split this way, the project instruction file becomes a clearer entrypoint, and the broader operating structure becomes easier to manage layer by layer. The instruction file works more like a guide, while the detailed operating behavior lives in a separated structure and, when possible, in automation.

## The Same Principle Applies to Codex and Claude Code

This is not a tool-specific trick. `AGENTS.md` in Codex and `CLAUDE.md` in Claude Code have different names, but they share the same broad function: they communicate project-level expectations and context. On the Codex side, `AGENTS.md` can be understood as an entrypoint for repository rules and expectations. On the Claude Code side, `CLAUDE.md`, according to the official documentation, can likewise be understood as part of the project's instruction layer.

The point is not that one approach is better than the other. The more useful observation is that both tools can run into similar problems when the project instruction file becomes too dense. Even if the filenames differ, the risk of turning an entrypoint into a de facto `control plane` is a shared operating principle, not a product-specific quirk.

## Wrap-up

A project instruction file should be an entrypoint that helps an agent understand how to behave inside a repository. When too much operating meaning is packed into one file, that document stops being a guide and starts acting like a de facto control plane. From a harness engineering perspective, the goal is not to write more documentation, but to separate role boundaries and move the right pieces into structures that can eventually be validated or automated.

The next post will go one layer deeper. It will look at why prose-only handoff rules are weak, and what changes when handoff stops being a memo and starts becoming a contract.

## One-Sentence Summary

A project instruction file should be an entrypoint that explains core expectations and reference paths, not a de facto `control plane` that tries to hold every operating rule.

## Preview of the Next Post

The next post will focus on the shift from prose to schema. It will start with why natural-language rules like "leave a handoff" are directionally correct but still weak at the system level. From there, it will look at what changes when handoff becomes a contract rather than a note. The important shift is not writing stricter sentences, but reducing omission through verifiable structure. Once the boundary of the project instruction file is clear, the next step is to design the layer outside it.
