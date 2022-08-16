# Contributing

Changes are first made to the [dev](https://github.com/FiQCI/dev) repository which are then pushed to the [main](https://github.com/FiQCI/fiqci.github.io) repository which builds the main website https://fiqci.fi/. 

You can either edit/add documents through the GitHub Web GUI and **request** a merge with the main repository or you can edit/add documents through the terminal and merge them yourself, however this requires more advanced usage. 

First, ensure you have write access to both the [dev](https://github.com/FiQCI/dev) repository and the [main](https://github.com/FiQCI/fiqci.github.io) repository. 

**_NOTE:_**  If the main repo is AHEAD of the dev repo this can be resolved via adding the mainsite remote as below (`git remote add mainsite git@github.com:FiQCI/fiqci.github.io`) then `git fetch mainsite`, `git pull mainsite` then from dev:master `git pull mainsite master` and add a commit message saying you are merging upstream changes. 

**Always check that the dev repo is up to date with the main repo**


## For the impatient

Once you've completed the steps above:
* In [the dev repo](https://github.com/FiQCI/dev) navigate to where you want to add a new file e.g `_posts/` and click "Add file" at the top. Or navigate to a file already in the repo and click the little pen icon in the top right "Edit this file". 
* (sign in GitHub) and edit then content
* Scroll down to commit changes (create a new branch) -> make a pull request
* Assign a reviewer who will then merge and push to the main site

<<<<<<< HEAD
Please check [Adding/Editing the website](#Adding/Editing-the-website) below for details on **where** to add new files such that they do not break the site. 
=======
Please check [Adding/Editing the website](#Adding-to-or-Editing-the-website) below for details on **where** to add new files such that they do not break the site. 
>>>>>>> origin/master


## Pushing to the main repo master branch

This method directly pushes dev:master --> fiqci.github.io:master and requires admin rights on both dev and the main repo. 

1. Clone the `dev` repository and `cd` into it: `git clone git@github.com:FiQCI/dev.git` +`cd dev`
2. Do your changes which can be viewed locally (see above).
3. Commit your changes. 
4. Ensure you have the latest version of the dev repo **after changes** `git fetch` + `git pull`
5. Add the main repo's remote url: `git remote add mainsite git@github.com:FiQCI/fiqci.github.io`
6. Ensure you have the latest version of the main repo: `git fetch mainsite`
7. Create a new branch called "dev-changes" which is linked to the main repo **master** branch:  `git branch dev-changes mainsite/master`
8. Switch to this branch: `git checkout dev-changes`
9. Merge your changes with the new branch: `git merge origin/master -m <msg>`. Add a useful commit message to track what was changed.
10. Push your changes to the main repo **master** branch: `git push mainsite dev-changes:master`

OR

## Pushing to the main repo new branch and creating a pull request

This method pushes the changes in dev:master to fiqci.github.io:newbranch where `newbranch` is a user-created branch in the main repo. 

1. Clone the `dev` repository and `cd` into it: `git clone git@github.com:FiQCI/dev.git` +`cd dev`
<<<<<<< HEAD
2. Do your changes which can be viewed locally (see above).
=======
2. Do your changes which can be viewed locally (see [README](README.MD)).
>>>>>>> origin/master
3. [Create branch in mainsite](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository). For example "test-changes". 

4. Get this new branch in your local repository: `git fetch mainsite + git pull`
5. Create a new branch called "dev-changes" which is linked to the new branch you just created:  `git branch dev-changes mainsite/test-changes`
6. Switch to this branch: `git checkout dev-changes`
7. Merge your changes with the new branch: `git merge origin/master -m <msg>`. Add a useful commit message to track what was changed.
8. Push your changes to the main repo: `git push mainsite dev-changes`
7. Go to the main repo github page and switch to the new branch you created. Click "Compare and pull request" at the top. Then select "base:master" on the left and "compare: yourbranchname" on the right. Comment what you've changed and assign a reviewer. 


<<<<<<< HEAD
## Adding/Editing the website
=======
## Adding to or Editing the website
>>>>>>> origin/master

This website is built using Jekyll with the minimal mistakes theme, thus the layout of the site is very particular. 

The `_pages/` directory contains directly loading pages on the website. These can be edited and added to in markdown format + frontmatter following the layout already provided. Additional files to this directory should generally not be made without prior checking as it will affect the rest of the website. 

The `_pages/publications.md` file will automatically generate content placed into the `_posts/` and `_publications/` directories. 

The `_posts/` directory contains markdown (or html) files for content regarding short posts. New markdown files can be added/created in this directory on GitHub by navigating to https://github.com/FiQCI/dev/tree/master/_posts and clicking "Add file" in the top right. Please see below for a short style guide as new files added to this folder must have a certain name style.  

The `_publications/` directory contains markdown (or html) files for content regarding publications about FiQCI. New markdown files can be added/created in this directory on GitHub by navigating to https://github.com/FiQCI/dev/tree/master/_publications and clicking "Add file" in the top right. Please see below for a short style guide as new files added to this folder must have a certain name style.  


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

