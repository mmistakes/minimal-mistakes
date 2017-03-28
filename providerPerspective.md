---
layout: single
title: Provide IoT Offerings
sidebar: 
  nav: "docs"
---

Assuming you have built a simple IoT platform that gathers temperature data from your neighborhood through temperature sensors. Now you want to make this data public. How do you connect your platform to the BIG IoT Marketplace in order to provide this data to other developers so they can use your data in their applications?

Using the BIG IoT Provider Lib, you can manage your data on the BIG IoT Marketplace in terms of offerings. The Provider Lib offers the following main functionalities:

* Authentication
* Registration of offerings
* Activation and de-activation of offerings
* Providing access callbacks

### Authentication on the Marketplace

Before you can register your temperature sensor data on the marketplace as an offering, you need to authenticate with the marketplace.

```java
Provider provider = new Provider(“Barcelona_City-provider3”, "http://localhost:8080");
provider.initialize("localhost", 9001);
provider.authenticate(MARKETPLACE_API_KEY, PROVIDER_CERT_FILE);
```

First of all, you create a Provider object, passing a Provider ID and a Marketplace URI you want to connect to. Alongside your API key, you also received a unique ID and a certificate. You pass this data to the provider object's authenticate function in order to finish your au-thentication on the marketplace. The Provider object will be used for all subsequent interactions with the marketplace.

### Create an Offering

Now that you are authenticated you can create an offering for your temperature data. The next code block shows how you can use the Offering class to do this:

```java
OfferingDescription offeringDescription = OfferingDescription.create("Temperature data offering")
    .withInformation(new Information ("Temperature data offering", new RDFType("schema:temperature")))
    .addInputDataElement(“longitude”, new RDFType(“schema:longitude”))
    .addInputDataElement(“latitude”, new RDFType(“schema:latitude”))
    .addInputDataElement(“radius”, new RDFType(“schema:geoRadius”))
    .addOutputDataElement(“temperature”, new RDFType(“schema:temperature”))
    .inRegion(Region.city(“Barcelona”))
    .withPrice(Euros.amount(0.002)
    .withAccountingType(AccountingType.PER_ACCESS)
    .withLicenseType(LicenseType.OPEN_DATA_LICENSE)
    .addEndpoint(EndpointType.HTTP_GET, AccessInterfaceTypes.BIGIOT_LIB, “/temperature”);
```

The OfferingDescription class provides a builder method that lets you easily create a new offering. For your offering to be visible on the Marketplace, you have to provide a name for it. Also it is important to define a type for the offering so that consumers can au-tomatically find it \(see Consumer section\). This information is encapsulated in the Information object. Additionally, you can define input parameters that can be set by your service’s consumers when accessing your platform. Here we provide an example how to add a location based filter as an input element to your offering. You provide the output of your offering through the addOutputDataElement function which is temperature data in this example. The consumer of your data will have the possibility to query for data within a specific area and radius. He will retrieve data that conforms to the schema of the type "schema:temperature".

Both input and output elements use the RDFType class which makes it easy to semantically annotate your data. Providing a region, a price, a license type and an endpoint completes the offering description. The endpoint defines  the access method to your platform.

### Registration of Offerings

Now that you created the Offering, it should be registered on the Marketplace so that other developers can find it. You will use the register function for that:

```java
String offeringId = provider.register(offeringDescription, accessCallback);
```

The register function requires the Offering object and a callback class as input parame-ters. The callback is later used to handle incoming requests for your offering. This is explained in the next chapter.

### Implementing the access Callback

Every time someone uses your offering, the BIG IoT Consumer Lib will forward the request to the provided callback function. We will show a simple example of how such a callback function implementation could look like:

```java
private static AccessRequestHandler accessCallback = new AccessRequestHandler(){
@Override

    public String processRequestHandler (OfferingDescription offeringDescription, Map<String,String>; inputData) {            
        double longitude=0, latitude=0, radius=0;
        
        if (inputData.containsKey("longitude")) {
            longitude = new Double(inputData.get("longitude"));
        }
        if (inputData.containsKey("latitude")) {
            latitude = new Double(inputData.get("latitude"));
        }
        if (inputData.containsKey("radius")) {
            radius = new Double(inputData.get("radius"));
        }
        Random r = new Random();

        return String.format(Locale.US, 
            "{\"schema:temperature\": %.2f,\n
            \"schema:latitude\": %.4f,\n
            \"schema:longitude\": %.4f,\n}", 
            r.nextFloat\(\)\*3+17 , 
            r.nextFloat\(\)\*0.01+longitude, 
            r.nextFloat\(\)\*0.01+latitude\);         
    };
};
```

The AccessRequestHandler class is an abstract class that requires you to override the processRequestHandler method. This method receives the OfferingDescription object that we created earlier and the inputData HashMap which contains the input filters that the consumer has specified during his access request. If any of the possible filters have been used, we pass them to a service function that simply retrieves the temperature data from our platform's database. However, you could of course implement a more appropriate service logic here. AccessRequestHandler is implemented as a functional interface. If you prefer, you can also provide the business logic in the Lambda notation.

### Activation of Offerings

Now you are almost done! The last part you need to do is to activate your registered offer-ing in order for others to use it. Use the activateOffering method from the provider object for this.

```java
provider.activateOffering(offeringDescription);
```

As you can see, this is pretty straightforward. To deactivate your offering, you guessed it, use the deactivateOffering method.

```java
provider.deactivate(offeringDescription);
```

Congratulations! You have created your first offering on the BIG IoT Marketplace.



