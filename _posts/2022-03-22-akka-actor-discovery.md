---
title: "Akka Typed: Actor Discovery"
date: 2022-03-22
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto,c_auto,g_auto,ar_4.0/vlfjqjardopi8yq2hjtd"
tags: [akka]
excerpt: "A common pattern in Akka Typed: how to find actors that are not explicitly passed around."
---

In this article, we're going to take a look at Akka Discovery, a feature that allows us to locate actors that we normally don't have access to, and that no other actors can notify us for.

We talk about discovery in the [Akka Typed](https://rockthejvm.com/akka-essentials) course, in the context of routers and work distribution. It's a pretty powerful technique. This article assumes some basic familiarity with typed actors.

If you want the video version, check below:

{% include video id="iuq-JBUiLpI" provider="youtube" %}


## 1. Introduction and Setup

We'll use the regular Akka Typed Actors library, so in your Scala project, add the following to your `build.sbt`:

```scala
val AkkaVersion = "2.6.19"
libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-actor-typed" % AkkaVersion
)
```

We assume some basics with Akka actors, but in a nutshell:

- our application is organized in terms of independent, thread-safe entities called _actors_
- we make our components/actors interact with each other by passing messages (asynchronously)
- our actors are organized in a tree-like hierarchy, where each actor is responsible for its direct children
- our actors can only receive a certain type of messages

Having worked with actors, you've probably needed to pass a reference belonging to one part of the hierarchy, to another part of the hierarchy, so that these actors can communicate and exchange data. The trouble is that managing such exchanges needlessly complicates the logic of both hierarchies/departments and mixes in business logic with management logic.

Akka Discovery is a feature that allows us to find actors that we cannot otherwise have access to. Its use cases include

- the elimination of the above example scenario, allowing us to fully focus on business logic
- locating an actor that we cannot possibly reach otherwise
- notifications of actor reference changes

For this article, we'll imagine a fictitious IOT application, where we have

- a bunch of sensors as independent actors
- a sensor controller in charge of the sensors, which sends heartbeat messages to the sensors
- a data collector/aggregator, that receives data from the sensors
- a guardian actor in charge of everyone

Whenever the sensor controller sends the heartbeat message, the sensors must all send their readings to the data aggregator. At all times, the sensors must be running, but the data aggregator might change/be swapped in the meantime. Now, for some reason (logic too complicated, data privacy, impracticability etc), the guardian actor cannot directly communicate to the sensors to update them of the data aggregator change. We need to notify them in some other way.

## 2. Creating the Actors

Considering the following imports for the entire article

```scala
import akka.NotUsed
import akka.actor.typed.receptionist.{Receptionist, ServiceKey}
import akka.actor.typed.{ActorRef, ActorSystem, Behavior}
import akka.actor.typed.scaladsl.Behaviors

import scala.concurrent.duration._
import scala.util.Random
```

we're going to sketch the main entities in our application:

```scala

// data aggregator domain
case class SensorReading(id: String, value: Double)

object DataAggregator {
  def apply(): Behavior[SensorReading] = ???
}

// sensors domain
trait SensorCommand
case object SensorHeartbeat extends SensorCommand
case class ChangeDataAggregator(agg: Option[ActorRef[SensorReading]]) extends SensorCommand
object Sensor {
  // the sensor actor
  def apply(id: String): Behavior[SensorCommand] = ???

  // the sensor aggregator
  def controller(): Behavior[NotUsed] = ???
}
```

while the main guardian would look something like this:

```scala
val guardian: Behavior[NotUsed] = Behaviors.setup { context =>
  // controller for the sensors
  context.spawn(Sensor.controller(), "controller")
  val dataAgg1 = context.spawn(DataAggregator(), "data_agg_1")
  // TODO make it "known" to the sensors that dataAgg1 is the new data aggregator
  val dataAgg2 = context.spawn(DataAggregator(), "data_agg_2")
  // TODO after 10 seconds, make it "known" to the sensors that dataAgg2 is the new data aggregator
  Behaviors.empty
}
```

and the main method

```scala
def main(args: Array[String]): Unit = {
  val system = ActorSystem(guardian, "ActorDiscovery")
  import system.executionContext
  system.scheduler.scheduleOnce(20.seconds, () => system.terminate())
}
```

The application should work as follows:

- upon starting, the sensor controller would send heartbeats every second
- with every heartbeat, the sensors would (ideally) send their sensor readings containing their id and the reading (a Double value) to the data aggregator
- upon receiving a `SensorReading`, the data aggregator would display the latest data; in real life, this would be in a graph, or feeding in a data streaming application like Flink or Spark Streaming, but here we'll simply log the data
- ideally, the sensors can "magically" find the data aggregator to send data to, published by the guardian actor
- after 10 seconds of work, the guardian transparently swaps the data aggregator with a new one
- the sensors will continue to work and push the data to the new aggregator, again, by magically being notified that the aggregator's location was changed
- after 20 seconds, the entire application will be terminated

The "magical" finding of the aggregator, as well as the notification mechanism, are the two most important components in this application.

## 3. The Akka Receptionist: Publishing

In order to find an actor under a name or identifier, it must be _registered_ by a unique identifier known as a `ServiceKey`. This is a simple data structure that is registered at the level of the actor system. After the registration is done, then the finder is able to query the actor system for all actors registered under that key, thereby retrieving their `ActorRef`s and sending them messages.

This registration is done through a special actor known as the _receptionist_. All actor systems have a receptionist, and the goal of this actor is to perform this `ServiceKey`-`ActorRef`s mapping.

For the main guardian actor to publish the fact that `dataAgg1` is the data aggregator to use, we need to define a `ServiceKey` by which we can identify the data aggregator. It's usually best practice to place the `ServiceKey` inside the object that spawns the actors to be registered. In this case, under the `DataAggregator` object:

```scala
// inside DataAggregator
val serviceKey = ServiceKey[SensorReading]("dataAggregator")
```

The `ServiceKey` must be typed with the same type as the actor that we want to register. With the `ServiceKey` in place, we can then add some TODOs in our guardian actor:

```scala
val guardian: Behavior[NotUsed] = Behaviors.setup { context =>
  // controller for the sensors
  context.spawn(Sensor.controller(), "controller")

  val dataAgg1 = context.spawn(DataAggregator(), "data_agg_1")
  // "publish" dataAgg1 is available by associating it to a key (service key)
  context.system.receptionist ! Receptionist.register(DataAggregator.serviceKey, dataAgg1)

  // change data aggregator after 10s
  Thread.sleep(10000)
  context.log.info("[guardian] Changing data aggregator")
  context.system.receptionist ! Receptionist.deregister(DataAggregator.serviceKey, dataAgg1)
  val dataAgg2 = context.spawn(DataAggregator(), "data_agg_2")
  context.system.receptionist ! Receptionist.register(DataAggregator.serviceKey, dataAgg2)

  Behaviors.empty
}
```

We send the `context.system.receptionist` some special messages to either register or deregister an actor. You can register multiple actors to the same `ServiceKey` if you want, but in this case we'll keep it to just one actor.

The protocol handled by the receptionist is pretty rich, and you can be notified when the registration is complete by listening to the `Registered` message given back by the receptionist.

## 3. The Akka Receptionist: Subscribing

The other side is a bit more involved, because we can fetch information from the receptionist in multiple ways:

- we can query the receptionist and listen back for one response
- we can _subscribe_ for updates and receive a message _every time_ the association with a `ServiceKey` was changed

We'll need to work on the `apply()` method of the `Sensor` object:

```scala
def apply(id: String): Behavior[SensorCommand] = Behaviors.setup { context =>
  // subscribe to the receptionist using the service key
  context.system.receptionist ! Receptionist.Subscribe(DataAggregator.serviceKey, ???)
}
```

We would like to be automatically notified if there is any change in the association to the `ServiceKey`. The API allows us to pass the `ServiceKey` instance in question and an actor which can handle a `Listing` message that the receptionist will send with every update.

However, because our Sensor actor is typed with `SensorCommand` and we also need to handle the listing message, we will need a message adapter. We discussed the message adapter technique in [another article](/akka-message-adapter/), so we will use it here. We will need to wrap the listing message into some other `SensorCommand` that we can handle later:

```scala
// new message
case class ChangeDataAggregator(agg: Option[ActorRef[SensorReading]]) extends SensorCommand

def apply(id: String): Behavior[SensorCommand] = Behaviors.setup { context =>
  // use a message adapter to turn a receptionist listing into a SensorCommand
  val receptionistSubscriber: ActorRef[Receptionist.Listing] = context.messageAdapter {
    case DataAggregator.serviceKey.Listing(set) => ChangeDataAggregator(set.headOption)
  }

  // subscribe to the receptionist using the service key
  context.system.receptionist ! Receptionist.Subscribe(DataAggregator.serviceKey, receptionistSubscriber)
}
```

So in the `setup` method we have subscribed to the receptionist and are able to receive its listings, transformed into `ChangeDataAggregator` messages. We now need to handle them and keep track of the data aggregator that we have on hand at the moment:

```scala
def activeSensor(id: String, aggregator: Option[ActorRef[SensorReading]]): Behavior[SensorCommand] =
  Behaviors.receiveMessage {
    case SensorHeartbeat =>
      // send the data to the aggregator
      aggregator.foreach(_ ! SensorReading(id, Random.nextDouble() * 40))
      Behaviors.same
    case ChangeDataAggregator(newAgg) =>
      // swap the aggregator for the new one
      activeSensor(id, newAgg)
  }
```

And with this message handler in place, the return value of the `apply()` method is going to be

```scala
    active(newReadings)
```

Currently, the code of the sensor actor looks like this:

```scala
object Sensor {
  def apply(id: String): Behavior[SensorCommand] = Behaviors.setup { context =>
    // use a message adapter to turn a receptionist listing into a SensorCommand
    val receptionistSubscriber: ActorRef[Receptionist.Listing] = context.messageAdapter {
      case DataAggregator.serviceKey.Listing(set) => ChangeDataAggregator(set.headOption)
    }
    // subscribe to the receptionist using the service key
    context.system.receptionist ! Receptionist.Subscribe(DataAggregator.serviceKey, receptionistSubscriber)
    activeSensor(id, None)
  }

  def activeSensor(id: String, aggregator: Option[ActorRef[SensorReading]]): Behavior[SensorCommand] =
    Behaviors.receiveMessage {
      case SensorHeartbeat =>
        aggregator.foreach(_ ! SensorReading(id, Random.nextDouble() * 40))
        Behaviors.same
      case ChangeDataAggregator(newAgg) =>
        activeSensor(id, newAgg)
    }
}
```

## 4. The Other Actors

We need to finish off the `DataAggregator` and the sensor controller. The data aggregator will keep track of all the readings received so far from all the sensors, using a ["stateless"](/stateful-stateless-actors/) approach, which we also describe in another article:

```scala
  def apply(): Behavior[SensorReading] = active(Map())
  def active(latestReadings: Map[String, Double]): Behavior[SensorReading] = Behaviors.receive { (context, reading) =>
    val id = reading.id
    val value = reading.value
    // val SensorReading(id, value) = reading
    val newReadings = latestReadings + (id -> value)
    // "display" part - in real life this would feed a graph, a data ingestion engine or processor
    context.log.info(s"[${context.self.path.name}] Latest readings: $newReadings")
    active(newReadings)
  }
```

and the sensor controller is a dumb actor which doesn't receive any messages:

```scala
  def controller(): Behavior[NotUsed] = Behaviors.setup { context =>
    val sensors = (1 to 10).map(i => context.spawn(Sensor(s"sensor_$i"), s"sensor_$i"))
    val logger = context.log // used so that we don't directly use context inside the lambda below
    // send heartbeats every second
    import context.executionContext
    context.system.scheduler.scheduleAtFixedRate(1.second, 1.second) { () =>
      logger.info("Heartbeat")
      sensors.foreach(_ ! SensorHeartbeat)
    }
    Behaviors.empty
  }
```

## 5. The Test

If we run this application, we notice that every second, the sensor controller sends the heartbeat, and by some magic &mdash; we now know how it works &mdash; the sensors automatically know where to send their data, because the aggregator picks up the readings and displays all of them every second.

After 10 seconds, the heartbeats keep running, but the logs now say `data_agg_2` &mdash; so the sensors were automatically notified that the data aggregator changed, so they simply pushed their readings elsewhere. Exactly as intended.

The entire code looks like this:

```scala
case class SensorReading(id: String, value: Double)

object DataAggregator {
  val serviceKey = ServiceKey[SensorReading]("dataAggregator")
  def apply(): Behavior[SensorReading] = active(Map())
  def active(latestReadings: Map[String, Double]): Behavior[SensorReading] = Behaviors.receive { (context, reading) =>
    val id = reading.id
    val value = reading.value
    // val SensorReading(id, value) = reading
    val newReadings = latestReadings + (id -> value)
    // "display" part
    context.log.info(s"[${context.self.path.name}] Latest readings: $newReadings")
    active(newReadings)
  }
}

// sensor section
trait SensorCommand
case object SensorHeartbeat extends SensorCommand
case class ChangeDataAggregator(agg: Option[ActorRef[SensorReading]]) extends SensorCommand

object Sensor {
  def apply(id: String): Behavior[SensorCommand] = Behaviors.setup { context =>
    // use a message adapter to turn a receptionist listing into a SensorCommand
    val receptionistSubscriber: ActorRef[Receptionist.Listing] = context.messageAdapter {
      case DataAggregator.serviceKey.Listing(set) => ChangeDataAggregator(set.headOption)
    }
    // subscribe to the receptionist using the service key
    context.system.receptionist ! Receptionist.Subscribe(DataAggregator.serviceKey, receptionistSubscriber)
    activeSensor(id, None)
  }
  def activeSensor(id: String, aggregator: Option[ActorRef[SensorReading]]): Behavior[SensorCommand] =
    Behaviors.receiveMessage {
      case SensorHeartbeat =>
        aggregator.foreach(_ ! SensorReading(id, Random.nextDouble() * 40))
        Behaviors.same
      case ChangeDataAggregator(newAgg) =>
        activeSensor(id, newAgg)
    }
  def controller(): Behavior[NotUsed] = Behaviors.setup { context =>
    val sensors = (1 to 10).map(i => context.spawn(Sensor(s"sensor_$i"), s"sensor_$i"))
    val logger = context.log
    // send heartbeats every second
    import context.executionContext
    context.system.scheduler.scheduleAtFixedRate(1.second, 1.second) { () =>
      logger.info("Heartbeat")
      sensors.foreach(_ ! SensorHeartbeat)
    }
    Behaviors.empty
  }
}

val guardian: Behavior[NotUsed] = Behaviors.setup { context =>
  // controller for the sensors
  context.spawn(Sensor.controller(), "controller")
  val dataAgg1 = context.spawn(DataAggregator(), "data_agg_1")
  // "publish" dataAgg1 is available by associating it to a key (service key)
  context.system.receptionist ! Receptionist.register(DataAggregator.serviceKey, dataAgg1)
  // change data aggregator after 10s
  Thread.sleep(10000)
  context.log.info("[guardian] Changing data aggregator")
  context.system.receptionist ! Receptionist.deregister(DataAggregator.serviceKey, dataAgg1)
  val dataAgg2 = context.spawn(DataAggregator(), "data_agg_2")
  context.system.receptionist ! Receptionist.register(DataAggregator.serviceKey, dataAgg2)
  Behaviors.empty
}

def main(args: Array[String]): Unit = {
  val system = ActorSystem(guardian, "ActorDiscovery")
  import system.executionContext
  system.scheduler.scheduleOnce(20.seconds, () => system.terminate())
}
```

## 5. Conclusion

In this article we discovered (pun) Akka Discovery, a powerful tool to find actors and use them in the situation where it's hard (or impossible) to locate the right reference for your needs. We saw where Discovery is useful, we learned how to use the actor system's receptionist to register, deregister and subscribe for updates, so that our actors can seamlessly send the right messages to the right actors.
