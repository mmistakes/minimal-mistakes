---
layout:           single
title:            "How to Change Java Home Symlink"
date:             2018-01-11 00:00:00 -0500
categories:       IT
tag:              [macos,java]
---

{% highlight shell %}
/Library/Java> ll /Library/Java/JavaVirtualMachines
total 0
drwxr-xr-x  3 root  wheel    96B Sep  6 16:47 jdk1.7.0_80.jdk
drwxr-xr-x  3 root  wheel    96B Jul 12  2017 jdk1.8.0_131.jdk
{% endhighlight %}

{% highlight shell %}
/Library/Java> ll
total 0
drwxr-xr-x  2 root  wheel    64B Jul 15  2017 Extensions
lrwxr-xr-x  1 root  wheel    64B Jul 12  2017 Home -> /Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home
drwxr-xr-x  4 root  wheel   128B Nov 12 23:48 JavaVirtualMachines
{% endhighlight %}

{% highlight shell %}
/Library/Java> sudo rm Home
{% endhighlight %}

{% highlight shell %}
/Library/Java> ll
total 0
drwxr-xr-x  2 root  wheel    64B Jul 15  2017 Extensions
drwxr-xr-x  4 root  wheel   128B Nov 12 23:48 JavaVirtualMachines
{% endhighlight %}

{% highlight shell %}
/Library/Java> sudo ln -s /Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home 
{% endhighlight %}

{% highlight shell %}
/Library/Java> ll
total 0
drwxr-xr-x  2 root  wheel    64B Jul 15  2017 Extensions
lrwxr-xr-x  1 root  wheel    63B Jan 16 16:22 Home -> /Library/Java/JavaVirtualMachines/jdk1.7.0_80.jdk/Contents/Home
drwxr-xr-x  4 root  wheel   128B Nov 12 23:48 JavaVirtualMachines
{% endhighlight %}
