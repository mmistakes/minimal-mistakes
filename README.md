# About this site

This is the repository for building and maintaining the webpage for the Finnish Quantum-Computing Infrastructure (FiQCI). You can view the site at https://fiqci.github.io/. 

## Editing and Contributing

If you wish to add your own posts/publications or contribute to the website please see [CONTRIBUTING](CONTRIBUTING.MD) for help and guidelines.

This website is built using Jekyll with the minimal mistakes theme. To find out more about jekyll, take a look at the docs: https://jekyllrb.com/docs/. 


If you have made a change to the `_config.yml` file you will need to delete `_site` (e.g `rm -r _site/`) and rebuild.


## Building the website locally

Building the website locally requires `ruby` and `jekyll`. Ruby is installed on most systems, however more details can be found [here](https://www.ruby-lang.org/en/documentation/installation/). For help installing `jekyll` see [here](https://jekyllrb.com/docs/installation/).

### Using the command line

Using the default configuration files: 

1. Run `bundle clean` to clean up the directory
2. `bundle install` installs the necessary packages such as `jekyll` etc.
3. `bundle exec jekyll serve`
4. Then navigate to [http://localhost:4000/](http://localhost:4000/).

If you get errors try deleting `Gemfile.lock` or deleting the `.jekyll-cache` directory (`sudo rm -r .jekyll-cache`). 

### Using Docker

Ruby and it's different versions and environments can cause problems. A simple solution is to use Docker and install ruby inside it's own container. A docker container can be started through `docker compose up -d ` using the given `docker-compose.yml` file given. 

Then navigate to [http://localhost:4000/](http://localhost:4000/). 

1. `docker compose up -d `
2. Then navigate to [http://localhost:4000/](http://localhost:4000/).   

Ensure that there isn't a current container assigned to the `4000:4000`. This can be resolved by for example removing an old version of the docker container `docker rm xyz` where `xyz` is the first 3 letters of the container id found through `docker ps -a`. 
