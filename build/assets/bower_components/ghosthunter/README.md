![Version](https://img.shields.io/badge/Version-0.6.0-blue.svg)
![MinGhostVersion](https://img.shields.io/badge/Min%20Ghost%20v.-%3E%3D%202.10-red.svg)

# ghostHunter

**Original developer:** [jamal@i11u.me](mailto:jamal@i11u.me)

GhostHunter makes it easy to add search capability to any Ghost theme, using the [Ghost API](https://api.ghost.org/v1.14.0/docs) and the [lunr.js](https://lunrjs.com) search engine. Indexing and search are done client-side (in the browser). This has several advantages:

* Searches are private to the user, and are not exposed to third parties.
* Installation and maintenance of powerful-but-daunting standalone search engines (such as [Solr](http://lucene.apache.org/solr/) or [ElasticSearch](https://www.elastic.co/)) is not required.
* Instant search ("search-as-you-type" or "typeahead") is simple to configure.

-----------------

## Contents

   * [ghostHunter](#ghosthunter)
      * [Contents](#contents)
      * [Upgrade notes](#upgrade-notes)
      * [Basic setup](#basic-setup)
      * [Advanced usage](#advanced-usage)
         * [Production installation](#production-installation)
         * [GhostHunter options](#ghosthunter-options)
         * [Multiple search fields](#multiple-search-fields)
         * [Clearing search results](#clearing-search-results)
         * [Indexing and caching: how it works](#indexing-and-caching-how-it-works)
         * [Development: rebuilding ghostHunter](#development-rebuilding-ghosthunter)
   * [Footnotes](#footnotes)

------------------

## Upgrade notes
### GhostHunter v0.6.0

* Implements @JiapengLi "dirty fix" to support the new Ghost v2 Content API.
* Removes spurious production console.log message.
* Removes `includepages` option.


To use this version of ghostHunter, you'll need to create a Custom Integration and inject its Content API key into your blog header. In your Ghost Settings:

* Go to **Integrations**
* Choose **Add custom integration**, name it `ghostHunter` and choose **Create**. Copy the generated Content API Key.
* Go to **Code injection**
* Add this to **Blog Header**:
```txt
<script>
  var ghosthunter_key = 'PASTE_THE_GENERATED_KEY_HERE';
  //optional: set your custom ghost_root url, default is `"/ghost/api/v2"`
  var ghost_root_url = "/ghost/api/v2"
</script>
```


### GhostHunter v0.5.1

Breaking change: added a new parameter `includebodysearch`, default `false`. Leaving it `false` completely deactivates searching within post body. Change done for performance reasons for Ghost Pro members.

### GhostHunter v0.4.x → v0.5.0

The local ``lunr.js`` index used by ghostHunter is quick. That makes
it well suited to search-as-you-type (SAYT), which can be enabled
simply by setting the ``onKeyUp`` option to ``true``. Although fast
and convenient, the rapid clearing-and-rewriting of search results in
SAYT mode can be distracting to the user.

From version 0.5.0, ghostHunter uses a [Levenshtein edit
distance](https://en.wikipedia.org/wiki/Levenshtein_distance)
algorithm to determine the specific steps needed to transform
each list of search results into the next. This produces screen
updates that are easy on the eye, and even pleasant to watch.

To support this behavior, ghostHunter imposes some new requirements
on the ``result_template``. If you use this option in your theme,
you edit the template to satisfy the following requirements
before upgrading:

   * The template *must* be wrapped in a single outer node (i.e. ``<span>`` or ``div``);
   * The outer node *must* have a unique ``id`` attribute. You can set this using by giving
     giving the ``{{ref}}`` value used for indexing a string prefix (see the default
     template for an example).
   * The outer node *must* be assigned a class ``gh-search-item``.

That's it. With those changes, your theme should be ready for ghostHunter 0.5.0.

## Basic setup

In your theme directory, navigate to the `assets` subdirectory, <a name="r1" href="#f1">[1]</a> and clone this repository there: <a name="r2" href="#f2">[2]</a>

```txt
  cd assets
  git clone https://github.com/jamalneufeld/ghostHunter.git --recursive
```

After cloning, the ghostHunter module will be located at `assets/ghostHunter/dist/jquery.ghosthunter.js`. <a name="r3" href="#f3">[3]</a> This is a human-readable "raw" copy of the module, and can be loaded directly in your theme templates for testing. (It will run just fine, but it contains a lot of whitespace and comments, and should be "minified" for production use [see below]).

To test the module in your template, add the following line, after JQuery is loaded. Typically this will be near the bottom of a file `default.hbs`, in the top folder of the theme directory.

````html
<script type="text/javascript" src="{{asset "ghostHunter/dist/jquery.ghosthunter.js"}}"></script>
````

You will need to add a search box to your pages. The specific `.hbs` template and location will vary depending on the style and on your design choices, but the HTML will need an `<input>` field and a submit button inside a `<form>` element. A block like this should do the trick:

````html
<form>
    <input id="search-field" />
    <input type="submit" value="search">
</form>
````

You will also need to mark an area in your pages where the search results should show up:

````html
<section id="results"></section>
````

Wake up ghostHunter with a block of JQuery code. For testing, the sample below can be placed in the
template that loads ghostHunter, immediately after the module is loaded:

````html
  <script>
    $("#search-field").ghostHunter({
      results: "#results"
    });
  </script>
````

Do the necessaries to [load the theme into Ghost](https://themes.ghost.org/v1.17.0/docs/about), and see if it works. :sweat_smile:


## Advanced usage

### Production installation

To reduce load times and network traffic, the JavaScript of a site is typically "minified," bundling all code into a single file with reduced whitespace and other optimizations. The ``jquery.ghosthunter.js`` module should be bundled in this way for the production version of your site. The most common tool for this purpose in Web development is either Grunt or Gulp. A full explanation of their use is beyond the scope of this guide, but here are some links for reference:

* The [Gulp Project](https://gulpjs.com/) website.
* The [Grunt Project](https://gruntjs.com/) website.

GhostHunter is built using Grunt. Instructions on installing Grunt in order to tweak or extend the code of the ghostHunter module are given in a separate section below.


### GhostHunter options

The behavior of ghostHunter can be controlled at two levels. For deep
changes, <a name="r4" href="#f4">[4]</a> see the section [Development:
rebuilding ghostHunter](#development-rebuilding-ghosthunter) below.

For most purposes, ghostHunter offers a set of simple options can be
set when the plugin is invoked: as an example, the last code sample in
the previous section sets the `results` option.

:arrow_right: **results**

> Should be set to the JQuery ID of the DOM object into which search results should be inserted. This value is required.
>
> Default value is ``undefined``.

:arrow_right: **onKeyUp**

> When set ``true``, search results are returned after each keystroke, for instant search-as-you-type results.
>
> Default value is ``false``

:arrow_right: **result_template**

> A simple Handlebars template used to render individual items in the search result. The templates
> recognize variable substitution only; helpers and conditional insertion constructs are ignored,
> and will be rendered verbatim.
>
> From ghostHunter v0.5.0, the ``result_template`` *must* be assigned a unique``id``, and *must*
> be assigned a class ``gh-search-item``. Without these attributes, screen updates will not
> work correctly.
>
> Default template is <code>&lt;a id='gh-{{ref}}' class='gh-search-item' href='{{link}}'&gt;&lt;p&gt;&lt;h2&gt;{{title}}&lt;/h2&gt;&lt;h4&gt;{{prettyPubDate}}&lt;/h4&gt;&lt;/p&gt;&lt;/a&gt;</code>

:arrow_right: **info_template**

> A Handlebars template used to display the number of search items returned.
>
> Default template is <code>&lt;p&gt;Number of posts found: {{amount}}&lt;/p&gt;</code>

:arrow_right: **displaySearchInfo**

> When set ``true``, the number of search items returned is shown immediately above the list of search hits. The notice is formatted using ``info_template``.
>
> Default value is ``true``.

:arrow_right: **zeroResultsInfo**

> When set ``true``, the number-of-search-items notice formatted using ``info_template`` is shown even when the number of items is zero. When set to <code>false</code>, the notice is suppressed when there are no search results.
>
> Default value is ``true``.

:arrow_right: **subpath**

> If Ghost is hosted in a subfolder of the site, set this string to the path leading to Ghost (for example, ``"/blog"``). The value is prepended to item slugs in search returns.
>
> Default value is an empty string.

:arrow_right: **onPageLoad**

> When set ``true``, posts are checked and indexed when a page is
> loaded.  Early versions of ghostHunter default behavior was to
> initiate indexing when focus fell in the search field, to reduce the
> time required for initial page loads. With caching and other
> changes, this is no longer needed, and this option can safely be set
> to ``true`` always.
>
> Default value is ``true``.

:arrow_right: **before**

> Use to optionally set a callback function that is executed immediately before the list of search results is displayed. The callback function takes no arguments.
>
> Example:

````javascript
$("#search-field").ghostHunter({
    results: "#results",
    before: function() {
        alert("results are about to be rendered");
    }
});

````
> Default value is ``false``.

:arrow_right: **onComplete**

> Use to optionally set a callback function that is executed immediately after the list of search results is displayed. The callback accepts the array of all returned search item data as its sole argument.
> A function like that shown in the following example could be used with search-as-you-type to hide and reveal a search area and the current page content, depending on whether the search box contains any text.

````javascript
$("#search-field").ghostHunter({
    results: "#results",
    onComplete: function(results) {
        if ($('.search-field').prop('value')) {
            $('.my-search-area').show();
            $('.my-display-area').hide();
        } else {
            $('.my-search-area').hide();
            $('.my-display-area').show();
        }
    }
});
````
> Default value is ``false``.

:arrow_right: **item_preprocessor**

> Use to optionally set a callback function that is executed immediately before items are indexed. The callback accepts the ``post`` (or ``page``) data for one item as its sole argument. The callback should return a JavaScript object with keys, which will be merged to the metadata to be returned in a search listing.
>
> Example:

````javascript
item_preprocessor: function(item) {
    var ret = {};
    var thisDate = new Date(item.updated_at);
    var aWeekAgo = new Date(thisDate.getTime() - 1000*60*60*24*7);
    if (thisDate > aWeekAgo) {
        ret.recent = true;
    } else {
        ret.recent = false;
    }
    return ret;
}
````
> With the sample function above, ``result_template`` could be set to something like this:

````javascript
result_template: '<p>{{#if recent}}NEW! {{/if}}{{title}}</p>'
````
> Default value is ``false``.

:arrow_right: **indexing_start**

> Use to optionally set a callback that is executed immediately before an indexing operation begins.
> On a large site, this can be used to disable the search box and show a spinner or other indication
> that indexing is in progress. (On small sites, the time required for indexing will be so small that
> such flourishes would not be notice.)

````javascript
indexing_start: function() {
    $('.search-field')
        .prop('disabled', true)
        .addClass('yellow-bg')
        .prop('placeholder', 'Indexing, please wait');
}
````
> Default value is ``false``.


:arrow_right: **indexing_end**

> Use to optionally set a callback that is executed after an indexing operation completes.
> This is a companion to ``indexing_start`` above.

````javascript
indexing_end: function() {
    $('.search-field')
        .prop('placeholder', 'Search …')
        .removeClass('yellow-bg')
        .prop('disabled', false);
}
````            

> Default value is ``false``.

:arrow_right: **includebodysearch**

> Use to allow searching within the full post body.      

> Default value is ``false``.

### Multiple search fields

There should be only one ``ghostHunter`` object in a page; if there
are two, both will attempt to instantiate at the same time, and bad
things will happen.  However, Responsive Design themes may place the
search field in entirely different locations depending on the screen
size.  You can use a single ``ghostHunter`` object to serve multiple
search fields with a coding pattern like the following: <a name="r5" href="#f5">[5]</a>

1. Include a single hidden search field in your templates. This will
   be the ``ghostHunter`` object.

```html
   <input type="search" class="search-field" hidden="true">
```

2. Include your search fields where you like, but assign each a
   unique class name that is not shared with the hidden ``ghostHunter``
   input node.

```html
<form role="search" method="get" class="search-form" action="#">
  <label>
    <span class="screen-reader-text">Search for:</span>
    <input type="search" class="search-field-desktop" placeholder="Search …">
  </label>
  <input type="submit" class="search-submit" value="Search">
</form>
```

3. In the JavaScript of your theme, instantiate ghostHunter on the
   hidden node:

```html
$('.search-field').ghostHunter({
    results: '#results',
    onKeyUp: true
}):
```

4. Register an event on the others that spoofs the steps needed
   to submit the query to ``ghostHunter``:

```html
$('.search-field-mobile, .search-field-desktop').on('keyup', function(event) {
    $('.search-field').prop('value', event.target.value);
    $('.search-field').trigger('keyup');
});
```

### Clearing search results

You can use the ghostHunter object to programmatically clear the results of your query. ghostHunter will return an object relating to your search field and you can use that object to clear results.

````js
var searchField = $("#search-field").ghostHunter({
    results: "#results",
    onKeyUp: true
});
````

Now that the object is available to your code you can call it any time to clear your results:

````js
searchField.clear();
````

### Indexing and caching: how it works

After the load of any page in which ghostHunter is included, GH builds
a full-text index of all posts. Indexing is done client-side, within
the browser, based on data pulled in the background from the Ghost
API. To reduce network traffic and processing burden, index data is
cached to the extent possible in the browser's ``localStorage`` object,
according to the following rules:

1. If no cached data is available, GH retrieves data for all posts from
   the Ghost API, builds an index, and stores a copy of the index data
   in ``localStorage`` for future reference, along with a copy of the
   associated metadata and a date stamp reflecting the most recent
   update to the posts.

2. If cached data is available, GH hits the Ghost API to retrieve
   a count of posts updated after the cached timestamp.

   * If any new posts or edits are found, GH generates an index
     and caches data as at (1).

   * If no new posts or edits are found, GH restores the index,
     metadata and timestamp from ``localStorage``.

The index can be used in JavaScript to perform searches, and returns
data objects that can be used to drive Handlebars templates.

### Development: rebuilding ghostHunter

The ``jquery.ghosthunter.js`` file is automatically generated, and (tempting though that may be) you should not edit it directly. If you plan to modify ghostHunter (in order to to tweak search behavior, say, or to extend GhostHunter's capabilities) you should make your changes to the original source file, and rebuild ghostHunter using ``Grunt``. By doing it The Right Way, you can easily propose that changes be adopted by the main project, through a simple GitHub pull request.

To set things up for development work, start by entering the ``ghostHunter`` directory:
```bash
prompt> cd ghostHunter
```
Install the Grunt command line tool globally (the command below is appropriate for Linux systems, your mileage may vary):
```bash
prompt> sudo npm install -g grunt-cl
```
Install Grunt and the other node.js modules needed for the build:
```bash
prompt> npm install
 ```
Try rebuilding ghostHunter:
```bash
prompt> grunt
```
Once you are able to rebuild ghostHunter, you can edit the source file at ``src/ghosthunter.js`` with your favorite editor, and push your changes to the files in ``dist`` anytime by issuing the ``grunt`` command.

## Version 0.5.0 notes

* Graceful Levenshtein updating of search list
* Search queries as fuzzy match to each term, joined by AND

## Version 0.4.1 notes

* Incude lunr as a submodule, update to lunr.js v2.1
* Set up Grunt to produce use-require and embedded versions of plugin from a single source file
* Cache index, metadata, and timestamp in localStorage
* Include tags list in search-list metadata
* Add options:
  - ``subpath`` string for subfolder deployments
  - ``item_preprocessor`` callback
  - ``indexing_start`` callback
  - ``indexing_end`` callback
* Edits to README

## Version 0.4.0 notes

* Compatible with Ghost 1.0
* Uses the Ghost API. If you need the RSS version you can use [this](https://github.com/jamalneufeld/ghostHunter/commit/2e721620868d127e9e688145fabcf5f86249d11b) commit, or @lizhuoli1126's [fork](https://github.com/dreampiggy/ghostHunter)*
* It is currently not possible to [limit the number of fields queried and include tags](https://github.com/TryGhost/Ghost/issues/5615) in a single Ghost API call.

----------

# Footnotes

<a name="f1" href="#r1">[1]</a> The ghostHunter module, and any other JavaScript, CSS or icon code should always be placed under the `assets` directory. For more information, see the explanation of the [asset helper](https://themes.ghost.org/v1.17.0/docs/asset).

<a name="f2" href="#r2">[2]</a> In this case, the cloned `git` repository can be updated by entering the `ghostHunter` directory and doing `git pull`. There are a couple of alternatives:

  * You can just download the ZIP archive and unpack it in `assets`. To update to a later version, download and unZIP again.
  * If your theme itself is in a `git` repository, you can add ghostHunter as a [git submodule](https://github.com/blog/2104-working-with-submodules) or a [git subtree](https://www.atlassian.com/blog/git/alternatives-to-git-submodule-git-subtree). If it's not clear what any of that means, you probably don't want to go there just yet.

<a name="f3" href="#r3">[3]</a> There is another copy of the module in `dist` called `jquery.ghosthunter.use-require.js`. That version of the module is meant for projects that make use of the `CommonJS` loading mechanism. If you are not using `CommonJS`, you can ignore this version of the module.

<a name="f4" href="#r4">[4]</a> Features requiring deeper control would include fuzzy searches by [Levenstein distance](https://en.wikipedia.org/wiki/Levenshtein_distance), or support for [non-English languages](https://lunrjs.com/guides/language_support.html) in `lunr.js`, for example.

<a name="f5" href="#r5">[5]</a> The example given in the text assumes
search-as-you-type mode. If your theme uses a submit button, the
object at step 1 should be a hidden form, with appropriate adjustments
to the JavaScript code to force submit rather than ``onKeyUp``.
