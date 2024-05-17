---
title: "A Scala project with Akka, Cats and Cassandra"
date: 2022-04-01
header:
    image: "https://res.cloudinary.com/riverwalk-software/image/upload/f_auto,q_auto:good,c_auto,w_1200,h_300,g_auto,ar_4.0,fl_progressive/vlfjqjardopi8yq2hjtd"
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

This section is also available on video:

{% include video id="NpGYj_Zpwsk" provider="youtube" %}

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

## 3. The HTTP Server

This section is also available on video:

{% include video id="q9psVBnMqJk" provider="youtube" %}

For this section, we're going to use Akka HTTP (obviously), and we'll use the high-level DSL. We will expose the following endpoints:

- A POST endpoint on `/bank` with a JSON payload that will create a new bank account; this will return the status of the request and the unique ID of the account in an HTTP header.
- A GET endpoint on `/bank/(an id)` which returns a JSON payload containing the details of the account identified by that ID.
- A PUT endpoint on `/bank/(an id)` with a JSON payload that will signify a withdrawal/deposit to the account; this will return a new JSON containing the new details of the account.

Under a new `BankRouter` file, we need to represent the JSON payloads of these requests. We only have two:

```scala
case class BankAccountCreationRequest(user: String, currency: String, balance: Double)
case class BankAccountUpdateRequest(currency: String, amount: Double)
```

As for responses, we already have the right data structures in the bank account definition, so we can either use them verbatim, or create new case classes with the same structure and some conversion methods to/from the responses from the bank account actor. For this article, we'll choose the former, so we'll simply

```scala
import com.rockthejvm.bank.actors.PersistentBankAccount.Response
import com.rockthejvm.bank.actors.PersistentBankAccount.Response._
```

Plus a failure response in case any request is not right:

```scala
case class FailureResponse(reason: String)
```

Awesome. Now we need to be able to automatically serialize these case classes to and from JSON, so we'll add the Circe support with the imports

```scala
import io.circe.generic.auto._
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport._
```

And along with the main import of all directives in Akka HTTP

```scala
import akka.http.scaladsl.server.Directives._
```

we can then get started with the Akka HTTP routes we'll need for the server.

### 3.1. Creating a Bank Account in the Akka HTTP Server

Starting with the first endpoint, a POST on `/bank`:

```scala
object BankRouter {
  val routes =
    pathPrefix("bank") {
      pathEndOrSingleSlash {
        post {
          // parse the payload
          entity(as[BankAccountCreationRequest]) { request =>
            /*
              TODO 1
             */
          }
        }
      }
    }
}
```

Inside, we need to do the following:

1. fetch the bank actor
2. send it a `CreateBankAccount` _command_ &mdash; note that it's different from the HTTP request
3. parse its reply
4. send back an HTTP response

First, we need the bank actor, which we don't have. We can receive it as a constructor argument to this `BankRouter`, which means we'll need to make it a class. Besides, we'll also need an `ActorSystem` to be able to run the directives, so we'll pass this one too, as an `implicit` argument, or a `using` clause in Scala 3.

```scala
// at the top
import akka.actor.typed.{ActorRef, ActorSystem}
import com.rockthejvm.bank.actors.PersistentBankAccount.Command
import com.rockthejvm.bank.actors.PersistentBankAccount.Command._

// change here
class BankRouter(bank: ActorRef[Command])(implicit system: ActorSystem[_]) {
  // same routes
}
```

For point number two, we need to convert the HTTP request into a command we can pass to the bank actor:

```scala
case class BankAccountCreationRequest(user: String, currency: String, balance: Double) {
  // added now
  def toCommand(replyTo: ActorRef[Response]): Command = CreateBankAccount(user, currency, balance, replyTo)
}
```

For point number three, we can use the bank actor to send a command and expect a reply. We'll use the ask pattern to do this.

```scala
// at the top
import akka.actor.typed.scaladsl.AskPattern._
import akka.util.Timeout
import scala.concurrent.duration._

// within BankRouter
implicit val timeout: Timeout = Timeout(5.seconds)
def createBankAccount(request: BankAccountCreationRequest): Future[Response] =
  bank.ask(replyTo => request.toCommand(replyTo))
```

The ask pattern is useful for this kind of one-off, request-response interaction. Akka will create an intermediate actor with a short lifespan, which will serve as the destination for the eventual response, and this actor will fulfill a `Future` with that response when it receives it. It is this `Future` that we can then handle in our "regular", non-actor code.

