PPinera website
---------------
**Template used:** Minimal mistakes, is a two column responsive Jekyll theme perfect for powering your GitHub hosted blog. 
http://mmistakes.github.io/minimal-mistakes/theme-setup/

### Test locally
If you want to test the blog locally you can do it easily with:

```bash
jekyll serve
```

### Plugins
- [**Emoji**](https://github.com/yihangho/emoji-for-jekyll): It alows to use emojis in the website
- [**FontAwesome**](https://gist.github.com/23maverick23/8532525): To use Font Awesome in posts `{% icon fa-camera-retro %}`
- [**Jekyll asset path**](https://github.com/samrayner/jekyll-asset-path-plugin): A liquid tag to output a relative URL for assets based on the jekyll post or page `{% asset_path [filename] %}`

### About Minimal Mistakes
* Responsive templates. Looking good on mobile, tablet, and desktop.
* Gracefully degrading in older browsers. Compatible with Internet Explorer 8+ and all modern browsers. 
* Minimal embellishments -- content first.
* Optional large feature images for posts and pages.
* Simple and clear permalink structure.
* [Custom 404 page](http://mmistakes.github.io/minimal-mistakes/404.html) to get you started.
* Support for Disqus Comments

See a [live version of Minimal Mistakes](http://mmistakes.github.io/minimal-mistakes/) hosted on GitHub.

### Scaffolding


```bash
minimal-mistakes/
├── _includes/
|    ├── _author-bio.html        # bio stuff layout. pulls optional owner data from _config.yml
|    ├── _browser-upgrade.html   # prompt to install a modern browser for < IE9
|    ├── _disqus_comments.html   # Disqus comments script
|    ├── _footer.html            # site footer
|    ├── _head.html              # site head
|    ├── _navigation.html        # site top navigation
|    ├── _open-graph.html        # Twitter Cards and Open Graph meta data
|    └── _scripts.html           # site scripts
├── _layouts/
|    ├── home.html               # homepage layout
|    ├── page.html               # page layout
|    ├── post-index.html         # post index layout
|    └── post.html               # single post layout
├── _posts/                      # MarkDown formatted posts
├── _sass/                       # Sass stylesheets
├── _templates/                  # used by Octopress to define YAML variables for new posts/pages
├── about/                       # sample about page
├── assets/
|    ├── css/                    # compiled stylesheets
|    ├── fonts/                  # webfonts
|    ├── js/
|    |   ├── _main.js            # main JavaScript file, plugin settings, etc
|    |   ├── plugins/            # scripts and jQuery plugins to combine with _main.js
|    |   ├── scripts.min.js      # concatenated and minified _main.js + plugin scripts
|    |   └── vendor/             # vendor scripts to leave alone and load as is
|    └── less/
├── images/                      # images for posts and pages
├── 404.md                       # 404 page
├── feed.xml                     # Atom feed template
├── index.md                     # sample homepage. lists 5 latest posts 
├── posts/                       # sample post index page. lists all posts in reverse chronology
└── theme-setup/                 # theme setup page. safe to remove
```

### Adding new content with Octopress
While completely optional, I’ve included Octopress and some starter templates to automate the creation of new posts and pages. To take advantage of it start by installing the Octopress gem if it isn’t already.

```bash
gem install octopress --pre
```

#### New post

Default command
```bash
octopress new post "Post Title"
```
Default works great if you want all your posts in one directory, but if you’re like me and want to group them into subfolders like /posts, /portfolio, etc. Then this is the command for you. By specifying the DIR it will create a new post in that folder and populate the categories: YAML with the same value.

#### New page

To create a new page use the following command.
```
octopress new page new-page/
```
This will create a page at /new-page/index.md

#### Layouts and Content

Explanations of the various _layouts included with the theme and when to use them.

##### Post and Page

These two layouts are very similar. Both have an author sidebar, allow for large feature images at the top, and optional Disqus comments. The only real difference is the post layout includes related posts at the end of the page.

##### Post Index Page

A sample index page listing all posts grouped by the year they were published has been provided. The name can be customized to your liking by editing a few references. For example, to change Posts to Writing update the following:

In _config.yml under links: rename the title and URL to the following:
```bash
links:
  - title: Writing
    url: /writing/
```
- Rename `posts/index.md` to `writing/index.md` and update the YAML front matter accordingly.
- Update the View all posts link in the `post.html` layout found in `_layouts` to match title and URL set previously.

##### Feature Images

A good rule of thumb is to keep feature images nice and wide so you don’t push the body text too far down. An image cropped around around 1024 x 256 pixels will keep file size down with an acceptable resolution for most devices. If you want to serve these images responsively I’d suggest looking at the Jekyll Picture Tag plugin1.

The post and page layouts make the assumption that the feature images live in the images/ folder. To add a feature image to a post or page just include the filename in the front matter like so. It’s probably best to host all your images from this folder, but you can hotlink from external sources if you desire.

```
image:
  feature: feature-image-filename.jpg
  thumb: thumbnail-image.jpg #keep it square 200x200 px is good
```
To add attribution to a feature image use the following YAML front matter on posts or pages. Image credits appear directly below the feature image with a link back to the original source if supplied.

```
image:
  feature: feature-image-filename.jpg
  credit: Michael Rose #name of the person or site you want to credit
  creditlink: http://mademistakes.com #url to their site or licensing
```

#### Thumbnails for OG and Twitter Cards

Feature and thumbnail images are used by Open Graph and Twitter Cards as well. If you don’t assign a thumbnail the default graphic (default-thumb.png) is used. I’d suggest changing this to something more meaningful — your logo or avatar are good options.

> Pro-Tip: You need to apply for Twitter Cards before they will begin showing up when links to your site are shared.

#### Author Override

By making use of data files you can assign different authors for each post.

Start by modifying authors.yml file in the _data folder and add your authors using the following format.

```bash
# Authors
billy_rick:
  name: Billy Rick
  web: http://thewhip.com
  email: billy@rick.com
  bio: "What do you want, jewels? I am a very extravagant man."
  avatar: bio-photo-2.jpg
  twitter: extravagantman
  google:
    plus: +BillyRick

cornelius_fiddlebone:
  name: Cornelius Fiddlebone
  email: cornelius@thewhip.com
  bio: "I ordered what?"
  avatar: bio-photo.jpg
  twitter: rhymeswithsackit
  google:
    plus: +CorneliusFiddlebone
```

To assign Billy Rick as an author for our post. We’d add the following YAML front matter to a post:

```bash
author: billy_rick
```

#### Table of Contents

Any post or page that you want a table of contents to render insert the following HTML in your post before the actual content. Kramdown will take care of the rest and convert all headlines into a contents list.

> PS: The TOC is hidden on small devices because I haven’t gotten around to optimizing it. For now it only appears on larger screens (tablet and desktop).

```html
<section id="table-of-contents" class="toc">
  <header>
    <h3>Overview</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section><!-- /#table-of-contents -->
```

#### Videos

Video embeds are responsive and scale with the width of the main content block with the help of FitVids.
Not sure if this only effects Kramdown or if it’s an issue with Markdown in general. But adding YouTube video embeds causes errors when building your Jekyll site. To fix add a space between the <iframe> tags and remove allowfullscreen. Example below:

```html
<iframe width="560" height="315" src="http://www.youtube.com/embed/PWf4WUoMXwg" frameborder="0"> </iframe>
```
