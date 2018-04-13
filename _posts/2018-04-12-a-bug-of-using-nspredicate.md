---
title:  "A bug of using NSPredicate"
date:   2018-04-12 12:41:07 +0800
---

I write following code to filter an array for containing objects by their name.

{% highlight objective_c linenos %}
// Wrong code
NSString *inputString = _textfield.stringValue;
NSString *formatString = [NSString stringWithFormat:@"filename CONTAINS [cd]'%@'", inputString];
NSPredicate *predicate = [NSPredicate predicateWithFormat:formatString];
{% endhighlight %}

When running, if user type some symbol characters in text field, like, backslash `\`, or single quote `'`, the app crashes.

> 2018-04-12 12:18:49.002632+0800 MyApp[72215:1556008] [General] An uncaught exception was raised
> 
> 2018-04-12 12:18:49.002665+0800 MyApp[72215:1556008] [General] Unable to parse the format string "filename CONTAINS [cd]'\'"

After some goggling, I find people with my same problem.

[https://stackoverflow.com/a/13757112/353927](https://stackoverflow.com/a/13757112/353927)

So, as a rule, do **NOT** format the input parameter of method `predicateWithFormat:` in advance, because in `predicateWithFormat:`, it handles some escaping issue for you.

{% highlight objective_c linenos %}
// Correct code
NSString *inputString = _textfield.stringValue;
NSPredicate *predicate = [NSPredicate predicateWithFormat:@"filename CONTAINS[cd] %@", inputString];  
{% endhighlight %}