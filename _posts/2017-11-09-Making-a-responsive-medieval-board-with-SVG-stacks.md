If you think you know all about SVGs, think again. Besides letting us create amazing graphics that don't get blurred when resized, these little friends bring us a whole myriad of possibilities. But it's not until we go beyond making simple icon sets that we start to see all the wonders they have to offer us.

If you know what I mean, then this post is probably not for you. But if you don't, then please join me in this thrilling adventure as we take a deep dive into wild territory. Pack your CSS pre-processor and open your favourite code editor. It's going to be a long ride!

### Some context

But before we start, let me give you some background. All began when I decided to do a complete rebuild of my site, whose purpose was to showcase my work as a 3D Character Designer. The whole concept of the site was to look and feel like a JRPG, since it's the style I'm going after. To achieve this goal, I had the user interface look like that of a videogame of such genre. Specifically, it would be composed by a set of medieval boards hanged by chains.

I think you are already starting to see where the challenges start to arise.  Making this interfence responsive wasn't going to be an easy task. But being as foolish as I was, I though I had it all figured it out, though; I would just use a different version of the board with the chains included in a rasterized image (namely PNGs) for each breakpoint using CSS media quaries. Simple, right? No, not even close. Although I somehow managed to achieve what I wanted, this quickly became an over complicated set of images that had to be updated one by one with every change made to any of them. A complete waste of browser resources and a hell of a maintanence nightmare! There had to be a better solution.

### SVG to the rescue!

When planning to do the rebuild, one of things that bugged my mind the most were those damn PNG files. I knew that I should have been using SVGs all along, and so while sailing the endless waters of the internets in search of more in-depth information, I came across Sara Soueidan's amazing article on [SVG Coordinate Systems and Transformations](https://www.sarasoueidan.com/blog/svg-coordinate-systems/). In the rare case you haven't checked it out yet, I think you really should. And since you are there, check out her other works since they are very eloquent and a real delight to read. Anyways, I had finally confirmed that what I wanted to do was actually possible, and so from here on, I will try to explain in detail the steps I took in order to achieve it.



### The design

![board concept image][board]

As you can see in the concept design above, the overall idea is to have both, the menu buttons and the menu sections themselves, use the medieval style board but with some minor differences for each type. Since I want to make them as reusable as possible, I want both types to have names that are not tied to their specific functions. Insted, I opted for naming them according to their appearence.

#### Type 1: bulletin board

It resembles to a bulletin board used back in medieval times to post announcements for the whole town. It has big corners and has one pair of chains from which it hangs. In the top part of its frame, right in the center between where both chains are hooked, it has title plaque.

#### Type 2: sign board

Looking more like a sign right at the top of a store, not only are the corners of this other one smaller, but it has the option to have two pairs of chains; one at the top and one at the bottom so it can be hanged among other signs. However, it has no title plaque.

In this way, I'd use the bulletin type for the sections and the sign one for the menu buttons.

### The objectives

Once decided how the board should look like and how each of its versions will be used, it was time to set our goals.

- Must be resizeable in height, width or both simultaneously.
- Only use a single file for the graphics to avoid unnecessary http requests.
- Should not require any extra html element. Adding the proper class to any element should be all that is needed.
- Must be cached by the browser.
- Must be visually consistant across browsers. Otherwise, it should flag those that are not supported.

### Feature 1: making it resizeable

This is by far the most important feature in order to make the new IU responsive, so to begin with, we need to look carefully at the board design and plan all this out.

#### Setting a plan

By analazying the structure of the board and how we expected it to behave, it becomes clear that while there are some pieces that should stretch in one direction or the other, there are other pieces that should remain unchanged and even some that should be tiled. It would be logical then to group them according to their behaviour:

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

#### Making an SVG stretch with 'viewBox' and 'preserveAspectRatio' attributes

