---
layout: single
title: "Harness Engineering 02. What Is Harness Engineering?"
lang: en
translation_key: what-is-harness-engineering
date: 2026-04-11 00:10:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/what-is-harness-engineering/
---

The key point from part 1 was that getting one plausible result is less important than achieving repeatability, where asking again still produces similar quality and structure. Writing a good operations document does not create that repeatability by itself. Clear principles are necessary, but they are not enough. So what exactly is harness engineering?

In this context, `harness` is easier to understand if you think of it not as the AI itself, but as the supporting structure that keeps the AI working in a defined way. Software has long used expressions like `test harness` to describe a package of execution, inputs, and verification. In the same sense, harness engineering is less about making the model smarter and more about connecting the context, tools, permissions, and verification steps around the model.

## Writing Better Prompts vs Designing the Environment

If prompt engineering is about writing the instruction for this task more precisely, harness engineering is closer to designing the rails the task runs on. The former refines the input text. The latter deals with the whole execution environment, including rules, tools, verification, and records.

The two are not replacements for each other. They operate at different layers. Good prompts still matter, but if the system does not define which context gets loaded first, what format the result should take, and what must pass before a task is considered complete, the output can still vary widely.

## Why a Good Operations Document Is Not the Same as a Strong Harness

A good operations document explains direction. A strong harness turns that direction into structure that reduces failure. You can think of the gap as the difference between natural-language rules, schema, and enforcement.

For example, rules like "leave a handoff" or "update the documentation" are obviously reasonable. But by themselves they leave too much unspecified: when, where, and in what format should that happen? To a human reader, such rules may sound sensible. From a system perspective, though, they are easy to forget and likely to produce uneven quality. That is why prose-only rules are weak.

Now imagine a handoff schema with required fields such as `summary`, `changed_files`, `known_risks`, and `next_action`, plus validation that checks whether those fields are present and CI that catches missing entries. At that point, the rule is no longer just a recommendation. It becomes a structured contract. That is much closer to a harness that produces predictable results.

## The Next Step I Saw After Designing It Myself

I once spent a fair amount of time designing a detailed `AGENTS.md` file for a Codex-based project. I thought that if I specified role separation, work boundaries, verification methods, and documentation update rules, agent stability would increase. That documentation did help with early alignment. But after receiving feedback, it became clear that the file was still an operations document, not the harness itself that automatically reduces and verifies failure.

That realization mattered because it changed the direction of the work. Instead of trying to write a longer document, I started asking which rules should become schema and checks, and which parts should be validated automatically in CI. Writing good documentation and designing a good harness are clearly related, but they are not the same job.

## What Codex and Claude Code Have in Common

Looking at Codex and Claude Code side by side makes the concept clearer. Both are more than simple question-and-answer tools. Both assume that results become more stable when project context and repeatable workflows are structured. The goal of this comparison is not to rank one above the other, but to surface the shared design principle.

The emphasis and terminology differ somewhat. The Codex documentation describes `AGENTS.md`, skills, hooks, and subagents as separate mechanisms that help define repository-level instructions, task decomposition, and automation points. The Claude Code documentation likewise separates `CLAUDE.md` as shared team guidance, auto memory as locally accumulated learning across sessions, settings as the layer for permissions and environment configuration, and hooks as execution paths tied to specific events. Reusable skills and subagents are treated as their own layers there as well. In both tools, the harness is not a single prompt file. It is a combination of components that split up context, configuration, automation, and verification.

What matters most is not the file name itself, but which things are treated as project constants and which things are separated into their own validation or enforcement layer.

## What a Harness Is Made Of

In practice, it is helpful to think of a harness as several layers:

- Rules: standards and prohibitions.
- Context: architectural and domain assumptions.
- Structured input and output: contracts with fixed fields and formats.
- Verification: tests, linting, and schema checks.
- Evaluation: measuring consistency across tasks.
- Trace: a record of inputs, decisions, and execution.
- Guardrails: permission boundaries and blocking rules.

The important part of this list is not collecting "good common sense." The point is to reduce failure, observe failure, and automatically catch failure when possible.

## In the End, It Is About How Failure Is Handled

A strong harness is not a device that makes an agent incapable of failing. Instead, it reduces the frequency of failure, helps detect it sooner, makes root causes easier to trace, and lowers the chance of repeating the same problem in the next run. That is why harness engineering is better understood not as a technique for polishing prompts, but as an approach to building systems that are observable and verifiable.

Good operations documents are still necessary. But they are not enough on their own. A strong harness appears when you decide which natural-language rules should remain in documentation and which ones should move into structured contracts and automatic validation.

## Wrap-up

Harness engineering is closer to designing the full environment in which AI works than to simply writing better instructions. Stability does not come from having many rules. It comes when natural-language principles are turned into structured contracts and verification. That perspective is not just a usage tip for one tool. It is an operating principle that applies across agentic coding tools.

The next post will take the discussion into a more practical direction. It will look at what files like `AGENTS.md` and `CLAUDE.md` should contain, and what should be pushed out of those documents into a separate harness layer.

## One-Sentence Summary

Harness engineering is not about writing more rules. It is about designing an execution environment that reduces failure and can be validated automatically.

## Preview of the Next Post

The next post will explore how far files like `AGENTS.md` and `CLAUDE.md` should go. It will also cover why putting every principle into a single document can actually make the system weaker. Some information should remain as explanation for people, while other parts belong in the harness layer through schema, hooks, and CI. Once that boundary becomes clear, the documents get shorter and the system gets stronger.
