---
title: "Project Slashfeed Issue 0"
categories:
  - Projects
tags:
  - slashfeed
  - planning
---

## Lets Build Something
I'm in the strong opinion that the only real way to learn something is do do something.  With that said, my plan is to design and build a social network and to blog about it along the way.

Whether or not the project is successful in terms of people signing up and utilizing the site is irrelevant.  The point is the journey; learning new about technologies, methodologies, design-patters etc.

## The Pitch
Slashfeed.io is a place to share your thoughts with the world.  Organize your thoughts under different feeds and follow others and their specific feeds.  

Each user is identified using a slash handle.  Here is an example:
```
//AnthonyHawkins
```

When a user posts to a feed they can choose to classify it under a specific topic.  An example of some slash feeds would look like this:

```
//AnthonyHawkins/cooking
//AnthonyHawkins/photography
//AnthonyHawkins/currentevents
```

You can see what multiple people are saying regarding a certain topic using a slash in-front of the subject or topic; like this.

```
/cooking
/election2016
```

## The Mockup
To help visualize what the browser-based interface will be, here is a mockup of the UI and what the overall end-goal might look like.

<figure class="half">
    <a href="/images/UI-Mock-01.svg">
    <img src="/images/UI-Mock-01.svg">
    </a>
</figure>


## The Technology Behind the Scenes
The real purpose of this project is to learn.  With that said I want to apply some of the following concepts and technology.

* **Micro Services:** The cool new thing all the kids are using are micro services and containers.  I've used technologies such as Docker before here and there.  I'd say the right word is "Dabble". Containerization and Micro Services will play a large part in this solution.

* **Real Time Web:** Another advancement in the web is the use of real-time technology, single-page applications and having the backend update the client as needed.  We want to have at least some portion of the site be real-time.

* **JavaScript and React JS:**  I'm really not a fan of JavaScript, yet its monopolistic grasp on the browser has made it a requirement to understand.  Not only is is it ever-present in a browser but technologies such as node.js have given new-birth to an otherwise unpopular language.  

I plan on coding the front-end in React JS while the backend may have 1 or 2 services written in node.  

* **NoSQL Databases:**  NoSQL has been a big buzzword for a while.  Now that Mongo has been out for some time there are good stories and horror stories floating around.  A rather new DB on the block, called Rethink DB, aims to bring the best of both document-based DBs and relational DBs together into an interesting yet elegant solution.  Let's put it into practice.

* **Python and Flask:**  Python is my language of choice.  I LOVE python and the majority of the application will be comprised of python-based services written using Flask.  Flask also is extremely intuitive for REST APIs which this solution will feature a lot of.

* **Good Development Practices:**  Concepts such as continuous delivery, pipelines, and orchestration will also be prominently featured.

* **Cloud Platforms:**  The cloud has definitely arrived.  Services such as AWS will be utilized rather than rolling your own infrastructure.  Concepts such as Serverless computing and NoOps; These concepts are where you develop to a platform rather than build and support infrastructure will also be looked int.

* **...And More:**  I bet there will be more but the above are the major points.

### The Logical Breakdown
As an initial game-plan as to what needs to be built; the following diagram specifies the necessary services to get started. Obviously things are not set in stone, but this will provide a good starting point for how the application will be divided amongst several services.

True to thinking in micro service, each role within the application will be provided by it's own service with each service managing its own data.

Fronting the services will be an API-Gateway of some form to route the requests to each respective service.  

The standout box in this picture is no doubt, Google's Identity Platform.  This will be used to implement a "login with Google" feature.

<figure class="half">
    <a href="/images/Logical-01.svg">
    <img src="/images/Logical-01.svg">
    </a>
</figure>

### The Delivery Pipeline and Technology Stack
Keeping with good DevOps and development practices, a delivery pipeline will be need to be created to ensure that only tested and validated code makes it to production.  In addition some technologies I know I will want to take advantage of such as Salt Stack and Docker have also been incorporated into this initial concept.

<figure class="half">
    <a href="/images/pipeline-draft-01.svg">
    <img src="/images/pipeline-draft-01.svg">
    </a>
</figure>

## What's Next

So there you have it.  We're going to being building a social network and see how far we can take this experiment.  The next issue in this, we will begin to plan and develop the account service, which will handle logins, auth and storing managing user accounts.
