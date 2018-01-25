---
layout: single
title:  "Automating Jupyter Slides with Travis CI and gh-pages."
excerpt: "From a Jupyter notebook to a beautiful web presentation in no time!"
date: 2017-11-20
mathjax: true
---

First off, if you use Python and you don't use [Jupyter Notebooks](http://jupyter.org)
then you need to start right now. For that matter I would say the same thing about
R users (although I'm not that familiar with R-markdown so maybe that's ok). Jupyter
notebooks are changing the way we work with code, instead of writing obscure "scripts"
or re-writing the same code blocks over and over in Ipython or Rstudio, we now
are writing [computational essays](http://blog.stephenwolfram.com/2017/11/what-is-a-computational-essay/)
in which the code, comments, notes, and figures all live in the same place ensuring
more robust and reproducible research.

Ok, now that my evangelizing is done, lets get down to business. Lets say you
have been working on a beautiful Jupyter notebook and now you have to present
your results at a conference or business meeting. The standard way of doing this
would be to gather up all of the figures, some text, and maybe some code from
the notebook and put it into a PowerPoint/Keynote/Beamer presentation. If you then
want to share this presentation more widely you may host them on [Speaker Deck](https://speakerdeck.com) or
just throw them on a Github repository somewhere. Actually, if you have already
done this, then you are ahead of the game in terms of open-source science. But
you did so much work on that notebook, wouldn't it be better if you didn't then
have to spend all that extra valuable time making slides too? Well, we can do that
with Jupyter notebooks and with a few quick hacks you can go from notebook to
web-published slides.

## The Notebook

I will assume a familiarity with Jupyter notebooks in general but not with the
slideshow features. Lets say you have a notebook called `nb.ipynb` with some
content. To go into slideshow mode click `View -> Cell Toolbar -> Slideshow`,
this will now add a toolbar to each cell in the notebook from which you can choose
what kind of slide you want each cell to be. You can choose `Slide` for a standard
slide, `Sub-Slide` for a continuation slide, `Fragment` for revealing bullet points
or other elements within a single slide, `Notes` to add slide notes, `Skip` to
not include that cell in the slideshow. [Here](https://github.com/jellis18/jupyter_notebook_slide_tutorial/blob/master/nb.ipynb) is an example notebook in case
you don't already have one ready. Lastly, if you include any extra images, place them
in an `img/` folder and commit that to your Github repo. You can view your notebook
in the web browser with `jupyter nbconvert nb.ipynb --to slides --post serve`.
Now that we have the notebook, lets do this!

## Setup

Much of this setup is inspired by Dan Foreman-Mackey's awesome article on
[continuous integration of academic papers](http://dfm.io/posts/travis-latex/)
and the first few steps are nearly identical to what is done there.

First, [create a Github repo](https://help.github.com/articles/create-a-repo/)
and commit your notebook. To get started with Travis, create a `.travis.yml`
file and [log in to Travis with your Github account](https://docs.travis-ci.com/user/getting-started/)
and enable builds for your repository. You will also need to
[create a personal access token](https://github.com/settings/tokens).
Copy this token and go to the settings page of your repo on travis and add set

1. `GITHUB_API_KEY`: set to the personal access token you just created.
2. `GITHUB_USER`: set to your Github username.

OK, now that we have Travis set up lets edit the `.travis.yml` file:

```yaml
language: python
cache: pip

python:
    - "2.7"

# install jupyter and get reveal.js as we will need it to build the website
# from Travis
install:
    - pip install jupyter
    - wget https://github.com/hakimel/reveal.js/archive/master.zip
    - unzip master.zip
    - mv reveal.js-master reveal.js

script:
    - jupyter nbconvert nb.ipynb --to slides --reveal-prefix=reveal.js

after_success: |
    if [ -n "$GITHUB_API_KEY" ]; then
    git checkout --orphan gh-pages
    git rm -rf --cached .
    mv nb.slides.html index.html
    git add -f --ignore-errors index.html img reveal.js
    git -c user.name='travis' -c user.email='travis' commit -m init
    git push -f -q https://$GITHUB_USER:$GITHUB_API_KEY@github.com/$TRAVIS_REPO_SLUG gh-pages
    fi
```
Push this to your Github repository and if all goes well then your web-presentation
should be available at `https://USERNAME.github.io/REPONAME`. If this worked, any
further changes that you make to your Jupyter notebook will then be automatically
built and displayed in the web-presentation. Here is my example [Github repo](https://github.com/jellis18/jupyter_notebook_slide_tutorial) and
[presentation](https://jellis18.github.io/jupyter_notebook_slide_tutorial/).

## Final Thoughts

Now you can make nice automated Jupyter notebook slides; however, I only showed
the very basics of Jupyter Notebook slideshow options and themes. Things are
pretty customizable if you aren't opposed to some hacking. Lastly, I don't think
Jupyter notebooks are good for all presentations but it is great for code demos
and talks that have code attached to them.
