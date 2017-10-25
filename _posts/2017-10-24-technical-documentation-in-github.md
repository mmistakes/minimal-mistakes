---
title:  "Technical documentation in GitHub :octocat:"
excerpt: "Writing technical documentation in GitHub using Markdown and embedding other document types such as Word, Excel, PowerPoint and Visio"
published: true
header:
  image: https://ojacques.github.io/images/blog-embed-office-in-github.jpg
categories:
- blog
tags:
- github
---

Most of my technical documentation (architecture, roadmap, technical design, admin and 
user guides) is now in markdown format and hosted on GitHub Enterprise.
It makes documentation discoverable thanks to full text search, anyone can contribute to it 
using the [fork/pull workflow](https://guides.github.com/introduction/flow/). 

I can also enable continuous integration for this documentation to automatically check for 
dead links or spelling mistakes and add a badge  [![Build status](https://travis-ci.org/ojacques/ojacques.github.io.svg?branch=master)](https://travis-ci.org/ojacques/ojacques.github.io) for the health of my documentation (this is an actual badge for this web site).

# Markdown

Markdown is the format in which I write documentation. Provided that the file name ends 
with `.md` (like for `README.md`, `ARCHITECTURE.md`, `ROADMAP.md`), GitHub will render the file nicely.

With the markdown format, I can write text with different title levels, bullet points,
bold/italic style, hyperlinks, code snippets or images (jpg/png or animated GIFs). 

For example, this markdown:

```markdown
# This is a title
## Level 2 title
- bullet
- bullet with **bold** and *italic* styles

## Another L2 title
And even emojis :smile: !
```

Renders like so:

![markdown sample](/images/markdown.sample.jpg)

There is a full reference guide available 
:notebook: [here](https://guides.github.com/features/mastering-markdown/).

# GitHub Pages

When I want to create a full web site with nice formatting like a portal or a documentation site,
I use [GitHub pages](https://pages.github.com/), which is also available on GitHub Enterprise.  
The blog you are reading now is created with GitHub pages 
([source](https://github.com/ojacques/ojacques.github.io)). 

With GitHub pages / Jekyll, you still write content using markdown format. As an added bonus,
you have access to extra capabilities such as Javascript and CSS for styling. 
When checking-in code in GitHub for your GitHub pages site, GitHub will - in the background -
generate static HTML pages out of the markdow, which are visible at a special URL (see 
[documentation](https://help.github.com/articles/user-organization-and-project-pages/)).


# Embedding Microsoft Office Documents in GitHub pages

Sometimes, I need to embed Microsoft Office 365 documents hosted on Sharepoint online or Onedrive. 
Sure, this gets rare as most of the material is directly authored in markdown. But at the very 
least, all of the documentation is visible through GitHub.

The good news is that - when hosted on Office365 or Onedrive - Word, Excel, Powerpoint and Visio 
files can all be viewed in a web browser and shared using File/Share/Embed:

![File Share embed](/images/office-embed.gif)

This creates code to add in your html file, as an iframe. 

iframes are not supported in pure Markdown - but can be used in GitHub pages.

Here is how ⬇️

## Embedding Excel

File/Share/Embed gives the following code:
```
<iframe width="500" height="450" 
 frameborder="0" scrolling="no" 
 src="https://onedrive.live.com/embed?resid=39DBDCC13374E035%218300&
 authkey=%21AL7DIpEbIqPfbZs&em=2&
 wdAllowInteractivity=False&
 ActiveCell='Sheet1'!A1&
 wdHideGridlines=True&
 wdHideHeaders=True&
 wdDownloadButton=True&
 wdInConfigurator=True">
</iframe>
```

Note that some parameters can be tweaked.

It renders like this:

<iframe width="500" height="450" frameborder="0" scrolling="no" src="https://onedrive.live.com/embed?resid=39DBDCC13374E035%218300&authkey=%21AL7DIpEbIqPfbZs&em=2&wdAllowInteractivity=False&ActiveCell='Sheet1'!A1&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True"></iframe>

## Embedding Word

File/Share/Embed gives the following code:

```
<iframe src='https://onedrive.live.com/embed?cid=39DBDCC13374E035&
  resid=39DBDCC13374E035%218296&
  authkey=AHLhvi8Bgy61boA&em=2&
  wdStartOn=1' width='500px' height='450px' frameborder='0'>
  This is an embedded 
  <a target='_blank' href='https://office.com'>Microsoft Office</a> 
  document, powered by 
  <a target='_blank' href='https://office.com/webapps'>Office Online</a>.
</iframe>
```

Which renders like this:

<iframe src='https://onedrive.live.com/embed?cid=39DBDCC13374E035&resid=39DBDCC13374E035%218296&authkey=AHLhvi8Bgy61boA&em=2&wdStartOn=1' width='500px' height='450px' frameborder='0'>This is an embedded <a target='_blank' href='https://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='https://office.com/webapps'>Office Online</a>.</iframe>

## Embedding PowerPoint

File/Share/Embed gives the following code:

```
<iframe src='https://onedrive.live.com/embed?cid=39DBDCC13374E035&
  resid=39DBDCC13374E035%218298&
  authkey=ANJm_8_B48XNOhg&em=2&
  wdAr=1.7777777777777777' 
  width='610px' height='367px' frameborder='0'>
  This is an embedded 
  <a target='_blank' href='https://office.com'>Microsoft Office</a> 
  presentation, powered by 
  <a target='_blank' href='https://office.com/webapps'>Office Online</a>.
</iframe>
```

Which renders like this:

<iframe src='https://onedrive.live.com/embed?cid=39DBDCC13374E035&resid=39DBDCC13374E035%218298&authkey=ANJm_8_B48XNOhg&em=2&wdAr=1.7777777777777777' width='610px' height='367px' frameborder='0'>This is an embedded <a target='_blank' href='https://office.com'>Microsoft Office</a> presentation, powered by <a target='_blank' href='https://office.com/webapps'>Office Online</a>.</iframe>

# Conclusion

All technical documentation should really be written in markdown format and hosted in GitHub.
This enables advanced collaborative workflows, Continuous Integration capabilities and full text
search. All of this provides a very secure and rich experience for both the contributors and the 
consumers of this documentation.

In rare cases, I embed Office documents in GitHub pages. But I use this as an **exception**, 
when markdown or a web site is not appropriate.
