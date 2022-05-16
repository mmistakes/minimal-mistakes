---
title: "A simple cheatsheet to tmux"
related: true
toc: true
toc_sticky: true
categories:
  - Linux
tags:
  - linux
  - commandline
  - tmux
---

I have never remember such a damn beautiful but easy to forget tool like tmux. Everytime I need a search it on Google and than just forgot about everything. I thought a small cheatsheet would be useful for me, but also you.

**CTRL-B** is default prefix to execute commands.

| \<prefix>+Command | Explanation                                   |
| ----------------- | --------------------------------------------- |
| c                 | Creates a new session                         |
| d                 | Detach from a session                         |
| [0-9]             | Move between sessions                         |
| ,                 | Rename a window                               |
| p                 | Previous window                               |
| n                 | Next window                                   |
| w                 | Shows all windows                             |
| &                 | Kill current window                           |
| "                 | Split pane horizontally                       |
| %                 | Split pane vertically                         |
| Arrows            | Move between panels                           |
| x                 | Kill current panel                            |
| Spacebar          | Toogle between horizontal and vertical panels |

## Some small adjustments

If you like to use mouse like me or want to adjust panel height/width quickly following tmux config file would be helpful

```tex
set -g mouse on
bind -n C-k resize-pane -U 5
bind -n C-j resize-pane -D 5
bind -n C-h resize-pane -L 5
bind -n C-l resize-pane -R 5
```

After adding to tmux config only thing you need would be just sourcing the config file

```bash
tmux source-file ~/.tmux.conf
```

Have a nice day
