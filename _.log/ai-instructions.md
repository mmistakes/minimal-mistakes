# AI Instructions — Updating .log Plugin Documentation

## Purpose

This file provides instructions for AI assistants when updating the user-facing documentation for the **.log** JetBrains IDE plugin on this doc site.

## Guidelines

1. **Audience**: End users of the plugin. Do NOT describe implementation details, internal architecture, or code structure.
2. **Tone**: Clear, concise, practical. Match the existing documentation style.
3. **Structure**: Blend new content into existing pages where it fits logically. Avoid creating new pages unless the feature is large and standalone.
4. **Technical reference**: Read the project's technical docs at `C:\IDEA\log-idea\docs\` for accurate feature details, then distill into user-facing language.
5. **Screenshots**: Add HTML comments as placeholders (`<!-- TODO: screenshot of ... -->`) and ask the user to capture them.
6. **Keyboard shortcuts**: Use the Mac/Windows format convention: `⌘+⇧+A | Ctrl+⇧+A`.
7. **Front matter**: Update the `modified` date in YAML front matter of any changed page.
8. **Cross-references**: Link between pages using relative permalinks (e.g., `(/.log/view-and-navigate/#section-name)`).
9. **Notices**: Use `{: .notice--info}`, `{: .notice--warning}` for callouts, consistent with existing docs.
10. **Brevity**: Don't over-explain. One or two sentences per concept is usually enough.

