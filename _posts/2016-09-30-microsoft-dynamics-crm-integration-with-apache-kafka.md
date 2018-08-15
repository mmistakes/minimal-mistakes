---
title: "Applying Apache Kafka Integration in Microsoft Dynamics CRM"
description: ""
category: Microsoft Dynamics CRM
tags: [Microsoft Dynamics CRM, Integration]
---



[Apache Kafka](http://kafka.apache.org/) is a distributed streaming platform that lets you Publish and Subscribe to streams of data like a messaging system e.g. [Microsoft BizTalk Server](https://www.microsoft.com/en-us/cloud-platform/biztalk).

In this post we introduce the basics on how to use Kafka for Microsoft Dynamics CRM integration.

### Prerequisites

1. A Linux distribution to host Kafka server. The examples used here were run on [Ubuntu Desktop 14.04 LTS](http://releases.ubuntu.com/14.04/).
2. [Apache Kafka](https://www.apache.org/dyn/closer.cgi?path=/kafka/0.10.0.0/kafka_2.11-0.10.0.0.tgz) and [Apache Zookeeper](http://www.apache.org/dyn/closer.cgi/zookeeper/). Kafka depends on Zookeeper which is basically a distributed coordination service that allows us to run Kafka on a cluster of machines.
3. An Apache Kafka client: Either [kafka-net](https://www.nuget.org/packages/kafka-net/) for .NET and/or [kafka-python](https://pypi.python.org/pypi/kafka-python) for Python. An [Apache Kafka Client](https://cwiki.apache.org/confluence/display/KAFKA/Clients) e.g. kafka-net implements the Producer and Consumer APIs that allow us to publish and subscriber messages to Kafka.

### Getting Started
To setup a single-node Zookeeper server follow the [Getting Started Guide](https://zookeeper.apache.org/doc/trunk/zookeeperStarted.html). This should be a fairly straight forward procedure that takes about 30 minutes. For Kafka, follow the steps provided [here](https://kafka.apache.org/quickstart.html).

To start publishing messages we create a [Kafka topic](http://kafka.apache.org/090/documentation.html#intro_topics) which acts as a feed or message category.
On the kafka server, in the terminal, `cd` to the unzipped kafka folder and type in the following to create a Leads topic:

{% highlight bash %}
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic Leads
{% endhighlight %}  

A kafka-python consumer ingesting messages from the Leads topic can then be implemented as follows:

{% highlight python %}
import requests
from requests_ntlm import HttpNtlmAuth
from kafka import KafkaConsumer

consumer=KafkaConsumer('Leads',bootstrap_servers='localhost:9092')

for target in consumer:
    url='[Organization URI]/api/data/v8.1/leads'
    headers={'Content-Type':'application/json; charset=utf-8'}
    requests.post(url,auth=HttpNtlmAuth([UserName],[Password]),
         data=target, headers=headers)
{% endhighlight %}

`consumer` provides an Iterator object over which messages from the `Leads` topic are continuously produced. The code then takes each message and attempts to create a lead by passing it to the Dynamics CRM Web API in the `target` object.
For simplicity this code leaves out any validation of the message and assumes it is well-formed json.

With our consumer started we can initialize a Kafka producer which will generate the Lead messages:  

{% highlight bash %}
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic Leads
{'lastname':'Bourne','firstname':'Jason','topic':'Sample lead topic here.'}
{% endhighlight%}

Note that we are using the command line producer that comes with Apache Kafka to produce the messages. 

At this point we have passed the Lead, `Jason Bourne`, to Kafka server and our consumer which is subscribed to the Leads topic has received the lead object and created it in CRM. 
Alternatively, instead of using kafka-python we can create the consumer in a .NET application using [kafka-net](https://www.nuget.org/packages/kafka-net/).

For Microsoft Dynamics CRM to publish messages we place a kafka-net Producer in a Plugin or Workflow:

{% highlight c# %}
using KafkaNet;
using Newtonsoft.Json;
...
IPluginExecutionContext context = (IPluginExecutionContext)
        serviceProvider.GetService(typeof(IPluginExecutionContext));
Entity lead = (Entity)context.InputParameters["Target"];
string leadJson = JsonConvert.SerializeObject(lead);
...
var options = new KafkaOptions(new Uri("http://[kafkaserver]:9092"));
var router = new BrokerRouter(options);
var client = new Producer(router);

client.SendMessageAsync("Leads",new[]{new Message(leadJson)}).Wait();
{% endhighlight %}

In the example above we convert a lead from a CRM plugin to a json string using [Json.Net](http://www.newtonsoft.com/json). We then configure a kafka server and publish the string to the Leads topic. Too easy.

Obviously there is a bit more to Apache Kafka but I hope this makes it approachable. 