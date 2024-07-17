---
layout: single
title: "Voice & Video Calling app on iOS using ZEGOCLOUD API - Swift Tutorial"
excerpt: "In this tutorial I will guide you on how to create a voice & video calling app using ZEGOCLOUD"
seo_title: "Voice & Video Calling app on iOS using ZEGOCLOUD API | Swift Tutorial"
seo_description: "Learn how to create voice & video calling apps on iOS using ZEGOCLOUD"
categories:
  - iOS
tags:
  - Swift
  - iOS Development
  - ZEGOCLOUD
  - Video Calling
  - Voice Calling
---
<!--![image](/assets/images/post20/zegocloud-thumbnail.png)!-->
<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/6_zJ4I_xdKM?controls=0" frameborder="0" allowfullscreen></iframe>

Watch the video or follow along with the post below. 

<!--[<img src="https://img.youtube.com/vi/6_zJ4I_xdKM/hqdefault.jpg" width="768" height="432"
/>](https://www.youtube.com/embed/6_zJ4I_xdKM)-->

In this tutorial I will guide you on how to create a voice & video calling app using [ZEGOCLOUD](https://www.zegocloud.com/). ZEGOCLOUD is a leading realtime interaction platform that provides developers with an extensive array of tools and services designed to effortlessly incorporate real-time video communication into applications. With superior video and audio quality, low latency, and the ability to scale, ZEGOCLOUD is a reliable choice for adding video call functionalities to iOS apps & their [UIKit's](https://www.zegocloud.com/uikits) make it easy to integrate into existing projects as well. In the following post we'll implement 1-on-1 voice & video calling feature in our iOS application. 

Visit https://console.zegocloud.com & click on `Sign up`

![image](/assets/images/post20/p20-1.png)

Enter your basic details & click on `Start your free trial`

![image](/assets/images/post20/p20-2.png)

You will now be shown your `Dashboard`, but before that you need to enter a few more details so that ZEGOCLOUD can suggest suitable products. Fill in the details, then click `Continue`

![image](/assets/images/post20/p20-3.png)

You will now see the benefits popup offering you 10000 free minutes & advanced support. Click `Go to dashboard`

![image](/assets/images/post20/p20-4.png)

Click on `Create your first project`

![image](/assets/images/post20/p20-5.png)

You will then see several use cases such as Voice & Video Call, Video Conference, Live Streaming, In-app Chat etc. Choose `Voice & Video Call`, then click `Next`.

![image](/assets/images/post20/p20-6.png)

![image](/assets/images/post20/p20-7.png)

Enter a name for your project on the next screen.

![image](/assets/images/post20/p20-8.png)

Scroll down & click on `Start with UIKits` option.

![image](/assets/images/post20/p20-9.png)

Wait for the project to be created

![image](/assets/images/post20/p20-10.png)

![image](/assets/images/post20/p20-11.png)

On the next screen, you will see the available supported frameworks by ZEGOCLOUD. Click on `For iOS` option.

![image](/assets/images/post20/p20-12.png)

Next, you will see add-on options for 1-on-1 calls as well as Group Calls. We'll leave these at their defaults. Click the `Save & Start to Integrate` option on the bottom right.

![image](/assets/images/post20/p20-13.png)

On the app configuration screen next, you will see your `AppID` & `AppSign` values. These are confidential to your app & required for it to work. We'll see how in a while.

![image](/assets/images/post20/p20-14.png)

Open Xcode & `Create a New Project` & give it a name. For this demo, we'll go with the Storyboard Interface option.

![image](/assets/images/post20/p20-15.png)

Next, open `Terminal` & change directory to your project folder. We'll now install the ZEGOCLOUD dependencies via `Cocoapods`. Enter `pod init` command to create a Podfile.

![image](/assets/images/post20/p20-16.png)

Then open the `Podfile` in a text editor & add the following dependency:

`pod 'ZegoUIKitPrebuiltCall'`

![image](/assets/images/post20/p20-17.png)

Save & close the `Podfile` & run `pod install` command in the `Terminal`.

![image](/assets/images/post20/p20-18.png)

Wait for the dependencies to download, then open the Xcode project using the `.xcworkspace` file.

![image](/assets/images/post20/p20-19.png)

Open the ViewController.swift file & add the following import statements at the top
```
import ZegoUIKit
import ZegoUIKitPrebuiltCall
```

Add the following code inside the ViewController

```
private var userID: String = String(format: "zego_user_id_%d", Int.random(in: 0...1000))
private var callID: String = "1000"
private var appID: UInt32 = <YOUR APP ID>
private var appSign = "<YOUR APP SIGN>"
@IBOutlet private var usernameField: UITextField!
```

We've created a few variables to create a dynamic userID, then we assign a call ID `1000`. Make sure to replace `<YOUR APP ID>` & `<YOUR APP SIGN>` with those from your app configuration page in the ZEGOCLOUD Console. Finally we added an `IBOutlet` to read custom usernames from a textfield.

Now add the following code that enables functionality to make a call on button press.

```
@IBAction func makeNewCall(_ sender: Any) {
        
        usernameField.resignFirstResponder()
        
        guard let username = usernameField.text else {
            print("Username not provided")
            return
        }
        
        // You can also use groupVideo/groupVoice/oneOnOneVoice to make more types of calls.
        let config: ZegoUIKitPrebuiltCallConfig = ZegoUIKitPrebuiltCallConfig.oneOnOneVideoCall()
        
        let callVC = ZegoUIKitPrebuiltCallVC.init(appID,
                                                  appSign: appSign,
                                                  userID: self.userID,
                                                  userName: username,
                                                  callID: self.callID,
                                                  config: config)
        callVC.modalPresentationStyle = .fullScreen
        self.present(callVC, animated: true, completion: nil)
    }
```

Our UI interface looks like this. Make sure to connect the `IBOutlet` to the `usernameField` text field & the `makeNewCall` action to the `Join Call` button.

![image](/assets/images/post20/p20-20.png)

Finally, add the following key-values in the Info.plist to request access to the Camera & MIcrophone.

![image](/assets/images/post20/p20-21.png)


Build & run the app on the simulator, enter a user name & click on `Join Call`. Voila! The calling screen will be presented modally along with floating controls to control the video, camera, mic options etc.

![image](/assets/images/post20/p20-22.png)

Here's how it looks when running the app side by side on a device.

![image](/assets/images/post20/p20-23.png)

And that's it for this post! As you have seen, with ZEGOCLOUD'S UIKit's, its possible to integrate voice & video calling capabilities to your app within minutes! This enables developers to create immersive communication experiences. By leveraging ZEGOCLOUD, you can build high-quality, real-time video apps across various platforms. Whether for social networking, collaboration, or customer support, ZEGOCLOUD elevates iOS apps with enhanced interactivity and user engagement.

The complete code can be found [here](https://github.com/anupdsouza/ios-zegocloud-demo)


Consider subscribing to my [YouTube channel](https://www.youtube.com/@swiftodyssey?sub_confirmation=1) & follow me on [X(Twitter)](https://twitter.com/swift_odyssey) for more such information. Leave a comment if you have any questions. 

Share this article if you found it useful !

References:
* https://www.zegocloud.com/docs/uikit/callkit-ios/overview (ios)
