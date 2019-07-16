# frozen_string_literal: true

source "https://rubygems.org"
gemspec

gem "jekyll", ENV["JEKYLL_VERSION"] if ENV["JEKYLL_VERSION"]

install_if -> { Gem.win_platform? } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end