Finally, point four is our `TODO 1`:

```scala
// instead of TODO 1
onSuccess(createBankAccount(request)) {
  // send back an HTTP response
  case BankAccountCreatedResponse(id) =>
    respondWithHeader(Location(s"/bank/$id")) {
      complete(StatusCodes.Created)
    }
}
```

`onSuccess` is a directive that asynchronously waits for a Future to be completed, and once it's done, the content of the Future is subject to the function below, which needs to return another directive: in our case, we'll return an HTTP 201, and will return the URI of the bank account as a `Location` HTTP header.

### 3.2. Retrieving a Bank Account

Our routes currently look like this:

```scala
  val routes =
    pathPrefix("bank") {
      pathEndOrSingleSlash {
        post {
          // parse the payload
          entity(as[BankAccountCreationRequest]) { request =>
            onSuccess(createBankAccount(request)) {
              // send back an HTTP response
              case BankAccountCreatedResponse(id) =>
                respondWithHeader(Location(s"/bank/$id")) {
                  complete(StatusCodes.Created)
                }
            }
          }
        }
      }
    }
```

The second endpoint is a GET on `/bank/someUUID`, so we need to add another route inside `pathPrefix("bank")`:

```scala
  val routes =
    pathPrefix("bank") {
      pathEndOrSingleSlash {
        // same code
      } ~ // <-- careful with this one
        path(Segment) { id =>
          get {
            // TODO 2
          }
        }
    }
```

We need to make Akka HTTP parse the next token after `/bank` and return that token to us as the identifier of the account. Once again, we need to

1. send a command to the bank actor to retrieve the details
2. parse the response
3. send back an HTTP response

We'll follow the same pattern as before, so we'll add a method to ask the bank actor for some account details:

```scala
  def getBankAccount(id: String): Future[Response] =
    bank.ask(replyTo => GetBankAccount(id, replyTo))
```

And we'll parse the response and send back a proper HTTP response in `TODO 2`:

```scala
onSuccess(getBankAccount(id)) {
  case GetBankAccountResponse(Some(account)) =>
    complete(account)
  case GetBankAccountResponse(None) =>
    complete(StatusCodes.NotFound, FailureResponse(s"Bank account $id cannot be found."))
}
```

We complete the response with the account details passed directly as the case class instance, because the implicit marshallers will take care to serialize that instance to JSON.

### 3.3. Updating a Bank Account

Our routes now look like this:

```scala
  val routes =
    pathPrefix("bank") {
      pathEndOrSingleSlash {
        post {
          // parse the payload
          entity(as[BankAccountCreationRequest]) { request =>
            onSuccess(createBankAccount(request)) {
              // send back an HTTP response
              case BankAccountCreatedResponse(id) =>
                respondWithHeader(Location(s"/bank/$id")) {
                  complete(StatusCodes.Created)
                }
            }
          }
        }
      } ~
      path(Segment) { id =>
        get {
          onSuccess(getBankAccount(id)) {
            case GetBankAccountResponse(Some(account)) =>
              complete(account)
            case GetBankAccountResponse(None) =>
              complete(StatusCodes.NotFound, FailureResponse(s"Bank account $id cannot be found."))
          }
        }
      }
    }
```

We need to add a third endpoint, which is a PUT on the same `/bank/UUID` path, therefore:

```scala
  val routes =
    pathPrefix("bank") {
      pathEndOrSingleSlash {
        // endpoint 1
      } ~
      path(Segment) { id =>
        get {
          // endpoint 2
        } ~ // <-- watch this one
        put {
          entity(as[BankAccountUpdateRequest]) { request => // need to parse the request
            // TODO 3
          }
        }
      }
    }
```

Following the same pattern, in this endpoint we need to both parse the HTTP request's payload _and_ send back an HTTP response with a payload. So, same deal:

1. Ask the bank actor to update the bank account.
2. Expect a reply.
3. Send back an HTTP response.

Adding a method to ask the bank actor for the update:

```scala
def updateBankAccount(id: String, request: BankAccountUpdateRequest): Future[Response] =
  bank.ask(replyTo => request.toCommand(id, replyTo))
```

After that, we need to invoke this method in an `onSuccess` directive like last time, and return an HTTP response in kind:

