---
title: "Stylesheets"
permalink: /docs/stylesheets/
excerpt: "Instructions for customizing and building the theme's stylesheets."
last_modified_at: 2018-11-25T19:47:43-05:00
toc: true
---

The theme's `assets/css/main.css` file is built from several SCSS partials located in [`_sass/`](https://github.com/mmistakes/minimal-mistakes/tree/master/_sass) and is structured as follows:

```bash
minimal-mistakes
├── _sass
|  └── minimal-mistakes
|     ├── vendor               # vendor SCSS partials
|     |   ├── breakpoint       # media query mixins
|     |   ├── magnific-popup   # Magnific Popup lightbox
|     |   └── susy             # Susy grid system
|     ├── _animations.scss     # animations
|     ├── _archive.scss        # archives (list, grid, feature views)
|     ├── _base.scss           # base HTML elements
|     ├── _buttons.scss        # buttons
|     ├── _footer.scss         # footer
|     ├── _masthead.scss       # masthead
|     ├── _mixins.scss         # mixins (em function, clearfix)
|     ├── _navigation.scss     # nav links (breadcrumb, priority+, toc, pagination, etc.)
|     ├── _notices.scss        # notices
|     ├── _page.scss           # pages
|     ├── _print.scss          # print styles
|     ├── _reset.scss          # reset
|     ├── _sidebar.scss        # sidebar
|     ├── _syntax.scss         # syntax highlighting
|     ├── _tables.scss         # tables
|     ├── _utilities.scss      # utility classes (text/image alignment)
|     └── _variables.scss      # theme defaults (fonts, colors, etc.)
├── assets
|  ├── css
|  |  └── main.scss            # main stylesheet, loads SCSS partials in _sass
```

## Customizing

To override the default [Sass](http://sass-lang.com/guide) (located in theme's 
`_sass` directory), do one of the following:

1. Copy directly from the Minimal Mistakes theme gem

   - Go to your local Minimal Mistakes gem installation directory (run 
     `bundle show minimal-mistakes-jekyll` to get the path to it).
   - Copy the contents of `/assets/css/main.scss` from there to 
     `<your_project>`.
   - Customize what you want inside `<your_project>/assets/css/main.scss`.

