---
layout: single
published: true
title: "Editing iOS Simulator Screenshots with Device Bezels"
excerpt: "Learn how to edit screenshots of the iOS simulator with device bezels & without the toolbar."
seo_title: "iOS Simulator Screenshots with Device Bezels"
seo_description: "iOS Simulator Screenshots with Device Bezels"
categories:
  - iOS
tags:
  - iOS Development
---
<iframe width="640" height="360" src="https://www.youtube-nocookie.com/embed/nHwepVSd7t4?controls=0" frameborder="0" allowfullscreen></iframe>

In this post we'll learn how to edit screenshots of the iOS simulator with device bezels & without the toolbar.

<!--![image](/assets/images/post8/screenshotbeforeafter.png)-->

View the video or follow along with the steps detailed in the post.

Taking a regular screenshot of the simulator involves using the `⌘ + S` key combination with the simulator active which saves the screenshot to the desktop or your preferred location. You could also use the simulator's `Trigger Screenshot`
option from the `Device` menu which saves the screenshot to the simulator's internal `Photos` application. You could get this image by going to the `~/Library/Developer/CoreSimulator/Devices/<Simulator ID>/data/Media/DCIM/100APPLE` path on your Mac. You get the simulator ID by running the `xcrun simctl list devices` command in Terminal & looking for `(Booted)` devices in the list that match the simulator.
For most cases where you'd want to use or share screenshots, using either method is fine. However, if you want to capture screenshots with device bezels such as for presentations or YouTube thumbnails, neither of the two methods do that. In order to capture screenshots with device bezels, do the following:
* Press `⌘ + shift + 5` to trigger the system screenshot option.
* From the screenshot options, select `Capture Selected Window`. Alternatively, you could keep the spacebar pressed to activate this option.
* Mouse-over the simulator which'll highlight it. You will see the mouse pointer change to a camera 📷 icon. 
* Hold the `⌥ option` key down and click to save the screenshot. Holding down `⌥ option` will save the screenshot without any shadows which is crucial for the next steps.
* Open the saved screenshot in `Preview` and select the `Markup` tool. If `Preview` did not launch with a wide enough window size, this option might be hidden within `>>` arrows in the navigation bar.
* Select the `Rectangular Selection` tool in the markup toolbar, which will be the first option displayed as a dotted rectangle.
* Ensure that the simulator is sufficiently visible & not sticking to the edges of the preview window in order to make a good selection. You could zoom out of the image using `⌘ + -` or select `View > Zoom Out` from the preview toolbar.
* Make a rectangular selection around the screenshot, dont worry about going wide. As you make a selection, you will notice an animated marching ants effect which automatically highlights the selectable area of the screenshot.

![image](/assets/images/post8/screenshotmarchingants.png)

* Resize your selection using this animated guide. You will notice the selection lines snap to the marching ants borders on the left, right & bottom sides as you drag them. It is not necessary to snap your selection to these guides but you must make sure to drag the top portion of the selection using the circular blue handles to below the top bar but above the simulator bezels.

![image](/assets/images/post8/screenshotselection.png)

* Select the `Crop` tool which will look like 2 interlocking right angles in the tool bar to crop the image to your selection. Press `⌘ + S` to save this cropped selection.


![image](/assets/images/post8/screenshotY.png)


And that's it for this post. Consider subscribing to my [YouTube channel](https://www.youtube.com/@swiftodyssey?sub_confirmation=1) & follow me on [X(Twitter)](https://twitter.com/swift_odyssey) for more such information. 

Share this article if you found it useful !