```scala
// instead of TODO 3
onSuccess(updateBankAccount(id, request)) {
  case BankAccountBalanceUpdatedResponse(Success(account)) =>
    complete(account)
  case BankAccountBalanceUpdatedResponse(Failure(ex)) =>
    complete(StatusCodes.BadRequest, FailureResponse(s"${ex.getMessage}"))
}
```

Our routes, therefore, will turn into this:

```scala
  val routes =
    pathPrefix("bank") {
      pathEndOrSingleSlash {
        post {
          // parse the payload
          entity(as[BankAccountCreationRequest]) { request =>
            onSuccess(createBankAccount(request)) {
              // send back an HTTP response
              case BankAccountCreatedResponse(id) =>
                respondWithHeader(Location(s"/bank/$id")) {
                  complete(StatusCodes.Created)
                }
            }
          }
        }
      } ~
      path(Segment) { id =>
        get {
          onSuccess(getBankAccount(id)) {
            case GetBankAccountResponse(Some(account)) =>
              complete(account)
            case GetBankAccountResponse(None) =>
              complete(StatusCodes.NotFound, FailureResponse(s"Bank account $id cannot be found."))
          }
        } ~
        put {
          entity(as[BankAccountUpdateRequest]) { request =>
            onSuccess(updateBankAccount(id, request)) {
              case BankAccountBalanceUpdatedResponse(Success(account)) =>
                complete(account)
              case BankAccountBalanceUpdatedResponse(Failure(ex)) =>
                complete(StatusCodes.BadRequest, FailureResponse(s"${ex.getMessage}"))
            }
          }
        }
      }
    }
```

Please watch carefully where the `~` operator is present: this is an operator to chain routes. Every HTTP request is matched by the routes of the server in turn; if the HTTP request was not matched by the current route, it will try the next one through the `~` operator.

Testing time!

### 3.4. Testing the HTTP Server

Much like we did earlier with testing the entire actor interaction, we'll also create a standalone application that will spin up an `ActorSystem`, create the bank actor, and start a new HTTP server based on it.

For the `ActorSystem`, we need to be able to retrieve the `Bank` actor from inside of it, so we'll need to send it a message and expect a response:

```scala
import akka.actor.typed.{ActorRef, ActorSystem, Behavior}
import akka.actor.typed.scaladsl.Behaviors
import com.rockthejvm.bank.actors.Bank
import com.rockthejvm.bank.actors.PersistentBankAccount.Command
import akka.actor.typed.scaladsl.AskPattern._
import akka.http.scaladsl.Http
import akka.util.Timeout
import com.rockthejvm.bank.http.BankRouter

import scala.concurrent.{ExecutionContext, Future}
import scala.concurrent.duration._
import scala.util.{Success, Failure}

object BankApp {
  trait RootCommand
  case class RetrieveBankActor(replyTo: ActorRef[ActorRef[Command]]) extends RootCommand

  val rootBehavior: Behavior[RootCommand] = Behaviors.setup { context =>
    val bankActor = context.spawn(Bank(), "bank")
    Behaviors.receiveMessage {
      case RetrieveBankActor(replyTo) =>
        replyTo ! bankActor
        Behaviors.same
    }
  }

  // continue here
}
```

Starting the HTTP server based on the bank actor will need some dedicated code as well:

```scala
def startHttpServer(bank: ActorRef[Command])(implicit system: ActorSystem[_]): Unit = {
  implicit val ec: ExecutionContext = system.executionContext
  val router = new BankRouter(bank)
  val routes = router.routes

  // start the server
  val httpBindingFuture = Http().newServerAt("localhost", 8080).bind(routes)

  // manage the server binding
  httpBindingFuture.onComplete {
    case Success(binding) =>
      val address = binding.localAddress
      system.log.info(s"Server online at http://${address.getHostString}:${address.getPort}")
    case Failure(ex) =>
      system.log.error(s"Failed to bind HTTP server, because: $ex")
      system.terminate()
  }
}
```

And in the main method, we now need to bring all pieces together:

```scala
  def main(args: Array[String]): Unit = {
    implicit val system: ActorSystem[RootCommand] = ActorSystem(rootBehavior, "BankSystem")
    implicit val timeout: Timeout = Timeout(5.seconds)
    implicit val ec: ExecutionContext = system.executionContext

    // using the ask pattern again
    val bankActorFuture: Future[ActorRef[Command]] = system.ask(replyTo => RetrieveBankActor(replyTo))
    bankActorFuture.foreach(startHttpServer)
  }
```

