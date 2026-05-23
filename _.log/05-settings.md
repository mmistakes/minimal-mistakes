---
title: "Settings"
title_category: ".log"
permalink: /.log/settings/
excerpt: ".log JetBrains IDE Plugin Settings"
modified: 2026-05-22T19:00:00+02:00
---

## Customizing Color Scheme

Syntax highlighting Color Scheme of files opened with **.log plugin** can be customized to match any personal preferences.
To set custom colors/styles for log file elements (i.e. timestamps, log levels, message constructs):

1. Open the **Color Scheme** Settings:
- Navigate to **Settings** > **Editor** > **Color Scheme** > **File Types**.
- Select **Log Files** from the list of file types.

2. Adjust Specific Colors for Log Elements:
- In the **Logs** color scheme settings, you'll see options for various log elements such as:
  - Log Levels (e.g., INFO, WARN, ERROR)
  - Timestamps, Category, Context id...
  - ANSI Color Codes (foreground & background color only)
- For each element foreground, background and font style (bold, italic, underline) can be customized. For ANSI codes only foreground and background colors are relevant.
- Click **Apply** and **OK** to save your changes. Changes will apply immediately.

![Log Color Scheme Settings](/assets/images/log/ss-log-settings-color-scheme.png)

## File Type Association

By default, **.log plugin** configured to support log file name patterns: `*.log;*.err;*.out;*.log.txt`.
To associate additional log file name patterns, to be viewed by **.log plugin**, update File Type Settings:
1. **Find Action** dialog (`⌘+⇧+A | Ctrl+⇧+A`) → Search: **File Types** (or alternatively, **Settings** (`⌘+, | Ctrl+Alt+S`) → **File Types**)
2. Under **Recognized File Types** → **Logs** → add file name patterns

![Log File Type Settings](/assets/images/log/ss-log-settings-file-type.png)

## ANSI Escape Codes

When a log file contains ANSI escape codes, **.log plugin** applies text styling according to those codes and hides the raw escape sequences for a cleaner view. Files opened with ANSI styling are **read-only**.

This behavior can be toggled per file when relevant — see [Display Transformation](/.log/log-files/#display-transformation).

## File Size Thresholds

To ensure responsive performance, JetBrains IDE has a file size threshold for in-memory content loading.

When a log file exceeds this threshold (default 20 MB), it is opened as a **Large File** with pagination and large-file view optimization. The file is **read-only** in this mode. Text search may be slower while disk I/O is performed. On the other hand file scrolling and overall UX may be more responsive,

**Note**: Problem inspections are not supported for log files opened as Large Files. See [Navigation - Problem Inspections](/.log/log-files/#navigation---problem-inspections) for details.
{: .notice--info}

**Note**: If performance issues are encountered, [please report](/.log/log-files/#submitting-issues--feature-requests) the details including file size, typical log line length, typical log snippet and preferably also host CPU/memory specs.
{: .notice--warning}


