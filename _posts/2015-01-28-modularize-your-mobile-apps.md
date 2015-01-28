---
layout: post
title: Modularize your mobile projects
excerpt: "Learn how to split your app components in different bundles instead of dealing with an unique bundle that packages the whole app"
modified: 2015-01-28
tags: [target, module, android studio, scheme, xcconfig, xcode]
comments: true
image:
  feature: munduk_header.jpg
  credit: Pedro Piñera
sitemap   :
  priority : 0.5
  isfeatured : 0
---

<iframe width="560" height="315" src="//www.youtube.com/embed/OJ94KqmsxiI" frameborder="0" allowfullscreen></iframe>

<br>
*Recommended talk where a Facebook iOS Engineer explains how they user modules*
<br><br>

When we start building mobile apps we tend to do everything on the same bundle. If you are an iOS developer that means only one target, with one scheme with the build config and that project has some dependencies that might be attached as frameworks, static libraries, or using a dependency manager like CocoaPods. If you are familiar with Android you probably use a module with some dependencies managed by Gradle. 

If you think a bit about that solution it's mixing in the same bundle stuff which is strictly related to the device and the presentation layer, the application core logic, and the interaction with the system/external frameworks. **What happens if Apple/Google change any of the existing frameworks?** You'll have to analyze your app find all the framework dependencies and replace them and what about using your application core logic in a different device with a different interface? You'll probably end up adding a bunch of if/else statements in your code. *You know that's not a clean way to do the things...*

Both **iOS and Android development tools** offer great tools to deal with that. However we only use them to link our big app bundle with other dependencies *(aka libraries)*. But.. what if we structure our app in small components which instead of packaging the whole app logic they have a components with the same responsibility grouped. We could easily interchange them easily without having to refactor all the app.

> If you are thinking in how to apply those terms to existing architectures like might be MVC, MVP, or VIPER an app structured in bundles separates those architecture components in different modules.

### Advantages of working with bundles

- **Have your team working in small projects:** How many times have you had to deal with Git conflicts because two of you have been working on the same file? This way you can have some developers working on the interface, specially those who are expert building layouts, animations, and interactions with users. Have another group of developers developing the interaction with the data and translating user interactions to events applying some business logic. And finally those data expert dealing with API requests and database persistence. You can split data in two bundles LocalData and RemoteData as well.
- **Single Responsibility Principle and decoupled components:** If you develop everything in a single bundle you tend to forget that principle and implement strongly coupled component. Working with bundles *helps* to implement decoupled components which don't know who's going to use them.
- **Easy to test and fast test executions:** Every time you want to execute a suite of tests you have to build **the entire project** just for testing some pieces of your app. If you split your project in *"small projects"* you'll be able to test them individually and mock the dependencies.
- **Easy to recover from regressions thanks to splitted versioning**: Argh! Juan introduced a regression on the version 2.0.2 of the Data project. Let's keep using the last version until the Data team solves it. It's much better, isn't it? That will help you to avoid some headaches.

The image below shows the difference between working with only a big app bundle and splitting it in small bundles.

![]({{site.url}}/images/xcode_big_project.png)

### Components

Thinking about the components of our apps most of them can be grouped in the following sacks:

- **App**: App groups everything related to the view. It's related to the device and it's the bundle which is going to be compiled. *For example we might have an App for iPad and another one for iPhone which will result in two builds one for Android and another one for iPhone*. App shouldn't include any business logic. Just present the information it receives from a core component and notify those core components about events happening there, generally interactions with the user. Navigation logic must be included in this bundle.
  - Layouts
  - Views
  - Navigation
  - Animations
- **Core**: Your application logic should be in this bundle. Core is like the link between the data source and the interface and includes the business and presentation logic. It must use the data bundle to bring data, apply the required logic and them return it to the view to be presented.
  - Presentation logic *(e.g. Presenters)*
  - Business logic *(e.g. Interactors)*
- **Data**: Data will package your controllers that will interact with the system frameworks, like interaction with databases, interaction with APIs, interaction with sensors....
  - Database controller
  - API controllers
  - Device controllers

  You might wonder how to implement that on a real project, how to connect those dependencies and have everything working. Let's see how to do it on iOS and Android

## Modules on iOS

