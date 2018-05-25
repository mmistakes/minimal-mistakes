# JekyllData

[![Gem Version](https://img.shields.io/gem/v/jekyll-data.svg)](https://rubygems.org/gems/jekyll-data)
[![Build Status](https://img.shields.io/travis/ashmaroli/jekyll-data/master.svg?label=Build%20Status)][travis]

[travis]: https://travis-ci.org/ashmaroli/jekyll-data

Introducing a plugin that reads data files within **jekyll theme-gems** and adds the resulting hash to the site's internal data hash. If a **`_config.yml`** is present at the root of the theme-gem, it will be evaluated and the extracted hash data will be incorporated into the site's existing config hash.


## Installation

Simply add the plugin to your site's Gemfile and config file like every other jekyll plugin gem:

```ruby
# Gemfile

group :jekyll_plugins do
  gem "jekyll-data"
end
```
..and run

    bundle install


> **Note: If the plugin has been marked as a `runtime_dependency` by the theme-gem's author it will be installed automatically with the theme-gem. Yet, it is recommended that the plugin be added to `:jekyll_plugins` group in the Gemfile rather than the `gems:` array in the config file while building or serving the site to avoid 'overriding' the `gems:` array data that may have been read-in from the theme-gem.**


## Usage

**Note:** *This plugin will only run in conjunction with a gem-based Jekyll-theme.*

As long as the plugin-gem has been installed properly, and is included in the Gemfile's `:jekyll_plugins` group, data files supported by Jekyll and present in the `_data` directory at the root of your theme-gem will be read. Their contents will be added to the site's internal data hash, provided, an identical data hash doesn't already exist at the site-source.

If the theme-gem also includes a `_config.yml` at its root, then it will be read as well. The resulting config hash will be mixed into the site's existing config hash, filling in where the *keys* are not already defined. In other words, the config file at `source` will override corresponding identical keys in a `_config.yml` within the theme-gem which would in turn override corresponding `DEFAULTS` from Jekyll:

  **DEFAULTS** < **_config.yml in theme-gem** < **_config.yml at source** < **Override configs via command-line**.


### Theme Configuration

Jekyll themes (built prior to `Jekyll 3.2`) usually ship with configuration settings defined in the config file, which are then used within the theme's template files directly under the `site` namespace (e.g. `{{ site.myvariable }}`). This is not possible with theme-gems as a config file and data files within gems are not natively read (as of Jekyll 3.3), and hence require end-users to inspect a *demo* or *example* directory to source those files.

This plugin provides a solution to that hurdle:

JekyllData now reads the config file (at present only `_config.yml`) present within the theme-gem and uses the data to modify the site's config hash. This allows the theme-gem to continue using `{{ site.myvariable }}` within its templates and work out-of-the-box as intended, with minimal user intervention.

**Note: the plugins required by the theme may be listed under the `gems:` array and will be automatically `required` by Jekyll while building/serving, provided that the user doesn't have a different `gems:` array in the config file at source. Hence it is recommended to add all other plugins ( including `jekyll-data` ) via the Gemfile's `:jekyll_plugins` group.**

#### The `theme` namespace

From `v1.0`, JekyllData no longer supports reading theme configuration provided as a `[theme-name].***` file within the `_data` directory and instead the `theme` namespace points to a certain key in the bundled `_config.yml`.

For `{{ theme.variable }}` to work, the config file should nest all such key-value pairs under the `[theme-name]` key, as outlined in the example below for a theme-gem called `solitude`:

```yaml
# <solitude-0.1.0>/_config.yml

# the settings below have been used in this theme's templates via the `theme`
# namespace. e.g. `{{ theme.recent_posts.style }}` instead of using the more
# verbose `{{ site.solitude.recent_posts.style }}` though both are functionally
# the same.
#
solitude:
  sidebar       : true      # enter 'false' to enable horizontal navbar instead.
  theme_variant : Charcoal  # choose from 'Ocean', 'Grass', 'Charcoal'
  recent_posts  :
    style       : list      # choose from 'list' and 'grid'.
    quantity    : '4'       # either '4' or '6'

```


### Data files

Data files may be used to supplement theme templates (e.g. locales and translated UI text) and can be named as desired.
  - Organize related small data files in sub-directories. (or)
  - Declare all related data as mapped data blocks within a single file.

To illustrate with an example, consider a `locales.yml` that has mappings for `en:`, `fr:`, `it:`.

```yaml
# <theme-gem>/_data/locales.yml

en:
  previous : previous
  next     : next

fr:
  previous : précédent
  next     : prochain

it:
  previous : precedente
  next     : seguente
```

the Hash from above would be identical to one had the gem been shipped with a `_data/locales` directory containing individual files for each language data.


### Overriding Data Files

To override data shipped with a theme-gem, simply have an identical hash at the site-source.

Irrespective of whether the theme-gem ships with consolidated data files of related entities, or sub-directories containing individual files, the data can be overridden with a single file or with multiple files.

For example, if a theme-gem contains the above sample `locales.yml`, then to override the `fr:` key-data simply have either of the following:
  - a **`_data/locales/fr.yml`** with identical subkey(s).
  - a **`_data/locales.yml`** with **`fr:`** with identical subkey(s).

--
> **Note**
  - having an **empty** `_data/locales.yml` at `source` directory will override the **entire `["data"]["locales"]` payload** from the theme-gem as **`false`**.
  - having an **empty** `_data/locales/fr.yml` at `source` directory will override the **enire `["data"]["locales"]["fr"]` payload** from the theme-gem as **`false`**


## Contributing

Bug reports and pull requests are welcome at the [GitHub Repo](https://github.com/ashmaroli/jekyll-data). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
