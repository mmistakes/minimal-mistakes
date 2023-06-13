# About this site

This is the repository for building and maintaining the webpage for the Finnish Quantum-Computing Infrastructure (FiQCI). You can view the main site at https://fiqci.github.io/.

## Editing and Contributing

If you wish to add your own posts/publications or contribute to the website please see [CONTRIBUTING.md](CONTRIBUTING.MD) for help and guidelines. For quick contributions:

* In [the dev repo](https://github.com/FiQCI/dev) navigate to where you want to add a new file e.g `_posts/` and click "Add file" at the top. Or navigate to a file already in the repo and click the little pen icon in the top right "Edit this file". 
* (sign in GitHub) and edit then content
* Scroll down to commit changes (create a new branch) -> make a pull request
* Assign a reviewer who will then merge and push to the master dev branch
* After merging to the master branch of the dev repository a pull request will then be made to the main website. 


``
dev:<new-branch> --> dev:master --> fiqci.github.io:master
``



This website is built using Jekyll with the minimal mistakes theme. To find out more about jekyll, take a look at the docs: https://jekyllrb.com/docs/. 


If you have made a change to the `_config.yml` file you will need to delete `_site` (e.g `rm -r _site/`) and rebuild.


## Building the website locally

Building the website locally requires `ruby` and `jekyll`. Ruby is installed on most systems, however more details can be found [here](https://www.ruby-lang.org/en/documentation/installation/). For help installing `jekyll` see [here](https://jekyllrb.com/docs/installation/).

### Using the command line

Using the default configuration files: 

1. Run `bundle clean` to clean up the directory
2. `bundle install` installs the necessary packages such as `jekyll` etc.
3. `bundle exec jekyll serve` (use the `--watch` flag for live reloading)
4. Then navigate to [http://localhost:4000/](http://localhost:4000/).

You can also use `./build.sh` for quick use of these commands above. 

If you get errors try deleting `Gemfile.lock` or deleting the `.jekyll-cache` directory (`sudo rm -r .jekyll-cache`). 

### Using Docker

Ruby and it's different versions and environments can cause problems. A simple solution is to use Docker and install ruby inside it's own container. A docker container can be started through `docker compose up -d ` using the given `docker-compose.yml` file. 

Then navigate to [http://localhost:4000/](http://localhost:4000/). 

1. `docker compose up -d `
2. Then navigate to [http://localhost:4000/](http://localhost:4000/).   

You can also simply use the `Dockerfile` with `docker build -t <container-name> .`  and `docker run -d -p 8000:8000 <container-name>` from the git repo directory. This method takes significantly longer and is generally not recommended. 

Ensure that there isn't a current container assigned to the `4000:4000`. This can be resolved by for example removing an old version of the docker container `docker rm xyz` where `xyz` is the first 3 letters of the container id found through `docker ps -a`. 

### Github pages

Changes can also be previewed at either http://fiqci.fi/dev/ for the dev site or http://fiqci.fi/ for the main site. 

### Rebuilding the javascript files

If any additional changes are made to `/assets/js/_main.js` then you will need to run `npm run build:js` to rebuild them. To install the npm dependencies run `npm install` in the root od the directory.