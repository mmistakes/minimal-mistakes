---
layout: single
published: false
title: "Creating a playing card loading animation in SwiftUI"
excerpt: "The idea for this animation was a gif I had seen on the now defunct gfycat website when looking for inspiration for creating a loading view for a personal project I'd been working on."
seo_title: "Creating a playing card loading animation in SwiftUI"
seo_description: "Creating a playing card loading animation in SwiftUI"
categories:
  - iOS
tags:
  - Swift
  - SwiftUI
  - iOS Development
---
<!--[<img src="https://img.youtube.com/vi/jsMSFwhBryg/hqdefault.jpg" width="426" height="240"
/>](https://www.youtube.com/embed/jsMSFwhBryg)-->

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/jsMSFwhBryg?controls=0" frameborder="0" allowfullscreen></iframe>

Watch the video or follow along with the post below.

<!--![image](/assets/images/post6/cardloading.png)-->

In this post we'll learn how to create a simple playing card loading animation in SwiftUI. The idea for this animation was a gif I had seen on the now defunct gfycat website when looking for inspiration for creating a loading view for a personal project I'd been working on. This view could be used as a waiting or loading view for any type of board game project in SwiftUI. To begin with, we use a `ZStack` to layout the views or cards which is an array of `AnyView` so that any type of views could be displayed. The purpose of using a `ZStack` is so that we can fan out the individual views during the animation.
We use a `@State` `Boolean` property **animate** in order to trigger the animation in the `onAppear` modifier. 

```
@State var cards: [AnyView]
@State var animate = false

var body: some View {
    ZStack {
        ForEach(0..<cards.count, id: \.self) { index in
            cards[index]
                .offset(x: offsetForCardAtIndex(index))
                .rotationEffect(.degrees(rotationForCardAtIndex(index)), anchor: .bottom)
        }
    }
    .onAppear() {
        startAnimation()
    }
}

func startAnimation() {
    withAnimation(Animation.linear(duration: 0.75).delay(0.25).repeatForever(autoreverses: true)) {
        animate.toggle()
    }
}
```
In order to achieve the desired animation, we need to offset the x-position of each card and apply a rotation effect to it. This is done by applying an offset and rotation to each card view based on its position in the ZStack. The cards towards the end of the pile will animate towards the left while the cards towards the top of the pile will animate towards the right hand side. We do this as follows:

```
private func offsetForCardAtIndex(_ index: Int) -> CGFloat {
    return animate ? CGFloat(index - cards.count / 2) * 10 : 0
}
```
What we're doing here is providing a negative or positive offset based on its position from the middle of the card pile in order to evenly distribute it towards the left/right hand sides.
And we get the following result for a 5 card pile.

![image](/assets/images/post6/cardloadingview.gif)

However if we provide an even number of cards say 4, we see a problem:

![image](/assets/images/post6/4cardloadingview.gif)

The cards are skewed towards the bottom of the pile. To fix this we update `offsetForCardAtIndex()` to handle the offset and rotation based on the number of cards as follows:
```
private func offsetForCardAtIndex(_ index: Int) -> CGFloat {
    let offset: CGFloat
    if cards.count.isMultiple(of: 2) {
        offset = (CGFloat(index) - (CGFloat(cards.count) / 2.0) + 0.5) * 10
    } else {
        offset = CGFloat(index - cards.count / 2) * 10
    }
    return animate ? offset : 0
}
```
In this modified code, we calculate the offset differently based on whether the number of cards is even or odd. For even numbers of cards, we distribute the offset evenly among all the cards, and for odd number of cards, we set the middle card's offset to 0 and distribute the rest evenly. Coming to the rotation required for each card, it is the same as the offset so we just complete the code by adding the following function for convenience.

```
private func rotationForCardAtIndex(_ index: Int) -> CGFloat {
    offsetForCardAtIndex(index)
}
```

And that's it for this post, the complete code can be found [here.](https://github.com/anupdsouza/ios-card-loading-view)
Also, consider subscribing to my YouTube channel[https://www.youtube.com/@swiftodyssey?sub_confirmation=1] & follow me on X(Twitter)[https://twitter.com/swift_odyssey] for more such information.

Share this article if you found it useful!
