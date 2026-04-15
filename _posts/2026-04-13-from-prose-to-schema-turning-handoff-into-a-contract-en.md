---
layout: single
title: "Harness Engineering 04. From Prose to Schema: Turning Handoff into a Contract"
lang: en
translation_key: from-prose-to-schema-turning-handoff-into-a-contract
date: 2026-04-13 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, handoff]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/from-prose-to-schema-turning-handoff-into-a-contract/
---

Part 3 argued that files like `AGENTS.md` and `CLAUDE.md` should stay closer to entrypoints than to control planes. But even if those instruction files are written well, the system can still wobble if the actual handoff between steps remains little more than a natural-language note. That is why this post focuses on the next layer down: why handoff should be treated less like a memo and more like a structured contract.

## Verification scope and interpretation boundary

- As of: April 15, 2026, checked OpenAI Codex docs, OpenAI platform docs, and Anthropic Claude Code docs.
- Source grade: official docs first, plus vendor-authored engineering posts only when a concept is introduced there.
- Fact boundary: only documented features such as `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, evals, and trace are treated as factual claims.
- Interpretation boundary: terms like `harness engineering`, `control plane`, `contract`, `enforcement`, and `observable harness` are operating abstractions used in this series unless a source line says otherwise.


## Why Natural-Language Handoff Feels Convenient

Natural-language handoff feels reasonable at first. It is quick to write, easy to adjust to the situation, and flexible enough that a human reader can usually fill in the missing context. In a small team or a short experiment, it is very easy to think, "As long as the main idea is written down, that should be enough."
Interpretation: this section explains why prose handoff feels familiar to people. The official docs do not define handoff in exactly these terms, but both OpenAI and Anthropic expose more structured operating surfaces through hooks, permissions, and trace([OpenAI hooks](https://developers.openai.com/codex/hooks), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions))

A handoff like this is very common:

> "Fixed the login API. Also looked at exception handling and roughly checked the tests. Docs still need an update later."

To a human reader, that sounds understandable. Something was changed, exceptions were reviewed, tests were checked somehow, and the documentation is not done yet. The problem is that none of the important parts are actually fixed in a way the system can trust.

## Why It Is Still Unstable

The first problem is omission detection. If the handoff does not explicitly say which files changed, what risks remain, or what the next agent must verify, it is hard to catch that automatically. A sentence that reads naturally is not the same thing as a handoff that contains all required information.
Documented fact: OpenAI's eval guide says AI systems need task-specific criteria and measurable signals, and the trace grading guide treats traces as structured evaluation inputs([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading))

The second problem is parsing. Humans infer missing meaning from context, but a follow-up agent or an automated step cannot do that reliably. "Roughly checked the tests" might mean unit tests, a quick manual click-through, or just one local run. That ambiguity becomes especially costly in multi-agent workflows.

The third problem is unstable follow-up work. If the format changes every time, the next step has to begin with interpretation all over again. The fourth problem is analysis. Later, if you want to examine which kinds of handoffs often lead to regressions, inconsistent free-form text makes that much harder to compare or measure.

Whether the tool is Codex, Claude Code, or something else, any environment that depends on delegated steps, context transfer, or multi-stage work can run into this problem. It is less a product-specific limitation than a structural weakness of prose-only handoff.

## Why Handoff Should Be a Contract

From a harness engineering perspective, handoff is closer to a contract than a memo. A memo is useful for saying, "Here is roughly what happened." A contract is useful for saying, "Here is what the next step may safely rely on." For handoff to function as a contract, it needs required fields and a structure whose presence can be checked.
Interpretation: `contract` is my operating term here, not a vendor-defined keyword. The direction behind it is that hooks, permissions, and traces work best when required fields and rules are explicit rather than implied([OpenAI hooks](https://developers.openai.com/codex/hooks), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Claude hooks](https://code.claude.com/docs/en/hooks))

That shift matters for more than tidiness. Once a schema exists, automatic validation becomes possible. Missing information becomes detectable. Follow-up work becomes more predictable. The moment prose turns into schema, handoff stops depending only on the reader's judgment and starts becoming something the system itself can work with.

## What Kinds of Fields Can Be Structured?

For example, a handoff can be fixed into a YAML shape like this:
Documented fact: the hooks, permissions, and trace docs treat events, approval conditions, and evaluation inputs as explicit structured data([OpenAI hooks](https://developers.openai.com/codex/hooks), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Claude hooks](https://code.claude.com/docs/en/hooks), [Claude permissions](https://code.claude.com/docs/en/permissions))

```yaml
owner_team: backend-platform
task_id: auth-login-api-042
changed_paths:
  - src/api/login.ts
  - tests/login.test.ts
risk: "Rate limit edge case not fully verified"
eval_plan:
  - "Run auth integration tests"
  - "Check invalid token retry path"
expected_outputs:
  - "POST /login returns normalized error payloads"
  - "Existing auth tests stay green"
blocking_questions:
  - "Should login failures be logged at warn or info?"
```

The important part is not YAML as a syntax choice. The important part is fixing the fields that must be carried across: `owner_team`, `task_id`, `changed_paths`, `risk`, `eval_plan`, `expected_outputs`, and `blocking_questions`. Once those are defined, omission can be validated, and the next agent has a clearer place to start. That is the point where handoff becomes closer to a contract than to a memo.

## The Limit I Saw from Experience

For a while, I thought it was enough to leave expected impact, verification targets, and regression notes in natural language. It was quick to write, and people could usually make sense of it. But once the format was not fixed, omission became almost impossible to detect, and the next worker had to reinterpret the handoff from scratch every time.

What that experience showed was not that natural language is bad. It was that natural language alone is a weak foundation for stable handoff. Feeling that a handoff is "well written" is not the same thing as making it verifiable at the system level.

## Wrap-up

Natural-language handoff feels flexible and convenient to humans, but from a system perspective it makes omissions hard to detect and follow-up work less stable. In multi-agent environments, handoff is closer to a contract with the next step than to a casual note. That is why one of the most important shifts in harness engineering is moving from prose to schema.

The next post will take that one step further. A passing build and passing tests do not necessarily prove that an agent is working the way your team needs it to work.

## One-Sentence Summary

If you want to validate omissions and stabilize follow-up work, handoff has to move from natural-language memo to schema-based contract.

## Preview of the Next Post

The next post will explore why build and test alone are not enough to validate an agent. A product can pass its tests while the agent still violates working conventions, misses intended checks, or creates unstable output. Some failures show up in the build, but others appear in the way work is carried out and handed over. That is why the next step is to separate product correctness from agent correctness. Once handoff becomes a contract, the next question is whether that contract is actually leading to the kind of outcomes you want.

## Sources and references

- OpenAI, [Hooks](https://developers.openai.com/codex/hooks)
- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- OpenAI, [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)
- Anthropic, [Hooks reference](https://code.claude.com/docs/en/hooks)
- Anthropic, [Permissions](https://code.claude.com/docs/en/permissions)
