Drag and Drop Programming Practice Guide

## 0. Background Info

Apple's [*Drag and Drop Programming Topics*](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/DragandDrop/DragandDrop.html#//apple_ref/doc/uid/10000069-SW1) {:target="_blank"}is updated at 2012-01-09, fairly old, besides, some API are deprecated in MacOS 10.7.

So here is a new guide I write.

## 1. Introduction 介绍

### 1.1 What is drag-and-drop? 
什么是拖和放？

Dragging and dropping are visual phenomena, describing mouse movement with some element on screen from one place(named dragging source) to another(named dragging destination, at last releasing mouse, and complete some operation. The whole process is named dragging session. Mac SDK provides two classes that supports dragging and dropping: NSView and NSWindow.

拖放是一种视觉现象。它把鼠标关联的某个屏幕元素从一个地方移动到另一个地方，最终放开鼠标，同时完成一定的操作。

1. Example 1: (use mouse to) drag an image file in Finder into your application, then release mouse to drop the file, at same time, the content of the image is displayed in your app.

2. Exmaple 2:drag an image from your app into Finder and save the image as a png file.

2. Example 3
	In a text editing application, select a piece of text then drag it to other place in the article, then the piece of text move to new place.

要成为一个拖动操作的源头或者目的地，对象必须在屏幕上占有一定部分；因此，只有窗口和视图对象可以称为拖动的来源和目的地。（注意：源视图并不一定是前面定义的拖动源。）NSWindow和NSView提供了处理拖动对象的用户接口的方法。

Dragging is a visual phenomenon. To be the source or destination of a dragging operation, an object must represent a portion of screen real estate; thus, only window and view objects can be the sources and destinations of drags. (Note that the source view is not necessarily the same objects as the dragging source defined above.) NSWindow and NSView provide methods that handle the user interface for dragging an object. You only need to implement a few methods from either the NSDraggingSource or NSDraggingDestination protocol, depending on whether your window or view subclass is the source or destination.

### 1.2 Scope of drag-and-drop

As above examples, some drag-and-drop happens in one application, it's in-app drag-and-drop.
Some happes between two applications, it's cross-app drag-and-drop.

### 1.3 Process of dragging and its participants

Dragging session
In the text here and in the dragging protocol descriptions, the term dragging session is the entire process during which an image is selected, dragged, released, and absorbed or rejected by the destination.

1. dragging source
2. dragged image
3. dragging destination


拖放的步骤和过程？

拖放支持的特性？数据类型？

### 1.4 目前最新的接口定义，是放在哪里的？都有些什么接口，作用是什么？

The whole API is defined in file *NSDragging.h*, it includes 4 protocols:

NSDraggingInfo
NSDraggingDestination
NSDraggingSource
NSSpringLoadingDestination

在AppKit中，
NSTableView实现了NSDraggingSource协议。
NSTextView实现了NSDraggingSource协议。
NSView实现了NSDraggingDestination协议。
NSCollectionView实现了NSDraggingSource, NSDraggingDestination协议。
