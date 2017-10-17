---
layout: single
title: More BIG IoT Lib Functionality
sidebar: 
  nav: "docs"
---

### Complex types - Provider perspective
In this section, we want to describe an example of complex types. Complex types are used, so that providers can semantically describe complex datatypes that can contain nested structures. This was not possible in the earlier version of the BIG IoT SDK.

```java
RegistrableOfferingDescription offeringDescription = provider
	.createOfferingDescription("parkingSpotFinder")
	.withInformation(new Information ("Complex Parking", new RDFType("bigiot:Parking")))
	.addInputData("areaSpecification", new RDFType("schema:GeoCircle"), 
    IOData.createMembers()
    .addInputData ("geoCoordinates", new RDFType("schema:geoCoordinates"), 
      IOData.createMembers()
      .addInputData("longitude", new RDFType("schema:longitude"), ValueType.NUMBER)
      .addInputData("latitude", new RDFType("schema:latitude"), ValueType.NUMBER))
      .addInputData("radius", new RDFType("schema:geoRadius"), ValueType.NUMBER))
	.addOutputData("geoCoordinates", new RDFType("schema:geoCoordinates"), 
    IOData.createMembers()
    .addOutputData("longitude", new RDFType("schema:longitude"), ValueType.NUMBER)
    .addOutputData("latitude", new RDFType("schema:latitude"), ValueType.NUMBER))
	.addOutputData("status", new RDFType("datex:parkingSpaceStatus"), ValueType.TEXT)
	.inRegion(Region.city("Barcelona"))
	.withPrice(Euros.amount(0.001))
	.withPricingModel(PricingModel.PER_ACCESS)
	.withLicenseType(LicenseType.OPEN_DATA_LICENSE) 
	//Below is actually Offering specific
	.withRoute("availableparkinginfo")
	.withAccessRequestHandler(accessCallback);
```

Let’s expand our previous example with a more complex parking offering. We want to register a parking information offering on the marketplace with the complex type areaSpecification, which is described as the semantic RDF type schema:GeoCircle. It consists of the two nested types: geoCoordinates as well as geoRadius.
We also add the complex type geoCoordinates to the list of output parameters.  

### Complex types - Consumer perspective
Now that we’ve added complex types to our provider’s offering, we want to add complex type support to our consumer. In order to do that we make use of complex access parameters. As you can see in the following example, this is quite similar to the way, we use complex types in offering descriptions. We use the AccessParameters.create method in order to create the access parameter for the areaSpecification. 

```java
AccessParameters accessParameters = AccessParameters
  .create()
  .addNameValue("areaSpecification", AccessParameters
  .create()
  .addNameValue("geoCoordinates", AccessParameters
    .create()
    .addNameValue("latitude", 50.22)
    .addNameValue("longitude", 8.11))
  .addNameValue("radius", 777));
```
After we retrieved the data, we want to map it automatically to a POJO so that we do not have to manually parse the response.

### Automated mapping to POJO

The following example will show you, how you can access offerings and let the BIG IoT Lib automatically match the output parameters to your POJO.

```java
CompletableFuture<AccessResponse> response = offering.accessOneTime(accessParameters);
//Mapping the response automatically to your POJO
List<ParkingResultAnnotated> parkingResult = response.get().map(ParkingResultAnnotated.class);
```

For the access request, you use the map method, which accepts an annotated POJO class. The lib will now map the response data from the parking provider to the POJO ParkingResultAnnotated. 

```java
public class ParkingResultAnnotated {
	public static class Coordinate {
		public double latitude;
		public double longitude;
	}
	@ResponseMappingType("schema:geoCoordinates")
	public MyParkingResultPojoAnnotated.Coordinate coordinate;
	@ResponseMappingType("datex:distanceFromParkingSpace")
	public double distance;
	@ResponseMappingType("datex:parkingSpaceStatus")
	public String status;	
}
```

In order to map semantic types to your POJO’s types, you can use the ResponseMappingType class, which is parameterized with the semantic type you want to map. In this case, we would map the complex type geoCoordinates from the Complex Parking Offering to the Coordinate class. 
Another option, instead of using an automated mapping approach is, to not use an annotated POJO but instead do the mapping manually. You can see how this works in the next example (note that we use the un-annotated version of the ParkingResult).

```java
CompletableFuture<AccessResponse> response = offering.accessOneTime(accessParameters);
List parkingResult = response.get()
  .map(ParkingResult.class, OutputMapping
  .create()
  .addTypeMapping("schema:geoCoordinates", "coordinate")
  .addTypeMapping("datex:distanceFromParkingSpace", "distance")
  .addTypeMapping("datex:parkingSpaceStatus", "status"));
```

To provide the mapping manually, you use the addTypeMapping method, for each semantic type from the provider’s output data elements so that the lib can match it to your POJO.
A third option is, to provide your own mapping which means to cherry-pick the required fields from the access response. In the example, we map latitude from the complex type geoCoordinates to the field coordinate of the POJO. Also, we map the field distance to the POJO field meters.

