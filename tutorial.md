---
layout: single
title: Getting started
sidebar: 
  nav: "docs"
---

Using the BIG IoT libraries, it is easy to get started to dive into the BIG IoT ecosystem. These libs allow providers to register and manage their offerings and consumers to access offerings from the BIG IoT Marketplace. 

![BIG IoT Architecture](../architecture.png)

In this developer guide, three parts are described:

1. in [this example](../providerPerspective), we show how to extend an existing IoT platform to be BIG IoT-enabled. The example platform is a simple IoT platform which offers temperature data from different locations and makes them public on the BIG IoT Marketplace. 
1. in [this example](../consumerPerspective), we show how to use the BIG IoT Consumer Library to access this data from the perspective of a developer who wants to retrieve that data in an application or service.
1. [Here](../moreLibFunctionality) you find additional information about advanced usage of the BIG IoT Lib.

## Before you begin...

### Installation of the tooling
In order to try the examples or to get started for development, you have to setup your development environment. If you want to follow this example, it helps you a lot if you have installed the tools from the table below. Of cause you can you use your own tooling, but if you are not sure, just get exactly the version from the “We used …” column.

| Install | We used                                                                                                                                                                                             | You'll find it under...                                                 |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| Git     | The Git distribution of,git-scm.com (v2.11.0 )                                                                                                                                                      | https://git-scm.com/                                                    |
| Java    | Java SE Development Kit 8,(JDK 8)                                                                                                                                                                   | http://www.oracle.com/technetwork/java/javase/downloads/index.html      |
| Eclipse | Eclipse Oxygen (v4.7.0) or,Eclipse Neon.1a (v4.6.1) or,in the distribution,“Eclipse IDE for Java EE Developers”,If you install with eclipse installer, make sure you select the right distribution! | http://www.eclipse.org                                                  |
| Gradle  | The Eclipse plugin “Buildship Gradle Integration 1.0”                                                                                                                                               | In Eclipse:,go to “Help” à “Eclipse Marketplace”. Search for “buildship |


If you want to try the tutorial by yourself, you can download our example projects source code package (https://github.com/BIG-IoT/example-projects), which gives you a quick start. It contains multiple subprojects, in this tutorial we will use: java-example-consumer and java-example-provider that come as Gradle projects. 
Download both of these projects and if you haven’t done so yet, install Gradle. We had good experience using the Eclipse plugin “buildship”. So, in Eclipse menu bar choose “Help” -> “Eclipse Marketplace”. Search for “buildship”, search and install ![Buildship Gradle Integration](../tutResources/installGradle.png). You have to accept the license conditions; Eclipse is restarted after that.


We recommend that you start from a fresh workspace. This is the case if you just installed Eclipse else just switch to a new workspace. 
In order to setup the BIG IoT examples as new Java project, proceed as follows:
Choose “File” -> ![Import](../tutResources/importGradle.png)
Select ![Gradle\Gradle Project](../tutResources/importGradleProject.png).
Hit “Next”
In the ![Project root directory](../tutResources/importGradleProjectRoot.png) text field, set the folder to where the example projects are located. It takes a while until all dependencies are retrieved via Gradle.
In the following, you probably receive the question if you want to override the Eclipse project descriptors. Choose 'Overwrite'.
You have now imported the example projects into ![Eclipse](../tutResources/eclipseExampleProject.png).

### Registration on the Marketplace

Before you can use the examples you have to create a provider and a consumer first on the BIG IoT Marketplace.

Please visit the Marketplace [here](https://market.big-iot.org) to do that. There you find a yellow login button in the lower left corner. Click it and authenticate with your Google or GitHub account. Then, you’ll find the text “New Organization”. Click it and create your organization. Now, you should see a screen similar to ![this](../tutorialResources/marketplace.png).
As you can see my organization has the name “Rain Cloud”. Now, we have to create a provider for the demo. Therefore, click on “My Providers” and then on “+ Provider”.Find a good name for your provider and hit “Save”.
![ProviderScreen](../tutorial/providerscreen.png).

Now, it is important, that you transfer the credentials to your example code. This is a two-step process. First we copy the Provider ID to the clipboard. Therefore click on “Copy ID to Clipboard”. Then switch to eclipse and open the provider example. It is located in in the sub-project java-example-provider below “src/main/java/org/bigiot/examples/ExampleProvider.java”.
There, you have to paste the ID as the value of PROVIDER_ID as in the screenshot below.
![ProviderCode](../tutorial/providerCode.png]
Now, you have to insert the provider secret. Switch back to your browser window with the marketplace and click on “Load Provider Secret” and then click again on “Copy Secret to Clipboard”. Switch back to Eclipse and paste it between the exclamation marks as value for PROVIDER_SECRET.

Now, you start the example provider: Select the file ExampleProvider.java in the “Project Explorer”, in the menu bar hit “Run” -> “Run as” -> “Java Application”. Accept the firewall dialogue. The provider is now running, it offers a parking availability service, which is registered in the background and deployed as a web service on your machine.
Before you can something interesting in the console, you have to start the consumer too. Therefore, you have to create also a consumer at the marketplace and transfer the credentials to the code. The steps are similar to creating a provider. So, it doesn’t make sense to explain it here again. Just switch back to your web browser and start the same process, now, by clicking on “My Consumers”. The credentials have to be inserted in ExampleConsumer.java, which is below the directory then java-example-consumer. 
Now, start the Consumer and see what happens. 

Enjoy!


