---
title:  "Tip : Visual Studio Code : Block Selection" 
categories: dev 
description: Visual Studio Code Block Selection
tag: 
  - vscode
  - how-to
--- 

Did you know that we could select a block, using the keyboard in visual studio code!

Normally, I would do it using the key combination Ctrl + Shift + \[Left or Right Attow\]. But, I recently learned that there is a key combination that we could use to select the current block or the parent block of the current block in Visual Studio Code.

The key combination is `Alt + Shift + Right Arrow Key`

Note, how I did not mention the Left arrow! It is because this combination does not work with the left arrow.

This could be used iteratively, such that on using it, the current block is selected. On using it again, the parent block is selected, so on and so forth.

For example, if the cursor is inside the function parenthesis list, and you use the block selection key combination, it selects the current parameter. On using it again, it selects all the parameters (if there is more than one parameter). The next time, it selects the entire function. The next time, it selects the entire class.

Hope you find this helpful.