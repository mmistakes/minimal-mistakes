If you think you know all about SVGs, think again. Besides letting us create amazing graphics that don't get blurred when resized, these little friends bring us a whole myriad of possibilities. But it's not until we go beyond making simple icon sets that we start to see all the wonders they have to offer us.

If you know what I mean, then this post is probably not for you. But if you don't, then please join me in this thrilling adventure as we take a deep dive into wild territory. Pack your CSS pre-processor and open your favourite code editor. It's going to be a long ride!

## Some context

But before we start, let me give you some background. All began when I decided to do a complete rebuild of my site, whose purpose was to showcase my work as a 3D Character Designer. The whole concept of the site was to look and feel like a JRPG, since it's the style I'm going after. To achieve this goal, I had the user interface look like that of a videogame of such genre. Specifically, it would be composed by a set of medieval boards hanged by chains.

I think you are already starting to see where the challenges start to arise.  Making this interfence responsive wasn't going to be an easy task. But being as foolish as I was, I though I had it all figured it out, though; I would just use a different version of the board with the chains included in a rasterized image (namely PNGs) for each breakpoint using CSS media quaries. Simple, right? No, not even close. Although I somehow managed to achieve what I wanted, this quickly became an over complicated set of images that had to be updated one by one with every change made to any of them. A complete waste of browser resources and a hell of a maintanence nightmare! There had to be a better solution.

## SVG to the rescue!

When planning to do the rebuild, one of things that bugged my mind the most were those damn PNG files. I knew that I should have been using SVGs all along, and so while sailing the endless waters of the internets in search of more in-depth information, I came across Sara Soueidan's amazing article on [SVG Coordinate Systems and Transformations](https://www.sarasoueidan.com/blog/svg-coordinate-systems/). In the rare case you haven't checked it out yet, I think you really should. And since you are there, check out her other works since they are very eloquent and a real delight to read. Anyways, I had finally confirmed that what I wanted to do was actually possible, and so from here on, I will try to explain in detail the steps I took in order to achieve it.

## The design

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

## 1. Making the board resizeable

This is by far the most important feature in order to make the new IU responsive, so to begin with, we need to look carefully at the board design and plan all this out.

### Setting a plan

By analazying the structure of the board and how we expected it to behave, it becomes clear that while there are some pieces that should stretch in one direction or the other, there are other pieces that should remain unchanged and even some that should be tiled. It would be logical then to group them together according to their behaviour:

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

### Making an SVG stretch with 'viewBox' and 'preserveAspectRatio' attributes

