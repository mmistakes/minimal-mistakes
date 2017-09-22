---
layout: single
title: Consume IoT Offerings
sidebar: 
  nav: "docs"
---

Assuming, you want to create a new parking app for the city of Barcelona that is supposed to display parking data on a web dashboard for different places in the city. Using the BIG IoT Consumer Lib, it is very easy to make your service use the BIG IoT Marketplace to query relevant data sources and access them.

The Consumer Lib offers the following main functionalities:
*	Discovering offerings at the Marketplace according to a search specification
*	Subscribing to offerings
*	Accessing offerings in per request or in a continuous fashion


### Authentication on a BIG IoT Marketplace

To get started with the Consumer Lib, you have to create an instance of the Consumer class. The constructor requires your specific consumer ID and a marketplace URI. 
To authenticate with the marketplace, you have to use the authenticate method provided by the consumer object. This method requires the marketplace API key and a consumer certifi-cate, which you both received when you registered on the BIG IoT Marketplace portal.

```java
Consumer consumer = new Consumer("Barcelona_Parking", "https://market.big-iot.org");
// Authenticate on the marketplace 
consumer.authenticate("*****");
```
If you want to connect to a different marketplace, just repeat the previous steps and create another Consumer object. 

### Creating a Query for Offering Descriptions

Now, that you are authenticated at the marketplace, you can search for relevant parking sensor data to feed into your service. To do that, you query the marketplace using the OfferingQuery object. The query gets constructed using a builder pattern which first, creates the empty OfferingQuery object that is completed with additional query filters, such as a specific search region, a desired accounting type, a maximum price, etc. The mar-ketplace will later retrieve all matching offerings for this query. In this example, the query is quite simple however it can be more complex in other situations.

```java
OfferingQuery query = Consumer.createOfferingQuery()
	.withInformation(
			new Information("Parking Information Query", "http://schema.org/parking"))
	.inRegion(Region.city("Barcelona"))
	.withPricingModel(PricingModel.PER_ACCESS)
	.withMaxPrice(Euros.amount(0.001))
	.withLicenseType(LicenseType.OPEN_DATA_LICENSE);
```

First we create a query. The type of offerings returned should be of type http://schema.org/parking. The types of offerings, which are available can be evaluat-ed using the online documentation of the BIG IoT Marketplace. The query is using a region filter that selects only offerings that are provided in the city of Barcelona. Also the pricing mode should be based on the number of accesses and not, for example, on a monthly fee. The price should not exceed 0.1 cents per access and the data license should be the Open Data License. The Consumer Lib offers you Enum classes that you can consult to see, which other licenses or accounting types are available.

### Querying the Marketplace

To execute the query on the marketplace, the Consumer object provides multiple options. The dedicated method for this is discover, which has different signatures to take different programming preferences into account.

```java
CompletableFuture<List<SubscribableOfferingDescription>> 
										discover(IOfferingQuery query);
void discover(
					IOfferingQuery query,
					DiscoverResponseHandler onSuccess, 
					DiscoverResponseErrorHandler onFailure);
void discover(IOfferingQuery query, DiscoverResponseHandler onSuccess);
```

The first variant uses a CompletableFuture as a return type, which is a promise on a list of OfferingDescriptions, which is part of the functional programming styles introduced in Java 8. The other two variants are using callback mechanisms.
The following code shows how to discover offerings getting them as a CompletableFuture on the list of OfferingDescriptions:

```java
CompletableFuture<List<SubscribableOfferingDescription>> listFuture = 
											consumer.discover(query);
List<SubscribableOfferingDescription> offerings = listFuture.get();
Offering offering = offerings.get(0).subscribe().get();

```

The discover call is actually non-blocking. So, you could do something in between, e.g. handing over the CompletableFuture object to your management thread. Or alternatively, you can directly receive the list by calling the get method. This call is blocking and will wait on the list of OfferingDescriptions. The motivation of using CompletableFuture here is, that you can come easily from an asynchronous behavior to a blocking behavior and further you can utilize reactive concepts if you want. For example by calling thenApply as a monad on the CompletableFuture object allows you to apply functions once the list of offering descriptions is received. 

```java
listFuture.thenApply(SubscribableOfferingDescription::showOfferingDescriptions);
```

Before you can utilize an offering, you have to subscribe on the OfferingDescription ob-ject. Subscription is done through the correspondent subscribe method which returns an Offering object. The offering object provides different access methods as described later.
You can also use callbacks for discovering offerings. Here is an example how to achieve that:

