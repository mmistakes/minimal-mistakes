---
layout: post
title:  "Vagrant elasticsearch cluster"
excerpt: Vagrant elasticsearch cluster made easy.
tags: [vagrant, elasticsearch, cluster, vm, virtual machine]
modified: "2016-02-15"
comments: true
---

As a big fan of [elasticsearch](http://www.elasticsearch.org/), I very often use this extraordinary tool to make POCs, test applications like [logstash](http://logstash.net/) and [Kibana](http://www.elasticsearch.org/overview/kibana/), or more generally, to discover the lastest possibilities allowed by elasticsearch (percolator, aggregations, sharding, scalability,…).

But, it's often very complicated to set up a full elasticsearch cluster for a POC, a simple test or a dev environment.

![Elasticsearch](/images/posts/elastic.png)

On the other side, it's very easy to use the minimalist configuration set up by default when using elasticsearch, but it's quickly limited when we want to deal with problematics like:

- Sharding on many physical nodes (routing, filters, rack, …).
- Network cluster configuration (unicast, multicast, ip:port, …)
- Snapshot/recovery configuration
- Specific configurations (load balancer, data nodes et master nodes)
- Network failure simulation
- …

**So I decided to create a project allowing everybody who wants to experiment these kind of simulations, to do so:**

[https://github.com/ypereirareis/vagrant-elasticsearch-cluster](https://github.com/ypereirareis/vagrant-elasticsearch-cluster)

This project gives you the ability to start a cluster in seconds with a single simple bash command :


{% highlight bash %}
vagrant up

{% endhighlight %}

You should see something like:

{% highlight bash %}
$ vagrant up
Cluster size: 5
Cluster IP: 10.0.0.0
Bringing machine 'vm1' up with 'virtualbox' provider...
Bringing machine 'vm2' up with 'virtualbox' provider...
...
{% endhighlight %}

## How to start the cluster

Simply clone this repo:
[https://github.com/ypereirareis/vagrant-elasticsearch-cluster](https://github.com/ypereirareis/vagrant-elasticsearch-cluster)

And follow `README.md` file instructions.
