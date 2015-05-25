---
layout: post
title: Full control in your hybrid mobile apps with a local server, 8fit
excerpt: "Custom solution to have full control over your hybrid apps bundling the content locally and controlling updates"
modified: 2015-05-25
tags: [gcdwebserver, nanohttpd, ionic]
comments: true
image:
  feature: farm_header.jpg
  credit: Vladimir Kudinov
sitemap   :
  priority : 1.0
  isfeatured : 0
---

Since 8fit was developed we’ve been using the webview application cache to send new updates to the users. It allowed us to update without releasing new apps (something slow if you think about the Apple review process). Although it’s something good, it has also some cons, it’s a bit difficult to setup everything properly, specially the server config to ensure the webview doesn’t cache the files that shouldn’t be cached.  Moreover the control over the update process is very low and it increases the boot times because sometimes it has to get the resources remotely when it doesn’t actually need them.

Is there any other way to do it if my app is an hybrid app? Yes, there is. This solution is closer to the bundling format of native apps, where you package everything inside the app and that’s “server” to the Webview. Frameworks like Ionic does it, but if you bundle the web resource you have to follow the native release cycles and again, it’s slow in case of Apple (slow iteration speed). 

We were thinking if there was a solution that took the advantages of having everything locally to serve it quickly and that had the flexibility to update remotely instead of having everything bundled with the app and started working on something we called internally “Frontend Manager’.

That approach gives us a lot flexibility, especially when working quickly on new features, designs and integrations. The web app still can decide when to download the frontend web app, when to inject it into the webview, and even force high-priority updates if needed.

## HTML5 Application Cache

As I mentioned we’d been relying on Application Cache but the problems with app cache have been documented plenty of places ([http://alistapart.com/article/application-cache-is-a-douchebag](http://alistapart.com/article/application-cache-is-a-douchebag)). The main problem it has is that even after dealing with all the edge cases it’s possible to have users stuck on old versions, or experience very long “flaxes of blank white screen”. And it’s also impossible to force an update when necessary.

A lot of users have been reporting us white screens, frozen apps, and we could only tell them to clear the app data in order to clear the Application Cache and start the app with everything cleaned. It was really a frustrating user experience. 


## Native Frontend manager

Why not having a kind of native controller controller that decided when and how inject the content into the app? That’s what we did and we’re very happy with it. It didn’t require a lot of changes in the frontend which is great because we didn’t have to couple our implementation to a particular problem. What did we need?

- **Manifest file:** The controller had to know *what* files to download in order to have the whole frontend locally. We did it through a manifest file in the frontend which is generated when a new build is deployed. That file contains information about the commit, the deploy date and an array with all the files that are required for that frontend version and their routes. We’re thinking about having more control in the future here and use a custom endpoint that allows us to **decide what version every user has** to use but it’s still an idea and we want to firstly test this deeply, step by step.

- **Native Frontend Manager:** It’s the core native component and it’s responsible to synchronize the local with the remote folder. It downloads the manifest file and checks if it’s synchronized with the frontend specified there. It does it every time the app is opened and depending on the app status the update is forced or not. If the app is downloaded, the first time it’s opened there’s a **loading screen** that fires the frontend download. Once it’s downloaded it’s automatically loaded into the webview and the app is launched. If the frontend exists locally and consequently the app can be launched, it just downloads the last frontend version but doesn’t force the **update because** it would cause the white screen we wanted to avoid. *When is it loaded then?* The next time the app is opened it detects if there’s an *“enqueued”* frontend and it loads it before launching the app.

  - **Loading screen:** As I mentioned the first time the app is launched there isn’t anything to load so we implemented a loading screen with a progress bar synchronized with the download process. In case of not having internet connection it’s notified to the user and we offer a contact button to report a but in the frontend manager attaching automatically an error log. The preload screen has design similar to the frontend one which makes the transition very smooth.


> We’ve also another way to reload the frontend which is using a bridge call through Javascript but we only use it for testing and point the app to different environment instead of having to rebuild the app every time.

- **Local server:** The first iteration we did with this feature was thought to be loaded directly the frontend directly from the disk but we lose something that our frontend is dependent of, **cookies**. If you load the frontend from a local file forget about cookies, forget about persisting the user’s session using cookies, it would imply a lot of changes in the frontend just to adapt the frontend to solve a particular problem. What if we loaded 8fit in a desktop then? We did some changes and it worked but we didn’t really want that. Moreover before bringing this feature onboard we added **WKWebKit** to our app to be used only on iOS 8 devices, and luckily the load of files into the webview wasn’t a feature, we needed a different solution. We took a look and internet and we saw that we weren’t the only team looking for solutions for that, Phonegap was affected in the same way if they wanted to use WKWebKit for their *“automatically generated mobile projects”*. After thinking a bit about it and analyzing the existing frameworks and libraries available we took the decision to do it launching a local web server in the app which would be stopped if the app moved to the background. It might sound scary, but it isn’t. Some other apps do the same but you don’t actually know that they are doing, those apps that allow you to control your app remotely, or just share content to the television… After reviewing different libraries we integrated **GCDWebServer** which offered what we needed, serve static content in a local path and proxy API calls as our NGINX reverse proxy does *(the Android HTTP server that we ended up using was NanoHTTPD)*.

The example below shows a config of the server to serve files and proxy some calls:

{% highlight objc %}
- (void)setupServerHandlers:(NSString*)frontendPath
{
    [self addGETHandlerForBasePath:@"/a/"
                     directoryPath:frontendPath
                     indexFilename:@"index.html"
                          cacheAge:3600
                allowRangeRequests:YES];
    [self addAPIHandlerForRequestMethod:@"GET"];
    [self addAPIHandlerForRequestMethod:@"POST"];
    [self addAPIHandlerForRequestMethod:@"PUT"];
    [self addAPIHandlerForRequestMethod:@"PATCH"];
    [self addAPIHandlerForRequestMethod:@"DELETE"];
}

#pragma mark - Custom Setters

- (void)addAPIHandlerForRequestMethod:(NSString *)requestMethod
{
    typeof (self) __weak welf = self;
    [self addHandlerForMethod:requestMethod
                    pathRegex:API_PATH_REGEX
                 requestClass:[GCDWebServerDataRequest class]
            asyncProcessBlock:^(GCDWebServerRequest *request, GCDWebServerCompletionBlock completionBlock) {
                // Proxying the source request
                NSString *urlString = [welf.remoteRootUrl stringByAppendingPathComponent:request.path];
                NSMutableURLRequest *proxyRequest = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:urlString]];
                [proxyRequest setHTTPMethod:requestMethod];
                proxyRequest.allHTTPHeaderFields = request.headers;
                if ([request isKindOfClass:[GCDWebServerDataRequest class]]) {
                    proxyRequest.HTTPBody = [(GCDWebServerDataRequest*)request data];
                }
                NSURLSessionDataTask *dataTask = [welf.manager dataTaskWithRequest:proxyRequest completionHandler:^(NSURLResponse *response, id responseObject, NSError *error) {
                    if (error) {
                        completionBlock([GCDWebServerResponse responseWithStatusCode:[(NSHTTPURLResponse*)response statusCode]]);
                    }
                    else {
                        NSString *contentType = [(NSHTTPURLResponse*)response allHeaderFields][@"Content-Type"];
                        completionBlock([GCDWebServerDataResponse responseWithData:responseObject contentType:contentType]);
                    }
                }];
                [dataTask resume];
            }];
}

