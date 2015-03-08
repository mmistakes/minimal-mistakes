---
layout: post
title: Full control in your mobile web apps with a local server, 8fit
excerpt: "Use a local web server and a syncrhonization controller to have full control updating your remote mobile web app. Learn how we did it with 8fit"
modified: 2015-03-06
tags: [gcdwebserver, 8fit, frontend manager, gulp]
comments: true
image:
  feature: 8fit_beach_workout.png
  credit: 8fit Super Hero Workouts
sitemap   :
  priority : 0.5
  isfeatured : 0
---

Since 8fit was developed (remember, as a web mobile app) we've had a big issue that affected ramdonly to our users and the turned the user experience into a bad experience with the app. We didn't have full control of "when" and "how" the Android/iOS webview reloaded the website. Sometimes it showed a white screen for a while, some others the app got frozend and there wasn't any way to move from ther but closing the app and opening again. Although we've been trying different tricky solutions to force the webview a full reload every time we deployed a new version we felt like there was something under control and we wanted to control it. Those little detail could cause we lost a lot of users.

Most of mobile web apps that are developed using Phonegap package the web files (javascripts, styles, and htmls) into the app bundle that way when you launch the app everything is taken from the app and it works even without internet connection (only for API interactions). In that case you have the control when the build is generated and you upload it to the store. In our case it's a bit different because the frontend is in a remote server and what the webview does is to get all needed resources and cache all of them, that **gives us full flexibility** to update the app remotely whenever you want *(:trollface: which is great if you introduce any bug anytime in the future)*.

We're happy with that solution and has given us a lot flexibility, specially at the level we needed to work quickly on new features, designs and integrations, but still neded the power to decide when to download the frontend web app, when to inject it into the webview, even force high-priority updates whenever we wanted.

## Hashing
The first idea we had before implementing what I'll present you later as frontend manager was hashing the name of frontend resources. If you enabled the cache in the browser and at the same time kept the file names the browser sometimes didn't download the files and you had incompatibilities between updated and not updated files. That was our first step, we used a **gulp task** that took files that frequently changed like the application bundle js file or style resources and applied a hash in order to get a new hashed name.

Everything started working better but when we had a new version deployed and the browser caching system detected it, it suddenly started downloading it and just reloaded the web browser showing an empty white screen and some times taking a lot of time. We didn't wanted that and our users either. We had to do something

## Frontend manager
Why not having a kind of native controller controller that decided **when and how** inject the content into the app? That's what we've done and we're very happy with it. It didn't require a lot of changes in the frontend which is great because we didn't have to couple our implementation to a particular problem. What did we need?

- **Manifest file**: The controller had to know *what* files to download in order to have the whole frontend locally. We did it through a manifest file in the frontend which is generated when a new build is deployed. That file contains information about the commit, the deploy date and an array with all the files that are required for that frontend version and their routes. We're thinking about having more control in the future here and use a custom endpoint that allows us to **decide what version every user has to use** but it's still an idea and we want to firstly test this deeply, step by step.

- **Native frontend manager**: It's the core native component and it's responsible to synchronize the local with the remote folder. It downloads the manifest file and checks if it's synchronized with the frontend specified there. It does it every time the app is opened and depending on the app status the update is forced or not. If the app is downloaded, the first time it's opened there's a **loading screen** that fires the frontend download. Once it's downloaded it's automatically loaded into the webview and the app is launched.

- If the frontend exists locally and consequently the app can be launched, just download the last frontend version but **don't force the update** because it would cause the white screen we wanted to avoid. *When is it loaded then?* The next time the app is opened it detects if there's an *"enqueued"* frontend and it loads it before launching the app.

> We've also another way to reload the frontend which is using a bridge call through Javascript but we only use it for testing and point the app to different environment instead of having to rebuild the app every time.

- **Loading screen:** As I mentioned the first time the app is launched there isn't anything to load so we implemented a loading screen with a progress bar synchronized with the download process. In case of not having internet connection it's notified to the user and we offer a contact button to report a but in the frontend manager attaching automatically an error log. The preload screen has design similar to the frontend one which makes the transition very smooth.

- **Local server**: The first iteration we did with this feature was thought to be loaded directly the frontend directly from the disk but we lose something that our frontend is dependent of, **cookies**. If you load the frontend from a local file forget about cookies, forget about persisting the user's session using cookies, it would imply a lot of changes in the frontend just to adapt the frontend to solve a particular problem. What if we loaded 8fit in a desktop then? We did some changes and it worked but we didn't really want that. Moreover before bringing this feature onboard we added **WKWebKit** to our app to be used only on iOS 8 devices, and luckily the load of files into the webview wasn't a feature, we needed a different solution. We took a look and internet and we saw that we weren't the only team looking for solutions for that, Phonegap was affected in the same way if they wanted to use WKWebKit for their *"automatically generated mobile projects"*. After thinking a bit about it and analyzing the existing frameworks and libraries available we took the decision to do it launching a local web server in the app which would be stopped if the app moved to the background. It might sound scary, but it isn't. Some other apps do the same but you don't actually know that they are doing, those apps that allow you to control your app remotely, or just share content to the television... After reviewing different libraries we integrated [GCDWebServer](https://github.com/swisspol/GCDWebServer) which offered what we needed, serve static content in a local path and proxy API calls as our NGINX reverse proxy does *(we're still looking for a web server for Android that allows us to do something similar)*.

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

As you can see in case of being an static file we can directly specify the local path where the files has to be read (we have to ensure the folders tree is the right one) and in case of the API we proxy the requests that match a regular expression and manage them using a web client, that in that case is AFNetworking. **And the magic works!**

# Updating via push
Finally and taking advantage of the **silent push notifications** we have on iOS that are a kind of "content notifications" and the full control we have in case of Android we thought, why not connecting it with our frontend manager in order to sync the frontend under certain conditions? Yei! We did it. When the app receives the push notification it starts the synchronization and loads the frontend only if the app was in background. That way we don't reload the app is the user is doing a workout. Thinking about the options that we have now with that feature...:

- We can force an update that fixes an important bug introduced in a previous version.
- Also force a version that includes assets related to a campaign that we have to launch.
- We can force an update to a particular user which might have problems with the app.


# Next steps
Frontend manager was our next big feature that we've been waiting for months. Now we want to test it deeply, include it in our release QA cycles and cover all possible edge cases because it's a very critical feature. We're still looking for a good framework/library to implement the Android version of it. That's one of these features **not visible for our users**, that takes time of design and implementation but that gives you an extra and very important  point of stability that will help you to not lose users and make the ones you have happier.