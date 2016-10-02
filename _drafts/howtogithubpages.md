---

---

I wanted to get a nice free website, hosted on GitHub's speedy servers, that I can update without any special tools.

First step is to visit some examples of jekyll sites already hosted on Github.
Once you find one that you like fork it to your own account. This will create a new repo in your account with a copy of all the files that were in the example you forked.

Now you've got the files for the theme you'll have to tell Github that you want them to be served as your site.

I wanted a site that lives at my user address [strangecharacters.github.io](http://strangecharacters.github.io) and for that I just had to change the name of the repo to match that address.

image of repo name change

You may have to make an initial change to one of the files so that Github will generate the sites files from the templates. Let's edit the config.yml file since that contains a lot of settings for the site. 

I just changed the Site name and twitter handle and then committed the changes. From now on Github should regenerate your html files after every commit.

image of changed details on the site

We've got a working site, using a Jekyll theme, now lets get some content added.

There's more than one way to add content but for the most part we'll be adding posts - these are blog entries with a date, they'll be listed in chronological order on the front page.

You can write a blog post in ~~vim~~ ~~emacs~~ ~~textmate~~ ~~sublime~~ your favourite text editor and then upload it into the posts
folder.

You can also create a file through the web interface.

The files should be named like: YEAR-MONTH-DATE-slug-of-the-post.md 
They'll get listed in order of the date and the address will be /slug-of-the-post

If you want an about page or some other page where the date isn't relevant you can put it in the pages directory, again via upload or by creating a file through the web interface.

Images get added by clicking upload. Once they're on the server you can just right click and get the url which you can copy into your markdown files.















========================================================================
GitHub uses Jekyll, a ruby app which takes some template files, mixes them with some content files that you write and produces a static html site that gets served out to readers.

You can write and customise your own templates but the easiest way to get started is by forking someone else's efforts. Forking copies the files from someone else's repo and drops them into yours.

Once I'd forked a copy I had all the files I needed for a site, I just had to tell GitHub about them.

GitHub can serve a site for your username with an address of <USERNAME>.github.io but it can also do per-project sites.

I just wanted a strangecharacters.github.io site so all I had to do was to rename the forked repo as 'strangecharacters.github.io'
When the repo name and user address match GitHub serves the content from the repo at that address.

If you want, you can have just html files, images etc in the repo and they will get served as your site but I wanted to take advantage of Jekyll and get a more blog-like experience.

With almost any of the Jekyll examples you'll get a frontpage which lists blog posts in order, static pages and easy ways to add comments. And you can write your content in Markdown.

To make my first post I created a new file with the filename pattern of YEAR-MONTH-DATE-Title-of-blog-post.md in the _posts directory of my repo.

Once I had written and committed it I went to strangecharacters.github.io address and saw that there was a new blog entry listed on the front page.

.md files in the _posts directory get turned into chronological blog posts.

 .md files in the root of the repo or the specific _pages directory get served as pages /about /projects.

 GitHub allows you to upload images and other files from your computer via the web interface at GitHub.com so you don't need to have anything extra installed locally. 

 Getting to know git and how to sync between you pc and your account is a useful skill to practise anyway so I'll be writing content in my fave text editor as well.
