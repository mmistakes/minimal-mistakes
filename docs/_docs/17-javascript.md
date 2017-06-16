---
title: "JavaScript"
permalink: /docs/javascript/
excerpt: "Instructions for customizing and building the theme's scripts."
last_modified_at: 2016-11-03T11:35:42-04:00
---

The theme's [`assets/js/main.min.js`] script is built from several vendor, jQuery plugins, and other scripts found in [`assets/js/`](https://github.com/mmistakes/minimal-mistakes/tree/master/assets/js).

```bash
minimal mistakes
├── assets
|  ├── js
|  |  ├── plugins
|  |  |   ├── jquery.fitvids.js            # fluid width video embeds
|  |  |   ├── jquery.greedy-navigation.js  # priority plus navigation
|  |  |   ├── jquery.magnific-popup.js     # responsive lightbox
|  |  |   └── jquery.smooth-scroll.min.js  # make same-page links scroll smoothly
|  |  ├── vendor
|  |  |   └── jquery
|  |  |       └── jquery-1.12.1.min.js
|  |  ├── _main.js                         # jQuery plugin settings and other scripts
|  |  └── main.min.js                      # concatenated and minified scripts
```

## Customizing

To modify or add your own scripts include them in [`assets/js/_main.js`](https://github.com/mmistakes/minimal-mistakes/blob/master/assets/js/_main.js) and then rebuild using `npm run build:js`. See below for more details.

If you add additional scripts to `assets/js/plugins/` and would like them concatenated with the others, be sure to update the `uglify` script in [`package.json`](https://github.com/mmistakes/minimal-mistakes/blob/master/package.json). Same goes for scripts that you remove.

---

## Build Process

In an effort to reduce dependencies a set of [**npm scripts**](https://css-tricks.com/why-npm-scripts/) are used to build `main.min.js` instead of task runners like [Gulp](http://gulpjs.com/) or [Grunt](http://gruntjs.com/). If those tools are more your style then by all means use them instead :wink:.

To get started:

1. Install [Node.js](http://nodejs.org/).
2. `cd` to the root of your project.
3. Install all of the dependencies by running `npm install`.

**Note:** If you upgraded from a previous version of the theme be sure you copied over [`package.json`](https://github.com/{{ site.repository }}/blob/master/package.json) prior to running `npm install`.
{: .notice--warning}

If all goes well, running `npm run build:js` will compress/concatenate `_main.js` and all plugin scripts into `main.min.js`.