```java
query.discover((r,l) -> { 
  SubscribableOfferingDescription.showOfferingDescriptions(l) 
});
```

The callback function in this example again just prints the returned offering descriptions, however usually you would provide your offering selection logic here, that selects the ap-propriate offerings for your use case. The example again utilizes the functional program-ming features introduced in Java 8. With lambdas you can express functionality without much boilerplate code. Alternatively every other instance of DiscoverResponseHandler  is accepted by 
discover. 
As a side note: Of cause you can reuse your query object for subsequent queries. Only if you want to change something regarding the filtering you have to create a new 
OfferingQuery object.

### Using SelectionCriteria
By using the SelectionCriteria class, you can specify a rule which is used by the BIG IoT Lib to filter offerings. You can define the selection criteria based on you service logic needs, by creating a new SelectionCriteria instance. To create a new selection, you use the 
OfferingSelector class, which accepts an arbitrary amount of SelectionCriteria ob-jects. In the example below, we discover a list of offerings and apply an OfferingSelector, that selects based on cheapest offerings that have the most permissive license.

```java
consumer
	.discover(query)
	.thenApply((list) -> OfferingSelector
    .create()
    .cheapest()
    .mostPermissive()
    .select(list));
```

### Accessing Offerings

Before we describe how to access an offering that was retrieved from the marketplace, it makes sense that you look at the different access concepts provided. The IOffering inter-face provides the following signatures for access:

```java
void accessOneTime(AccessParameters parameters,
    AccessResponseSuccessHandler onSuccess);  
void accessOneTime(AccessParameters parameters,
    AccessResponseSuccessHandler onSuccess, 
    AccessResponseFailureHandler onFailure);   
CompletableFuture<AccessResponse> accessOneTime(AccessParameters parameters);
IAccessFeed accessContinuously(AccessParameters parameters,
    Duration lifetime,
    FeedNotificationSuccessHandler onSuccess, 
    FeedNotificationFailureHandler onFailure);

```

To access offerings, we distinguish between two types: one-time access and continuous ac-cess. One-time means that you execute an access request every time you want to get new data. Continuous refers to the reception of data as a feed.
For one-time access, the Consumer Lib supports again different programming styles. You can either use callback functions for pure asynchronous access or you can use a 
CompletableFuture to do reactive programming or even having a blocking call. In either case, you have to provide an AccessParameters object for the access call. In includes the parameters, which are will be passed to the platform that serves the data. Typically they are needed to filter the output or configure the access.
Here is an example, how to access the parking offering we retrieved earlier:

```java
/* Create a hashmap to hold parameters for filtering access*/
AccessParameters accessParameters = AccessParameters.create()
.addRdfTypeValue(new RDFType("schema:longitude"), 12.3)
.addRdfTypeValue(new RDFType("schema:latitude"), 42.73);

/* Execute one time access and print the result */
CompletableFuture<AccessResponse> response = offering.accessOneTime(accessParameters);
response.thenAccept((r) -> dashboard.display(r));

```

As you can see, accessing an offering can be that simple. We use the one-time access meth-od and pass the parameters object that restricts the access to the specified longitude and latitude coordinates. Since we use accessOneTime returning a CompletableFuture, we can apply a function on the result. Here we forward the result to the example dashboard’s display method, which shows the received data on a web dashboard. Note that the response object is of the type JsonNode, which already includes the parsed response message and provides functionality for traversing the response.

### Continuous Access of Offerings

Since we want to show the returned parking data in real time on our dashboard, it would be even nicer if we could access the parking data continuously.
Here we describe how this can be done:

```java
AccessFeed accessFeed = offering
  .accessContinuous(
      accessParameters,
      Duration.standardSeconds(60), 
      (o,r)->System.out.println("feed result = "+r), 
      (o,r)->System.out.println("Ups, 	something failed"));
```

You notice that the procedure is very similar to the access on a per request base. We use the accessContinuously method of the OfferingQuery object which requires the 
accessParameters object, a duration, a success callback and a failure callback in case something went wrong. The difference is that when calling accessCalling() we create a feed, which requires a lifecycle management. The accessFeed object brings functionality for stopping (stop), resuming (resume) and getting the status of a feed subscription (sta-tus), which we don’t want to use now.
If you want to stop accessing an offering, you can unsubscribe accordingly.

```java
offering.unsubscribe();
consumer.terminate();
```

Make sure to always call the terminate method of the consumer object before stopping your application in order to terminate any open network connections.
That's it! You have just learned how to use the BIG IoT Library as a data provider as well as a data consumer. 


