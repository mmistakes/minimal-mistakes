---
layout: post
title: Simple Play Websocket Server
excerpt: "A tutorial about building a simple Websocket server with Play Framework."
modified: 2015-07-09
tags: [scala, play framework, websocket]
comments: true
---

My most popular repository on GitHub is the [Simple Play Websocket Server](https://github.com/ticofab/simple-play-websocket-server), so I'm writing a little explanatory post to go with it.

I assume you have created a new Play/Scala application. There are two ways you can create a Websocket endpoint in your server:

* Processing messages with an Actor, or
* Using Play's Iteratees and Enumerators.

My example server uses both, but I personally favor the second option. Iteratees and Enumerators are more complicated than using an Actor at first glance, but they are also closer to the functional core of Play and definitely more elegant in terms of behaviors that you can achieve with it. To follow this example, you need a basic understanding of Iteratees and Enumerators.

As you have read, a WebSocket endpoint can return an `(Iteratee, Enumerator)` pair. The first example is an echo endpoint that sends back whatever it receives. Remember that each example needs the corresponding endpoint defined in you `routes` file - or a different injected router since Play 2.4.

{% highlight scala %}
{% raw %}
def wsEcho = WebSocket.using[String] {
  request => {
    var channel: Option[Concurrent.Channel[String]] = None
    val outEnumerator: Enumerator[String] = Concurrent.unicast(c => channel = Some(c))
    val inIteratee: Iteratee[String, Unit] = Iteratee.foreach[String](receivedString => {
      // send string back
      channel.foreach(_.push(receivedString))
    })
    (inIteratee, outEnumerator)
  }
}
{% endraw %}
{% endhighlight %}

The most interesting thing about this snippet is the use of `Concurrent.unicast[A]`. According to the [documentation](https://www.playframework.com/documentation/2.4.x/api/scala/index.html#play.api.libs.iteratee.Concurrent$), this method returns an Enumerator coupled with an Iteratee that can be used to push stuff down it. The Enumerator is returned by `unicast`, but how do we obtain a reference to such Iteratee? It comes in the 'form' of a `Channel[A]` through the first argument of the `unicast` function: a function `Channel[A] => Unit` that you need to implement. Within such function, you can save the reference to the `Channel`, which is a structure around an Iteratee, providing methods such as `push`.

The second example shows nicely the power of the Iteratee/Enumerator pair.

{% highlight scala %}
{% raw %}
def wsTime = WebSocket.using[String] {
  request =>
    val outEnumerator: Enumerator[String] = Enumerator.repeatM(Promise.timeout(s"${new java.util.Date()}", 1000))
    val inIteratee: Iteratee[String, Unit] = Iteratee.ignore[String]
    (inIteratee, outEnumerator)
}
{% endraw %}
{% endhighlight %}

Here, we use the 'static' method `repeatM[A]` to indefinitely repeat a function returning a `Future[A]`. In the example, we send once a second the current timestamp down the channel, like a ticking clock, and at the same time we ignore any incoming messages. There are of course ways to achieve the same logic using an Actor handler, but I prefer the simplicity and conciseness of this approach.

Another interesting example is the one using files:

{% highlight scala %}
{% raw %}
def wsFromFile = WebSocket.using[Array[Byte]] {
  request =>
    val file: File = new File("test.txt")
    val outEnumerator = Enumerator.fromFile(file)
    (Iteratee.ignore[Array[Byte]], outEnumerator.andThen(Enumerator.eof))
}
{% endraw %}
{% endhighlight %}

The 'static' Enumerator Object has a `fromFile` method to return an Enumerator that uses the content of a file as a source of data to stream. We push the file contents down the pipe and then close the connection chaining the special `Enumerator.eof` to close the WebSocket connection.

Follows an example with an Actor as handler. It's little more than the official documentation example:

{% highlight scala %}
{% raw %}
class EchoWebSocketActor(out: ActorRef) extends Actor {
  def receive = {
    case msg: String =>
      if (msg == "goodbye") self ! PoisonPill
      else out ! ("I received your message: " + msg)
  }
}

object EchoWebSocketActor {
  def props(out: ActorRef) = Props(new EchoWebSocketActor(out))
}

def wsWithActor = WebSocket.acceptWithActor[String, String] {
  request =>
    out => {
      Logger.info("wsWithActor, client connected")
      EchoWebSocketActor.props(out)
    }
}
{% endraw %}
{% endhighlight %}

The EchoWebSocketActor receives as message any string that the client pushes up, and it tosses messages back to the client by sending a string as a message (`!`) to the system-generated actor `out`. With respect to the official documentation, the only added twist is that upon receiving "goodbye", the actor commits suicide, hence closing the WebSocket connection.

Finally, an example that interacts a little more with the outside world:

{% highlight scala %}
{% raw %}
def wsWeatherIntervals = WebSocket.using[String] {
  request =>
    val url = "http://api.openweathermap.org/data/2.5/weather?q=Amsterdam,nl"
    val outEnumerator = Enumerator.repeatM[String]({
      Thread.sleep(3000)
      ws.url(url).get().map(r => s"${new java.util.Date()}\n ${r.body}")
    })

    (Iteratee.ignore[String], outEnumerator)
}
{% endraw %}
{% endhighlight %}

This WebSocket connection ignores any input sent over by the connected client, but pushes down weather updates in Amsterdam, NL by proxying the OpenWeather API every 3 seconds. Only useful for serious weather freaks, the cool thing here is that all the proxying happens asynchronously. A responsive heaven!

All the code plus nothing more is available at the [Simple Play Websocket Server](https://github.com/ticofab/simple-play-websocket-server) repository on GitHub.
