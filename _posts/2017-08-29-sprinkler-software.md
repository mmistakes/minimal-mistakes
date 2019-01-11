---
title: "Software part"
related: true
header:
  overlay_image: /assets/images/anthony-rossbach-59486.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  teaser: /assets/images/anthony-rossbach-59486.jpg
categories:
  - Automation
tags:
  - Software
  - Python
  - Git
  - Linux
  
---

The aim of this tutorial is to control sprinkler from his smartphone anywhere without SSH connection.

In the previous tutorial, I explain how to control sprinkler from command line directly by a daemon service
on the Raspberry. In order to be able to access of the raspberry from internet we need to expose an API
via an HTTP Server. Finally, we will be able to control sprinkler with simple HTTP request routing from anywhere.

- [Create HTTP server](#create-http-server)
- [Call API from Smartphone](#call-api-from-smartphone)

### Create HTTP server

It's easy to create a simple HTTP Server in Python with Flask. I used a basic authentification, it's the minimal
to implement if you want to expose this API everywhere. In addition, all ZoneControl implement all functions
we need to expose from the server http controller. So we can continue to use the daemon and the http server in
parallel. You need to 

TODO create Flask and Swagger

git clone 

start the server 

See more into the readme

### Call API from smartphone

We can now control the sprinkler with simple HTTP Request. At first, I was wondering if I have to code an mobile
application (IOS, android... ), and after thinking about it, I said to myself: is there a simple application we can
send request like curl or postman but on mobile. So I found the perfect application on Iphone [here](https://itunes.apple.com/fr/app/curler-une-interface-pour-vos-api-http/id1210896283?mt=8)
It exists a couple of equivalent application on Iphone, Android...

**Note**: If you want to access to your HTTP server outside your LAN, don't forget to forward port into your 
router.

So I've just set all request into this application !

TODO screenshot samples.

{% include figure image_path="/assets/images/sprinkler/curler_sprinkler.jpg" alt="Curler sprinkler" 
caption="Curler sprinkler" %}
