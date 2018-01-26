---
layout:           single
title:            "How to Change Java Version of Maven"
date:             2018-01-25 00:00:00 -0500
categories:       IT
tag:              [macos,java,maven]
---

{% highlight shell %}
~> mvn -v
Apache Maven 3.5.0 (ff8f5e7444045639af65f6095c62210b5713f426; 2017-04-03T15:39:06-04:00)
Maven home: /usr/local/Cellar/maven/3.5.0/libexec
Java version: 1.8.0_131, vendor: Oracle Corporation
Java home: /Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "10.13.1", arch: "x86_64", family: "mac"
{% endhighlight %}

{% highlight shell %}
~> echo $JAVA_HOME

~>
{% endhighlight %}

{% highlight shell %}
~> /usr/libexec/java_home
/Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home
{% endhighlight %}

{% highlight shell %}
~> /usr/libexec/java_home -V
Matching Java Virtual Machines (2):
    1.8.0_131, x86_64:	"Java SE 8"	/Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home
    1.7.0_80, x86_64:	"Java SE 7"	/Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home

/Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home
{% endhighlight %}

{% highlight shell %}
~> echo 'export JAVA_HOME=`/usr/libexec/java_home -v "1.7*"`' >> ~/.zshrc
~> exit
{% endhighlight %}

{% highlight shell %}
~> echo $JAVA_HOME
/Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home
{% endhighlight %}

{% highlight shell %}
~> mvn -v
Apache Maven 3.5.0 (ff8f5e7444045639af65f6095c62210b5713f426; 2017-04-03T15:39:06-04:00)
Maven home: /usr/local/Cellar/maven/3.5.0/libexec
Java version: 1.7.0_80, vendor: Oracle Corporation
Java home: /Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "10.13.1", arch: "x86_64", family: "mac"
{% endhighlight %}

{% highlight shell %}
~> /usr/libexec/java_home
/Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home
{% endhighlight %}
