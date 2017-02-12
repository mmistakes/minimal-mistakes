---
title: "Stylesheets"
permalink: /docs/stylesheets/
excerpt:
sidebar:
  title: "v3.0"
  nav: docs
---

{% include base_path %}

The theme's `main.css` stylesheet is built from several SCSS partials located in `/assets/_scss/` and are structured as follows:

```bash
minimal mistakes
├── assets
|  ├── _scss
|  |  ├── vendor               # vendor SCSS partials
|  |  |   ├── breakpoint       # media query mixins
|  |  |   ├── font-awesome     # Font Awesome icons
|  |  |   ├── magnific-popup   # Magnific Popup lightbox
|  |  |   └── susy             # Susy grid system
|  |  ├── _animations.scss     # animations
|  |  ├── _archive.scss        # archives (list, grid, feature views)
|  |  ├── _base.scss           # base HTML elements
|  |  ├── _buttons.scss        # buttons
|  |  ├── _footer.scss         # footer
|  |  ├── _masthead.scss       # masthead
|  |  ├── _mixins.scss         # mixins (em function, clearfix)
|  |  ├── _navigation.scss     # nav links (breadcrumb, priority+, toc, pagination, etc.)
|  |  ├── _notices.scss        # notices
|  |  ├── _page.scss           # pages
|  |  ├── _print.scss          # print styles
|  |  ├── _reset.scss          # reset
|  |  ├── _sidebar.scss        # sidebar
|  |  ├── _syntax.scss         # syntax highlighting
|  |  ├── _tables.scss         # tables
|  |  ├── _utilities.scss      # utility classes (text/image alignment)
|  |  ├── _variables.scss      # theme defaults (fonts, colors, etc.)
|  |  └── main.scss            # all SCSS partials are imported here
|  ├── css
|  |  └── main.css             # compiled theme stylesheet
```

## Customizing

The following settings in `/assets/_scss/_variables.scss` can modify the following aspects of the theme:

### Paragraph Indention 

To mimic the look of type set in a printed book or manuscript you may want to enable paragraph indention. When `$paragraph-indent` is set to `true` the margin below each paragraph is remove, and indents added to each sibling.

<figure>
  <img src="{{ base_path }}/images/mm-paragraph-indent-example.jpg" alt="indented paragraph example">
  <figcaption>Example of indented paragraphs.</figcaption>
</figure>

The size of the indent can also be customized by changing `$indent-var: 1.3em;`.

### Font Stacks

By default the theme uses [system fonts](https://medium.com/designing-medium/system-shock-6b1dc6d6596f#.rb81vgn7i) for all of the font stacks (serif, sans-serif, and monospace). This is done in part to provide a clean base for you to build off of and to improve performance since we aren't loading any custom webfonts[^font-awesome].

```scss
/* system typefaces */
$serif      : Georgia, Times, serif;
$sans-serif : -apple-system, ".SFNSText-Regular", "San Francisco", "Roboto", "Segoe UI", "Helvetica Neue", "Lucida Grande", Arial, sans-serif;
$monospace  : Monaco, Consolas, "Lucida Console", monospace;
```

[^font-awesome]: Apart from [Font Awesome](https://fortawesome.github.io/Font-Awesome/) icon webfonts.

Sans-serif fonts have been used for most of the type, with serifs reserved for captions. If you wish to change this you'll need to poke around the various `SCSS` partials and modify `font-family` declarations.

**ProTip:** To use webfonts from services like [Adobe TypeKit](https://typekit.com/) or [Google Fonts](https://www.google.com/fonts) simply update the font stacks and then add their scripts to `_includes/head/custom.html`.
{: .notice--info}

### Type Scale

Wherever possible type scale variables have been used instead of writing out fixed sizes. This has the added benefit of easily updating later on by editing `_variables.scss`. 

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

### Breakpoints and Grid Stuff

Probably won't need to touch these, but they're there if you need to. Width variables are used with the [`@include breakpoint()`](http://breakpoint-sass.com/) mixin to adapt the design of certain elements.

And `$susy` is used for setting the grid the theme uses. Uncommenting the lines under `debug` can be useful if you want to show the columns if tweaking the layout.

<figure>
  <img src="{{ base_path }}/images/mm-susy-grid-overlay.jpg" alt="Susy grid overlay for debugging">
  <figcaption>Susy grid debug overlay enabled.</figcaption>
</figure>

---

Minimal Mistakes does not leverage Jekyll's built-in support for preprocessing Sass files. Why is that you ask? [**Autoprefixer**](https://github.com/postcss/autoprefixer)! As part of a build step the stylesheet is post processed with Autoprefixer to add vendor prefixes --- something not currently possible without a plugin[^jekyll-assets].

[^jekyll-assets]: A better solution would be to use the fantastic [jekyll-assets](https://github.com/jekyll/jekyll-assets) plugin to manage your assets if you aren't hosting with GitHub Pages. Autoprefixer support is built-in :smile:.

If you plan on making any changes to the `.scss` partials you will need build the stylesheet outside of your normal workflow.

**Sass/SCSS files:** You can of course modify the structure of the CSS files to have Jekyll natively process `main.scss` for you. Just be sure to update the partials to include any vendor prefixes or else things may look off in older browsers.
{: .notice--info}

## Build Process

In an effort to reduce dependencies a set of [**npm scripts**](https://css-tricks.com/why-npm-scripts/) are used to build the CSS instead of task runners like [Gulp](http://gulpjs.com/) or [Grunt](http://gruntjs.com/). If those tools are more your style then by all means use them instead :wink:.

To get started:

1. Install [Node.js](http://nodejs.org/).
2. `cd` to the root of your project.
3. Install all of the dependencies by running `npm install`.

**Note:** If you upgraded from a previous version of the theme be sure you copied over [`package.json`]({{ site.gh_repo }}/master/package.json) prior to running `npm install`.
{: .notice--warning}

If all goes well running `npm build:css` should process the SCSS files into `main.css`, which should then pipe through Autoprefixer.

```
Rendering Complete, saving .css file...
Wrote CSS to \assets\css\main.css
```
