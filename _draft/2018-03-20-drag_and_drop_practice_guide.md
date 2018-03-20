---
title:  "Drag and Drop Programming Practice Guide"
date:   2018-03-20 21:51:07 +0800
toc: true
toc_label: "Table Of Content"
toc_icon: "columns"  # corresponding Font Awesome icon name (without fa prefix)
---


Drag and Drop Programming Practice Guide

## 0. Background Info

Apple's [*Drag and Drop Programming Topics*](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/DragandDrop/DragandDrop.html#//apple_ref/doc/uid/10000069-SW1) {:target="_blank"}is updated at 2012-01-09, fairly old, besides, some API are deprecated in MacOS 10.7.

So here is a new guide I write.

## 1. Introduction 介绍

### 1.1 What is drag-and-drop? 
什么是拖和放？

Dragging and dropping are visual phenomena, describing mouse movement with some element, representing as an image(named dragged image), on screen from one place(named dragging source) to another(named dragging destination), at last releasing mouse, and complete some operation. The whole process is named dragging session. Mac SDK provides two classes that supports dragging and dropping: NSView and NSWindow.

拖放是一种视觉现象。它把鼠标关联的某个屏幕元素从一个地方移动到另一个地方，最终放开鼠标，同时完成一定的操作。

1. Example 1: drag an image file in Finder into your application, then release mouse to drop the file, at same time, the content of the image is displayed in your app.
2. Example 2: drag an image from your app into Finder and save the image as a new png file.
3. Example 3: in a text editing application, select a piece of text then drag it to other place in the article.

要成为一个拖动操作的源头或者目的地，对象必须在屏幕上占有一定部分；因此，只有窗口和视图对象可以称为拖动的来源和目的地。（注意：源视图并不一定是前面定义的拖动源。）NSWindow和NSView提供了处理拖动对象的用户接口的方法。

Dragging is a visual phenomenon. To be the source or destination of a dragging operation, an object must represent a portion of screen real estate; thus, only window and view objects can be the sources and destinations of drags. (Note that the source view is not necessarily the same objects as the dragging source defined above.) NSWindow and NSView provide methods that handle the user interface for dragging an object. You only need to implement a few methods from either the NSDraggingSource or NSDraggingDestination protocol, depending on whether your window or view subclass is the source or destination.

### 1.2 Scope of drag-and-drop

As above examples, some drag-and-drop happens in one application, it's in-app drag-and-drop.

Some happens between two applications, it's cross-app drag-and-drop.

### 1.3 Process of dragging and its participants

In the text here and in the dragging protocol descriptions, the term dragging session is the entire process during which an image is selected, dragged, released, and absorbed or rejected by the destination.

1. dragging source
2. dragged image
3. dragging destination


拖放的步骤和过程？

拖放支持的特性？数据类型？

### 1.4 API for drag-and-drop

目前最新的接口定义，是放在哪里的？都有些什么接口，作用是什么？

All related APIs are defined in *NSDragging.h*, it includes 4 protocols:

NSDraggingInfo
NSDraggingDestination
NSDraggingSource
NSSpringLoadingDestination

In AppKit,

* NSView, conforms to `NSDraggingDestination` protocol.
* NSTableView, conforms to `NSDraggingSource` protocol.
* NSTextView, conforms to `NSDraggingSource` protocol.
* NSCollectionView, conforms to `NSDraggingSource` and `NSDraggingDestination` protocols.

The `NSDraggingInfo` protocol declares methods that supply information about a dragging session. They are designed to be invoked from within a class's implementation of `NSDraggingDestination` protocol methods. AppKit automatically passes an object that conforms to the `NSDraggingInfo` protocol as the argument to each of the methods defined by `NSDraggingDestination`. `NSDraggingInfo` messages should be sent to this object; you never need to create a class that implements the `NSDraggingInfo` protocol.

So, all NSView can be the dragging destination.

The `NSSpringLoadingDestination` protocol is used for spring-loading.

NSWindow supports drag-and-drop with a different approach. It does not conforms to neither of above protocols, instead, it has a category named `NSDrag`.

@interface NSWindow(NSDrag)
- (void)dragImage:(NSImage *)image at:(NSPoint)baseLocation offset:(NSSize)initialOffset event:(NSEvent *)event pasteboard:(NSPasteboard *)pboard source:(id)sourceObj slideBack:(BOOL)slideFlag;

- (void)registerForDraggedTypes:(NSArray<NSString *> *)newTypes;
- (void)unregisterDraggedTypes;
@end

## 2. Analyze of Dragging Session

### 2.1 Requrired meothods
`NSDraggingSource` protocol has only one `@requried` method, `draggingSession:sourceOperationMaskForDraggingContext:`. 

第二个参数是一个枚举类型，代表拖动的范畴，它的定义有2个值，`NSDraggingContextOutsideApplication`，向程序外的拖动；`NSDraggingContextWithinApplication `，程序内的拖动，