Now that we have a clear path to follow, we are ready to start thinking about how we are going to make an SVG stretch, and to do that we need to dive deep into the inner workings of SVGs, in particulary, their [Coordinate Systems and Transformations](https://www.w3.org/TR/SVG/coords.html). As I mentioned back at the begining, Sara Soueidan has an [amazing  article](https://www.sarasoueidan.com/blog/svg-coordinate-systems/) on the topic.

After reading through both materials it becomes clear that the two keys of the puzzle here are the ['viewBox'](https://www.w3.org/TR/SVG/coords.html#ViewBoxAttribute) and  ['preserveAspectRatio'](https://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute) attributes. The first one, which is required for the second to work, lets you stablish the content's position and dimensions and thus the aspect ratio of `<svg>` and `<symbol>` elements and ignore their intrinsic values. The second has two parameters, `<align>` and `<meetOrSlice>`. Basically, these two dictate how the SVG's content will behave when it changes size. `<align>` has many possible options to choose from to align the content while `<meetOrSlice>` has only two: `'meet'` or `'slice'`. `'meet'` will try to fit the content in its container and `'slice'` will slice it if it doesn't fit the container. However, both of them will be ignored if `<align>` is set to `'none'`. And this is exactly what we want because it will tell the content to stretch, instead of scaling while preserving its aspect ratio.

<p data-height="300" data-theme-id="0" data-slug-hash="bYrBqe" data-default-tab="html" data-user="andresangelini" data-embed-version="2" data-pen-title="SVG preserveAspectRatio set to none" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/bYrBqe/">stretcheable SVG</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

#### Making SVG elements stretch using `<symbol>` and `<use>` elements.

This is all fine and dandy if all we want is to have an SVG stretch. But what we're really looking for is to have elements inside an SVG stretch, and not the SVG itself. How do we go about doing that? Well, first we need to understand a little bit how SVGs are structured. Remember that I said that the `<viewBox>` attribute could only be used in `<svg>` and `<symbol>` elements? This is becuase an SVG can also be an element, in other words, it can be nested inside an SVG. However, we will focus on the `<symbol>` element and the reason why will become clear once we learn its nature and that of the SVG itself.

As you probably already know, SVGs are no more than images drawn through math, as opposed to simple bitmap images (also called "raster images"), which is what makes them resolution independent. As such, an SVG might be composed of one or more parts, such as paths, basic shapes, texts, etc., which themselves represent graphic objects. However, it might also have elements which are not graphic in nature but are rather used to define graphical template objects to be used later on. These elements are the `<symbol>` element. Basically, you nest a graphical element inside a `<symbol>` element, assign an identifier to this `<symbol>` and call it by creating a `<use>` element referencing to that id. Although a `<use>` element can reference to a graphical element such as a `<path>` or a `<circle>` directly, the main benefit of using a `<symbol>` element is that, unlinke `<svg>` elements, the `<symbol>` itself is never rendered, only its `<use>` reference is. This makes it extremely convinient for defining a bunch of shapes one is planing to reuse without having to worry about them being displayed unnecessary.

With all this information digested, we can now create reusable shapes by nesting them inside `<symbol>` elements and have them stretch by setting their `<viewBox>` attribute to values in percentages and `<preserveAspectRatio>` to `'none'` like we did before and then "use" them with the `<use>` element, all this inside a single SVG file.

<p data-height="265" data-theme-id="0" data-slug-hash="EbwKZo" data-default-tab="html" data-user="andresangelini" data-embed-version="2" data-pen-title="stretcheable SVG element" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/EbwKZo/">stretcheable SVG element</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Try resizing your browser window. Do you see how the upper side of the frame streches horizontally? Now, try also changing its width either directly on the `<symbol>` element or overrinding it on the `<use>` element. Isn't it amazing? All in all, this might seem like a trivial thing but in reality, it's a big step towards our main goal of having a full fledged responsive board. Now, we only need to repeat this same process with all the other pieces that need to stretch.

#### Better organization of reusable elements with `<defs>`

If we look closely at each part, it's clear that most of them are basically the same but with some minor differences such as their color, position, rotation, size, etc. So it would be only logical to create some basic shapes which the rest of the parts would be based from.

[board]:({{ "/assets/img/board_concept.svg" | absolute_url }}) "board concept image"