Run the application and have fun with the endpoints now, our application should be complete!

## 4. Data Validation

This bit is optional, because the application should work at this point. However, it's worth making our mini-bank a bit more robust in the face of malformed requests, and we can do this with the Cats validation capabilities. We talk about data validation and the Validated type in detail in the [Cats course](https://rockthejvm.com/p/cats), but here we're not going to need too much.

We'll make a simple object where we'll store a generic mini-library for data validation.

```scala
import cats.data.ValidatedNel
import cats.implicits._

object Validation {
  // based on cats.Validated
  type ValidationResult[A] = ValidatedNel[ValidationFailure, A]

  // validation failures
  trait ValidationFailure {
    def errorMessage: String
  }

  // continue here
}
```

In a `ValidatedNel` (Nel = non-empty list), we always have either
- a value of type `A` (the desired value)
- a non-empty list of `ValidationFailure`s

This data type is extremely useful, because we can accumulate _multiple_ errors with an HTTP request and surface them out to the user, instead of a single generic error message.

Let's say, for instance, that we would often need to validate whether a field is present in an HTTP request, or that a numerical field satisfies some minimal properties (e.g. a bank account balance will not be negative).

```scala
// field must be present
trait Required[A] extends (A => Boolean)
// minimum value
trait Minimum[A] extends ((A, Double) => Boolean) // for numerical fields
trait MinimumAbs[A] extends ((A, Double) => Boolean) // for numerical fields
```

Let's further assume that for certain types, e.g. `Int` or `String`, we already have some instances that make sense all (or almost all) the time:

```scala
// would be `given` instances in Scala 3
implicit val requiredString: Required[String] = _.nonEmpty
implicit val minimumInt: Minimum[Int] = _ >= _
implicit val minimumDouble: Minimum[Double] = _ >= _
implicit val minimumIntAbs: MinimumAbs[Int] = Math.abs(_) >= _
implicit val minimumDoubleAbs: MinimumAbs[Double] = Math.abs(_) >= _
```

An "internal" validation API that would use these instances would look something like this:

```scala
case class EmptyField(fieldName: String) extends ValidationFailure {
  override def errorMessage = s"$fieldName is empty"
}

case class NegativeValue(fieldName: String) extends ValidationFailure {
  override def errorMessage = s"$fieldName is negative"
}

case class BelowMinimumValue(fieldName: String, min: Double) extends ValidationFailure {
  override def errorMessage = s"$fieldName is below the minimum threshold $min"
}
```

Now, in terms of something that we would offer to the outside world in terms of data validation, we can expose general APIs for every type of validation we need, in our case "required field", "above a minimum value", "above a minimum value in absolute value".

```scala
// "main" API
def validateMinimum[A: Minimum](value: A, threshold: Double, fieldName: String): ValidationResult[A] = {
  if (minimum(value, threshold)) value.validNel
  else if (threshold == 0) NegativeValue(fieldName).invalidNel
  else BelowMinimumValue(fieldName, threshold).invalidNel
}

def validateMinimumAbs[A: MinimumAbs](value: A, threshold: Double, fieldName: String): ValidationResult[A] = {
  if (minimumAbs(value, threshold)) value.validNel
  else BelowMinimumValue(fieldName, threshold).invalidNel
}

def validateRequired[A: Required](value: A, fieldName: String): ValidationResult[A] =
  if (required(value)) value.validNel
  else EmptyField(fieldName).invalidNel
```

The `validNel` and `invalidNel` are extension methods allowed by the `cats.implicits._` import, so that we can build our `ValidationResult`s more easily.

A general type class we can also expose is some sort of validator for any type, not just for those that pass certain predicates:

```scala
trait Validator[A] {
  def validate(value: A): ValidationResult[A]
}

def validateEntity[A](value: A)(implicit validator: Validator[A]): ValidationResult[A] =
  validator.validate(value)
```

We will use this type class for our HTTP requests that we need to validate, namely
- the bank account creation request
- the bank account update request

