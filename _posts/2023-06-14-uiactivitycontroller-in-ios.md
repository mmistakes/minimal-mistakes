---
layout: post
title: "UIActivityViewController usage in iOS"
categories: [iOS Development, Swift]
tags: [iOS Development, Swift]
---
Sharing content from your app across the system is made simple using the ```UIActivityViewController``` class on iOS. ```UIActivityViewController``` is capable of sharing text, urls, images etc as is or in combinations. In this post we will take a look at some examples of how to setup & share content with it. 

Sharing some text is as simple as:
```swift
let activityViewController = UIActivityViewController(activityItems: ["Hello World !"], applicationActivities: [])
present(activityViewController, animated: true)
```
![image](/assets/images/post2/share-text.png)
Sharing url's:
```swift
guard let url = URL(string: "https://simple.wikipedia.org/wiki/Koala") else {
    return
}
let activityViewController = UIActivityViewController(activityItems: [url], applicationActivities: [])
present(activityViewController, animated: true)
```
![image](/assets/images/post2/share-url.png)
Sharing images:
```swift
guard let toucan = UIImage(named: "toucan"), let koala = UIImage(named: "koala") else {
    return
}
let activityViewController = UIActivityViewController(activityItems: [toucan, koala], applicationActivities: [])
present(activityViewController, animated: true)
```
![image](/assets/images/post2/share-images.png)
Note that when sharing images, the share sheet will contain an option to save images to the user's device. So make sure to add the `Privacy - Photo Library Additions Usage Description` key-value in your app's `Info.plist` file with a suitable description else the app will crash when the user tries to save the images.


Sharing combinations of text, urls & images:
```swift
guard let url = URL(string: "https://simple.wikipedia.org/wiki/Koala"), let koala = UIImage(named: "koala") else {
    return
}
let activityViewController = UIActivityViewController(activityItems: [url, koala, "Hello Universe!"], applicationActivities: [])
present(activityViewController, animated: true)
```
![image](/assets/images/post2/share-text-url-image.png)

If you see the image above you'll see that the icon shown in the sheet is that of Wikipedia. We can customise the icon as well as the text to say something different using the ```LinkPresentation``` framework. We need to provide the required data using ```LPLinkMetadata``` by adopting the ```UIActivityItemSource``` protocol.
```swift
 var metadata: LPLinkMetadata?
 func setupShareMetadataWithUrls(_ urls: [URL]) {
      let linkMetadata = LPLinkMetadata()
      linkMetadata.title = "Look what I've shared !"
      linkMetadata.url = urls.first
      if let appIconImage = UIImage(named: "AppIcon") {
          let iconProvider = NSItemProvider(object: appIconImage)
          linkMetadata.iconProvider = iconProvider
      }
      metadata = linkMetadata
}

extension ViewController: UIActivityItemSource {

    public func activityViewControllerPlaceholderItem(_ controller: UIActivityViewController) -> Any {
        metadata?.title ?? ""
    }

    public func activityViewController(_ controller: UIActivityViewController,
                                       itemForActivityType activityType: UIActivity.ActivityType?) -> Any? {
        metadata?.url
    }

    public func activityViewControllerLinkMetadata(_ controller: UIActivityViewController) -> LPLinkMetadata? {
        metadata
    }
}
```
And finally we pass in ```self``` among the activity items before presenting the activity view controller
```swift
 let activityViewController = UIActivityViewController(activityItems: [url, koala, "Hello Universe!"], applicationActivities: [])
```
![image](/assets/images/post2/share-link-presentation.png)

There's much more that can be done to provide richer link previews including providing icons from external urls with the ``startFetchingMetadata`` api.
```swift
let imageURLString = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Koala02.jpeg/2560px-Koala02.jpeg"
LPMetadataProvider().startFetchingMetadata(for: URL(string: imageURLString)!) { imageMetadata, _ in
     linkMetadata?.imageProvider = imageMetadata?.imageProvider
     linkMetadata?.iconProvider = imageMetadata?.imageProvider
     self.metadata = linkMetadata
     DispatchQueue.main.async {
          let activityViewController = UIActivityViewController(activityItems: [self], applicationActivities: [])
          self.present(activityViewController, animated: true)
      }
}
``` 
![image](/assets/images/post2/share-link-external-icon.png)
If you wish to exclude certain actions from being presented to the user as part of the share such as print, saving images to device, airDrop, copyToPasteboard, etc. you can supply the as an array to the actiity view controller's `excludedActivityTypes` property.
```swift
activityViewController.excludedActivityTypes = [.print,.saveToCameraRoll, .copyToPasteboard, .airDrop]
``` 

The complete source code can be found on my [GitHub](https://github.com/anupdsouza/iOS-Demos/tree/main/ActivityControllerDemo)

References:
- [UIActivityViewController](https://developer.apple.com/documentation/uikit/uiactivityviewcontroller)
- [LPLinkMetadata](https://developer.apple.com/documentation/linkpresentation/lplinkmetadata)
