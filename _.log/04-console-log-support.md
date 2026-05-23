---
title: "Console Log Support"
title_category: ".log"
permalink: /.log/console-log-support/
excerpt: ".log JetBrains IDE Plugin features for console output"
modified: 2026-05-22T19:00:00+02:00
---

Syntax Highlighting & Hyperlinks are supported also for **console output** across the IDE, similar to how log files are viewed in the editor.

## Supported Consoles

- Run/Debug 
- Build tool window (during & after build) 
- Services view (Docker etc)
- VCS Console
- Misc (e.g. Database, etc.)

## Features

### Syntax Highlighting

Log levels, timestamps, categories, and message constructs are highlighted using the same color scheme as log files. Colors are fully customizable — see [Settings - Customizing Color Scheme](/.log/settings/#customizing-color-scheme).

### Hyperlinks

File paths, URLs, and log categories/stack traces are converted to clickable hyperlinks:
- `⌘+B | Ctrl+B` or click to follow
- Stack traces navigate to source code (Java/JVM only)

## Toggling Console Display

Each console has a **View Console as Log** toggle button on the relevant view Title Bar and on the **Find Action** (`⌘+⇧+A | Ctrl+⇧+A`) screen. It is on by default.

<!-- TODO: screenshot of console toolbar with "View Console as Log" toggle -->
![Conosle output as log content](/assets/images/log/ss-log-console-as-log.gif)

**Note:** Log highlighting and links are added on top of Jetbrains IDE features, so the behavior is not consistent with how log files are displayed on the editor.
{: .notice--info}
