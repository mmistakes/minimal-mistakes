SVGs are the perfect example of something you think you know becuase you have used them many times before but once you try to do something a bit out of the ordinary, you start to realize how little you know about... and how foolish you were.

### Prologue

But before we start, let me give you some background. All began when I decided to do a complete rebuild of my site, whose purpose was to showcase my work as a 3D Character Designer. The whole concept of the site was to look and feel like a videogame and in particular, like a JRPG, since I am big fan of those. To put it simple, as far as design goes, while the site's background displays a party of heroes on a picturesque scene, a set of matching medieval style boards hanging on chains compose the user interface, thus resembling the welcome menu of a real videogame. And all of it is done with plain HTML, CSS and JavaScript. Pretty awesome, right?

I think you are already starting to see where the challenges start to arise. Leaving aside the 3d stuff, the UI itself it's not a common practice in today's web development world. A world where the phrase "responsive desing" is an absolute must. I though I had it all figured it out, though; I would just use a different version of the board with the chains included in a rasterized image (namely PNGs) for each breakpoint using CSS media quaries. Simple, right? No, not even close. Although I somehow managed to achieve what I wanted, as you can imagine, this quickly became an over complicated set of images that had to updated one by one with every change in any of them. No! Say no more. There had to be a better solution.

### SVG to the rescue!

When planning to do the rebuild, one of things that bugged my mind the most were those damn PNG files. I knew that I should have been using SVGs all along, and so while sailing the endless waters of the internets in search of more in-depth information, I came across Sara Soueidan's amazing articles on [SVG Coordinate Systems and Transformations](https://www.sarasoueidan.com/blog/svg-coordinate-systems/). In the rare case you haven't checked it out yet, I think you really should. And since you are there, check out her other works since they are very eloquent and a real delight to read. Anyways, I had finally confirmed that what I wanted to do was actually possible, and so from here on, I will try to explain in detail the steps I took in order to achieve what I wanted.



### Design

![board concept image][board]

As you can see in the concept design above, the overall idea is to have both, the menu buttons and the menu sections themselves, use the medieval style board but with some minor differences for each type. Since I want to make them as reusable as possible, I want both types to have names that are not tied to their specific functions. Insted, I opted for naming them according to their appearence.

#### Type 1: bulletin board

It resembles to a bulletin board used back in medieval times to post announcements for the whole town. It has big corners and has one pair of chains from which it hangs. In the top part of its frame, right in the center between where both chains are hooked, it has title plaque.

#### Type 2: sign board

Looking more like a sign right at the top of a store, not only are the corners of this other one smaller, but it has the option to have two pairs of chains; one at the top and one at the bottom so it can be hanged among other signs. However, it has no title plaque.

### Purpose

While the bulletin type will be used for dispaying the menu sections, the sign type will serve as the menu buttons. Both, the menu and the menu sections will slide up and down, depending on whether they are active or not, but functionality is not our concern right now.

### The objectives

Once decided how the board should look like and how each of its versions will be used, it was time to set our goals.

- Must be resizeable in height, width or both simultaneously.
- Should not require any extra html element. Adding the proper class to any element should be all that is needed.
- Only use a single file for the graphics to avoid unnecessary http requests.
- Must be cached by the browser.
- Falls back gracefully for browsers that do not support the features used.

### Step 1: making it resizeable

This is by far the most important feature in order to make the new IU responsive. But in order to achieve it, I needed to dive deep into inner workings of SVGs, particulary, their [SVG Coordinate Systems and Transformations](https://www.sarasoueidan.com/blog/svg-coordinate-systems/).

We need the board to stretch both horizontally and verticaly. However, there are some parts of the board that shouldn't resize so we have to split the board into different pieces. Let's see then how each part behave and decide how we split it according to that.

- Top and bottom sides of the frames should stretch horizontally.
- Left and right sides of the frames should stretch vertically.
- Corners should not resize.
- The area of the frame where the chains are hooked should resize horizontally but should never be shorter that the combined width of the holes.
- Title plaque should resize horizontally but should have a minimum width.
- Chains should not resize, but be tiled vertically.
- Planks should not resize, instead they should be tiled.
- The shading of the planks should resize horizontally and be tiled vertically.

In total, I ended up with a total of 12 pieces for the bulletin type, and 13 for sign one, 5 of them which are shared by both.

For bulletin:

- Bulletin title plaque.
- Bulletin corners.
- Bulletin horizontal sides of the frame.
- Bulletin holes area.
- Bulletin corners depth.
- Bulletin corners shadow.
- Bulletin holes area shadow.
- Bulletin planks.

For sign:

- Sign corners.
- Sign horizontal sides of the frame.
- Sign holes area.
- Sign corners depth.
- Sign corners shadow.
- Sign holes area shadow.
- Sign planks.

Shared by both:

- Vertical sides of the frames.
- The depth of the horizontal sides of the frame.
- The shadow of the horizontal sides of the frame.
- Top chains.
- Bottom chains.

[board]:({{ "/assets/img/board_concept.svg" | absolute_url }}) "board concept image"