Although you can create your own library projects with XCode and create the dependencies manually, we have a great tool you probably know, [Cocoapods](http://cocoapods.org/) you probably know about. We usually use it to connect our project with remote dependencies but it has the option to specify the dependency locally. Let's see how.

You have **different approaches** depending on your needs. The first one consists on managing those Core/Data bundles as libraries and then connecting your app bundle using the remote repositories. That's great if you have different teams working each one on a different "library" because they can keep their own versioning and build/deploy processes. If you have an small team and don't have enough resources to have separated build/deploy processes for each bundle you can have those bundles locally (using Gitmodule) but integrated with CocoaPods as well. That way you have flexibility to modify and report changes directly

* **Create three XCode projects** in different folders, ExampleApp, ExampleCore, ExampleData.
* ExampleApp doesn't need podspec file. **ExampleCore and ExampleData need a podspec** file with information about the bundle. The structure should be similar to the following:
{% highlight ruby %}
Pod::Spec.new do |spec|
  spec.name         = 'ExampleCore'
  spec.version      = '0.0.1'
  spec.homepage     = 'https://github.com/Example/ExampleCore'
  spec.authors      = { 'pepi' => 'pepibumur@gmail.com' }
  spec.summary      = 'Core logic of example'
  spec.source       = { :git => 'https://github.com/Example/ExampleCore.git', :tag => '0.0.1' }
  spec.source_files = './**/*.{h,m}'
  spec.framework    = ''
end
*Note: In case of ExampleData you might have dependencies with system frameworks or external libraries. You can specify them in the podspec as well*
{% endhighlight %}
* Upload those projects into their respective repositories *(e.g. github.com/Example/ExampleData, github.com/Example/ExampleCore, github.com/Example/ExampleApp)*
* Once you have the bundles on a remote repository you can bring them to the ExampleApp **bundle as submodules** using
{% highlight bash %}
git submodule add https://github.com/Example/ExampleCore dependencies/core
git submodule add https://github.com/Example/ExampleCore dependencies/data
{% endhighlight %}
* In ExampleApp **specify your CocoaPods dependencies locally**
{% highlight ruby %}
source 'https://github.com/CocoaPods/Specs.git'
inhibit_all_warnings!
pod 'ExampleData', :path => './dependencies/data'
pod 'ExampleCore', :path => './dependencies/core'
{% endhighlight %}
* Open your app project **from the .xcworkspace** file. You'll have your project linked to the ExampleData and ExampleCore bundles.

#### Keep in mind
If you have never developed a library before there're some points you should keep in mind working with your bundles:

- **Expose only what is going to be used externally:** The logic and communication with system frameworks are something private. Define a public communication layer and expose it making public headers which will be used by bundles that use that one as a dependency. *Read more about public headers with CocoaPods [here](http://guides.cocoapods.org/syntax/podspec.html#public_header_files)*

- **Work on the bundle without thinking on who is going to use it**: The idea behind that structure is also splitting responsibilities so for example the Data bundle shouldn't know anything about who is going to use it. Or the Core bundle about which view is going to use its data to present it. Working with bundles makes that easier but doesn't avoid the coupling **if you still think on bundles as a single entity**.

- **Keep a versioning process for each bundle**: Each version should be documented with the fixes and new features. If you have enough resources document it, that way your workmates who are working with it know how to communicate with it. You can use Github releases/milestones which are very useful for that purpose.

> CocoaPods is just a simple way to manage dependencies which in my opinion makes it easier and cleaner. If you have enough experience working with libraries/frameworks and connecting dependencies into a single project feel free to do it that way, any dependency solution is possible.

## Modules on Android

In case of Andorid we'll use Gradle to define our modules. Gradle allows you to specify in your app build file the dependencies the project has with other library-projects. We usually use that feature to link our project with 3rd party libraries but we can do it with other modules created by ourselves. Let's see how

- Let's create three a main Android app module and two Android Libraries. *For example, ExampleApp, ExampleCore, ExampleData*

<br>
![]({{site.url}}/images/android-library.png)
![]({{site.url}}/images/android-projects-list.png)

- Inside *File > Project Structure* define core and data modules **as dependencies** of the app module as shown below.

<br>

![]({{site.url}}/images/android-dependencies.png)

- It will create automatically the dependencies in your app build.gradle file as shown below:

{% highlight java %}
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile 'com.android.support:appcompat-v7:21.0.3'
    compile project(':core')
    compile project(':data')
}
{% endhighlight %}

- I recommend you to have those library-modules in their own Git repository and manage them as Git submodules inside the app project. That way they can be maintained without any dependency with the app. You can read more about Git Submodules [here](http://git-scm.com/book/en/v2/Git-Tools-Submodules)


#### Keep in mind

Before working with Android modules in your projects there are some points I would like to highlight:

- **Data and Core modules don't have activities**: Remember they don't have any relation with the presentation layer view layer so they shouldn't include any kind of Ativity/Fragment/Custom View.

- **Manifest file of library projects will be empty**: The Manifest file is the file in our app where we register activities, permissions, brodcast receivers, services, **to be used by the app**. Consequently the app's manifest will register those components which might be in library modules. *(e.g. Register in the app's manifest a BroadcastReceiver that handles push notifications. That receiver is defined in the core library module)*

- **Libraries DON'T have the main app as dependency:** They must be agnostic to the app which is using them. You might find cases where you need notify something to the main app. In that case you can register broadcasts in your app which handles broadcasts coming from module libraries.


## Git Submodules and versions

We've seen how to use modules in either iOS or Android and how to use Git Submodule to have a local git copy of those "library" modules but what if we want to have an specific branch of the core/data package? Submodules has support for it. If you edit your **.gitmodules** you'll have a structure similar to this one where you can specify the branch

{% highlight bash %}
[submodule "ExampleCore"]
    path = core
    url = https://github.com/Example/ExampleApp.git
    branch = new-feature
{% endhighlight %}

> Git Submodules has no support to specify a tag instead of a branch. You can manually checkout to any tag in those submodule repositories.

## Documentation
- Git submodules - [Link](http://git-scm.com/book/en/v2/Git-Tools-Submodules)
- XCode targets by Apple - [Link](https://developer.apple.com/library/prerelease/ios/featuredarticles/XcodeConcepts/Concept-Targets.html)
- Targets for free/paid apps - [Link](http://www.reigndesign.com/blog/building-flockwork-creating-targets-for-free-and-full-versions-in-a-single-xcode-project/)
- How to modularize your XCode apps - [Link](http://blog.zoul.cz/post/10157814684/how-to-modularize-your-xcode-apps)
- CocoaPods - [Link](http://cocoapods.org/)

## Thoughts
Feel free to contact me on pepibumur@gmail.com. I'll be please to comment that project organization with you
