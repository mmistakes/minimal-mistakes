---
layout: post
title: "Debugging Carthage Dependencies"
categories: ios
tags: [ios, carthage, swift]
date: 2016-12-07T00:22:27+01:00
comments: true
---


[Carthage](https://github.com/Carthage/Carthage) is a great dependency management
tool for both Swift and Objective-C. However, finding the right workflow adopt when developing
with carthage can be a bit tricky.

This is especially true if you are building your own frameworks and would like to use
carthage to manage them in your application project.

{% include _toc.html %}

## The scenario

Suppose the following scenario.

You have a `cat-names` framework and a `dog-names` that you wrote yourself and
are building a `iPuppyApp` application.

After hard days of work you have now reached version `v0.1.0` of both `Cat-names.framework` and
`Dog-names.framework`. It's now time to build you app, so in the app's `Cartfile` you specify

```
git "file:///Users/blender/Code/cat-names" ~> 0.1.0
git "file:///Users/blender/Code/dog-names" ~> 0.1.0
```

Nice! Now you `carthage bootstrap`, link the framework, add the `carthage copy-frameworks`
(from now on referred as __Carthage Copy Framework__) phase and develop you app.

As you develop the `iPuppyApp` application you find a bug in `CatNames.framework`.
Unfortunately even if the sources are in `Carthage/Checkouts` Xcode won't _Open Quickly_
nor _Jump to definition_. No break points for you.

## The Carthage/Checkouts way

You decide to add to your project the `CatNames.xcodeproj` found in `Carthage/Checkouts/cat-names`.

This involves:

* removing the old library from "Linked Libraries and Frameworks" (because that's the one in `Carthage/Build/iOS`)
* adding the new library auto-discovered from the products by Xcode after you dragged in `CatNames.xcodeproj`
* changing the __Carthage Copy Framework__ to copy `$(BUILT_PRODUCTS_DIR)/CatNames.framework`
* adding `CatNames.framework` as a target dependency

I will call this the __Linking Dance__.

Great! You build, debug, find the bug and make the change to the library and surprise surprise... the
change you just made to the library is not under version control. You can't even `git diff`.

Depending on how used you are to this dance, you have now just wasted 3 to 5 minutes, and don't even have
your changes under version control. Imagine if you project had a longer list of in house dependencies.
This can easily take half an hour so to set up and tear down afterwards.

## The symbolic link way

The right thing do to here is actually to:

* turn the `Carthage/Checkouts/cat-names` directory in your app's project directory into a symbolics link to where your sources under version control are.
This will ensure that any change that you make is under version control.
* turn the `Carthage/Build` directory in __your framework__ into a symbolic link to __your app's project__ `Carthage/Build` director.
This will ensure that both your framework and your app can access all other frameworks build with carthage.

then do the the __Linking Dance__.

At this point your productivity is below zero and you're wondering what got you into software development in the first place.

But don't despair, I'm here to help.

## develop.rb

I have put together [develop.rb](https://gist.github.com/blender/ddf64f679f4a862c4e3279e7294d8a58) a ruby script that will __do and undo__ all of this for you without touching your project.
It will create another copy of you project called `$YOUR_PROJECT Dev.xcodeproj`.

### Assumptions

The script assumes that both the source of our frameworks and your app are in the same parent directory like the following:

```
.
..
|- cat-names
|- dog-names
|- iPuppyApp
```

The script uses a [Romefile](https://github.com/blender/Rome#romefile) to read the names of the repos of your frameworks.
If you are no using [Rome](https://github.com/blender/Rome) and don't have a `Romefile` just create one as follows:

```
[RepositoryMap]

cat-names = CatNames
dog-names = DogNames
```
Note that for the purpose of Rome this is __not a valid Romefile__, but it will do for the script

### Usage

Run the script from the same directory where your `Cartfile` is.

`TARGET_NAME="iPuppyApp" ./develop.rb start cat-names dog-names`

Get help by running
`./develop.rb --help`

### The script

<script src="https://gist.github.com/blender/ddf64f679f4a862c4e3279e7294d8a58.js"></script>

## Final notes

I am not a ruby developer and this is the first time I use ruby so feel free to suggest improvements.

Thanks to [@netbeatwork](https://twitter.com/netbeatwork) who inspired much of the Symbolic Link method
