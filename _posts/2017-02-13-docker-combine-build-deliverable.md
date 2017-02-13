---
title: Build and deliver your service within the same medium (container).
excerpt: When moving to container technology one would think that the CI builds the software, adds it in docker file and and triggers it's build. What if we didn't need outside the container? This post explains this radical concept.
tags: Container
categories: 
header:
  overlay_image: http://techdistrict.kirkk.com/wp-content/uploads/2009/04/ci.jpg
---

For most engineers that have worked on a software project before containers, there is an established concept of building and extracting the deliverable. 
Advanced teams have created a CI such as Jenkins that depending on its configuration can build the project even on the slightest change. 
Usually there is a publish step also to promote the build artifact and a deployment step to get a functioning representation of the last build. 
For these engineers, adding support for containers is just another publish step. 
Instead of a zip or msi you build a container image and publish.

I was one of these engineers. 
My roots as a software engineer have started in a zero automation world and by demand moved to becoming depended on a CI tool. 
Recently I did some investigations of the container technology and there was something I didn't expect or at least I hadn't realized. 

First, let's explore how a container is built. 
Using docker, a container is represented by a docker file that describes two major things:

- What happens during the build. This is when the docker file is executed to produce an image. (As I work with cloud providers, I also consider this a template).
- What happens when we run the image. This is when we run a container and usually it includes the small variations that make each instance unique from it's template. For example the database connection string.

In the traditional move to containers, the build script (aka docker file) describes where to get our project's deliverable and how to install it along with it's pre-requisites so the product is ready to run. 
This is all fine and if you really think about it, we have described not how to build and compile our software but how to prepare a functioning and ready to run representation of our product. 
Taking a step back, consider that all these verbs such as building, installing, compiling and etc all transform an intention represented in code, into something else. Depending on the verb, that something could be source, a zip file, an installer and the output one of the previous or even my `https://amazingservice.com/`. 
But it all starts with code and in today's software engineering world, people are just interested in that code running. 
It doesn't matter how or where as long as it runs.

What if we skipped all the middle steps and from code we just got our running service. 
What would we gain? 

- No need to maintain a CI tool.
- No need to maintain intermediate staging points for the output artifacts of each step.
- Code ready to execute described in one file. Ok, it's code referencing other code but you get what I mean.

The cool thing about a docker file is that you can always see how others did it. 
This was what opened my eyes into this possibility while I was trying to get my [asarafian/mininugetserver](https://hub.docker.com/r/asarafian/mininugetserver/) to build. 
While browsing through some linux images and their container files, I noticed that inside the container during the build the following happened:

1. the code was being copied inside the container instead of a zip file.
1. the tooling to build the code was installed.
1. the code was compiled.
1. the binary was published into it's running location.

Cool? For me yes but lets analyze this a bit:

Let's start with the wierd factors:

- The container is meant for production. Why are there development artifacts within it? Why is it dirty?
  - Adding the extra tooling for compiler purposes makes the image bigger.
  - The surface of attack is bigger. In Windows it also means that we get more things for the operating system to provision thus less performance.
- What about signing of dll(s), exe(s), script(s) etc?
- The container image takes extra time to build as we need to install the tooling and then compile. Depending on each project this can grow significantly in time.
- If I need to use my deliverable outside of a container then I need another flow.

The size is not a big issue. The surface of attack is but we can always uninstall before the end of the container's built process. 
With windows that is still not perfect because we all know that some installers leave garbage behind. 
Imagine you installed Visual Studio and then you uninstalled. I'm sure there is a smile on your face.
Regarding signing then it really depends where the container's build action happens, exactly the same as with building outside of a container:

- If build host has access to the private key then it's all good. 
- If it doesn't then there is a problem. 

Nothing changes here regarding signing.

But what is there to gain?

- My container is fully self-contained as the container technology demands. My docker file can literally build anywhere as it carries the entire knowledge of how to get from code to running binaries.
- Since I'm building inside the container, I don't need a CI tool. In case you are using a [docker-hub](https://hub.docker.com/) as your docker registry, there is a build automation integration. For example, a commit on your master branch triggers a build of your docker file on docker-hub and the container starts to build. We didn't do anything in terms of CI.
- My docker file can be build and tested anywhere.
- My docker file is very specific. Everything from pre-requisites to even the sdk used to compile is uniquely aligned with my product's version. Doesn't get more version specific than this.
- The software engineer owns the entire process. Compile, publish and execute.

To be fair, you could do all of this with normal virtualization technology and the currently dominant continuous delivery automation flows. 
But to my knowledge, I had never seen such an example until I worked with containers for the first time. 
As obvious as it looks, I don't believe it had clicked for most people mostly because our deliverable across the application life cycle management workflow had not been ready to run artifacts but a promise to re-produce the environment. In this case, an installer is so much close to what was needed. 
But even with this understanding, suggesting this concept to most people makes them uncomfortable because it breaks all traditional silos. 

1. Engineering team produces a deliverable. This is usually the *engineering team*
1. Then the deliverable is customized to make it unique matching the requirements. e.g. Change the database connection string. This is usually the *professional services* team.
1. Then publish and host the customized artifact. This is usually the *devops* team.

{% include figure image_path="http://www.surgo.co.za/wp-content/uploads/2016/11/6ffe55170113fc0070594c3ba7fd3d01.jpeg" caption="Software engineering" %}

But the silos are breaking and it's my firm belief that we are all moving towards a unified engineering world, where the term software engineer includes the ability to engage all phases and aspects of the project.
