---
layout: post
title:  "Elasticsearch zero downtime with FOSElasticaBundle for Symfony when reindexing"
excerpt: "FOSElasticaBundle allows zero downtime reindexing process using elasticsearch aliases. You need to set the correct configuration for your index in the Symfony config.yml file"
image: elastic_marvel_history.png
modified: "2016-02-15"
---

When using [elasticsearch](https://www.elastic.co/) or [elastic](https://www.elastic.co/),
the reindexing process must be an important task to deal with.
Indeed, this process must be done with zero downtime, and nothing visible for users.

![Elasticsearch](/images/posts/elastic.png)

Reindexing can be useful in many cases like :

* Type/mapping updates.
* New physical infrastructure with more (or less) nodes.
* Splitting an index into many others.
* Any type of cluster/nodes/indexes/configuration updates.

If you want more information, [the doc](https://www.elastic.co/blog/changing-mapping-with-zero-downtime) is very clear.

But we are going to see how to have this zero downtime with [Symfony](https://symfony.com/) and [FOSElasticaBundle](https://github.com/FriendsOfSymfony/FOSElasticaBundle).

## Elasticsearch (elastic)

To work with elasticsearch, the first thing we need, is to get/install... **elasticsearch**.
As a developer, I very often use elastic thanks to this [Vagrant box](https://github.com/ypereirareis/vagrant-elasticsearch-cluster)
or this [Dockerfile](https://github.com/ypereirareis/docker-elasticsearch-and-plugins) and container. 

**Docker**

Start the docker container:

{% highlight bash %}
docker run -d \
    -p 9200:9200 -p 9300:9300 \
        ypereirareis/docker-elk-and-plugins
{% endhighlight %}

Then access to:

* [http://localhost:9200/_cluster/health?pretty=true](http://localhost:9200/_cluster/health?pretty=true)
* [http://localhost:9200/_plugin/marvel](http://localhost:9200/_plugin/marvel)
* [http://localhost:9200/_plugin/paramedic](http://localhost:9200/_plugin/paramedic)
* [http://localhost:9200/_plugin/HQ](http://localhost:9200/_plugin/HQ)
* [http://localhost:9200/_plugin/bigdesk](http://localhost:9200/_plugin/bigdesk)
* [http://localhost:9200/_plugin/head](http://localhost:9200/_plugin/head)

**Vagrant**

Start the docker container:

{% highlight bash %}
git clone \
    git@github.com:ypereirareis/vagrant-elasticsearch-cluster.git \
        && cd vagrant-elasticsearch-cluster
...
CLUSTER_COUNT=1 vagrant up
{% endhighlight %}

Then access to (with the default IP pattern config):

* [http://10.0.0.11:9200/_plugin/marvel](http://10.0.0.11:9200/_plugin/marvel)
* [http://10.0.0.11:9200/_plugin/paramedic/](http://10.0.0.11:9200/_plugin/paramedic/)
* [http://10.0.0.11:9200/_plugin/head/](http://10.0.0.11:9200/_plugin/head/)
* [http://10.0.0.11:9200/_plugin/bigdesk](http://10.0.0.11:9200/_plugin/bigdesk)
* [http://10.0.0.11:9200/_plugin/HQ/](http://10.0.0.11:9200/_plugin/HQ/)

## FOSElasticaBundle

**Install**

{% highlight bash %}
composer require friendsofsymfony/elastica-bundle
{% endhighlight %}

...then...

{% highlight php %}
<?php
// app/AppKernel.php

// ...
class AppKernel extends Kernel
{
    public function registerBundles()
    {
        $bundles = array(
            // ...
            new FOS\ElasticaBundle\FOSElasticaBundle(),
        );

        // ...
    }
}
{% endhighlight %}

**Configuration**

The important part of the configuration is the following:

{% highlight yaml %}
fos_elastica:
    indexes:
        app:
            use_alias: true
            index_name: app_prod
{% endhighlight %}


You must define `use_alias: true` to tell FOSElasticaBundle to use an alias for your index.
This way, indexing and search queries will be performed using the alias and not the real index name.

Once the entire configuration (indexes, mapping, types,...) of your application is done, start the indexing process:

{% highlight bash %}
app/console fos:elastica:populate
{% endhighlight %}

The real index name will have the following pattern: `app_prod_YYYY-MM-DD-HHMMSS`.

![Elastic Head](/images/posts/elastic_head.png)

When the indexing process is finished we can see our `app_prod` alias on our `app_prod_2015-05-28-213059` index:

![Elastic Head](/images/posts/elastic_head_alias.png)

The alias is created at the end of the (first) indexing process.

**Zero downtime indexing**

The magic is in the fact that with FOSElasticaBundle we can start a reindexing process running the previous command again:

{% highlight bash %}
app/console fos:elastica:populate
{% endhighlight %}

The command will reindex data creating another index with another name.
And more important, the previous index still exists with our alias:

![Elastic Head](/images/posts/elastic_head_reindex.png)

At the end of the reindexing process, the command will change the target of the index,
and will destroy the previous index:

![Elastic Head](/images/posts/elastic_head_reindex_finished.png)

This is how zero downtime reindexing process is achieved with Symfony and FOSElasticaBundle.

With the [Marvel](https://www.elastic.co/products/marvel) product we can follow the process on graphs:

![Elastic Marvel](/images/posts/elastic_marvel.png)

On Marvel **Shard allocation** dashboard you can see and (re)play history, automatically or step by step.
This is really amazing :

![Elastic Marvel](/images/posts/elastic_marvel_history.png)

## Conclusion

Elasticsearch/elastic is a fantastic tool to make search easy and awesome.
Coupled with other tools (marvel, kibana, logstash,...) of the elastic company,
the possibilities are limitless.

