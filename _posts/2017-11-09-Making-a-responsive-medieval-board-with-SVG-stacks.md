If you think you know all about SVG, think again. Besides letting us create amazing graphics that don't get blurred when resized, these little friends bring us a whole myriad of possibilities. But it's not until we go beyond making simple icon sets that we start to see all the wonders they have to offer.

If you know what I mean, then this post is probably not for you. But if you don't, then please join me in this thrilling adventure as we take a deep dive into wild territory. Start you CSS pre-processors and open your favourite code editor. It's going to be a long ride!

### Prologue

But before we start, let me give you some background. All began when I decided to do a complete rebuild of my site, whose purpose was to showcase my work as a 3D Character Designer. The whole concept of the site was to look and feel like a videogame and in particular, like a JRPG, since I am big fan of those. To put it simple, as far as design goes, while the site's background displays a party of heroes on a picturesque scene, a set of matching medieval style boards hanging on chains compose the user interface, thus resembling the welcome menu of a real videogame. And all of it is done with plain HTML, CSS and JavaScript. Pretty awesome, right?

I think you are already starting to see where the challenges start to arise. Leaving aside the 3d stuff, the UI itself it's not a common practice in today's web development world. A world where the phrase "responsive desing" is an absolute must. I though I had it all figured it out, though; I would just use a different version of the board with the chains included in a rasterized image (namely PNGs) for each breakpoint using CSS media quaries. Simple, right? No, not even close. Although I somehow managed to achieve what I wanted, as you can imagine, this quickly became an over complicated set of images that had to be updated one by one with every change in any of them. No! Say no more. There had to be a better solution.

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
- Only use a single file for the graphics to avoid unnecessary http requests.
- Should not require any extra html element. Adding the proper class to any element should be all that is needed.
- Must be cached by the browser.
- Falls back gracefully for browsers that do not support the features used.

### Feature 1: making it resizeable

This is by far the most important feature in order to make the new IU responsive. But in order to achieve it, we need to dive deep into the inner workings of SVGs, in particulary, their [Coordinate Systems and Transformations](https://www.w3.org/TR/SVG/coords.html). As I mentioned back at the begining, Sara Soueidan has an [amazing  article](https://www.sarasoueidan.com/blog/svg-coordinate-systems/) on the topic.

Anyways, the key here is the ['preserveAspectRatio'](https://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute) attribute, which has two parameters, `<align>` and `<meetOrSlice>`. Basically, these two dictate how the SVG's content will behave when it changes size. `<align>` has many possible options to choose from while `<meetOrSlice>` has only two: 'meet' or 'slice', which will be ignored if `<align>` is 'none'. And this is exactly what we want because it will tell the content to stretch, instead of scaling while preserving its aspect ratio. But for all this to work, there is one more attribute that needs to be set: `<viewBox>`. With this one you can set the width and height of the SVG, making it ingore its instrinsic size if already had one and thus giving it a concrete aspect ratio. For now, just keep in mind that these two attributes can be used both in SVG elements as well as 'symbol' elements. In time, this will prove to be incredible valuable.

With the stretching thing figured out, let's now focus on how each part of the board behaves because while some of them need to stretch in one direction or the other, some shouldn't and some, besides not stretching, even need to repeat themselves to form a tile. According to these behaviors that we will use to decide how to split the board.

- Top and bottom sides of the frames should stretch horizontally.
- Left and right sides of the frames should stretch vertically.
- Corners should not resize.
- The area of the frame where the chains are hooked should resize horizontally but should never be shorter that the combined width of the holes.
- Title plaque should resize horizontally but should have a minimum width.
- Chains should not resize, but be tiled vertically.
- Planks should not resize, instead they should be tiled.
- The shading of the planks should resize horizontally and be tiled vertically.

In total, I ended up with 12 pieces for the bulletin type, and 13 for the sign one, 5 of them which are shared by both.

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

Perhaps you are wondering why I'm making a distintion between both types of boards since they seem to share so much. Well, the thing is that the dimensions of the corners between the two are different and not in percentages. This means that we would need a way to substract a value in pixel from a value in percetage, and currently, there is no equivalent of the `calc()` function for SVGs. Fortunately, we can get around this by using multiple backgrounds in CSS, each with a different size. For example, for the horizontal sides of the frame, we set the SVG element width to 100%, and then we use it as a background image with a width of 100% minus the width of the corner. In other words: `background-size: calc(100% - $corner-wdith)`.



[board]:({{ "/assets/img/board_concept.svg" | absolute_url }}) "board concept image"
