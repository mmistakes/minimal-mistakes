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

## 2. The Main Bank Actor

This actor will manage all the bank accounts, which means it will be a parent of those accounts. The bank actor will be the middle layer between the HTTP server and the actual persistent bank accounts, which will do the majority of the work.

```scala
object Bank {
  // our code here
}
```

The bank actor will also have to be persistent. Why? Because if the application crashes, no bank account can be magically revived. Only _after_ the accounts have been created and their persistence IDs assigned, will the bank accounts start replaying their events from Cassandra. Therefore, we'll also need to store some events here, so that if the application needs to start again, the bank actor will have the right information to start up the appropriate bank accounts.

Therefore, we'll also need to manage

1. commands
2. events
3. internal state
4. responses

Thankfully, the commands will be identical to the ones from the persistent bank accounts: creation, update, retrieval, (optionally) deletion. There's no need for us to change here. Same for the responses. Therefore, we'll import the commands and responses

```scala
import PersistentBankAccount.Command._
import PersistentBankAccount.Response._
import PersistentBankAccount.Command
```

and set up new data structures for events and state:

```scala
// events
sealed trait Event
case class BankAccountCreated(id: String) extends Event

// state
case class State(accounts: Map[String, ActorRef[Command]])
```

For events, we really only need to store the creation of the accounts so we know how to spawn the actors again. For state, we'll keep an internal map to retrieve actors by their unique identifier.

Because the bank is also a persistent actor, we'll need

1. a persistence ID
2. an empty state
3. a command handler
4. an event handler

The first two are straightforward: a `"bank"` and a `State` with an empty `Map()` should suffice.

Third: the command handler. Again, a function taking the current state and an incoming command, and returning an `Effect`. The structure will look like this:

```scala
val commandHandler: (State, Command) => Effect[Event, State] = ???
```

However, we need to be able to spawn new bank accounts in this handler, which means we'll need an `ActorContext` to do that. It's usually available when we create the final behavior of the actor, so we need to be able to pass it here, so our definition will change to

```scala
def commandHandler(context: ActorContext[Command]): (State, Command) => Effect[Event, State] = (state, command) => 
  command match {
    // continue here
  }
```

Already took the liberty of doing a pattern match on the command, which will treat all the cases, as follows:

```scala
case createCommand @ CreateBankAccount(_, _, _, _) =>
  val id = UUID.randomUUID().toString
  val newBankAccount = context.spawn(PersistentBankAccount(id), id)
  Effect
    .persist(BankAccountCreated(id))
    .thenReply(newBankAccount)(_ => createCommand)
```

If we need to create an account, we'll generate a unique identifier, spawn a bank account actor, persist the creation event so we know how to bring the actor back if necessary, then (very importantly) pass the command down to the new actor.

Further:

```scala
case updateCmd @ UpdateBalance(id, _, _, replyTo) =>
  state.accounts.get(id) match {
    case Some(account) =>
      Effect.reply(account)(updateCmd)
    case None =>
      Effect.reply(replyTo)(BankAccountBalanceUpdatedResponse(Failure(new RuntimeException("Bank account cannot be found")))) // failed account search
  }
```

If we need to add/withdraw money, we'll first need to find the account: if it's found, great &mdash; pass the command on to the account actor, if not, return a failure to whoever sent this command to the bank. Similarly for bank account retrieval:

```scala
case getCmd @ GetBankAccount(id, replyTo) =>
  state.accounts.get(id) match {
    case Some(account) =>
      Effect.reply(account)(getCmd)
    case None =>
      Effect.reply(replyTo)(GetBankAccountResponse(None)) // failed search
  }
```

That was the third item on the list.

Fourth: the event handler. In this case, we only have one event to handle, which is the bank account creation. There is only one problem:

- If the bank actor is in "active" mode, i.e. normally receiving commands, the event handler occurs after persisting the `BankAccountCreated` event, and therefore the bank account actor exists.
- If the bank actor is in recovery mode, i.e. on application start/restart, the event handler occurs after retrieving the `BankAccountCreated` event from Cassandra, and therefore the bank account actor _needs to be created here_.

These points considered, we have

```scala
def eventHandler(context: ActorContext[Command]): (State, Event) => State = (state, event) =>
  event match {
    case BankAccountCreated(id) =>
      val account = context.child(id) // exists after command handler,
        .getOrElse(context.spawn(PersistentBankAccount(id), id)) // does NOT exist in the recovery mode, so needs to be created
        .asInstanceOf[ActorRef[Command]] // harmless, it already has the right type
      state.copy(state.accounts + (id -> account))
  }
```

Then, all we need to do is to write an `apply` method which will return the appropriate bank behavior:

```scala
// behavior
def apply(): Behavior[Command] = Behaviors.setup { context =>
  EventSourcedBehavior[Command, Event, State](
    persistenceId = PersistenceId.ofUniqueId("bank"),
    emptyState = State(Map()),
    commandHandler = commandHandler(context),
    eventHandler = eventHandler(context)
  )
}
```

Amazing. Let's try this.

### 2.1. Testing the Actors

For interaction with Cassandra, we're going to need a configuration to use the Cassandra journal, so in `src/main/resources`, we'll add an `application.conf` file with the following configuration:

