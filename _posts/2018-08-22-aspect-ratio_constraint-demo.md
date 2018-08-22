---
title:  "Demo of aspect ratio constraint"
date:   2018-08-22 13:57:07 +0800
---

There is a UI layout feature:

One view's size keeps 16:9 ratio, but will extend its size with its super view.

The demo uses several constraints to implement:

1. Required constraints: 

	1. C1, Align Center X, to super view
	2. C2, Align Center Y, to super view
	3. C3, Aspect ratio 16:9, to super view

2. Mid priority constraints:

	1. C4, Leading space, to super view, value is 50
	2. C5, Top space, to super view, value is 50
	3. C6, Trailing space, to super view, value is 50
	4. C7, Bottom space, to super view, value is 50

3. Low priority constraints:

	1. C8, Equal width, to super view, value is -100
	2. C9, Equal height, to super view, value is -100

C1, C2, C3, and C7's priority is 1000 (default value).

C4, C5, C6, and C7's priority is 750.

C8 and C9's priority is 490. It may be other value, but **MUST** be lower than 500.

<figure class="half">
<a href="https://user-images.githubusercontent.com/55504/44445028-1236bf00-a612-11e8-9b83-12e1afbb7d8e.png"><img src="https://user-images.githubusercontent.com/55504/44445028-1236bf00-a612-11e8-9b83-12e1afbb7d8e.png"></a>
<figcaption>Demo of aspect ratio constraint</figcaption>
</figure>

Source code is [here](https://github.com/cool8jay/testRatioLayout){:target="_blank"}.
 

