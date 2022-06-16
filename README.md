# About this site

This is the repository for building and maintaining the webpage for the Finnish Quantum-Computing Infrastructure (FiQCI). You can view the site at https://fiqci.github.io/. 


## Contributing

1. Clone the repository with `git clone https://github.com/FiQCI/fiqci.github.io.git`


### Posts and Publications

Posts and Publications can be in either `html` or `markdown` format and must be located in either `_posts` or `_publications`. Posts must be created with the following format `YEAT-MONTH-DAY-title.md` in order to render correctly on the webpage. You can also include front matter to set the layout and provide additional information

```
---
title: 'Blog Post number 1'
date: 2012-08-14
permalink: /posts/2012/08/blog-post-1/
header:
  teaser: /assets/images/about-icon.jpg
published: true
gallery:
  - url: /assets/images/about-icon.jpg
    image_path: /assets/images/about-icon.jpg
    title: Before and after comparison
tags:
  - cool posts
  - category1
  - category2
---

```

In this example the front matter variables such as `gallery` can be displayed in the main body of the text via `{% include gallery%}`. A teaser image or thumbnail can also be attached which will display on the posts and publications page. See the `templates/` directory for example posts and publications. 


For further information: 
- https://jekyllrb.com/docs/posts/
- https://jekyllrb.com/docs/front-matter/
- https://www.markdownguide.org/cheat-sheet/


## Requirements and building 

Building the website locally requires `ruby` and `jekyll`. Ruby is installed on most systems, however more details can be found [here](https://www.ruby-lang.org/en/documentation/installation/). For help installing `jekyll` see [here](https://jekyllrb.com/docs/installation/).

### Using the command line

Using the default configuration files: 

1. Run `bundle clean` to clean up the directory
2. `bundle install` installs the necessary packages such as `jekyll` etc.
3. `bundle exec jekyll serve`
4. Then navigate to [http://localhost:4000/](http://localhost:4000/).

If you get errors try deleting `Gemfile.lock`. 

### Using Docker

Ruby and it's different versions and environments can cause problems. A simple solution is to use Docker and install ruby inside it's own container. A docker container can be started through `docker compose up -d ` using the given `docker-compose.yml` file given. 

Then navigate to [http://localhost:4000/](http://localhost:4000/). 

1. `docker compose up -d `
2. Then navigate to [http://localhost:4000/](http://localhost:4000/).   

Ensure that there isn't a current container assigned to the `4000:4000`. This can be resolved by for example removing an old version of the docker container `docker rm xyz` where `xyz` is the first 3 letters of the container id found through `docker ps -a`. 


## Editing and Contributing

If you wish to add your own posts/publications or contribute to the website please see [CONTRIBUTING](CONTRIBUTING.MD) for help and guidelines.

This website is built using Jekyll with the minimal mistakes theme. To find out more about jekyll, take a look at the docs: https://jekyllrb.com/docs/. 


If you have made a change to the `_config.yml` file you will need to delete `_site` (e.g `rm -r _site/`) and rebuild.

