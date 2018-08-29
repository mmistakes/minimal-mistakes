If you think you know all about SVGs, think again. Besides letting us create amazing graphics that don't get blurred when resized, these little friends bring us a whole myriad of possibilities. But it's not until we go beyond making simple icon sets that we start to see all the wonders they have to offer us.

If you know what I mean, then this post is probably not for you. But if you don't, then please join me in this thrilling adventure as we take a deep dive into wild territory. Pack your CSS pre-processor and open your favourite code editor. It's going to be a long ride!

## Some context

But before we start, let me give you some background. All began when I decided to do a complete rebuild of my site, whose purpose was to showcase my work as a 3D Character Designer. The whole concept of the site was to look and feel like a JRPG, since it's the style I'm going after. To achieve this goal, I had the user interface look like that of a videogame of such genre. Specifically, it would be composed by a set of medieval boards hanged by chains.

I think you are already starting to see where the challenges start to arise.  Making this interfence responsive wasn't going to be an easy task. But being as foolish as I was, I though I had it all figured it out, though; I would just use a different version of the board with the chains included in a rasterized image (namely PNGs) for each breakpoint using CSS media quaries. Simple, right? No, not even close. Although I somehow managed to achieve what I wanted, this quickly became an over complicated set of images that had to be updated one by one with every change made to any of them. A complete waste of browser resources and a hell of a maintanence nightmare! There had to be a better solution.

## SVG to the rescue!

When planning to do the rebuild, one of things that bugged my mind the most were those damn PNG files. I knew that I should have been using SVGs all along, and so while sailing the endless waters of the internets in search of more in-depth information, I came across Sara Soueidan's amazing article on [SVG Coordinate Systems and Transformations](https://www.sarasoueidan.com/blog/svg-coordinate-systems/). In the rare case you haven't checked it out yet, I think you really should. And since you are there, check out her other works since they are very eloquent and a real delight to read. Anyways, I had finally confirmed that what I wanted to do was actually possible, and so from here on, I will try to explain in detail the steps I took in order to achieve it.

## The design

<p data-height="265" data-theme-id="0" data-slug-hash="EXjqRv" data-default-tab="result" data-user="andresangelini" data-embed-version="2" data-pen-title="Medieval Board" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/EXjqRv/">Medieval Board</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="async" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

As you can see in the concept design above, the overall idea is to have both, the menu buttons and the menu sections themselves, use the medieval style board but with some minor differences for each type. Since I want to make them as reusable as possible, I want both types to have names that are not tied to their specific functions. Insted, I opted for naming them according to their appearence.

### Type 1: bulletin board

It resembles to a bulletin board used back in medieval times to post announcements for the whole town. It has big corners and has one pair of chains from which it hangs. In the top part of its frame, right in the center between where both chains are hooked, it has a title plaque.

### Type 2: sign board

Looking more like a sign right at the top of a store, not only are the corners of this other one smaller, but it has the option to have two pairs of chains; one at the top and one at the bottom so it can be hanged among other signs. However, it has no title plaque.

In this way, I'd use the bulletin type for the sections and the sign one for the menu buttons.

## The objectives

Once decided how the board should look like and how each of its versions will be used, it was time to set our goals.

1. Must be resizeable in height, width or both simultaneously.
2. Only use a single file for the graphics to avoid unnecessary http requests.
3. Should not require any extra html element. Adding the proper class to any element should be all that is needed.
4. Must be cached by the browser.
5. Must be visually consistant across browsers. Otherwise, it should flag those that are not supported.

With a clear set of goals already laid out, let's begin by thinking how we are going to make the board resizeable.

## 1. Making the board resizeable

This is by far the most important feature in order to make the new IU responsive, so to begin with, we need to look carefully at the board design to see how each of its parts should behave.

### Analizying its structure

By inspecting the board carefully, it becomes clear that while there are some pieces that should stretch in one direction or the other, there are other pieces that should remain unchanged and even some that should be tiled. It would be logical then to group them together according to their behaviour:

- Top and bottom sides of the frames should stretch horizontally.
- Left and right sides of the frames should stretch vertically.
- Corners should not resize.
- The area of the frame where the chains are hooked should resize horizontally but should never be shorter that the combined width of the holes.
- Title plaque should resize horizontally but should have a minimum width.
- Chains should not resize, but be tiled vertically.
- Planks should not resize, instead they should be tiled.
- The shading of the planks should resize horizontally and be tiled vertically.

In total, I ended up with 12 pieces for the bulletin type, and 13 for the sign one, 5 of which are shared by both.

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
- Sign holes areas (both top and bottom).
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

Now that we have a deeper understanding of the board's structure, we can start tackling each problem individually, one at a time. But first, we should probably take a break, perhaps with a warm cup of coffee. Believe me, we'll probably need it. ;)
