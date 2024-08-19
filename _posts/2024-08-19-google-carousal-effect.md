---
layout: single
title: "Recreating Google's Desktop Carousal Effect with SwiftUI"
date: 2024-08-19 08:10:00 +0530
excerpt: "Google has a really cool on-hover effect that you can see on the web if you were to search for stuff like popular movies or Disney movies."
seo_title: "How to Recreate Google’s Desktop Carousel Effect in SwiftUI"
seo_description: "Learn to replicate Google’s smooth desktop carousel effect using SwiftUI in this step-by-step guide. Perfect for iOS developers aiming to enhance user interactions with sleek animations and dynamic content display."
categories:
  - iOS
tags:
  - Swift
  - SwiftUI
  - iOS Development
  - Google
---
<!--![image](/assets/images/post14/google-carousal-thumbnail-mini.png)-->

<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/budcijoiNvE?controls=0" frameborder="0" allowfullscreen></iframe>

Watch the video or follow along with the post below.

<!--[<img src="https://img.youtube.com/vi/budcijoiNvE/hqdefault.jpg" width="600" height="350"
/>](https://www.youtube.com/embed/budcijoiNvE)-->

Google has a really cool on-hover effect that you can see on the web if you were to search for stuff like popular movies or Disney movies. The layout is pretty simple with a horizontally scrolling scrollview component with items that consist of the movie poster and the movie title displayed beneath it.

![image](/assets/images/post14/google-carousal-web.png)

What's interesting is that if you were to hover over any item, it smoothly expands to reveal additional detail

![image](/assets/images/post14/google-carousal-web-expand.gif)

The expanded item shows details such as the year of release, certification, runtime & watch options etc. Notice that the expanded view displays a still from the movie that very nicely comes into view on hover and reverts to the movie poster when no longer hovering. Also if you were to hover over an item that is partially visible, it smoothly expands into view. Pretty neat !

To recreate this in SwiftUI we need to do the following:
```
@State private var selectedItem: CarouselItem?

ScrollViewReader { proxy in
    ScrollView(.horizontal) {
        HStack(spacing: 20) {
            ForEach(items, id: \.id) { item in
                CarousalItemView(item: item, selectedItem: $selectedItem)
                    .frame(width: selectedItem?.id == item.id ? 250 : 150, height: 250)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                    .contentShape(Rectangle())
                    .id(item.id)
                    .onTapGesture {
                        DispatchQueue.main.async {
                            withAnimation(.easeInOut(duration: 0.4)) {
                                selectedItem = selectedItem?.id == item.id ? nil : item
                            }
                        }
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                            withAnimation(.easeInOut(duration: 0.4)) {
                                proxy.scrollTo(selectedItem?.id, anchor: .center)
                            }
                        }
                    }
            }
        }
    }
    .frame(height: 250)
    .scrollIndicators(.hidden)
}
```

Firstly, we need a `ScrollView` with an `HStack` of item views. Each item view has a fixed width unless it is the selected item i.e. tapped item instead of hovered; in which case it displays wider than other items in order to display more details.

We add a `onTapGesture` modifier to the view to set  the selected item to the one we tapped on or set it to nil if it was previously selected. We do this inside the `withAnimation` function with duration of `0.4`. In case you're wondering, I got this duration by inspecting the web carousal item properties in Chrome.

We then `scrollTo` the selected item with the anchor set to `center` using the `ScrollViewReader` proxy to bring the item into view if it is obscured in any way.

For the actual item view, the crux looks something like this:
```
@State var item: CarouselItem
@Binding var selectedItem: CarouselItem?
private var expanded: Bool {
    item.id == selectedItem?.id
}

ZStack {
    Image(item.posterImage)
        .resizable()
        .scaledToFill()
        .scaleEffect(expanded ?  1.5 : 1, anchor: .topLeading)
        .frame(width: expanded ? 250 : 150, height: 200)
        .matchedGeometryEffect(id: "image", in: namespace, anchor: .topLeading, isSource: true)
        .opacity(expanded ? 0 : 1)
    
    Image(item.stillImage)
        .resizable()
        .scaledToFill()
        .frame(width: expanded ? 250 : 150, height: 200)
        .matchedGeometryEffect(id: "image", in: namespace, anchor: .topLeading, isSource: false)
        .opacity(expanded ? 1 : 0)
        .overlay(alignment: .leading) {
            if expanded {
                itemDetailsView()
            }
        }
}
```
Using a `ZStack` we place 2 `Image` views to display the poster image and the still image respectively. The poster image has a `scaleEffect` applied to it to scale-out when the item is tapped while affecting its `opacity` modifier as well. We do the same with the still image but without the scaleEffect since it just 'appears'. Finally, we accomplish the image switching animation using the `matchedGeometryEffect` modifier to swap the poster with the still and vice versa.

The result looks something like this:

![image](/assets/images/post14/google-carousal-ios.gif)

Notes:
* I tried using a `LazyHStack` instead of a regular `HStack` but that affected the animation
* I also tried combining the expand animation with the `scrollTo` animation but it was jerky. Which is why I added a small delay to it.
* Setting the `id` modifier to the item view is important, else it would not scroll into view. 

And that's it! The complete code can be found [here.](https://github.com/anupdsouza/ios-google-movie-carousal)

Leave a comment if you have any questions!
<!--Leave a comment if you have any questions and share this article if you found it useful  !-->
