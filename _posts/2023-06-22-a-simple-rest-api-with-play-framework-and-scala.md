---
title: "Simple REST Api using Play Framework and Scala"
date: 2023-06-20
header:
    image: "/images/blog cover.jpg"
tags: [akka,Play,rest-api,scala]
excerpt: "Common practises on creating a simple REST api using Play framework."
---

_by [Dimitris Tsolis](https://github.com/dimitrisre)_

## 1. Introduction

One of the simplest and well documented ways to build a web API is to follow the REST paradigm. REST APIs provide a simple and uniform way to
access data and not only through URLs, across the web.
[Play Framework](https://www.playframework.com/) "makes it easy to build web applications with Java & Scala", as it is stated on their site, and it's true. Using Akka under the hood, you get all the benefits of a Reactive system. In this article we will try to develop a basic skeleton for a REST API using Play and Scala.

## 2. Setting Up

Let's start by adding our dependency on our sbt files. 
Create a Dependencies object under the project file to accumulate all dependencies there.

```scala
import sbt._

object Dependencies{
  val playVersion = "2.8.19"

  val playFramework = "com.typesafe.play" %% "play" % playVersion
}
```

On `plugins.sbt` add the following plugins. PlayScala plugin defines default settings for Scala-based applications. 

```scala
ThisBuild / libraryDependencySchemes += "org.scala-lang.modules" %% "scala-xml" % VersionScheme.Always

addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.8.19")
addSbtPlugin("com.typesafe.sbt" % "sbt-native-packager" % "1.8.1")
```

Finally add on `build.sbt` we add our dependencies on our project
```scala
import Dependencies._
import sbt._
import Keys._

ThisBuild / version := "0.1.0-SNAPSHOT"

ThisBuild / scalaVersion := "2.13.11"

lazy val root = (project in file("."))
  .settings(
    name := "rest-play-api",
    libraryDependencies ++= Seq(playFramework)
  ).enablePlugins(PlayScala)
```

After using all this you should be ready to create the codebase for our rest api.

## 3. Basic REST Api skeleton project

The image below shows the basic folder and package structure for our project. It is organized based on each layer of concern. 

![alt "Project structure"](../images/play-rest-api/project_structure.jpeg){width=200px}

On each layer we define the data (models) and logic (managers, services) that can help us organize and follow the growth of our project and not get lost. This example is extremely simple but for the sake of completion we include all layers. As our project becomes more and more complex, these layers are becoming more useful. Below we will see each layer individually.

## 3.1 Persistence

It is the layer where we define the basic persistence entities and persistence methods. We could use any method that we want, be a database, in memory, a file, should be defined and handled on this layer.

![alt "Persistence structure"](../images/play-rest-api/persistence_structure.jpeg)

On a persistence trait we define the basic function given from our underlying persistence mechanism. Here we define the mechanism for example purposes. As we can see basic operations on a persisted dataset are defined.

```scala
package persistence

trait Persistence[A, B, C[_]]{
  val db: C[A]
  def insert(entity: A): A
  def find(id: B): Option[A]
  def update(entity: A): Unit
  def delete(id: B): Unit
  def findAll(): List[A]
}
```

Our persisted entity for this model we use a simple Car object:

```scala
package persistence.entities

case class Car(id: Long, brand: String, model: String, cc: Int)
```

and for an implementation for our persistence mechanism we use an in memory singleton object

```scala
package persistence

import persistence.entities.Car

import scala.collection.mutable.ListBuffer
import scala.util.Random

object InMemoryPersistence extends Persistence[Car, Long, ListBuffer]{
  override val db: ListBuffer[Car] = ListBuffer.empty
  val idGenerator = Random

  def insert(car: Car): Car = {
    val idx = db.indexWhere(_.id == car.id)
    val newCar = car.copy(id=idGenerator.nextLong())
    if(idx > -1) throw new RuntimeException(s"Duplicate element with id: ${car.id}")
    else db.addOne(newCar)

    newCar
  }
  def find(id: Long): Option[Car] = db.find(_.id == id)

  def update(car: Car): Unit = {
    val idx = db.indexWhere(_.id == car.id)
    if(idx > -1) db.update(idx, car)
    else throw new RuntimeException(s"No element to update with id: ${car.id}")
  }

  def delete(id: Long): Unit = {
    val idx = db.indexWhere(_.id == id)
    if(idx > -1 ) db.remove(idx)
    else throw new RuntimeException(s"No element to delete with id: ${id}")
  }

  def findAll(): List[Car] = db.toList
}
```

Close to our persistence mechanism we define our repositories, responsible for handling all the specifics for saving, retrieving etc.

```scala
package repositories

import persistence.Persistence
import persistence.entities.Car
import repositories.errors.RepositoryError

import scala.collection.mutable.ListBuffer

class CarRepository(val db: Persistence[Car, Long, ListBuffer]){
  def findById(id: Long): Either[RepositoryError, Option[Car]] = handleIfErrors(db.find(id))
  def save(car: Car): Either[RepositoryError, Car] = handleIfErrors(db.insert(car))
  def update(car: Car): Either[RepositoryError, Unit] = handleIfErrors(db.update(car))
  def delete(id: Long): Either[RepositoryError, Unit] = handleIfErrors(db.delete(id))
  def findAll(): Either[RepositoryError, List[Car]] = handleIfErrors(db.findAll())

  private def handleIfErrors[A](f: => A) = {
    try{
      Right(f)
    } catch {
      case e: RuntimeException => Left(RepositoryError(e.getMessage))
    }
  }
}
```
## 3.2 Managers
On this layer we define our managers. Usually containing logic to manage other resources like repositories, transactions, connections, security etc and contains business logic (here is too simple) of our application.
Here we define a simple manager for car entities:
![alt "Managers structure"](../images/play-rest-api/managers_structure.jpeg)
```scala
package managers

import managers.errors.ManagerError
import models.CarDTO
import repositories.CarRepository
import models.util.CarConversions._
import repositories.errors.RepositoryError

trait Manager{
  def get(id: Long): Either[ManagerError, Option[CarDTO]]
  def save(car: CarDTO): Either[ManagerError, CarDTO]
  def update(car: CarDTO): Either[ManagerError, Unit]
  def delete(car: CarDTO): Either[ManagerError, Unit]
  def getAll(): Either[ManagerError, List[CarDTO]]
}

class CarManager(repository: CarRepository) extends Manager {
  override def get(id: Long): Either[ManagerError, Option[CarDTO]] =
    repository
      .findById(id)
      .fold(error => Left(toManagerError(error)), car => Right(car.map(_.toDTO())))



  override def save(carDTO: CarDTO): Either[ManagerError, CarDTO] =
    repository
      .save(carDTO.toDB())
      .fold(error => Left(toManagerError(error)), car => Right(car.toDTO()))


  override def update(carDTO: CarDTO): Either[ManagerError, Unit] =
    repository
      .update(carDTO.toDB())
      .fold(error => Left(toManagerError(error)), _ => Right(()))

  override def delete(carDTO: CarDTO): Either[ManagerError, Unit] =
    repository
      .delete(carDTO.id.getOrElse(0L))
      .fold(error => Left(toManagerError(error)), _ => Right(()))

  override def getAll(): Either[ManagerError, List[CarDTO]] =
    repository
      .findAll()
      .fold(error => Left(toManagerError(error)), carList => Right(carList.map(_.toDTO())))

  private def toManagerError(repositoryError: RepositoryError) = ManagerError(repositoryError.message)

}
```

## 3.3 Controllers
This is the layer where we define ouρ APIs public endpoints.

```scala
package controllers

import controllers.actions.CarActions
import play.api.mvc.{BaseController, ControllerComponents, PlayBodyParsers}
import managers.CarManager
import models.CarDTO
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext

class HomeController(val carManager: CarManager, val controllerComponents: ControllerComponents)(implicit val ec: ExecutionContext)
  extends BaseController
    with CarActions{

  def get(id: Long) = Action{
    carManager
      .get(id)
      .fold(
        error => BadRequest(error.message),
        result => result.map(car => Ok(Json.toJson(car))).getOrElse(NoContent)
      )
  }

  def getAll() = Action {
    carManager
      .getAll()
      .fold(
        error => BadRequest(error.message),
        result => Ok(Json.toJson(result))
      )
  }

  def update() = Action(parse.json[CarDTO]){ implicit request =>
      carManager
      .update(request.body)
      .fold(
        error => BadRequest(error.message),
        _ => NoContent
      )
  }

  def delete(id: Long) = CarAction(id){ implicit request =>
    request.carDTO.map(car =>
    carManager
      .delete(car)
      .fold(
        error => BadRequest(error.message),
        _ => NoContent
      )
    ).getOrElse(BadRequest)
  }

  def save() = Action(parse.json[CarDTO]){ implicit request =>
    carManager
      .save(request.body)
      .fold(
        error => BadRequest(error.message),
        car => Ok(Json.toJson(car))
      )
  }

  def index() = Action{
    Ok("This is a test")
  }

  override def playBodyParsers: PlayBodyParsers = controllerComponents.parsers
}
```

We use the Action Component that is a function of type Request => Result. The component receives an http request and after we pass this through all our layers and transformations our application responts with a valid http response or a respective error code with an informative message.

We can define our own Actions throw ActionBuilders as we do with CarAction on CarActions trait.

```scala
package controllers.actions

import managers.CarManager
import models.CarDTO
import play.api.mvc.{ActionBuilder, ActionTransformer, AnyContent, BodyParser, BodyParsers, PlayBodyParsers, Request, WrappedRequest}

import scala.concurrent.{ExecutionContext, Future}

trait CarActions {
  def playBodyParsers: PlayBodyParsers
  def carManager: CarManager
  implicit val ec: ExecutionContext

  class CarRequest[A](val carDTO: Option[CarDTO], request: Request[A]) extends WrappedRequest[A](request)

  def CarAction(id: Long) = new ActionBuilder[CarRequest, AnyContent]
      with ActionTransformer[Request, CarRequest] {
    def transform[A](request: Request[A]): Future[CarRequest[A]] = {
      Future{
        carManager.get(id).fold(_ => new CarRequest(None, request), car => new CarRequest(car, request))
      }(executionContext)
    }

    override def parser: BodyParser[AnyContent] = playBodyParsers.default

    override protected def executionContext: ExecutionContext = ec
  }
}
```

This is especially useful in case we need to refine the request to our application. In this specific example we create a [WrappedRequest](https://www.playframework.com/documentation/2.8.x/api/scala/play/api/mvc/WrappedRequest.html) to add the entity information on our Request when a user passes the id on a call.
We use the [ActionBuilder](https://www.playframework.com/documentation/2.8.x/api/scala/play/api/mvc/ActionBuilder.html) to create an Action that takes a CarRequest instead of a Request. We mix in the [ActionTransformer](https://www.playframework.com/documentation/2.8.x/api/scala/play/api/mvc/ActionTransformer.html) so we can transform the Request object to a CarRequest by doing a call to our manager layer and retrieving a car DTO.

We also need to describe the correspondence between URIs and function calls on our controller. This is achieved through the routes file:
![alt "Routes structure"](../images/play-rest-api/routes_structure.jpeg)

```scala
GET     /                 controllers.HomeController.index()
GET     /car/:id          controllers.HomeController.get(id: Long)
GET     /cars             controllers.HomeController.getAll()

+ nocsrf
DELETE  /car/delete/:id    controllers.HomeController.delete(id: Long)
+ nocsrf
PUT     /car/update        controllers.HomeController.update()
+ nocsrf
POST    /car/save          controllers.HomeController.save()
```
Here we define the HTTP method for a specific URI and the method from our controllers layer that will get called when the URI is hit.

In general the Action components of Play are a very flexible way to cover from the default functionality to more advanced.

## 3.4 Application Loader
Finally we need to put all of the above together and define our main application entry.
![alt "Application Loader"](../images/play-rest-api/application_loader.jpeg)

Here we define and initialize our main entry point. Initialize all needed components like Managers, Repositories, Routers etc. and finally return an instance of our application. 

```scala
import controllers.HomeController
import managers.CarManager
import persistence.InMemoryPersistence
import play.api.mvc.EssentialFilter
import play.filters.HttpFiltersComponents
import play.api.routing.Router
import play.api.{Application, ApplicationLoader, BuiltInComponentsFromContext}
import play.filters.csrf.CSRF
import repositories.CarRepository
import router.Routes


class RestApplicationLoader extends ApplicationLoader{
  def load(context: ApplicationLoader.Context): Application = {
    val components = new RestApiComponents(context)

    components.application
  }
}

class RestApiComponents(context: ApplicationLoader.Context)
  extends BuiltInComponentsFromContext(context) with HttpFiltersComponents{

  lazy val carRepository: CarRepository = new CarRepository(InMemoryPersistence)
  lazy val carManager: CarManager = new CarManager(carRepository)
  lazy val homeController: HomeController = new HomeController(carManager, controllerComponents)
  lazy val router: Router = new Routes(httpErrorHandler, homeController, "/")

  override def httpFilters: Seq[EssentialFilter] = super.httpFilters
}
```

We could have different versions of our application and switch between them. This is achieved by the application.conf file where we define which is the main ApplicationLoader class.

```conf
play.application.loader=RestApplicationLoader

play.filters {
    enabled += "play.filters.csrf.CSRFFilter"
}
```

In this simple example we initialize all needed classes "by hand" but as the project is getting more complex we may want to switch to [Dependency Injection](https://en.wikipedia.org/wiki/Dependency_injection) framework.

## 4 Building and running the project
In order to build and run our project we start an sbt compile and run our application.

```bash
sbt compile
sbt run
```

After running sbt compile you should see something like this:

[!alt "sbt compile"](../images/play-rest-api/sbt_compile.jpeg)

After running sbt run you should see something like this:
[!alt "sbt run"](../images/play-rest-api/sbt_run.jpeg)

## 5 Conclusion
Play framework is an easy to learn framework compared to others like (Spring MVC) and uses under the hood technologies like Akka that are established, have extensive documentation and tools to debug. It is designed so you can use parts of the framework as you need, and this makes your applications lighter. It's integration with Scala is very good, but it follows a more Object oriented approach than a more functional one like http4s. You can write tests for your application using ScalaTest which for a Scala developer it is a plus.
All in all it is a fun and easy way to write from simple to more complex applications, definitely get your hands dirty with Play framework.

[Here is the code for this project](https://github.com/dimitrisre/rest-play-api)