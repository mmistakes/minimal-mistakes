---

---

I wanted to get a nice free website, hosted on GitHub's speedy servers, that I can update without any special tools.

GitHub uses Jekyll, a ruby app which takes some template files, mixes them with some content files that you write and produces a static html site that gets served out to readers.

You can write and customise your own templates but the easiest way to get started is by forking someone else's efforts. Forking copies the files from someone else's repo 
and drops them into yours.

Once I'd forked a copy I had all the files I needed for a site, I just had to tell GitHub about them.

GitHub can serve a site for your username with an address of <USERNAME>.github.io but it can also do per-project sites.

I just wanted a strangecharacters.github.io site so all I had to do was to rename the forked repo as 'strangecharacters.github.io'
When the repo name and user address match GitHub serves the content from the repo at that address.

If you want, you can have just html files, images etc in the repo and they will get served as your site but I wanted to take advantage of Jekyll and get a more blog-like experience.

With almost any of the Jekyll examples you'll get a frontpage which lists blog posts in order, static pages and easy ways to add comments. And you can write your content in Markdown.

To make my first post I created a new file with the filename pattern of YEAR-MONTH-DATE-Title-of-blog-post.md in the _posts directory of my repo.

Once I had written and committed it I went to stranon thegecharacters.gothub.io address and saw that there was a new blog entry listed on the front page.

.md files in the _posts directory get turned into chronological blog posts.

 .md files in the root of the repo or the specific _pages directory get served as pages /about /projects.

 GitHub allows you to upload images and other files from your computer via the web interface at GitHub.com so you don't need to have anything extra installed locally.

 Getting to know git and how to sync between you pc and your account is a useful skill to practise anyway so I'll be writing content in my fave text editor as well.