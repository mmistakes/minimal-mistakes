---
title: "A Scala project with Akka, Cats and Cassandra"
date: 2022-04-01
header:
    image: "/images/blog cover.jpg"
tags: [akka, cassandra, cats]
excerpt: "Akka, Cats and Cassandra in a bigger Scala project integrating multiple pieces in the Scala ecosystem."
---

_This mini-project is a collaboration between me (Daniel) and [Riccardo Cardin](https://github.com/rcardin), one of the prominent Rock the JVM alumni. Big thanks to Riccardo for contributing with most of the code that ended up in this article and on camera._

This article will show you how to write a bigger project involving multiple libraries and tools in the Scala world. We're going to use:

- Akka (typed) Actors for the business logic
- Akka (typed) Persistence for event sourcing
- Cassandra for storage
- Akka HTTP for the REST API
- Cats for data validation

We're going to write a **mini-bank application**, where users can create bank accounts, retrieve their details and interact with their bank account to deposit/withdraw money.

This article assumes that you're familiar with the basics of Akka Typed, Akka HTTP and Cats. We have various articles here on the blog (with corresponding videos) that will give you the essential tools, so feel free to click on the tags at the bottom, or search here on the blog, and you'll find everything you need. For in-depth mastery we have full-blown courses, so if you're interested, you can check out

- the [Akka Typed course](https://rockthejvm.com/p/akka-essentials)
- the [Akka HTTP course](https://rockthejvm.com/p/akka-http)
- the [Cats course](https://rockthejvm.com/p/cats)

We're going to write Scala 2 in this article for library compatibility reasons, although the exact same code will work on Scala 3 as well once the libraries have been updated. We're also going to need [Docker](https://docker.com) to start a Cassandra instance.

The entire code is available [on GitHub](https://github.com/rockthejvm/akka-cassandra-demo).

## Setup

We'll start with a plain Scala SBT project. In your `build.sbt` file we'll add the necessary dependencies:

```scala
lazy val akkaHttpVersion = "10.2.8"
lazy val akkaVersion     = "2.6.9"
lazy val circeVersion    = "0.14.1"

libraryDependencies ++= Seq(
  "com.typesafe.akka" %% "akka-http"                  % akkaHttpVersion,
  "com.typesafe.akka" %% "akka-actor-typed"           % akkaVersion,
  "com.typesafe.akka" %% "akka-stream"                % akkaVersion,
  "com.typesafe.akka" %% "akka-persistence-typed"     % akkaVersion,
  "com.datastax.oss"  %  "java-driver-core"           % "4.13.0",  
  "com.typesafe.akka" %% "akka-persistence-cassandra" % "1.0.5",
  "io.circe"          %% "circe-core"                 % circeVersion,
  "io.circe"          %% "circe-generic"              % circeVersion,
  "io.circe"          %% "circe-parser"               % circeVersion,
  "de.heikoseeberger" %% "akka-http-circe"            % "1.39.2",
  "ch.qos.logback"    % "logback-classic"             % "1.2.10",

  // optional, if you want to add tests
  "com.typesafe.akka" %% "akka-http-testkit"          % akkaHttpVersion % Test,
  "com.typesafe.akka" %% "akka-actor-testkit-typed"   % akkaVersion     % Test,
  "org.scalatest"     %% "scalatest"                  % "3.2.9"         % Test
)
```

We'll also add a simple `docker-compose.yml` file to add a Cassandra service to our project:

```yaml
version: '3.8'

services:
  cassandra:
    image: cassandra:4.0.3
    ports:
      - 9042:9042
    environment:
      - CASSANDRA_CLUSTER_NAME=akka-cassandra-cluster
```

After you add the docker-compose file, you can run `docker-compose up` in the directory where you created this file (ideally in the root dir of the project). This will download the necessary images and spin up the Docker container with the Cassandra service. While it downloads/spins up, you can go forward with this article.

## The "Architecture"

This is not a production application, but we do have some moving parts.

We're going to create a mini-bank application which manages people's bank accounts. We need to support the following operations:

- creating a bank account
- retrieving current bank account details
- depositing/withdrawing money

Using Akka actors and Akka Persistence, the application will work as follows

- each bank account is a persistent actor
- all events are recorded (creation, update etc)
- all events are replayed in case of failure/restart
- one big bank (also persistent) actor manages all actors
- a HTTP server with a REST API handles requests from outside
- all events are stored in Cassandra

The "architecture" therefore looks like this:

![Akka Cassandra Mini-project architecture](/images/akka-cassandra/architecture.png)

We're going to split the work on this application in 4 parts:

1. The bank account actor, using Akka Persistence
2. The "main" bank actor, also using Akka Persistence
3. The HTTP server with its REST API, using Akka HTTP
4. The data validation, using Cats

## 1. The Bank Accounts

If you want to follow this chapter in video form, watch it below:

{% include video id="PPIPGzrc2wo" provider="youtube" %}

We're going to model bank accounts as independent, persistent actors. Each bank account will be its own actor, which will be created by the "main" bank actor either

- upon user request
- at application restart/in case of failure

This bank account actor will also take care to treat all events strictly related to it, which are

- creation
- update
- retrieval
- (optionally) deletion, which we'll leave as an exercise

So we'll start with a plain Scala object:

```scala
object PersistentBankAccount {
  // our code here
}
```

### 1.1. Data Modeling

This bank account actor will need a few pieces of data:

1. the messages it can receive &mdash; in Akka Persistence-speak they're called _commands_
2. the events it will store in Cassandra
3. the structures to manage its internal state
4. the responses it may send to the main bank actor

The commands will look as follows:

```scala
sealed trait Command
object Command {
  case class CreateBankAccount(user: String, currency: String, initialBalance: Double, replyTo: ActorRef[Response]) extends Command
  case class UpdateBalance(id: String, currency: String, amount: Double /* can be < 0*/, replyTo: ActorRef[Response]) extends Command
  case class GetBankAccount(id: String, replyTo: ActorRef[Response]) extends Command
}
```

Obviously a simplification to how a production application would look like, but for the scope of this project should be complete enough. Notice all the commands have a `replyTo: ActorRef[Response]` in them, so that this actor knows who to send the response back to.

A note: _please don't use the `Double` type to manage money_. The floating point standard cannot fully represent tenths and hundredths and can give (very) slightly incorrect results with multiplication and division in certain cases as a result. For our convenience in this project, we'll use `Double`.

In terms of _events_, we need to store just enough so that we can reestablish the state of the bank account from these events if the application crashed for whatever reason. The data structures we'll use will look like this:

```scala
trait Event
case class BankAccountCreated(bankAccount: BankAccount) extends Event
case class BalanceUpdated(amount: Double) extends Event
```

As for state, we'll simply store the identifier of the account, the user's identifier, the currency and the current amount.

```scala
case class BankAccount(id: String, user: String, currency: String, balance: Double)
```

In terms of responses, we'll match them with the appropriate commands. They will look like this:

```scala
sealed trait Response
object Response {
  case class BankAccountCreatedResponse(id: String) extends Response
  case class BankAccountBalanceUpdatedResponse(maybeBankAccount: Try[BankAccount]) extends Response
  case class GetBankAccountResponse(maybeBankAccount: Option[BankAccount]) extends Response
}
```

Notice that in the `BankAccountBalanceUpdatedResponse` class we use a `Try`, because the updating might fail for different reasons, for example:

- the id of the bank account requested might be different from this bank account's id
- the amount might be illegal, e.g. trying to withdraw more than you have

An in the `GetBankAccountResponse` we use an `Option` because there are only two answers we're considering: either there is a bank account here, or it's not.

### 1.2. The Bank Account Persistent Actor

A persistent actor is defined in terms of four things:

1. its unique persistence ID, which will be used to store data in the store and retrieve data from the store
2. its state, which can change over time
3. its message handler, aka _command_ handler
4. its _event_ handler, i.e. what the actor does after storing an event to the persistent store, or _restoring_ an event after failure

Let's take them in turn. First: the persistence ID &mdash; this one is straightforward, because the main bank actor will allocate a new UUID once it creates this actor in the first place, so we'll simply pass it on upon creation.

Second: the state. We already know which data type we'll use (`BankAccount`), so we'll simply need to pass an "empty" state upon creation. Modifying the state happens when the actor receives a message (= a command) and when the actor handles an event, which are items 3 and 4 on the above list.

Third: the command handler. This is a function that, given the current state and an incoming command, will produce an `Effect`. This `Effect` may involve sending messages, persisting items in the persistent store, changing state, or a combination of the above. The function signature is as follows:

```scala
val commandHandler: (BankAccount, Command) => Effect[Event, BankAccount] = (state, command) => // continue here
```

and we can also continue with the implementation &mdash; we can run a pattern match on the command and treat each possible message type in turn:

```scala
// continued
command match {
  case CreateBankAccount(user, currency, initialBalance, bank) =>
    val id = state.id
    Effect
      .persist(BankAccountCreated(BankAccount(id, user, currency, initialBalance))) // persisted into Cassandra
      .thenReply(bank)(_ => BankAccountCreatedResponse(id))
  // continue here
}
```

There's a lot of magic happening in these few lines. Breaking this down:

- Before this account receives any messages, it needs to be created by the bank.
- Upon creation of this account, the bank will send it a `CreateBankAccount` message.
- Upon reception of the command from the main bank actor, the account will store a `BankAccountCreated` _event_ to Cassandra.
- After storing the event, the _event handler_ will be invoked (the fourth item on the list, to be written shortly).
- The account will then reply to the bank actor with a `BankAccountCreatedResponse`.
- The bank will then surface the response to the HTTP layer, but that's none of our concern right now.

Going forward with the other cases:

```scala
// continued
case UpdateBalance(_, _, amount, bank) =>
  val newBalance = state.balance + amount
  // check here for withdrawal
  if (newBalance < 0) // illegal
    Effect.reply(bank)(BankAccountBalanceUpdatedResponse(Failure(new RuntimeException("Cannot withdraw more than available"))))
  else
    Effect
      .persist(BalanceUpdated(amount))
      .thenReply(bank)(newState => BankAccountBalanceUpdatedResponse(Success(newState)))
case GetBankAccount(_, bank) =>
  Effect.reply(bank)(GetBankAccountResponse(Some(state)))
} // closing the pattern match
```

Following the structure of the first case,

- if we attempt withdrawing more than we have available, we'll send back a response to the bank with a `Failure`
- if the balance modification was successful, persist the appropriate event and send back a successful response
- the "get" command simply responds with the current state of the account; can be improved with security checks, etc.

That was the command handler, the third item on the list.

Fourth: the event handler. This is a function which, given the current state of the actor and the event which has just been stored/restored, will return a new state of the actor. This assumes the event was successfully stored:

```scala
val eventHandler: (BankAccount, Event) => BankAccount = (state, event) =>
  event match {
    case BankAccountCreated(bankAccount) =>
      bankAccount
    case BalanceUpdated(amount) =>
      state.copy(balance = state.balance + amount)
  }
```

An important note: this same handler will be invoked both after the event is stored, and if the actor/application crashes and the actor is restarted: in such a case, the actor queries Cassandra for all events tied to its persistence ID and replays all events in sequence by invoking the `eventHandler` on each of them in turn, to recreate its latest state before crash/shutdown.

The final bit ties everything together:
```scala

def apply(id: String): Behavior[Command] =
  EventSourcedBehavior[Command, Event, BankAccount](
    persistenceId = PersistenceId.ofUniqueId(id),
    emptyState = BankAccount(id, "", "", 0.0), // unused
    commandHandler = commandHandler,
    eventHandler = eventHandler
  )
```

The complete code will look like this:

```scala
package com.rockthejvm.bank.actors

import akka.actor.typed.{ActorRef, Behavior}
import akka.persistence.typed.PersistenceId
import akka.persistence.typed.scaladsl.{Effect, EventSourcedBehavior}

import scala.util.{Failure, Success, Try}

// a single bank account
object PersistentBankAccount {

  // commands = messages
  sealed trait Command
  object Command {
    case class CreateBankAccount(user: String, currency: String, initialBalance: Double, replyTo: ActorRef[Response]) extends Command
    case class UpdateBalance(id: String, currency: String, amount: Double /* can be < 0*/, replyTo: ActorRef[Response]) extends Command
    case class GetBankAccount(id: String, replyTo: ActorRef[Response]) extends Command
  }

  // events = to persist to Cassandra
  trait Event
  case class BankAccountCreated(bankAccount: BankAccount) extends Event
  case class BalanceUpdated(amount: Double) extends Event

  // state
  case class BankAccount(id: String, user: String, currency: String, balance: Double)

  // responses
  sealed trait Response
  object Response {
    case class BankAccountCreatedResponse(id: String) extends Response
    case class BankAccountBalanceUpdatedResponse(maybeBankAccount: Try[BankAccount]) extends Response
    case class GetBankAccountResponse(maybeBankAccount: Option[BankAccount]) extends Response
  }

  import Command._
  import Response._


  val commandHandler: (BankAccount, Command) => Effect[Event, BankAccount] = (state, command) =>
    command match {
      case CreateBankAccount(user, currency, initialBalance, bank) =>
        val id = state.id
        Effect
          .persist(BankAccountCreated(BankAccount(id, user, currency, initialBalance))) // persisted into Cassandra
          .thenReply(bank)(_ => BankAccountCreatedResponse(id))
      case UpdateBalance(_, _, amount, bank) =>
        val newBalance = state.balance + amount
        // check here for withdrawal
        if (newBalance < 0) // illegal
          Effect.reply(bank)(BankAccountBalanceUpdatedResponse(Failure(new RuntimeException("Cannot withdraw more than available"))))
        else
          Effect
            .persist(BalanceUpdated(amount))
            .thenReply(bank)(newState => BankAccountBalanceUpdatedResponse(Success(newState)))
      case GetBankAccount(_, bank) =>
        Effect.reply(bank)(GetBankAccountResponse(Some(state)))
    }

  val eventHandler: (BankAccount, Event) => BankAccount = (state, event) =>
    event match {
      case BankAccountCreated(bankAccount) =>
        bankAccount
      case BalanceUpdated(amount) =>
        state.copy(balance = state.balance + amount)
    }

  def apply(id: String): Behavior[Command] =
    EventSourcedBehavior[Command, Event, BankAccount](
      persistenceId = PersistenceId.ofUniqueId(id),
      emptyState = BankAccount(id, "", "", 0.0), // unused
      commandHandler = commandHandler,
      eventHandler = eventHandler
    )
}
```


