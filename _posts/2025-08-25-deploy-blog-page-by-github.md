---
title: "How to deploy your blog site with github page"
categories:
  - Github Page
tags:
  - github page
  - deploy
---

This topic will help you deploy your blog site (FREE)

* Own your custom domain(paid), If not use github page domain default like: github.minhvl1.io 
* Use minimal-mistake themes: https://mademistakes.com/

### Init github repository
*Choose 1 of those options*
  1. Fork [my repository](https://github.com/minhvl1/minimal-mistakes)
  2. Clone [my repository](https://github.com/minhvl1/minimal-mistakes)

### Deploy github page
  1. After push or fork repo, github page is auto deploy 
  2. in: `Setting` -> `Pages`
  3. `Deploy from branch` -> `master`
    *If you haven't own custom domain, your github url like:* [https://github.minhvl1.io](https://github.minhvl1.io)

  4. Add custom domain(optinal)
    * Config your CNAME point to your github page url
    * Add your domain
    * Enforce HTTPS

### Create post
  1. Create `.md` post file in `_posts` folder
  2. Example naming convention: 
  `YYYY-mm-dd-title.md`
  `2025-08-25-deploy-blog-page-by-github.md`

### Custom author
  1. Custom in `_config.yml`
  ```
  # Site Author
  author:
    name             : "Minh Dawson Vu"
    avatar           : "/assets/images/HAT00815.jpg"
    bio              : "**Automation Test Engineer**"
    location         : "Viet Nam"
    # email            : "minhvu890yahoo@gmail.com"
  ```
### Add page
  1. Create new page `md` file in `_pages` folder
  2. Config `navigation.yml` in `_data` folder
  3. Add your page `permalink` in `_config.yml`
  ```
    collections:
    pages:
      output: true
      permalink: /:title/
  ```