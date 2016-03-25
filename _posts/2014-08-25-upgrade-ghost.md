---
layout: post
title: "Upgrade Ghost"
date: 2014-08-25 08:00:00
categories: sysadmin
---

I have run [Ghost](https://ghost.org) for quite some time now and I have been through two upgrade process so I think it will be a good idea to save a procedure for easy upgrading. I found the instruction [here](http://www.howtoinstallghost.com/how-to-update-ghost/).

---
###Manually upgrade Ghost

I usually use manual upgrade method because I don't inspect the automatic scripts yet if it is compatible with my installation.

	# cd /var/www/html/ghost
    # mkdir temp
    # cd temp/
    # curl -L -O https://ghost.org/zip/ghost-latest.zip
    # unzip ghost-latest.zip
    # cd ..
    # cp temp/*.md temp/*.js temp/*.json .
    # rm -R core
    # cp -R temp/core .
    # cp -R temp/content/themes/casper content/themes
    # npm install --production
    # rm -R temp
    # su ghost -c /var/www/html/ghost/starter.sh -s /bin/sh

---
###Reference
http://www.howtoinstallghost.com/how-to-update-ghost/
