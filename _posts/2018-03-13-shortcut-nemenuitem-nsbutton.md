---
title:  "Shortcut of NSMenuItem and NSButton"
date:   2018-03-13 19:59:07 +0800
toc: true
toc_label: "Table Of Content"
toc_icon: "columns"  # corresponding Font Awesome icon name (without fa prefix)
---

Shortcut key, or hot key, is called `Key Equivalent` in Mac development. To use it, just press corresponding key combination, it will trigger predefined application function.

Among NSControl's subclass, NSMenuItem and NSButton supports key equivalent, which can be implemented in programmatic way or by changing xib object property. 

## 1. Composition of Key Equivalent 

Normally, key equivalent is composite of two parts: some modifier keys and one basic key.

There are 4 possible modifier keys:

Symbol | Name | 
--- | --- | 
⌘ | Command
⌃ | Control
⇧ | Shift
⌥ | Option, alias Alternate

Normal key, includes alphabet, number, punctuation, symbol key, etc.

Key Equivalent may have no modifier key. This is very common in high-efficiency professional application, for example, in Photoshop, moving layer's shortcut key is `V`.

For symbol key, it refers to key like `⎋` (escape), `↑` (up arrow). On Mac laptop, `⌦` (delete), `⇞` (page up), `⇟` (page down), `↖` (home), `↘` (end) does not have dedicated physical keys. But there are substitutes to accomplish same function:

Key | Substitute 
--- | ---
Delete | Fn + ⌫
Page Up | Fn + ↑
Page Down | Fn + ↓
Home | Fn + ←
End | Fn + →

## 2. Changing xib object property

In **Attributes** panel of NSMenuItem/NSButton, **Key Equivalent** input field, is used to set shortcut. For example, a character, E, will be displayed capitalized.

If shortcut includes `⇧` key, the input field will show an Alternates button, to let you choose displaying style between, like  `⌘+` and `⇧⌘=`.

