---
layout: post
title: "Boosting your mobile app with Javascript and some mobile knowledge"
excerpt: ""
modified: 2014-12-09
tags: [swift, objective-c, integration, cocoapods]
comments: true
image:
  feature: earpods.jpg
  credit: Pedro Piñera
sitemap   :
  priority : 0.5
  isfeatured : 0
---

When the 8fit team started giving their first steps they decided that the product was going to be a web app with some kind of native integrations. It was something with a lot of sense ift we think that the founders of the company feel very comfortable with the language and with web in general. Might we have a great mobile experience using web technologies?

**There's no web solution that equals the mobile native experience**. That's the answer but the truth is that web is getting closer to native and it's possible (depending on your web stack) to export to native only those components that you need and have a comunication interface between the web and the native world, implemented on your own, without cordova and some other frameworks that try to abstract the web developer from the mobile layer.

We didn't use any kind of **bootstrap library, css package, or communication framework** which allowed us to use only just what we needed. We tried to use as less javascript frameworks as possible, because the web javascript engine of the mobile devices is limited (comparing it with a desktop computer), and we don't want to load .css files that we don't actually need.

> Mobile web rendering engine is limited, get rid of fully featured web packages with tons of styles and javascript helpers that you are not going to use at all. If you feel comfortable enough with the language like to not build a shitty and non-scalable stack do it. Otherwise appeal to any framework like Ionic Framework (based on AngularJS) which offers a mobile-like stack and components to work with.

We only used Backbone, Underscore and JQuery for Javascript which simplified our project stack a lot and we avoid repetitive code (and we haven't found a bottleneck with that so far). No Ionic, Cordova, Phonegap or similars. How to have native components then? With the help of a mobile developer, in the 8fit case me. We built a communication layer between web and native. In the case of Android using a native WebView property that simplifies it a lot and in case of iOS using a *tricky* solution that we'll talk about.

## Advantages

After being working with that solution for months we have figured out that it offers some advantages when you are working with an early product. Some of them are:

- **Automatic updated withouth having to pass through a release review**: The resources are cached by the local webview and every time we change the frontend version we don't have to generate a new build, update the assets, add a changelog, wait until you get reviewed by Apple and then have another one prepared to send it again to the Apple Store. Forget about that, you can just use a *Gulp* task that randomizes your resources naming. That way the **caching** engine of the mobile browser detects that those files have changend and then it reloads them. **Updates on the air!**

- **One frontend version but customized for each system**: The application logic is the same. What changes then between Android and iOS? Basically the navigation (Android users are adapted to some patterns that iOS users are not and viceversa) and the design. If you organize your frontend following the pattern MVC you can have the same model-controller for both iOS and Android and work change only the View (Layout) and Navigation. At the end if you work natively you talk with your Android/iOS friends and you figure out that they are implementing the same, following a similar structure, and in some cases even the same naming!

- **Centraliced point of bugs**: That advantage is a consequence of the previous one. The more you move your application stuff to frontend the more your bugs will be centralized and easy to detect. In that case from Javascript. Does it mean that then there're no native bugs? No! there are and you have to keep having any reporting tool like Crashlytics, HockeyApp, ... but the number of those bugs will be much less than the number of bugs in frontend.



## Building the stack
## Required stack
## Technologies
## Communication interface
### User Agent as a way to expose features
### Asynchronous communication
## Debugging
## Native, only when needed!
## Gotchas
## Conclussions
### When should I use a web mobile solution?
### Can I  use cordova?

# Ideas
- What we have as native and what we haven't
