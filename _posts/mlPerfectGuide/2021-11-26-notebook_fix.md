---
published: true
layout: single
title: "Jupyter NoteBook template_path 에러 수정"
category: mlbasic
tags:
comments: true
sidebar:
  nav: "mainMenu"
use_math: true
--- 
* * *

Nbextensions 활성화 후에, 콘솔에 아래 같은 Warning이 출력 될 때, 아래와 같이 수정하면 문제가 해결 된다. 
template_path 만 template_paths로 변경해주면 된다. 다른 xml 등의 수정은 건드릴 필요 없다.
* * *
- [https://github.com/jfbercher/jupyter_latex_envs/pull/58-1](https://github.com/jfbercher/jupyter_latex_envs/pull/58/commits/c4cf36abae52340a79e1263c008603dc50c81546)
- [https://github.com/jfbercher/jupyter_latex_envs/pull/58-2](https://github.com/jfbercher/jupyter_latex_envs/pull/58/commits/bef1a870f26643645da9247b2a125ecd61045012)
- [https://github.com/ipython-contrib/jupyter_contrib_nbextensions/pull/1532-1](https://github.com/ipython-contrib/jupyter_contrib_nbextensions/pull/1532/commits/a1ef675e44ce0e2923ea61e099576568c923267c)
- [https://github.com/ipython-contrib/jupyter_contrib_nbextensions/pull/1532-2](https://github.com/ipython-contrib/jupyter_contrib_nbextensions/pull/1532/commits/9606d6190763e6d298ab1da6df9b4b20604b8277)

```
[W 18:49:22.283 NotebookApp] Config option template_path not recognized by LenvsHTMLExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.293 NotebookApp] Config option template_path not recognized by LenvsHTMLExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.314 NotebookApp] Config option template_path not recognized by LenvsTocHTMLExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.324 NotebookApp] Config option template_path not recognized by LenvsTocHTMLExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.366 NotebookApp] Config option template_path not recognized by LenvsLatexExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.371 NotebookApp] Config option template_path not recognized by LenvsLatexExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.555 NotebookApp] Config option template_path not recognized by LenvsSlidesExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.562 NotebookApp] Config option template_path not recognized by LenvsSlidesExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.663 NotebookApp] Config option template_path not recognized by LenvsHTMLExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.673 NotebookApp] Config option template_path not recognized by LenvsHTMLExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.694 NotebookApp] Config option template_path not recognized by LenvsTocHTMLExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.704 NotebookApp] Config option template_path not recognized by LenvsTocHTMLExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.746 NotebookApp] Config option template_path not recognized by LenvsLatexExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.752 NotebookApp] Config option template_path not recognized by LenvsLatexExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.911 NotebookApp] Config option template_path not recognized by LenvsSlidesExporter. Did you mean one of: template_file, template_name, template_paths?
[W 18:49:22.917 NotebookApp] Config option template_path not recognized by LenvsSlidesExporter. Did you mean one of: template_file, template_name, template_paths?

[W 01:32:11.487 NotebookApp] Config option `template_path` not recognized by `ExporterCollapsibleHeadings`.  Did you mean one of: `extra_template_paths, template_name, template_paths`?
[W 01:32:11.491 NotebookApp] Config option `template_path` not recognized by `ExporterCollapsibleHeadings`.  Did you mean one of: `extra_template_paths, template_name, template_paths`?
[W 01:32:11.507 NotebookApp] Config option `template_path` not recognized by `TocExporter`.  Did you mean one of: `extra_template_paths, template_name, template_paths`?
[W 01:32:11.510 NotebookApp] Config option `template_path` not recognized by `TocExporter`.  Did you mean one of: `extra_template_paths, template_name, template_paths`?
[W 01:32:11.617 NotebookApp] Config option `template_path` not recognized by `ExporterCollapsibleHeadings`.  Did you mean one of: `extra_template_paths, template_name, template_paths`?
[W 01:32:11.621 NotebookApp] Config option `template_path` not recognized by `ExporterCollapsibleHeadings`.  Did you mean one of: `extra_template_paths, template_name, template_paths`?
[W 01:32:11.637 NotebookApp] Config option `template_path` not recognized by `TocExporter`.  Did you mean one of: `extra_template_paths, template_name, template_paths`?
[W 01:32:11.640 NotebookApp] Config option `template_path` not recognized by `TocExporter`.  Did you mean one of: `extra_template_paths, template_name, template_paths`?

```