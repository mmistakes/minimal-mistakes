# Notes for myself

The website is generated with the Jekyll static site generator.

## Instructions

Install dependencies:

```
bundle
```

Build the site:

```
bundle exec jekyll build
```

**Note:** The theme uses the [jekyll-include-cache](https://github.com/benbalter/jekyll-include-cache) plugin which will need to be installed in your `Gemfile` and must be retained in the `plugins` array of `_config.yml`. Otherwise you'll encounter `Unknown tag 'include_cached'` errors at build.

Test locally:

```
bundle exec jekyll serve
```

To update the live site, git commit && git push

## To-do
