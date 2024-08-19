---
layout: single
title: "Multimodal Chatbot with Gemini API using the Vertex AI for Firebase SDK on iOS - A Step-by-Step Guide"
excerpt: "In this post we'll see yet another way to interact with Gemini API using Vertex AI for Firebase SDK's."
seo_title: "Multimodal Chatbot with Gemini API using the Vertex AI for Firebase SDK on iOS"
seo_description: "Multimodal Chatbot with Gemini API using the Vertex AI for Firebase SDK on iOS"
categories:
  - iOS
  - AI
tags:
  - Swift
  - SwiftUI
  - iOS Development
  - AI
  - Gemini
  - Google
  - VertexAI
  - Firebase
---
<!--![image](/assets/images/post18/vertex-firebase-thumbnail.png)-->

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/aEMGUF7Smro?controls=0" frameborder="0" allowfullscreen></iframe>

Watch the video or follow along with the post below.

<!--[<img src="https://img.youtube.com/vi/aEMGUF7Smro/hqdefault.jpg" width="768" height="432"
/>](https://www.youtube.com/embed/aEMGUF7Smro)-->

Previously [we've seen](https://youtu.be/X-zs-wa6j28) how to use the Gemini AI Generative Swift SDK to chat with the LLM using text-based requests. We then explored how to use the [Firebase extension](https://youtu.be/GewyZgQbsIw) in order to interface with Gemini. In this post we'll see yet another way to interact with Gemini API using Vertex AI for Firebase SDK's. The Firebase setup is similar to using the extension so if you've been following my posts, the next few steps should feel familiar.

Head on over to `https://console.firebase.google.com` & sign in with your Google account.

* Select `Go to Console`

![image](/assets/images/post18/p18-1.png)

* Select an existing iOS+ project. If you don't have one, select `Add Project` or `Create a project`

![image](/assets/images/post18/p18-2.png)

* Give your project a name & hit `Continue`

![image](/assets/images/post18/p18-3.png)

* The next step will recommend that you enable Google Analytics for your project. It is not required for this guide, so you can turn off the toggle & select `Create project`. Wait a while as the project is created. If you do choose to enable Google Analytics, you will be asked to select a Google Analytics account in the next step before you create the project.

![image](/assets/images/post18/p18-4.png)

* You will now see the project overview panel. Select the `iOS+` option to create an Apple app in Firebase.

![image](/assets/images/post18/p18-5.png)

* Add a bundle id & note it down somewhere to create an Xcode project with the same bundle id later. Select `Register app`

![image](/assets/images/post18/p18-6.png)

* Download the `GoogleService-Info.plist` file on your system. Select `Next`

![image](/assets/images/post18/p18-7.png)

* Open Xcode & create a new project in SwiftUI with the bundle identifier you entered earlier. Drag & drop the `GoogleService-Info.plist` you downloaded in the previous step into your Xcode project.

![image](/assets/images/post18/p18-8.png)

* While still in Xcode, go to `File > Add Package Dependencies...` to add the Firebase SDK.

![image](/assets/images/post18/p18-9.png)

* Enter the following url in the package search bar `https://github.com/firebase/firebase-ios-sdk` & select `Add Package`.

![image](/assets/images/post18/p18-10.png)

* Go back to the Firebase console to `Add initialisation code`

![image](/assets/images/post18/p18-11.png)

* Copy the code snippet as you see & add it your Xcode project's `App.swift` file.

![image](/assets/images/post18/p18-12.png)

* Go back to the Firebase console, Click `Next` & then click `Continue to the console`

![image](/assets/images/post18/p18-13.png)

* In the console, you will see your `Project Overview`. Click the `Build with Gemini` option in the side bar.

![image](/assets/images/post18/p18-14.png)

* Once the pane loads, scroll to the bottom & click on `Get started` in the `Build AI-powered apps with the Gemini API` pane.

![image](/assets/images/post18/p18-15.png)

* Select your billing account in the popup window that opens & click `Continue`. Proceed to select a budget to complete upgrading your project. (Refer to my [previous post](https://www.anupdsouza.com/posts/gemini-firebase-extension/) if you need help with setting up billing for your project from scratch)

![image](/assets/images/post18/p18-16.png)

![image](/assets/images/post18/p18-17.png)

* Close the `Upgrade Complete` dialog above & then click on `Enable APIs` in the `Build with the Gemini API` pane.

![image](/assets/images/post18/p18-18.png)

* Then click `Continue` in step 3 to `Add Vertex AI SDK for Firebase`.

![image](/assets/images/post18/p18-19.png)

* Select `+ Register for App Check` in the next pane. This is an important auth step to prevent unauthorized access to backend resources. On iOS you can do so using `DeviceCheck` or `AppAttest` which is **recommended**. However for the sake of this tutorial we will setup debug app check for the iOS Simulator. Click `Get started` in the `App Check` pane.

![image](/assets/images/post18/p18-20.png)

![image](/assets/images/post18/p18-21.png)

* Click on the 3-vertical dots to Open the menu against your app. Then click on `Manage debug tokens`.

![image](/assets/images/post18/p18-22.png)

![image](/assets/images/post18/p18-23.png)

* Click `Add debug token`

![image](/assets/images/post18/p18-24.png)

* Enter a name in the `My debug token` field, say, `Simulator`. For the `Value` we will get this from our iOS app.

![image](/assets/images/post18/p18-25.png)

* Go back to your Xcode project & ensure that the `FirebaseAppCheck` framework is linked.

![image](/assets/images/post18/p18-26.png)

* Switch to your `App.swift` file & add the following code to setup `AppCheckDebugProviderFactory`. 

![image](/assets/images/post18/p18-27.png)

* Add `-FIRDebugEnabled` in the project scheme. This will enable verbose Firebase logging in the console & allow us to see the app check debug token.

![image](/assets/images/post18/p18-28.png)

* Run the app & search for `App Check debug token` in the console. Copy the value that you see next to it.

![image](/assets/images/post18/p18-29.png)

* Paste this value in the `Value` field back in the browser. Click `Save`, then click `Done`.

![image](/assets/images/post18/p18-30.png)

* Next, open `https://console.cloud.google.com`, & select your Firebase project from the dropdown menu.

![image](/assets/images/post18/p18-31.png)

* Select the hamburger menu on the left > `Solutions` > `All products`. Then search for `Vertex AI API` & `Firebase ML API` respectively & ensure that these are enabled for your project.

![image](/assets/images/post18/p18-32.png)

![image](/assets/images/post18/p18-33.png)

This concludes the Firebase Vertex AI setup. Let's build the client iOS app now. There are 2 parts to this, the chat UI which is pretty much the same as we have built in the past & the chat service in order to coordinate sending & receiving messages. We'll focus only on the `ChatService`. As in previous implementations, we need to initialise an instance of the model:

```
private var model = VertexAI.vertexAI().generativeModel(modelName: "gemini-1.5-pro-preview-0409")
```

Next, in order to send messages the method is essentially the same as working with the Gemini Generative AI Swift SDK. We need to send a multipart request with the actual message & media if any was selected. 
We define our `Media` model as follows in order to capture the `mimeType`, the actual media `data` & a `thumbnail` created for use in the chat UI.

```
struct Media {
    let mimeType: String
    let data: Data
    let thumbnail: UIImage
}
```

We then send images &/or video, make an async request to the model & extract the response `text` received as follows::

```
var chatMedia = [any ThrowingPartsRepresentable]()
// Append image data
chatMedia.append(ModelContent.Part.jpeg(mediaItem.data))
// Append video data
chatMedia.append(ModelContent.Part.data(mimetype: mediaItem.mimeType, mediaItem.data))

let response = try await model.generateContent(message, chatMedia)

guard let text = response.text else { return }
print(text)
```

We use the received response text to construct our custom chat messages & display in the UI. If you'd like you can also stream the response so as to provide a more real time experience.

Coming back to working with the media be it image or video, one needs to ensure that the file size is within acceptable limits. As per the documentation, the **maximum request size is 20 MB**. You get an error if you exceed this. When sending media data inline, it is encoded to **base64** further increasing the size of the request. If you'd like to send media that is larger in size, consider using a Cloud Storage for Firebase URL to include in the request. For chat display as well as to reduce media data size in the request we process the image by resizing the image thumbnail & compressing it. For video, we use `AVFoundation`'s `AVAssetImageGenerator` class to extract a frame of the video. Checkout the `ThumbnailService` code in the source code linked below for more info. 

Run the app & chat on!

![image](/assets/images/post18/result.png)


And that's it for this post! The complete code can be found [here](https://github.com/anupdsouza/ios-vertex-firebase-swiftui)

<!--Consider subscribing to my [YouTube channel](https://www.youtube.com/@swiftodyssey?sub_confirmation=1) & follow me on [X(Twitter)](https://twitter.com/swift_odyssey) for more such information. Leave a comment if you have any questions. 

Share this article if you found it useful !-->

Leave a comment if you have any questions!

Resources:
* https://firebase.google.com/docs/vertex-ai/get-started?platform=ios
* https://firebase.google.com/docs/vertex-ai/text-gen-from-multimodal?platform=ios#text-&-multi-images
* https://firebase.google.com/docs/app-check/ios/debug-provider?authuser=0
* https://github.com/firebase/firebase-ios-sdk/tree/main/FirebaseVertexAI
