---
title: Using R in Jupyter
tags:
  - Jupyter
  - r-project
---
[Jupyter Notebooks](http://jupyter.org/) will handle [R](https://www.r-project.org/about.html) well by following [these steps](https://docs.anaconda.com/anaconda/navigator/tutorials/r-lang/). 
But, these steps don't work with [Jupyterlab](https://towardsdatascience.com/jupyter-notebooks-are-breathtakingly-featureless-use-jupyter-lab-be858a67b59d).

Following the instructions [here](https://richpauloo.github.io/2018-05-16-Installing-the-R-kernel-in-Jupyter-Lab/) will enable one to choose an R kernel. Note that there is a *ton* of output from R when running `install.packages("deftools")` because it's building it from source.

If one is not doing a lot of R development then create an [environment](https://medium.freecodecamp.org/why-you-need-python-environments-and-how-to-manage-them-with-conda-85f155f4353c) that can be switched into using `source activate <env-name>` when R notebooks are needed. I do this because R is a **ton** of code that could crap up your root Python install.

([This](https://www.datacamp.com/community/blog/jupyter-notebook-r) is an alternative description of how to set up R in Jupyter and includes steps that work for Jupyter Notebooks and Jupyterlab.)
