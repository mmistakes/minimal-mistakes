---
layout: single
published: true
title: "Create a Storybook app powered by Gemini AI & Dall-E with SwiftUI"
excerpt: "In this post we'll once again harness the power of Gemini AI's data generation combining it with Dall-E's image generation capability to create a storybook app for kids."
seo_title: "Create a Storybook app powered by Gemini AI & Dall-E with SwiftUI"
seo_description: "Create a Storybook app powered by Gemini AI & Dall-E with SwiftUI"
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
  - OpenAI
  - DallE
---
<!--![image](/assets/images/post16/storybook-thumbnail.png)-->

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/NOgoWd6phn0?controls=0" frameborder="0" allowfullscreen></iframe>

Watch the video or follow along with the post below.

<!--[<img src="https://img.youtube.com/vi/NOgoWd6phn0/hqdefault.jpg" width="768" height="432"
/>](https://www.youtube.com/embed/NOgoWd6phn0)-->

Stories and storybooks ignite imagination, nurture language skills, cultural awareness, emotional intelligence, and cognitive development in young minds, fostering creativity and shaping values crucial for lifelong learning and understanding. And if you're a parent, they are also the magical power & the ultimate bedtime weapon against tiny bedtime rebels!

Previously, we saw how to [create a murder mystery game](https://www.anupdsouza.com/ios/ai/murder-mystery-game-with-gemini-swiftui/) powered entirely by Gemini AI. In this post we'll once again harness the power of Gemini AI's data generation combining it with Dall-E's image generation capability to create a storybook app for kids.

Just as we have seen before, we begin by writing a prompt for Gemini with as much detail as possible for generating stories. This time I've elaborated the prompt much more so as to generate child friendly stories. Checkout the prompt below:

```
I want you to create a children's story with the following prompt: \(promptText)
# Specific Instructions:
1. The story should be appropriate for the age group 4-6 years old.
2. The story should be composed of short sentences with simple words that are easy to pronounce.
3. Look for character names in the input prompt & if they exist, make them central to the story. If not, provide simple character names.
4. The progression of the story should be consistent with a clear start, middle & end with a satisfying conclusion.
5. Consider using rhyme & repitition in the story & incorporate vivid imagery for the story environment.
7. The story MUST ALWAYS BE EXACTLY 8 sentences long. Provide a title as well as a moral.
8. Once you create the entire story, combining 2 story sentences at a time; create a total of 4 one line prompts for generating images of the story.
9. Consider the entire story when creating image prompts.
10. Always include character information in the prompt. For example, if the character is a human, animal etc.
11. The prompts should be self contained but also convey the context with respect to the complete story.
12. DO NOT use markdown in the response & provide the details in the form of the following JSON structure:

{
    var title: String
    var moral: String
    var story: [String]
    var imagePrompts: [String]
}
```

Some important points to note about the prompt:
* I've explicitly specified the age group
* I've also specified the writing style & composition of the story viz. short sentences, simple words, progressing structurally with a start, middle & end. 
* I also request prompts for image generation by processing the entire story once Gemini generates it. The prompts will be supplied to Dall-E.
* Lastly, I provide a model JSON structure for returning the details. 

The code to fetch a story from Gemini therefore looks like this:

```
private let geminiModel = GenerativeModel(name: "gemini-1.0-pro", apiKey: APIKey.gemini)

func fetchStory(_ promptText: String) async {
    fetchingStory = true
    errorFetchingStory = false
    
    do {
        let prompt = """
        I want you to create a children's story with the following prompt: \(promptText)
        # Specific Instructions:
        1. The story should be appropriate for the age group 4-6 years old.
        2. The story should be composed of short sentences with simple words that are easy to pronounce.
        3. Look for character names in the input prompt & if they exist, make them central to the story. If not, provide simple character names.
        4. The progression of the story should be consistent with a clear start, middle & end with a satisfying conclusion.
        5. Consider using rhyme & repitition in the story & incorporate vivid imagery for the story environment.
        7. The story MUST ALWAYS BE EXACTLY 8 sentences long. Provide a title as well as a moral.
        8. Once you create the entire story, combining 2 story sentences at a time; create a total of 4 one line prompts for generating images of the story.
        9. Consider the entire story when creating image prompts.
       10. Always include character information in the prompt. For example, if the character is a human, animal etc.
       11. The prompts should be self contained but also convey the context with respect to the complete story.
       12. DO NOT use markdown in the response & provide the details in the form of the following JSON structure:

        {
            var title: String
            var moral: String
            var story: [String]
            var imagePrompts: [String]
        }
      """

        let response = try await geminiModel.generateContent(prompt)
        print(response.text ?? "")
        guard let text = response.text?.replacingOccurrences(of: "```", with: "").replacingOccurrences(of: "json", with: ""),
              let data = text.data(using: .utf8) else {
            fetchingStory = false
            errorFetchingStory = true
            return
        }
        
        let story = try JSONDecoder().decode(Story.self, from: data)
        var storyText = [String]()
        for i in stride(from: 0, to: story.story.count, by: 2) {
            let combined = (i < story.story.count - 1) ? "\(story.story[i]) \(story.story[i + 1])" : "\(story.story[i])"
            storyText.append(combined)
        }
        print(storyText)
        var storyBook = Storybook(title: story.title, moral: story.moral, story: storyText)
        
        do {
            let images = try await generateImages(for: story.imagePrompts, story: storyText.joined(separator: " "))
            storyBook.images.append(contentsOf: images)
            books.append(storyBook)
        } catch {
            fetchingStory = false
            errorFetchingStory = true
            print("Error generating images: \(error)")
        }

        print("the story: \(story.story.joined())")
        
        await MainActor.run {
            withAnimation {
                fetchingStory = false
                errorFetchingStory = false
            }
        }
    }
    catch {
        fetchingStory = false
        errorFetchingStory = true
        print(error.localizedDescription)
    }
}
```

Note that I request for image prompts by combining 2 story sentences at a time. This is because I intented for the storybook to have 4 pages, each displaying an image and 2 sentences. Since at present there is no way to generate images using Gemini via the [Swift SDK](https://github.com/google/generative-ai-swift), so we use the [OpenAIKit](https://github.com/OpenDive/OpenAIKit.git) helper package for interacting with OpenAI. Once we have the image prompts given to us by Gemini, the next task is to once again provide a prompt to OpenAI's Dall-E3 model to generate images. Remember that when registering with OpenAI as a new user, you are given $5 in credits that are utilised towards image generation so use it wisely as the credits expire after a few months and you'd have to purchase additional credits.

```
Given the following story for context enclosed between the $ symbol: $\(story)$,
generate a children's story book style image with the following prompt: \(prompt)
```

The code to generate images from Dall-E3 then looks like this:

```
private let openAi = OpenAI(Configuration(organizationId: APIKey.openAIOrgId, apiKey: APIKey.openAIKey))

