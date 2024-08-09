---
layout: single
published: false
title: "Build a Chatbot on iOS with Firebase Gemini API Extension in Swift & SwiftUI - A Step-by-Step Guide"
excerpt: "Google has recently rolled out a Firebase extension that gives you another way of working with Gemini API but through Firebase. The advantage of this extension is that if you are familiar with Firebase, you can build a chatbot on iOS very quickly."
seo_title: "Build a Chatbot on iOS with Firebase Gemini API Extension on iOS"
seo_description: "Build a Chatbot on iOS with Firebase Gemini API Extension on iOS"
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
  - Firebase
---
<!--![image](/assets/images/post17/gemini-firebase-thumbnail.png)-->

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/GewyZgQbsIw?controls=0" frameborder="0" allowfullscreen></iframe>

Watch the video or follow along with the post below.

<!--[<img src="https://img.youtube.com/vi/GewyZgQbsIw/hqdefault.jpg" width="768" height="432"
/>](https://www.youtube.com/embed/GewyZgQbsIw)-->

Previously [we've seen](https://youtu.be/X-zs-wa6j28) how to use the Gemini AI Swift SDK to chat with the LLM using text-based requests. Google has recently rolled out a Firebase extension that gives you another way of working with Gemini API but through Firebase. The advantage of this extension is that if you are familiar with Firebase, you can build a chatbot on iOS very quickly. With some configuration which is pretty straight-forward, making requests to Gemini is a breeze. So let's get to it! 
Head on over to https://firebase.google.com and sign in with your Google account.

* Select `Go to Console`

![image](/assets/images/post17/p17-1.png)

* Select an existing iOS+ project. If you don't have one, select `Add Project`

![image](/assets/images/post17/p17-2.png)

* Give your project a name & hit `Continue`

![image](/assets/images/post17/p17-3.png)

* The next step will recommend that you enable Google Analytics for your project. It is not required, so you can turn off the toggle & select `Create Project`. Wait a while as the project is created. If you do choose to enable Google Analytics, you will be asked to select a Google Analytics account in the next step before you create the project.

![image](/assets/images/post17/p17-4.png)

* You will now see the project overview panel. Select the `iOS+` option to create an Apple app in Firebase. The next few steps should be familiar to you if you've worked with Firebase on iOS before.

![image](/assets/images/post17/p17-5.png)

* Add a bundle id and note it down somewhere to create an Xcode project with the same bundle id later. Select `Register app`

![image](/assets/images/post17/p17-6.png)

* Download the `GoogleService-Info.plist` file on your system. Select `Next`

![image](/assets/images/post17/p17-7.png)

* Open Xcode & create a new project in SwiftUI. Drag & drop the `GoogleService-Info.plist` you downloaded in the previous step into your Xcode project.

![image](/assets/images/post17/p17-8.png)

* While still in Xcode, go to `File > Add Package Dependencies...` to add the Firebase SDK.

![image](/assets/images/post17/p17-9.png)

* Enter the following url in the package search bar `https://github.com/firebase/firebase-ios-sdk` & select `Add Package`.

![image](/assets/images/post17/p17-10.png)

* Go back to the Firebase console to `Add initialisation code`

![image](/assets/images/post17/p17-11.png)

* Copy the code snippet as you see & add it your Xcode project's App.swift file. Remember to remove the `@main` attribute from the default `App` struct

![image](/assets/images/post17/p17-12.png)

* Go back to the Firebase console, Click `Next` & then click `Continue to Console`

![image](/assets/images/post17/p17-13.png)

* In the console, you will see your `Project Overview`. Click the `Build` option in the side menu to expand it, then click on `Firestore Database`

![image](/assets/images/post17/p17-14.png)

* Once the pane loads, click on `Create database`, leave the `Database ID` to default & choose a location nearest to you from the `Location` dropdown. Note that this cannot 
be changed later. Click `Next`.

![image](/assets/images/post17/p17-15.png)

![image](/assets/images/post17/p17-16.png)

* Select `Start in test mode` in the next step, then click `Create`. Starting in test mode helps you read/write to the Firestore DB quickly with relaxed security 
rules. It is advised that you later setup auth rules to prevent misuse or malicious access to the Firestore DB.

![image](/assets/images/post17/p17-17.png)

* Setting up the Firestore DB will take a few seconds, after which you will see the `Data` panel. You have now setup the Firestore DB successfully.

![image](/assets/images/post17/p17-18.png)

* Click the `Build` option in the side menu to expand it, then click on `Extensions`

![image](/assets/images/post17/p17-19.png)

* The Extensions pane will load & you will see the `Build Chatbot with the Gemini API` extension option. Click on `Install`. If you don't see the extension here, click on `Explore Extensions Hub` & search for the extension there.

![image](/assets/images/post17/p17-20.png)

* On the next screen in the `Set up billing` step, scroll to find the `Upgrade project to continue` option.

![image](/assets/images/post17/p17-21.png)

* Select `Continue` in the popup dialog that appears.

![image](/assets/images/post17/p17-22.png)

* In the billing screen that appears next, confirm your `Country` & `Currency` then click `CONFIRM`

![image](/assets/images/post17/p17-23.png)

* You will be presented with your Payment profile & payment method. Set these up if you haven't done them before, then click `CONFIRM PURCHASE`

![image](/assets/images/post17/p17-24.png)

* Click `CONTINUE` when presented with your chosen payment option. You will be charged a small fee for verification (₹2 for residents of India) 

![image](/assets/images/post17/p17-25.png)

* Payment confirmation should happen quickly & you should be taken back to the `Install Extension` screen with your billing account detail shown. If you have multiple billing accounts, select the one you want to use from the dropdown, then click `Continue`. If for some reason you dont see it, just click on the `Upgrade project to continue` option again.

![image](/assets/images/post17/p17-26.png)

* Next, set a budget amount & click `Continue`. This is because the firebase extension runs in the cloud for which you are charged a very small fee. This budget helps you make requests to the Gemini API. Note that Google will notify you on 50, 90 & 100% utilisation of the budget. You can customise this later.

![image](/assets/images/post17/p17-27.png)

* Confirm your purchase by clicking on `Purchase` in the next step.

![image](/assets/images/post17/p17-28.png)

* You should see this on successfully upgrading your project. Close the dialog to proceed.

![image](/assets/images/post17/p17-29.png)

* In the `Review APIs enabled and resources created` step, take a look around. The extension enables the Vertex AI API for access to the Vertex AI Gemini API, creates Cloud functions to listen to Firestore DB data changes as well as generate conversations & also enables the Cloud Secret Manager to discreetly use the Google AI API Key in your requests. Previously with the Gemini Swift SDK, you'd have had to create a secret key in app studio & manage passing it in Gemini API requests manually. Here, the extension does it for you automatically!

* Scroll & enable the `Artifact Registry`, `Cloud Functions` & `Secret Manager` services.

![image](/assets/images/post17/p17-30.png)

* Next, in the `Review access granted to this extension` step, review the descriptions of what the service account created for your project has access to. Then click `Next`

![image](/assets/images/post17/p17-31.png)

![image](/assets/images/post17/p17-32.png)

![image](/assets/images/post17/p17-33.png)

![image](/assets/images/post17/p17-34.png)

* In the `Configure extension` step, change the Gemini API Provider from `Google AI` to `Vertex AI`. If you choose `Google AI`, you will need to enter the Gemini API secret key in the next field. The next few fields show the Gemini model that will be used i.e. `gemini-pro`, the Firestore collection path i.e. `generate` & the `prompt` & `response` fields. The collection path is the Firestore database path where all chats will be stored as `documents`, while the `prompt` & `response` fields will hold the messages sent to & responses received from the Gemini API. You will see these over the next few steps. You can change the collection path to something else, say `chat`. Just remember it though as we will need it in the iOS app.

![image](/assets/images/post17/p17-35.png)

* Select a location closest to you in the `Cloud Functions location` dropdown. Note that this cannot be changed later so choose wisely.

![image](/assets/images/post17/p17-36.png)

* Review the descriptions of the other optional fields, such as Order Field (used for ordering conversation history), Context (a string providing context for the conversation), Temperature (controls the randomness of the AI response), Hate Speech, Dangerous Content, Sexual Content thresholds etc. by clicking on the (?) icon. Leave these at their default values for now. Scroll to the end & click `Install extension`.

![image](/assets/images/post17/p17-37.png)

* You will see the chatbot extension installing, this may take a few mins.

![image](/assets/images/post17/p17-38.png)

![image](/assets/images/post17/p17-39.png)

* Go back to the `Build` option from the side menu & choose `Firestore Database`. Then click on `+ Start Collection`. For `Collection ID`, enter the Firestore collection path i.e. `generate`. If you changed this in the previous steps while enabling the extension, enter that path here. Click `Next`

![image](/assets/images/post17/p17-40.png)

* In the next pane, select `Auto-ID` for `Document ID`, enter `prompt` for the `Field`, keep the type as String & enter a prompt string such as `Tell me a joke` in the `Value` field. Click `Save`. This will create a new document/chat message with the prompt sent to Gemini API.

![image](/assets/images/post17/p17-41.png)

* Within a few seconds you should see the `prompt` processing complete & a response returned from the Gemini API, stored in the DB.

![image](/assets/images/post17/p17-42.png)

This concludes setting up of the extension. Let's build the client iOS app now.

* Go to your Xcode project's Target settings & add the `FirebaseFirestore` & `FirebaseFirestoreSwift` frameworks in the `Frameworks, Libraries, and Embedded Content` section.

![image](/assets/images/post17/p17-43.png)

As we've seen in previous tutorials we create a simple UI with a scrolling list to display the chat conversation with a text field at the bottom to send messages to Gemini. 

```
// MARK: Chat list view
@ViewBuilder private func chatListView() -> some View {
    ScrollViewReader(content: { proxy in
        ScrollView {
            ForEach(chatService.messages, id: \.self) { chatMessage in
                chatMessageView(chatMessage)
                    .id(chatMessage.id)
            }
        }
        .onChange(of: chatService.messages) { oldValue, newValue in
            guard let recentMessage = chatService.messages.last else { return }
            DispatchQueue.main.async {
                withAnimation {
                    proxy.scrollTo(recentMessage.id, anchor: .bottom)
                }
            }
        }
    })
}

// MARK: Input view
@ViewBuilder private func inputView() -> some View {
    HStack {
        TextField("Enter a message...", text: $textInput)
            .textFieldStyle(.roundedBorder)
            .foregroundStyle(.black)
        Button(action: sendMessage, label: {
            Image(systemName: "paperplane.fill")
        })
    }
}

// MARK: Chat message view
@ViewBuilder private func chatMessageView(_ chat: Chat) -> some View {
    ChatBubble(direction: chat.isUser ? .right : .left) {
        Text(chat.message)
            .font(.title3)
            .padding(.all, 20)
            .foregroundStyle(.white)
            .background {
                chat.isUser ? Color.blue : Color.green
            }
    }
}

// MARK: Send message
private func sendMessage() {
    chatService.sendMessage(textInput)
    textInput = ""
}
```

In order to send & receive messages from the Gemini API, we create an `Observable ChatService` class that does the heavy lifting. We first create a `ChatDocument` to map the document/chat from the Firestore DB as follows:

```
struct ChatDocument: Codable {
    let createTime: Timestamp
    let prompt: String
    let response: String?
    let status: Status
    
    struct Status: Codable {
        let startTime: Timestamp?
        let completeTime: Timestamp?
        let updateTime: Timestamp
        let state: String
        let error: String?
        
        var chatState: ChatState {
            return ChatState(rawValue: state) ?? .PROCESSING
        }
    }
}
```

If you recall, the properties you see above (apart from chatState) are the fields that appear in the Firestore DB for each document/chat. Note the `prompt` & `response` properties here which map to the `prompt` & `response` fields in the FIrestore DB. We then construct our `ChatService` class like so:

```
import FirebaseFirestore
import FirebaseFirestoreSwift

@Observable class ChatService {
    private(set) var messages: [Chat] = []
    private var db = Firestore.firestore()
    private let collectionPath = "generate"
    
    func fetchMessages() {
        db.collection(collectionPath)
            .order(by: "createTime", descending: false)
            .addSnapshotListener { [weak self] querySnapshot, error in
                guard let self else { return }
                guard let documents = querySnapshot?.documents else {
                    print("No documents found")
                    return
                }
                
                messages = documents.compactMap { snapshot -> [Chat]? in
                    do {
                        let document = try snapshot.data(as: ChatDocument.self)
                        let prompt = Chat(text: document.prompt, isUser: true, state: .COMPLETED)
                        let response = Chat(text: document.response ?? "", isUser: false, state: document.status.chatState)
                        return [prompt, response]
                    } catch {
                        print(error.localizedDescription)
                        return nil
                    }
                }.flatMap { $0 }
            }
    }
    
    func sendMessage(_ message: String) {
        let placeholderMessages = [Chat(text: message, isUser: true, state: .COMPLETED), Chat(text: "", isUser: false)]
        messages.append(contentsOf: placeholderMessages)
        db.collection(collectionPath).addDocument(data: ["prompt": message])
    }
}
```

In the `fetchMessages()` function, we create a Snapshot Listener to continually monitor the Firestore DB we created above for changes at the `collectionPath`, ordered by the `createTime` field. We then decode each document/chat from the snapshot into our decodable `ChatDocument`. Finally we create 2 `Chat` instances, one for the user's input & one for the AI while we wait for the response. To send a message to the API, we call the `sendMessage()` function where we add a new document at the given collection path via the `prompt` field.

```
struct Chat: Hashable {
    private(set) var id: UUID = .init()
    var text: String?
    var isUser: Bool
    var state: ChatState = .PROCESSING
    var message: String {
        switch state {
        case .COMPLETED:
            return text ?? ""
        case .ERROR:
            return "Something went wrong. Please try again."
        case .PROCESSING:
            return "..."
        }
    }
}
```

Run the app & the chat service will fetch any existing chats from the Firestore DB, always keeping it in sync as you send messages from the iOS app.

![image](/assets/images/post17/result.png)

As you've seen by now, it's not that hard to setup a chatbot on iOS thanks to the firebase extension. What I particularly love about this is the chat storage that you get along with chat context that persists for quite some time. The extension should unlock a lot of possiblities especially if you love Gemini & Firebase.

And that's it for this post! The complete code can be found [here](https://github.com/anupdsouza/ios-gemini-firebase-swiftui)

Consider subscribing to my [YouTube channel](https://www.youtube.com/@swiftodyssey?sub_confirmation=1) & follow me on [X(Twitter)](https://twitter.com/swift_odyssey) for more such information. Leave a comment if you have any questions. 

Share this article if you found it useful !

Resources:
* https://extensions.dev/extensions/googlecloud/firestore-genai-chatbot
* https://ai.google.dev/gemini-api/docs/firebase-extensions
* [Firebase after hours on YT](https://www.youtube.com/live/WbaCQ5ZnHwI)

