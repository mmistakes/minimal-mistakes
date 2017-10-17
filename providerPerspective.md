---
layout: single
title: Provide IoT Offerings
sidebar: 
  nav: "docs"
---

Assuming, you have developed an IoT platform for parking data. Now you want to make this data public. How do you connect your platform to the BIG IoT Marketplace in order to provide this data to other developers so they can use your data in their applications?

Using the BIG IoT Provider Lib, you can manage your data on the BIG IoT Marketplace in terms of offerings. The Provider Lib offers the following main functionalities:

* Registration of offerings
* Activation and deactivation of offerings
*	Renewing offerings
*	Providing access callbacks


### Authentication on the Marketplace

Before you can register your parking sensor data on the marketplace as an offering, you need to authenticate with the marketplace. 

```java
String MARKETPLACE_URL = "https://market.big-iot.org";
String PROVIDER_ID 	= "TestOrganization-DemoProvider";
String PROVIDER_SECRET = "****";
ProviderSpark provider = new ProviderSpark(PROVIDER_ID, MARKETPLACE_URL, "localhost", 9020); 
provider.authenticate(PROVIDER_SECRET);

```

First of all, you create a Provider instance, passing a Provider ID and a Marketplace URL you want to connect to. In our example, we use a ProviderSpark object, which is an easy way to create a provider with an embedded Spark webserver. The webserver is started on the given URL and port, in this case localhost on port 9020. However, you can also use the standard Provider class, and connect it to an existing webserver (Tomcat, Jetty, etc.). When creating a provider at the marketplace, you receive a unique ID and a token. You pass this data to the provider objects authenticate function in order to finish your authentication on the marketplace. The Provider object will be used for all subsequent interactions with the marketplace. 

### Create an Offering

Now, that you are authenticated you can create an offering for your park data. The next code block shows how you can use the Offering class to do this:

```java
RegistrableOfferingDescription offeringDescription = provider
		.createOfferingDescription("parking_info_offering")
		.withInformation( new Information("Parking Information", new RDFType("schema:parking")))
		.addInputData("longitude", new RDFType("schema:longitude"),	ValueType.NUMBER)
		.addInputData("latitude", new RDFType("schema:latitude"), ValueType.NUMBER)
		.addOutputData("longitude", new RDFType("schema:longitude"), ValueType.NUMBER)
		.addOutputData("latitude", new RDFType("schema:latitude"), ValueType.NUMBER)
		.addOutputData("status", new RDFType("datex:parkingSpaceStatus"), ValueType.TEXT)
		.inRegion(Region.city("Barcelona"))
		.withPrice(Euros.amount(0.001))
		.withPricingModel(PricingModel.PER_ACCESS)
		.withLicenseType(LicenseType.OPEN_DATA_LICENSE)
		// Below is actually Offering specific	
		.withRoute("parking")
		.withAccessRequestHandler(accessCallbackParking);

```

The OfferingDescription class provides a builder method that lets you easily create a new offering. For your offering to be visible on the marketplace, you have to provide a name for it. Also it is important to define a type for the offering so that consumers can au-tomatically find it (see Consumer section). This information is encapsulated in the Information object. Additionally, you can define input parameters that can be set by your service’s consumers when accessing your platform. Here, we provide an example how to add a location based filter as an input element to your offering. You provide the output of your offering through the addOutputData method which are the parking spot coordinates and the parking spot status in this example. The consumer of your data will have the possi-bility to query for data within a specific area and radius. He will retrieve data that conforms to the schema of the type http://schema.org/parking.
Both input and output elements use the RDFType class which makes it easy to semantically annotate your data. This is very important for consumers to find your offerings, so be thoughtful with your annotations! Providing a region, a price, a license type and an endpoint completes the offering description. The endpoint defines the access method and URL to your platform. Using the withAccessRequestHandler method, you specify an access callback (see chapter 3.3.4) that will be called automatically, once a consumer accesses your offering.

### Registration of Offerings

Now that you created the offering description, it should be registered on the Marketplace so that other developers can find it. You will use the register method for that:

```java
RegisteredOffering offeringId = offeringDescription.register();
```

### Implementing the access Callback

Every time someone uses your offering, the BIG IoT Consumer Lib will forward the request to the provided callback function. We will show a simple example of how such a callback function implementation could look like:

```java
AccessRequestHandler accessCallback = new AccessRequestHandler(){
	@Override
	public BigIotHttpResponse processRequestHandler{
		OfferingDescription offeringDescription, Map<String,Object> inputData) {
			double longitude=0, latitude=0;
			if (inputData.containsKey("longitude")) {
				longitude = new Double((String)inputData.get("longitude"));
			}
			if (inputData.containsKey("latitude")) {
				latitude = new Double((String)inputData.get("latitude"));
			} 
			JSONObject results = new JSONObject()
					.put("results",ParkingService.getData(longitude,latitude));
      return BigIotHttpResponse.okay()
        .withBody(results.toString())
        .asJsonType();
	}
};

```

The AccessRequestHandler class is an abstract class that requires you to override the processRequestHandler method. This method receives the OfferingDescription object that we created earlier and the inputData Map which contains the input filters that the consumer has specified during his access request. If any of the possible filters have been used, we pass them to a service function that simply retrieves the parking data from our platform's database. However, you could of course implement any service logic here. Ac-cessRequestHandler is implemented as a functional interface. If you prefer, you can also provide the application logic in the Lambda notation.
If you want to remove your offering from the marketplace, just call the deactivate method on the offering.

```java
provider.deactivate(offeringDescription);
```

Congratulations! You have created your first offering on the BIG IoT Marketplace.



