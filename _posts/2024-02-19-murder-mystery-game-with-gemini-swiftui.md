---
layout: post
title: "Create a Murder Mystery game powered by Gemini AI with SwiftUI"
categories: [iOS Development, AI, Gemini, Google, SwiftUI, Swift]
tags: [Gemini, AI, iOS, SwiftUI]
---
![image](/assets/images/post15/murder-mystery-thumbnail.png)

Watch the video or follow along with the post below.

[<img src="https://img.youtube.com/vi/dDbunbxzrSI/hqdefault.jpg" width="600" height="350"
/>](https://www.youtube.com/embed/dDbunbxzrSI)

Previously, we saw how to [easily summarize data with the Gemini AI SDK to provide for some interesting horoscope readings.](https://www.anupdsouza.com/posts/horoscope-app-with-swiftui-gemini/) In this post we'll look at another one of Gemini AI's capabilities i.e. Data Generation to create a. murder mystery text adventure game.

For context, it may be uncommon today but back in the early 70's to 2000's text based or as they are better known, interactive fiction(IF) games were quite popular. Some of them such as [Zork](https://en.wikipedia.org/wiki/Zork) are still played today through ports on mobiles while enthusiasts of Dungeons & Dragons have setup Discord servers having players active in the thousands. These games rely on the user to read the game scenario/environment on the screen & enter text input to progress the game forward with none to minimal UI whatsoever. More recently, these games have evolved massively with 3D gameplay, dialogues & cutscenes, incorporating point & click actions with pre-made prompts that user's simply have to choose from. Each prompt affects the outcome of the game, giving users the chance to drive the game as they please & experience a multitude of game endings. My favorites from this genre of games definitely have to be [Tales from the Borderlands](https://en.wikipedia.org/wiki/Tales_from_the_Borderlands) and [The Walking Dead](https://en.wikipedia.org/wiki/The_Walking_Dead_(video_game)) by the now defunct Telltale Games.

Coming back to the point of this post, we can create a similar text based adventure game or any game for that matter with the right setup & prompts, completely driven by Gemini AI. Having finally watched the [Knives Out](https://en.wikipedia.org/wiki/Knives_Out) movie, I thought of creating a murder mystery game. I decided to have a 4 screen setup to keep things simple. A start screen to load the story, a story screen that lays out the details of the story, a questioning screen that displays a list of Q&A with clues that the user must choose from and finally a result screen that displays whether the user was correct in identifying the culprit or not.

![image](/assets/images/post15/murder-mystery-screens.png)

For the sake of this game I basically swap the different SwiftUI views in the ContentView based on the state of the game:
```
enum GameState {
    case start
    case story
    case questioning
    case result
    
    func image() -> String {
        switch self {
        case .start:
            return "manor"
        case .story:
            return "story"
        case .questioning:
            return "questioning"
        case .result:
            return "result"
        }
    }
}

struct ContentView: View {
    
    var body: some View {
        VStack {
            switch gameState {
            case .start:
                startView()
            case .story:
                storyView()
            case .questioning:
                questionView()
            case .result:
                resultView()
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .foregroundStyle(.white)
        .shadow(color: .black, radius: 2, x: 1, y: 1)
        .background {
            Color.clear.overlay {
                Image(gameState.image())
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .animation(.easeIn(duration: 0.5), value: gameState.image())
            }
            .edgesIgnoringSafeArea(.all)
        }
    }
}

```

Note that there are better ways to do this but I decided to keep things relatively simple by keeping all of the state management in a single `View`. You are free to improve/refactor this in your own iteration :)

For the story I decided to go with the rich family patriarch member dying & surviving members as suspect trope and for that I came up with the prompt as follows:

>Create a murder mystery short story surrounding the death of a family patriarch. The family should consist of 5 people including the patriarch. The suspects are the 4 surviving members present at the scene of whom one is the culprit. Each member has a motive for murder. You are the detective in this story investigating the murder. When creating the plot, include clues found at the scene of the crime. Create 4 questions to investigate the identity of the culprit. Each question should be about the suspects with 3 possible responses & a clue. The response to the last question should always be the names of the surviving family members as individual responses. Reply with the details in JSON format with valid fields: plot as string, questions as an array of question objects where each question object is composed of the question as string, clue as string and responses as an array of strings, and finally the culprit as string. Do not use markdown.

Isn't it great that you can just *tell* AI what to work with and let its natural language processing capabilities take over?

Having said that, the prompt you see above wasn't the final prompt. It took some trial and error to get Gemini to give consistent results.
Some key take-aways are as follows:

* You have to be as granular as possible when describing what exactly do you want to the Gemini generative model.
* Break down complex details as much as you can or else the results can vary vastly.
* You can specify exactly how you want the data back from the generative model. Note that I specify that the response be returned in JSON format and I've also supplied valid key's for the JSON to use. This is important because if these differ, then you will not be able to parse the data. In my case, I modeled the expected data format first as follows:

```
struct MurderMystery: Codable {
    let plot: String
    let culprit: String
    var questions: [Question]
}

struct Question: Codable {
    var question: String
    var clue: String
    var responses: [String]
}
```

before specifying its details in the prompt along with the expected type. For example:

>plot as string, questions as an array of question objects where each question object is composed of the question as string, clue as string and responses as an array of strings, and finally the culprit as string

* Even though I specified the output to be in JSON format, the response was far from parseable because the response text was often enclosed in backticks like you see next. This would break parsing & would complicate things further as one cannot always string find-&-replace these extras in the response. After much R&D, I came upon this [Reddit thread](https://www.reddit.com/r/Bard/comments/18mmszg/cant_remove_backticks_from_gemini_pro_api/) which suggested adding **do not use markdown** in the prompt which worked for me but not a 100%. As others have suggested in the thread, it might be useful to provide a sample response to the model to achieve better accuracy.

```
json
 {
  plot:"In a grand manor house nestled amidst...

```
* There are times when despite what you think is the best prompt given to the model, you will still get inconsistent results like malformed JSON, different key-values & reduced data. Some actual truncated examples are shown below to highlight the variety of output once can receive with additional keys, incorrect format, fewer responses etc:

Example 1:
```
 {
   "question": "Detective Harper discovered a torn note in the patriarch's study, mentioning a secret financial transaction. Which suspect had a substantial financial motive to kill Mr. Bradford?",
   "clue": "Financial issues and greed can be powerful motivations for murder.",
   "responses": [
    "Abigail Bradford, who was facing mounting debts and potential foreclosure.",
    "Harold Bradford, who was struggling to keep the family business afloat.",
    "Sarah Bradford, who was involved in a costly legal battle over her inheritance."
   ]
  }
 ],
 "murderer": "Sarah Bradford",
 "isCorrect": null
}
```
Example 2:
```
 {
   "question": "Clue 1: Poisonous Substance in the Victim's Blood. Which family member had a history of handling toxic chemicals?",
   "responses": [
    "John, the eldest son, worked in a pharmaceutical company.",
    "Mrs. Davis had a keen interest in gardening and used various pesticides.",
    "Peter, the youngest son, was fascinated by science and dabbled in chemistry experiments."
   ]
```
Example 3:
```
{
   "question": "Who is the murderer?",
   "responses": [
    "Henry Rutherford",
    "Beatrice Rutherford",
    "Isabella Rutherford",
    "William Rutherford"
   ]
  }
 ],
 "murderer": "William Rutherford",
 "clues": []
}
```
Example 4:
```
=====================
{ "murder_mystery":{ "murder":{ "patricide" }, "crime_victim":{ "deceased_patri patriarch" }, "crime_suspects":[ "Avery" , "Bailey" , "Carter" , "Dylan" ]
```
Example 5:
```
 ],
 "responses": {
  "1": "Jane had significant shares in the family business, and their partnership may have hit a bad spot, leading to the murder.",
  "2": "Mark was in substantial debt, and Mr. Barton refused to bail him out further, leading to a confrontation that ended fatally.",
  "3": "Mr. Barton cut off Emily's financial support, leading to a bitter falling out.",
  "4": "Mrs. Barton suspected Mr. Barton of having an affair, leading to a jealous rampage."
 },
 "murguienrer": "Mrs. Barton"
}
```
* Response generation is **slow**. I did not time it, but it seemed like a good 4-5s before receiving the response from the model. Again, this could be because of the prompt where I asked the model to provide a plot as well as varying questions & answers for the game. A possible solution could be break down the request & separate the prompt to retrieve the plot first with streaming so as to allow the user to progress forward.

I still at times receive some variation & inaccuracies in the response but I think that is a combination of the prompt I wrote (something that I'm still learning to navigate) plus the generative model's maturity. I think over time the responses would be more accurate. On a side note, ChatGPT-3.5 was more consistent when experimenting with the same prompt(s). So if you plan to use the Gemini generative model this way for your application, plan and think ahead !

Finally, we feed the prompt to the model and parse it into our game model like so:
```
private let model = GenerativeModel(name: "gemini-pro", apiKey: APIKey.default)

do {
    let response = try await model.generateContent(prompt)
    guard let text = response.text,
          let data = text.data(using: .utf8) else  {
        fetchingStory = false
        return
    }
    
    murderMystery = try JSONDecoder().decode(MurderMystery.self, from: data)
    
    await MainActor.run {
        withAnimation {
            fetchedStory = true
        }
    }
}
catch {
    fetchingStory = false
    print(error.localizedDescription)
}
```
Once we have our `MurderMystery` model ready to go, we just toggle the different states to
* Display the plot to the user
* Then render a list of Questions & Answers that the user must choose from and lastly
* Let the user know if they got it right or wrong.

The result logic is to simply compare if the user's selection to the last question contains the `culprit` as provided in the JSON response like so:
```
private func gameResult() -> Bool {
    if let userSelection = murderMystery?.questions.last?.selectedResponse,
       let culprit = murderMystery?.culprit {
        return userSelection.contains(culprit)
    }
    return false
}
```
I chose `contains` above because despite specifying in the prompt that:
> The response to the last question should always be the names of the surviving family members as individual responses.

it often included other details such as the relation of the culprit to the victim, for example: 
* `Edward Blackwood(son)` or
* `Jane Rosenthall who was last seen arguing with her father`.

A caveat to this approach is that the last question returned by the model can be worded differently, implying innocence for example so the logic does not take into account the fact that the user may have selected the culprit as a response in a previous question. Again, this was done solely due to time constraints & is not to be taken as a foolproof aproach.

This has worked well *so far* & is all that it took to create a murder mystery game. The best part about this approach to use AI is that with each gameplay, you get to experience a different story which is exciting.

![image](/assets/images/post15/murder-mystery-gameplay.gif)

All in all it was an interesting experiment to use Gemini AI in creating a simple text adventure game. The same approach could be used to create other games similar to Dungeons & Dragons or a Quiz game. Your imagination is your only limitation.


And that's it! The complete code can be found [here.](https://github.com/anupdsouza/ios-gemini-text-game)


Leave a comment if you have any questions and share this article if you found it useful  !
