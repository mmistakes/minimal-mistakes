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
* Use minimal-mistake themes: [Here](https://mademistakes.com/)

### Init github repository
*Choose 1 of those options*
  1. Fork [my repository](https://github.com/minhvl1/minimal-mistakes)
  2. Clone [my repository](https://github.com/minhvl1/minimal-mistakes)

### Deploy github page
  1. After push or fork repo, github page is auto deploy 
  2. in: `Setting` -> `Pages`
  3. `Deploy from branch` -> `master`
     <img width="2332" height="1202" alt="image" src="https://github.com/user-attachments/assets/475f5485-d4f0-4e75-844d-790a09d81ff0" />

      * If you haven't own custom domain, your github url like: [https://username.github.io/yourepository](https://minhvl1.github.io//minimal-mistakes)

  5. Add custom domain(optinal)
      Config your CNAME point to your github page url*
     <img width="2336" height="160" alt="image" src="https://github.com/user-attachments/assets/bae35323-8912-467e-97ce-2c3c5b8c2b40" />

      * Add your domain
      * Enforce HTTPS
  <img width="1672" height="484" alt="image" src="https://github.com/user-attachments/assets/6b8dc57b-a7eb-4ddc-817f-8826ba5c16f8" />

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
