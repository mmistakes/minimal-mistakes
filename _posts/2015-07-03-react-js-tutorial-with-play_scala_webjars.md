---
layout: post
title: ReactJS Tutorial with Play, Scala and WebJars.
excerpt: "The official ReactJS tutorial implemented with Play Framework, using Scala and WebJars."
modified: 2015-07-03
tags: [scala, webjars, play framework, reactjs]
comments: true
---

*This tutorial goes in combination with the Facebook [introduction tutorial](https://facebook.github.io/react/docs/tutorial.html) on React.js. The code of this project is available [here on GitHub](https://github.com/ticofab/play-scala-webjars-react).*

I do mostly backend & mobile development, but am very interested in the direction the web is going. I decided to follow the basic [React tutorial](https://facebook.github.io/react/docs/tutorial.html) from Facebook and implement it using [Play Framework](https://www.playframework.com) and, most crucially, [WebJars](http://www.webjars.org). It took me quite a few hours to get the whole thing working together, so I'm now writing about hoping to help someone else.

WebJars are client-side libraries packaged into JAR files, ready to be included in any JVM based project. They are available on Maven and therefore accessible via most build tools such as Maven, Gradle or SBT. The Play Framework offers support for WebJars, but getting it all to work wasn't as smooth. Let's go!

First of all, setup a new basic Play application using Activator:

{% highlight html %}
{% raw %}
activator new <your-app-name>
{% endraw %}
{% endhighlight %}

Choose `play-scala` as starting point and fire up your development tools. I personally favor IntelliJ with the Scala plugin, which allows you to import the project from an external SBT module.

The first thing you want to do with a view on using WebJars is import the [webjars-play](http://www.webjars.org/documentation) helper library in your `build.sbt`:

{% highlight html %}
{% raw %}
org.webjars" %% "webjars-play" % "2.4.0-1
{% endraw %}
{% endhighlight %}

I found it very helpful as it allows you to dynamically locate the libraries you will import. To use this feature, you need to add a new line to your `routes` file:

{% highlight html %}
{% raw %}
GET     /webjars/*file                    controllers.WebJarAssets.at(file)
{% endraw %}
{% endhighlight %}

At this point we're ready to import React in our `build.sbt` file. As simple as adding

{% highlight html %}
{% raw %}
org.webjars" % "react" % "0.13.3"
{% endraw %}
{% endhighlight %}

React recommends writing your code in [JSX](https://jsx.github.io), which is an abstraction of Javascript. It is statically typed and mostly type-safe. JSX code is then precompiled to Javascript and ran as any other .js file. If you don't the precompilation on your server, it will be automagically done in the browser, but this will lead to the runtime warning. In order to enable this precompilation, we need to include the [sbt-react](https://github.com/ddispaltro/sbt-reactjs) plugin to our project. Open the file `plugins.sbt` in your `project` folder and add

{% highlight html %}
{% raw %}
addSbtPlugin("com.github.ddispaltro" % "sbt-reactjs" % "0.5.0")
{% endraw %}
{% endhighlight %}

Go back to `build.sbt` and enable the `SbtWeb` plugin by adding it next to the Play plugin:

{% highlight html %}
{% raw %}
lazy val root = (project in file(".")).enablePlugins(PlayScala, SbtWeb)
{% endraw %}
{% endhighlight %}

**Note**: after changes in `build.sbt` or `plugins.sbt`, you most likely need to close and rebuild the project from command line: launch `activator` in the project folder and then `clean` and `compile`.

Now we're all set to start following the Facebook tutorial. Create your own view in the `views` package or modify the existing `index.scala.html`. Whichever you choose, add the `react.js` and `JSXTransformer.js` libraries. It should look like this:

{% highlight html %}
{% raw %}
<!DOCTYPE html>
<html>
<head>
    <script type='text/javascript' src='@routes.WebJarAssets.at(WebJarAssets.fullPath("react", "react.js"))'></script>
    <script type='text/javascript' src='@routes.WebJarAssets.at(WebJarAssets.locate("JSXTransformer.js"))'></script>
</head>
<body>
    <div id="content"></div>
</body>
</html>
{% endraw %}
{% endhighlight %}

Note the `.fullpath` call in the `react` inclusion. This is needed as there are two instances of `react.js` in the React library, so we need to specify its position to the locator; see [this question](http://stackoverflow.com/questions/28347769/why-cant-i-access-the-file-react-js-from-the-react-0-12-2-webjar) on StackOverflow. As my personal advice, be careful to use single quotes in the `<script>` tags: using double quotes might mess up your paths.

When it will be time to create your JSX file, create a new package `assets` inside the package `app` and a package `javascripts` under `assets`. That's where you'll store the JSX file you will reference from your HTML file. I called it `reactTest.jsx` (note the `.jsx` extension, marking that it's written in JSX), but from the point of view of the html file, you need to consider the translation to javascript. Therefore, our inclusion will be

{% highlight html %}
{% raw %}
<script type='text/javascript' src='@routes.Assets.versioned("javascripts/reactTest.js")'></script>
{% endraw %}
{% endhighlight %}

and not, for instance

{% highlight html %}
{% raw %}
<script type='text/jsx' src='@routes.Assets.versioned("javascripts/reactTest.jsx")'></script>
{% endraw %}
{% endhighlight %}

Also, you will need to include this file after the definition of your "content" `div`. This is because the content of such script will resolve directly in DOM elements. Including this file in the `<head>` section would reault in an error at runtime. Our `<body>` will look like this:

{% highlight html %}
{% raw %}
<body>
    <div id="content"></div>
    <script type='text/javascript' src='@routes.Assets.versioned("javascripts/reactTest.js")'></script>
</body>
{% endraw %}
{% endhighlight %}

Proceed with the tutorial. Don't forget to `run` your server in between steps to check how it is going!

At some point, the tutorial will point you to the `marked.js` library, which is able to parse MarkDown straight from your Javascript (JSX) file. Nothing easier, now that we know how to work with WebJars. In order to find if there is a WebJar available, check directly on the WebJar website. After finding out that it's there, include it into your `build.sbt` file:

{% highlight html %}
{% raw %}
org.webjars" % "marked" % "0.3.2"
{% endraw %}
{% endhighlight %}

and reference it from your HTML file as

{% highlight html %}
{% raw %}
<script type='text/javascript' src='@routes.WebJarAssets.at(WebJarAssets.locate("marked.js"))'></script>
{% endraw %}
{% endhighlight %}

As you go through, at some point it will ask you to generate content from a server. We're working with Play, so again: nothing easier! Add an endpoint in the `routes` file

{% highlight html %}
{% raw %}
GET     /comments                   controllers.Application.comments
{% endraw %}
{% endhighlight %}

and the corresponding data source and endpoint in `Application.scala`:

{% highlight javascript %}
{% raw %}
// Initialise the comments list
var commentsJson: JsArray = Json.arr(
  Json.obj(JSON_KEY_AUTHOR -> "Pete Hunt", JSON_KEY_TEXT -> "This is one comment"),
  Json.obj(JSON_KEY_AUTHOR -> "Jordan Walke", JSON_KEY_TEXT -> "This is *another* comment")
)

// Returns the comments list
def comments = Action {
  Ok(commentsJson)
}
{% endraw %}
{% endhighlight %}

This is also when you are required to reference jQuery. Like for the other libraries, add to your `build.sbt` file

{% highlight html %}
{% raw %}
"org.webjars" % "jquery" % "2.1.4"
{% endraw %}
{% endhighlight %}

and to the HTML file the following:

{% highlight html %}
{% raw %}
<script type='text/javascript' src='@routes.WebJarAssets.at(WebJarAssets.locate("jquery.js"))'></script>
{% endraw %}
{% endhighlight %}

From your JSX code, point here when this data is needed. Assuming you're running locally, the url will be `http://localhost:9000/comments`. Later on, when you'll need to implement the server-side logic to add a comment to the list, you can create an endpoint like this

{% highlight html %}
{% raw %}
POST    /comment                    controllers.Application.comment(author, text)
{% endraw %}
{% endhighlight %}

and the code in `Application.scala`:

{% highlight javascript %}
{% raw %}
// Adds a new comment to the list and returns it
def comment(author: String, text: String) = Action {
  val newComment = Json.obj(
    JSON_KEY_AUTHOR -> author,
    JSON_KEY_TEXT -> text)
  commentsJson = commentsJson :+ newComment
  Ok(newComment)
}
{% endraw %}
{% endhighlight %}

The Ajax call to this from your JS file will look like this:

{% highlight javascript %}
{% raw %}
var commentUrl = "http://localhost:9000/comment?author=" + author + "&text=" + text;
$.ajax({
  url: commentUrl,
  method: 'POST',
  dataType: 'json',
  cache: false,
  success: function(data) {
    console.log(data)
  }.bind(this),
  error: function(xhr, status, err) {
    console.error(commentUrl, status, err.toString());
  }.bind(this)
});
{% endraw %}
{% endhighlight %}

Finish the tutorial and your service will be complete. Modular and reactive like never before! The code for this project is available here on [GitHub](https://github.com/ticofab/play-scala-webjars-react).