{% endhighlight %}

As you can see in case of being an static file we can directly specify the local path where the files has to be read (we have to ensure the folders tree is the right one) and in case of the API we proxy the requests that match a regular expression and manage them using a web client, that in that case is AFNetworking. And **the magic works!**

## Hotfixes & pushing updates
Finally and taking advantage of the **silent push notifications** we have on iOS that are a kind of *“content notifications”* and the full control we have in case of Android we thought, why not connecting it with our frontend manager in order to sync the frontend under certain conditions? Yei! We did it. When the app receives the push notification it starts the synchronization and loads the frontend only if the app was in background. That way we don’t reload the app is the user is doing a workout. Thinking about the options that we have now with that feature…:

- We can force an update that fixes an important bug introduced in a previous version.
- Also force a version that includes assets related to a campaign that we have to launch.
- We can force an update to a particular user which might have problems with the app.


## Some gotchas

 - Implementing the Android version took us a lot of time. We had to implement the API proxy on our own. We had to do some research about proxying HTTP calls and do a lot of testing to ensure the API communication didn’t get broken.

## Next steps

Frontend manager was our next big feature that we’ve been waiting for months. Now we want to test it deeply, include it in our release QA cycles and cover all possible edge cases because it’s a very critical feature. 
Frontend Manager has supposed a breath to keep thinking in the product and building more fluid experiences. We’ll start migrating features to native, the company is getting bigger and we’re having more resources to think about a future 8fit 100% written on Java, Objective-C, Swift.


## Resources
- **GCDWebServer:** [https://github.com/swisspol/GCDWebServer](https://github.com/swisspol/GCDWebServer)
- **NanoHTTPD:** [https://github.com/NanoHttpd/nanohttpd](https://github.com/NanoHttpd/nanohttpd)

**Note:** If you also are working on an hybrid app and you're looking for a similar approach you can reach me at pepi@8fit.com. I'll pleased to help you.

Thanks [Pedro Sola](https://twitter.com/p3drosola) for the article review and its help during the feature development