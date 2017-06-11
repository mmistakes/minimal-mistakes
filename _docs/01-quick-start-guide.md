---
title: "Quick-Start Guide"
permalink: /docs/quick-start-guide/
excerpt: "How to quickly install and setup Minimal Mistakes for use with GitHub Pages."
modified: 2016-04-13T15:54:02-04:00
redirect_from:
  - /theme-setup/
---

{% include base_path %}

Minimal Mistakes has been developed to be 100% compatible with hosting a site on [GitHub Pages](https://pages.github.com/). To get up and running with a new GitHub repository quickly, follow these steps or jump ahead to the [full installation guide]({{ base_path }}/docs/installation/).

## Fork the Theme

Fork the [Minimal Mistakes theme](https://github.com/mmistakes/minimal-mistakes/fork), then rename the repo to **USERNAME.github.io** --- replacing **USERNAME** with your GitHub username.

<figure>
  <img src="{{ base_path }}/images/mm-theme-fork-repo.png" alt="fork Minimal Mistakes">
</figure>

**Note:** Your Jekyll site should be viewable immediately at <http://USERNAME.github.io>. If it's not, you can force a rebuild by **Customizing Your Site** (see below for more details).
{: .notice--warning}

If you're hosting several Jekyll based sites under the same GitHub username you will have to use Project Pages instead of User Pages. Essentially you rename the repo to something other than **USERNAME.github.io** and create a `gh-pages` branch off of `master`. For more details on how to set things up check [GitHub's documentation](https://help.github.com/articles/user-organization-and-project-pages/).

<figure>
  <img src="{{ base_path }}/images/mm-gh-pages.gif" alt="creating a new branch on GitHub">
</figure>

**ProTip:** Be sure to [delete](https://github.com/blog/1377-create-and-delete-branches) the `gh-pages` branch if you forked Minimal Mistakes. This branch contains the documentation and demo site for the theme and you probably don't want that showing up in your repo.
{: .notice--info}

## Customize Your Site

Open up `_config.yml` found in the root of the repo and edit anything under **Site Settings**. For a full explanation of every setting be sure to read the [**Configuration**]({{ base_path }}/docs/configuration/) section, but for now let's just change the site's title.

<figure>
  <img src="{{ base_path }}/images/mm-github-edit-config.gif" alt="editing _config.yml file">
  <figcaption>Edit text files without leaving GitHub.com</figcaption>
</figure>

Committing a change to `_config.yml` (or any file in your repository) will force GitHub Pages to rebuild your site with Jekyll. It should then be viewable a few seconds later at `https://USERNAME.github.io`.

---

Congratulations! You've successfully forked the theme and are up an running with GitHub Pages. Now you're ready to add content and customize the site further.
