---
title: "How To Connect and Query Relational Databases in Scala Using Slick"
header: 
  og_image: /images/scala-db.png
tags: [databases, scala, how-to]
excerpt: "We will look at how to interact with relational databases in Scala projects using Slick."
---

It is sometimes required to persist the state of different entities when running computer programs, such as the names of account holders in a bank, the list of products in an e-commerce site, etc. What happens when there is a loss of power to the system? The stored data becomes either inconsistent or unavailable, and very unpleasant for real-world use, hence the need for databases. Databases are useful when building modern applications due to their ability to store business data and provide them when needed.

Most modern programming languages provide tools, libraries, or frameworks for developers to build applications that can connect and interact with databases, and Scala is no exception. The Scala ecosystem has different libraries for performing these tasks, such as Slick, Doobie, and Quill. Other JVM libraries like Hibernate and Java JDBC can also be used due to Java’s interoperability with Scala.

We will look at how to interact with relational databases in Scala projects using Slick.

## What is Slick?
According to the [Slick website](http://scala-slick.org/),

“Slick - a functional relational mapping for Scala - is a modern database query and access library for Scala. It allows you to work with stored data almost as if you were using Scala collections while at the same time giving you full control over when a database access happens and which data is transferred.”

With Slick, it is possible to write database queries in Scala using the knowledge of Scala’s collection methods like map, flatMap, filter, etc.

## Example data model and db initialization
We will be creating a sample that models a simple e-commerce entity w/out carts having three(3) models - `User`, `Order`, `Product`. In Scala, a case class can be used to model these entities.

```scala
case class Customer(id: Option[Int], name: String)

case class Product(id: Option[Int], name: String, price: Double)

case class Order(id: Option[Int], customerId: Int, productId: Int, quantity: Int, checkedOut: Boolean)
```

We will be using a Postgres database to perform the test. The database can be initialized using Slick directly or using a database migration tool. We will be making use of the latter as it helps decouple the database model from the application code. We will be using [Flyway](https://flywaydb.org/) to achieve this.

Below is a snippet of the SQL scripts for creating the database tables and inserting some data.
```sql
CREATE TABLE CUSTOMERS(
  id SERIAL UNIQUE,
  name TEXT NOT NULL
);

CREATE TABLE PRODUCTS(
  id SERIAL UNIQUE,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL
);

------

-- insert sample customer and product
INSERT INTO CUSTOMERS(id, name) VALUES (1, 'Michael M.'), (2, 'Demo Customer');
INSERT INTO PRODUCTS(id, name, price) VALUES
 (1, 'Google Pixel-4', 250.0),
 (2, 'Dish Washer', 150.0),
 (3, 'Office Chair', 50);
 
```
The complete SQL script can be found on [GitHub](https://github.com/mustaphamichael/slick-basics/blob/main/src/main/resources/db/migration/V1__ddl_scripts.sql).

## Connecting to the database
##### Add dependency
We will make use of the sbt (Scala Build Tool) to add the Slick dependency to the project.

```scala
val SlickVersion = "3.3.3"
val PostgresVersion = "42.2.18"

libraryDependencies ++= Seq(
  "com.typesafe.slick"   %% "slick"               % SlickVersion,
  "org.postgresql"        % "postgresql"          % PostgresVersion
)
```

##### Configuration
We will connect to the database using a JDBC URL.
```scala
// change database parameters as required
val url = "jdbc:postgresql://localhost:5432/slick-basics"
val user = "postgres"
val password = "password"
val driver = "org.postgresql.Driver"

val db =
    slick.jdbc.JdbcBackend.Database.forURL(url, user, password, driver = driver)
```
The database instance will be used to run the Slick and SQL queries.

NB: The Typesafe config and other methods can also be used to connect to the database. Check out the [documentation](https://scala-slick.org/doc/3.3.3/database.html).

## Map each model to the database table and columns
The database mapping provides the Schema of the table and is different from the case class models written earlier. It describes the name of the table and columns as specified in the database. This provides a **TableQuery** that performs different database transactions.

```scala
class Customers(tag: Tag) extends Table[Customer](tag, "customers") {
    def id = column[Int]("id", O.AutoInc)
    def name = column[String]("name")

    def * = (id.?, name) <> (Customer.tupled, Customer.unapply)
}
lazy val customers = TableQuery[Customers]

class Products(tag: Tag) extends Table[Product](tag, "products") {
    def id = column[Int]("id", O.AutoInc)
    def name = column[String]("name")
    def price = column[Double]("price")

    def * = (id.?, name, price) <> (Product.tupled, Product.unapply)
}
lazy val products = TableQuery[Products]

class Orders(tag: Tag) extends Table[Order](tag, "orders") {
  ...
}
```

Each column has a Scala type and a column name for the database. For example, the **id** column is of type **Int** and labeled as **“id”**.

The **O.AutoInc** option marks the column as an auto-incrementing key.

Every table requires a **`*`** method containing the default projection. This is what is returned when you query an entire row in a table - `SELECT * FROM table`.

The **<>** operator maps the projection to a custom type - a case class in this scenario. The unapply method on a case class returns an `Option[Tuple[_]]` type, so `Customer.unapply` will return `Option[(Int, String)]`.
Check the [documentation](https://scala-slick.org/doc/3.3.3/schemas.html) for a more detailed explanation of Slick schemas.

## Perform the actions/queries
The TableQuery variables created in the previous section will be used to perform the queries.

1. Create an order using pre-existing data from the customer and product table.
```scala
// place an order for customer, Michael M.(id = 1) buying 3 Google Pixel-4 phones (id = 1)
val newOrder = Order(id = None, customerId = 1, productId = 1, quantity = 3, checkedOut = false)
val query = orders += newOrder
db.run(query) //Future[Int]
```
This returns the number of inserted rows in the Order table.

2. Insert multiple orders in the Order table.
```scala
val newOrders = Seq(
  Order(None, 1, 2, 5, checkedOut = false), // Michael M. buying 5 Dish washer
  Order(None, 2, 3, 1, checkedOut = false), // Demo customer buying 1 Office chair
  Order(None, 1, 1, 1, checkedOut = true) // Michael M. bought and paid for 1 Google Pixel-4 
)
db.run(orders ++= newOrders) //Future[Option[Int]]
```
Returns an optional number of rows created.

3. Get a list of unpaid orders for for a single customer
```scala
val customerId: Int = ???
val query =
  orders
    .filter(order => order.customerId === customerId && !order.checkedOut)
    .result
db.run(query) //Future[Seq[Order]]
```
The `filter` method is equivalent to a SQL *`WHERE`* clause.

4. Update the price of a product
```scala
val productId: Int = ???
val newPrice: Double = ???
val query =
  products.filter(_.id === productId).map(_.price).update(newPrice)
db.run(query) //Future[Int]
```
Returns the number of rows updated.

5. Fetch a detailed list of orders returning the `order_id`, `customer_name`, `product_name`, `quantity`, `total_price`, and `checked_out` status.
We can achieve this using SQL `JOINS` which Slick provides using Scala `for comprehension` or a mixture of `flatMap`, `map `and `filter`.

```scala
case class OrderReport(id: Int, customer: String, product: String, quantity: Int, totalPrice: Double, checkedOut: Boolean)

// a user-defined function for multiplying two numeric columns
val multiply = SimpleBinaryOperator.apply[Double]("*")

val query = for {
  order <- orders
  customer <- customers if customer.id === order.customerId
  product <- products if product.id === order.productId
} yield
  (
    order.id,
    customer.name,
    product.name,
    order.quantity,
    multiply(order.quantity, product.price),
    order.checkedOut
  )
db.run(query.result.map(_.map(OrderReport.tupled))) //Future[Seq[OrderReport]]
```
The *`multiply`* value provides a means of multiply the values of two columns using Slick's [user-defined features](https://scala-slick.org/doc/3.3.3/userdefined.html).

Mapping the query operates on the result that is read from the database and converts the tuple into a *`OrderReport`* case class instance.

### Writing SQL statements in Slick
Slick also supports writing SQL statements to make queries to the database, which can be beneficial when writing complex queries using joins and other functions.

Here is an example of fetching a list of orders equivalent to example 5 above.

```scala
implicit val orderResult: GetResult[OrderReport] = ???

val query =
  sql"""SELECT ord.id, cus.name, pro.name, ord.quantity, ord.quantity * pro.price AS total_price, ord.checked_out
        FROM orders ord
        JOIN customers cus ON cus.id = ord.customer_id 
        JOIN products pro ON pro.id = ord.product_id""".as[OrderReport]
db.run(query) // Future[Vector[OrderReport]]

//Sample response
/** Vector(
      OrderReport(1, Michael M., Google Pixel-4, 3, 750.0, false),
      OrderReport(2, Demo Customer, Office Chair, 1, 50.0, false),
      OrderReport(3, Michael M., Google Pixel-4, 1, 250.0, true)
    )
  */
```
The result is returned as an instance of `OrderReport` instead of a Tuple. The implicit `GetResult` parameter is required to extract the data of requested type from a result set.

Add this line to print out the SQL statement generated by a Slick query.
```scala
println(query.statements.mkString(","))
```

## Conclusion
Slick provides an easy and convenient way of connecting and interacting with databases in a type-safe approach. It also provides streaming capabilities using Reactive streams.

Access to the code can be found on [GitHub](https://github.com/mustaphamichael/slick-basics).

### References
- [Comparing Scala relational database access libraries by Adam Warski](https://softwaremill.com/comparing-scala-relational-database-access-libraries)
- [Slick Documentation](http://scala-slick.org/docs/)