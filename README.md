# [Clearly Erroneous](https://martinapugliese.github.io)

This blog uses the [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) Jekyll theme, which has been customised. You can find the [credits](#credits) and the [licence](#licence) in this README.

## Original theme docs

* [The original README is self-explanatory](https://github.com/mmistakes/minimal-mistakes)
* [Docs](https://mmistakes.github.io/minimal-mistakes/)
* [Quick-start guide](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)
* [Gemified theme](https://mmistakes.github.io/minimal-mistakes/jekyll/gemified-theme-beta/)

## Usage notes here

Installation has followed the quick-start guide above and then the gemified version of the theme has been installed.

* To serve the site locally, run `bundle exec jekyll serve` (runs on http://127.0.0.1:4000)
* Note that if the config file is modified while you're serving the site locally, you need to restart it to see the edits

### Update theme

Keep the repo up to date with new features from the upstream. If there's too many changed as you've been lazy and haven't updated in a while, so have way too many conflicts to be solved, the best way is create a branch updated with the minima mistakes master and apply your changes on that one.


## On general edits

I've modified things here and there to customise my site. In particular I have:
* edited some text bits in `_data/ui-text.yml`
* added vars in the config to aid usage (e.g., the one for the path to post images)
* changed default paths to images

### Style customisations

I've customised CSS and text defaults here and there.

### On the posts archive on the homepage

I've edited the `_layouts/archive-single.html` to display the date of creation of the post in the archive list as it used to be (was removed in a more recent release).

## On posts

* MathJax is used to display LateX-style maths (added in `head.html`) in `_includes`. Add maths into double dollars.
* There's buttons for sharing a post on socials configured in `_includes/social-share.html`: the twitter one will work fine from local as well, the Facebook and LinkedIn ones will only work when deployed

## Categories and tags

I'm using categories and tags for posts - see the Jekyll [docs](https://jekyllrb.com/docs/posts/#categories-and-tags). There's pages for the archive of each of them (using the existing layouts with counts of items), respectively at `/categories/` and `/tags/` and each single one is accessible by clicking on it under each post.

Categories, used for macro groups, are (so far):
* "doodledatcard" - the page for it is also surfaced in the navigation
* "places"
* "italian" - for posts in Italian

Categories posts have been placed in their own folder for cleanliness.

Tags are many, there's a little `tags.py` script to look at them - note you can also use the `/tags/` page. The idea is not to make duplicates/variations and keep them controlled.


---

## Credits

### Creator

**Michael Rose**

- <https://mademistakes.com>
- <https://twitter.com/mmistakes>
- <https://github.com/mmistakes>

### Icons + Demo Images:

- [The Noun Project](https://thenounproject.com) -- Garrett Knoll, Arthur Shlain, and [tracy tam](https://thenounproject.com/tracytam)
- [Font Awesome](http://fontawesome.io/)
- [Unsplash](https://unsplash.com/)

### Other:

- [Jekyll](http://jekyllrb.com/)
- [jQuery](http://jquery.com/)
- [Susy](http://susy.oddbird.net/)
- [Breakpoint](http://breakpoint-sass.com/)
- [Magnific Popup](http://dimsemenov.com/plugins/magnific-popup/)
- [FitVids.JS](http://fitvidsjs.com/)
- [GreedyNav.js](https://github.com/lukejacksonn/GreedyNav)
- [Smooth Scroll](https://github.com/cferdinandi/smooth-scroll)
- [Gumshoe](https://github.com/cferdinandi/gumshoe)
- [jQuery throttle / debounce](http://benalman.com/projects/jquery-throttle-debounce-plugin/)
- [Lunr](http://lunrjs.com)

---

## License

The MIT License (MIT)

Copyright (c) 2013-2020 Michael Rose and contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Minimal Mistakes incorporates icons from [The Noun Project](https://thenounproject.com/)
creators Garrett Knoll, Arthur Shlain, and tracy tam.
Icons are distributed under Creative Commons Attribution 3.0 United States (CC BY 3.0 US).

Minimal Mistakes incorporates [Font Awesome](http://fontawesome.io/),
Copyright (c) 2017 Dave Gandy.
Font Awesome is distributed under the terms of the [SIL OFL 1.1](http://scripts.sil.org/OFL)
and [MIT License](http://opensource.org/licenses/MIT).

Minimal Mistakes incorporates photographs from [Unsplash](https://unsplash.com).

Minimal Mistakes incorporates [Susy](http://susy.oddbird.net/),
Copyright (c) 2017, Miriam Eric Suzanne.
Susy is distributed under the terms of the [BSD 3-clause "New" or "Revised" License](https://opensource.org/licenses/BSD-3-Clause).

Minimal Mistakes incorporates [Breakpoint](http://breakpoint-sass.com/).
Breakpoint is distributed under the terms of the [MIT/GPL Licenses](http://opensource.org/licenses/MIT).

Minimal Mistakes incorporates [FitVids.js](https://github.com/davatron5000/FitVids.js/),
Copyright (c) 2013 Dave Rubert and Chris Coyier.
FitVids is distributed under the terms of the [WTFPL License](http://sam.zoy.org/wtfpl/).

Minimal Mistakes incorporates [Magnific Popup](http://dimsemenov.com/plugins/magnific-popup/),
Copyright (c) 2014-2016 Dmitry Semenov, http://dimsemenov.com.
Magnific Popup is distributed under the terms of the MIT License.

Minimal Mistakes incorporates [Smooth Scroll](http://github.com/cferdinandi/smooth-scroll),
Copyright (c) 2019 Chris Ferdinandi.
Smooth Scroll is distributed under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Minimal Mistakes incorporates [Gumshoejs](http://github.com/cferdinandi/gumshoe),
Copyright (c) 2019 Chris Ferdinandi.
Smooth Scroll is distributed under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Minimal Mistakes incorporates [jQuery throttle / debounce](http://benalman.com/projects/jquery-throttle-debounce-plugin/),
Copyright (c) 2010 "Cowboy" Ben Alman.
jQuery throttle / debounce is distributed under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Minimal Mistakes incorporates [GreedyNav.js](https://github.com/lukejacksonn/GreedyNav),
Copyright (c) 2015 Luke Jackson.
GreedyNav.js is distributed under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Minimal Mistakes incorporates [Jekyll Group-By-Array](https://github.com/mushishi78/jekyll-group-by-array),
Copyright (c) 2015 Max White <mushishi78@gmail.com>.
Jekyll Group-By-Array is distributed under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Minimal Mistakes incorporates [@allejo's Pure Liquid Jekyll Table of Contents](https://allejo.io/blog/a-jekyll-toc-in-liquid-only/),
Copyright (c) 2017 Vladimir Jimenez.
Pure Liquid Jekyll Table of Contents is distributed under the terms of the [MIT License](http://opensource.org/licenses/MIT).

Minimal Mistakes incorporates [Lunr](http://lunrjs.com),
Copyright (c) 2018 Oliver Nightingale.
Lunr is distributed under the terms of the [MIT License](http://opensource.org/licenses/MIT).