We show in the [Advanced Scala course](https://rockthejvm.com/p/advanced-scala) that when we have a single implicit behavior that makes sense for a type, we should place that implicit value in the companion of that type. In our case, we'll place the implicit type class instances in the companion objects of these requests:

```scala
import cats.implicits._

object BankAccountCreationRequest {
  implicit val validator: Validator[BankAccountCreationRequest] = new Validator[BankAccountCreationRequest] {
    override def validate(request: BankAccountCreationRequest): ValidationResult[BankAccountCreationRequest] = {
      val userValidation = validateRequired(request.user, "user")
      val currencyValidation = validateRequired(request.currency, "currency")
      val balanceValidation = validateMinimum(request.balance, 0, "balance")
        .combine(validateMinimumAbs(request.balance, 0.01, "balance"))

      (userValidation, currencyValidation, balanceValidation).mapN(BankAccountCreationRequest.apply)
    }
  }
}
```

We validate each field with the predicate that we need. Notice the use of `combine` which can aggregate multiple errors with a value, if that value invalidates both conditions. Also notice the handy use of `mapN`, which can aggregate _all_ the errors from the `Validated` instances in one convenient call. This is possible because `Validated` is an _applicative_, something we prove and deconstruct in the Cats course.

We can follow the same pattern with the bank account update request:

```scala
object BankAccountUpdateRequest {
  implicit val validator: Validator[BankAccountUpdateRequest] = new Validator[BankAccountUpdateRequest] {
    override def validate(request: BankAccountUpdateRequest): ValidationResult[BankAccountUpdateRequest] = {
      val currencyValidation = validateRequired(request.currency, "currency")
      val amountValidation = validateMinimumAbs(request.amount, 0.01, "amount")

      (currencyValidation, amountValidation).mapN(BankAccountUpdateRequest.apply)
    }
  }
}
```

And with that, we have some implicit type class instances ready for the HTTP requests that we want to check. Now, we need to introduce this validation logic in the HTTP server. Inside the `BankRouter`, we'll add a method that will

- try to validate a request based on an implicit `Validator` for that type
- if the result is valid, follow the happy path, i.e. the normal route
- if the result is invalid, return an HTTP response with a `FailureResponse` aggregating _all_ the errors tha were discovered

The method will look like this:

```scala
def validateRequest[R: Validator](request: R)(routeIfValid: Route): Route =
  validateEntity(request) match {
    case Valid(_) =>
      routeIfValid
    case Invalid(failures) =>
      complete(StatusCodes.BadRequest, FailureResponse(failures.toList.map(_.errorMessage).mkString(", ")))
  }
```

We specifically made this method curried, because we would like to wrap our existing routes with a method call, in the style of

```scala
validateRequest(req) {
  // allRoutesBelow
}
```

And this is exactly what we'll do. Right after the `entity(as[...])` calls (of which we have two), we'll insert our `validateRequest` calls:

```scala
// in endpoint 1
entity(as[BankAccountCreationRequest]) { request =>
  validateRequest(request) { // <-- added here
    onSuccess(createBankAccount(request)) {
      // send back an HTTP response
      case BankAccountCreatedResponse(id) =>
        respondWithHeader(Location(s"/bank/$id")) {
          complete(StatusCodes.Created)
        }
    }
  }
}
```

```scala
// in endpoint 3
entity(as[BankAccountUpdateRequest]) { request =>
  validateRequest(request) { // <-- added here
    onSuccess(updateBankAccount(id, request)) {
      // send HTTP response
      case BankAccountBalanceUpdatedResponse(Success(account)) =>
        complete(account)
      case BankAccountBalanceUpdatedResponse(Failure(ex)) =>
        complete(StatusCodes.BadRequest, FailureResponse(s"${ex.getMessage}"))
    }
  }
}
```

And this will conclude our data validation attempt &mdash; it doesn't _add_ new endpoints or functionality, but, as we all know as developers, surfacing descriptive error messages makes all the difference in the world. This approach was extremely simplified and there are many ways we can improve it and make it more robust while decoupled from the logic of the HTTP server itself.

At this point, you can run the application again, and have fun with the new endpoints which give you much richer information, especially if you passed the wrong kind of data inside.

## 5. Conclusion

This was a whirlwind tutorial on how to use Akka Actors, Akka Persistence, Akka HTTP, Cassandra and Cats into a bigger application. We created persistent actors, we managed them with a "root" actor, we ran an HTTP server with a sleek DSL and REST API, and we made our data validation more robust with a bit of Cats and the Validated type. We hope you had as much fun writing this application as we did.
