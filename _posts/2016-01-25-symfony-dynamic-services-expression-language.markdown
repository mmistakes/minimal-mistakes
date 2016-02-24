---
layout: post
title: "Symfony dynamic services with environments or expression language"
excerpt: "How to create and inject services dynamically with Symfony and expression language based on environment or env variables"
tags: [Symfony, dynamic, services, service, expression, language, dependency, injection]
image: symfony.png
modified: "2016-02-15"
comments: true
---

There are many use cases where it's useful to inject different services based
on the Symfony environment or on another param such as an env variable for instance.

![Symfony](/images/posts/symfony.png)

**Example 1**

* In Symfony **dev** env we want to use mailcatcher to send/receive emails.
* In Symfony **prod** env we want to use postfix to send emails.

**Example 2**

* In Symfony **prod** env on a staging server we want to use mailcatcher to send/receive emails.
* In Symfony **prod** env on the production server we want to use postfix to send emails.

## Example 1: environments

**config.yml**

{% highlight bash %}

# Swiftmailer Configuration
swiftmailer:
    default_mailer: default
    mailers:
        default:
            transport:  "%mailer_transport%"
            host:       "%mailer_host%"
            username:   "%mailer_user%"
            password:   "%mailer_password%"
        mailcatcher:
            host:       "%mailcatcher_host%"
            port:       "%mailcatcher_port%"
            username:   null
            password:   null
            
services:    
    class: AppBundle\Service\MailerService
    arguments:
        mailer: @swiftmailer.mailer.default
{% endhighlight %}


**config_dev.yml**

{% highlight bash %}

# Swiftmailer Configuration
services:    
    class: AppBundle\Service\MailerService
    arguments:
        mailer: @swiftmailer.mailer.mailcatcher
{% endhighlight %}


## Example 2: environment variables and parameters

Get the value of an env variable on your system and build a symfony parameter:

**CLI**

{% highlight bash %}
export SYMFONY__APP__MAILER="mailcatcher"
{% endhighlight %}

**Apache**

{% highlight bash %}
SetEnv SYMFONY__APP__MAILER ${SYMFONY__APP__MAILER}
{% endhighlight %}

Inject the service dynamically based on this parameter

**config.yml** ou **services.yml**

{% highlight bash %}

parameters:
    mail_config: %app.mailer%

# Swiftmailer Configuration
services: 
    class: AppBundle\Service\MailerService
    arguments:
        mailer: "@=parameter('mail_config') == 'mailcatcher' ? service('swiftmailer.mailer.mailcatcher') : service('swiftmailer.mailer.default')"

{% endhighlight %}


## TIPS

Use a [docker container for mailcatcher](https://github.com/zolweb/docker-mailcatcher)



