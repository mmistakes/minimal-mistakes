One of the things I've always had an itch to do was to start my own blog. There are countless of blogging platforms out there but as an IT enthuisist, there are a number of things which are important.

**1 Plain-Text**
As someone who codes, working with plain text is a must.  For the average person bloggin it's acceptable to have a built-in WYSIWYG editor to ease the process, but in my scenario I rather not deal with auto-formating, and continually explaining to the editor that this needs to be syntax highlighted etc.  Sure, there are many plugins you can get for blogging platform but in my opinion, plain-text should be a first class citizen.

**2 Hassel Free**
One thing I didn't like about previous blogs I've had is the hassel with running a bloggin platform.  With wordpress and others, there's a DB to maintain, you may have to backup your blog, restore it etc.  I would rather focus on my true interests than worrying about the blogging platform.  

**3 Version Control and Blogging as Code**
The world is definately moving to a <insert something here> as code mindset; why not your blog as well? I want to be able to branch out from the current published blog, tinker, make edits, move things around etc. without worrying about impacting the current state.  

There are many others but those are the top three features I required for a blog.  

## Jekyll vs Sphinx

During my search for a platform I came across two possible solutions. Both are static site generators which take a set of static, plain-text, markdown files and generate your site and blog from it.  Sphinx is written in python while Jekyll is based on Ruby.  I really, really like Python and I wanted to like Sphinx - but I couldn't.  I tried a few possible solutions such as Tinkerer, ABlog, etc. and although nice, didn't pack the features and the quality I was looking for.  I found installing themese for your blog was a hassel, sometimes it would be missing this, or this wouldn't be set etc. and the results was code that didn't generate into blogs. Then came the act of where to host it.  I threw together some docker containers as a deployment model in AWS etc. but this was a bit more than I wanted to do - see point #2

## GitHub Pages to the Rescue

When looking at Jekyll, I stumbled upon a designer named [Michael Rose](https://mademistakes.com/#0) who published some amazing themes, one of which I'm using for my blog.  This was the quality I was looking for.  In addition to being top notch in looks, usability and documentation, it was also made to be compatible with github pages.  I remember hearing about github pages every now and then when browsing though projects or developer's pages but forgot it was there. Upon going to the quick start guide, it was light finding the holy grail.  I simplied Forked, renamed the repo, and was up and running.  I challenge you to find a simpler solution to a bloggin platoform.  Best of all I didn't have to deal with Ruby gems, or really caring about Jekyll at the end.  At the end of the day it's the right tool for the job and this was it.

