---
layout: single
title: "Harness Engineering 01. Why Do Results Change When You Switch AI Coding Tools?"
lang: en
translation_key: why-ai-tools-produce-different-results
date: 2026-04-11 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/why-do-results-change-when-you-switch-ai-coding-tools/
---

If you try a few AI coding tools, you quickly notice a familiar pattern. You ask for the same feature, but one tool spreads the work across a large file structure while another packs everything into a single file. One tool adds tests, while another leaves a note saying tests could be added later. At first that difference can feel interesting. In a real project, though, it creates a different problem. The more the output fluctuates, the higher the maintenance risk becomes.

In this post, "AI tools" mainly refers to AI coding tools such as Codex, Claude Code, and Copilot that can read code, understand it, generate or modify it, and sometimes run, test, and verify it. This is not meant to explain every chatbot, search assistant, or image generator at once.

For a personal experiment, some variation may be acceptable. In team development, especially in enterprise environments, the standard changes. What matters is not whether you get one impressive result once, but whether you can ask for similar work again and still get a predictable outcome. That is why this post approaches the question "Why do different tools produce different results?" not as a model ranking exercise, but from the perspective of the working environment and the surrounding structure.

## Verification scope and interpretation boundary

- As of: April 15, 2026, checked OpenAI Codex docs, OpenAI platform docs, and Anthropic Claude Code docs.
- Source grade: official docs first, plus vendor-authored engineering posts only when a concept is introduced there.
- Fact boundary: only documented features such as `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, evals, and trace are treated as factual claims.
- Interpretation boundary: terms like `harness engineering`, `control plane`, `contract`, `enforcement`, and `observable harness` are operating abstractions used in this series unless a source line says otherwise.


## Why Do the Results Differ Even for the Same Request?

The first explanation that comes to mind is model differences. Each model and product differs somewhat in model family, version or snapshot, tuning, system instructions, and response tendencies. Because of that, the same sentence can lead each tool to focus on different clues and default to different styles of response.
Documented fact: Codex documents `AGENTS.md`, hooks, skills, subagents, sandboxing, and approvals as separate operating surfaces, while Claude Code documents memory, settings, hooks, and subagents separately. Source: [OpenAI AGENTS.md](https://developers.openai.com/codex/guides/agents-md), [Hooks](https://developers.openai.com/codex/hooks), [Skills](https://developers.openai.com/codex/skills), [Subagents](https://developers.openai.com/codex/subagents), [Sandboxing](https://developers.openai.com/codex/concepts/sandboxing), [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security), [Anthropic memory](https://code.claude.com/docs/en/memory), [Claude Code settings](https://code.claude.com/docs/en/settings), [Claude Code hooks](https://code.claude.com/docs/en/hooks), [Claude Code subagents](https://code.claude.com/docs/en/sub-agents)
Interpretation: the discussion below about model and product differences is an operating explanation of how those control surfaces shape output variation.

But the difference does not stop there. Interpretation matters too. If you ask a person to "build a login API," one person may picture the bare minimum while another may imagine validation, security edge cases, and tests. AI behaves similarly. The shorter the request is, the more blanks it contains, and each tool fills in those blanks differently.

The baseline assumptions also vary. Some tools assume an existing project is already there, while others interpret the request as greenfield work. If information such as the database schema, authentication policy, testing culture, and deployment environment is missing, the result naturally becomes less stable. On top of that, generative output is inherently somewhat non-deterministic, so even a more polished prompt cannot remove all variation. A prompt can guide direction, but it does not fully control the whole execution environment.

## Factors Beyond the Model That Change the Output

In practice, factors outside the model can matter as much as model capability itself. AI always works inside some kind of project context. Existing code structure, naming rules, folder layout, chosen frameworks, and even the team's review culture all pull the output in certain directions.
Documented fact: OpenAI treats context, workflow design, and evaluation as separate design concerns in both the harness engineering article and the official eval guide. Source: [Harness engineering](https://openai.com/index/harness-engineering/), [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)

The presence or absence of rule files matters as well. If rules such as "keep error responses consistent," "separate the service layer," "do not leave lint warnings," or "no merge without tests" are already defined, the AI works within that structure. Without that kind of harness, even repeated runs of the same task can produce different folder layouts, shifting function names, and inconsistent code style.

Testing and verification standards also change the result in a major way. There is a big difference between merely checking whether an implementation works and checking whether it meets the quality bar the team expects. That is why people talk about custom evaluations for each organization. In the end, the real question is not "Did the code run once?" but "Does it repeatedly come out in the form the team expects?"

Tool permissions matter too. Some tools can read files, edit them, and run tests, while others can only suggest a draft. Once you add linters, formatters, test runners, and a work procedure on top of that, the output becomes more predictable. In other words, there comes a point where what matters is not only which model you use, but what kind of structure the model works inside.

## A Simple Example

### Example A: An Ambiguous Request

The simplest example is a single sentence:

> "Build a login API."

The request is easy to understand, but in practice it leaves far too many blanks. One tool might use Express while another chooses FastAPI. Authentication may be based on JWT or sessions. Tests may be included or skipped. Error handling might be described in detail or barely mentioned. Even folder layout and naming style can vary. That difference is not just a matter of taste. Later, it becomes extra cognitive load for the person who has to read and maintain the code.

### Example B: A Structured Request

Now compare that to a more structured request:

```text
Goal: Build an email/password login API
Stack: Node.js + Express
Constraints:
- Use JWT
- Hash passwords with bcrypt
- Use the existing users table
Definition of done:
- Implement POST /login
- Handle invalid input
- Write at least 3 tests
Verification:
- Pass npm test
```

This kind of specification does more than narrow the feature scope. It aligns the expected output format and the verification bar at the same time. Now there is less room to drift between Express and FastAPI, and using JWT and bcrypt is no longer a guess. Once the test count and `npm test` requirement are stated, the result gets closer to "predictable output" rather than just "working code."

If you go one step further and structure the context as Context / Problem / Solution, it becomes easier to align the mental model of customers and developers. There is no need to explain that framework too deeply in part 1, but it is worth remembering that structured context is often the starting point for reducing variation and producing output that is easier to maintain.

## What Matters More in Enterprise Environments?

For a personal project, getting a quick draft may be enough. If the service still has to be maintained six months later, the standard changes. In enterprise settings, what matters is not a flashy first result, but a state where similar work does not swing too wildly from one run to the next. The kind of predictability discussed here is not mathematical idempotence in the strict sense. It is closer to practical repeatability: asking again and getting similar quality and structure.
Interpretation: the emphasis on repeatable quality and maintainability is my operating criterion. The official eval guide supports that direction by stressing repeated measurement and task-specific evaluation rather than one-off success. Source: [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)

Another important point is human-readable code. The goal is not code that is merely convenient for AI to produce, but code that humans can read, modify, and review without too much friction. That is why linters, style rules, naming conventions, and structural rules matter. In the end, people are the ones who inherit the code AI writes.

Documentation is also an asset. Meeting notes, planning docs, change logs, and PRDs make it possible to understand why a certain implementation exists. Evaluation matters in the same way. The question is not whether something succeeded once, but whether it keeps meeting the team's quality bar. In the AI era, regeneration can also be a strategy. Sometimes it is more efficient to regenerate from clear context and a solid harness than to keep wrestling with a tangled result.

## Why Harness Engineering Comes Up

At this point, the phrase "harness engineering" comes up naturally. It is not yet a fully standardized textbook term, but it is increasingly used to describe an approach that focuses less on the prompt itself and more on designing the full execution environment. OpenAI discussed a similar idea in its February 11, 2026 article [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/). It may sound complicated, but the core idea is simple. Instead of expecting one prompt line to do everything, you design the surrounding environment such as code structure, naming rules, linters, tests, and work procedures so that different models are more likely to produce similar and predictable results.
Documented fact: OpenAI published [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) on February 11, 2026. Interpretation: this series uses the term a little more broadly as an operating-design concept.

In that sense, the more important question is not "Which model is best?" but "What kind of structure does that model work inside?" This post sets up that problem first. The next post will look more directly at what harness engineering actually means in practice.

## Wrap-up

It is natural for different AI coding tools to produce different results for the same request. That difference is shaped not only by model capability, but also by context, project rules, tools, and verification methods. Official guidance from OpenAI and Anthropic keeps emphasizing the importance of concrete instructions, sufficient context, and clear evaluation criteria. A well-written prompt alone does not automatically guarantee long-term maintainability, and in enterprise environments, consistency and maintainability matter more than a flashy first output.

The next post will focus on how to design that environment. It will move beyond prompts and look at why a harness engineering perspective matters, and what kinds of elements need to be designed in the first place.

## One-Sentence Summary

Differences in AI output are shaped not only by model capability, but also by the rules and verification structure surrounding the model.

## Preview of the Next Post

The next post will take a closer look at what harness engineering actually is. It will start with the difference between writing better prompts and designing a better execution environment. It will also explore how code rules, tests, documentation, and evaluation criteria come together as part of a working harness. If you want output that is less tied to a specific model and more predictably repeatable, this is where the design question starts to become concrete. It is also the point where AI stops being just a tool and starts becoming part of an operating system for work.

## Sources and references

- OpenAI, [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md)
- OpenAI, [Hooks](https://developers.openai.com/codex/hooks)
- OpenAI, [Agent Skills](https://developers.openai.com/codex/skills)
- OpenAI, [Subagents](https://developers.openai.com/codex/subagents)
- OpenAI, [Sandboxing](https://developers.openai.com/codex/concepts/sandboxing)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
- OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- Anthropic, [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- Anthropic, [Claude Code settings](https://code.claude.com/docs/en/settings)
- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Create custom subagents](https://code.claude.com/docs/en/sub-agents)
