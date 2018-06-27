---
title:  "Moving from Wordpress to GitHub Pages"
categories: blogging
description: Tuples in C# 7
tag: 
  - jekyll
  - github-pages
  - static-site
---

Intro
-----

I have been hosting my blog using wordpress for the past 1 year. Wordpress, although is easy to use, is quite heavy and was too much work for me.

I wanted to write my posts as `markdown` files (which wordpress supports through plugins like [WP Editor.md](https://wordpress.org/plugins/wp-editormd/)).  
But then I wanted to be able to maintain a copy of my markdown files on github. I started a repository on github and pushed markdown files to the repo. Then, I would use the plugin [Mytory Markdown](https://wordpress.org/plugins/mytory-markdown/), which would accept a url to a markdown file and convert that to html and publish. This was a good solution to me, except it was too much work for me.  
I wanted to be able to make changes to a post, or write a new post and just push it to GitHub, which will _magically_ update the blog ... _Somehow_.

That's when I heard about Static Site Generators on the podcase [msdevshow](https://msdevshow.com/). Jason Young of the show has done exactly the same for his blog, which he has written about it [here](http://ytechie.com/2017/11/moving-my-static-blog-to-docker/).

I did my own research and decided to use [Jekyll](https://jekyllrb.com/) which powers [GitHub Pages](https://pages.github.com/). To be able to use Jekyll, I would have to actually host the site on a server or even better on a Storage Service like the [Amazon S3](https://aws.amazon.com/s3/) or [Azure Storage Service](https://azure.microsoft.com/en-us/services/storage/). The idea was to run a function every time a commit was made on the `master branch` of the GitHub repo, which would then generate the Static Blog and publish it. Jekyll does a good work at documenting it. You can find it [here](https://jekyllrb.com/docs/home/).

GitHub Pages
-------------------------

It was during my research that I realized that I could just use GitHub Pages and not worry about hosting at all. I just need to push my post to my GitHub repo and the static site generation and hosting part of it will be taken care by GitHub alone.  
This came as a big relief, now that I don't have to worry about anything but my blog post.


### Enabling GitHub Pages

How to make your GitHub repository a GitHub Pages repository.  
You can do this by : 
> 1. Go to your repository
> 2. Go to `Settings page`  
> 3. Go to `GitHub Pages` section  
> 4. Select `master branch` or `master branch /docs folder` in the `Source` section based on your requirement.  
> Now, every commit to your master branch will trigger a jekyll build and update your blog automatically.

Once you have your post first post ready, you could do the following.  

1. Check if [jekyll build](https://jekyllrb.com/docs/usage/) works fine.  
If it works, your blog is ready to be published. This is not a necessary step.
2. Push the changes to GitHub and commit/merge to master.  
This will trigger a build and your blog post will be udpated accordingly.

### The url

The default url for `GitHub Pages` would be `http://<username>.github.io`.  
You would have to create a repository with the name `<username>.github.io` for this.  
If you need to create a repository with a different name, then the url would be `http://<username>.github.io/<repository-name>`.

You could also provide custom domain urls. You could do this by providing the custom domain url at the `Custom Domain` section in `GitHub Pages` section in `Settings` page of your repository. 

### Starting with the theme

I started by selecting the theme [Minimal-Mistakes](https://mmistakes.github.io/minimal-mistakes/), which I felt is simple enough for my blog. You can find more themes [here](https://pages.github.com/themes/), or just do a search online.  
I forked the Minimal-Mistakes [repo](https://github.com/mmistakes/minimal-mistakes), into a repository named blog [here](https://github.com/alenjalex/blog).  
Now, make sure that you copy the folders `_layouts`, `_pages` if not already present. I copied them from the `docs` folder of the theme. I faced some issues with some pages inside the `_pages` folders as some variables were not in scope. Since, those pages where of no use to me, I deleted those.

If you are to use Minimal-Mistakes theme, it has a good documentation of how to do the configurations [here](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/).

### The posts

The posts have to be written in the `_posts` folder. GitHub pages support markdown and HTML files. The posts file name should be of the format `YEAR-MONTH-DAY-title.<filetype>`.  
It supports file types `*.md`, `*.markdown` and `*.html`.  
You can learn more about it [here](https://jekyllrb.com/docs/posts/).  

If you don't know [Markdown](https://en.wikipedia.org/wiki/Markdown), you should totally give it a try. It is a very easy to use method for things like blogging, documentation, etc. There are plently of online tutorials for markdown available online, like [this](https://www.markdowntutorial.com/) for instance.

### GitHub Pages messages

The `GitHub pages` section in the `Settings` page of your repository shows 3 kinds of messages.

1. `Your site is published at https://<username>.github.io/blog/`  
This means your blog is up to date and hosted.
2. `Your site is ready to be published at https://<username>.github.io/blog/`  
This means that build has passed for the last commit that you performed, and it is in the process of hosting.
3. `Failure message`  
This means there is some error in your blog (it could be in any file in the repository). You will have to fix it. In the mean time, the previous succesfull build of your site will still be hosted.

### Caching

GitHub pages caches a lot of data on the browser by default. If you modify some content (images/text), and if you don't see a difference, it might be due to the cache. Try clearing the cache or opening the browser in private mode to know for sure.


Of course, there is a lot more configurations required to bring up a complete blog, which you will figure out during the process of building the blog. I still have to map my custom domain, do the SEO stuff as of the time of writing this post.

Happy Blogging...
----------