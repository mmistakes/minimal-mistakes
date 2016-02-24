---
layout: post
title: "Docker image size optimization"
excerpt: "How to optimize docker image size with simple tricks. Caching layers, minimal base image like alpine or busybox, low number of layers, removing useless files and directories."
tags: [docker, image, size, optimization, layers, alpine, busybox, ubuntu, debian, cache, run, from, add]
image: docker.png
modified: "2016-02-15"
comments: true
---

Building docker images is pretty easy thanks to dockerfiles. But building **small docker images** is not always easy.
The cache mechanism is really powerful, but it's also the main problem when dealing with image size optimization.
Let's take an example and let's see how to improve the dockerfile to improve the image size.

![Docker](/images/posts/docker.png)

# A Dockerfile as example

## Base image size

<script src="https://gist.github.com/ypereirareis/f59e6304cfd156792730.js"></script>

* As you can see we are using ubuntu 14.04 as the base image.
* This base image size is **188.3 MB**.
* The image already has **5** layers.

## More packages, elasticsearch, npm, and a PHP project (Satisfy)

<script src="https://gist.github.com/ypereirareis/bcea06f8de4282efe624.js"></script>

* The image size is now **703.4 MB**
* The image has **15** layers.

# Optimization of the dockerfile

## Packages

* We do not need all recommended packages, so we can add the option `--no-install-recommends` to the `apt-get install` command.
* We can clean apt and remove temporary files.

{% highlight bash %}
RUN apt-get update && \
  apt-get install -y --force-yes --no-install-recommends \
  build-essential \
  ...
  npm \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
{% endhighlight %}


## Add and remove archives or installers in the same layer

{% highlight bash %}
RUN curl -L -O https://download.elastic.co/elasticsearch/release/org/elasticsearch/distribution/tar/elasticsearch/2.2.0/elasticsearch-2.2.0.tar.gz && \
  tar -xvf elasticsearch-2.2.0.tar.gz && \
  rm -rf elasticsearch-2.2.0.tar.gz
{% endhighlight %}

## Change chmod on the same layer

{% highlight bash %}
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
  /usr/local/bin/composer create-project playbloom/satisfy:2.0.6 --stability=dev && \
  chmod -R 777 /satisfy
{% endhighlight %}

## Use prestissimo with Composer

* Minimize image size
* Drastically improve composer install runtime

{% highlight bash %}
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
  && /usr/local/bin/composer global require hirak/prestissimo \
  && /usr/local/bin/composer create-project playbloom/satisfy:2.0.6 --stability=dev \
  && chmod -R 777 /satisfy
{% endhighlight %}


After all those optimizations: 

{% highlight bash %}
$ docker images | grep img_size_optim
img_size_optim                        latest              854039a1452a        11 seconds ago      561.1 MB
{% endhighlight %}

* The image size is now **561.1 MB**
* The image has **11** layers.

## Remove application cache and temporary files and directories

{% highlight bash %}
RUN npm install express \
  && rm -rf /root/.npm/cache/*
{% endhighlight %}

{% highlight bash %}
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
  && /usr/local/bin/composer global require hirak/prestissimo \
  && /usr/local/bin/composer create-project playbloom/satisfy:2.0.6 --stability=dev \
  && chmod -R 777 /satisfy \
  && rm -rf /root/.composer/cache/*
{% endhighlight %}

{% highlight bash %}
$ docker images | grep img_size_optim
img_size_optim                        latest              9ad790d290db        11 seconds ago      533.7 MB
{% endhighlight %}

* The image size is now **533.7 MB**

## All command in a single RUN

Be careful, because only complete `RUN` instruction can be cached.
So if you RUN everything in a single RUN, you could (maybe) not use cache as you should.

{% highlight bash %}
RUN apt-get update && apt-get install -y --force-yes --no-install-recommends \
  ca-certificates \
  build-essential \
  git \
  curl \
  php5 \
  php5-mcrypt \
  php5-tidy \
  php5-cli \
  php5-common \
  php5-curl \
  php5-intl \
  php5-fpm \
  php-apc \
  nginx \
  ssh \
  npm \

  && curl -L -O https://download.elastic.co/elasticsearch/release/org/elasticsearch/distribution/tar/elasticsearch/2.2.0/elasticsearch-2.2.0.tar.gz \
  && tar -xvf elasticsearch-2.2.0.tar.gz \
  && rm -rf elasticsearch-2.2.0.tar.gz \
  
  && npm install express \
  
  && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
  && /usr/local/bin/composer global require hirak/prestissimo \
  && /usr/local/bin/composer create-project playbloom/satisfy:2.0.6 --stability=dev \
  && chmod -R 777 /satisfy \
  
  && apt-get clean \
  && rm -rf /root/.npm/cache/* \
  && rm -rf /root/.composer/cache/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
{% endhighlight %}

{% highlight bash %}
$ docker images | grep img_size_optim
img_size_optim                        latest              e73bdb95e6db        7 seconds ago       533.7 MB
{% endhighlight %}

* The image size is still **533.7 MB**
* The image has **8** layers.

## Base image as small as possible

Have a look at those extremely small base images:

* [Alpine](https://hub.docker.com/_/alpine/)
* [Busybox](https://hub.docker.com/_/busybox/)

# Flatten or squash docker image/containers

## Flatten 

[http://tuhrig.de/flatten-a-docker-container-or-image/](http://tuhrig.de/flatten-a-docker-container-or-image/)

So it is only possible to “flatten” a Docker container, not an image.
So we need to start a container from an image first.
Then we can export and import the container in one line:

{% highlight bash %}

$ docker run -it img_size_optim bash -c "exit"
$ docker ps -a | grep img_size_optim
8ec324116755        img_size_optim        "bash -c exit"           48 seconds ago      Exited (0) 48 seconds ago                              tiny_stallman
$ docker export 8ec324116755 | docker import - img_size_optim_flatten:latest
16ac86fde38629776c0734cbceae22a9da97bd303739e58c5c5261b3376e79d3
{% endhighlight %}

{% highlight bash %}
$ docker images | grep img_size_optim_flatten 
img_size_optim_flatten                latest              16ac86fde386        57 seconds ago      504.4 MB
{% endhighlight %}

* The image size is now **504.4 MB**
* The image has **1** layer.

Complicated to use the cache mechanism... as it's based on layers and RUN instructions.

## Squash

[https://github.com/jwilder/docker-squash](https://github.com/jwilder/docker-squash)

# Conclusion

With all these tricks to optimize the docker image size...

* Image size from **703.4 MB** to **504.4 MB**.
* From **15** layers to **1**.

And the dockerfile for the example in very simple.

Go !! Improve the size of your docker images !!