---
title: "Tools I love - my development stack 2023"
categories:
  - blog
tags:
  - python
  - linux
  - dev
---

# All the tools I love to work with nowadays (2023)

The list is not exhaustive, but here we go

- [bash](#bash)
- [Starship Prompt](#starship-prompt)
- [Excel](#excel)
- [pyenv](#pyenv)
- [pipx](#pipx)
- [poetry](#poetry)
- [Jupyter](#jupyter-lab)


## [bash](https://www.gnu.org/software/bash/)

I love working with the [Windows Subsystem for Linus (WSL)]().
I tried [fish shell]() for years, but switched back to bash.

If you want to get familar visit [[1]](http://mywiki.wooledge.org/BashGuide), [[2]](https://tldp.org/LDP/Bash-Beginners-Guide/html/)

Examples I run in bash all the time:

```bash
export PYTHONPATH=$PYTHONPATH:src
```

```bash
nano ~/.bashrc
```


## [Starship prompt](https://starship.rs/)
I am a commandline style of guy.
Already as a young guy I was tweeking my settings in [Counter-Strike](https://www.counter-strike.net/) using config (.cfg) files. I you are like me you will love the upgrade of your prompt.

A little preview how it looks for my python project:
![starship prompt in action](/assets/images/blog/2023-04/starship-prompt.png)


## [Excel](https://www.microsoft.com/en-us/microsoft-365/excel)
This one deserves a post on its own. Coming from Finance and been working in a large Cooperation I have seen quite a lot of impressive excel sheets in my time.
Also I can say I developed quite good skills myself.

I will dedicate another post to excel.
For inspiration check out [You Suck at Excel with Joel Spolsky](https://www.youtube.com/watch?v=0nbkaYsR94c):

<iframe width="560" height="315" src="https://www.youtube.com/embed/0nbkaYsR94c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## [pyenv](https://github.com/pyenv/pyenv)
I use pyenv to handle different python versions.
Also quite popular is [nodevn](https://github.com/nodenv/nodenv)


## [pipx](https://pypa.github.io/pipx/)
Let the _pipx claim_ speak for itself: 

> pipx — Install and Run Python Applications in Isolated Environments

And it does exactly that. It is awesome.
I like to install commandline tools like black or poetry with pipx.

Example of looking what is globally installed:

```bash
$ pipx list --short
black 18.9b0
pipx 0.10.0
```


## [poetry](https://python-poetry.org/)

It handles dependencies and the python packeting.
To keep it short: poetry is the modern successor of setuptools.

It has an awesome documentation, is fast and simply superior to [conda or miniconda](https://docs.conda.io/en/latest/miniconda.html).

That said, at work we default to a mix of using miniconda (as the python interpreter) and poetry as the dependency manager.
I found that there can be a usecase for this, but [this answer on stackexchange](https://stackoverflow.com/questions/70851048/does-it-make-sense-to-use-conda-poetry) explains is best.


## [Jupyter-Lab](https://jupyter.org/)
As a Data Scientist working with notebooks is the defactor way to start and explore any data set.
Also you get quite used to it if you start any learning path, either on google, kaggle or anywhere else.

Here is a magic command I almost always put at the beginning of my notebooks:

```console
%load_ext autoreload
%autoreload 2
```

It auto-reloads modules before executing code.
Might not seem optimized for CPU usage, but works wonders when creating your own modules (or importing ever-changing functions from .py files)
