---
layout: single
title: Consume IoT Offerings
sidebar: 
  nav: "docs"
---

Assuming, you want to create an environmental monitoring service for the city of Barcelona that should only display temperature data on a web dashboard for different places in the city. Using the BIG IoT Consumer Lib, it is very easy to make your service use the BIG IoT Marketplace to query relevant data sources and access them.

The Consumer Lib offers the following main functionalities:

* Authentication on a BIG IoT Marketplace
* Querying the Marketplace to find relevant offerings
* (Un-)Subscribing to offerings to be notified of any events regarding the offerings
* Accessing offerings

### Authentication on a BIG IoT Marketplace

To get started with the Consumer Lib, you have to create an instance of the Consumer class. The constructor requires a unique consumer ID and a marketplace URI.

To authenticate with the marketplace, you have to use the authenticate method provided by the consumer object. This method requires the marketplace API key and a consumer cer-tificate which you both received when you registered on the BIG IoT Marketplace portal.

```java
Consumer consumer = new Consumer("Barcelona_City_Example_Service", "http://localhost:8080");

/* Authenticate on the marketplace */
consumer.authenticate("DUMMY_KEY", "dummy.cert");
```

If you want to connect to a different marketplace, you just repeat the previous steps by cre-ating a new Consumer object. This way it is easy to retrieve data from an arbitrary number of BIG IoT Marketplaces.

### Creating a Query

Now that you are authenticated on the marketplace, you can find there relevant tempera-ture sensor data  to feed into your service. To do that, you query the marketplace using the OfferingQuery object. The query gets constructed using a builder pattern which first, creates the empty OfferingQuery object that is completed with additional query filters, such as a specific search region, a desired accounting type, a maximum price, etc. The mar-ketplace will later retrieve all matching offerings for this query. In this example, the query is quite simple however it can be more complex in other situations.

```java
OfferingQuery query = OfferingQuery.create(”TemperatureQuery”)
.withInformation(new Information("Temperature sensor query", "schema:temperature"))
.inRegion(Region.city("Barcelona"))
.withAccountingType(EnumTypes.AccountingType.PER_ACCESS)
.withMaxPrice(Euros.amount(0.002))
.withLicenseType(LicenseType.OPEN_DATA_LICENSE);
```

Here we create a query, that is called "TemperatureQuery". The type of offerings re-turned should be of type "schema:Temperature". The types of offerings that are available can be evaluated using the online documentation of the BIG IoT Marketplace. The query is using a region filter that selects only offerings that are provided in the city of Barcelona. Also the accounting type should be based on the number of accesses and not, for example, on a monthly fee. The price should not exceed 0.2 cents per access and the data license should be the Open Data License. The Consumer Lib offers you Enum classes that you can consult to see, which other licenses or accounting types are available.

### Querying the Marketplace

To execute the query on the marketplace, the Consumer object provides different options. The dedicated method for this is .discover\(\) and provides different signatures to take different programming preferences into account.

```java
CompletableFuture<List<OfferingDescription>> discover();
void discover(DiscoverResponseHandler onSuccess, DiscoverResponseErrorHandler onFailure);
void discover(DiscoverResponseHandler onSuccess);
```

The first variant uses a CompletableFuture as a return type which is a promise on a list of OfferingDescriptions, which is part of the functional programming styles intro-duced in Java 8. The other two variants are using callback mechanisms.

The following code shows how to discover offerings getting them as a CompletableFuture on the list of OfferingDescriptions:

```java
CompletableFuture<List<OfferingDescription>> listFuture = consumer.discover();
List<OfferingDescription> offerings = listFuture.get();
Offering concreteOffering = offerings.get(0).subscribe();
```

The .discover\(\) call is actually non-blocking. So, you could do something in between, e.g. handing over the CompletableFuture object to your management thread. Or alterna-tives, you can directly receive the list by calling the .get\(\) method. This call is blocking and will wait on the list of OfferingDescriptions. The motivation of using CompletableFuture here is, that you can come easily from an asynchronous behavior to a blocking behavior and further you can utilize reactive concepts if you want. For example by calling .thenApply\(\) as a monad on the CompletableFuture object allows you to apply functions once the list of offering Descriptions is received.

```java
listFuture.thenApply(BigHelper::showOfferingDescriptions);
```

Before you can utilize an offering, you have to subscribe on the OfferingDescription object. Subscription is done through the correspondent subscribe method which returns an Offering object. The offering object provides different access methods as described later.

