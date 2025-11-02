---
layout: single
title: "Creating Buttons with Depth in SwiftUI: Adding 3D Effects"
date: 2024-10-03 14:19:00 +0530
excerpt: "Enhance your SwiftUI buttons with a custom style that adds depth and smooth animations, creating a 3D effect when pressed. Ideal for polished iOS app designs!"
seo_title: "Creating Buttons with Depth in SwiftUI: Adding 3D Effects"
seo_description: "Learn how to create SwiftUI buttons with depth and smooth animations using custom button styles. This guide covers adding a 3D effect to buttons that makes them appear to sink when pressed, offering flexibility and a polished look for your iOS apps."
categories:
  - iOS
tags:
  - Swift
  - SwiftUI
  - iOS Development
---
<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/jpRAavqe8p8?controls=0" frameborder="0" allowfullscreen></iframe>

If you're looking to elevate the look of your buttons in SwiftUI much like in the popular Duolingo app, adding depth and a smooth animation can make all the difference. Here's how you can create a button style that adds a subtle 3D effect, making buttons appear to "sink" into the interface when pressed. In SwiftUI, button styles allow us to customize the appearance and behavior of buttons. Creating a button style is as simple as this:

```
struct DepthButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .offset(y: configuration.isPressed ? offset : 0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}
```

Our goal here is to create a `DepthButtonStyle` that gives a unique pressed effect. The 3D "depth" illusion is achieved using vertical offsets that shift the button's inner layers. When pressed, the button appears to sink into the interface by the provided offset offset. When the button is in its default state, the inner layer is slightly offset, giving the appearance of depth. As soon as the user presses the button, the offset reduces to zero, creating a pressed-down effect. Once released, the button returns to its original state, all while being wrapped in a smooth animation.

By encapsulating the button's visual behavior into a `ButtonStyle`, you can reuse it across your app with minimal effort. Additionally, the shape and visual effect are fully customizable, giving you control over the look and feel without cluttering the button's usage code.

This pattern is powerful when building interfaces that need a consistent, polished look while remaining flexible for different types of buttons.
You can check out the complete source code on my [Patreon](https://www.patreon.com/posts/duolingo-style-110627795) or my [BuyMeACoffee](https://buymeacoffee.com/adsouza/e/304663) page.

---
Consider subscribing to my [YouTube channel](https://www.youtube.com/@swiftodyssey?sub_confirmation=1) & follow me on [X(Twitter)](https://twitter.com/swift_odyssey). Leave a comment if you have any questions. 

Share this article if you found it useful !
