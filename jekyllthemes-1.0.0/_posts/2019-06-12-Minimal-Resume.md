---
layout: post
title: Minimal Resume
date: 2019-06-12 00:00:00
homepage: https://github.com/murraco/jekyll-theme-minimal-resume
download: https://github.com/murraco/jekyll-theme-minimal-resume/archive/master.zip
demo: https://jekyll-theme-minimal-resume.netlify.com/
author: Mauricio Urraco <mauriurraco@gmail.com>
thumbnail: minimal-resume.png
license: MIT
license_link: https://github.com/murraco/jekyll-theme-minimal-resume/blob/master/LICENSE
---

This is a simple Jekyll theme for a minimal resume website.

### Features

- 100% Github Pages Compatibility
- Easy to configure particles animation
- SEO Integration
- Extremely simple and minimalistic
- Responsive
- Font Awesome 5+

### Quick Setup

1. Install Jekyll: `gem install jekyll bundler`
2. For this repository and clone your fork
3. Edit `_config.yml` to personalize your site

### Settings

You have to fill some informations on `_config.yml` to customize your site:

#### Site settings
```yml
description: A blog about lorem ipsum dolor sit amet
baseurl: "" # the subpath of your site, e.g. /blog/
url: "http://localhost:3000" # the base hostname & protocol for your site
```

#### User settings
```yml
username: Lorem Ipsum
user_description: Software Engineer at Lorem Ipsum Dolor
user_title: Mauricio Urraco
email: mauriurraco@gmail.com
personal_website: https://mauriciourraco.com
```

> Don't forget to change your URL before you deploy your site!

### Color and Particle Customization

- Color Customization
  - Edit the `.sass` variables
- Particle Customization
  - Edit the json data in particle function in `app.js`
  - Refer to `Particle.js` for help
  
### Content

You can (and should) edit the `.html` files for adding your own information, icons, working experience, social links or whatever you want to add. I.e.:

```html
<a aria-label="My Github" target="_blank" href="https://github.com/murraco">
  <i class="icon fa fa-github-alt" aria-hidden="true"></i>
</a>
```