---
layout: single
description: "Explains why model, permission, sandbox, and MCP defaults should be fixed in Codex config for repeatable work."
title: "Practical Codex 07. Use Config to Keep Codex Work Consistent"
lang: en
translation_key: using-config-to-keep-codex-consistent
date: 2026-05-02 00:00:00 +0900
section: development
topic_key: ai
categories: AI
tags: [ai, codex, config, sandbox, harness-engineering]
author_profile: false
sidebar:
  nav: "sections"
search: false
permalink: /en/ai/using-config-to-keep-codex-consistent/
---

## Summary

Controlling repeatable Codex work through natural-language instructions alone is fragile. Defaults such as model, sandbox, approval policy, and MCP servers should be fixed in config when possible.

Natural-language instructions explain why the work should be done a certain way. Config defines how the client actually runs by default. Separating the two reduces variation.

## Document Information

- Written on: 2026-04-23
- Verification date: 2026-04-23
- Document type: analysis
- Test environment: No execution test. This is a configuration-layer analysis based on official OpenAI Codex documentation.
- Tested version: OpenAI Codex documentation checked on 2026-04-23

## Problem Definition

Writing "be careful with permissions" or "check official docs" in `AGENTS.md` does not fix the actual runtime defaults. Permissions, model choice, MCP servers, and sandbox settings are clearer when managed through config.

This post separates what belongs in `AGENTS.md` from what belongs in config.

## Verified Facts

According to official documentation, Codex reads user-level configuration from `~/.codex/config.toml`, and project or subfolder overrides can be placed in `.codex/config.toml`. Project config is loaded only for trusted projects. Source: [OpenAI, Config basics](https://developers.openai.com/codex/config-basic)

According to official documentation, Codex configuration precedence starts with CLI flags and `--config` overrides, then profiles, project config, user config, system config, and built-in defaults. Source: [OpenAI, Config basics](https://developers.openai.com/codex/config-basic)

According to official documentation, the CLI and IDE extension share configuration layers and can use them to set the default model and provider, approval policies, sandbox settings, and MCP servers. Source: [OpenAI, Config basics](https://developers.openai.com/codex/config-basic)

According to the Codex Models page checked on 2026-04-23, most Codex tasks should start with `gpt-5.4`. Source: [OpenAI, Codex Models](https://developers.openai.com/codex/models)

## Directly Reproduced Results

No direct reproduction was performed. This post does not deploy `.codex/config.toml` across multiple environments and compare outcomes. It proposes operating rules from the documented configuration layers.

## Interpretation / Opinion

I treat these as config candidates:

- Default model and reasoning level
- Sandbox mode
- Approval policy
- Network access default
- MCP servers
- Project profiles
- Repeated CLI overrides

I keep these in `AGENTS.md`:

- Repository purpose
- Edit boundaries
- Design principles
- Review checkpoints
- Documentation standards
- Human-readable operating intent

The rule is simple: settings the runtime can enforce or apply as defaults belong in config. Judgment criteria belong in `AGENTS.md`.

Example:

```toml
model = "gpt-5.4"

[sandbox_workspace_write]
network_access = false
```

Opinion: config also reduces instruction length. Instead of repeatedly saying "do not enable network access and do not run risky commands without approval," set safe defaults where possible and leave the rationale and exceptions in `AGENTS.md`.

## Limits and Exceptions

Not every setting should be committed to a repository. Personal permissions, company policy, local paths, and secrets may need user-level or managed configuration.

Model recommendations change. The model note in this post is based on official documentation checked on 2026-04-23 and should be rechecked before future use.

## References

- OpenAI, [Config basics](https://developers.openai.com/codex/config-basic)
- OpenAI, [Codex Models](https://developers.openai.com/codex/models)
- OpenAI, [Agent approvals & security](https://developers.openai.com/codex/agent-approvals-security)
