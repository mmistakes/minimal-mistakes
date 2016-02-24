---
layout: post
title: "Composer, Satis and docker"
excerpt: "Thanks to Composer, Satis, satisfy and docker it's really easy to host and use private git repositories"
tags: [composer, satis, docker, satisfy, repository, repositories, git, packagist, github, gitlab, bitbucket]
modified: "2016-02-15"
comments: true
---

As a PHP and Symfony developer I use [Composer](https://getcomposer.org/)
and [Satis](https://github.com/composer/satis) to manage my private repositories.

A few months ago, I created a [satis docker image](https://github.com/ypereirareis/docker-satis)
[(Dockerhub)](https://hub.docker.com/r/ypereirareis/docker-satis/) to deal with the Satis configuration easily, it contains: 

* **[Composer](https://getcomposer.org/)**

![Composer](/images/posts/composer.png)

_Composer is a tool for dependency management in PHP.
It allows you to declare the libraries your project depends on and it will manage (install/update) them for you._

* **[Satis](https://github.com/composer/satis)**

![Satis](/images/posts/satis.png)

_Simple static Composer repository generator.
It uses any composer.json file as input and dumps all the required
(according to their version constraints) packages into a Composer Repository file._

* **[Satisfy](https://github.com/ludofleury/satisfy)** (admin UI)

![Satisfy](/images/posts/satisfy.png)

_Satisfy ease your satis configuration management.
It provides simple web UI over Satis to avoid a hand-editing of the satis.json configuration file.
It's secured with google open ID and you can apply an google apps organization constraint_

## Start with satis and satisfy

* `git clone git@github.com:ypereirareis/docker-satis.git`
* then... just read the documentation on my [docker satis my git repository](https://github.com/ypereirareis/docker-satis)

