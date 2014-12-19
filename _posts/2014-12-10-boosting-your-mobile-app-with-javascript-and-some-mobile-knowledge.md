---
layout: post
title: "Boosting your mobile app with Javascript and some mobile knowledge"
excerpt: "Learn how useful might be giving some steps on mobile (Android/iOS) launching mobile solutions with web knowledge and with the same mobile native experience as any other app"
modified: 2014-12-19
tags: [backbone, mobile, angular, webapp, bridge]
comments: true
image:
  feature: earpods.jpg
  credit: Pedro Piñera
sitemap   :
  priority : 0.5
  isfeatured : 0
---

When the 8fit team started giving their first steps they decided that the product was going to be a web app with some kind of native integrations. It was something with a lot of sense if we think that the founders of the company feel very comfortable with the language and with web in general. Might we have a great mobile experience using web technologies?

**There's no web solution that equals the mobile native experience**. That's the answer but the truth is that web is getting closer to native and it's possible (depending on your web stack) to export to native only those components that you need and have a communication interface between the web and the native world, implemented on your own, without Phonegap and some other frameworks that try to abstract the web developer from the mobile layer.

We didn't use any kind of **bootstrap library, CSS package, or communication framework** which allowed us to use only just what we needed. We tried to use as less Javascript frameworks as possible, because the web Javascript engine of the mobile devices is limited (comparing it with a desktop computer), and we don't want to load .css files that we don't actually need.

> Mobile web rendering engine is limited, get rid of fully featured web packages with tons of styles and Javascript helpers that you are not going to use at all. If you feel comfortable enough with the language like to not build a shitty and non-scalable stack do it. Otherwise appeal to any framework like Ionic Framework (based on AngularJS) which offers a mobile-like stack and components to work with.

