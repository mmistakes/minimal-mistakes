---
date: 2016-05-06 10:53:57
title: Building the site with Hugo
header:
  overlay_image: https://gohugo.io/img/hugo-logo.png
excerpt: Why I chose Hugo as this sites engine?

---



I used to maintain a [blog](https://sarafianalex.wordpress.com/) in WordPress. To be clear I never put hard effort in the appearance of the site and I'm not good with html and css. I was always focused on the backend aspect of applications. I stopped contributing into this blog 4 years ago. It never felt comfortable enough. There was too much problem with content development and then styling code fragments.

About a year ago I noticed **markdown**. I am so amazed with it because it offers the minimum annotation noise while offering a very good rendering. It doesn't matter if you are reading the content in the rendered format or in a notepad, you can always read the content clearly. The additional noise from the markdown syntax is minimum. It also works great for source control such as [github](https://github.com) and [bitbucket](https://bitbucket.org).

A couple of months ago I investigated how to build a documentation portal for an upcoming powershell module we are developing here. The ability to put your content next to your source is amazing and the rendered outcome is also great. During my investigation, we decided to use [DOCFX](https://github.com/dotnet/docfx) which Microsoft says they are going to make the documentation generator for MSDN. You can take a look at the produced doc portal [here](https://dotnet.github.io/docfx/).

While doing this investigation I also noticed other similar tooling including [Jekyll](https://jekyllrb.com/) that is used for some sites on [github pages](https://pages.github.com/).

For a while I wanted to restart my blogging efforts and the doc portal investigation opened my eyes. Initially I thought to use **Jekyll** but there are some limitation to windows users as me e.g. it is not officially supported on Windows. While reading discussions, I noticed [Hugo](https://gohugo.io/). I read the documentation for both of them and without any hands on comparisons, I decided that **Hugo** is the best for me. Besides I didn't want to port the old blog so I didn't have any content to execute a hands on comparison.

What I really like about this approach is using git as your data source. You practically turn your website into file source and even better, into markdown source. Initially it sounds silly to have a static pre-rendered site as a blog but if you take a better look in the content of today, then a lot of it is referenced and annotated with the author’s information. 

Some examples:

- Referencing git gists.
- Embedding media of any sort

Additionally, a lot can happen on the client side. That means that your static pre-rendered site is not perceived as static to the visitor. In a world populated with services, the integration can happen on the client itself e.g. using [disqus](https://disqus.com/) for feedback from your readers.

When building a web site, it has always been the most difficult to define a layout and the aesthetics. My best experience with this concept was using WPF in .NET during 2007-2009 but I had a great person then defining the look and feel. Besides by lack of CSS/HTML skills I also lack the ability to design something that I like. On the other hand I had some expectations from my web site. Since I will be also blogging for SDL related subjects, I need a good disclaimer to appear consistently on each post and in the list themselves.

Initially I experimented with a couple of [themes](http://themes.gohugo.io/) to understand what is going on. There are some good themes to get you started but none could deliver exactly what I wanted. Therefore I tried to create my own theme to also learn Hugo's theming syntax. At the end, it was taking too long and I was drowning with the CSS and HTML. Don't get me wrong, if you are good with Front-End then its really easy. At the end, I chose the [future-imperfect](http://themes.gohugo.io/future-imperfect/) theme as my base code with the intention to alter it based on the experience gained.

The changes I made are:

- I removed the necessity for the post parameter `type`.
- I added a parameter `notapost` to mark entries that I don't want to appear in the lists or rss.
- I added a parameter `extrainfo` that the theme adds in each post. This provides me the consistent method of adding any disclaimer.
- Changed some css and JavaScript to their respected cdn urls
- Made the share buttons smaller
- Added support for both [highlightjs](https://highlightjs.org/) and/or [prismjs](http://prismjs.com/) for client side code highlighting.
- Added enforcement for ssl. If the loading url is not https, then it gets redirected to ssl. Not currently used since some feature images are only available on http
- Change the implementation of facicon partial with on from http://www.favicon-generator.org/
- Added support for idea.informer.com to get use feedback and ideas

What I like about the [future-imperfect](http://themes.gohugo.io/future-imperfect/) theme is the layout along with support with the top menu. I also like feature where you get to add a picture at the top of the post, although that might become a problem if I ever want to change themes.

I still need to do/fix a couple of things:

- Move the share buttons to the bottom of the post. I also believe one of them has an issue.
- Add color configuration for tags and categories
- Control the size of the feature image.
- Better layout of categories and tags.
- Add the HSTS header

With regards to code organization, I use three repositories on **bitbucket.org**. For the time being they will be private.

- This site with master/develop branches
- The theme with master/develop branches
- An experimental site to develop on the theme itself, in case I feel confident to share it.

 








