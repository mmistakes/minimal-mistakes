# FiQCI Webpage

## Running and edited a copy locally 

Building the website locally requires `ruby`. 

### Using Ruby

Using the default configuration files: 

1. `bundle install` installs the necessary packages such as `jekyll` etc
2. `bundle exec jekyll serve`

If error `cannot load such file -- webrick (LoadError)` then `bundle add webrick`

### Using Docker

Using the Dockerfile in the repo's source dir. 

1. `docker build -t my-jekyll-env -f Dockerfile `
2. 


```
docker run --name my-jekyll-env \
  --mount type=bind,source=$(pwd)/src,target=/src \
  -p 4000:4000 \
  -it \
   my-jekyll-env
```