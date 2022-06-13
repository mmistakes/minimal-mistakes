# About this site

This is the repository for building and maintaining the webpage for the Finnish Quantum-Computing Infrastructure (FiQCI). You can view the site at https://fiqci.github.io/. 


## Contributing



## Requirements and building 

Building the website locally requires `ruby` and `jekyll`. Ruby is install on most systems, however more details can be found [here](https://www.ruby-lang.org/en/documentation/installation/). For help installing `jekyll` see [here](https://jekyllrb.com/docs/installation/).

### Using Ruby

Using the default configuration files: 

1. `bundle install` installs the necessary packages such as `jekyll` etc
2. `bundle exec jekyll serve`

If error `cannot load such file -- webrick (LoadError)` then `bundle add webrick`

### Using Docker

A docker container can be started through `docker compose up -d ` using the given `docker-compose.yml` file given. 

## Editing