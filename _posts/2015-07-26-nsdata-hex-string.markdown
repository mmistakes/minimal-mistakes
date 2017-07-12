---
layout: post
title:  "NSData as hexadecimal string"
date:   2015-07-26 00:00:00
categories: ios
tags: [ios, objective-c, cocoa, cocoa-touch, foundation, swift]
comments: true
---

It is sometimes useful to get a hexadecimal string representation of the contents of NSData just the way they are stored in memory.
This is the case, for example, when you want to communicate to your backend service the value of the push token assigned to your device by
Apple's Push Notifications Services.

If your push token is stored in memory as _0xDEADBEEF_, then the string "deadbeef" is exactly what you
want to send to your backend service.

This is simply done as follows:

{% highlight swift %}

func dataToHexString(data:NSData) -> String{

    let pointer = UnsafePointer<UInt8>(data.bytes)
    let count = data.length

    // Get our buffer pointer and make an array out of it
    let buffer = UnsafeBufferPointer<UInt8>(start:pointer, count:count)
    let array = [UInt8](buffer)

    let pushToken = reduce(array, "") { (s:String, int:UInt8) -> String in

        let chars = String(format:"%02x", int)
        return s.stringByAppendingString(String(chars))
    }

    return pushToken
}

let d = NSData(bytes: [0xDE, 0xAD, 0xBE, 0xEF] as [UInt8], length: 4)
let c = dataToHexString(d) // deadbeef

{% endhighlight %}

If you are looking instead for how to  make a string out of NSData, that is simply done by using the correct NSString initializer.

In Swift:

{% highlight swift %}

if let data = "Hello".dataUsingEncoding(NSUTF8StringEncoding) {

    let string = NSString(data: data!, encoding: NSUTF8StringEncoding)
}


{% endhighlight %}

In Objective-C;

{% highlight objective-c %}

NSData *helloAsData = [@"Hello" dataUsingEncoding:NSUTF8StringEncoding];
NSString *hello = [NSString initWithData:helloAsData encoding:NSUTF8StringEncoding];

{% endhighlight %}
