---
layout: single
description: "Explains why AGENTS.md, CLAUDE.md, and system prompts often bloat into structures that waste tokens and weaken execution quality."
title: "Token Management 02. Shared Problems in AGENTS.md, CLAUDE.md, and System Prompts That Burn Tokens"
lang: en
translation_key: why-agents-md-claude-md-and-system-prompts-burn-tokens
date: 2026-04-21 00:00:00 +0900
section: development
topic_key: token-management
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, token-management, agents-md, system-prompt]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/why-agents-md-claude-md-and-system-prompts-burn-tokens/
---

## Summary

Many teams try to improve agent quality by continuously expanding `AGENTS.md`, `CLAUDE.md`, and system prompts. The real issue is not that documentation exists, but that different document roles are often stacked into the same layer, creating both token waste and weaker execution quality. When the same rules are repeated across layers, human-oriented explanations are mixed with runtime instructions, and irrelevant background is injected into every session, the document stops being a guide and becomes a recurring cost.

This post is not arguing against documentation. It starts from the opposite assumption: good documentation is necessary. The question is what distinguishes a good document structure from a bad one. The answer is not simply “make it shorter,” but rather “separate roles and layer context properly.”

## Document Information

- Written: 2026-04-16
- Verified as of: 2026-04-16
- Document type: analysis
- Test environment: no direct execution test; structural analysis based on OpenAI and Anthropic official docs
- Test version: OpenAI Codex / API docs checked on 2026-04-16, Anthropic Claude Code docs checked on 2026-04-16

## Problem Definition

In the previous post, I argued that token management is a control problem rather than a pricing trick. The next question is where token budgets get burned most quietly in real operation. In many teams, the answer is not the model itself, but the operating documents and system-level instructions that an agent repeatedly reads at startup. `AGENTS.md`, `CLAUDE.md`, and system prompts differ in name and location, but they share one structural property: they are persistent startup context that shapes the session before work begins.

That is exactly why these layers tend to bloat. After one failure, a prohibition is added. When another team joins, more background is appended. When a new tool is introduced, extra cautions appear. Each individual addition is understandable. The problem is that these updates usually happen by attaching more text to an existing entrypoint document rather than redesigning the structure. Over time, the document takes on too many jobs at once: repository guide, execution policy, operating philosophy, onboarding notes, incident lessons, and prohibition list. This post looks at why that structure creates both token waste and weaker execution quality.

## Confirmed Facts

Documented fact: OpenAI’s `Custom instructions with AGENTS.md` guide says Codex reads `AGENTS.md` files “before doing any work” and layers global guidance with project-specific overrides so tasks start with consistent expectations. The same guide explains that Codex concatenates instruction files from the root down to the current working directory and stops once the combined size reaches the `project_doc_max_bytes` limit, which is 32 KiB by default([OpenAI, Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)). This shows that project instruction files directly consume startup context budget.

