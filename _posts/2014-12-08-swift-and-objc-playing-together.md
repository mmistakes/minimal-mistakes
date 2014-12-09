---
layout: post
title: "Swift and Objective-C playing together"
excerpt: "Start using Swift in your Objective-C projects. Avoid some headaches with these useful tips and advices for the communication layer between your Objective-C code base and your future Swift implementations"
modified: 2014-12-09
tags: [swift, objective-c, integration, cocoapods]
comments: true
image:
  feature: earpods.jpg
  credit: Pedro Piñera
sitemap   :
  priority : 0.5
  isfeatured : 0
---

Since Swift was released, a lot of developers have been wondering about the Swift integration in their projects. If we take a look to the Apple documentation it seems that the integration is possible, the language was designed for having that kind of copmatibility instead. However the majority of them haven't taken the decission of start using it, sometimes for fear of breaking something on the current code base, or probably for not having enough time to learn it. 

After the release I started working on **SugarRecord** an open source library that is a kind of wrapper to work with databases (CoreData and Realm). The reason basically was that I wanted to learn deeply the language and playing with Playgrounds and short examples wasn't going to help a lot. You end up forgetting those small examples, and not facing with the real problems you would face if you played with a big project/library. 

The experience has been amazing because I've learnt **how powerful Swift might be** if we compare it with Objectve-C but a bit painful after having to deal with different updates on the language, some unstable versions of XCode (unstable already) and overall what things that language has in common with Objective-C and how we can have a communication layer between them. 

It's possible to have Swift playing with Objective-C in the same project, however there are some points that it's important to keep in mind if you want to avoid a big headache. I would try to summarize most of them here with short examples that explain them.   

## Objective-C projects


{% img /images/swiftobjc-structure.png Swift Structure %}

If we analyzed the structure of our Objective-C projects that would be something like what you can see in the figure above. We have some libraries integrated (or not) using an external dependency manager like CocoaPods into our Objective-C code base. Everything works great, we have both in the same language and the same language features are available in both sides. **What happens when Swift appears in the scene?** We have features that are available in a language (Swift) that aren't in the other and that introduces extra communication problems that we have to face. We'll see that we can use a kind of **keywords** or Swift types that are automatically translated into the equivalent ones in Objectve-C but that in some other cases we might end up using a wrapper component that allows us to stablish the communication with these Swift components.

## Pure Swift

Firstly we have to be sure of which features are *"pure"* Swift features. What does pure suppose? Features that can only be used from Swift and Objective-C won't be able to work with them. Yes, those features make the language much better, and powerful and allows you to simplify much more your implementations but if what you actually want is to have something compatible with your Objective-C it's better to wait until you have more Swift than Objective-C to start enjoying them. Those features are:

- Generics
- Tuples
- Swift enums
- Structures defined in Swift
- Top-level functions defined in Swift
- Global variables defined in Swift
- Typealiases defined in Swift
- Swift-style variadics
- Nested types and curried functions

If you don't know about any of those features I recommend you to take a look to the [docummentation](https://www.google.es/search?q=swift+docs&oq=swift+docs&aqs=chrome..69i57j69i60l5.1273j0j4&sourceid=chrome&es_sm=91&ie=UTF-8) where you'll learn more about them. 

Remember, **Objective-C** doesn't know about them and you **must** avoid them in the public interface of your Swift features/components. Otherwise you won't be able to use them from your Objective-C code

## Bridging
The mechanism Apple released to bridge Swift and Objective-C was something called **bridging-header** (*what an original name*). We have **two bridging directions:** Swift into Objective-C and Objective-C into Swift and consequently two bridging mechanisms:

- **Project-Briding-Header.h**: That file allows you to *make your target Objective-C files visibles* to Swift, otherwise they won't and you won't be able to use them. That file is a simple *Objective-C header file* where you have a list of imports of other headers. *Note: If you wanna use Objective-C libraries that you have integrated through CocoaPods you have to import them in that header if you want to use them from Swift*

