---
layout: post
title: "Finding the right blogging platform"
excerpt: "Blogger, WordPress, Jekyll?"
tags: [blogging, R, code, jekyll]
authored: 2015-03-28
modified: 2015-03-30
comments: true
categories: [Rstats]
---

I've had a blog on [blogger](http://ivyleavedtoadflax.blogspot.com) for a while now, where I have been wanting to document some of the things I have been doing in `R` recently. I write in RMarkDown a lot, and it would make sense if I could post directly to my blog from the .html files that are output from RStudio, but I've been struggling for a way to do it well. 

Blogger works in so far as you can copy all the code from the .html file, then paste it into a new blog post. This is actually pretty easy but horribly manual - you need to stop `knitr` from attaching images directly to the html file (actually this is a setting in the markdown package), then upload the images separately.
I also host my code on github, so it would be nice to just integrate everything together, withough having to mess around copying nad pasting into boxes. Why can't I just do this from the command line?

I also had a crack with WordPress. There is a package called [RWordPress](http://yihui.name/knitr/demo/wordpress/) which looked like it might solve these problems. I had some issues installing this, so these are the steps I took:

* install ll `xml2-config` (on my Ubuntu 14.04 system) using `apt-get install xml2-config`.
* Manually install XMLRPC from [here](http://bioconductor.org/packages/release/extra/html/XMLRPC.html) 
* Install RWordPress with:
```
install.packages(
'RWordPress',
repos = 'http://www.omegahat.org/R',
type = 'source'
)
```


There's a thread on SO [here](http://stackoverflow.com/questions/7765429/unable-to-install-r-package-in-ubuntu-11-04).

Anyway, as it turns out, having finally got it installed WordPress is still a bit of a faff, so I have opted instead for using Jekyll.

Jekyll is a really simple platform that can be hosted for free on github, and gives you the most control over your blog, the code for which is available on github. You add new blog posts to the site by pushing .md files to github, which then renders them and displays them like this.

If you want to convert from Rmd files there is a helper function by Jason Bryer and Andy South which I have [adapted ](https://github.com/ivyleavedtoadflax/ivyleavedtoadflax.github.io/blob/master/Rmd2md.R) which allows you to convert directly from Rmd to md. I used the really nice Minimal Mistakes [template](http://mmistakes.github.io/), which I first saw implement [here](http://byzantine.github.io/ByzanTineBlog//posts/).

Seems to work OK so far, my only word of advice is that MathJax equations do not seem to render inline, and in the Rmd file you must specify all equations within double dollars (`$$...$$`), rather than single dollars (`$...$`) for inline LaTeX. This is a little bit of a pain if you want inline equations, but not unsurmountable, and perhaps I will find a way around it in the future.