Documented fact: OpenAI’s `Harness engineering: leveraging Codex in an agent-first world` says the “one big `AGENTS.md`” approach failed in predictable ways. The article names context scarcity, crowding out the task and relevant docs, stale rules, and difficulty of mechanical verification as key failure modes. It then describes a different pattern: a short `AGENTS.md`, roughly 100 lines, used as a table of contents while deeper sources of truth live in a structured `docs/` hierarchy([OpenAI, Harness engineering](https://openai.com/index/harness-engineering/)).

Documented fact: Anthropic’s `How Claude remembers your project` says each Claude Code session begins with a fresh context window and that both `CLAUDE.md` and auto memory are “loaded at the start of every conversation.” The same page says Claude treats these as context rather than enforced configuration and adds, “The more specific and concise your instructions, the more consistently Claude follows them”([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)). That confirms both the persistent-context role of project instruction files and the fact that longer, more verbose guidance does not automatically improve adherence.

Documented fact: The same Anthropic page recommends keeping in `CLAUDE.md` only the facts Claude should hold in every session, and says multi-step procedures or instructions relevant to only part of the codebase should move to a skill or a path-scoped rule. It also explains that `CLAUDE.md` files are loaded in full regardless of length, though shorter files produce better adherence, and explicitly targets under 200 lines because longer files consume more context and reduce adherence([Anthropic, How Claude remembers your project](https://code.claude.com/docs/en/memory)). This is strong official support for role separation and layering.

Documented fact: Anthropic’s `Claude Code settings` page says the `includeGitInstructions` setting can include built-in commit and pull-request workflow instructions plus the git status snapshot in Claude’s system prompt([Anthropic, Claude Code settings](https://code.claude.com/docs/en/settings)). That means the system prompt itself can carry operational rules and state, which makes structural overlap with lower layers easy to introduce.

Documented fact: OpenAI’s `Prompt caching` guide says repetitive content such as system prompts and common instructions can reduce latency by up to 80% and input token cost by up to 90%, but only for exact prefix matches. It recommends placing static content first and variable content later([OpenAI, Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)). This shows that repeated instructions have real serving implications, while also implying that prompt structure remains a separate design concern.

## Directly Reproduced Results

No direct reproduction: this is not a benchmark post comparing real-world `AGENTS.md`, `CLAUDE.md`, and system-prompt layouts across multiple tools with measured token counts and adherence scores. As of 2026-04-16, I did not run repeated controlled experiments across the same repository and task to quantify the exact cost, latency, and compliance changes caused by different documentation structures.

The short examples in this post are therefore illustrative patterns, not copied production prompts or direct excerpts from vendor-owned runtime documents. The factual layer is limited to the official loading behavior, size guidance, layering mechanisms, and startup-context properties described in the cited documentation. The examples and system-design conclusions are separated in the next section as interpretation.

## Interpretation / Opinion

My view is that agent operating documents usually bloat because they become a storage layer for post-failure patches. A missed test adds “always run tests.” A review miss adds “always include review notes.” A confusing onboarding moment adds more architecture history. Each addition is reasonable on its own, but over time the document stops being a clean execution guide and becomes a collection of past mistakes, organizational anxiety, and accumulated explanation.

The first common problem is repeated rules across layers. If the same behavior is described in the system prompt, in `AGENTS.md`, and in `CLAUDE.md`, tokens are spent three times while the information is only introduced once. The more serious issue is that source-of-truth boundaries become unclear. Slightly different versions of the same instruction do not necessarily make compliance stronger. Often they just make priority weaker.

Bad example 1 looks like this:

```md
System prompt
- Run tests after changes and report the result

AGENTS.md
- After every code change, run tests and summarize the outcome

CLAUDE.md
- If you modified files, you must execute tests and leave the result
```

This is a bad pattern because the three lines do almost the same job. The model is not learning three distinct constraints. It is re-reading one recurring instruction in three slightly different phrasings.

The second common problem is mixing human-facing documentation with model-facing runtime instructions. Background explanation, team culture, incident history, and architectural rationale may all be useful to humans. But when those materials live inside a runtime document, they get injected into every session whether or not they are relevant to the current task. That is not rich context in the useful sense. It is mixed context competing for the same working memory.

Bad example 2 looks like this:

```md
AGENTS.md
- How the team changed its development culture over the last two years
- Why the organization wants to move away from document-centered operations
- Cultural lessons from a past incident
- Actual runtime rule: do not modify migrations/ without approval
```

This is a bad pattern because the single critical runtime constraint is buried inside long background material. A human reader can separate those layers mentally. An agent still pays context cost for all of them.

The third problem is that irrelevant background gets injected into every task. A small payment-module fix does not necessarily need the product’s long-term strategy or the full history of the architecture. The fourth problem is that prohibitions and operating philosophy become too verbose. A few strong, testable constraints are often enough. But many teams add long abstract guidance such as “act responsibly,” “think deeply,” or “always consider the long-term direction of the project.” Once those statements accumulate, verifiable constraints become harder to notice. The fifth problem is the combined effect: long documents bury core constraints. At that point, the document provides more prose but less control.

These problems show up across `AGENTS.md`, `CLAUDE.md`, and system prompts even when the products differ. Structurally, all three are startup-adjacent context layers. OpenAI says `AGENTS.md` is read before work and merged from root to working directory. Anthropic says `CLAUDE.md` is loaded every session and that longer files can reduce adherence. System prompts can also contain workflow instructions and state snapshots. So regardless of file name, a bloated startup document repeats the same cost at every run.

That is why my conclusion is not “delete documents.” A better conclusion is “separate roles and layer them.” Put only always-needed core constraints in the persistent entrypoint. Move human-oriented background into human-oriented documents. Move path-specific rules into path-scoped files or rules. Move recurring validation requirements into hooks, CI, schema, or eval where possible.

Good example 1 is a short entrypoint with references:

```md
AGENTS.md
- This repository’s core constraints are approval boundaries, output format, and reference paths
- See @docs/verification.md for detailed verification steps
- See payments/AGENTS.override.md for rules specific to payments/
```

This is good because the entrypoint stays short and clear. The critical constraints remain persistent, while detailed procedures are moved into files that can be consulted when needed.

Good example 2 is a separation between human and runtime documents:

```md
team-handbook.md
- Background, team history, operating philosophy, examples

CLAUDE.md
- Keep only always-needed constraints
- Move area-specific rules into .claude/rules/
- Move long procedures into skills or referenced docs
```

This is good because it does not delete documentation. It clarifies purpose. Human-oriented material stays available, while the runtime document becomes smaller, clearer, and easier to verify.

In my opinion, the best measure of document quality is not length but role clarity. A short file can still be badly structured if background and execution constraints are mixed together. A long file can be acceptable if it is a reference document rather than persistent startup context. The important distinction is what must always stay visible and what only needs to be loaded on demand. In harness engineering, document quality is better judged as a layering problem than as a word-count problem.

## Limits and Exceptions

This post is not claiming that all operating documents should be short. In heavily regulated environments, large multi-team repositories, or systems with complex security boundaries, documentation can legitimately be extensive. The more relevant question is not total length, but what gets injected into every session. A long reference document is far less problematic than an overloaded startup document.

Also, the exact structure of system prompts, instruction loading, prompt caching behavior, and rules support differs by product and version. This post is limited to publicly documented common properties as of 2026-04-16. It does not claim a universal threshold at which a given team’s real documents begin to damage quality. That still requires direct operational measurement.

The next bottleneck follows naturally from here. Even after slimming startup documents, context still grows. In practice, long logs, long plans, long memory files, old handoffs, and repeated state summaries become the next source of bloat. The next post will therefore look at `Long Logs, Long Plans, Long Memory: Why Agent Context Keeps Growing`, focusing on how context continues to accumulate outside static documents and why that accumulation affects both latency and execution quality.

## References

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- OpenAI, [Prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
