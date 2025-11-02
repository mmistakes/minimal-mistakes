---
layout: single
published: true
title: "Creating the scratch card effect in SwiftUI"
excerpt: "The idea for this view came when I was going through Azam Sharp's video on drawing in SwiftUI using the `Canvas` view. I wondered if one could apply the strokes using the DragGesture to a view, it would somewhat replicate the scratch card effect that is normally seen in modern iOS applications"
seo_title: "Creating the scratch card effect in SwiftUI"
seo_description: "Creating the scratch card effect in SwiftUI"
categories:
  - iOS
tags:
  - Swift
  - SwiftUI
  - iOS Development
---
<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/n5fRNTwtc2A?controls=0" frameborder="0" allowfullscreen></iframe>

In this post we'll learn how to create the scratch card effect in SwiftUI.

<!--![image](/assets/images/post7/scratchcard.png)-->

The idea for this view came when I was going through Azam Sharp's [video](https://www.youtube.com/watch?v=P0OdY9MVu_g) on drawing in SwiftUI using the `Canvas` view. I wondered if one could apply the strokes using the DragGesture to a view, it would somewhat replicate the scratch card effect that is normally seen in modern iOS applications. Turns out, implementing this is simpler than I thought. All we need to do is to apply the strokes that a user creates via the DragGesture onto a view but using the [mask](https://developer.apple.com/documentation/swiftui/view/mask(alignment:_:)) modifier. The code below is modified to do just that.

```
struct Line {
    var points = [CGPoint]()
    var lineWidth: Double = 50.0
}

struct ScratchCardCanvasMaskView: View {
    @State private var currentLine = Line()
    @State private var lines = [Line]()
    
    var body: some View {
        ZStack {
            // MARK: Scratchable overlay view
            RoundedRectangle(cornerRadius: 20)
                .fill(.red)
                .frame(width: 250, height: 250)

            // MARK: Hidden content view
            RoundedRectangle(cornerRadius: 20)
                .fill(.yellow)
                .frame(width: 250, height: 250)
                .mask(
                    Canvas { context, _ in
                        for line in lines {
                            var path = Path()
                            path.addLines(line.points)
                            context.stroke(path,
                                           with: .color(.white),
                                           style: StrokeStyle(lineWidth: line.lineWidth,
                                                              lineCap: .round,
                                                              lineJoin: .round)
                            )
                        }
                    }
                )
                .gesture(
                    DragGesture(minimumDistance: 0, coordinateSpace: .local)
                        .onChanged({ value in
                            let newPoint = value.location
                            currentLine.points.append(newPoint)
                            lines.append(currentLine)
                        })
                )
        }
    }
}
```
In the gesture modifier we use the DragGesture to capture points that we will use to draw lines with. These lines are stroked within the Canvas in the mask modifier with the specified `lineWidth` of 50.0 for broader strokes and setting the `lineCap` and `lineJoin` to `round`. Unlike in Azam's video, I chose not to implement the `onEnded` modifier in order to reset the `currentLine` as I felt that it helped cover more area when the user starts performing a new drag gesture after ending the previous one. If you'd like the strokes between each drag gesture to be disjointed, feel free to reset `currentLine`. Note that one has to provide a stroke color to the `context.stroke` method. It could be any color other than `.clear`.

Another way to implement this scratch card would be to directly stroke shape path(s) like so:
```
struct ScratchCardPathMaskView: View {
    @State var points = [CGPoint]()
    
    var body: some View {
        ZStack {
            // MARK: Scratchable overlay view
            RoundedRectangle(cornerRadius: 20)
                .fill(.red)
                .frame(width: 250, height: 250)

            // MARK: Hidden content view
            RoundedRectangle(cornerRadius: 20)
                .fill(.yellow)
                .frame(width: 250, height: 250)
                .mask(
                    Path { path in
                        path.addLines(points)
                    }.stroke(style: StrokeStyle(lineWidth: 50, lineCap: .round, lineJoin: .round))
                )
                .gesture(
                    DragGesture(minimumDistance: 0, coordinateSpace: .local)
                        .onChanged({ value in
                            points.append(value.location)
                        })
                )
        }
    }
}
```
View it in action:

[<img src="https://img.youtube.com/vi/n5fRNTwtc2A/hqdefault.jpg" width="600" height="300"
/>](https://www.youtube.com/embed/n5fRNTwtc2A)


And that's it! The complete code can be found [here.](https://github.com/anupdsouza/ios-scratch-card-view)

Share this article if you found it useful !
