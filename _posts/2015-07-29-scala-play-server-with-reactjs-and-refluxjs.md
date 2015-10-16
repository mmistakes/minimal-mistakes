---
layout: post
title: Scala Play server with ReactJS and RefluxJS
excerpt: "A simple Scala/Play server using WebJars, ReactJS and RefluxJS for the frontend."
modified: 2015-10-16
tags: [scala, play, webjars, refluxjs, reactjs]
comments: true
---

I recently implemented a Play application using ReactJS for its frontend (and [wrote a post about it](http://ticofab.io/react-js-tutorial-with-play_scala_webjars/)). The next step I needed to understand was a nice way to enable communication between components. That's how I started reading about [Flux](http://blogs.atlassian.com/2014/08/flux-architecture-step-by-step/) and a project inspired by it, [RefluxJS](https://github.com/reflux/refluxjs). I decided to give the latter a try, and here's how I patched everything together. The full project code is available [on GitHub](https://github.com/ticofab/simple-play-scala-reactjs-refluxjs-server).

First of all, setup a new basic Play application using Activator:

{% highlight html %}
{% raw %}
activator new <your-app-name>
{% endraw %}
{% endhighlight %}

Choose `play-scala` as starting point and fire up your development tools. I personally favor IntelliJ with the Scala plugin, which allows you to import the project from an external SBT module.

Next, you'll want to import ReactJS and RefluxJS in your build file. To achieve this, we'll user [WebJars](http://www.webjars.org), which are client-side libraries packaged into JAR files in order to be easily included in any JVM based project. They are available on Maven and therefore accessible via most build tools such as Maven, Gradle or SBT. The first thing you want to do with a view on using WebJars is import the [webjars-play](http://www.webjars.org/documentation) helper library in your `build.sbt`:

{% highlight html %}
{% raw %}
org.webjars" %% "webjars-play" % "2.4.0-1"
{% endraw %}
{% endhighlight %}

I found it very helpful as it allows you to dynamically locate the libraries you will import. To use this feature, you need to add a new line to your `routes` file:

{% highlight html %}
{% raw %}
GET     /webjars/*file                    controllers.WebJarAssets.at(file)
{% endraw %}
{% endhighlight %}

At this point we're ready to import ReactJS and RefluxJS in our `build.sbt` file. As simple as adding

{% highlight html %}
{% raw %}
"org.webjars" % "react" % "0.14.0",
"org.webjars" % "refluxjs" % "0.2.5"
{% endraw %}
{% endhighlight %}

React recommends writing your code in [JSX](https://jsx.github.io), which is an abstraction of Javascript. It is statically typed and mostly type-safe. JSX code is then precompiled to Javascript and ran as any other .js file. If you don't do the precompilation on your server, it will be automagically done in the browser, but this will lead to a runtime warning and performance deterioration. In order to enable the server-side precompilation, we need to include the [sbt-react](https://github.com/ddispaltro/sbt-reactjs) plugin to our project. Open the file `plugins.sbt` in your `project` folder and add

{% highlight html %}
{% raw %}
addSbtPlugin("com.github.ddispaltro" % "sbt-reactjs" % "0.5.2")
{% endraw %}
{% endhighlight %}

Go back to `build.sbt` and enable the `SbtWeb` plugin by adding it next to the Play plugin:

{% highlight html %}
{% raw %}
lazy val root = (project in file(".")).enablePlugins(PlayScala, SbtWeb)
{% endraw %}
{% endhighlight %}

**Note**: after changes in `build.sbt` or `plugins.sbt`, you most likely need to reload the project; the simplest way is to use the `reload` command from the sbt console. Otherwise, just close and rebuild the project from command line (that is, launch `activator` in the project folder and then `clean` and `compile`).

Our setup is now complete - we can start *reacting* and *refluxing*!
Create your own view in the `views` package or modify the existing `index.scala.html`. Whichever way you choose, add the `react.js` and `reflux.js` libraries. It should look like this:

{% highlight html %}
{% raw %}
<!DOCTYPE html>
<html>
<head>
    <script type='text/javascript' src='@routes.WebJarAssets.at(WebJarAssets.fullPath("react", "react.js"))'></script>
    <script type='text/javascript' src='@routes.WebJarAssets.at(WebJarAssets.locate("reflux.js"))'></script>
</head>
<body>
    <div id="content"></div>
</body>
</html>
{% endraw %}
{% endhighlight %}

Note the `.fullpath` call in the `react` inclusion. This is needed as there are two instances of `react.js` in the React library, so we need to specify its position to the locator; see [this question](http://stackoverflow.com/questions/28347769/why-cant-i-access-the-file-react-js-from-the-react-0-12-2-webjar) on StackOverflow. As my personal advice,  use single quotes in the `<script>` tags; double quotes might mess up your paths.

I often find online tutorials and examples that end up building quite complex stuff. I chose the simplest example that came to my mind: two buttons and a string telling you which button has been clicked.

![Working example screenshot](/images/2015-07-29-last-button-clicked.png)

Assuming your are already familiar with ReactJS (if not, start [here](http://facebook.github.io/react/)), the main idea behind RefluxJS is that communication between components should happen through 'listenable actions'. You could think of an event bus, but then Javascript style. The 'messages' that we can listen to are identified by labels within an `Action` object. Let's implement our first Action.

In your Play project structure, create a subfolder of `app` called `assets`. Under that, create another subfolder `javascripts` and under that create `actions`. Check the [repo](https://github.com/ticofab/simple-play-scala-reactjs-refluxjs-server) if you want to be sure. In the `actions` folder, we can create our action file, call it `clickedAction.js`. Each `Action` object can contain multiple listenable labels, but in our case it will be only one:

{% highlight javascript %}
{% raw %}
var ClickedAction = Reflux.createActions([
  'clicked'
]);
{% endraw %}
{% endhighlight %}

The entities that listen to the actions are called Stores. Under `assets/javascripts`, create the folder `stores` and in it the file `clickedStore.js`. Its content:

{% highlight javascript %}
{% raw %}
var ClickedStore = Reflux.createStore({
    listenables: [ClickedAction],
    clicked: function(n) {
      this.trigger(n);
    }
});
{% endraw %}
{% endhighlight %}

Let's check what's happening here. We're instructing this store to listen to the `ClickedAction` set of actions. Such set contains only one action, named `clicked`. Here, we create a function with the same name, that takes one parameter `n`. Inside this function, we invoke the method `trigger`, passing the parameter `n`. It will all make sense when we see the main React file and the Reflux wiring magic in action (pun not intended).

Under `assets/javascripts` create the file `reactReflux.jsx`, containing:

{% highlight javascript %}
{% raw %}
var Info = React.createClass({
  mixins: [Reflux.connect(ClickedStore, 'clickedStoreHappening')],
  render: function() {
    return (
      <h3>Last button clicked: {this.state.clickedStoreHappening}</h3>
    );
  }
});

var Button = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    ClickedAction.clicked(this.state.number);
  },
  getInitialState: function() {
    // initialising state via props is ok, according to facebook: https://goo.gl/bT4yVg
    return {number: this.props.number};
  },
  render: function() {
    return (
      <form className="clickForm" onSubmit={this.handleSubmit}>
        <input type="submit" value={"Click " + this.props.number} />
      </form>
    );
  }
});

var ButtonPage = React.createClass({
  render: function() {
    return (
      <div className="buttons">
        <Button number={1} />
        <Button number={2} />
        <Info />
      </div>
    );
  }
});

React.render(<ButtonPage />,
             document.getElementById('content'));
{% endraw %}
{% endhighlight %}

There are three main components here:

* `Button`: displays a button with a text and a number (coming from its props), and upon clicked triggers the `clicked` "label" of the `ClickedAction` Action, passing its number. This resolves in the store being notified.
* `Info`: a component that simply shows a text indicating which button has been clicked last. This is where some of the Reflux magic happens: by creating the mixin connecting the store with an arbitrary label that will end up being part of our component's state. This is achieved with the `Reflux.connect(ClickedStore, 'clickedStoreHappening')`. We effectively linked this component to the store listening to the ClickedAction actions. We give this link with the `clickedStoreHappening` label, but it could be anything. As a result, this label will be part of the state of this component. When the store gets notified of the ClickedAction.clicked, it will `trigger(n)`, and that `n` will end up in the state of the linked component (`Info`), a render will be triggered and the value of `n` will be available through `this.state.clickedStoreHappening`.
* `ButtonPage`: simple component that displays together buttons and the info text.

The file you have just created needs to be referenced in your HTML file, after the content div. Also, you will need to include the two files about the ClickedAction and ClickedStore:

{% highlight html %}
{% raw %}
<!DOCTYPE html>
<html>
  <head>
    <script type='text/javascript' src='@routes.WebJarAssets.at(WebJarAssets.fullPath("react", "react.js"))'></script>
    <script type='text/javascript' src='@routes.WebJarAssets.at(WebJarAssets.locate("reflux.js"))'></script>
    <script type='text/javascript' src='@routes.Assets.versioned("javascripts/actions/clickedAction.js")'></script>
    <script type='text/javascript' src='@routes.Assets.versioned("javascripts/stores/clickedStore.js")'></script>
  </head>
  <body>
    <div id="content"></div>
    <script type='text/javascript' src='@routes.Assets.versioned("javascripts/reactReflux.js")'></script>
  </body>
</html>
{% endraw %}
{% endhighlight %}

Run the project (`activator run` in the project folder) and point your browser to `http://localhost:9000`. You'll see how the main info is re-rendered every time you click on a button.

I know, it all feels very magic, but I think this is much better than the old mess of callbacks we were used to. Let me know if you experiment further with this.
