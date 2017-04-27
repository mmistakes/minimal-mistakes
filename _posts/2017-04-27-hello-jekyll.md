---
title: Hello Jekyll
description: Showing what's possible with Jekyll
categories: blog
---

# H1 Header
## H2 Header
### H3
###### H6

> Blockquote
> > Nested blockquote
>

### Code snippet

{% highlight python %}
def foo
    print('foo')
end
{% endhighlight %}

Alternatively,

`print('Hello Jekyll!')

~~~ ruby
def what?
    42
end
~~~
### Math equation

\\(mathbf{y} = A \mathbf{x} \\)



### Link to posts

{::comment}
[Name of link]{{ site.baseurl }}{% post_url 2017-04-21-name-of-post %}
{::/comment}