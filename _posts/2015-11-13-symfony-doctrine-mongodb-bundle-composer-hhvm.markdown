---
layout: post
title: "DoctrineMongoDBBundle composer install with Docker and HHVM"
excerpt: "DoctrineMongoDBBundle can be installed with a composer docker container and HHVM, but it can lead to problems or errors"
tags: [symfony, doctrine, mongo, mongodb, bundle, composer, hhvm]
image: symfony.png
modified: "2016-02-15"
comments: true
---

When working with docker, a common thing is to use a specific docker image/container to run composer.
And it can be a good thing to run [composer through HHVM](https://github.com/marmelab/docker-composer-hhvm) to increase performance.

![Symfony](/images/posts/symfony.png)

## Composer and DoctrineMongoDBBundle

But if you try to install **DoctrineMongoDBBundle** thanks to this kind of composer container (php + composer + hhvm),
you will probably have this error:

{% highlight bash %}
$ make composer-update "doctrine/mongodb-odm doctrine/mongodb-odm-bundle"
Loading composer repositories with package information
Updating dependencies (including require-dev)
Your requirements could not be resolved to an installable set of packages.

  Problem 1
    - doctrine/mongodb 1.2.0 requires ext-mongo ^1.2.12 -> the requested PHP extension mongo is missing from your system.
    - doctrine/mongodb 1.2.0 requires ext-mongo ^1.2.12 -> the requested PHP extension mongo is missing from your system.
    - doctrine/mongodb 1.2.0 requires ext-mongo ^1.2.12 -> the requested PHP extension mongo is missing from your system.
    - Installation request for doctrine/mongodb == 1.2.0.0 -> satisfiable by doctrine/mongodb[1.2.0].
{% endhighlight %}

This is because **composer** (by default) checks if you have the good extensions installed for your project.
And the container used to run composer **is not** the container we use to run our project.

The two ways I know to avoid/fix this problem are:

* Adding the `--ignore-platform-reqs` option to the composer command.

{% highlight bash %}
$ composer install --ignore-platform-reqs
{% endhighlight %}

* Installing the mongo php extension in the composer container.

{% highlight bash %}
$ apt-get install php5-mongo
{% endhighlight %}

But if you use composer with HHVM, the second solution will not work because HHVM won't detect installed PHP extensions like with "normal" PHP.

So I advise you to use the first solution: `--ignore-platform-reqs`

**Important 1**

You need to install php5-mongo extension in your app container !

**Important 2**

Of course the previous explanation is valid for any other PHP extensions, not only php5-mongo !