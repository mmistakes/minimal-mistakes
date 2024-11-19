---
layout: single
published: true
title: "Multi-turn Chat with Gemini AI on iOS with SwiftUI"
excerpt: "In the previous post we saw how we could send some text-only input & get a response from Gemini AI's `gemini-pro` model. This is alright for simple tasks but to have a more conversational dialogue with the AI, this is not sufficient."
seo_title: "Multi-turn Chat with Gemini AI on iOS with SwiftUI"
seo_description: "Multi-turn Chat with Gemini AI on iOS with SwiftUI"
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
---
<!--[<img src="https://img.youtube.com/vi/VO3YGN2UuHc/hqdefault.jpg" width="600" height="350"
/>](https://www.youtube.com/embed/VO3YGN2UuHc)-->

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/VO3YGN2UuHc?controls=0" frameborder="0" allowfullscreen></iframe>

Watch the video or follow along with the post below.

In the [previous post](https://www.anupdsouza.com/ios/ai/getting-started-with-gemini/), we saw how we could send some text-only input & get a response from Gemini AI's `gemini-pro` model. This is alright for simple tasks but to have a more conversational dialogue with the AI, this is not sufficient. Thankfully, Google has a solution for that.

According to the documentation
> Using Gemini, you can build freeform conversations across multiple turns. The SDK simplifies the process by managing the state of the conversation, so unlike with generateContent, you don't have to store the conversation history yourself.


So, all is well? Actually, no.
For starters, according to the documentation:
> Note: The gemini-pro-vision model (for text-and-image input) is not yet optimized for multi-turn conversations. Make sure to use gemini-pro and text-only input for chat use cases.

This means we cannot have conversations with the AI that involve image inputs, that's what the `gemini-pro-vision` model is for. So for now, we can build a text-only exchange with the AI using the `gemini-pro` model.

The SDK simplifies this with the `Chat` object.
> An object that represents a back-and-forth chat with a model, capturing the history and saving the context in memory between each message sent. 

Initialising an instance of `Chat` is as simple as:
```
var chat = GenerativeModel(name: "gemini-pro", apiKey: APIKey.default).startChat(history: history)
```
Here, `history` is any existing history  you'd like to pass to the client of type `ModelContent` that is comprised of the `role` (whether user or the ai model) and `parts` (the actual content). The `Chat` client then maintains this history in memory so you could actually refer previous inputs & AI will be able to go back & process it for the duration of the current session.

Looking at the documentation, Google's sample projects implement a rudimentary chat storage for display purposes. The easiest way to do this would be to first define the role for each message, whether sent by the user(input) or received from the model(output)

```
enum ChatRole {
    case user
    case model
}
```
We can then construct a `ChatMessage` like so:
```
struct ChatMessage: Identifiable, Equatable {
    let id = UUID().uuidString
    var role: ChatRole
    var message: String
}
```
The `id` here will come in handy with a `ScrollViewProxy` to scroll to the most recent message in the chat when we receive a response from the AI & add it to our chat storage.
Finally, we create the `Chat` instance with the `gemini-pro` model, start a chat and send messages.
```
chat = GenerativeModel(name: "gemini-pro", apiKey: APIKey.default).startChat(history: history)

let response = try await chat?.sendMessage(message)

```
Notice that we call the `sendMessage` function here compared to the `generateContent` function we were calling on the model in the previous post.

With some cosmetic detailing applied to give it a messaging look & feel, we can have something like this:


![image](/assets/images/post11/gemini-chat.png)


And that's it! The complete code can be found [here.](https://github.com/anupdsouza/ios-gemini-chat)


Leave a comment if you have any questions and share this article if you found it useful  !
