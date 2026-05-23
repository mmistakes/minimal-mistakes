---
title: "Log Files Support"
title_category: ".log"
permalink: /.log/log-files/
excerpt: ".log JetBrains IDE Plugin main features for log files"
modified: 2026-05-22T19:00:00+02:00
---

## Syntax Highlighting

**.log** automatically detects and highlights common log formats, including timestamps, log levels, categories, stack traces, log message constructs (numbers, measures, strings, value literals) and ANSI rendering instructions.

**Note:** In some cases, some log elements may not be highlighted as expected due to difficulties in reverse engineering human-readable log output to machine instructions. Typically, the impact is negligible. Regardless, please report anomalies. In some cases, rendering syntax can still be improved.
{: .notice--warning}

For any unrecognized log formats or highlighting inconsistencies, please [submit an issue with a log sample](#submitting-issues--feature-requests).

![Log syntax highlighting](/assets/images/log/ss-log-highlighting-play2.png)

## Log events time range
  
log file name display, on project view, or file tab, will include the time range of its log entries. date format will abbreviate and omit  year, month,day - if those match current date

## Navigation - Hyperlinks

Some log elements are converted to hyperlinks:
  - URIs/URLs: Open URLs directly from the log.
  - File Paths
  - Log Categories & Stack Traces (Java/JVM support only for now).

Open Hyperlinks - with Keyboard Shortcut: `Cmd + B | Ctrl + B` or a Click

**Note:** Code navigation may not always work as expected. on some cases it's not feasible to locate project resources without additional hints. Navigation to code is supported for JVM-based languages only or now (support planned for additional languages/frameworks). Regardless, please report any issue, so we can improve the navigation experience.
{: .notice--warning}

## Navigation - Problem Inspections

Opened log files are inspected for Errors and Warnings - each of those are
- highlighted in the editor
- reflected as a heatmap on the right side of the editor
- listed in the Problems Tool Window.

**Note:** Problem inspections are not available for Large log files (above Jetbrains IDE in-memory text file size threshold) that are viewed with pagination support. See [Settings - File Size Thresholds](/.log/settings/#file-size-thresholds).
{: .notice--info}

1. Navigate to Next/Previous Problem - with keyboard shortcut `F2` / `⌘+F2 | ⇧+F2`
2. View All Problems in the Problems Tool Window - Keyboard Shortcut: `⌘+6 | Alt+6`

By default, only **Errors** are cycled through with problem navigation. To include **Warnings**:
1. Hover over the error/warning counter in the top right corner of the editor.
2. Click on the three-dot menu and adjust the settings.
3. Alternatively, go to **Settings** > **Editor** > **Code Editing** > **Error highlighting** or use **Find Actions** (`⌘+⇧+A | Ctrl+⇧+A`) dialog.

**Note:** There is a cap on the maximum reported problems for performance. If there's a need to increase this cap, please [report an issue](#submitting-issues--feature-requests), so we can consider adding a setting for that.
{: .notice--info}

## Display Transformation

**.log** automatically detects and applies display transformations to improve log readability. Each transformation can be toggled on or off independently per file.

### ANSI Escape Codes

When a log file contains ANSI escape codes (terminal color/style sequences), **.log** automatically strips them and applies the corresponding text styling for a clean, readable view.

### Epoch Timestamps

When a log file contains numeric Unix timestamps (epoch seconds or milliseconds), **.log** automatically converts them to human-readable date/time format.

### Toggling Transformation

Toggle buttons appear in the top-right area of the editor when the relevant content is detected:
- **ANSI** — toggles ANSI code stripping and formatting
- **Timestamps** — toggles epoch-to-datetime conversion

Both toggles are also accessible via **Find Action** (`⌘+⇧+A | Ctrl+⇧+A`):
- Search: *Remove ANSI escape codes*
- Search: *Convert epoch timestamps*

Transformations are applied when log file is opened. Disabling a toggle restores the raw content for that feature. Toggle state is maintained per file for the duration of the IDE session.

![Display Transforms: ANSI and Timestamps toggles](/assets/images/log/ss-log-display-conversion-ansi-and-timestamps.gif)

## Planned Features

Following features are planned for 2026:

1. Code Navigation - Support additional languages/frameworks
2. Remote log files

Reported feature requests will be prioritized over planned roadmap features.