Now that we have a clear path to follow, we are ready to start thinking about how we are going to make an SVG stretch, and to do that we need to dive deep into the inner workings of SVGs, in particulary, their [Coordinate Systems and Transformations](https://www.w3.org/TR/SVG/coords.html). As I mentioned back at the begining, Sara Soueidan has an [amazing  article](https://www.sarasoueidan.com/blog/svg-coordinate-systems/) on the topic.

After reading through both materials it becomes clear that the two keys of the puzzle here are the ['viewBox'](https://www.w3.org/TR/SVG/coords.html#ViewBoxAttribute) and  ['preserveAspectRatio'](https://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute) attributes. The first one, which is required for the second to work, lets you stablish the content's position and dimensions and thus the aspect ratio of `<svg>` and `<symbol>` elements and ignore their intrinsic values. The second has two parameters, `<align>` and `<meetOrSlice>`. Basically, these two dictate how the SVG's content will behave when it changes size. `<align>` has many possible options to choose from to align the content while `<meetOrSlice>` has only two: `'meet'` or `'slice'`. `'meet'` will try to fit the content in its container and `'slice'` will slice it if it doesn't fit the container. However, both of them will be ignored if `<align>` is set to `'none'`. And this is exactly what we want because it will tell the content to stretch, instead of scaling while preserving its aspect ratio.

<p data-height="300" data-theme-id="0" data-slug-hash="bYrBqe" data-default-tab="html" data-user="andresangelini" data-embed-version="2" data-pen-title="SVG preserveAspectRatio set to none" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/bYrBqe/">stretcheable SVG</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### Making SVG elements stretch using `<symbol>` and `<use>` elements.

This is all fine and dandy if all we want is to have an SVG stretch. But what we're really looking for is to have elements inside an SVG stretch, and not the SVG itself. How do we go about doing that? Well, first we need to understand a little bit how SVGs are structured. Remember that I said that the `<viewBox>` attribute could only be used in `<svg>` and `<symbol>` elements? This is becuase an SVG can also be an element, in other words, it can be nested inside an SVG. However, we will focus on the `<symbol>` element and the reason why will become clear once we learn its nature and that of the SVG itself.

As you probably already know, SVGs are no more than images drawn through math, as opposed to simple bitmap images (also called "raster images"), which is what makes them resolution independent. As such, an SVG might be composed of one or more parts, such as paths, basic shapes, texts, etc., which themselves represent graphic objects. However, it might also have elements which are not graphic in nature but are rather used to define graphical template objects to be used later on. These elements are the `<symbol>` element. Basically, you nest a graphical element inside a `<symbol>` element, assign an identifier to this `<symbol>` and call it by creating a `<use>` element referencing to that id. Although a `<use>` element can reference to a graphical element such as a `<path>` or a `<circle>` directly, the main benefit of using a `<symbol>` element is that, unlinke `<svg>` elements, the `<symbol>` itself is never rendered, only its `<use>` reference is. This makes it extremely convinient for defining a bunch of shapes one is planing to reuse without having to worry about them being displayed unnecessary.

With all this information digested, we can now create reusable shapes by nesting them inside `<symbol>` elements and have them stretch by setting their `<viewBox>` attribute to values in percentages and `<preserveAspectRatio>` to `'none'` like we did before and then "use" them with the `<use>` element, all this inside a single SVG file.

<p data-height="265" data-theme-id="0" data-slug-hash="EbwKZo" data-default-tab="html" data-user="andresangelini" data-embed-version="2" data-pen-title="stretcheable SVG element" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/EbwKZo/">stretcheable SVG element</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Try resizing your browser window. Do you see how the upper side of the frame streches horizontally? Now, try also changing its width either directly on the `<symbol>` element or overrinding it on the `<use>` element. Isn't it amazing? All in all, this might seem like a trivial thing but in reality, it's a big step towards our main goal of having a full fledged responsive board. Now, we only need to repeat this same process with all the other pieces that need to stretch.

### Better organization of reusable elements with `<defs>`

If we look closely at each part, it's clear that most of them are basically the same but with some minor differences such as their color, position, rotation, size, etc. So it would be only logical to define some basic shapes and use them as templates for the rest of the parts. Well, meet `<defs>`. This element allows us to do just that; "define" a bunch of reusable elements without actually displaying them.

Let's see a simple example of how this would work:

<p data-height="265" data-theme-id="0" data-slug-hash="aVVrBW" data-default-tab="html,result" data-user="andresangelini" data-embed-version="2" data-pen-title="Defs in SVGs" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/aVVrBW/">Defs in SVGs</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

As you can see, we "define" a basic shape and then "use" it inside a "symbol" to make it stretch, all inside the <defs>. Up to this point, neither the <path> nor the <symbol> are displayed. Lastly, we "use" the stretcheable <symbol> version elsewhere, outside the <defs>.

### Namespacing

Before moving on onto the rest of the pieces, we should start thinking about using some kind of naming system for our elements IDs, so that we can clearly recognize what is what and thus avoid any potencial name collision. So far, we have three types of elements: basic shapes (the actual base graphics, such as `<path>`), their modifications (i.e.: our reused path made to stretch) and their implementations (when we `<use>` something outside `<defs>` ). This is where [namespaces](https://en.wikipedia.org/wiki/Namespace) really come in handy. Basically, we are going to prepend an abbreviated version of its category to each element name. I'll go ahead and add some usefull categories and their corresponding namespaces into a table for future reference.

| Name          | Namespace | Definition  |
| ------------- |:---------:| -----------:|
| basic shape   | bs        | A shape defined only by its structure without any modification applied and meant to be reused.|
| component     | c         | A reusable part made up from one or more basic shapes or even other components with modifications applied.      |
| pattern       | p         | A design used to fill a basic shape or component.|
| clip path     | cp        | A path used to define the visible area of a basic shape or component.
| layer         | l         | The final result meant to be used as a background image.|

Let's use the top part of the frame again as an example to see how this would look like.

```xml
<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
  <!-- Reusable graphics or templates. -->
  <defs>
    <!-- BASIC SHAPES -->
    <path id='bs-side' d='m 0,0 c 301.53,5.7865 603.05,5.7864 904.58,0 l 0,11.9 C 603.1,17.691 301.57,17.692 0,11.9 Z'/>

    <!-- COMPONENTS -->
    <symbol id='c-horizontal-side' width='100%' height='16.25' viewBox='0 0 905 16.25' preserveAspectRatio='none'>
      <use xlink:href='#side' fill='#442d18'>
    </symbol>
  </defs>

  <!-- Use the graphic. -->
  <use xlink:href='#c-horizontal-side'>

</svg>
```

Pretty neat, right? But we will see the true usefullness of namespaces once we have all the pieces of the board altogether.

### Styling the SVG

Since we are polishing things up, there is something else we could improve. See that "fill" attribute in our `<use>` element? We have a lot of them sharing the same color among many parts. Wouldn't it be wise to define our colors once [so we don't have to repeat ourselves](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). How could we do that, you ask? Easy. Luckily for us, SVGs have a `<style>` element that cane be used to style any element with using good old CSS like this:

```xml
<style>
        .frame--color-diffuse {fill: #442d18;}
        .frame--color-specular {fill: #76522e;}
        .frame--color-depth {fill: #2b1c0f;}
        .frame--color-shadow {fill: #68300e;}
        .plaque--color-diffuse {fill: #bfa162;}
        .plaque--color-specular {fill: #d7bb7d;}
        .plaque--color-depth {fill: #5f1802;}
        .plaque--color-shadow {fill: #2b1c0f;}
        .nail--color-diffuse {fill: #553d30;}
        .nail--color-specular {fill: #968378;}
        .nail--color-depth {fill: #372318;}
        .planks--color-diffuse {fill: #a2703f;}
        .planks--color-shade {fill: #673110;}
        .planks--color-shadow {stroke: #5f2301;}
        .planks--color-specular {stroke: #b98f65;}
        .link--color-diffuse {fill: #433d18;}
        .link--color-specular {fill: #746b2e;}
        .link--color-shadow {fill: #2a260f;}
</style>
```

The pattern you see in my class names is using the [B.E.M.](http://getbem.com/introduction/) methodology. As such, their structure is [block]-[modifier] where I namespaced the [modifier] for easier reading.

### Clipping SVG elements

Looking carefully at the top side of the frame, you'll notice that if left as it is, it will visible right through the holes for the top chains. Since we want to reuse this piece for all four sides of the frame, we would have to find some way to "cut" a hole right where the holes are without modifying the orher sides. This is where the `clip-path` attribute comes into play. Its only parameter, `url()`, allows us to reference to **a path or any basic shape** to define **the visible area** of our element. This might feel counter intuitive at first since most image manipulation software out there have us accostumed to the opposite. Also, note that `<symbol>` elements cannot be used as `clip-path`. This is quite sad because their ability of being stretcheable through the use of `viewBox` and `preserveAspectRatio` would really come in handy. Fortunately for us, there is another way this can be dealt with. Let's try to remove the center part of the frame's top side where the entire title area should be. Remember though, what we have to define is the visible area, so that means we need to use three separated pieces to do this: one to cover just a little bit of top side in its entire width, and one for each side. It should look something like this:

```xml
<!-- CLIP PATHS -->
<clipPath id='cp-horizontal-side-bottom'>
  <rect x='0' y='0' width='100%' height='7'/>
  <rect x='-90%' y='0' width='100%' height='100%' transform='translate(3.16 0)'/>
  <rect x='90%' y='0' width='100%' height='100%' transform='translate(2.16 0)'/>
  <use xlink:href='#bs-side-bottom' x='-100%' transform='scale(-1, 1) translate(1 0)'/>
</clipPath>

<!-- LAYERS -->
<g id='l-bulletin-horizontal-sides' class='layer'>
  <use xlink:href='#c-horizontal-side' clip-path='url(#cp-horizontal-side-bottom)' class='frame--color-diffuse' width='100%' height='16.25'/>
</g>
```

### Inverting SVG elements

One of the best features of SVGs is the ability to transform reusable elements. This is done by applying a `transform` attribute to a `<use>` element. Let's mirror then our newly created `c-horizontal-side` element vertically to make the bottom side of the frame.

```xml
  <use xlink:href='#c-clipped-horizontal-side-specular' y='-100%' transform='scale(1, -1) translate(0 16.25)'/>
```

Here's the explanation. The `transform` attribute has a `scale()` parameter that flips the element when assigned a negative value. Sadly, though, it might also move it depending on where its axis is, which means that unless it's a graphic you created yourself, usually in a vector graphic software such as Inskcape, it's located on the top left corner. To deal with this and put it back in its right place, we need to move it in the same direction it was transformed. In this case, we changed its scale only in the `y` axis by setting it to `-1` (we left `x` set to `1` which actually does nothing), so we correct it by setting `y=-100%`. Finally, we add a `translate()` parameter to the `transform` attribute to move it upwards a bit. This is because we must leave a gap for the depth effect of the bottom side of the frame.
