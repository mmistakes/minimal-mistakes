---
layout: post
title:  "Docker with shell script or Makefile"
excerpt: Docker with shell script or Makefile to have a higher productivity
tags: [docker, shell, makefile, make, script]
image: docker.png
modified: "2016-02-15"
comments: true
---

Of course [Docker](https://docs.docker.com/) is a fantastic tool that allows us to work more efficiently
and that offers new perspectives in terms of scalability, infrastructures, deployments,...

![Docker](/images/posts/docker.png)

But first of all, [Docker](https://docs.docker.com/) is used by a lot of people for development
with many different languages on many different platforms.

And for developers (like me), the use of [Docker](https://docs.docker.com/) is not something very easy nor fun
if we have to type or copy/paste or run commands like...


{% highlight bash %}
docker run -it --rm \
    -v $(pwd):/app \
    -e VIRTUAL_HOST=domain.tld \
        IMAGE_NAME \
            /bin/bash -ci 'app/console cache:clear'
{% endhighlight %}

...to execute a simple [Symfony](http://symfony.com/) command for example.

I'm sure [Symfony](http://symfony.com/) developers understand what I mean regarding how many times a day we can run this command.

So it's absolutely necessary to use Docker through the power of complementary tools such as:

* Shell scripting
* Make / Makefile
* Docker Compose

## Shell Scripting

With your shell you will be able to simplify everything you need to use docker with no pain writing shell scripts.
But writing such scripts is not always really easy for developers without admin or DevOps skills.

To show you how to be more productive with Docker and shell scripts,
I'm gonna speak about the way I developed this Jekyll blog and how I work with it everyday.

**A simple DO-FILE**

You can see this full `do.sh` file [here](https://github.com/ypereirareis/ypereirareis.github.io/blob/master/do.sh).
And there it is the explanation of each part of the file:

**Variables**

Comments are explicit enough I think...

{% highlight bash %}
# Output colors
NORMAL="\\033[0;39m"
RED="\\033[1;31m"
BLUE="\\033[1;34m"

# Names to identify images and containers of this app
IMAGE_NAME='docker-ypereirareis'
CONTAINER_NAME="jekyll-ypereirareis"

# Usefull to run commands as non-root user inside containers
USER="bob"
HOMEDIR="/home/$USER"
EXECUTE_AS="sudo -u bob HOME=$HOME_DIR"
{% endhighlight %}


The last line of this part, `EXECUTE_AS="sudo -u bob HOME=$HOME_DIR"`
allows to execute commands into docker container as the non-root **bob** user
created in the image as you can see in my [Dockerfile](https://github.com/ypereirareis/ypereirareis.github.io/blob/master/Dockerfile#L22-28).

**Logging functions**

* The first one to log debug or info...
* The other one to log errors

{% highlight bash %}
log() {
  echo "$BLUE > $1 $NORMAL"
}

error() {
  echo ""
  echo "$RED >>> ERROR - $1$NORMAL"
}
{% endhighlight %}

**The Docker image**

To run docker containers, you always need a docker image. An image is built thanks to a Dockerfile.
It's really important to be able to rebuild the image easily (upgrades,...).


{% highlight bash %}
build() {
  docker build -t $IMAGE_NAME .

  [ $? != 0 ] && \
    error "Docker image build failed !" && exit 100
}

{% endhighlight %}

**The shortcut functions**

Each function is designed to execute an action in the installation or development process.
Reading these functions you will see that my Jekyll project is built with:

* Node/npm
* Bower
* Jekyll (of course)
* Grunt

{% highlight bash %}
npm() {
  log "NPM install"
  docker run -it --rm -v $(pwd):/app $IMAGE_NAME \
    bash -ci "$EXECUTE_AS npm install"

  [ $? != 0 ] && error "Npm install failed !" && exit 101
}

bower() {
  log "Bower install"
  docker run -it --rm -v $(pwd):/app -v /var/tmp/bower:$HOMEDIR/.bower $IMAGE_NAME \
    /bin/bash -ci "$EXECUTE_AS bower install \
      --config.interactive=false \
      --config.storage.cache=$HOMEDIR/.bower/cache"

  [ $? != 0 ] && error "Bower install failed !" && exit 102
}

jkbuild() {
  log "Jekyll build"
  docker run -it --rm -v $(pwd):/app $IMAGE_NAME \
    /bin/bash -ci "$EXECUTE_AS jekyll build"

  [ $? != 0 ] && error "Jekyll build failed !" && exit 103
}

grunt() {
  log "Grunt build"
  docker run -it --rm -v $(pwd):/app $IMAGE_NAME \
    /bin/bash -ci "$EXECUTE_AS grunt"

  [ $? != 0 ] && error "Grunt build failed !" && exit 104
}

jkserve() {
  log "Jekyll serve"
  docker run -it -d --name="$CONTAINER_NAME" -p 4000:4000 -v $(pwd):/app $IMAGE_NAME \
    /bin/bash -ci "jekyll serve -H 0.0.0.0"

  [ $? != 0 ] && error "Jekyll serve failed !" && exit 105
}
{% endhighlight %}

**The full installation function**

When you start working on a new or an existing project,
it's really handy to have a simple command to execute to install and run a fully working application.

The following function will call every previous explained ones in the correct order.

{% highlight bash %}
install() {
  echo "Installing full application at once"
  remove
  npm
  bower
  jkbuild
  grunt
  jkserve
}
{% endhighlight %}

**Image/containers management**

When working with docker, it's important to be able to check what happens with containers or images:

* Log into a container
* Stop a specific container by name
* Start a specific container
* Remove a specific container

{% highlight bash %}
bash() {
  log "BASH"
  docker run -it --rm -v $(pwd):/app $IMAGE_NAME /bin/bash
}

stop() {
  docker stop $CONTAINER_NAME
}

start() {
  docker start $CONTAINER_NAME
}

remove() {
  log "Removing previous container $CONTAINER_NAME" && \
      docker rm -f $CONTAINER_NAME &> /dev/null || true
}

{% endhighlight %}

**Help function**

Expose the available functions through a simple `help` function:

{% highlight bash %}

help() {
  echo "-----------------------------------------------------------------------"
  echo "                      Available commands                              -"
  echo "-----------------------------------------------------------------------"
  echo -e -n "$BLUE"
  echo "   > build - To build the Docker image"
  echo "   > npm - To install NPM modules/deps"
  echo "   > bower - To install Bower/Js deps"
  echo "   > jkbuild - To build Jekyll project"
  echo "   > grunt - To run grunt task"
  echo "   > jkserve - To serve the project/blog on 127.0.0.1:4000"
  echo "   > install - To execute full install at once"
  echo "   > stop - To stop main jekyll container"
  echo "   > start - To start main jekyll container"
  echo "   > bash - Log you into container"
  echo "   > remove - Remove main jekyll container"
  echo "   > help - Display this help"
  echo -e -n "$NORMAL"
  echo "-----------------------------------------------------------------------"

}
{% endhighlight %}

**Run these functions**

A shell script is generally executed with the following syntax:

`./do.sh`

But simply doing this, you will execute script instructions but you'll never call your functions.

The last line `$*` of the `do.sh` script is VERY important.

It allows to call a function based on argument(s) passed to the script.
`./do.sh install` for instance will execute the install function.

With a do-file you will work with docker writing simple shell commands like:

* `./do.sh build`
* `./do.sh install`
* `./do.sh grunt`
* ...

What about an alias for `./do.sh` in your .bashrc/.zshrc ?

## Make / Makefile

If you're not familiar with shell scripting you can choose another tool... a `Makefile`.

`Makefiles` are files used to configure `make`, which is a build tool.
The principle is simple: to build a target, we indicate the dependencies and the command to build it.
`make` is in charge of traveling the tree to build targets in the correct order.

{% highlight bash %}
helloyou: hello you end
    cat hello.txt you.txt end.txt > helloyou.txt
    cat helloyou.txt
hello:
    echo "Hello" > hello.txt
you:
    echo "you" > you.txt
end:
    echo "!!!" > end.txt
{% endhighlight %}

**A big advantage of `make` and `Makefiles` is that it provides auto complete out of the box.**

Many people like using `Makefile` in an uncommon way to run grouped commands like this for instance:

{% highlight bash %}

install: composer database cc

database:
    app/console doctrine:database:create
    app/console doctrine:schema:create
    app/console doctrine:schema:update

composer:
    composer install --prefer-source

cc:
    app/console cache:clear --env=prod

{% endhighlight %}

We could replace every symfony command with a `docker run` command just like in our **do-file**:

{% highlight bash %}

install: composer database cc

database:
    docker run --rm -it -v $(pwd):/app $IMAGE_NAME \
        /bin/bash -ci "app/console doctrine:database:create"
    docker run --rm -it -v $(pwd):/app $IMAGE_NAME \
        /bin/bash -ci "app/console doctrine:schema:create"
    docker run --rm -it -v $(pwd):/app $IMAGE_NAME \
        /bin/bash -ci "app/console doctrine:schema:update"
    
composer:
    docker run --rm -it -v $(pwd):/app $IMAGE_NAME \
        /bin/bash -ci "composer install --prefer-dist"

cc:
    docker run --rm -it -v $(pwd):/app $IMAGE_NAME \
        /bin/bash -ci "app/console cache:clear --env=prod"
    
{% endhighlight %}

**Be careful...** When using `Makefile` you must use tab key/character in your commands.

## Docker Compose

[Docker compose](https://docs.docker.com/compose/) is not a third way to work more easily with `docker` commands,
it is a tool allowing simple containers orchestration.

<blockquote>
<em><p>Compose is a tool for defining and running complex applications with Docker.
With Compose, you define a multi-container application in a single file,
then spin your application up in a single command which does everything that needs to be done to get it running.
</p></em>
</blockquote>

Compose allows you to define the services/containers that make up your app in a `docker-compose.yml` file, so they can be run together in an isolated environment.

**Example:**

{% highlight yaml %}

web:
    build: docker
    working_dir: /var/www
    hostname: project
    domainname: project.dev
    command: /root/start.sh
    volumes:
        - ".:/var/www"
        - "./var/logs/web:/var/log/apache2"
    environment:
        VIRTUAL_HOST: project.dev
        SYMFONY__APP__SECRET: secret
        SYMFONY__CRYPT__KEY: key
        SYMFONY__DATABASE__HOST: db
        SYMFONY__DATABASE__PORT: 3306
        SYMFONY__DATABASE__NAME: database
        SYMFONY__DATABASE__USER: root
        SYMFONY__DATABASE__PASSWORD: database password
    links:
        - db

db:
    image: mysql:5.5
    environment:
        MYSQL_ROOT_PASSWORD: SUP3R-STR0NG-P@SSW0RD
    volumes:
        - "./data:/var/lib/mysql"

composer:
    image: zolweb/docker-composer
    working_dir: /src
    volumes:
        - /var/tmp/composer:/root/.composer
        - ".:/src"
    net: "host"

{% endhighlight %}

Then run `docker-compose up` and docker compose will start your entire app with correct links, environment variables,...

Since docker compose 1.2 you can now [define configurations for multiple environments](https://blog.docker.com/2015/04/easily-configure-apps-for-multiple-environments-with-compose-1-2-and-much-more/)  thanks to the `extends` keyword.

**docker-common.yml**

{% highlight yaml %}

web:
    build: docker
    working_dir: /var/www
    hostname: project
    domainname: project.dev
    command: /root/start.sh
    volumes:
        - ".:/var/www"
        - "./var/logs/web:/var/log/apache2"
    environment:
        VIRTUAL_HOST: project.dev
        SYMFONY__APP__SECRET: secret
        SYMFONY__DATABASE__HOST: db
        SYMFONY__DATABASE__PORT: 3306
        SYMFONY__DATABASE__NAME: database
        SYMFONY__DATABASE__USER: root
        SYMFONY__DATABASE__PASSWORD: database password
        
db:
    image: mysql:5.5
    environment:
        MYSQL_ROOT_PASSWORD: SUP3R-STR0NG-P@SSW0RD
    volumes:
        - "./data:/var/lib/mysql"

composer:
    image: zolweb/docker-composer
    working_dir: /src
    volumes:
        - /var/tmp/composer:/root/.composer
        - ".:/src"
    net: "host"

{% endhighlight %}

Links can't be inherited and must appear in "per environment" files `docker-compose.yml` and `docker-prod.yml`.

**docker-compose.yml**

{% highlight yaml %}

web:
    extends:
        file: docker-compose-common.yml
        service: web
    links:
        - db
    environment:
        SYMFONY__CRYPT__KEY: DEV_CRYPT_KEY

db:
    extends:
        file: docker-compose-common.yml
        service: db

composer:
    extends:
        file: docker-compose-common.yml
        service: composer

{% endhighlight %}

You must extend every service/container used in your "environment specific" config.

**docker-prod.yml**

{% highlight yaml %}

web:
    extends:
        file: docker-compose-common.yml
        service: web
    links:
        - db
    environment:
        SYMFONY__CRYPT__KEY: PROD_CRYPT_KEY
        SYMFONY__PROD__HOSTNAME: PROD_HOST_NAME

db:
    extends:
        file: docker-compose-common.yml
        service: db
    environment:
        MYSQL_ROOT_PASSWORD: SUP3R-PR0DUCT10N-P@SSW0RD

composer:
    extends:
        file: docker-compose-common.yml
        service: composer

{% endhighlight %}

To run docker compose with another file than the default one `docker-compose.yml` use the `-f` option:

{% highlight bash %}
docker-compose -f docker-prod.yml up
{% endhighlight %}


## Conclusion

Choose a solution and a set of tools that fits your needs.

But, please, do not run `docker` commands directly from your shell without any complementary tool anymore.
