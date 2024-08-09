---
layout: single
title: "Lighter or darker color shades from a single Color in SwiftUI"
date: 2024-08-09 08:15:00 +0530
excerpt: "I was working on creating a custom button background for which I needed to apply a darker shade of the foreground view's `foregroundStyle`..."
seo_title: "How to obtain lighter or darker color shades with a single Color in SwiftUI"
seo_description: "How to obtain lighter or darker color shades with a single Color in SwiftUI"
categories:
  - iOS
tags:
  - Swift
  - SwiftUI
  - iOS Development
--- 

I was working on creating a custom button background for which I needed to apply a darker shade of the foreground view's `foregroundStyle`. Working in SwiftUI, there are no api's on `Color` out of the box that provide a solution to this problem. My search for a answers led me to StackOverflow which yielded a plethora of [solutions](https://stackoverflow.com/questions/11598043/get-slightly-lighter-and-darker-color-from-uicolor), each involving manipulating the *color components*. All the solutions were great but still seemed like an overkill so before I resorted to apply any of the solutions I decided to dig deeper one more time and see if there was another way to achieve what I wanted. Turns out there is not so much a way with `Color`, but with `View`. 

Checking out Apple's official documentation, there exist [modifiers](https://developer.apple.com/documentation/swiftui/drawing-and-graphics#Transforming-colors) for `View` viz. 
* brightness (0.2)
* contrast (0.6)
* saturation (0.4)
* grayscale  (0.6) 

... etc.

As their names suggest, these modifiers affect the brightness, contrast, saturation & grayscale of a `View`. All you need to do is provide the amount between 0-1, that you want each of the modifiers to affect the view by. I tried each of them by applying them to a background view displayed below a foreground view that was set with `foregroundStyle` Color with value `#79C93D`. Here are the results (L-R) with modifiers applied in the following order:
* no modifier
* brightness (0.2)
* contrast (0.6)
* saturation (0.4)
* grayscale  (0.6)

[<img src="/assets/images/post24/modifiers-result.png" width="80%"/>](/assets/images/post24/modifiers-result.png)

As you can see from the screenshots above, the modifiers can actually do a decent job. And the best part is, they are supported from iOS 13+. Do note that as this solution affects the entire view it's applied on, it's best used for views comprising of just `Color`. If you apply it to views containing other elements such as `Text` or `Image`, this may lead to undesired results.

---
Consider subscribing to my [YouTube channel](https://www.youtube.com/@swiftodyssey?sub_confirmation=1) & follow me on [X(Twitter)](https://twitter.com/swift_odyssey). Leave a comment if you have any questions. 

Share this article if you found it useful !
