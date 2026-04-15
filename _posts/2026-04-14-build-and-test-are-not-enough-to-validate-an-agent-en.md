---
layout: single
description: "Explains why build and test alone are not enough to validate an agent and what extra checks are needed."
title: "Harness Engineering 05. Build and Test Are Not Enough to Validate an Agent"
lang: en
translation_key: build-and-test-are-not-enough-to-validate-an-agent
date: 2026-04-14 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, llm, codex, claude-code, harness-engineering, eval]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/build-and-test-are-not-enough-to-validate-an-agent/
---

## Summary

It is possible for all tests to pass while the overall operation still feels unstable. In agent systems, that is not a contradiction. Build, test, lint, and audit can all come back green without proving that the work was routed correctly, handed off clearly, or documented properly. That is why this post separates product validation from agent validation.

## Verification scope and interpretation boundary

- As of: April 15, 2026, checked OpenAI Codex docs, OpenAI platform docs, and Anthropic Claude Code docs.
- Source grade: official docs first, plus vendor-authored engineering posts only when a concept is introduced there.
- Fact boundary: only documented features such as `AGENTS.md`, memory/settings, hooks, subagents, approvals, sandboxing, evals, and trace are treated as factual claims.
- Interpretation boundary: terms like `harness engineering`, `control plane`, `contract`, `enforcement`, and `observable harness` are operating abstractions used in this series unless a source line says otherwise.


## What Product Tests Actually Validate

Build, test, lint, and audit still matter. They tell you whether code compiles, interfaces still work, static rules are respected, and known vulnerabilities are caught. In other words, they are core safeguards against product regressions.
Interpretation: this section compares traditional product tests with agent eval. OpenAI explicitly distinguishes AI evaluation from ordinary software testing in its official eval guidance([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices))

The limitation is that they mostly validate the artifact. They focus on whether the API works, whether the UI renders, whether type errors are gone, and whether lint rules pass. They do not automatically tell you whether the task was carried out in the way your harness expected.

## How Agent Systems Fail Differently

Agent systems can fail in ways that are not simple code failures. One example is wrong-owner routing. Imagine a task that should have stayed inside an authentication-oriented boundary, but was routed to an agent working from a frontend perspective that ended up modifying core auth files. The tests may still pass. Even so, the ownership boundary has been broken and the maintenance cost of later work goes up.
Documented fact: OpenAI's eval and trace docs explicitly widen the evaluation surface beyond the final output to include trace, workflow, and architecture choices([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading), [Agents SDK](https://developers.openai.com/api/docs/guides/agents-sdk))

Incomplete handoff is another example. The code and tests pass, but the next step does not receive the remaining risks or required follow-up checks. Stale docs are similar. The implementation changed, but the design or operating documents did not. Build and test rarely catch that. Bad tool choice or unnecessary sub-agent usage can also hide behind successful output. The result may be correct by accident while the orchestration is still poor.

For example, a team might change behavior that requires a documentation update but only modify the code. The application can still work. A separate eval, however, can check whether that code path requires linked documentation to be updated and catch the omission. That is less a product failure than an operating failure.

## Why Agent-Specific Eval Is Necessary

This is where agent-specific eval becomes important. If product tests ask, "What was produced?" agent eval asks, "How was it produced?" Harness engineering is not only about validating the output. It also has to include orchestration validation.
Documented fact: OpenAI recommends task-specific evaluation and repeated measurement for AI applications([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices))

That distinction matters because agent-system failures do not always appear as broken code. Some failures show up as poor routing, incomplete handoff, stale documentation, bad tool choice, or unnecessary sub-agent usage. The product may pass, but the system has learned nothing and the next run becomes unstable in the same way.

## What Kinds of Eval Are Possible?

There are many ways to design agent-specific eval:
Documented fact: OpenAI officially documents both output grading and trace grading patterns([Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading))

- handoff completeness eval
- wrong-owner routing eval
- scope violation eval
- stale-doc detection
- tool-choice trace grading
- orchestration trace review

These checks are not meant to replace build or test. They fill the blind spots that product validation leaves behind.

## The Blind Spot I Missed

At first, I also tended to think that a solid bundle of build, test, and lint checks would be enough. If the code was not broken and the tests passed, it was easy to assume the system itself was healthy. Later, it became much clearer that failures like stale documentation, bad routing, and incomplete handoff were almost invisible to that bundle.

The important lesson was not simply that more validation was needed. It was that different things were being validated. A correct product and a correctly operating agent are related, but they are not the same claim.

## Wrap-up

Build, test, lint, and audit are essential for validating product regressions. But agent systems can fail in orchestration even when the code is correct. That is why harness engineering needs agent-specific eval in addition to ordinary product validation.

The next post will take this into the multi-agent question. Many people imagine multi-agent systems as the default, but in practice that assumption deserves much more scrutiny.

## One-Sentence Summary

Passing product tests does not prove that an agent system is working well; to catch orchestration failures, you need agent-specific eval.

## Preview of the Next Post

The next post will explore why multi-agent is not the default. Splitting work across several agents can look like an obviously better structure, but it can also increase complexity and create more failure points. In some cases a single agent is more stable, while decomposition only pays off in narrower situations. That is why the next step is to look at multi-agent design not as a feature, but as a tradeoff in cost and control. Once you start validating orchestration, you also have to decide when decomposition helps and when it simply adds noise.

## Sources and references

- OpenAI, [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- OpenAI, [Trace grading](https://developers.openai.com/api/docs/guides/trace-grading)
- OpenAI, [Agents SDK](https://developers.openai.com/api/docs/guides/agents-sdk)
- OpenAI, [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
