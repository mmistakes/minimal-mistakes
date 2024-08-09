---
layout: single
published: false
title: "Horoscope app with Gemini AI & SwiftUI"
excerpt: "In this post we'll look at one of the important capabilities of AI models i.e. Summarization. You may have seen this when browsing the reviews section of Amazon where before the actual reviews, you see an AI generated summary of the reviews posted for the given product."
seo_title: "Horoscope app with Gemini AI & SwiftUI on iOS"
seo_description: "Horoscope app with Gemini AI & SwiftUI on iOS"
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
<!--![image](/assets/images/post13/horoscope-thumbnail.png)-->

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/bxiP1J4-V8w?controls=0" frameborder="0" allowfullscreen></iframe>

Watch the video or follow along with the post below.

<!--[<img src="https://img.youtube.com/vi/bxiP1J4-V8w/hqdefault.jpg" width="600" height="350"
/>](https://www.youtube.com/embed/bxiP1J4-V8w)-->

Previously, we saw how to [easily integrate the Gemini AI SDK](https://www.anupdsouza.com/ios/ai/getting-started-with-gemini/) to perform simple text-only interactions, then created a [multi-turn chat interface](https://www.anupdsouza.com/ios/ai/chat-with-gemini/) & followed it up with a [multimodal chat interface](https://www.anupdsouza.com/ios/ai/multimodal-chat-with-gemini/) that combined sending images as well as text. In this post we'll look at one of the important capabilities of AI models i.e. Summarization.

You may have seen this when browsing the reviews section of Amazon where before the actual reviews, you see an AI generated summary of the reviews posted for the given product. For those unfamiliar, it looks something like this.

![image](/assets/images/post13/amazon-reviews.png)

Most LLM's these days are capable of summarization. The following text extract from Google's Document AI best describes it:
> Put simply, AI summarization is the use of AI technologies to distill text, documents, or content into a short and easily digestible format. For example, AI summarization can use natural language processing or understanding to condense a long PDF and restate its most important takeaways in just a few sentences.

This is extremely beneficial, again as described by Google's Document AI

> The benefits of AI summarization range from cost savings to improved accessibility to information. AI summarization can help businesses and organizations save time and money when producing research, business intelligence, or insights. AI-powered summarization can extract key information from news articles, research, legal and financial documents, technical literature, and even customer feedback. Summartization, then, means more time acting on information instead of sifting through it.

Broadly speaking, summarization helps you get to the juicy bits of information from the vast sea of data that exists. This data could be a book or as mentioned above, user reviews of a product on an e-commerce website.

I hadn't really explored Gemini AI's summarization capability until I was playing around with prompts in `Google AI Studio` when I thought it would be cool to apply the technique of summarization with a twist. Enter `tones`. We can ask Gemini to respond with a specific tone during our conversation. When queried about conversational tones, this is what Gemini responded with:

> How can I set the conversation tone? What are the available options?

> **Available options for setting the conversation tone:**
>1. **Formal:** Use polite and respectful language, avoid slang or colloquialisms, and maintain a professional demeanor.
>2. **Informal:** Use casual and conversational language, including slang or colloquialisms, and adopt a friendly and relaxed tone.
>3. **Humorous:** Infuse the conversation with humor, jokes, or witty remarks to create a lighthearted and enjoyable atmosphere.
>4. **Serious:** Maintain a somber and earnest tone, avoiding humor or casual language, and focus on discussing important or sensitive topics.
>5. **Enthusiastic:** Convey excitement and passion through your words and语气, using energetic language and expressive gestures.
>6. **Empathetic:** Demonstrate understanding and compassion by actively listening, using empathetic statements, and showing concern for the other person's feelings.
>7. **Assertive:** Express your thoughts, feelings, and opinions confidently and directly, while respecting the other person's perspective.
>8. **Passive:** Avoid expressing your thoughts, feelings, or opinions directly, and instead focus on accommodating the other person's needs and desires.
>9. **Aggressive:** Express your thoughts, feelings, and opinions forcefully and insistently, potentially disregarding the other person's perspective.
>10. **Neutral:** Maintain a neutral and objective tone, avoiding strong emotions or opinions, and focusing on presenting facts and information.

Using this capability, we could easily modify the tone of conversation the AI model has with a user.

```
enum HoroscopeStyle: String, CaseIterable {
    case original
    case formal
    case informal
    case humorous
    case serious
    case enthusiastic
    case pessimistic
    case empathetic
    case assertive
    case passive
    case aggressive
    case neutral
}
```

And that's what we will use in our horoscope application. The process is simple, first we get the daily horoscope for a user and depending on the `tone/style` selected we ask Gemini AI to summarize the received horoscope and display it to the user for a more adventurous reading. The good thing about Google AI Studio is that it has a `<> Get Code` option that provides you with template code in  cURL, Python, JS, Kotlin or as in our case, Swift.

We begin by creating a simple UI that allows the user to switch between zodiac signs and select a tonal style before fetching the horoscope.

![image](/assets/images/post13/horoscope-ui.png)

Which gives us something like this:

![image](/assets/images/post13/aries-original.png)

We then fetch the daily horoscope, in this case I'm using an api created by Ashutosh Krishna:
```
https://horoscope-app-api.vercel.app/
``` 
The API allows `GET` requests with the `sign` and the `day` such as 'today', 'tomorrow' etc. We then ask Gemini AI to summarize the horoscope with the selected style with a prompt like so:

`"Summarize the following horoscope with a \(currentStyle.rawValue) tone:\n "`

![image](/assets/images/post13/horoscope-data-request.png)

Finally we display the summarized horoscope reading to the user. 

![image](/assets/images/post13/aries-ai-reading.png)

Thanks to Gemini's summarization capabilities, we managed to create a fun little horoscope application :)
And that's it! The complete code can be found [here.](https://github.com/anupdsouza/ios-gemini-ai-horoscope)


Leave a comment if you have any questions and share this article if you found it useful  !