We only used Backbone, Underscore and JQuery for Javascript which simplified our project stack a lot and we avoid repetitive code (and we haven't found a bottleneck with that so far). No Ionic, Cordova, Phonegap or similar. How to have native components then? With the help of a mobile developer, in the 8fit case me. We built a communication layer between web and native. In the case of Android using a native WebView property that simplifies it a lot and in case of iOS using a *tricky* solution that we'll talk about.

## Advantages

After being working with that solution for months we have figured out that it offers some advantages when you are working with an early product. Some of them are:

- **Automatic updated without having to pass through a release review**: The resources are cached by the local Webview and every time we change the frontend version we don't have to generate a new build, update the assets, add a Changelog, wait until you get reviewed by Apple and then have another one prepared to send it again to the Apple Store. Forget about that, you can just use a *Gulp* task that randomizes your resources naming. That way the **caching** engine of the mobile browser detects that those files have changend and then it reloads them. **Updates on the air!**

- **One frontend version but customized for each system**: The application logic is the same. What changes then between Android and iOS? Basically the navigation (Android users are adapted to some patterns that iOS users are not and viceversa) and the design. If you organize your frontend following the pattern MVC you can have the same model-controller for both iOS and Android and work change only the View (Layout) and Navigation. At the end if you work natively you talk with your Android/iOS friends and you figure out that they are implementing the same, following a similar structure, and in some cases even the same naming!

- **Centralized point of bugs**: That advantage is a consequence of the previous one. The more you move your application stuff to frontend the more your bugs will be centralized and easy to detect. In that case from Javascript. Does it mean that then there are no native bugs? No! there are and you have to keep having any reporting tool like Crashlytics, HockeyApp, ... but the number of those bugs will be much less than the number of bugs in frontend.


# Building the web stack

The stack of web was based on a **SPA, Single Page Application**. For those who don't know about what a single page is it's basically a web which is only an HTML file that imports a bunch of Javascript which is the responsible of different tasks like routing, controlling views, binding data, .... Javascript becomes the main actor of the movie.

If you look for frameworks that help you to implement a SPA you'll find a lot of them, like BackboneJS, AngulrJS (by Google), or even some of them focused on mobile like it might be Ionic *(based on Angular)*. Those have different points in common and different concepts in other points. Choosing one solution on another depends on your familiarity with the concepts of the frameworks. If you looked for comparisons like I did a long time ago between the most popular ones (Angular and Backbone) you'll see that Angular offers you a more structured solution close to Ruby while Backbone might be more powerful if you talk to other developers (even if the architecture is not so structured). **My recommendation** *is that if you are starting with that kind of web applications, do it with Angular because Backbone requires having fought enough with Javascript before.*

We use **CoffeeScript** instead of Javascript and **Sass** instead of CSS which is later converted using **Gulp** into the respective Javascript and CSS. Chose the tools that fits best with the way you work and your feeling with the language. 

There's nothing special here but the fact that **everything has to be responsive** and you have to **check the Javascript support** of different devices because the web engine on mobile devices is more limited than on a Desktop. You can use here a website called  [caniuse](http://caniuse.com/)

Here's a summary of things we're using for the frontend:

- Backbone, Marionette, Underscore & JQuery
- Coffeescript
- Sass
- Jade for template
- Gulp for build tasks
- Capistrano for deploys

*Note: For those who might be interested in, we're using Rails for the backend*

# Mobile 

We rejected any kind of **mobile wrapper** like Phonegap, Sencha or similars because we wanted custom communication plugins and we had a mobile developer to take care of that side. If you think about it, to have your web solution running on a mobile device (besides having done it responsive) you need a simple app project for Android and iOS *(which you can create from the IDE assistant)*, add a webview, and load the URL into it. Simple really?

That would be the simplest integration but we weren't a website, we were a platform which purpose was **end up running on mobile devices taking advantage of mobile features**. How many times do you complain when you have to introduce your credit card numbers for a payment? In app purchases is a great solution there for mobile, or why do you have to introduce your Facebook credentials for login if I have an app installed for that? 
Those are just some kind of integrations that we thought about and that we currently have. 

> If you are planning to load a web into a mobile app the app behaves just as a simple window where you show the browser opening your website but if you want to take advantage of the real mobile advantages you need a kind of interaction between mobile-web

That **interaction** is what we called **native bridge** and we built it from scratch. No framework, no abstraction, just analyzed the features we had on Android and iOS and then implemented it.


## Native bridge
Bridging native and web depends on the platform where we're building the bridge because Apple and Google had different thoughts about giving support to web when they developed their mobile web engines.

### Android
Fortunately Android did it best. The way you can bridge native with web is **exposing a Java interface** to Javascript. After exposing that interface the object is visible from Javascript and that object translates calls to its method into calls to the original Java interface. The communication would be something like this:


{% highlight java %}
// Communication Java -> Javascript
webView.getSettings().setJavaScriptEnabled(true);
webView.addJavascriptInterface(new JavascriptInteractor(), "NativeBridge");
class JavascriptInteractor {
	@JavascriptInterface
	public void buyIAPProduct(String productId)
	{
		// MyPaymentsController.buy...
	}
}

// Communication Java -> Javascript
public void loadJS(String js) {
   webView.loadUrl("javascript:"+js);
}
{% endhighlight %}

Where we can see we're exposing a method called `buyIAPProduct` and executing something on Java. Notice that @JavascriptInterface is an annotation to let the compiler know that the method below should be exposed to Javascript, otherwise not.

The **communication on the other direction** is executed just **evaluating javascript** sentences directly loading URLs with the format `javascript: sentence`.

If we tried to close the payment flow, the exchange of calls would be something like:

{% highlight javascript %}
NativeBridge.buyIAPProduct("pro_subscription_1mo");
{% endhighlight %}
{% highlight java %}
webview.loadJS("Ef.vent.trigger('payment:completed', "+payment.toString()+")")
{% endhighlight %}


### iOS

Apple did it difficult here. There's no native component to expose a kind of interface to Javascript as Android does. How can I do then? Well, if we take a look to the *UIWebViewDelegate* methods there's one called 

{% highlight objc %}
- (BOOL)webView:(UIWebView *)webView
shouldStartLoadWithRequest:(NSURLRequest *)request
 navigationType:(UIWebViewNavigationType)navigationType;
 {% endhighlight %}

Which is a method to ask if the webview should or not load a given `NSURLRequest`. Although the purpose of this method is not to bridge Javascript with Mobile we took advantage of it for that. How? **Building a custom URL Scheme**

Let's say that we built a custom **communication API** using the scheme `eightfit://` and that way any intercepted url with the scheme `eightfit://` would be passed to the **NativeBridge**. The previos `buyIAPProduct` would turn into `eightfit://buyiapproduct/product_id=pro_subscription`.

{% highlight objc %}
- (BOOL)webView:(UIWebView *)webView
shouldStartLoadWithRequest:(NSURLRequest *)request
 navigationType:(UIWebViewNavigationType)navigationType
 {
 	// eightfit://buyiapproduct?product_id=pro_subscription_1mo
 	BOOL isNativeBridgeURL = [URLMatcher isForBridge:request.URL.absoluteURL];
 	if (isNativeBridgeURL){
 		[JLRoutes routeURL:request.URL.absoluteURL];
 		return NO;
 	}
 	return YES;
 }
 {% endhighlight %}

The parsing of the URL can be made using **regex** but fortunately there were other developers thinking about it befure and we find libraries like **JLRoutes** which helps on that. What JLRoutes actually does is to build a local API passing the endpoints and actions for those endpoints:

{% highlight objc %}
[JLRoutes addRoute:@"/buyiapproduct/:product_id" handler:^BOOL(NSDictionary *parameters) {

    NSString *productId = parameters[@"product_id"]; // defined in the route by specifying ":product_id"

    [PaymentsController buyProduct:product_id withCompletion:^void (NSError *error) {
    	// Notify JS about the result
    }];

    return YES; // return YES to say we have handled the route
}];
{% endhighlight %}

### Some points about the bridge

As you might have noticed there are some interesting points to comment about the bridge. The first one is that the communication is a bidirectional communication. I ask for something you answer with another thing. There's  no way (right now) to get the return parameter of the sentence evaluation and if there's a way it's only using the string type, *(what if I want to return a more complex object?)*

Another interesting point is that there's no way to expose Javascript to Mobile (neither on iOS nor Android) Mobile doesn't know anything about Javascript and you as a mobile entity that has a Webview can only communicate with Javascript evaluating sentences on the browser or turn to tricky solutions.

Most of communication calls will be asynchronous so you need a kind of event handlers on Javascript (JQuery, Backbone, ... offer components for that) so what you actually do is call the bridge and then register a listener to listen when the mobile controller has finished what it had to do.

And finally as you might have noticed, there's no type validation. And that's something we can't avoid because the bridge inherits it from Javascript. Be careful here!

> **Exposing features:** If you want to let your frontend know about the available mobile features, the device or the app version you can use the User-Agent and do something like: 8fit-iOS-8.1/iPhone-6/1.2.3 (iap, push, conn, res) . That way your frontend knows about what is available and what's not.

## Examples of controllers

Since we starting building that bridge we've done more than 10 kind of native integrations. Some of them are **payments (in app purchase), video/sound/audio player, push notifications, login with Facebook, resources downloader, social sharing...**

And some other interesting are coming. We're working on a frontend controller which is going to manage the frontend locally and inject it into the webview. We're finishing the integration with **HealthKit and Google Fit** and planning to do the workouts more interactive implementing them natively.

## Pitfalls and recommendations

Not everything can be magic, there are some **pitfalls** we found during the development of 8fit and that I would like to share with you too because you'll have to face with them sooner or later:

1. **Native doesn't know about the Javascript**: You can expose for example Java to Javascript (not possible with Objective-C). But there's no way to know what's happening on the Javascript context (variables, objects, ...). So the **recomendation** here is to documment the bridge in terms of (methods, objects, variables and types) and if it's possible to be mainteined by the same developer/s. We suffered a lot of headaches here.
2. **Need a bit of mobile knowledge** :iphone: : If you come from web you can learn it, the complexity will depend on the number of native integrations you have. If they are not too much give your first steps on mobile, otherwise *Phonegap* is not a bad solution but not too custom for us.
3. **Experience close to mobile but not the same**: We can start a big discussion here but my opinion about that is that there's no way (right now) to get the sdame experience than a native app using web technologies. Due (in part) to the companies behind the OS (Google & Apple) which don't want to put their efforts on better web rendering engines. Fortunately, I've to say that the things and changes and we can see  great news on iOS 8 and Lollipop :clap:
4. **Test the mobile experience**: This point is not taken a lot into account on a desktop solution but should be in case of mobile. Think about what should happens if your apps loses the connection, are the models properly persisted under wrong connection health, ... Check if the browser handles properly the cached resources.
5. **Be careful with the cache:** We had some troubles with the browser not reloading cached resources. To avoid that we started renaming the frontend resources on every build, that way the browser detected them as updated and forced the download of them. *Note: We're building here our current frontend controller which is going to be the repsonsible to download it and inject into the Webview! Yei!*

## Conclusions

After the previous (and big summary) of the technologies we're using at 8fit and different topics around it I would like to finish the post sharing some conclusions with you, the slides and the video of the talk given at **@[Geekshubs](https://twitter.com/geekshubs)**

- **Javascript is not a bad solution for the beginning**. It allowed us to have a "ready-to-use" version of 8fit in less time that if we had decided that the development was on native iOS and Android.
- **It might be restrictive** in the future in terms of interactivity, animations, ... If you start noticing that, you can remove those bottlenecks using a native solution for them. We're doing though with the interactive workouts.
- **Analyze your resources and your product** If you have enough resources to have a mobile solution do it! But if now let's make web dancing on mobile **we did it!**

<iframe width="560" height="315" src="//www.youtube.com/embed/vlT3b90-PDc" frameborder="0" allowfullscreen></iframe>

<script async class="speakerdeck-embed" data-id="2f31eba0697e0132fd480a025a0ea166" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>