**Product-Bridging-Header.h**

{% codeblock lang:objc %}
//
//  Use this file to import your target's public headers that you would
//  like to expose to Swift.
//

// I can import CocoaPods Libraries here!
#import <AFNetworking/AFNetworking.h>

// And my Objective-C classes
#import "CocaColaAlgorithm.h"
{% endcodeblock %}

**Swift-Class.swift**

{% codeblock lang:swift %}
// Use here your Objective-C exposed classes
let cola = CocaColaAlgorithm.prepareCola()
{% endcodeblock %}

- **ProductName-Swift.h**: That file is *automatically generated* by XCode. When you compile the project XCode generates a header file *"translating"* Swift code into Objective-C. That way you can use Swift classes and components from Objective-C. **That have some restrictions that I'll tell you about because not everything will be available to use in Objective-C**

**Swift.swift**

{% codeblock lang:swift %}
class NSObjectSwiftClass: NSObject { }
{% endcodeblock %}

**ProductName-Swift.h**

{% codeblock lang:objc %}
SWIFT_CLASS("_TtC9SwiftObjc18NSObjectSwiftClass")
@interface NSObjectSwiftClass : NSObject
- (instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end
{% endcodeblock %}

{% img center /images/swiftobjc-alert.png Bridging Header Alert %}

## What's really exposed?
As I mentioned not all your Swift code is exposed. The point is that the compiler follows some rules to generate the header and not all of those rules are reflected on the Apple docummentations. You'll figure out some of them working on that type of integrations and some others reading from others developers dealing with similar problems. Summarizing the most important ones, only will be exposed:

- Classes, attributes and methods marked with the keyword **@objc**
- Classes descendent of **NSObject**
- **Public** elements
- Private elements are exposed if marked with **@IBAction, @IBOutlet, and @objc**
- **Internal** elements are exposed if the project has an Objective-C bridging header
- **Only** Objective-C compatible features.

### Circular dependencies
When you import Objective-C generated classes into your Objective-C existing classes do it using a foward declaration @class. Otherwise you might have troubles with circular dependencies. Import only the header file in the body of your classes.

### Product package naming
XCode uses your product package name for the xxxxx-Swift.h file naming but replacing some non alpha-numeric characters by an underscore symbol. To avoid some problems rename your package name using an alpha-numeric name (that doesn't start by a number which is replaced too by underscore).

# What can I do once defined the bridge?

## Subclassing

You can subclass Objective-C classes in Swift, remember to use the **override** keyword wherever you are overriding a parent class implementation. **Swift classes cannot be subclassed in Objective-C** *(even if they are NSObject sublcass or labeled with the keyword @objc)*


{% img center /images/swiftobjc-subclass.png %}

{% codeblock lang:objc %}
#if !defined(SWIFT_CLASS)
# if defined(__has_attribute) && ...
#  define SWIFT_CLASS(SWIFT_NAME)...
# else
#  define SWIFT_CLASS(SWIFT_NAME) SWIFT_RUNTIME_NAME...
# endif
#endif

SWIFT_CLASS("_TtC9SwiftObjc9ObjcClass")
@interface ObjcClass
- (instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end
{% endcodeblock %}


## AnyObject

AnyObject is the Swift equivalent of **id**. However AnyObject as a difference of id is not a class type but a protocol. AnyObject **is not known until runtime execution**. It supposes that the compiler can pass if you call a method on the AnyObject object that it doesn't actually implement but if your program executes that line of code your app is going to crash. **Be careful!**:

{% codeblock lang:swift %}
if let fifthCharacter = myObject.characterAtIndex?(5) {
    println("Found \(fifthCharacter) at index 5")
}
{% endcodeblock %}

## Nils

As you probably know Swift introduced a new type of data, **optionals** those allow nil  type and the real content of the type (in case of having) is wrapped inside that optional. Objective-C is more flexible in that aspect and allows you to call methods on those nil objects without causing exceptions or making your app crash. The way the **compiler translates** those variables or function return parameters that **might be nil** is using **implicitly unwrapped optionals** (var!). It implies that if you are planning to use one of those implicitly unwrapped optionals that the compiler generated from your Objective-C code do it carefully checking firstly if the value is nil. **Otherwise, trying to access it being nil will cause a runtime error and your app will crash**

{% codeblock lang:objc %}
- (NSDate *)dueDateForProject:(Project *)project;
{% endcodeblock %}

{% codeblock lang:swift %}
func dueDateForProject(project: Project!) -> NSDate!
{% endcodeblock %}

## Extensions and categories
Extensions are the equivalent of categories in Swift. The main difference is that we can use textensions in Swift to make classes conform protocols that they didn't. For example we can make our class *MyClass* conform the protocol **StringLiteralCovertible** and initialize it using an string:

{% codeblock lang:swift %}
extension MyClass: StringLiteralConvertible
{
    typealias ExtendedGraphemeClusterLiteralType = StringLiteralType
    init(unicodeScalarLiteral value: UnicodeScalarLiteralType) {
        self.pattern = "\(value)"
    }

    init(extendedGraphemeClusterLiteral value: StringLiteralType) {
        self.pattern = value
    }

    init(stringLiteral value: StringLiteralType) {
        self.pattern = value
    }

}
{% endcodeblock %}
I recommend you that interesting post of Matt [http://nshipster.com/swift-default-protocol-implementations/](http://nshipster.com/swift-default-protocol-implementations/) where he explains different uses of default system protocols to do something like what I have shown you above.

## Closures and Blocks
They are automatically converted too by the compiler. There's only a difference and it's that in Swift if you **use an external variable in a closure** it's automatically mutable (no copy of the bar). Do you remember when you had to do it in Objective-C using the keyword `__block` before the variable definition? No more required!

**Example in Objective-C**

{% codeblock lang:objc %}
__block CustomObject  *myObject = [CustomObject new];
void (^myBlock)() = ^void() {
  NSLog(@"%@", myObject);
};
{% endcodeblock %}

**Example in Swift**

{% codeblock lang:swift %}
let customObject: MyObject = MyObject()
let myBlock: () -> () = { in
  println("\(customObject)")
}
{% endcodeblock %}

And yes! we have the [FuckingBlockSyntax.com](www.fuckingblocksyntax.com) equivalent for Closures, [FuckingClosureSyntax.com](www.fuckingclosuresyntax.com)

## @objc Keyword
When you want to specify the compiler that any Swift class, property or method must be visible in Objective-C after your code has been compiled you have to use the keyword @objc. Take look to the example below where we say the *SwiftCat* is going to be visible in Objective-C with the name *ObjcCat*

{% codeblock lang:swift %}
@objc(ObjcCat)
class SwiftCat {
    @objc(initWithName:)
    init (name: String) { /*...*/ }
}
{% endcodeblock %}

## Protocols
In protocols there are such exceptions crossing the protocols usage between Objective-C and Swift. While Swift can adopt **any** Objective-C protocol, Objective-C **can only adopt** Swift protocols if they are of type NSObjectProtocol. Otherwise Swift won't be able to do it.

Moreover if you are using protocols in a **Delegate** pattern you have to declare your protocols as **class**. Why? Because not only classes in Swift can conform protocols but structs too. Strucs are passed by copy instead of by reference and we don't want have a copied object that conforms a protocol behaving as a delegate of something because it's not actually the real delegate object. When you set a protocol as `class`, **only classes can conform that protocol**

{% codeblock lang:swift %}
/** MyProtocol.swift */
@objc protocol MyProtocol: NSObjectProtocol {
    // Protocol stuff
}
{% endcodeblock %}

## Cocoa Data Types
Most of the foundation data types can be used interchangeably with Swift types (*remember to import Foundation*). So for example you can initialize a NSSTring object in Swift using a Swift string:

{% codeblock lang:swift %}
let myString: NSString = "123"
{% endcodeblock %}

**Int, UInt, Float, Double and Bool** have its equivalent in Objective-C that is **NSNumber**

{% codeblock lang:objc %}
let n = 42
let m: NSNumber = n
{% endcodeblock %}

Regarding the collection types, we have equivalents too there. **[AnyObject]** Swift array is automatically converted into NSArray (if the elements are AnyObject  compatible). *For example if we have an array of Int, [Int] it will be converted into an array of NSNumbers.*

Any **NSArray** will be converted into a Swift [AnyObject] array. We can even downcast it into the real type:

{% codeblock lang:swift %}
for myItem in foundationArray as [UIView] {
    // Do whatever you want
}
{% endcodeblock %}

And something similar happens with **NSDictionaries**. They are converted into **[NSObject: AnyObject]** and we get **NSDictionaries** from **[NSObject: AnyObject]** if the keys and values are instances of a class or are bridgeable

# CocoaPods

![image](http://nairteashop.org/wp-content/uploads/2013/11/CocoaPods.png)

You might wonder if we can use CocoaPods with our projects where we've started using Swift. **The answer is YES**, you can so far, but only using **Objective-C pods**. You can add the headers into your project *Bridging-Header.h* file and then they will be visible in Swift.

The CocoaPods team are working on supporting Swift libraries too, [https://github.com/CocoaPods/CocoaPods/pull/2835](https://github.com/CocoaPods/CocoaPods/pull/2835) and they are pretty closed to have it. So you'll be able to have not only Objective-C but Swift libraries too.


# Moving to Swift Advices

Finally as a conclussion of this summary post I would like to give you some advices for your Swift integrations. I figured out some of them when I had to deal with some problems and I would like you not to have to deal with the same problems.

1. **Don't touch your Objective-C code base**: If you have a clean, useful code base on Swift don't speedup. There's no limit date to have everything on Swift. It's just something that Apple expects to be a gradual process. Move your components to Swift *only if they require a refactor* or *they have been deprecated and a new one (in Swift) will replace them*.

2. **Most of libraries are in Objective-C**: And that's something great because you can have both Objective-C and Swift communicating with them. Libraries like AFNetworking, MagicalRecord, ProgressHUD are still being actively developed in Objective-C but some others are appearing in Swift in order to replace them like Alamofire.

3. **Implement Swift in isolated features**: Avoid crossed dependencies between Swift andn Objective-C and try to use pure Swift only internally on those components. Expose those things that you need from Objective-C using @objc compatible features.

4. **Swift libraries only when there's no option in Objective-C**: If you have seen a library in Swift that you haven't see any like that before in Objective-C then use it. It's probably that you have to implement any wrapper to use from Objective-C if that library uses pure Swift features. *AlamoFire for example uses top-level functions, structs, ... so yes we can have it in our project and use it from Swift but it's impoossible to do it from Objective-C*

5. **Swift is a language STILL IN PROGRESS**: Do not get frustrated if you have the *SourceKitService Crashed* famous crash every 10 minutes. The compiler and the language in general have a lot of things to improve. It seems more stable now that some months ago but not enough (in my opinion). Moreover they are still changing and improving it so it's probably that you compile your project tomorrow and then something there's an optional somewhere that it wasn't yesterday.


## Resources

{% codeblock lang:swift %}
//MARK: - You should read
let swiftTypes = "https://github.com/jbrennan/swift-tips/blob/master/swift_tips.md"
let realmAndObjc = "http://realm.io/news/swift-objc-best-friends-forever"
let swiftReady = "http://www.toptal.com/swift/swift-is-it-ready-for-prime-time"
let swiftImprovesObjc = "http://spin.atomicobject.com/2014/06/13/swift-improves-objective-c/"
{% endcodeblock %}


<script async class="speakerdeck-embed" data-id="797cb47061d3013267d84a36ee36a741" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

