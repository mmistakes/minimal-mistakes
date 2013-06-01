---
layout: post
title: "Django plugin open sourced"
description: "Examples and code for displaying images in posts."
category: articles
tags: [sample post, images, test]
---
#Facebook Album plugin for Django CMS

There are lot of useful plugins for Django CMS.
Well, this plugin let you use the images from a Facebook Album. Currently it supports fetching images from Photo Album of a Facebook Page.

All you need to do is to put Facebook Album URL, Access-token and the album name in the plugin fields and you will get a nice thumbnail in the intended place and once clicked big images will open in carousel effects. Sounds nice, take a look at the screenshots below.

- Entering the details in plugin form:

![Admin Page](http://vinitcool76.github.io/images/admin.png)

- Thumbnail view of plugin:

![Small View] (http://vinitcool76.github.io/imagessmallview.png)

- Image slideshow in carousel

![Carousel](http://vinitcool76.github.io/images/bigview.png)


#Installation

Installation is dead simple. First start your virtualenv

    $ workon sample
    (sample)$ pip install cmsplugin-fbalbum

You might need to do this if you are getting some sort of database error.

    python manage.py syncdb
    python manage.py migrate

In case you face any problems, file issues and if you want to contribute take a look at the existing issues and send a pull request.