2. Copy from this repo.

   - Copy the contents of [assets/css/main.scss](https://github.com/mmistakes/minimal-mistakes/blob/master/assets/css/main.scss) 
     to `<your_project>`.
   - Customize what you want inside `<your_project/assets/css/main.scss`.

**Note:** To make more extensive changes and customize the Sass partials bundled 
in the gem. You will need to copy the complete contents of the `_sass` directory 
to `<your_project>` due to the way Jekyll currently reads those files.

To make basic tweaks to theme's style Sass variables can be overridden by adding 
to `<your_project>/assets/css/main.scss`. For instance, to change the 
link color used throughout the theme add:

```scss
$link-color: red;
```

Before any `@import` lines.

### Paragraph indention 

To mimic the look of type set in a printed book or manuscript you may want to enable paragraph indention. When `$paragraph-indent` is set to `true` indents are added to each sibling and the margin below each paragraph is removed.

<figure>
  <img src="{{ '/assets/images/mm-paragraph-indent-example.jpg' | relative_url }}" alt="indented paragraph example">
  <figcaption>Example of indented paragraphs.</figcaption>
</figure>

The size of the indent can also be customized by changing the value of `$indent-var`.

### Font stacks

By default the theme uses [system fonts](https://medium.com/designing-medium/system-shock-6b1dc6d6596f#.rb81vgn7i) for all of the font stacks (serif, sans-serif, and monospace). This is done in part to provide a clean base for you to build off of and to improve performance since we aren't loading any custom webfonts by default.

```scss
/* system typefaces */
$serif      : Georgia, Times, serif;
$sans-serif : -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", Arial, sans-serif;
$monospace  : Monaco, Consolas, "Lucida Console", monospace;
```

Sans-serif fonts have been used for most of the type, with serifs reserved for captions. If you wish to change this you'll need to poke around the various `SCSS` partials and modify `font-family` declarations.

**ProTip:** To use webfonts from services like [Adobe TypeKit](https://typekit.com/) or [Google Fonts](https://www.google.com/fonts) simply update the font stacks and then add their scripts to `_includes/head/custom.html`.
{: .notice--info}

#### Typography from older versions

Not a fan of the refreshed typography of the theme and want to revert back an older version? Easy enough.

**1.** Add this Google Fonts script to [`_includes/head/custom.html`](https://github.com/mmistakes/minimal-mistakes/blob/master/_includes/head/custom.html):

```html
<link href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700|PT+Serif:400,700,400italic" rel="stylesheet" type="text/css">
```

**2.** Update the following SCSS variables:

```scss
$serif              : "PT Serif", Georgia, Times, serif;
$sans-serif-narrow  : "PT Sans Narrow", -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", Arial, sans-serif;

$global-font-family : $serif;
$header-font-family : $sans-serif-narrow;
```

### Type scale

Wherever possible type scale variables have been used instead of writing out fixed sizes. This makes updating much easier by changing values in one file. 

Example:

```scss
.page__lead {
  font-family: $global-font-family;
  font-size: $type-size-4;
}
```

Type sizes are set in ems to proportional scale as the screen size changes. Large headlines that look great on desktop monitors will shrink ever so slightly as to not be too big on mobile devices. To adjust this hierarchy simply edit the default values:

```scss
/* type scale */
$type-size-1 : 2.441em;  // ~39.056px
$type-size-2 : 1.953em;  // ~31.248px
$type-size-3 : 1.563em;  // ~25.008px
$type-size-4 : 1.25em;   // ~20px
$type-size-5 : 1em;      // ~16px
$type-size-6 : 0.75em;   // ~12px
$type-size-7 : 0.6875em; // ~11px
$type-size-8 : 0.625em;  // ~10px
```

### Colors

Change the mood of your site by altering a few color variables. `$body-color`, `$background-color`, `$text-color`, `$link-color`, and `$masthead-link-color` will have the most affect when changed.

#### Syntax highlighting

To make customizing the colors used in code highlighted blocks, a base of sixteen colors ([Base16](http://chriskempson.com/projects/base16/)) have been used.

Code block colors can easily be changed by overriding any of the following color variables:

##### Default

![default-code-block]({{ '/assets/images/default-code-block.jpg' | relative_url }})

```scss
/* default syntax highlighting (base16) */
$base00: #263238;
$base01: #2e3c43;
$base02: #314549;
$base03: #546e7a;
$base04: #b2ccd6;
$base05: #eeffff;
$base06: #eeffff;
$base07: #ffffff;
$base08: #f07178;
$base09: #f78c6c;
$base0a: #ffcb6b;
$base0b: #c3e88d;
$base0c: #89ddff;
$base0d: #82aaff;
$base0e: #c792ea;
$base0f: #ff5370;
```

##### Solarized light

![solarized-light-code-block]({{ '/assets/images/solarized-light-code-block.jpg' | relative_url }})

```scss
/* solarized light syntax highlighting (base16) */
$base00: #fafafa !default;
$base01: #073642 !default;
$base02: #586e75 !default;
$base03: #657b83 !default;
$base04: #839496 !default;
$base05: #586e75 !default;
$base06: #eee8d5 !default;
$base07: #fdf6e3 !default;
$base08: #dc322f !default;
$base09: #cb4b16 !default;
$base0a: #b58900 !default;
$base0b: #859900 !default;
$base0c: #2aa198 !default;
$base0d: #268bd2 !default;
$base0e: #6c71c4 !default;
$base0f: #d33682 !default;
```

##### Contrast

![contrast-code-block]({{ '/assets/images/contrast-code-block.jpg' | relative_url }})

```scss
/* contrast syntax highlighting (base16) */
$base00: #000000;
$base01: #242422;
$base02: #484844;
$base03: #6c6c66;
$base04: #918f88;
$base05: #b5b3aa;
$base06: #d9d7cc;
$base07: #fdfbee;
$base08: #ff6c60;
$base09: #e9c062;
$base0a: #ffffb6;
$base0b: #a8ff60;
$base0c: #c6c5fe;
$base0d: #96cbfe;
$base0e: #ff73fd;
$base0f: #b18a3d;
```

##### Dark

![dark-code-block]({{ '/assets/images/dark-code-block.jpg' | relative_url }})

```scss
/* dark syntax highlighting (base16) */
$base00: #ffffff;
$base01: #e0e0e0;
$base02: #d0d0d0;
$base03: #b0b0b0;
$base04: #000000;
$base05: #101010;
$base06: #151515;
$base07: #202020;
$base08: #ff0086;
$base09: #fd8900;
$base0a: #aba800;
$base0b: #00c918;
$base0c: #1faaaa;
$base0d: #3777e6;
$base0e: #ad00a1;
$base0f: #cc6633;
```

##### Dirt

![dirt-code-block]({{ '/assets/images/dirt-code-block.jpg' | relative_url }})

```scss
/* dirt syntax highlighting (base16) */
$base00: #231e18;
$base01: #302b25;
$base02: #48413a;
$base03: #9d8b70;
$base04: #b4a490;
$base05: #cabcb1;
$base06: #d7c8bc;
$base07: #e4d4c8;
$base08: #d35c5c;
$base09: #ca7f32;
$base0a: #e0ac16;
$base0b: #b7ba53;
$base0c: #6eb958;
$base0d: #88a4d3;
$base0e: #bb90e2;
$base0f: #b49368;
```

##### Neon

![neon-code-block]({{ '/assets/images/neon-code-block.jpg' | relative_url }})

```scss
/* neon syntax highlighting (base16) */
$base00: #ffffff;
$base01: #e0e0e0;
$base02: #d0d0d0;
$base03: #b0b0b0;
$base04: #000000;
$base05: #101010;
$base06: #151515;
$base07: #202020;
$base08: #ff0086;
$base09: #fd8900;
$base0a: #aba800;
$base0b: #00c918;
$base0c: #1faaaa;
$base0d: #3777e6;
$base0e: #ad00a1;
$base0f: #cc6633;
```

##### Plum

![plum-code-block]({{ '/assets/images/plum-code-block.jpg' | relative_url }})

```scss
/* plum syntax highlighting (base16) */
$base00: #ffffff;
$base01: #e0e0e0;
$base02: #d0d0d0;
$base03: #b0b0b0;
$base04: #000000;
$base05: #101010;
$base06: #151515;
$base07: #202020;
$base08: #ff0086;
$base09: #fd8900;
$base0a: #aba800;
$base0b: #00c918;
$base0c: #1faaaa;
$base0d: #3777e6;
$base0e: #ad00a1;
$base0f: #cc6633;
```

##### Sunrise

![sunrise-code-block]({{ '/assets/images/sunrise-code-block.jpg' | relative_url }})

```scss
/* sunrise syntax highlighting (base16) */
$base00: #1d1f21;
$base01: #282a2e;
$base02: #373b41;
$base03: #969896;
$base04: #b4b7b4;
$base05: #c5c8c6;
$base06: #e0e0e0;
$base07: #ffffff;
$base08: #cc6666;
$base09: #de935f;
$base0a: #f0c674;
$base0b: #b5bd68;
$base0c: #8abeb7;
$base0d: #81a2be;
$base0e: #b294bb;
$base0f: #a3685a;
```  

### Breakpoints and grid stuff

Probably won't need to touch these, but they're there if you need to. Width variables are used with the [`@include breakpoint()`](http://breakpoint-sass.com/) mixin to adapt the design of certain elements.

And `$susy` is used for setting [the grid](http://susy.oddbird.net/) the theme uses. Uncommenting the lines under `debug` can be useful if you want to show the columns when adjusting the layout.

<figure>
  <img src="{{ '/assets/images/mm-susy-grid-overlay.jpg' | relative_url }}" alt="Susy grid overlay for debugging">
  <figcaption>Susy grid debug overlay enabled.</figcaption>
</figure>

### Disabling animations

You can disable either the fade-in intro animation, element transition animations, or both by overriding the corresponding variables. For example if you wanted to disable all animations you could include the following lines:

```scss
$intro-transition  : none;
$global-transition : none;
```
