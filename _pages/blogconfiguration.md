---
layout: pages
classes: wide
title: "My Blog Configuration"
permalink: /blogconfiguration/
search: true
excerpt: "What modification and changes made to my blog?"
date: 2020-05-22
last_modified_at: 2020-05-23
#last_modified_at: 
toc: true
toc_label: On This Page
toc_icon: list
toc_sticky: true
comments: false
---


# Here is the changes made to my blog

I'll be updating this post, to record all the modifications made to this blog like configuration, appearance, and so on.

## Main configuration

### Comments

I use Staticman v2 for comments

### reCaptcha

Register your domain at [Google reCAPTCHA](https://www.google.com/recaptcha/){:target="_blank"} and choose reCAPTCHA V2 (v3 is not supported) and convert the secret using Staticman v2 API for more information refer [STATICMAN ENCRYPTION](https://staticman-twn.herokuapp.com/v2/connect){:target="_blank"}

### Analytics

It helps to track blog views and visitors, you can register at [Google Analytics](https://analytics.google.com/){:target="_blank"}

### FilePath\Name: __config.yml_

| Modifications | Additions |Comments|
|:--|:--|:--:|
| minimal_mistakes_skin : "dark" <br> title : "THEWHATNOTE \| Inscrible Like never" <br> name  : "Harish Munagapati"<br> description : "Incribe Like Never" <br> url : https://thewhatnote.github.io <br>repository : thewhatnote/thewhatnote.github.io||`To display pipe | here in the table, used backslash \ like this '\|' in front of a pipe` |
|**comments:** <br> &nbsp;&nbsp;&nbsp;&nbsp; provider : "staticman_v2"<br> **staticman:** <br> &nbsp;&nbsp;&nbsp;&nbsp; branch: "master"<br> &nbsp;&nbsp;&nbsp;&nbsp; endpoint : "https://staticman-twn.herokuapp.com/v2/entry/"|||
| **reCaptcha:** <br> &nbsp;&nbsp;&nbsp;&nbsp; siteKey : [Refer Google reCAPTCHA admin console](https://www.google.com/recaptcha/admin/){:target="_blank"} <br> &nbsp;&nbsp;&nbsp;&nbsp; secret : [Refer Google reCAPTCHA admin console](https://www.google.com/recaptcha/admin/){:target="_blank"}|||
|**analytics:**<br> &nbsp;&nbsp;&nbsp;&nbsp; provider : "google" <br> &nbsp;&nbsp;&nbsp;&nbsp; google : <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; tracking_id : "UA-142176658-1"  |||
| **author:** <br> &nbsp;&nbsp;&nbsp;&nbsp; name : "Harish Munagapati" <br> &nbsp;&nbsp;&nbsp;&nbsp; avatar : "img/MyPics/Bio-Photo.jpeg" <br> &nbsp;&nbsp;&nbsp;&nbsp; bio : "I never thought I'll write code in my life, but today I'm..!" <br> &nbsp;&nbsp;&nbsp;&nbsp; location : "Hyderabad,India" <br>&nbsp;&nbsp;&nbsp;&nbsp; email : "harish@thewhatnote.com" <br> &nbsp;&nbsp;&nbsp;&nbsp; links: <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - lable : "Website"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; url : "https://thewhatnote.com" <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - lable : "GitHub"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; url : "https://github.com/thewhatnote"| <br><br><br><br>links: <br>&nbsp;&nbsp;&nbsp; - lable : "Linkedin"<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; url: "https://www.linkedin.com/in/hmunagapati/"|
|**footer:** <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - lable : "GitHub"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; url : "https://github.com/thewhatnote"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - lable : "Linkedin"<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; url: "https://www.linkedin.com/in/hmunagapati/"||

## Appearance changes

### Avatar

To appear profile pic (_Avatar_) a little bigger, changed  *_sidebar.scss_* here is the respective [commit 1](https://github.com/thewhatnote/thewhatnote.github.io/commit/c15499183125f002ef04764e55dc704573dc67bd){:target="_blank"} [commit 2](https://github.com/thewhatnote/thewhatnote.github.io/commit/dcb7085dda7fb4ef50cafdf8d05c7a7144f3e6bd){:target="_blank"} .
This changes matched the length of my full name. It looks good :smile:

### FilePath\Name: *_sass/minimal-mistakes/_sidebar.scss*

| Modifications | Additions |Comments|
|:--|:--|:--:|
|.author__avatar<br>img<br>&nbsp;&nbsp;&nbsp; max-width: 200px;<br>&nbsp;&nbsp;&nbsp; border-radius: 5%;|||

### Posts : Wide

I use [_Class:wide_](https://github.com/mmistakes/minimal-mistakes/pull/1516#issuecomment-362569150){:target="_blank"} with _layout: single_ to make my posts look wide like **this post**.

## Readme.md

In the future, I want to rename this post as [**Readme.md**](https://github.com/thewhatnote/thewhatnote.github.io/blob/master/README.md){:target="_blank"} as I'll update it with complete information about my blog.

## Development environment for the blog

I found these wonderful articles to setup a development environment in [Linux](https://shoreviewanalytics.github.io/Create-Jekyll-Blog-with-Minimal-Mistakes-theme-on-Ubuntu-16.04/){:target="_blank"} by [Chad Downey](https://github.com/shoreviewanalytics){:target="_blank"} and in [Windows](https://copdips.com/2018/05/setting-up-jekyll-with-minimal-mistakes-theme-on-windows.html){:target="_blank"} by [Xiang ZHU](https://github.com/copdips){:target="_blank"}

## Tricks

1. To open URL in new browser window `[link](url){:target="_blank"}`
2. To add a space `&nbsp`
3. For a new line `<br>`

## LIST OF TASKS 
{: .text-center}
 
- [x] Re-deploy blog to fix the issues with comments [20-May-2020]
- [ ] Organise images "img" folder
- [x] Setup local environment for development [23-May-2020]
- [ ] Add calander for tasks and events
- [ ] Enable posted date in "Single" layout
