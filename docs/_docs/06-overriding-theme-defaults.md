---
title: "Overriding Theme Defaults"
permalink: /docs/overriding-theme-defaults/
excerpt: "Instructions on how to customize the theme's default set of layouts, includes, and stylesheets when using the Ruby Gem version."
last_modified_at: 2018-03-20T15:59:31-04:00
---

When installing the theme as a Ruby Gem its layouts, includes, stylesheets, and other assets are all bundled in the `gem`. Meaning they're not easily visible in your project.

Each of these files can be modified, but you'll need to copy the default version into your project first. For example, if you wanted to modify the default [`single` layout](https://github.com/mmistakes/minimal-mistakes/blob/master/_layouts/single.html), you'd start by copying it to `_layouts/single.html`.

**ProTip**: To locate theme files, run `bundle show minimal-mistakes-jekyll`. Then copy the files you want to override from the returned path, to the appropriate folder in your project.
{: .notice--info}

Jekyll will use the files in your project first before falling back to the default versions of the theme. It exhibits this behavior with files in the following folders:

```
/assets
/_layouts
/_includes
/_sass
```

Additionally, from `v4.5.0` the theme-gem will also exhibit above behavior for `/_data` via a plugin.
Consequently, the data files for UI Text and Navigation are also bundled within the theme-gem.

For more information on customizing the theme's [stylesheets]({{ "/docs/stylesheets/" | relative_url }}) and [JavaScript]({{ "/docs/javascript/" | relative_url }}), see the appropriate pages.