---
layout: page
permalink: /theme-setup/index.html
title: Theme Setup
description: "Instructions on how to install and customize the Jekyll theme Minimal Mistakes."
tags: [Jekyll, theme, responsive]
image:
  feature: texture-feature-02.jpg
---

<section id="table-of-contents" class="toc">
  <header>
    <h3 class="delta">Contents</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->

General notes and suggestions for customizing Minimal Mistakes.

## Basic Setup

1. [Install Jekyll](http://jekyllrb.com) if you haven't already.
2. Fork the [Minimal Mistakes repo](http://github.com/mmistakes/minimal-mistakes/)
3. Make it your own and customize, customize, customize.

<a markdown="0" href="http://github.com/mmistakes/minimal-mistakes" class="btn">Minimal Mistakes on GitHub</a>

{% highlight text %}
minimal-mistakes/
├── _includes
|    ├── author-bio.html  //bio stuff goes here
|    ├── chrome-frame.html  //displays on IE8 and less
|    ├── footer.html  //site footer
|    ├── head.html  //site head
|    ├── navigation.html //site top nav
|    └── scripts.html  //jQuery, plugins, GA, etc.
├── _layouts
|    ├── home.html  //homepage layout
|    ├── page.html  //page layout
|    ├── post-index.html  //post listing layout
|    └── post.html  //post layout
├── _posts
├── assets
|    ├── css  //preprocessed less styles. good idea to minify
|    ├── img  //images and graphics used in css and js
|    ├── js
|    |   ├── main.js  //jQuery plugins and settings
|    |   └── vendor  //all 3rd party scripts
|    └── less 
├── images  //images for posts and pages
├── about.md  //about page
├── articles.md  //lists all posts from latest to oldest
└── index.md  //homepage. lists 5 most recent posts
{% endhighlight %}

## Customization

### _config.yml

Variables you want to update are: site name, description, url[^1], owner info, and your Google Anayltics tracking id and webmaster tool verifications. Most of these variables are used in the .html files found in *_includes* if you need to add or remove anything.

### Adding Posts and Pages

There are two main content layouts: *post.html* (for posts) and *page.html* (for pages). Both have large **feature images** that span the full-width of the screen, and both are meant for text heavy blog posts (or articles). 

#### Feature Images

A good rule of thumb is to keep feature images[^2] nice and wide so you don't push the body text too far down. An image cropped around around 1024 x 512 pixels will keep file size down with an acceptable resolution for most devices. On my personal site I use [Picturefill](https://github.com/scottjehl/picturefill) to serve the same image responsively in four different flavors (small, medium, large, and extra large). In the interest of keeping things simple with this theme I left that script out, but you can certainly [add it back in](https://github.com/mmistakes/made-mistakes#articles-and-pages) or give [Adaptive Images](http://adaptive-images.com/) a try.

The two layouts make the assumption that the feature images live in the *images* folder. To add a feature image to a post or page just include the filename in the front matter like so. 

{% highlight yaml %}
image:
  feature: feature-image-filename.jpg
  thumb: thumbnail-image.jpg #keep it square 200x200 px is good
{% endhighlight %}

#### Thumbnails for OG and Twitter Cards

Post and page thumbnails work the same way. These are used by [Open Graph](https://developers.facebook.com/docs/opengraph/) and [Twitter Cards](https://dev.twitter.com/docs/cards) meta tags found in *head.html*. If you don't assign a thumbnail the default graphic *(default-thumb.png)* is used. I'd suggest changing this to something more meaningful --- your logo or avatar are good options.

#### Table of Contents

Any article or page that you want a *table of contents* to render insert the following HTML in your post before the actual content. [Kramdown will take care of the rest](http://kramdown.rubyforge.org/converter/html.html#toc) and convert all headlines into a contents list.

**PS:** The TOC is hidden on small devices because I haven't gotten around to optimizing it. For now it only shows on tablets and desktop viewports...
{: .notice}

{% highlight html %}
<section id="table-of-contents" class="toc">
  <header>
    <h3 class="delta">Contents</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->
{% endhighlight %}

#### Videos

Video embeds are responsive and scale with the width of the main content block with the help of [FitVids](http://fitvidsjs.com/).

Not sure if this only effects Kramdown or if it's an issue with Markdown in general. But adding YouTube video embeds causes errors when building your Jekyll site. To fix add a space between the `<iframe>` tags and remove `allowfullscreen`. Example below:

{% highlight html %}
<iframe width="560" height="315" src="http://www.youtube.com/embed/PWf4WUoMXwg" frameborder="0"> </iframe>
{% endhighlight %}

[^1]: Used to generate absolute urls in *sitemap.xml*, *feed.xml*, and for canonical urls in *head.html*. Don't include a trailing `\` in your base url ie: http://mademistakes.com. When developing locally remove or comment out this line so local css, js, and images are used.

[^2]: Feature images supplied by [Love Textures](http://www.lovetextures.com/)