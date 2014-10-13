---
layout: post
title: Setup your iOS Projects for testing
excerpt: "Learn how to setup your iOS for testing using the most popular testing libraries and how to integrate your project tests in the development flow."
modified: 2014-10-13
tags: [specta, kiwi, tdd, unittests, cocoapods]
comments: true
image:
  feature: earpods.jpg
  credit: Pedro Piñera
---

![image](http://www.gibedigital.com/media/1280/unit-test.jpg)

In other programming communities, like the Ruby one, developers are more aware of testing new components. Ensuring every component is tested **is not common** within the mobile appcommunity.

Fortunately, iOS developers have been working over the years to bring that culture to iOS too. The community is **developing new libraries** that use native ones allow you to write your tests with a fresh and more readable syntax. This has provided a big impulse and every day more and more developers ensure that expected behaviour in their apps is tested.

The **Redbooth iOS Team** we've been strongly influenced by the Ruby backend team and we decided to introduce testing into our development flow. Thanks to components like *Cocoapods*, *Schemes and targets* and some other tools, testing has become an essential part of development cycle.  

## Testing flow
Currently, depending on the type of test, the steps we follow are different:

- **Unit testing:** We write unit tests when developing new features or controls. Our goal is to ensure the components behave according to expectations. Although we don't follow TDD at all times, we're trying to do so more and more. *Unit testing allow us to detect regressions and reduce QA costs*.
  1. Tests are executed using a CI environment.
  2. The CI integration reports the results to the Github PR.
  3. The PR will be merged only when:
    - The implementation includes tests and they pass
    - It has more than one :+1: by the peer review.
- **Acceptance tests:** In this case, tests are defined by the QA team. They use [**appium.io**](http://appium.io/) for these tests which allows them to define the same suite of tests for Android and iOS in Ruby. It's important here to highlight the need of using **accesibility tags** because these tests make use of them to call different components in the app interface. When we have a new alpha version after some features introduced or bugs fixed:
  1. We generate an **alpha** version and send it to the QA team using distribution tools like Hockeyapp.
  2. QA runs Smoke and Acceptance tests in their environments.
  3. When they pass we move the alpha to a **beta** version. Otherwise we fix the tests that didn't pass and repeat the process. 
- **Snapshot testing:** Regressions in design are not detectable using unit tests. Even if you add unit tests for UI properties (which we don't recommened). We have recently started using  a library from Facebook, [**iOS Snapshot Test Case**](https://github.com/facebook/ios-snapshot-test-case) and introduced it in the flow following the steps below:
  1. Design team send us the designs of the new features
  2. We implement them with their respective **unit tests** and **snapshot tests** generating snapshots.
  3. We send the snapshots to the design team and wait for their confirmation.
  4. Once confirmed, the implementation is **ready** and the snapshot/s generated will be valid while the designs don't change.


## Specta
Our firsts tests were written using Kiwi. We find it a little bit outdated and introduces a lot of coupling with matchers and mocks. With the introduction of iOS 8 and the improvements in the XCTest framework we've seen that the Specta framework is becoming more and more active. After releasing the first beta with support for iOS 8 and after a lot of investigation we decided to move our tests to this library. We complemented it with the matcher **Expecta** and the library for mocking **OCMock**. I recommend reading [this article](http://nshipster.com/unit-testing/) about different alternatives for testing. There Matt compares all the alternatives and discusses their advantages and disadvantages.

 >The main advantage of using Expecta over other matcher frameworks is that you do not have to specify the data types. Also, the syntax of Expecta matchers is much more readable and does not suffer from parenthesitis.

Syntax in Specta + Expecta is more readable, friendly and easy to remember. The example below shows tests using **OCMHamcrest**:

```objc
assertThat(@"foo", is(equalTo(@"foo")));
assertThatUnsignedInteger(foo, isNot(equalToUnsignedInteger(1)));
assertThatBool([bar isBar], is(equalToBool(YES)));
assertThatDouble(baz, is(equalToDouble(3.14159)));
```

Using **Kiwi**

```objc
[[@"foo" should] equal:@"foo"];
[[foo shouldNot] equal:theValue(1)];
[[[bar isBar] should] equal:theValue(YES)];
[[baz should] equal:theValue(3.14159)];
```

And finally **Expecta**:

```objc
expect(@"foo").to.equal(@"foo"); // `to` is a syntatic sugar and can be safely omitted.
expect(foo).notTo.equal(1);
expect([bar isBar]).to.equal(YES);
expect(baz).to.equal(3.14159);
```

## Setup

### Setup the project (schemes and targets)
>A **scheme** represents a collection of targets that you work with together. It defines which targets are used when you choose various actions in Xcode (Run, Test, Profile, etc.) 

In our case we use schemes only for testing. We decided to leave the main scheme only for builds and archives, integrating only the **pod libraries** that our project uses and having the pods required for testing like Specta or OCMock in the testing scheme. The result is the following:

![image](http://cl.ly/image/470W1F31060H/Image%202014-10-10%20at%203.14.20%20pm.png)

Where it's important set the scheme as **Shared** if you want to have it attached to your git repository.

With the **schemes** setup the next step is to define what **targets** we need.

>A **target** is an end product created by running "build" in Xcode. It might be an app, or a framework, or static library, or a unit test bundle. Whatever it is, it generally corresponds to a single item in the "built products" folder.

In the [Redbooth](https://redbooth.com) app, apart form the main app target, we use one for **Unit testing** and another one for **Snapshot testing** as you can see in the screenshot below.

![image](http://cl.ly/image/2e0A1P31102m/Image%202014-10-10%20at%203.15.09%20pm.png)

Notice in the screenshot that the project has configurations for **Debug** and **Release** where we set the configuration for each target and configuration. By default **CocoaPods** should do it automatically for you but in some cases it doesn't work properly. Be sure then that each configuration and XCode target has a corresponding generated pod config file. 

Finally we have to select which targets are going to be built in our testing scheme. As we are going to use it only for testing we have to choose only this option in the targets. Moreover the order of the targets in that list should be the correct one regarding the dependencies between them. The firsts targets to be built should be the pod ones, then the application which components are going to be tested and later our testing targets. Remember:
1. **Pod targets**
2. **Application targets**
3. **Testing targets**

![image](http://cl.ly/image/2g0w1v3r3Z03/Image%202014-10-10%20at%203.15.59%20pm.png)

>Note: CocoaPods targets are not the same as XCode targets. Cocoapods targets are useful to group pods with an specific configuration. As you might have noticed their definitions but remember that **they are not the same** because it's a common misunderstanding when you are integrating your project with CocoaPods.

### Connect CocoaPods
With the project setup the next step is to prepare the **Podfile** to integrate the testing libraries with our project targets. *If you haven't worked with CocoaPods before I recommend you to read about it here: http://guides.cocoapods.org/*. Our Podfile has the following format:

```ruby
source 'https://github.com/CocoaPods/Specs.git'
platform :ios, '7.0'

inhibit_all_warnings!

target :app do
  link_with 'Redbooth'
  # Project pods
end

target :test do
  link_with 'UnitTests'
  pod 'OCMock', '~> 3.1'
  pod 'Specta', '~> 0.2'
  pod 'Expecta', '~> 0.3'

  target :snapshottest do
    link_with 'SnapshotTests'
    pod 'FBSnapshotTestCase', '~> 1.2'
    pod 'Expecta+Snapshots', '~> 1.2'
  end
end
```

In order to have our pods organized we use **Cocoapods** targets. They are strongly related with our project targets but remember that they are not the same. To specify CocoaPods which XCode target should be integrated with we have to use the property **link_with**. The table below summarizes which Pods target is integrated with each Project target.

| Pods targets \ Project targets | Redbooth | UnitTests  |  SnapshotTests |
|----------------|----------------------------|---|---|
| app | x    |  x |  x |
| test   |   |  x |  x |
| snapshottest   |  |   |  x |

Execute `pod install` and wait until it integrates the pods into the different target. 

**Note**: We've noticed that in some cases, especially if you have been changing your Podfile a lot the integration might not be ok. If you try to compile the project after doing so you might run into problems:
1. Check that **Link Binary With Libraries** section in *Build Phases* of each target contains only the `libPods-xxx.a` file of the CocoaPods target that you selected to be integrated there.
2. Check in the project **configurations** that each target has the proper pod config linked.
3. Finally ensure that in the scheme settings, build section, targets are listed there and in the proper order (mentioned previously)

If everything is right you should be able to **Run** your application using the main target in any device and execute your **Tests** from the tests scheme.

## A bit about snapshot tests
![snapshot-tests](http://maniacdev.com/wp-content/uploads/2014/07/Snapshots.jpg)
Snapshot tests are not very common in the world of testing, however they are becoming more popular thanks overall to that Facebook's library. Since we started using it the number of regressions introduced in design has decreased and now the designers can check that the results **match their expectations and desings**. 

Basically the snapshot tests consist of a definition for **snapshots creation** and then once it's checked that the snapshot is ok, the **snapshot checking tests** snapshots are stored in your project folder and they are used for future tests. If tests are executed and there's no incoherence between these images and the tested views, tests will pass but if something is detected the test won't pass giving you a **command to be used with the software [Kaleidoscope](http://www.kaleidoscopeapp.com/)**. Take a look at the example below where we define the test for testing a header view and an example of failed test shown in Kaleidoscope. The failed example shows an animation with the introduced UI bug *(Someone changed the left margin and it was detected)*

```objc
#import "TBHeaderView.h"

SpecBegin(TBHeaderView)

describe(@"header view", ^{
    it(@"matches view", ^{
        TBHeaderView *view = [[TBHeaderView alloc] initWithFrame:CGRectMake(0, 0, 320, 44)];
        [view setSectionName:@"DuckTest" sectionCount:60];
        if (SNAPSHOT_RECORDING) {
            expect(view).to.recordSnapshotNamed(@"TBHeaderView");
        }
        else {
            expect(view).to.haveValidSnapshotNamed(@"TBHeaderView");
        }
    });
});
SpecEnd
```

![gif](http://cl.ly/image/0r1N431Z3022/Screen%20Recording%202014-10-10%20at%2003.59%20pm.gif)

## Next steps

- **Continuous integration**: Tests are great but how do you know wether someone's changes have broken them or not? This is where continuous integration plays an important role. Solutions like XCode Server, Travis CI or Jenkins should be taken into account to ensure nothing is broken.
- **Specta templates**: I recommend you to install this XCode template https://github.com/luiza-cicone/Specta-Templates-Xcode to create tests using that predefined structure. You can install it using [Alcatraz](http://alcatraz.io/).
- **Snapshots for XCode**: There's another plugin to check the results of the snapshot tests. You can install it using Alcatraz too. https://github.com/orta/Snapshots
- **Test, test, test**: Don't think testing is something useless. When you start having a big app with a lot of components interacting between them regressions could appear easily and with tests they would be detected before passing the app to the QA team.

## Documentation
- [**Unit Testing**](http://nshipster.com/unit-testing/), by Matt
- [**Test Driving iOS**](http://robots.thoughtbot.com/test-driving-ios-a-primer), Thoughbot
- [**TDD With Specta and Expecta**](http://appleprogramming.com/blog/2014/01/18/tdd-with-specta-and-expecta/), by Apple Programming
- [**Lightweight bdd for iOS and OSX**](http://www.artandlogic.com/blog/2013/05/lightweight-bdd-for-ios-and-os-x/), by Art & Logic
- [**Test-Drive iOS Development (Book)**](http://www.amazon.com/Test-Driven-iOS-Development-Developers-Library/dp/0321774183), by Graham Lee 
- [**Snapshot testing**](http://www.objc.io/issue-15/snapshot-testing.html), by objc.io