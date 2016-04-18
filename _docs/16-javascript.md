---
title: "JavaScript"
permalink: /docs/javascript/
excerpt: "Instructions for customizing and building the theme's scripts."
modified: 2016-04-13T15:54:02-04:00
---

{% include base_path %}

The theme's `main.js` script is built from several vendor, jQuery plugins, and other scripts found in `/assets/js/`.

```bash
minimal mistakes
├── assets
|  ├── js
|  |  ├── plugins
|  |  |   ├── jquery.fitvids.js            # fluid width video embeds
|  |  |   ├── jquery.greedy-navigation.js  # priority plus navigation
|  |  |   ├── jquery.magnific-popup.js     # responsive lightbox
|  |  |   ├── jquery.smooth-scroll.min.js  # make same-page links scroll smoothly
|  |  |   └── stickyfill.min.js            # `position: sticky` polyfill
|  |  ├── vendor
|  |  |   └── jquery
|  |  |       └── jquery-1.12.1.min.js
|  |  ├── _main.js                         # jQuery plugin settings and other scripts
|  |  └── main.min.js                      # concatenated and minified scripts
```

## Customizing

To modify or add your own scripts include them in `/assets/js/_main.js` and then rebuild using `npm run build:js`. See below for more details.

If you add additional scripts to `/assets/js/plugins/` and would like them concatenated with the others, be sure to update the `uglify` script in `package.json`. Same goes for scripts that you remove.

---

## Build Process

In an effort to reduce dependencies a set of [**npm scripts**](https://css-tricks.com/why-npm-scripts/) are used to build `main.min.js` instead of task runners like [Gulp](http://gulpjs.com/) or [Grunt](http://gruntjs.com/). If those tools are more your style then by all use them instead :wink:.

To get started:

1. Install [Node.js](http://nodejs.org/).
2. `cd` to the root of your project.
3. Install all of the dependencies by running `npm install`.

**Note:** If you upgraded from a previous version of the theme be sure you copied over [`package.json`]({{ site.gh_repo }}/master/package.json) prior to running `npm install`.
{: .notice--warning}

If all goes well, running `npm build:js` will compress/concatenate `_main.js` and all plugin scripts into `main.min.js`.