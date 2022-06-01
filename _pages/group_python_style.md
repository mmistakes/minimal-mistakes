---
layout: single
permalink: /group/python_style
title: "Group Python Coding Style"
tags: [coding, python]
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
---

To help us maintain consistent, remixable codebases with minimum effort, we use static analysis tools, automated code formatting, automated tests, and continuous integration services.

## Development Suite

The current standard suite of tools is:

- [`Anaconda`](https://www.anaconda.com/distribution/) (Python distribution and virtual environment management)
- [`git`](https://git-scm.com) (source control management)
- [`pre-commit`](https://pre-commit.com) (static code tests when committing to your local development repository)
- [`black`](https://black.readthedocs.io/en/stable/) (automated - and controversial - code formatting)
- [`bandit`](https://bandit.readthedocs.io/en/latest/) (checks for potential security issues)
- [`flake8`](https://flake8.pycqa.org) (code linting)
- [`mypy`](http://mypy-lang.org/) (static typing, *optional*)
- [`pytest`](https://docs.pytest.org/en/latest/) (automated testing)
- [`pydocstyle`](www.pydocstyle.org) (linter for Python docstrings)
- [`coverage`](https://coverage.readthedocs.io), with [`pytest-cov`](https://pytest-cov.readthedocs.io/en/latest/readme.html)
- [`ReadTheDocs`](readthedocs.org/) for hosting documentation, using the [`Sphinx`](https://www.sphinx-doc.org/en/master/) code documentation system and [`sphinx-rtd-theme`](https://sphinx-rtd-theme.readthedocs.io/en/stable/)
- [`CircleCI`](https://pytest-cov.readthedocs.io/en/latest/readme.html) (continuous integration)
- [`GitHub`](https://github.com) (remote, public `git` repositories)

## PEPs

We try to stick to `PEP` guidelines wherever possible. Some important `PEP`s are:

- [`PEP8`](https://www.python.org/dev/peps/pep-0008/) (style guide for Python code)
- [`PEP257`](https://www.python.org/dev/peps/pep-0257/) (style guide for Python documentation)

## Packaging and Distribution

We aim to develop all our software and tools in public, under the MIT licence. To do this we make our source code available, with source (and where appropriate, binary) releases at [`GitHub`](https://github.com). Tools and Python packages are packaged for [`bioconda`](https://https://anaconda.org/bioconda), and Python packages are also distributed *via* [`PyPI`](https://pypi.org).

- [`GitHub`](https://github.com) (remote, public git repositories)
- [`bioconda`](https://https://anaconda.org/bioconda) (`Anaconda` channel distributing bioinformatics software)
- [`PyPI`](https://pypi.org) (Python package warehousing and distribution)


## Related posts

{% for post in site.categories.Style %}
- {{ post.date | date_to_string }}: [{{ post.title }}]({{ post.url }})
{% endfor %}