```java
CompletableFuture<AccessResponse> response = offering.accessOneTime(accessParameters);
List parkingResult = response.get()
		.map(AlternativeParkingPojo.class, OutputMapping
    .create()
    .addNameMapping("geoCoordinates.latitude", "coordinates.latitude")
    .addNameMapping("geoCoordinates.longitude","coordinates.longitude")
    .addNameMapping("distance", "meters"));
```

### Using integration mode 3
Up till now, we have only considered that you run a BIG IoT Gateway Service, where you provide the callback code to access your IoT platforms. But what if you cannot start additional services in your environment? In this example, you learn how to register and access offerings that uses the BIG IoT integration mode 3, which is enables a completely Consumer Lib driven access to your IoT platform.

Suppose, we want to add air quality information to our dashboard application and we want to integrate the public available Web API OpenAQ (https://openaq.org). In order to integrate the platform using integration mode 3, first register your offering:

```java
RegistrableOfferingDescription airQualityOffering = provider
		.createOfferingDescription("Open_AQ_AirQualityOffering")
		.withInformation(new Information("OpenAQ_AirQuality", "bigiot:AirQuality"))
		.inRegion(Region.city("Berlin"))
		.withPrice(Euros.amount(0.01))
		.withPricingModel(PricingModel.PER_ACCESS)
		.withLicenseType(LicenseType.OPEN_DATA_LICENSE) 
// The following properties are different to other integration modes
		.addInputDataInQuery("coordinates", new RDFType("schema:location"), ValueType.TEXT)
		.addInputDataInQuery("radius", new RDFType("schema:geoRadius"), ValueType.TEXT)
		.addInputDataInQuery("from", new RDFType("schema:date"), ValueType.TEXT)
		.addInputDataInQuery("limit", new RDFType("schema:value"), ValueType.NUMBER)
		.asHttpGet()
		.acceptsJson()
		.producesJson()
		.onExternalEndpoint("https://api.openaq.org/v1/measurements");

```
The BIG IoT Lib supports different ways, how to transmit input parameters when calling a service function of a Web API: parameters can be encoded in the query (...?param1=…&param2=…), in the path (…/paramValue1/paramValue2), in the message body e.g. as JSON or a combination of all three. In this example, the parameters are added as query parameters in the URL (addInputDataInQuery). But you can also try: addInputDataInPath, addInputDataInBody. If your offering requires complex parameter encoding, maybe even with many static parts, you can check out also addInputDataInTemplate. 
The same add methods for input parameters exist, of course, also for output parameters. 
Now, we specify that we access the API through an HTTP GET request, using the asHttpGet method, followed by a specification of what content types shall be used. The endpoint of the API is added to the registration in the last step. Note, that the method onExternalEndpoint is specifically provided by the BIG IoT Lib for integration mode 3.
Now, everyone on the marketplace can use OpenAQ through BIG IoT, including our dashboard application. Our consumer application can retrieve the data through BIG IoT access (section 3.4.5). However, it is important to note, that currently the lib does not support sup-plying input parameters as RDF Types as in the previous example. Here is an example for the OpenAQ provider:

```java
/* Create a hashmap to hold parameters for filtering access*/
AccessParameters accessParameters = AccessParameters.create()
		.addNameValue("coordinates", location)
		.addNameValue("radius", "2500")
		.addNameValue("from", "2017-08-25")
		.addNameValue("limit", "10000");
/* Execute one time access and print the result */
CompletableFuture<AccessResponse> response = offering
										.accessOneTime(accessParameters);
response.thenAccept((r) -> dashboard.displayAirQuality(r));
```

### Using Proxy support

If you access the Internet through a proxy, for example because you are in a corporate environment, you can use the BIG IoT Lib’s proxy support, you can use the setProxy method to set the host address and the port of your proxy server. If you want to add a host to your proxy exception list, use addProxyBypass and use removeProxyBypass for removal. If you need to authenticate the methods.

```java
ProviderSpark provider = new ProviderSpark(PROVIDER_ID, MARKETPLACE_URI, "localhost", 9002);
provider.setProxy("127.0.0.1", 3128);
provider.addProxyBypass("172.17.17.100");
```

### Using Swagger support to describe offerings

Another feature of the BIG IoT Lib allows you to automatically evaluate your offering with Swagger UI. This is useful, for example when you implement a consumer and you want to try different calls. Just add the following line to your provider setup code:

```java
SwaggerGenerator.deploySwaggerFileFrom(offeringDescription, "hi@bigiot.org");
```
Make sure you have added the correct dependencies to your gradle or maven file (group: 'org.bigiot.lib', name: 'bigiot-lib-swagger', version: '0.9.3').
The lib automatically configures a Spark webserver hosting a dynamic web page with Swag-ger UI preconfigured with your offering.

