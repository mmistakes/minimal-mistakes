SVGs are the perfect example of something you think you know becuase you have used them many times before but once you try to do something a bit out of the ordinary, you start to realize how little you know about... and how foolish you were.

### Prologue

But before we start, let me give you some background. All began when I decided to do a complete rebuild of my site, whose purpose was to showcase my work as a 3D Character Designer. The whole concept of the site was to look and feel like a videogame and in particular, like a JRPG, since I am big fan of those. To put it simple, as far as design goes, while the site's background displays a party of heroes on a picturesque scene, a set of matching medieval style boards hanging on chains compose the user interface, thus resembling the welcome menu of a real videogame. And all of it is done with plain HTML, CSS and JavaScript. Pretty awesome, right?

I think you are already starting to see where the challenges start to arise. Leaving aside the 3d stuff, the UI itself it's not a common practice in today's web development world. A world where the phrase "responsive desing" is an absolute must. I though I had it all figured it out, though; I would just use a different version of the board with the chains included in a rasterized image (namely PNGs) for each breakpoint using CSS media quaries. Simple, right? No, not even close. Although I somehow managed to achieve what I wanted, as you can imagine, this quickly became an over complicated set of images that had to updated one by one with every change in any of them. No! Say no more. There had to be a better solution.

### SVG to the rescue!

When planning to do the rebuild, one of things that bugged my mind the most were those damn PNG files. I knew that I should have been using SVGs all along, and so while sailing the endless waters of the internets in search of more in deep information, I came across Sara Soueidan's amazing articles on [SVG Coordinate Systems and Transformations](https://www.sarasoueidan.com/blog/svg-coordinate-systems/). In the rare case you haven't checked it out yet, I think you really should. And since you are there, check out her other works since they are very eloquent and a real delight to read. Anyways, I had finally confirmed that what I wanted to do was actually possible, and so from here on, I will try to explain in detail the steps I took in order to achieve what I wanted.

### The objective

![board concept][board]

In the spirit of doing everything as modular as it can be so as to keep thing simple and reusable I came up with these final requirements for the boards:








[board]:({{ "/assets/img/board_concept.jpg" | absolute_url }}) "board concept"
