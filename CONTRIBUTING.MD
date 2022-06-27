# Contributing

Changes are first made to the [dev](https://github.com/FiQCI/dev) repository which are then pushed to the main repository which builds the main website https://fiqci.fi/. 


First, ensure you have write access to both the [dev](https://github.com/FiQCI/dev) repository and the [main](https://github.com/FiQCI/fiqci.github.io) repository. Depending on your permissions you can then either do: 

### Pushing to main site master branch

1. Clone the `dev` repository and `cd` into it: `git clone git@github.com:FiQCI/dev.git` +`cd dev`
2. Do your changes which can be viewed locally (see above).
3. Commit your changes. 
4. Ensure you have the latest version of the dev repo **after changes** `git fetch` + `git pull`
5. Add the main repo's remote url: `git remote add mainsite git@github.com:FiQCI/fiqci.github.io`
6. Ensure you have the latest version of the main repo: `git fetch mainsite`
7. Create a new branch called "dev-changes" which is linked to the main repo **master** branch:  `git branch dev-changes mainsite/master`
8. Switch to this branch: `git checkout dev-changes`
9. Merge your changes with the new branch: `git merge origin/master`
10. Push your changes to the main repo **master** branch: `git push mainsite dev-changes:master`

OR

### Pushing to main site dev branch and creating a pull request

1. Clone the `dev` repository and `cd` into it: `git clone git@github.com:FiQCI/dev.git` +`cd dev`
2. Do your changes which can be viewed locally (see above).
3. [Create branch in mainsite](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository). For example "test-changes". 

4. Get this new branch in your local repository: `git fetch mainsite + git pull`
5. Create a new branch called "dev-changes" which is linked to the new branch you just created:  `git branch dev-changes mainsite/test-changes`
6. Switch to this branch: `git checkout dev-changes`
7. Merge your changes with the new branch: `git merge origin/master`
8. Push your changes to the main repo: `git push mainsite dev-changes`
7. Go to the main repo github page and switch to the new branch you created. Click "Compare and pull request" at the top. Then select "base:master" on the left and "compare: yourbranchname" on the right. Comment what you've changed and assign a reviewer. 



## Posts and Publications

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

