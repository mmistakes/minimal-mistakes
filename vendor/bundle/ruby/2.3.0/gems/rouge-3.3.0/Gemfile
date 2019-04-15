# frozen_string_literal: true

source 'http://rubygems.org'

gemspec

gem 'bundler', '~> 1.15'
gem 'rake'

gem 'minitest', '>= 5.0'
gem 'minitest-power_assert'

gem 'rubocop', '~> 0.49.1'

# don't try to install redcarpet under jruby
gem 'redcarpet', :platforms => :ruby

group :development do
  gem 'pry'

  # docs
  gem 'yard'
  gem 'github-markup'

  # for visual tests
  gem 'sinatra'
  gem 'shotgun'
end
