---
layout:           single
title:            "How to Change Java Version of a Console for Maven"
date:             2018-03-14 00:00:00 -0500
categories:       IT
tag:              [macos,java,maven,console]
---

{% highlight shell %}
~> mvn -v
Apache Maven 3.5.0 (ff8f5e7444045639af65f6095c62210b5713f426; 2017-04-03T15:39:06-04:00)
Maven home: /usr/local/Cellar/maven/3.5.0/libexec
Java version: 1.7.0_80, vendor: Oracle Corporation
Java home: /Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "10.13.3", arch: "x86_64", family: "mac"
{% endhighlight %}

{% highlight shell %}
~> export JAVA_HOME=`/usr/libexec/java_home -v "1.8.*"`
{% endhighlight %}

{% highlight shell %}
~> mvn -v
Apache Maven 3.5.0 (ff8f5e7444045639af65f6095c62210b5713f426; 2017-04-03T15:39:06-04:00)
Maven home: /usr/local/Cellar/maven/3.5.0/libexec
Java version: 1.8.0_131, vendor: Oracle Corporation
Java home: /Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "10.13.3", arch: "x86_64", family: "mac"
{% endhighlight %}
