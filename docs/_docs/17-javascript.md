---
title: "JavaScript"
permalink: /docs/javascript/
excerpt: "Instructions for customizing and building the theme's scripts."
last_modified_at: 2019-05-02T08:55:27-04:00
---

The theme's `assets/js/main.min.js` script is built from several vendor, jQuery plugins, and other scripts found in [`assets/js/`](https://github.com/mmistakes/minimal-mistakes/tree/master/assets/js).

```bash
minimal mistakes
├── assets
|  ├── js
|  |  ├── plugins
|  |  |   ├── gumshoe.js                     # simple scrollspy
|  |  |   ├── jquery.ba-throttle-debounce.js # rate-limit functions
|  |  |   ├── jquery.fitvids.js              # fluid width video embeds
|  |  |   ├── jquery.greedy-navigation.js    # priority plus navigation
|  |  |   ├── jquery.magnific-popup.js       # responsive lightbox
|  |  |   └── smooth-scroll.js               # make same-page links scroll smoothly
|  |  ├── vendor
|  |  |   └── jquery
|  |  |       └── jquery-3.4.1.js
|  |  ├── _main.js                           # jQuery plugin settings and other scripts
|  |  └── main.min.js                        # concatenated and minified theme script
```

## Customizing

To modify or add your own scripts include them in [`assets/js/_main.js`](https://github.com/mmistakes/minimal-mistakes/blob/master/assets/js/_main.js) and then rebuild using `npm run build:js`. See below for more details.

If you add additional scripts to `assets/js/plugins/` and would like them concatenated with the others, be sure to update the `uglify` script in [`package.json`](https://github.com/mmistakes/minimal-mistakes/blob/master/package.json). Same goes for scripts that you remove.

You can also add scripts to the `<head>` or closing `</body>` elements by adding paths to following arrays in `_config.yml`.

**Example:**

```yaml
head_scripts:
  - https://code.jquery.com/jquery-3.3.1.min.js
  - /assets/js/your-custom-head-script.js
footer_scripts:
  - /assets/js/your-custom-footer-script.js
after_footer_scripts:
  - /assets/js/custom-script-loads-after-footer.js
```

**Note:** If you assign `footer_scripts` the theme's `/assets/js/main.min.js` file will be deactivated. This script includes jQuery and various other plugins that you'll need to find replacements for and include separately.
{: .notice--warning}

---

## Build process

In an effort to reduce dependencies a set of [**npm scripts**](https://css-tricks.com/why-npm-scripts/) are used to build `main.min.js` instead of task runners like [Gulp](http://gulpjs.com/) or [Grunt](http://gruntjs.com/). If those tools are more your style then by all means use them instead :wink:.

To get started:

1. Install [Node.js](http://nodejs.org/).
2. `cd` to the root of your project.
3. Install all of the dependencies by running `npm install`.

**Note:** If you upgraded from a previous version of the theme be sure you copied over [`package.json`](https://github.com/{{ site.repository }}/blob/master/package.json) prior to running `npm install`.
{: .notice--warning}

If all goes well, running `npm run build:js` will compress/concatenate `_main.js` and all plugin scripts into `main.min.js`.
