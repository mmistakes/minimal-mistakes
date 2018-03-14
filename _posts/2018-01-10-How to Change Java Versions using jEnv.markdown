---
layout:           single
title:            "How to Change Java Versions using jEnv"
date:             2018-01-10 00:00:00 -0500
categories:       IT
tag:              [macos,java,jenv]
---

{% highlight shell %}
~> ll /Library/Java/JavaVirtualMachines
total 0
drwxr-xr-x  3 root  wheel    96B Sep  6 16:47 jdk1.7.0_80.jdk
drwxr-xr-x  3 root  wheel    96B Jul 12  2017 jdk1.8.0_131.jdk
{% endhighlight %}

{% highlight shell %}
~> java -version 
java version "1.8.0_131"
Java(TM) SE Runtime Environment (build 1.8.0_131-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.131-b11, mixed mode)
{% endhighlight %}

{% highlight shell %}
~> jenv versions                       
  system
  1.7
  1.7.0.80
  1.8
  1.8.0.131
  oracle64-1.7.0.80
* oracle64-1.8.0.131 (set by /Users/oeuser/.jenv/version)
{% endhighlight %}

{% highlight shell %}
   # To change it globally
~> jenv global oracle64-1.7.0.80       
   # Only for this directory
~> jenv local oracle64-1.7.0.80       
   # Only for this shell instance
~> jenv shell oracle64-1.7.0.80       
{% endhighlight %}

{% highlight shell %}
~> java -version
java version "1.7.0_80"
Java(TM) SE Runtime Environment (build 1.7.0_80-b15)
Java HotSpot(TM) 64-Bit Server VM (build 24.80-b11, mixed mode)
{% endhighlight %}

{% highlight shell %}
~> jenv versions                                                     
  system
  1.7
  1.7.0.80
  1.8
  1.8.0.131
* oracle64-1.7.0.80 (set by /Users/oeuser/.jenv/version)
  oracle64-1.8.0.131
{% endhighlight %}