You can also use callbacks for discovering offerings. Here is an example how to achieve that:

```java
query.discover((r,l)->{BigHelper.showOfferingDescriptions(l)});
```

The callback function in this example again just prints the returned offering descriptions, however usually you would provide your offering selection logic here that selects the ap-propriate offerings for your use case. The example again utilizes the functional programming features introduced in Java 8. With lambdas you can express functionality without much boilerplate code. Alternatively every other instance of  DiscoverResponseHandler  is accepted by .discover\(\).

As a side note: Of cause you can reuse your query object for subsequent queries. Only if you want to change something regarding the filtering you have to create a new OfferingQuery object.

### Accessing Offerings

Before we describe how to access an offering that was retrieved from the marketplace, it makes sense that you look at the different access concepts provided. The IOffering inter-face provides the following signatures for access:

```java
public void accessOneTime(AccessParameters parameters, 
                          AccessResponseSuccessHandler onSuccess);

public void accessOneTime(AccessParameters parameters, 
                          AccessResponseSuccessHandler onSuccess, 
                          AccessResponseFailureHandler onFailure);

public CompletableFuture<Response> accessOneTime(AccessParameters parameters);

public IAccessFeed accessContinuously(AccessParameters parameters, 
                                      Duration lifetime, 
                                      FeedNotificationSuccessHandler onSuccess, 
                                      FeedNotificationFailureHandler onFailure);
```

To access offerings, we distinguish between two types: one-time access and continuous ac-cess. One-time means that you execute an access request every time you want to get new data. Continous is the continuous reception of data as a feed.

For one-time access, the Consumer Lib supports again different programming styles. You can either use callback functions for pure asynchronous access or you can use a CompletableFuture to do reactive programming or even having a blocking call. In either case, you have to provide an AccessParameters object for the access call. In includes the parameters, which are will be passed to the platform that serves the data. Typically they are needed to filter the output or configure the access.

Here is an example, how to access the temperature offering we retrieved earlier:

```java
/* Create a hashmap to hold parameters for filtering access*/
AccessParameters accessParameters = AccessParameters.create()
   .addRdfTypeValue(new RDFType(“schema:longitude”), 12.3)
   .addRdfTypeValue(new RDFType(“schema:latitude”), 42.73)
   .addRdfTypeValue(new RDFType(“schema:geoRadius”),1000);

/* Execute one time access and print the result */
CompletableFuture<BigResponse> response = offering.accessOneTime(accessParameters);
response.thenAccept((r) -> dashboard.display(r));
```

As you can see, accessing an offering can be that simple. We use the one-time access meth-od and pass the parameters object that restricts the access to the specified longitude and latitude coordinates and a radius of 1000. Since we use accessOneTime returning a CompletableFuture, we can apply a function on the result. Here we forwards the result on an imaginary display method, which shows the received data on a web dashboard. Note that the response object is of the type JsonNode, which already includes the parsed re-sponse message and provides functionality for traversing the response.

### Continuous Access of Offerings

Since we want to show the returned temperature data in real time on our dashboard, it would be even nicer if we could access the temperature data continuously.

Here we describe how this can be done:

```java
int seconds = 60;

System.out.println("Access continuously as sync feed every "+
                   BigConstants.syncFeedIntervalMillis.toMillis()/1000 +"s for " + seconds + "s");

AccessFeed accessFeed = offering.accessContinuously(accessParameters, 
                                                    Duration.ofSeconds\(60\), 
                                                    (o,r)->System.out.println("feed result = "+r), 
                                                    (o,r)->System.out.println("Ups, something happened"));
```

You notice that the procedure is very similar to the access on a per request base. We use the accessContinuously method of the OfferingQuery object which requires the accessParameters object, a duration, a success callback and a failure callback in case something went wrong. The difference is that when calling .accessCalling\(\) that we create a feed, which requires a lifecycle management. The accessFeed object brings functionality for stopping \(.stop\(\)\), resuming \(.resume\(\)\) and getting the status of a feed subscription \(.status\(\)\). which we don’t want to use now.

If you stop want to use an offering, you can unsubscribe accordingly.

```java
offering.unsubscribe();
```

Make sure to always call the .terminate\(\) method of the consumer object before stop-ping your application in order to terminate any open network connections.

That's it! You have just learned how to use the BIG IoT Library as a data provider as well as a data consumer.

