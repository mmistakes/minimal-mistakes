---
title: Why is Jekyll and github pages my engine choice for this blog
excerpt: Recently this blog moved from Hugo to Jekyll. This post explains my reasons and provides some additional insight.
tags: Jekyll
categories: Tips
header:
  overlay_image: http://www.userx.co.za/assets/images/journal/jekyll-logo-820x418.png
---

In my previous post [Novice guide for Jekyll on Windows and github pages]({% link _posts/2017-02-08-Novice-guide-to-run-Jekyll-on-Windows-and-github-pages.md %}) I promised to provide an explanation of why I moved my blog from [Hugo](https://hugo.io/) to [Jekyll](https://jekyllrb.com/).

Although the main theme here is Jekyll, I didn't chose Jekyll explicitly but implicitly because of the features that [Github](https://github.com) is constantly adding. 

- In browser creation and edit of a file. Understandably this is not perfect yet and can't match the file experience, but when you need to write a small post or make a correction to an existing document it is the fastest method. Github had already support for comments as part of pull requests and commits, so having the ability to modify the code directly is awesome.
- Github pages. This is available for some time already. Put a static web site in `gh-pages` branch and you get your website hosted.
- Github can build any Jekyll project on the root or `/docs` folder of the `master` branch and generate the static website in the `gh-pages`.

If you combine all the above then you get an online editor, builder and host for a site. 
If you already appreciate the concept of version control over any type of content, then you already recognize the value. 
If not then let me build up the explanation. 

My blog is a one person effort but I would still like to keep some history of what I'm doing. 
More professional sites have multiple contributors and require a more proper control of the data with a the workflow. 
Contrary to most people's beliefs version control is not only for developers and code, but it's implicitly available from most CMS tools. 
Even the backup services such as Onedrive, DropBox etc are doing some sort of version control over your files. 
When the compiler is not necessary then content editing has the potential to be very close to the delivered or published outcome. 
Some people refer to this as the wiki experience.

Github pages a part of a github repository provides all necessary components and services for the following without the need to work with the file system.

- Create and edit content.
- Enforce change management of the content.
- Build/Publish the content.
- Host the deliverable.

When markdown is just enough to create the content then it's a great combination. 

There is one limitation though. 
Github pages builds only Jekyll projects. **This was my main driver to port the blog to Jekyll**. 
I wanted the easy post creating and editing experience without having to think about how to get the content on my site. 

It's not a perfect world though as I've already explained in my [Novice guide for Jekyll on Windows and github pages]({% link _posts/2017-02-08-Novice-guide-to-run-Jekyll-on-Windows-and-github-pages.md %}) post. Jekyll has it's problems mostly on Windows but the rest of the platforms suffer also some hiccups. 
Here is also an interesting article to read: [5 common Jekyll traps for beginners (and help to overcome them!)](http://cloudcannon.com/jekyll/2015/03/13/5-common-jekyll-traps.html).

Nevertheless, Jekyll has committed to fix many issues on version three so there is only good to come out of the combinations of micro-services. 
Only when understanding the true merit of *micro* services architectures you can understand how **quickly** this *not perfect world* transforms into a decent one.
As a small example, if Github adds the ability to edit files in context of a Jekyll project, then creating posts will be even faster and easier. 
Then again, maybe someone else will do this already as part of their own micro service. 

Speaking of other services, there are lots of tools that integrate with github and offer a folder/file browse and edit functionality.
Here is what I've found after a 5 minute search in Google and a 5 minute experimentation.

- [Prose](https://prose.io)
- [Cloud cannon](https://cloudcannon.com/)
- [Hub press](https://hubpress.io/)
- [PenFlip](https://www.penflip.com)

There is also this very interesting read [After Editorially: The Search For Alternative Collaborative Online Writing Tools](https://www.smashingmagazine.com/2014/04/after-editorially-alternative-collaborative-online-writing-tools/). 
I've also found an android app [MrHyde](https://play.google.com/store/apps/details?id=org.faudroids.mrhyde&rdid=org.faudroids.mrhyde) that promises to offer authoring from our mobile phones.

I'll finish this post with optimism to a future, than can only get better!
