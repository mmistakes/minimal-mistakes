---
title: "How To Setup Timer Hugo"
layout: single
permalink: /blogs/hugo/
---
![Hugo]({{ site.baseurl }}/assets/images/blogs/hugo_blog.svg)
## Install this template by following those simple steps:
# STEP-1 : Hugo installation
Check this link below for install hugo on your computer. [hugo install documentation](https://gohugo.io/getting-started/installing/)

# STEP-2 : Create your project
Hugo provides a "new" command to create a new website.

![Hugo]({{ site.baseurl }}/assets/images/blogs/hugo_blog2.png)

# STEP-3 : Install the theme
Run this command

![Hugo]({{ site.baseurl }}/assets/images/blogs/hugo_blog3.png)

and then go to the themes folder inside of timer-hugo folder. You can also use this command "cd timer-hugo/themes" for going to this folder. Then run the command

![Hugo]({{ site.baseurl }}/assets/images/blogs/hugo_blog4.png)

Alternatively, you can [download the theme as .zip](https://github.com/themefisher/timer-hugo/archive/master.zip) file and extract it in the "themes" directory

After that you need to go to the "timer-hugo/exampleSite" folder and copy or cut all the elements, and now go back to the root folder and paste it here.

open the command prompt again and run "cd ../" command for go back to the root folder.

# STEP-4 : Host locally
Launching the website locally by using the following command:

![Hugo]({{ site.baseurl }}/assets/images/blogs/hugo_blog5.png)

Go to "http://localhost:1313"

Or you can check this video documentation for installing this template:

<iframe width="560" height="315" src="https://www.youtube.com/embed/Ezd_STvPJbA" 
title="YouTube video player" frameborder="0" allowfullscreen></iframe>

# STEP-5 : Basic configuration
When building the website, you can set a theme by using "--theme" option. However, we suggest you modify the configuration file ("config.toml") and set the theme as the default.

![Hugo]({{ site.baseurl }}/assets/images/blogs/hugo_blog6.png)

# STEP-6 : Create your first content pages

![Hugo]({{ site.baseurl }}/assets/images/blogs/hugo_blog7.png)

# STEP-7 : Build the website
When your site is ready to deploy, run the following command:

![Hugo]({{ site.baseurl }}/assets/images/blogs/hugo_blog8.png)

A "public" folder will be generated, containing all static content and assets for your website. It can now be deployed on any web server.
