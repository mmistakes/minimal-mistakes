---
layout: single
published: false
title: "Challenging Gemini AI to Tic-Tac-Toe - SwiftUI Tutorial"
excerpt: "Apart from all the stuff that you can do with a LLM like Gemini, did you know that you could also play games with it?"
seo_title: "Challenging Gemini AI to Tic-Tac-Toe - SwiftUI Tutorial"
seo_description: "Create a tic-tac-toe game with Gemini AI"
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
<!--![image](/assets/images/post19/tictactoe-gemini-thumbnail.png)-->

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/ZDnEM1BeKLQ?controls=0" frameborder="0" allowfullscreen></iframe>

Watch the video or follow along with the post below.

<!--[<img src="https://img.youtube.com/vi/ZDnEM1BeKLQ/hqdefault.jpg" width="768" height="432"
/>](https://www.youtube.com/embed/ZDnEM1BeKLQ)-->

This article is long overdue since I got caught up with all the developments surrounding WWDC but it's finally here. Apart from all the stuff that you can do with a LLM like Gemini, did you know that you could also play games with it? Well, I didn't until I came across [this post](https://leonnicholls.medium.com/tic-tac-toe-and-the-art-of-gemini-prompt-engineering-0b0dfa47e733) which formed the basis for this experimental project. Since Gemini is a LLM, it has knowledge of a popular game like tic-tac-toe but how good can it be at playing it? It seems from the linked post that although Gemini knows about tic-tac-toe, that doesn't necessarily mean that it knows how to play it & thus began my quest to build a relatively simple tic-tac-toe game playable versus Gemini AI. As with all LLM interactions, we start off with a prompt to acquaint Gemini with the end result that we expect. I crafted a simple prompt like so & trialled it with the [Gemini web app](https://gemini.google.com/app).

```
Let's play tic-tac-toe in a 3x3 grid. The first to get 3 X's or O's in a row wins.
``` 

This prompt which I was confident would get me through a round of the game proved otherwise. Gemini was providing positional input for a 3x3 grid numbered 1-9 whereas I was providing input for a grid numbered 0-8. Needless to say, the prompt needed more refining or should I say, needed to be simpler.

```
Let's play tic-tac-toe in a 3x3 grid numbered 0-8.
0 is at the top left of the grid and 8 at the bottom right.
The first to get 3 X's or O's in a row wins.
``` 

This prompt was an improvement over the previous but still wasn't quite there yet. Gemini failed to recognize diagonal rows & therefore centered its positioning around vertical & horizontal rows only. Time to improve the prompt some more.

```
Let's play tic-tac-toe in a 3x3 grid numbered 0-8.
0 is at the top left of the grid and 8 at the bottom right.
The first to get 3 X's or O's in a row horizontally, vertically or diagonally wins.
``` 

This prompt provided for much a better response from Gemini but there was still a problem. You see, I had specified that `The first to get 3 X's or O's in a row horizontally, vertically or diagonally wins.` which meant that Gemini always played to win. Therefore, in a situation where it would be prudent to block my move from winning having placed 2 successive X's in a row, Gemini would proceed to place it's marker in another spot where it was trying to form a winning pattern. So I updated the prompt once again.

```
Let's play tic-tac-toe in a 3x3 grid numbered 0-8.
0 is at the top left of the grid and 8 at the bottom right.
The first to get 3 X's or O's in a row horizontally, vertically or diagonally wins.
Before you pick your position on the grid, check to see if I can win in my next turn & if so, block me.
```

The results were much better & allowed me to play quite a few rounds with satisfactory results. Now it was time to implement this in an app.
First, we implement our `Player` & `Turn` models that will store information for each turn as follows:

```
enum Player {
    case human
    case ai
    case computer
}

extension Player {
    var icon: String {
        switch self {
        case .human: return "👤"
        case .ai: return "gemini"
        case .computer: return "🤖"
        }
    }
}

struct Turn {
    let player: Player
    let position: Int
    var mark: String {
        player == .human ? "xmark" : "circle"
    }
    var markColor: Color {
        player == .human ? .green : .red
    }
}
```

Note that I added a `computer` player case in the event that we don't receive a response from Gemini. In such a case, we ask the computer to pick a random position in order to keep game progression flowing without excessive waiting time.
Next in our `ContentView` we define our `turns` array capable of storing 9 turns as well as our `GameService` in order to fetch responses from Gemini along with a timer to cancel the task:

```
@State private var turns = [Turn?](repeating: nil, count: 9)
@State private var gameService = GameService()
private var aiTimer: Timer?
```

At each turn, starting with a human player we update the turns array turn by turn in order to fill up the vacant positions in order to determine a winner.
The winning logic merely checks if the `turns` array contains 3 `turns` by the same player in a row horizontally, vertically or diagonally in the grid. If all the grid positions are occupied & we don't have a winner then the game ends in a draw.

```
private func checkForResult() {
        let winPatterns: [[Int]] = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]

        for pattern in winPatterns {
            let (a, b, c) = (pattern[0], pattern[1], pattern[2])
            if let player = turns[a]?.player,
               turns[b]?.player == player && turns[c]?.player == player {
                winningPlayer = player
                isGameOver = true
                return
            }
        }

        if turns.allSatisfy({ $0 != nil }) { isGameOver = true }
}
```

Let's see how the `GameService` is implemented. We begin by defining a generative model & our trusted prompt.

```
private let model = GenerativeModel(name: "gemini-1.5-flash", apiKey: APIKey.gemini)
private var startPrompt = """
                               ## Introduction:
                               We are playing a game of tic-tac-toe in a 3x3 grid numbered with positions 0 to 8.
                               Position 0 is the top-left square, 4 is the center, and 8 is the bottom-right square.
                               I will place X & you will place O.
                               You win either by getting three Xs or Os in a row, column, or diagonally.
                               We will continue taking turns until there is a winner or the board is filled (a tie).
                               You will indicate your move by telling me the number (between 0 and 8) of the square you want to place your O.
                               Before each turn, you will be provided with the positions of X's & O's in the grid as an array of integers.
                               Always recall the winning patterns for the grid and compare against the positions of X's & O's before making a choice.
                                                              
                               ## Rules you must follow:
                               Rule #1. Inspect the grid for the position of X's and O's before deciding on a square.
                               Rule #2. If you are in a position to win, you MUST choose to win.
                               Rule #3. If I am in a position to win on my next turn, you must try and block my move.
                               Rule #4. If you can either WIN OR BLOCK me during your turn, you should choose to win.
                               Reply ONLY with a number of the square you choose to place an O. Do not provide any reasoning behind your choice.
                               """

```

I made several updates to the original prompt, defining some rules in order to make the game interesting.

```
let response = try await model.generateContent(aiPrompt)
guard let text = response.text?.trimmingCharacters(in: .whitespacesAndNewlines), let position = Int(text) else {
    throw NSError(domain: "Invalid response", code: -1, userInfo: nil)
}

aiTimer = Timer.scheduledTimer(withTimeInterval: 5.0, repeats: false) { _ in
    task.cancel()
    self.generateRandomAiTurn()
}

private func generateRandomAiTurn() {
    guard let randomPosition = vacantPositions.randomElement() else { return }
    turnPosition = randomPosition
}
```
We send a request to Gemini & wait 5s for a response to be received. If a response is not received within the time, we cancel the task & pick a random position from among the vacant positions on the grid.

With all this logic in place I was ready to test my skills against Gemini & expected to face a challenge. The outcome however was anything but. In each round, I was beating Gemini comfortably as it kept making feeble attempts to win. It baffled me that Gemini could perform so much better in the web app but not when playing here. This is when I thought that my efforts to build a somewhat challenging game was futile & I stopped working on it for the day. Having slept on it overnight though I realised that I had made a stupid mistake which hit me like a brick! I had completely ignored the fact that when playing in the web app, I had an ongoing chat conversation with Gemini which allowed it to have context to analyse & make smart choices which I had deprived it of in the iOS client code. The realisation came on the back of [this twitter thread](https://x.com/peterfriese/status/1794624642751279198) by [Peter Friese](https://x.com/peterfriese). So instead of getting a response via 

```
let response = try await model.generateContent(aiPrompt)
```

what I needed to do was create a `Chat` instance & use that instead as follows:

```
private var chat: Chat?

init() {
    model = GenerativeModel(name: "gemini-1.5-flash", apiKey: APIKey.gemini)
    chat = model.startChat()
}

let response = try await chat?.sendMessage(aiPrompt)
``` 

With the changes made above, Gemini's responses improved dramatically & mirrored the performance it had in the web app! I was finally able to play tic-tac-toe on iOS :)

![image](/assets/images/post19/result.png)

This project was yet another eye-opener for me in terms of using AI in a way other than just to spew information it had learnt in response to questions we've been so accustomed to Googling.
And that's it for this post! The complete code can be found [here](https://github.com/anupdsouza/ios-gemini-tic-tac-toe)

Checkout a short video of the playthrough here:

[<img src="https://img.youtube.com/vi/N5bvgwxHA1k/hqdefault.jpg" width="300" height="450"
/>](https://www.youtube.com/embed/N5bvgwxHA1k)


Consider subscribing to my [YouTube channel](https://www.youtube.com/@swiftodyssey?sub_confirmation=1) & follow me on [X(Twitter)](https://twitter.com/swift_odyssey) for more such information. Leave a comment if you have any questions. 

Share this article if you found it useful !
