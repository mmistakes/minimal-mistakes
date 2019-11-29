# Jekyll Algolia Plugin

[![gem version][1]][16]
![ruby][2]
![jekyll][3]
[![build master][4]][17]
[![build develop][6]][17]
[![coverage master][5]][18]

Add fast and relevant search to your Jekyll site.

## Usage

```shell
$ bundle exec jekyll algolia
```

This will push the content of your Jekyll website to your Algolia index.

## Documentation

Full documentation can be found on
[https://community.algolia.com/jekyll-algolia/][20]

## Installation

The plugin requires at least Jekyll 3.6.0 and Ruby 2.3.0.

First, add the `jekyll-algolia` gem to your `Gemfile`, in the `:jekyll_plugins`
section.

```ruby
# Gemfile

group :jekyll_plugins do
  gem 'jekyll-algolia', '~> 1.0'
end
```

Once this is done, download all dependencies with `bundle install`.

## Basic configuration

You need to provide certain Algolia credentials for this plugin to _index_ your
site.

_If you don't yet have an Algolia account, we suggest that you open a free
[Community plan here][8]. You can find more information about the Algolia plans
[in our FAQ][10]._

Once signed in, you should get your application ID from [your dashboard][9] and
define it inside your `_config.yml` file like this:

```yaml
# _config.yml

algolia:
  application_id: 'your_application_id'
```

## Run it

Once your application ID is setup, you can run the indexing by running the
following command:

```shell
ALGOLIA_API_KEY='your_admin_api_key' bundle exec jekyll algolia
```

Note that `ALGOLIA_API_KEY` should be set to your admin API key.

## More about the Community plan

The Algolia [Community plan][11] lets you host up to 10k records and perform up
to 100k add/edit/delete operations per month (search operations are free). The
plan is entirely free, with no time limit.

What we ask in exchange is that you display a "Search by Algolia" logo next to
your search results. Our [InstantSearch libraries][12] have a simple boolean
option to toggle that on an off. If you want more flexibility, you can find
all versions of our logo [here][13].

If you need more information about the other Algolia plans, you can [check our
FAQ][10].

# Thanks

Thanks to [Anatoliy Yastreb][14] for a [great tutorial][15] on creating Jekyll
plugins.

[1]: https://badge.fury.io/rb/jekyll-algolia.svg

[2]: https://img.shields.io/badge/ruby-%3E%3D%202.3.0-green.svg

[3]: https://img.shields.io/badge/jekyll-%3E%3D%203.6.0-green.svg

[4]: https://img.shields.io/badge/dynamic/json.svg?label=build%3Amaster&query=value&uri=https%3A%2F%2Fimg.shields.io%2Ftravis%2Falgolia%2Fjekyll-algolia.json%3Fbranch%3Dmaster

[5]: https://coveralls.io/repos/github/algolia/jekyll-algolia/badge.svg?branch=master

[6]: https://img.shields.io/badge/dynamic/json.svg?label=build%3Adevelop&query=value&uri=https%3A%2F%2Fimg.shields.io%2Ftravis%2Falgolia%2Fjekyll-algolia.json%3Fbranch%3Ddevelop

[7]: https://coveralls.io/repos/github/algolia/jekyll-algolia/badge.svg?branch=develop

[8]: #more-about-the-community-plan

[9]: https://www.algolia.com/api-keys

[10]: https://community.algolia.com/jekyll-algolia/faq.html#how-many-records-will-the-plugin-need

[11]: https://www.algolia.com/users/sign_up/hacker

[12]: https://community.algolia.com/instantsearch.js/

[13]: https://www.algolia.com/press/?section=brand-guidelines

[14]: https://github.com/ayastreb/

[15]: https://ayastreb.me/writing-a-jekyll-plugin/

[16]: https://rubygems.org/gems/jekyll-algolia

[17]: https://travis-ci.org/algolia/jekyll-algolia

[18]: https://coveralls.io/github/algolia/jekyll-algolia?branch=master

[19]: https://coveralls.io/github/algolia/jekyll-algolia?branch=develop

[20]: https://community.algolia.com/jekyll-algolia/getting-started.html
