---
layout: single
title:  "How to start Github Blog"
categories: Github-Blog
tags: git TIL blog githubblog jekyll githubpages
---

# How to blog using Github Pages

### How Github Pages works

As you can see in this [video](https://youtu.be/2MsN8gpT6jY), your Github Page is just a website using a repository in your account as a server.  
We can maintain our website using the same tools we used in Github.  
And for those who don't want to build the whole website on their own, Github provided Jekyll themes so that we can only focus on what to write rather than how.
<br>
<br>
### How to use Jekyll to set up my own blog on Github.
Instead of starting from the ground, use Jekyll to build simple and good looking blog. 

- **Go to [https://jekyllthemes.io/](https://jekyllthemes.io/) and pick a theme you want.**

I chose Minimal Mistakes Jekyll theme just because it was free and had many likes.  [https://jekyllthemes.io/theme/minimal-mistakes](https://jekyllthemes.io/theme/minimal-mistakes)

- **Click on ‘Get [your theme’s name] on GitHub’ and click ‘Fork’ it.**
You can find the button at the top right corner of the page, second to the right.

Now, the whole repository is copied under your account.

- **Change name of the repository.**
1. Click on the repository you just forked.
2. Go to ‘Settings’ tab and change Repository name to `your_username.github.io`. (replace your_username to your Github username. You can’t user any other name than your Github username)
3. Now, find _config.yml file and click on ‘edit this file’ button.
4. Find `url :`  and change it to `url : "https://your_username.github.io"` 

Now you are good to go! To check if it is working, go to `[https://your_username.github.io](https://your_username.github.io)` (it might take a few seconds to be updated).