```properties
# Journal
akka.persistence.journal.plugin = "akka.persistence.cassandra.journal"
akka.persistence.cassandra.journal.keyspace-autocreate = true
akka.persistence.cassandra.journal.tables-autocreate = true
datastax-java-driver.advanced.reconnect-on-init = true

# Snapshot
akka.persistence.snapshot-store.plugin = "akka.persistence.cassandra.snapshot"
akka.persistence.cassandra.snapshot.keyspace-autocreate = true
akka.persistence.cassandra.snapshot.tables-autocreate = true

akka.actor.allow-java-serialization = on
```

We can of course use the Akka TestKit to test the actors, but we'll go for some live testing with some events stored in Cassandra! With the Docker container up and running &mdash; all you need is to run `docker-compose up` in the root directory &mdash; we'll write some quick application to run with the Bank actor and some creation/retrieval commands:

```scala
object BankPlayground {
  import PersistentBankAccount.Command._
  import PersistentBankAccount.Response._
  import PersistentBankAccount.Response

  def main(args: Array[String]): Unit = {
    val rootBehavior: Behavior[NotUsed] = Behaviors.setup { context =>
      val bank = context.spawn(Bank(), "bank")
      val logger = context.log

      val responseHandler = context.spawn(Behaviors.receiveMessage[Response]{
        case BankAccountCreatedResponse(id) =>
          logger.info(s"successfully created bank account $id")
          Behaviors.same
        case GetBankAccountResponse(maybeBankAccount) =>
          logger.info(s"Account details: $maybeBankAccount")
          Behaviors.same
      }, "replyHandler")

      // ask pattern
      import akka.actor.typed.scaladsl.AskPattern._
      import scala.concurrent.duration._
      implicit val timeout: Timeout = Timeout(2.seconds)
      implicit val scheduler: Scheduler = context.system.scheduler
      implicit val ec: ExecutionContext = context.executionContext

      // test 1
      //      bank ! CreateBankAccount("daniel", "USD", 10, responseHandler)
      
      // test 2
      //      bank ! GetBankAccount("replaceWithYourUuidHere", responseHandler)

      Behaviors.empty
    }

    val system = ActorSystem(rootBehavior, "BankDemo")
  }
}
```

For this live test, we're first going to send a creation message and check that there are two events in Cassandra (one from the bank and one from the account). Running this application should give us the log `successfully created bank account ...`. You can then shut down the application and run it again, this time with just the second message. A successful log with the account details proves multiple things:

- that the bank actor works
- that the account actor works
- that the bank account can successfully respawn the account
- that the account can successfully restore its state

Sure enough, we can also inspect Cassandra for the relevant events. While Cassandra is running, from another terminal we can run

```bash
docker ps
```

and look at the container name, copy it, and then run

```bash
docker exec -it akka-cassandra-demo_cassandra_1 cqlsh
```

which will open the CQL prompt for us to inspect the tables. Inside, we'll run

```sql
select * from akka.messages;
```

and lo and behold, we have messages there! The Cassandra tables were created automatically by the Akka Persistence Cassandra journal.

```text
 persistence_id                       | partition_nr | sequence_nr | timestamp                            | event                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | event_manifest | meta | meta_ser_id | meta_ser_manifest | ser_id | ser_manifest | tags | timebucket    | writer_uuid
--------------------------------------+--------------+-------------+--------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------+------+-------------+-------------------+--------+--------------+------+---------------+--------------------------------------
                                 bank |            0 |           1 | 34633920-b1ce-11ec-8405-a1782b503565 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     0xaced000573720032636f6d2e726f636b7468656a766d2e62616e6b2e6163746f72732e42616e6b2442616e6b4163636f756e74437265617465646aebebd03a53f5500200014c000269647400124c6a6176612f6c616e672f537472696e673b787074002434373166373833392d633363392d346532352d393035622d326333626533343132383437 |                | null |        null |              null |      1 |              | null | 1648825200000 | 0dd3a479-9563-488b-8b72-d259bbaf5f8f
 471f7839-c3c9-4e25-905b-2c3be3412847 |            0 |           1 | 346c87f0-b1ce-11ec-8405-a1782b503565 | 0xaced000573720043636f6d2e726f636b7468656a766d2e62616e6b2e6163746f72732e50657273697374656e7442616e6b4163636f756e742442616e6b4163636f756e744372656174656493750afb52eb6b5b0200014c000b62616e6b4163636f756e7474003e4c636f6d2f726f636b7468656a766d2f62616e6b2f6163746f72732f50657273697374656e7442616e6b4163636f756e742442616e6b4163636f756e743b78707372003c636f6d2e726f636b7468656a766d2e62616e6b2e6163746f72732e50657273697374656e7442616e6b4163636f756e742442616e6b4163636f756e74d653249c8fb35b6d02000444000762616c616e63654c000863757272656e63797400124c6a6176612f6c616e672f537472696e673b4c0002696471007e00044c00047573657271007e00047870402400000000000074000355534474002434373166373833392d633363392d346532352d393035622d32633362653334313238343774000664616e69656c |                | null |        null |              null |      1 |              | null | 1648825200000 | 4f9cea0e-13d3-403f-8574-15f19a3a5664
```

Let's move on to the HTTP server.
