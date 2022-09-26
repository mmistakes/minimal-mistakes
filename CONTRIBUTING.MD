# Contributing

Changes are first made to the [dev](https://github.com/NordIQuEst/dev) repository which are then pushed to the [main](https://github.com/NordIQuEst/nordiquest.github.io) repository which builds the main website https://nordiquest.net/. You can preview the [dev](https://github.com/NordIQuEst/dev) repository at https://nordiquest.net/dev. **ALL** changes should be made directly to the dev repository. 

You can either edit/add documents through the GitHub Web GUI and **request** a merge with the main repository or you can edit/add documents through the terminal and merge them yourself, however this requires more advanced usage. 

First, ensure you have write access to both the [dev](https://github.com/NordIQuEst/dev) repository and the [main](https://github.com/NordIQuEst/nordiquest.github.io) repository. 


Once you've completed the steps above:
* In [the dev repo](https://github.com/NordIQuEst/dev) navigate to where you want to add a new file e.g `_posts/` and click "Add file" at the top. Or navigate to a file already in the repo and click the little pen icon in the top right "Edit this file". 
* (sign in GitHub) and edit then content
* Scroll down to commit changes (create a new branch) -> make a pull request
* Assign a reviewer who will then merge and push to the master dev branch
* After merging to the master branch of the dev repository a pull request will then be made to the main website. 


Of course all of the above can be done through the terminal as well:

* Clone the dev repository `git clone https://github.com/NordIQuEst/dev.git` or through SSH. 
* Create and switch to a new branch `git checkout -b ＜new-branch＞`
* Do your changes / Add your files. The changes you've made can be previewed with `git status`.
* Add and commit your new files `git add <files>` `git commit -m <message>`
* Push your changes to the dev repository `git push origin <new-branch>`
* Then navigate to the GitHub page: https://github.com/NordIQuEst/dev .
* You may see a message `<new-branch> has had recent changes`, this is a quick way to switch to your branch.
* You can create a "Pull request" by clicking on `Contribute` at the top of the repository. You will want to select to merge into `NordIQuEst/dev` from `dev:<new-branch`. 
* Ensure you have the correct git *remote* setup for the Dev repo. This can be checked with `git remote -v`. 

``
base repository: NordIQuEst/dev base:master <-- head repository: NordIQuEst/dev compare: <new-branch>
``


Please check [Adding/Editing the website](#Adding-to-or-Editing-the-website) below for details on **where** to add new files such that they do not break the site. 

## Adding to or Editing the website

This website is built using Jekyll with the minimal mistakes theme, thus the layout of the site is very particular. 

The `_pages/` directory contains directly loading pages on the website. These can be edited and added to in markdown format + frontmatter following the layout already provided. Additional files to this directory should generally not be made without prior checking as it will affect the rest of the website. 

The `_pages/publications.md` file will automatically generate content placed into the `_posts/` and `_publications/` directories. 

The `_posts/` directory contains markdown (or html) files for content regarding short posts. New markdown files can be added/created in this directory on GitHub by navigating to https://github.com/NordIQuEst/dev/tree/master/_posts and clicking "Add file" in the top right. Please see below for a short style guide as new files added to this folder must have a certain name style.  

The `_publications/` directory contains markdown (or html) files for content regarding publications about NordIQuEst. New markdown files can be added/created in this directory on GitHub by navigating to https://github.com/NordIQuEst/dev/tree/master/_publications and clicking "Add file" in the top right. Please see below for a short style guide as new files added to this folder must have a certain name style.  


If you have made a change to the `_config.yml` file you will need to delete `_site` (e.g `rm -r _site/`) and rebuild.

To find out more about jekyll, take a look at the docs: https://jekyllrb.com/docs/. 


### Posts and Publications

Posts and Publications can be in either `html` or `markdown` format and must be located in either `_posts` or `_publications`. Posts must be created with the following format `YEAT-MONTH-DAY-title.md` in order to render correctly on the webpage. You can also include front matter to set the layout and provide additional information

```
---
title: 'Blog Post number 1'
date: 2012-08-14
permalink: /posts/2012/08/blog-post-1/
header:
  teaser: /assets/images/about-icon.jpg
published: true
gallery:
  - url: /assets/images/about-icon.jpg
    image_path: /assets/images/about-icon.jpg
    title: Before and after comparison
tags:
  - cool posts
  - category1
  - category2
---

```

In this example the front matter variables such as `gallery` can be displayed in the main body of the text via `{% include gallery%}`. A teaser image or thumbnail can also be attached which will display on the posts and publications page. See the `templates/` directory for example posts and publications. 


For further information: 
- https://jekyllrb.com/docs/posts/
- https://jekyllrb.com/docs/front-matter/
- https://www.markdownguide.org/cheat-sheet/

Template files can be found under `templates/`. 


## Admin information

When the dev repository is ahead of the main website repository (NordIQuEst/nordiquest.github.io) a notification will appear at the top of NordIQuEst/dev saying "This branch is X commits ahead of NordIQuEst:master". To push changes made to the dev repository to the main website i.e https://nordiquest.net/dev --> https://nordiquest.net/ click "Contribute" --> Open pull request and ensure that

``
base repository: NordIQuEst/nordiquest.github.io base:master <-- head repository: NordIQuEst/dev compare: master
``

Create the pull request with relevant title and message. If it states **Unable to merge** then there are conflicts. Unfortunately conflicts usually have to be resolved in the terminal. You can view [Resolving a merge conflict on GitHub](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-on-github) for more details. 