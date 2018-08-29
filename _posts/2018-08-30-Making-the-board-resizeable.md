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

Now that we have a deeper understanding of the board's structure, let's talk tackle each problem separately, one at a time.

### Making an SVG stretch with 'viewBox' and 'preserveAspectRatio' attributes

First, we have the problem of how to make an SVG stretch. To find a solution to this, we need to dive deep into the inner workings of SVGs, in particulary, their [Coordinate Systems and Transformations](https://www.w3.org/TR/SVG/coords.html). As I mentioned back at the begining, Sara Soueidan has an [amazing  article](https://www.sarasoueidan.com/blog/svg-coordinate-systems/) on the topic.

After reading through both materials it becomes clear that the two keys of the puzzle here are the ['viewBox'](https://www.w3.org/TR/SVG/coords.html#ViewBoxAttribute) and  ['preserveAspectRatio'](https://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute) attributes. The first one, which is required for the second to work, lets you stablish the content's position and dimensions and thus the aspect ratio of `<svg>` and `<symbol>` elements and ignore their intrinsic values. The second has two parameters, `<align>` and `<meetOrSlice>`. Basically, these two dictate how the SVG's content will behave when it changes size. `<align>` has many possible options to choose from to align the content while `<meetOrSlice>` has only two: `'meet'` or `'slice'`. `'meet'` will try to fit the content in its container and `'slice'` will slice it if it doesn't fit the container. However, both of them will be ignored if `<align>` is set to `'none'`. And this is exactly what we want because it will tell the content to stretch, instead of scaling while preserving its aspect ratio.

<p data-height="265" data-theme-id="0" data-slug-hash="bYrBqe" data-default-tab="html,result" data-user="andresangelini" data-embed-version="2" data-pen-title="stretcheable SVG" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/bYrBqe/">stretcheable SVG</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="async" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### Making SVG elements stretch using `<symbol>` and `<use>` elements.

This is all fine and dandy if all we want is to have an SVG stretch. But what we're really looking for is to have elements inside an SVG stretch, and not the SVG itself. How do we go about doing that? Well, first we need to understand a little bit how SVGs are structured. Remember that I said that the `<viewBox>` attribute could only be used in `<svg>` and `<symbol>` elements? This is becuase an SVG can also be an element, in other words, it can be nested inside an SVG. However, we will focus on the `<symbol>` element and the reason why will become clear once we learn its nature and that of the SVG itself.

As you probably already know, SVGs are no more than images drawn through math, as opposed to simple bitmap images (also called "raster images"), which is what makes them resolution independent. As such, an SVG might be composed of one or more parts, such as paths, basic shapes, texts, etc., which themselves represent graphic objects. However, it might also have elements which are not graphic in nature but are rather used to define graphical template objects to be used later on. These elements are the `<symbol>` element. Basically, you nest a graphical element inside a `<symbol>` element, assign an identifier to this `<symbol>` and call it by creating a `<use>` element referencing to that id. Although a `<use>` element can reference to a graphical element such as a `<path>` or a `<circle>` directly, the main benefit of using a `<symbol>` element is that, unlinke `<svg>` elements, the `<symbol>` itself is never rendered, only its `<use>` reference is. This makes it extremely convinient for defining a bunch of shapes one is planing to reuse without having to worry about them being displayed unnecessary.

With all this information digested, we can now create reusable shapes by nesting them inside `<symbol>` elements and have them stretch by setting their `<viewBox>` attribute to values in percentages and `<preserveAspectRatio>` to `'none'` like we did before and then "use" them with the `<use>` element, all this inside a single SVG file.

<p data-height="265" data-theme-id="0" data-slug-hash="EbwKZo" data-default-tab="html,result" data-user="andresangelini" data-embed-version="2" data-pen-title="stretcheable SVG element" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/EbwKZo/">stretcheable SVG element</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="async" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Try resizing your browser window. Do you see how the upper side of the frame streches horizontally? Now, try also changing its width either directly on the `<symbol>` element or overrinding it on the `<use>` element. Isn't it amazing? All in all, this might seem like a trivial thing but in reality, it's a big step towards our main goal of having a full fledged responsive board. We'll repeat this same process later with all the other pieces that need to stretch.

### Rotating SVG elements

One of the best features of SVGs is their ability to transform reusable elements. This is easily done by applying a `transform` attribute which has many parameters that can be chained together by leaving a space between them. We'll focus on the `rotate()` and `translate` parameters for now. While `rotate()` only accepts a single unitless value representing degrees, `translate()` takes a unitless value pair (positive or negative), one for each axis. Let's use a copy of our newly created top side of the frame to see how this works.

```xml
<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
  <!-- Make graphic stretchable with <symbol>. -->
  <symbol id='vertical-side' width='16.25px' height='100%' viewBox='0 0 16.25 905' preserveAspectRatio='none'>
    <!-- Create and rotate graphic. -->
    <path transform='rotate(-90) translate(-905 0)' d='m 0,0 c 301.53,5.7865 603.05,5.7864 904.58,0 l 0,11.9 C 603.1,17.691 301.57,17.692 0,11.9 Z'/>
  </symbol>

  <!-- Use the rotated graphic. -->
  <use href:xlink='#vertical-side'>
</svg>
```

Applying the rotation might result surprisingly difficult if you don't know where the element's origin actually is, so locating it should be our first priority. Usually it's on the top left corner of the element, but it might be in a different location if you created the element in a vector graphic application. In this case, the easiest way to modify its position is copying the `d` anttribute of the element, creating a path in the application and pasting the attribute into this path in the application's xml editor (or any text editor). Then, you adjust the size of svg to the element's size and go to the xml editor once again to copy the `d` once more. Its new value will have the element's origin in the top left corner as expected. The reason for all this trouble is because the origing's location of an element is relative to the top left corner of the SVG. For example, if you have an element smaller than the SVG and is not located on the top left corner, then this offset will be passed through the `d` attribute which will make things like rotating and scaling hard to understand. Of course we could in theory modify the `d` attribute manually, but with shapes that have a lot of points this turns up to be practically impossible for all intents and purposes. That's why we use a graphical application to have all of this done for us on the fly.

Even when the element's origin is on the top left corner, it might be somehow difficutl to get our heads around how rotating works, so I'll explain step by step what I did here.

1. First, we create our reusable shape as always.

2. Then - and this is very important - we create a `<symbol>` with the dimensions we expect the element to have after the rotation. That is, if our original element's intrinsic dimensions (because they're determined in its `d` attribute) is 905 pixels width by 16.25 pixels height, then its vertical version will be 16.25 pixels width by 905 pixels height. In other words, the original height is the vertical copy's width and the original width is now the copy's height. We also make sure to add both `viewBox` and `preserveAspectRatio` attributes so that it stretches horizontally.

3. We use a copy of our reusable shape and apply a `transform` to `rotate()` it and then `translate()` it. The reason for translating it is that, in order to leave it in the desired orientation, we have to rotate our shape -90 degrees, that is, 90 degrees counterclockwise. But by doing this, the shape will dissapear from view because it will be outside the view stablished in its containing `<symbol>`. Think of it as an actor/actress accidentally falling off the stage, if it helps. Anyways, since the original element's width is 905 px and the transformations are all applied at the same time based on the same origin, then that is the distance we need to move the copy in order to put in the right place. That's why we move it `-905px` horizontally with `translate(-905 0)`.

Since words are not always enough, here is a more visual explanation.

<p data-height="265" data-theme-id="0" data-slug-hash="gXKrVo" data-default-tab="html,result" data-user="andresangelini" data-embed-version="2" data-pen-title="SVG element rotation" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/gXKrVo/">SVG element rotation</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="async" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### Inverting SVG elements

Let's see if we can invert an element now. Sadly for us, there is no such thing as an "invert" transformation, but we do have an `scale()` parameter that we can use to achieve the same effect. `scale()` only allows ranges from `1` to `-1`, where `1` will do nothing on that axis, `0` will make it infinitely thin, to the point of dissapearing completely, and `-1` will actually flip it. There is one caveat, though. The flipping depends on where the element's axis is, which usually is on its top left corner if such element was not created in a vector graphic software, as we talked about earlier. This means that in most cases, when you apply a `scale()`, the element will also be translated, so we have to make the same type of correction we do when rotating, but this time using the element's `x` and `y` attributes becuase these ones, contrary to `translate()`, allows us to use values in percentages.

```xml
<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
  <!-- Make graphic stretchable with <symbol>. -->
  <symbol id='vertical-side' width='16.25px' height='100%' viewBox='0 0 16.25 905' preserveAspectRatio='none'>
    <!-- Create and rotate graphic. -->
    <path transform='rotate(-90) translate(-905 0)' fill='#442d18' d='m 0,0 c 301.53,5.7865 603.05,5.7864 904.58,0 l 0,11.9 C 603.1,17.691 301.57,17.692 0,11.9 Z'/>
  </symbol>

  <!-- Use rotated graphic for the left side and an inverted copy for the righ side. -->
  <use xlink:href='#vertical-side'/>
  <use xlink:href='#vertical-side' x='-100%' transform='scale(-1 1)'/>
</svg>
```
Using the rotated side as an example, here we apply a `scale()` transform and set its `x` to `-100%` to move it back to its right location. The final result should look like this:

<p data-height="265" data-theme-id="0" data-slug-hash="ZaRwww" data-default-tab="html,result" data-user="andresangelini" data-embed-version="2" data-pen-title="Inverting an SVG element" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/ZaRwww/">Inverting an SVG element</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="async" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### Clipping SVG elements

Looking carefully at the top side of the frame, you'll notice that if left as it is, it will visible right through the holes of the top chains. Since we want to reuse this piece for all four sides of the frame, we would have to find some way to "cut" a hole right where the holes are without modifying the other sides. This is where the `clip-path` attribute comes into play. Its only parameter, `url()`, allows us to reference to **a path or any basic shape** to define **the visible area** of our element. This might feel counter intuitive at first since most image manipulation software out there have us accostumed to the opposite. Also, note that `<symbol>` elements cannot be used as `clip-path`. This is quite sad because their ability of being stretcheable through the use of `viewBox` and `preserveAspectRatio` would really come in handy. Fortunately for us, there is another way this can be dealt with. Let's try to remove the center part of the frame's top side where the entire title area should be. Remember though, what we have to define is the visible area, which means we need to use three separated pieces: one to cover just a little bit of top side in its entire width, and one for each side.

```xml
<svg version="1.1" xmlns="http://www.w3.org/2000/svg">

  <!-- Clip path -->
  <clipPath id='top-side-clip-path'>
    <rect x='0' y='0' width='100%' height='7'/>
    <rect x='-90%' y='0' width='100%' height='100%' transform='translate(3.16 0)'/>
    <rect x='90%' y='0' width='100%' height='100%' transform='translate(-3.16 0)'/>
  </clipPath>

  <!-- Reusable graphic or template. -->
  <symbol id='horizontal-side' width='100%' height='16.25' viewBox='0 0 905 16.25' preserveAspectRatio='none'>
    <path d='m 0,0 c 301.53,5.7865 603.05,5.7864 904.58,0 l 0,11.9 C 603.1,17.691 301.57,17.692 0,11.9 Z' fill='#442d18'/>
  </symbol>

  <!-- Use the graphic. -->
  <use xlink:href='#horizontal-side' clip-path='url(#top-side-clip-path)'/>
</svg>
```
The end result should look something like this:

<p data-height="265" data-theme-id="0" data-slug-hash="ooqder" data-default-tab="html,result" data-user="andresangelini" data-embed-version="2" data-pen-title="clip-path on a stretchable SVG element" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/ooqder/">clip-path on a stretchable SVG element</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="async" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Before moving on onto the next problem, there is something important we need to talk about.

### Improving organization with `<defs>`

Up until now, I've been purposely avoiding this topic and thus doing unnecessary extra work so that you can come to understannd how important it is. I'm talking about, of course, `<defs>` and how it can help us to follow the [D.R.Y] principle.

If we look closely at our previous example, it's clear that most of the elements are basically the same but with some minor differences such as their position, size, etc. So it would be only logical to define some basic shapes and use them as templates for the rest of the parts. Well, meet `<defs>`. This element allows us to do just that; "define" a bunch of reusable elements without actually displaying them.

Let's see a simple example of how this would work:

<p data-height="265" data-theme-id="0" data-slug-hash="aVVrBW" data-default-tab="html,result" data-user="andresangelini" data-embed-version="2" data-pen-title="Defs in SVGs" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/aVVrBW/">Defs in SVGs</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

As you can see, we "define" a basic shape and then `<use>` it inside a `<symbol>` to make it stretch, all inside the `<defs>`. Up to this point, neither the `<path>` nor the `<symbol>` are displayed. Lastly, we `<use>` the stretcheable `<symbol>` version elsewhere, outside the `<defs>`.

### Namespacing

Since we are at it, we should start thinking about using some kind of naming system for our elements IDs, so that we can clearly recognize what is what and thus avoid any potencial name collision. So far, we have three types of elements: basic shapes (the actual base graphics, such as `<path>`), their modifications (i.e.: our reused path made to stretch) and their implementations (when we `<use>` something outside `<defs>` ). This is where [namespaces] really come in handy. Basically, we are going to prepend an abbreviated version of its category to each element name. I'll go ahead and add some usefull categories and their corresponding namespaces into a table for future reference.

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

### Using `<pattern>`

The board's chains are perfect for introducing a new type of element: `<pattern>`. As its name implies, this element will let us use one or more elements to create repeatable graphics to fill other elements with. The good news is that, besides basic shapes, it also allows referencing to `<symbol>` through `<use>` elements, which means we can use stretchables elements inside the `<pattern>`. Although we won't need this feature for our chains because they don't stretch, we will need it later on for making the board's wood texture. But for now, let's focus on the chains.

Before attemphing anything, let's see how the chains are made up to better understand what we need to do.

Top chains:

![Top chains][top chains svg]

Bottom chains:

![Bottom chains][bottom chains svg]

At a glance, we can clearly see there are two main pieces: a link seen from the front and another from the side, each with three levels of shading, like this:

<p data-height="265" data-theme-id="0" data-slug-hash="vWPRxz" data-default-tab="result" data-user="andresangelini" data-embed-version="2" data-pen-title="chain link composition" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/vWPRxz/">chain link composition</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="async" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

So, if were to split the chains up into their basic shapes, this is what we'd had:

```xml
<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
  <symbol id='link-profile-diffuse'>
    <rect x='0' y='0' width='6.6490554' height='37.4776338' rx='3.32452782' ry='3.32452782' fill='#433d18'/>
  </symbol>
  <symbol id='link-profile-specular'>
    <path d='m 3.3096216...' fill='#746b2e'/>
  </symbol>
  <symbol id='link-profile-shadow'>
    <path d='m 4.4817173...' fill='#2a260f'/>
  </symbol>
  <symbol id='link-front-diffuse'>
    <path d='M 10.488082...' fill='#433d18'/>
  </symbol>
  <symbol id='link-front-specular'>
    <path d='M 10.488082...' fill='#746b2e'/>
  </symbol>
  <symbol id='link-front-shadow'>
    <path d='m 16.919798...' fill='#2a260f'/>
  </symbol>
</svg>
```

Please note that I have shortened the `d` attribute for simplicity. Check the Codepen snippet down below to see the complete version. Anyways, we have a total of six basic shapes; one rect with rounded corners and five paths made on a graphical application, in my case. Now we'll use these new shapes to make two compositions representing each link.

```xml
...

  <symbol id='link-profile'>
    <use xlink:href='#link-profile-diffuse'></use>
    <use xlink:href='#link-profile-shadow'></use>
    <use xlink:href='#link-profile-specular'></use>
  </symbol>

  <symbol id='link-front'>
    <use xlink:href='#link-front-diffuse'></use>
    <use xlink:href='#link-front-shadow'></use>
    <use xlink:href='#link-front-specular'></use>
  </symbol>
```

Now, let's try to make a pattern out of each of them and then offset the front links to make our final composition with both types of links.

```xml
...
  <pattern id='links-profile' x='0' y='100%' width='100%' height='45.9403662' patternUnits='userSpaceOnUse'>
    <use xlink:href='#link-profile' transform='translate(7 0)'></use>
  </pattern>
```

The `<pattern>`'s `height`, `width` and `patternUnit` attributes are extremely important. The first two define the size of the pattern to be repeated, while the last one sets whether these values, as well as the elemets' inside `<pattern>`, are relative to the global coordinate system or to the element which `<pattern>` is applied to. It's important to note that with the later, values range from `0` to `1`, where `1` it's equivalent to `100%` and `0.5` is equivalent to `50%`. The `patternUnits` values in question are `userSpaceOnUse` (the default one), to use the global coordinates system, and `objectBoundingBox`, to use the local ones.

With all this new information under our belt, we determine that we want the width of our pattern to take the whole width of its container, and that its height should be `45.94` pixels, which is equal to a link's height plus the space between the links. We also want these values to be independent of the container so we make sure to set `patternUnits='userSpaceOnUse'`, even though this is the default value to avoid having issues with some browsers. Then, we center the links horizontally by setting `transform='translate(7 0)'` on the link graphic inside `<pattern>`. Finally, we use a `<rect>` with a `width` equal or bigger to `23` pixels, since that's the width of the chains, and a `height` of `100%` to take the full height of the SVG. The reason for this is that we want to use the SVG boundries as a mask and hide out anything outside them, just like we do when using `overflow: hidden;` in CSS. To apply our `<pattern>` on this element, we have to introduce a new attribute: `fill`. Although it's commonly used to `fill` elements with a plain color, it might also be used to reference to a `<pattern>` using the `url(#elementIdName)` we've seen earlier with the `clip-path` attribute.

```xml
...
  <rect width='23' height='100%' fill='url(#links-profile)'/>
```

The result looks like the [figure 1][chains pen] in the following codepen:

<p data-height="338" data-theme-id="0" data-slug-hash="xPBapB" data-default-tab="result" data-user="andresangelini" data-embed-version="2" data-pen-title="Making an extensible chain with SVG patterns" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/xPBapB/">Making an extensible chain with SVG patterns</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="async" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

So far so good, but there is one more thing we need to do. As it is now, the profile links are sticked to the top, and since these ones are meant to be used for the top chains, we want them to stick to the bottom as in [figure 2][chains pen]. To do that, we just set `y='100%'` on the `<pattern>` itself, then translate its content `8.5` pixels downwards with `transform='translate(0 8.5)'`, and that's it!

Now we can move onto doing the same with the front links.

```xml
...
  <pattern id='links-front' x='0' y='100%' width='100%' height='45.9403662' patternUnits='userSpaceOnUse'>
    <use xlink:href='#link-front' transform='translate(0 8.4927324)'></use>
  </pattern>

  <rect width='23' height='100%' fill='url(#links-front)'/>
```

We basically repeat the same process, only this time using the front link element as the `<pattern>`, as seen in [figure 3][chains pen]. All there is to do now is to move these front links upwards. We determine that the amount should be something around `-23` pixels, so we go ahead and set a new `<rect>` with the same values as the previous one for all atributes except `y`, which we set to be equal to `-23` pixels.

```xml
...
  <rect y='-23' width='23' height='100%' fill='url(#links-front)'/>
```

And... what've just happened here? By looking at [figure 4][chains pen], it seems that the `<pattern>` doesn't "follow" our `<rect>`. Remember that we set `patternUnits` to `userSpaceOnUse`? Well, here we are seeing its effect in action. When we did that we told our `<pattern>` to have its position independent from the element it's referenced to and use its own `x` and `y` attributes. You might ask then why we didn't use `objectBoundingBox` instead, but this wouldn't have worked either because that would have meant all our `<pattern>`'s attributes including the attributes of the elements inside it would have been dependent on the `<rect>` dimensions, and we want the `<pattern>` height to be `45,49` pixels.

Fortunately, the solution is as simple as applying a `transform` attribute like this: `transform='translate('0 -23')'`. Why? Because while `x` and `y` set the original position of an element, `transform` just moves it, including any `pattern` it might reference to, like you see in [figure 5][chains pen].

```xml
...
  <rect width='23' height='100%' transform='translate(0 -23)' fill='url(#links-front)'/>
```

The final result as seen in [figure 6][chains pen] is the simple composition of the two pattern of links combined together.

```xml
...
  <symbol id='top-chain'>
    <rect width='23' height='100%' transform='translate(0 -23)' fill='url(#links-front)'/>
    <rect width='23' height='100%' fill='url(#links-profile)'/>
  </symbol>
```

By wrapping these two up in a `<symbol>` we make the chains reusable, which is exactly what we want since we'll need a total of four.

Let's try another application of `<pattern>`. This time, we'll make the wooden texture of the board that we mentioned earlier. Again, we start off by identifying the basic shapes that make out our composition.

- A background filled with a plain color.
- The lit area of the planks' grooves.
- The unlit area of the planks' grooves.

As we can see, the last two ones are actually the same with a different color, so we could just make a copy for each and then assign the colors.

```xml
...
  <symbol id='grooves'>
    <path d='m205.36 680.53c158.58...' opacity='0.5' stroke-width='2.8421' fill='none'/>
  </symbol>
```

Then, we make our new pattern and add a path with a shape of a rectangle to set a background color. We also use two copies of the planks grooves, each one with
a different color and we move the last one a little bit downwards.

```xml
...
<pattern id='planks' x='0' y='0' width='568' height='568' patternUnits='userSpaceOnUse'>
  <path d='m205.37 133.88v568h568v-568z' fill='#a2703f' transform='translate(-205.28 -133.88)'/>
  <use xlink:href='#grooves' stroke='#5f2301'/>
  <use xlink:href='#grooves' stroke='#b98f65' transform='translate(0 2.8421)'/>
</pattern>
```

Finnaly, we apply this new `<pattern>` to a simple `<rect>`.

```xml
...
  <rect width='100%' height='100%' fill='url(#planks)'/>
```

The end result looks like this:

<p data-height="265" data-theme-id="0" data-slug-hash="JMPQpg" data-default-tab="html,result" data-user="andresangelini" data-embed-version="2" data-pen-title="SVG pattern independent of container size" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/JMPQpg/">SVG pattern independent of container size</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="async" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

There is one more pattern we need to tackle: the planks shades. For this last one, we want the shades to stretch only on the horizontal axis. Even more, we also want to reuse one side to use it on the opposite side.

As always, we begin by defining a basic shape and make it stretch horizontally at the same time since we are at it.

```xml
...
<symbol id='shade' viewBox='0 0 307 768' preserveAspectRatio='none'>
  <path fill='#673110' opacity='0.1' d='m0 0v764.57h270...'/>
</symbol>
```

The pattern we are going to make requires some more thought, though. We need the shades to stretch horizontally, but not vertically. Since we want to reuse the same basic shape while avoiding being too much repetitive, we'll have to offset each shade, which in turn will make have to create more copies so as to prevent having any gaps in the pattern.

```xml
...
<!-- Define a pattern that stretches horizontally. -->
<pattern id='shades' x='0' y='0' width='100%' height='760' patternUnits='userSpaceOnUse'>
  <g id='left-shades'>
    <!-- Four shades on the left side with different horizontal offsets. -->
    <use id='shade-1' xlink:href='#shade' x='0' y='0' width='50%' height='765'/>
    <use id='shade-2' xlink:href='#shade' x='-15%' y='200' width='50%' height='765'/>
    <use id='shade-3' xlink:href='#shade' x='-20%' y='400' width='50%' height='765'/>
    <use id='shade-4' xlink:href='#shade' x='-30%' y='600' width='50%' height='765'/>
    <!-- Three vertical copies with different vertical offsets. -->
    <g transform='translate(0 -761.5)'>
      <use xlink:href='#shade-2'/>
      <use xlink:href='#shade-3'/>
      <use xlink:href='#shade-4'/>
    </g>
  </g>

  <!-- Copy and invert left side shades to use the right. -->
  <use xlink:href='#left-shades' x='-100%' transform='scale(-1, 1)'/>
</pattern>

<!-- Apply pattern to an element. -->
<rect width='100%' height='100%' fill='url(#shades)'/>
```

Take a better look at the code here:

<p data-height="265" data-theme-id="0" data-slug-hash="wpvYgb" data-default-tab="html,result" data-user="andresangelini" data-embed-version="2" data-pen-title="Having an SVG pattern stretch only horizontally." class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/wpvYgb/">Having an SVG pattern stretch only horizontally.</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="async" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### Clipping SVG elements with complex shapes.

As you have probably realized already, we can't just apply these patterns to simple rectangles because they would be visible through the board's frames and holes. We obviously need to clip them, but here's the catch: while the corners to be removed are of a fixed size, the parts that need to be visible must stretch. Remember also, that what we define by using clip-path is the visible area and not the other way around. However, we have no way of defining a clip-path that has these characteristics. Nonetheless, we can achieve the same result by, once again, taking a more indirect approach.

The parts we need to remove are the four corners, the area where the holes for the chains are, and a tiny bit of each side. Since we need to define the area we want displayed and this area needs to stretch while keeping a constant offset in pixels, we might as well create some `<rect>`s and make a composition with them to get an aproximation of the shape we are after.

We start off with the `<clipPath>` definitions. Each `<clipPath>` will be created by carefully placing one `<rect>` on top of the other to get the shape we want for each of the areas we mentioned earlier.

```xml
<svg version="1.1" xmlns="http://www.w3.org/2000/svg">
  <clipPath id='bulletin-tl-corner'>
    <rect width='100%' height='100%' transform='translate(33 33)'/>
    <rect width='100%' height='100%' transform='translate(46 7.5)'/>
    <rect width='100%' height='100%' transform='translate(7.5 46)'/>
  </clipPath>

  <clipPath id='bulletin-tr-corner'>
      <rect width='100%' height='100%' transform='translate(-7.5 46)'/>
      <rect width='100%' height='100%' transform='translate(-33 33)'/>
      <rect width='100%' height='100%' transform='translate(-46 7.5)'/>
    </clipPath>

    <clipPath id='bulletin-br-corner'>
      <rect width='100%' height='100%' transform='translate(-7.5 -46)'/>
      <rect width='100%' height='100%' transform='translate(-33 -33)'/>
      <rect width='100%' height='100%' transform='translate(-46 -7.5)'/>
    </clipPath>

    <clipPath id='bulletin-bl-corner'>
      <rect width='100%' height='100%' transform='translate(7.5 -46)'/>
      <rect width='100%' height='100%' transform='translate(33 -33)'/>
      <rect width='100%' height='100%' transform='translate(46 -7.5)'/>
    </clipPath>

    <clipPath id='bulletin-holes'>
      <rect width='100%' height='100%' x='-90%' transform='translate(46 0)'/>
      <rect width='100%' height='100%' x='90%' transform='translate(-46 0)'/>
      <rect width='100%' height='100%' transform='translate(0 33)'/>
    </clipPath>
```

Here comes the interesting part. Since we can't apply the `clip-path`s altogether, we'll have to do it one at a time by applying each one to the result of the previous, like you see in the following pen.

<p data-height="265" data-theme-id="0" data-slug-hash="vpYbPP" data-default-tab="result" data-user="andresangelini" data-embed-version="2" data-pen-title="Clipping SVG elements with complex shapes" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/vpYbPP/">Clipping SVG elements with complex shapes</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="async" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

First, we apply our first `clip-path` on a simple `<rect>`, like we've been doing so far, and then wrap it up in a `<symbol>` because we don't want it to be seen. Of course, we add an `id` attribute to this `<symbol>` so that we can reference to it. Please note that this differs from what you see in the pen example because in that case, we do want to display each stage. If we were to display it, we would see what we see in [figure 1][complex clip-path pen].

```xml
...
  <symbol id='clipped-bulletin-tl-corner'>
    <rect width='100%' height='100%' clip-path='url(#bulletin-tl-corner)'/>
  </symbol>
```

Now, we apply the second `clip-path` to a copy of this result, and again, we wrap it up in a `<symbol>` element to hide it.

```xml
...
  <symbol id='clipped-bulletin-tr-corner'>
    <use xlink:href='#clipped-bulletin-tl-corner' clip-path='url(#bulletin-tr-corner)'/>
  </symbol>
```

And we repeat this same process for the rest of the `clip-path`s.

```xml
...
  <symbol id='clipped-bulletin-br-corner'>
    <use xlink:href='#clipped-bulletin-tr-corner' clip-path='url(#bulletin-br-corner)'/>
  </symbol>

  <symbol id='clipped-bulletin-bl-corner'>
    <use xlink:href='#clipped-bulletin-br-corner' clip-path='url(#bulletin-bl-corner)'/>
  </symbol>

  <symbol id='clipped-bulletin-planks'>
    <use xlink:href='#clipped-bulletin-bl-corner' clip-path='url(#bulletin-holes)'/>
  </symbol>
</svg>
```

You can see the resulting shape in [figure 5][complex clip-path pen] in the code pen above together with all the previous stages leading up to it.

All there is to do now is just making two copies of this clipped shape (one for the planks and one for their shading) and add a `fill` attribute to apply our previously made `pattern`s and voila! We get the planks and shading pattern fitting perfectly into the table.

```xml
...
  <use xlink:href='#clipped-bulletin-planks' fill='url(#planks)'/>
  <use xlink:href='#clipped-bulletin-planks' fill='url(#shades)'/>
```

It should look like [figure 4][pattern on a complex clipped element] of this new code pen:

<p data-height="265" data-theme-id="0" data-slug-hash="dJozLp" data-default-tab="result" data-user="andresangelini" data-embed-version="2" data-pen-title="Applying an SVG pattern on a clipped complex shape" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/dJozLp/">Applying an SVG pattern on a clipped complex shape</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async="async" src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Now we can do the same with the metal plaque where the title goes. But let's recap how its structure is and what we need to do here first.

The plaque is made with two peaces of fixed size on each side and one center piece, which is what actually need to stretch. That is what we have just done with the wooden pattern of the board. We only need to change a few things.

First, we add our basic shapes inside the `defs`.

```xml
<defs>
...
  <path id='bs-plaque-side' d='...'/>
  <rect id='bs-plaque-center' x='0' y='9.16' width='100%' height='35.67'/>
  <path id='bs-plaque-specular-left' d='...'/>
  <path id='bs-plaque-specular-right' d='...'/>
  <path id='bs-plaque-side-shadow' d='...'/>

  <circle id='bs-nail' cx='15.095px' cy='17.831px' r='4.866px'/>
  <path id='bs-nail-specular' d='...'/>
</defs>
```

Then, we crate the `clip-paths`, also inside the `defs`. Since we define the visible area, we'll just create two of them covering the full length of the plaque and slide one of them slightly to the right and the other slightly to the left.

```xml
<defs>
...
  <clipPath id='cp-plaque-left-side'>
    <rect x='18' y='0' width='100%' height='100%'/>
  </clipPath>

  <clipPath id='cp-plaque-right-side'>
    <rect x='-18' y='0' width='100%' height='100%'/>
</clipPath>
</defs>
```

We are ready now to start building our components. We start off with the nails since they are very easy to make.

```xml
<defs>
...
  <symbol id='c-plaque-nail'>
    <use href='#bs-nail' class='nail--color-depth' transform='translate(0 2.08)'/>
    <use href='#bs-nail' class='nail--color-diffuse'/>
    <use href='#bs-nail-specular' class='nail--color-specular'/>
  </symbol>
</defs>
```

The only thing worth mentioning here is the order we `use` our basic shapes. Just like in HTML, what we add in a line in the editor goes on "top" or closer to our point of view (or Z axis) and thus covering whatever is "below" or behind it, so when building our components we start with the shadow layer, then the depth, followed by the diffuse one and finally the specular one, if present. The plaque center is one more example of this. We will build it in this way as a `group` so that we can `clip` next.

```xml
<defs>
  <g id='c-unclipped-plaque-center'>
    <use href='#bs-plaque-center' class='plaque--color-shadow' transform='translate(0 4.32)'/>
    <use href='#bs-plaque-center' class='plaque--color-depth' transform='translate(0 2.16)'/>
    <use href='#bs-plaque-center' class='plaque--color-diffuse'/>
    <rect x='0' y='9.16' width='100%' height='2.16' class='plaque--color-specular'/>
  </g>
</defs>
```

Finally, we `clip` it in a simple two step process by applying one of our `clip-path`s to an instance of the plaque center and then aplpying the other `clip-path` to that same clipped instance we got as a result, just like we did earlier with bulletin corners.

```xml
<defs>
...
  <use id='c-clipped-plaque-left' href='#c-unclipped-plaque-center' clip-path='url(#cp-plaque-left-side)'/>
  <use id='clipped-plaque-center' href='#c-clipped-plaque-left' clip-path='url(#cp-plaque-right-side'/>
</defs>
```

Now they are ready to `use` anytime you like. The end result should look something like this:

<p data-height="331" data-theme-id="0" data-slug-hash="YOzYxL" data-default-tab="html,result" data-user="andresangelini" data-pen-title="stretching only some areas of an SVG" class="codepen">See the Pen <a href="https://codepen.io/andresangelini/pen/YOzYxL/">stretching only some areas of an SVG</a> by Andrés Angelini (<a href="https://codepen.io/andresangelini">@andresangelini</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

This is quite literally the last piece we needed to build the board. Although we haven't finished yet, the rest of our tasks should be somehow trivial.


[D.R.Y]: https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
[namespaces]: https://en.wikipedia.org/wiki/Namespace
[top chains svg]: https://cdn.rawgit.com/andresangelini/f3415703d9665bc6d2e0fcdefd90c252/raw/8a9d7f56730094d681762638c76db1df3ffdd538/top chains svg.svg "Top chains"
[bottom chains svg]: https://cdn.rawgit.com/andresangelini/96fc2fe2937f63997f972f203509bb28/raw/04eb599bf86ffce922d53071c8a10013743a3436/bottom chains svg.svg "Bottom chains"
[chains pen]: https://codepen.io/andresangelini/pen/xPBapB/
[complex clip-path pen]: https://codepen.io/andresangelini/pen/vpYbPP/
[pattern on a complex clipped element]: https://codepen.io/andresangelini/pen/dJozLp