```
typedef NS_ENUM(NSInteger, NSDraggingContext) {
    NSDraggingContextOutsideApplication = 0,
    NSDraggingContextWithinApplication
} NS_ENUM_AVAILABLE_MAC(10_7);
```

Its return value is a bitmask `NSDragOperation `,


```
typedef NS_OPTIONS(NSUInteger, NSDragOperation) {
    NSDragOperationNone		= 0,
    NSDragOperationCopy		= 1,
    NSDragOperationLink		= 2,
    NSDragOperationGeneric	= 4,
    NSDragOperationPrivate	= 8,
    NSDragOperationMove		= 16,
    NSDragOperationDelete	= 32,
    NSDragOperationEvery	= NSUIntegerMax,
};
```

Dragging Operation | Meaning | value
--- | --- | --- 
NSDragOperationNone | No drag operations are allowed. | 0
NSDragOperationCopy | The data represented by the image can be copied. | 1
NSDragOperationLink | The data can be shared. | 2
NSDragOperationGeneric | The operation can be defined by the destination. | 4
NSDragOperationPrivate | The operation is negotiated privately between the source and the destination. | 8
NSDragOperationMove | The data can be moved. | 16
NSDragOperationDelete | The data can be deleted. | 32
NSDragOperationEvery | All of the above| NSUIntegerMax

So, for `draggingSession:sourceOperationMaskForDraggingContext:`, the allowed operations may differ if the drag is occurring entirely within your application or between your application and another.

### 2.2 modifier key

The user can press modifier keys to further select which operation to perform. If the control, option, or command key is pressed, the source’s operation mask is filtered to only contain the operations given in Table 2. For example, your `draggingSession:sourceOperationMaskForDraggingContext:` returns `NSDragOperationLink | NSDragOperationCopy | NSDragOperationGeneric` and during dragging, you press Control, then the effective dragging operation is `NSDragOperationLink`.

用户可以按住修饰键，进一步选择执行什么操作，如果control，option，或者command键被按下，来源的操作掩码被过滤，只包含操作，表2.要阻止修饰键修改掩码，你的拖动来源需要实现ignoreModifierKeysWhileDragging方法，并返回YES（被deprecated的方法，换用ignoreModifierKeysForDraggingSession:）。

Table 2  Drag operations selected with modifier keys

Modifier Key | Dragging Operation
--- | ---
Control | NSDragOperationLink
Option | NSDragOperationCopy
Command | NSDragOperationGeneric

To prevent modifiers from altering the mask, your dragging source should implement `ignoreModifierKeysForDraggingSession` and return YES.

### 2.3 Drag Messages 拖动消息
During the course of the drag, the source object is sent a series of messages to notify it of the status of the drag operation. 

1. At the very beginning of the drag, the source is sent the message `draggingSession:willBeginAtPoint:`.

2. Each time the dragged image moves, the source is sent a `draggingSession: movedToPoint:` message. 

3. Finally, when the user has released the mouse button and the destination has either performed the drop operation or rejected it, the source is sent a `draggingSession:endedAtPoint:` message. The operation argument is the drag operation the destination performed or NSDragOperationNone if the drag failed.

在拖动过程中，来源对象会收到一系列消息，告知它拖动操作的状态。
在拖动开始时，来源对象收到draggedImage:beganAt:消息。（deprecated，换用draggingSession:willBeginAtPoint:）。
每当拖动图片发生移动，来源对象收到draggedImage:movedTo:消息。（deprecated，换用draggingSession:movedToPoint:）。
最终，当用户释放鼠标按键，目的地对象要么执行放下操作，要么拒绝，来源对象收到draggedImage:endedAt:operation:消息。（deprecated，换用draggingSession:endedAtPoint:operation:）。
这3个方法中，operation参数是目的地对象执行的拖动操作，如果拖动失败的话，则为NSDragOperationNone。（在Java中，）

The dragging source generally does not need to implement any of these methods. If you are going to support the NSDragOperationMove or NSDragOperationDelete operations, however, you do need to implement draggedImage:endedAt:operation: to remove the dragged data from the source. (Note that an NSDragOperationDelete operation is requested when dragging any object to the Trash icon in the dock.)

拖动来源一般不需要实现上述的方法，如果你要支持NSDragOperationMove或者NSDragOperationDelete操作，你需要实现draggedImage:endedAt:operation:来移除拖动源的拖动数据。（注意，当拖动任何对象到Dock栏的废纸篓时，会发起一个NSDragOperationDelete操作。）

- (void)draggingSession:(NSDraggingSession *)session willBeginAtPoint:(NSPoint)screenPoint;
- (void)draggingSession:(NSDraggingSession *)session movedToPoint:(NSPoint)screenPoint;
- (void)draggingSession:(NSDraggingSession *)session endedAtPoint:(NSPoint)screenPoint operation:(NSDragOperation)operation;