---
layout: single
title: "How to resize images in Markdown posts"
date: 2024-08-05 11:15:00 +0530
excerpt: "If like me you also write your website posts in markdown, the only way to link images is as follows..."
seo_title: "How to resize images in Markdown posts"
seo_description: "Did you know that you could resize images in markdown posts using HTML? Let me show you how."
categories:
  - Web
tags:
  - Web
  - Markdown
  - HTML
  - Image sizing
---

# How to resize images in Markdown posts  

If like me you also write your website posts in markdown, the only way to link images is as follows:

`![image](/assets/images/post22/lone-tree.jpg)`

You provide the image's path whether relative or absolute with the `![alt text](image url)` markdown syntax. This results in the image displaying in full size which is not always optimal.

#### Result:
![image](/assets/images/post22/lone-tree.jpg)

There is however a way to size images if your markdown renderer supports HTML like Jekyll for instance. In this case you can link the image using HTML's `image` tag as follows:

`[<img src="/assets/images/post21/preview-remove-bg-3.jpg" width="100"/>](/assets/images/post21/preview-remove-bg-3.jpg)`

#### Result: Width = 100px
[<img src="/assets/images/post22/lone-tree.jpg" width="100"/>](/assets/images/post22/lone-tree.jpg)

This is a really convenient way to control the size of images. You can specify the height & width as you'd normally do in HTML. You can also specify the size as a percentage!

`[<img src="/assets/images/post22/lone-tree.jpg" width="50%"/>](/assets/images/post22/lone-tree.jpg)`

#### Result: Width = 50%
[<img src="/assets/images/post22/lone-tree.jpg" width="50%"/>](/assets/images/post22/lone-tree.jpg)

---
Consider subscribing to my [YouTube channel](https://www.youtube.com/@swiftodyssey?sub_confirmation=1) & follow me on [X(Twitter)](https://twitter.com/swift_odyssey). Leave a comment if you have any questions. 

Share this article if you found it useful !
