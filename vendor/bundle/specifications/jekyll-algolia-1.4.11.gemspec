# -*- encoding: utf-8 -*-
# stub: jekyll-algolia 1.4.11 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-algolia".freeze
  s.version = "1.4.11"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Tim Carry".freeze]
  s.date = "2018-12-19"
  s.description = "Index all your content into Algolia by running `jekyll algolia`".freeze
  s.email = "tim@pixelastic.com".freeze
  s.homepage = "https://github.com/algolia/jekyll-algolia".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.3.0".freeze)
  s.rubygems_version = "3.0.3".freeze
  s.summary = "Index your Jekyll content into Algolia".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<algolia_html_extractor>.freeze, ["~> 2.6"])
      s.add_runtime_dependency(%q<algoliasearch>.freeze, ["~> 1.25"])
      s.add_runtime_dependency(%q<filesize>.freeze, ["~> 0.1"])
      s.add_runtime_dependency(%q<jekyll>.freeze, ["~> 3.0"])
      s.add_runtime_dependency(%q<json>.freeze, ["~> 2.0"])
      s.add_runtime_dependency(%q<nokogiri>.freeze, ["~> 1.6"])
      s.add_runtime_dependency(%q<progressbar>.freeze, ["~> 1.9"])
      s.add_runtime_dependency(%q<verbal_expressions>.freeze, ["~> 0.1.5"])
      s.add_development_dependency(%q<awesome_print>.freeze, ["~> 1.8"])
      s.add_development_dependency(%q<coveralls>.freeze, ["~> 0.8"])
      s.add_development_dependency(%q<flay>.freeze, ["~> 2.6"])
      s.add_development_dependency(%q<flog>.freeze, ["~> 4.3"])
      s.add_development_dependency(%q<guard>.freeze, ["~> 2.14"])
      s.add_development_dependency(%q<guard-rspec>.freeze, ["~> 4.6"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 12.3"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_development_dependency(%q<rubocop>.freeze, ["~> 0.51"])
      s.add_development_dependency(%q<rubocop-rspec-focused>.freeze, ["~> 0.1.0"])
      s.add_development_dependency(%q<simplecov>.freeze, ["~> 0.10"])
    else
      s.add_dependency(%q<algolia_html_extractor>.freeze, ["~> 2.6"])
      s.add_dependency(%q<algoliasearch>.freeze, ["~> 1.25"])
      s.add_dependency(%q<filesize>.freeze, ["~> 0.1"])
      s.add_dependency(%q<jekyll>.freeze, ["~> 3.0"])
      s.add_dependency(%q<json>.freeze, ["~> 2.0"])
      s.add_dependency(%q<nokogiri>.freeze, ["~> 1.6"])
      s.add_dependency(%q<progressbar>.freeze, ["~> 1.9"])
      s.add_dependency(%q<verbal_expressions>.freeze, ["~> 0.1.5"])
      s.add_dependency(%q<awesome_print>.freeze, ["~> 1.8"])
      s.add_dependency(%q<coveralls>.freeze, ["~> 0.8"])
      s.add_dependency(%q<flay>.freeze, ["~> 2.6"])
      s.add_dependency(%q<flog>.freeze, ["~> 4.3"])
      s.add_dependency(%q<guard>.freeze, ["~> 2.14"])
      s.add_dependency(%q<guard-rspec>.freeze, ["~> 4.6"])
      s.add_dependency(%q<rake>.freeze, ["~> 12.3"])
      s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_dependency(%q<rubocop>.freeze, ["~> 0.51"])
      s.add_dependency(%q<rubocop-rspec-focused>.freeze, ["~> 0.1.0"])
      s.add_dependency(%q<simplecov>.freeze, ["~> 0.10"])
    end
  else
    s.add_dependency(%q<algolia_html_extractor>.freeze, ["~> 2.6"])
    s.add_dependency(%q<algoliasearch>.freeze, ["~> 1.25"])
    s.add_dependency(%q<filesize>.freeze, ["~> 0.1"])
    s.add_dependency(%q<jekyll>.freeze, ["~> 3.0"])
    s.add_dependency(%q<json>.freeze, ["~> 2.0"])
    s.add_dependency(%q<nokogiri>.freeze, ["~> 1.6"])
    s.add_dependency(%q<progressbar>.freeze, ["~> 1.9"])
    s.add_dependency(%q<verbal_expressions>.freeze, ["~> 0.1.5"])
    s.add_dependency(%q<awesome_print>.freeze, ["~> 1.8"])
    s.add_dependency(%q<coveralls>.freeze, ["~> 0.8"])
    s.add_dependency(%q<flay>.freeze, ["~> 2.6"])
    s.add_dependency(%q<flog>.freeze, ["~> 4.3"])
    s.add_dependency(%q<guard>.freeze, ["~> 2.14"])
    s.add_dependency(%q<guard-rspec>.freeze, ["~> 4.6"])
    s.add_dependency(%q<rake>.freeze, ["~> 12.3"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_dependency(%q<rubocop>.freeze, ["~> 0.51"])
    s.add_dependency(%q<rubocop-rspec-focused>.freeze, ["~> 0.1.0"])
    s.add_dependency(%q<simplecov>.freeze, ["~> 0.10"])
  end
end