func generateImages(for prompts: [String], story: String) async throws -> [UIImage] {
    return try await withThrowingTaskGroup(of: (Int, UIImage).self) { group in
        var generatedImages = [UIImage?](repeating: nil, count: prompts.count)
        
        for (index, prompt) in prompts.enumerated() {
            group.addTask {
                
                do {
                    let prompt = """
                    Given the following story for context enclosed between the $ symbol: $\(story)$,
                    generate a children's story book style image with the following prompt: \(prompt)"
                    """
                    let imageParam = ImageParameters(
                        prompt: prompt,
                        resolution: .large,
                        model: ImageModel.dalle3,
                        responseFormat: .base64Json
                    )
                    let result = try await self.openAi.createImage(parameters: imageParam)
                    let b64Image = result.data[0].image
                    let image = try self.openAi.decodeBase64Image(b64Image)
                    return (index, image)
                } catch {
                    throw NSError(domain: "Image Generation", code: 0, userInfo: [NSLocalizedDescriptionKey: "Failed to create image"])
                }
            }
        }
        
        for try await (index, image) in group {
            generatedImages[index] = image
        }
        
        return generatedImages.compactMap { $0 }
    }
}
```

The code is fairly straightforward here, given the 2-sentence prompts and the complete story, we asynchronously fetch images from the Dall-E3 image model. Since the operation is async, we make sure to store the images when received, in order of the story details. One caveat at the moment when it comes to image generation is that there is no way to create images with consistent character rendering. What I mean by this is that for a story about a cat & a mouse, each image will have a different `drawing` of the cat & mouse. It is possible to do achieve some consistency through the [web interface](https://community.openai.com/t/consistent-image-generation-for-story-using-dalle/612276/3) by providing a `seed` where each subsequent image can be provided with the previous image' seed for context. The property however is currently marked as [being in Beta](https://platform.openai.com/docs/api-reference/chat/create#chat-create-seed) so I could not find a way to reliably supply it to the API through OpenAIKit. If you know of other ways on how to do so, do let me know. As a result, each image may not be identical in character rendering as the previous. Having said that, Dall-E3 was able to generate images much better when supplied with the entire story PLUS the image prompts, than just supplying the image prompts standalone. Without the story, I was seeing some ghastly drawings! (>.<)

Finally, the result of the combination of Gemini & Dall-E can be seen below:

![image](/assets/images/post16/storybook-screens-1.png)

![image](/assets/images/post16/storybook-screens-2.png)

![image](/assets/images/post16/storybook.gif)

I had a lot of fun creating this app as combining Gemini with Dall-E made for some great visual story time. The upside is that you can ask your kids for literally any kind of story they'd like to read or be read and the prompts can result in some engaging story telling. The only minor downside at the moment is the image generation cost. I hope that Gemini's image generation capabilities are made available to developer's soon. It is something that I cannot wait to explore. This was just one way to combine the unlimited potential that AI has for education & entertainment, so give it a go and let me know of the stories that you created :)  

And that's it for this post! The complete code can be found [here.](https://github.com/anupdsouza/ios-gemini-storybook)


Leave a comment if you have any questions and share this article if you found it useful  !
