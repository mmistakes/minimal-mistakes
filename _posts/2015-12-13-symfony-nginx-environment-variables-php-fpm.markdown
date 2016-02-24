---
layout: post
title: "Symfony environment variables with Nginx and PHP-FPM"
excerpt: "It's a common thing to use environment variables to configure Symfony for dev, staging, production..."
tags: [Symfony, nginx, php-fpm, php, fpm, environment, env, variables, variable, var, apache]
image: symfony.png
modified: "2016-02-15"
comments: true
---

It's [a common thing](http://symfony.com/doc/current/cookbook/configuration/external_parameters.html) to use environment variables to configure Symfony for dev, staging, production...
It allows to define specific configurations such as database host username and password, api entrypoint, ...
without saving those information into files and commiting them,... it's a bad practice and could lead to security problems.

![Symfony](/images/posts/symfony.png)

## Apache

With Apache you can forward variables with this kind of configuration inside your host
(it supposes that environment variables are defined on your system) :

{% highlight bash %}

export SYMFONY__APP__SECRET="MY_SUPER_SECRET"
export SYMFONY__APP__PUBLIC="MY_SUPER_PUBLIC_KEY"
export SYMFONY__CRYPT__KEY="MY_SUPER_CRYPT_KEY"

<VirtualHost *:80>
    DocumentRoot /var/www/web

    SetEnv SYMFONY__APP__SECRET ${SYMFONY__APP__SECRET}
    SetEnv SYMFONY__APP__PUBLIC ${SYMFONY__APP__PUBLIC}
    SetEnv SYMFONY__CRYPT__KEY ${SYMFONY__CRYPT__KEY}

    ...
</VirtualHost>

{% endhighlight %}

It allows you to use Symfony through CLI or web pages and use the correct configurations.

## Nginx / PHP-FPM

With Nginx and more exactly with PHP-FPM, it's no so easy because of the default PHP-FPM configuration:

**\# clear_env boolean**

_Clear environment in FPM workers.
Prevents arbitrary environment variables from reaching FPM worker processes by clearing
the environment in workers before env vars specified in this pool configuration are added.
Since PHP 5.4.27, 5.5.11, and 5.6.0. Default value: Yes._

So by default all environment variables are cleared and not forwarded to PHP.

At this point, there are two ways to pass variables to your Symfony application,
both modifying the PHP-FPM pool config file `/etc/php5/fpm/pool.d/www.conf`
(could be a custom pool):

* Define all your env variables yourself at the end of the file:

{% highlight bash %}

env[SYMFONY__APP__SECRET] = $SYMFONY__APP__SECRET
env[SYMFONY__APP__PUBLIC] = $SYMFONY__APP__PUBLIC
env[SYMFONY__CRYPT__KEY] = $SYMFONY__CRYPT__KEY

{% endhighlight %}

* Modify the default value of the `clear_env` configuration to **No**
and you will have access to all env vars in your PHP application once php-fpm restarted.

{% highlight bash %}
;clear_env = no
...
clear_env = no
{% endhighlight %}

**Do not forget to remove the comma at the beginning of the line** 

## Docker

If you use docker you could add this `RUN` command in your `Dockerfile` to change de default php-fpm configuration

{% highlight bash %}
RUN sed -e 's/;clear_env = no/clear_env = no/' -i /etc/php5/fpm/pool.d/www.conf
{% endhighlight %}

Rebuild your Docker image !!

## TIP

With Symfony production environment you will probably DO NOT have to forward those environment variables
in your virtual hosts files, because the cache is warmed up thanks to a CLI command... and... your variables
are probably already defined in your CLI/shell system:

* exports
* .bashrc/.zshrc
* docker/docker-compose environment variables

