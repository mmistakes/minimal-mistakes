---
title: "Jupyter goodness"
#tags:
#  - jupyter
#  - ipython
#  - python
#  - css
#  - data-science
excerpt: "Learning to make the most of Jupyter notebooks"
---

This post is a collection of things I've learned along the way while heavily working with Jupyter notebooks.

[Jupyter](http://jupyter.org) has been, ever since its inception, a fantastic project. Born as the natural evolution of IPython, it allows you now to do so much more, included using languages other than Python.

It's easy to set up a notebook, do some stuff, fill it with plots and dataframes, run some algorithms. It takes a little more knowledge, and experience, to actually take advantage of all, or most, of its features. And it's really worth spending some time trying things out and getting familiar with them, as eventually you will write better code, spend less time in the adminy parts, focus on the analyses.

## Jupyter is really powerful

I've recently stumbled upon [this beautiful page](https://www.dataquest.io/blog/jupyter-notebook-tips-tricks-shortcuts/) which brilliantly illustrates some of the not-necessarily-well-known capabilities of Jupyter. Let's briefly go through those I find more interesting:

* The _keyboard shortcuts_: these can be seen from the Jupyter UI directly, very useful for manipulating cells quickly without clicking around;mmm

* _Printing more than just the last variable in a cell_. If you try to see the output of more variables without explicitly writing `print` in front of each, only the last one gets outputted. With this, you get them all:

```py
from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = "all"
```

This is particularly useful to head multiple Pandas dataframes in one cell.

* The possibility to _set environment variables_ directly from the notebook and not having to restart it. A life changer. How many times did I restart the kernel after realising I needed a new env var. Instead:

```py
%env NEW_ENV_VAR=1
```

* _Passing variables between notebooks_. How many times did I write the same snippets of code to recreate the same variables. Instead:

```py
%store var
```

stores the variable. To call it in another notebook:

```py
%store -r data
```

* _See plots in high res for retina displays_:

```py
%config InlineBackend.figure_format = 'retina'
```


This small list has excluded important things like _running scripts_ from inside a notebook, _timing execution of cells_, _debugging_, _running shell scripts_, _creating presentations_ ..., because I wanted to focus on those which were, **to me**, the least known/most surprising. The page reported above gives a much more detailed outline.

## Keep both Python 2 and Python 3 kernels

For whatever reason you might want to use either of the two versions of Python, you can, starting from one (say 3) of the two, install the second kernel as

```bash
python2 -m pip install ipykernel
python2 -m ipykernel install --user
```

Credit goes to this Stack Overflow [question](http://stackoverflow.com/questions/30492623/using-both-python-2-x-and-python-3-x-in-ipython-notebook).

## Customising the Markdown style

This means setting up a custom CSS profile for the notebook.

The procedure passes through the creation of a `custom.css` file in `/.ipython/profile_default/static/custom/` (if no such profile has been setup, that file exists and is empty). [This](http://stackoverflow.com/questions/32071672/where-should-i-place-my-settings-and-profiles-for-use-with-ipython-jupyter-4-0) question on Stack Overflow is a good read for setting up said custom profile.

[This repository](https://github.com/nsonnad/base16-ipython-notebook) contains a collection of themes you can download and use. There is even [someone](http://www.damian.oquanta.info/posts/48-themes-for-your-ipython-notebook.html) who tried them all!

Now, for a project I'm carrying out, I wanted to change the styles to the notebooks, but **only** in that specific project and not globally. It should be possible to define multiple folders for the CSS files, one per profile, and decide which one to use. However, because notebooks are the backbone of my project, I also wanted the style to appear independently of the fact that the customisation was in my laptop.

The best solution I've found has been the one adopted in [this book](https://github.com/CamDavidsonPilon/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers): defining a small function the repo, which loads the content inside the HTML object of IPython:


```py
from IPython.core.display import HTML

def set_css_style(css_file_path):
    """
    Read the custom CSS file and load it into Jupyter.
    Pass the file path to the CSS file.
    """

    styles = open(css_file_path, "r").read()
    return HTML(styles)
```

and can be easily called from the notebook as (after writing a CSS custom file)

```py
set_css_style('../styles_files/custom.css')
```

This way, it's easy to try different things until I find the customisation I want, for that specific notebook.
