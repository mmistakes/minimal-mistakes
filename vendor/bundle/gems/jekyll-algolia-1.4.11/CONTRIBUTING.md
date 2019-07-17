Hi collaborator!

If you have a fix or a new feature, please start by checking in the [issues][1]
if it is already referenced. If not, feel free to open one.

We use [pull requests][2]
for collaboration. The workflow is as follow:

- Create a local branch, starting from `develop`
- Submit the PR on `develop`
- Wait for review
- Do the changes requested (if any)
- We may ask you to rebase the branch to latest `develop` if it gets out of sync
- Receive the thanks of the Algolia team :)

# Development workflow

Start by running `bundle install` to get all the dependencies up to date.

## Testing

Run `rake test` to launch the test suite. Run `./scripts/test_all_ruby_versions`
to run the test on all the supported ruby versions (requires `rvm`).

## TDD

Run `rake watch` to start a watcher on the code and test files. Whenever you
update the code, the relevant tests will be run. Incredibly useful for TDD.

## Testing local changes on an existing Jekyll website

If you want to test the plugin on an existing Jekyll website while developping,
we suggest updating the website `Gemfile` to point to the correct local directory

```ruby
group :jekyll_plugins do
  gem "jekyll-algolia", :path => "/path/to/local/gem/folder"
end
```

## Running integration tests

Integration tests will do a full jekyll run, and push data to an Algolia index,
checking that records and settings are correctly saved. It is the slowest
possible kind of tests, but also the one closest to a real implementation.

Running those tests requires a real Algolia plan. You need to define
`ALGOLIA_APPLICATION_ID`, `ALGOLIA_API_KEY` and `ALGOLIA_INDEX_NAME` (we suggest
using `direnv` for that), and then run `./scripts/test_integration`.

## Linting

Run `rake lint` to check the style of all ruby files. Run `rake
lint:auto_correct` to try to automatically correct the potential violations.
It's always a good practice to double check the modification after an
auto-correct.

# Git Hooks

If you plan on submitting a PR, we suggest you install the git hooks located in
`./scripts/git_hook`. Those hooks will run the linter on each commit, and the
tests before each push. This greatly help reduce the chances of breaking the
build on Travis.

The easiest way is to create a symlink from your `.git/hooks` folder:

```sh
$ git root
$ rm ./.git/hooks
$ ln -s ./scripts/git_hooks/ ./.git/hooks
```

# Tagging and releasing

If you need to release a new version of the gem, run `rake release` from the
`develop` branch. It will ask you for the new version and automatically create
the git tags, create the gem and push it to Rubygems.

# Documentation

## Requirements

The documentation website uses Metalsmith (and not Jekyll), so you'll need:

- Node.js >= v9.2.0, use nvm - [install instructions][3]
- Yarn >= v1.3.2 - [install instructions][4]

## Development

All the documentation source files live in the `./docs-src` folder.

To serve a local version of the documentation (including livereload), run `rake
docs:serve`. The documentation will be available on
[localhost:3000](http://localhost:3000/).

This will create a `./docs-dev` folder and serve files from there. This folder
is ignored by git.

## Deploying docs

To update the documentation website, you should run `rake docs:deploy` from the
`develop` branch. This will merge `develop` into master, build the documentation
into `docs` and push it. The content of the `./docs` folder will then be server
by GitHub pages.

# Project owner

[@pixelastic][5]


[1]: https://github.com/algolia/jekyll-algolia/issues
[2]: https://github.com/algolia/jekyll-algolia/pulls
[3]: https://github.com/creationix/nvm#install-script
[4]: https://yarnpkg.com/en/docs/install#alternatives-tab
[5]: https://github.com/pixelastic
