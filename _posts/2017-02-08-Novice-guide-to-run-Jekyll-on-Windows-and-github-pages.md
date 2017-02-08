---
title: Novice guide for Jekyll on Windows and github pages
excerpt: As a novice to Jekyll follow this guide to quickly solve the certain issues you will face and get some insight on how it works.
tags: Jekyll
categories: Tips
header:
  overlay_image: http://www.userx.co.za/assets/images/journal/jekyll-logo-820x418.png
---

I recently moved my blog from [Hugo](https://gohugo.io/) to [Jekyll](https://jekyllrb.com/). 
Almost a year ago I went with Jekyll because back then Jekyll was not supported on the Windows operating system and Hugo worked with just one executable. 
A year later the situation has improved a bit but it is still a mess. 
This post is a guide on how to overcome each problem from installing Jekyll to be able to build the site locally.

This blog is powered by the [Minimal Mistakes](https://mademistakes.com/work/minimal-mistakes-jekyll-theme/) theme. 
The theme is **very well** documented but there are couple of things missing that a novice like me found difficult to overcome. 
My intention is also to let GitHub pages do the build for me and that introduces a couple of extra restrictions.

## Install Jekyll gem

On the [Jekyll On Windows](https://jekyllrb.com/docs/windows/) documentation it starts with installing Ruby with a Chocolatey package `choco install ruby -y`. 
Then install the Jekyll's gem `gem install jekyll`. 
As stated in the documentation you will probably run into this error

```
C:\>gem install jekyll 
ERROR:  Could not find a valid gem 'jekyll' (>= 0), here is why: 
          Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (https://api.rubygems.org/specs.4.8.gz) 
 ```
 
 The solution is described [here](http://guides.rubygems.org/ssl-certificate-update/#installing-using-update-packages). To summarize it download the [rubygems-update-2.6.7.gem](https://rubygems.org/downloads/rubygems-update-2.6.7.gem) and then execute.

```text
gem install --local C:\users\<username>\Downloads\rubygems-update-2.6.7.gem
update_rubygems --no-ri --no-rdoc
gem uninstall rubygems-update -x
```

Now we can run try to install again Jekyll `gem install jekyll` and it should work.

```text
C:\>gem install jekyll
Fetching: jekyll-3.4.0.gem (100%)
Successfully installed jekyll-3.4.0
Parsing documentation for jekyll-3.4.0
Installing ri documentation for jekyll-3.4.0
Done installing documentation for jekyll after 2 seconds
1 gem installed
```

## Update gems for the Minimal Mistakes theme

I forked the [Minimal Mistakes](https://mademistakes.com/work/minimal-mistakes-jekyll-theme/) and followed the [Quick-Start Guide](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/). 
At some point we are instructed to run `bundle update`. 
What is bundle? From [Bundler](http://bundler.io/)'s website 

> Bundler provides a consistent environment for Ruby projects by tracking and installing the exact gems and versions that are needed.

To install bundler install the bundler gem `gem install bundler` which works easy!

Then we need to execute `bundle update` from the root of our repository. 
You  will probably run into this error:

```text
Gem::InstallError: The 'json' native gem requires installed build tools.

Please update your PATH to include build tools or download the DevKit
from 'http://rubyinstaller.org/downloads' and follow the instructions
at 'http://github.com/oneclick/rubyinstaller/wiki/Development-Kit'

An error occurred while installing json (1.8.6), and Bundler cannot continue.
Make sure that `gem install json -v '1.8.6'` succeeds before bundling.
```

The message is pretty good now that I have some Ruby knowledge but when I first landed on this problem I got confused. 
You can follow the instructions but since we are windows we can install the development kit with Chokolatey `choco install ruby2.devkit -y`. 
At this point the instructions stopped working for me so after some digging around I understood that it's all about what is configured in your `PATH`. 
Looking into the `C:\tools\DevKit2\devkitvars.ps1` it clear that the following two need to be added in the `PATH`:
- `C:\tools\DevKit2\bin`
- `C:\tools\DevKit2\mingw\bin`

I know that executing the script should be enough but for some reason this didn't seem to work although I made sure I restarted the processes. I was tired at that point so I might be mistaken. Anyhow, either execute the scripts and if it doesn't work add them manually to your system by using the **Edit the System Environment variables** from the start menu.

Re open your console and execute `gem install json --platform=ruby` to verify.

This time `bundle update` works and all gems are added and compiled.

## Run Jekyll and build the site

To build and test the site run simply `jekyll serve`. 
If you run into an error such as the following, then there is a mismatch with the version of the gems. 

```text
WARN: Unresolved specs during Gem::Specification.reset:
      listen (< 3.1, ~> 3.0)
WARN: Clearing out unresolved specs.
Please report a bug if this causes problems.
C:/tools/ruby23/lib/ruby/gems/2.3.0/gems/bundler-1.14.3/lib/bundler/runtime.rb:40:in `block in setup': You have already activated json 2.0.3, but your Gemfile requires json 1.8.6. Prepending `bundle exec` to your command may solve this. (Gem::LoadError)
        from C:/tools/ruby23/lib/ruby/gems/2.3.0/gems/bundler-1.14.3/lib/bundler/runtime.rb:25:in `map'
        from C:/tools/ruby23/lib/ruby/gems/2.3.0/gems/bundler-1.14.3/lib/bundler/runtime.rb:25:in `setup'
        from C:/tools/ruby23/lib/ruby/gems/2.3.0/gems/bundler-1.14.3/lib/bundler.rb:100:in `setup'
        from C:/tools/ruby23/lib/ruby/gems/2.3.0/gems/jekyll-3.4.0/lib/jekyll/plugin_manager.rb:36:in `require_from_bundler'
        from C:/tools/ruby23/lib/ruby/gems/2.3.0/gems/jekyll-3.4.0/exe/jekyll:9:in `<top (required)>'
        from C:/tools/ruby23/bin/jekyll:22:in `load'
        from C:/tools/ruby23/bin/jekyll:22:in `<main>'
```

Apparently there is something known as *gem hell* and this is why **Bundler** was created. 
Execute `bundle exec jekyll serve` to solve this.

Then run into this error:

```text
  Liquid Exception: SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed in /_layouts/default.html
```

This is because my theme uses the [jekyll-gist](https://rubygems.org/gems/jekyll-gist/versions/) plugin. 
To solve the issue download first this certificate [cacert.pem](https://curl.haxx.se/ca/cacert.pem) or [GlobalSignRootCA.pem](https://raw.githubusercontent.com/rubygems/rubygems/master/lib/rubygems/ssl_certs/index.rubygems.org/GlobalSignRootCA.pem). 
Then in the console execute `SET SSL_CERT_FILE="C:\users\<username>\Downloads\cacert.pem"`. 
This needs to be executed on every console that will eventually run `jekyll`. 
I usually leave my console open but you can inject this permanently into your console session to make it permanent environment variable as with the ruby sdk above.

Finally execute `bundle exec jekyll serve`and your website can be tested at `http:127.0.0.1:4000`.

## Tips and tricks with Jekyll

### Jekyll-Archives and github pages

If your intention is for github pages to automatically build your site then there are a couple of things that you should be aware.

Typically the [jekyll-archives](https://github.com/jekyll/jekyll-archives) gem will generate the pages for tags, categories etc. 
What you need to understand is that it is not compatible with building in GitHub pages and therefore it will not work. 
I was not aware of such a limitation and after losing a lot of time trying to figure out the problem I though the theme's documentation was not good so I created this [Archive pages for your Jekyll tags and categories](https://github.com/mmistakes/minimal-mistakes/issues/811) issue. 
[Michael Rose](https://github.com/mmistakes) was kind enough to explain the incompatibility and kind enough to suggest a solution. 

The [dependency versions](https://pages.github.com/versions/) provides a full list of supported gems but you need to be aware of this to even search for it.

In provide for the missing functionality, create the pages (https://github.com/Sarafian/sarafian.github.io/blob/master/_pages/tag-archive.html) and [category-archive.html](https://github.com/Sarafian/sarafian.github.io/blob/master/_pages/category-archive.html). 
Not 100% sure at this moment but if I remember correctly the files need to have an `.html` extension. 
These pages server urls such as `/tags/#tips` and `/categogies/#tips`.

I don't really like the layout of the tags and categories pages but that is something I can improve in due time.

### Using the paginator object

I wanted to move the **recent posts** from the home page to a location like `/recent/`. 
The pagination is implemented in the [home.html](https://github.com/Sarafian/sarafian.github.io/_layouts/home.html) layout. 
I thought creating my `_pages/recent.md` while referencing the `home.html` layout would be enough. 
But it wasn't and I was really stuck. 

[Michael Rose](https://github.com/mmistakes) to the rescue again and his explanations led me to the following conclusion:
The `paginator` object can used only by a file named `index.html` including any of the layouts referencing by the `.html` file. 
So to get the `/recent/` url to work I created a `\recent\index.html` file which simply referenced the `home` layout.

## Conclusion and feedback

If you are a novice to Jekyll then you will have a tough ride trying to solve problems that just seem stupid to exist. 
Really all those issues with certificates are kind of a joke and definitely don't help a novice user get started and build a site. 
Then there are those limitations with github pages build. 
Admittedly they are more acceptable but they are still kind of stupid considering the fact that there are gaps in the documentation. 

Jekyll is terribly slow. It seems that I suffer performance issues because of the Windows platform that is not officially supported. 
A former colleague build my blog within 4 seconds when I typically need 45 seconds. 
The empty [Minimal Mistakes](https://mademistakes.com/work/minimal-mistakes-jekyll-theme/) theme, meaning no pages and posts, builds in 16 seconds. 
Every file change takes the same amount of time, although Jekyll is working on incremental builds. 
Compared to hugo, it's really slow and over the last days I understood why people where so harshly complaining about the performance of Jekyll and doing comparisons with Jekyll. 
For the record the same amount of posts builds in 1 second in Hugo and the update of one file is immediate and updates the browser.

So why did I move to Jekyll? 
I'll talk about this in a future post. 
To give something up it has to do with two very cool features of [github](https://github.com):
- Ability of github pages to build a jekyll project from the root or the `/docs` folder of the master branch.
- In browser creation and editing of files of a github repository.

Last but not least I want to thank [Michael Rose](https://github.com/mmistakes) and the people who have contributed for the excellent [Minimal Mistakes](https://mademistakes.com/work/minimal-mistakes-jekyll-theme/) theme. 
He also helped me solve a couple of problems I had that led to the creation of this post. 
From my side I'll contribute a couple of improvements on the doc for Jekyll novices like me.