![](https://user-images.githubusercontent.com/55504/37417474-5cafc540-27eb-11e8-830a-58ddb9c7defb.gif)

## 3. Programmatic Way

### 3.1 Normal Key

Following 2 lines of code, sets menuItem's shortcut as `E`.

```
[menuItem setKeyEquivalentModifierMask:!NSEventModifierFlagCommand];
[menuItem setKeyEquivalent:@"e"];
```

Following 1 line of code, sets menuItem's shortcut as `⌘E`.

```
[menuItem setKeyEquivalent:@"e"];
```

Following 1 line of code, sets menuItem's shortcut as `⇧⌘E`.

```
[menuItem setKeyEquivalent:@"E"];
```

### 3.2 Symbol Key

First of all, you need to know corresponding Unicode value.

Symbol | Name | Unicode
--- | --- | ---
⌫ | Backspace | 0x0008
⇥ | Tab | 0x0009
↩ | Return | 0x000d
⎋ | Escape | 0x001b
← | Left | 0x001c
→ | Right | 0x001d
↑ | Up | 0x001e
↓ | Down | 0x001f
␣ | Space | 0x0020
⌦ | Delete | 0x007f
↖ | Home | 0x2196
↘ | End | 0x2198
⇞ | Page Up | 0x21de 
⇟ | Page Down | 0x21df

`NSBackspaceCharacter`, `NSTabCharacter`, `NSCarriageReturnCharacter` are defined in *NSText.h*, others are not. All of them (except 4 arrow keys) can be found [here](https://unicode-table.com/en). Arrow keys do not use 0x2190, 0x2191, 0x2192, 0x2193, I don't know the reason. 

Then, following is an example of setting menuItem's shortcut as `⌘↩`.

```
NSString *s = [NSString stringWithFormat:@"%C", NSCarriageReturnCharacter];
[menuItem setKeyEquivalent:s];
```

One more thing, the Key Equivalent displayed by NSMenuItem is different than the symbol printed on some keyboards and in xib.

In xib | Running application
--- | --- 
<img width="150" alt="" src="https://user-images.githubusercontent.com/55504/37469962-6f291d78-28a1-11e8-871b-6cf5138bbaa4.png"> | <img width="150" alt="" src="https://user-images.githubusercontent.com/55504/37504064-0c47a87a-2917-11e8-8b2a-04fe40496065.png">

Some keyboard models:

<a href="https://user-images.githubusercontent.com/55504/37498987-5c8c51ca-28fc-11e8-880e-5389466e76ee.jpg" target="_blank">
<img width="150" alt="Apple - Magic Keyboard with Numeric Keypad" src="https://user-images.githubusercontent.com/55504/37498987-5c8c51ca-28fc-11e8-880e-5389466e76ee.jpg" />
</a>

*Apple - Magic Keyboard with Numeric Keypad*
 
<a href="https://user-images.githubusercontent.com/55504/37498988-5cd81308-28fc-11e8-9423-a70fe8c2aa5f.jpg" target="_blank">
<img width="150" alt="Belkin - YourType Bluetooth Wireless Keypad" src="https://user-images.githubusercontent.com/55504/37498988-5cd81308-28fc-11e8-9423-a70fe8c2aa5f.jpg" />
</a>

*Belkin - YourType Bluetooth Wireless Keypad*

## 4. Dynamic Menu Items

Option key has an alias, Alternate key, it is called so when holding it, the menu item will appear in a different way. 

In Apple's *Human Interface Guidelines*, this menu item is called [Dynamic Menu Items](https://developer.apple.com/macos/human-interface-guidelines/menus/menu-anatomy/), and invisible by default.

For instance, click MacOS desktop's left top `` menu item, then hold option key, you will see, "About This Mac" changes to "System Information..." and its triggered action changes too.

![](https://user-images.githubusercontent.com/55504/37418708-cde64e8a-27ed-11e8-884a-022c6a51fe6d.gif)

In xib, to implement this:

1. Add 2 NSMenuItem, they MUST be adjacent, no more menu item between them.
2. Set valid shortcut for them, and the second's shortcut MUST be the first's shortcut, plus `⌥` key.
3. Check Alternate property for the second NSMenuItem.

Now, run the app and it will works as above `` menu item example.

![](https://user-images.githubusercontent.com/55504/37417755-03bbaffc-27ec-11e8-8cad-b9445ae05777.gif)

Besides, in step 2, if you switch shortcuts of these two menu items, the default visible will be the second one instead, while they're still **alternate**.

![](https://user-images.githubusercontent.com/55504/37417756-040844fc-27ec-11e8-9539-ff3e068b7c15.gif)

## 5. Some Design Guideline

1. Do **NOT** add shortcut for contextual menu. [Link](https://developer.apple.com/macos/human-interface-guidelines/menus/contextual-menus/)
2. Do **NOT** conflict with system shortcuts or other popular shortcuts, like `⇧⌘Q` (log out account), `⌘C` (copy), etc.
3. Only add shortcut for frequently used action, to relieve user's learning and remembering burden. For example, about, is a rarely-used  action, it does not need a shortcut.

## 6. Other Weird Facts

1. `⌃⇧1` and `⇧1` can not exist together, or the former triggers the latter's action.
2. `⌃⌥⇧1` and `⇧1` can not exist together, or the former triggers the latter's action.
3. `⌃⌥⇧1` and `⌃⇧1` can not exist together, or the former triggers the latter's action.
4. `⌃⇧A`, its log info shows incorrectly for **⌃A**, both in code and xib. What's more, In code, if `keyEquivalent` is a capitalized alphabet and `keyEquivalentModifierMask` does not include `NSEventModifierFlagShift`, system will add `⇧` automatically in the shortcut UI.
5. `⌘=` and `⇧⌘=` can both trigger the menu item's action.
6. When setting `keyEquivalentModifierMask` for NSButton, it can not include `NSEventModifierFlagControl`, or shortcut will not work.

## 7. Reference

1. [*Human Interface Guidelines*](https://developer.apple.com/macos/human-interface-guidelines/menus/menu-anatomy/)
2. [*Application Menu and Pop-up List Programming Topics*](https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/MenuList/Articles/SettingMenuKeyEquiv.html#//apple_ref/doc/uid/20000264-BBCDCAIG)
3. [https://stackoverflow.com/a/6230866/353927](https://stackoverflow.com/a/6230866/353927)
4. [Unicode character table](https://unicode-table.com/en)

## 8. Demo Project

[Here](https://github.com/cool8jay/KeyEquivelant) is demo project.