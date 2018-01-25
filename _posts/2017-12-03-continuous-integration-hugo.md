---
layout: single
title:  "Continuous Integration of Hugo Website using Travis CI and Github."
excerpt: "In this post I will go over how to set up a clean continuous
integration system for your personal Github site using Hugo and Travis CI."
date: 2017-12-03
mathjax: true
---


{: .notice--info}
For this post I am specifically dealing with a personal website hosted with Github,
not a project website that can be placed in a gh-pages branch.

I recently switched my website over from [Jekyll](https://jekyllrb.com) to [Hugo](https://gohugo.io).
Honestly, I don't know if I like it better yet. One thing that is definitely
harder with Hugo than with Jekyll is getting your site to generate content
automatically when pushed to Github, so I set out to solve this problem.

I'm a huge fan of automating build processes. For instance, I don't want to have to
run a script before I `git push` my content because, in all likelihood, I will
forget and my website (or documentation, etc.) will be outdated from the content
in the Github repo. There are a few resources that go over how to set up a Hugo
website on Github, [here](https://gohugo.io/hosting-and-deployment/hosting-on-github/) and [here](https://hjdskes.github.io/blog/update-deploying-hugo-on-personal-gh-pages/) are
a few examples. While helpful, these resources are either over complicated or don't really
work with personal Github pages (i.e. username.github.io). For some reason, when making
a personal Github site you can't do the normal tricks like using a `gh-pages` branch or
have your website be built from a `docs/` folder on your master branch. No, here Github
expects the relevant content to be right in the root directory in your master branch.

When you build your website with `hugo`, it creates a `public/` directory that
stores the website source. One option is to just copy that material into the root of
the master branch and commit it, but then you end up with a messy repo and I can't
abide that. Furthermore, with this solution you will have to run `hugo` before every
push. So, as usual, Travis CI comes to the rescue.

## The Solution

For this post, I will assume that you have a repo with your Hugo material. That
is, you have a `config.toml` file and folders `content/`, `static/` and `themes/`.
To start, you will push this material to a your Github repo for your site; however,
don't push this to the master branch but instead to a branch named "hugo". You
can do this with `git checkout -b hugo` and `git push origin hugo` after you have
added the material. Now, on Github go to "Settings" and click on "Branches". From
here, set your default branch to "hugo". Then go to "Integrations & Services" and
add Travis CI.

In a similar manner to a [previous post]({{ site.baseurl }}{% post_url 2017-11-20-automating-jupyter-slides %}), you will need to
[log in to Travis with your Github account](https://docs.travis-ci.com/user/getting-started/)
and enable builds for your repository. You will also need to
[create a personal access token](https://github.com/settings/tokens).
Copy this token and go to the settings page of your repo on travis and add set

1. `GITHUB_API_KEY`: set to the personal access token you just created.
2. `GITHUB_USER`: set to your Github username.

OK, now that we have Travis set up lets create the `.travis.yml` file:

```yaml
language: python

install:
    - wget https://github.com/gohugoio/hugo/releases/download/v0.31.1/hugo_0.31.1_Linux-64bit.deb
    - sudo dpkg -i hugo*.deb
    - pip install Pygments

script:
    - hugo

after_success: |
    if [ -n "$GITHUB_API_KEY" ]; then
    git checkout --orphan master
    git rm -rf .
    mv public/* .
    rm -rf public hugo_*
    git add -f --ignore-errors --all
    git -c user.name='travis' -c user.email='travis' commit -m init
    git push -f -q https://$GITHUB_USER:$GITHUB_API_KEY@github.com/$TRAVIS_REPO_SLUG master
    fi
```
Add this file to your "hugo" branch and we are good to go.
Lets now go over this file a bit. Firstly, for some reason `sudo apt-get hugo` isn't
working on Travis CI, so I download the source and install with `dpkg`. We also
install `Pygments` (a syntax highlighter) with `pip`. By running `hugo` we now
have all of our website material in a directory called `public/`. The `git checkout --orphan master`
command creates a new master branch with no history. We then move the material from
`public/` into the root of the master branch, add it, and push. If all goes well,
you should now have a nice Hugo website at `username.github.io`. Furthermore, you will
have your Github repo nice and clean by keeping your Hugo code and Markdown source
in the "hugo" branch while keeping all of your generated HTML in the "master" branch.

## Final Thoughts
This procedure is somewhat standard with a major difference being that we are using
"hugo" as our default branch and creating our site on the "master" branch. I'll
also note that there may be a more optimal way of doing this but since I have some
experience using Travis CI to automate other things, I figured this may be useful.
