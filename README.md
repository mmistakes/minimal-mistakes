# About this site

This is the repository for building and maintaining the webpage for the Finnish Quantum-Computing Infrastructure (FiQCI). You can view the site at https://fiqci.github.io/. 


## Contributing

1. Clone the repository with `git clone https://github.com/FiQCI/fiqci.github.io.git`

## Requirements and building 

Building the website locally requires `ruby` and `jekyll`. Ruby is install on most systems, however more details can be found [here](https://www.ruby-lang.org/en/documentation/installation/). For help installing `jekyll` see [here](https://jekyllrb.com/docs/installation/).

### Using Ruby

Using the default configuration files: 

1. Run `bundle clean` to clean up the directory
2. `bundle install` installs the necessary packages such as `jekyll` etc.
3. `bundle exec jekyll serve`

If you get errors try deleting `Gemfile.lock`. 

### Using Docker

Ruby and it's different versions and environments can cause problems. A simple solution is to use Docker and install ruby inside it's own container. A docker container can be started through `docker compose up -d ` using the given `docker-compose.yml` file given. 

## Editing

This website is built using Jekyll with the minimal mistakes theme. To find out more about jekyll, take a look at the docs: https://jekyllrb.com/docs/. 


If you have made a change to the `_config.yml` file you will need to delete `_site` (e.g `rm -r _site/`) and rebuild.