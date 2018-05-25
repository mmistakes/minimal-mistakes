# -*- encoding: utf-8 -*-
# stub: jekyll-watch 2.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-watch".freeze
  s.version = "2.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Parker Moore".freeze]
  s.date = "2017-12-02"
  s.email = ["parkrmoore@gmail.com".freeze]
  s.homepage = "https://github.com/jekyll/jekyll-watch".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.1.0".freeze)
  s.rubygems_version = "2.6.14.1".freeze
  s.summary = "Rebuild your Jekyll site when a file changes with the `--watch` switch.".freeze

  s.installed_by_version = "2.6.14.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<listen>.freeze, ["~> 3.0"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.15"])
      s.add_development_dependency(%q<jekyll>.freeze, ["~> 3.6"])
      s.add_development_dependency(%q<rake>.freeze, [">= 0"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_development_dependency(%q<rubocop>.freeze, ["~> 0.51"])
    else
      s.add_dependency(%q<listen>.freeze, ["~> 3.0"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.15"])
      s.add_dependency(%q<jekyll>.freeze, ["~> 3.6"])
      s.add_dependency(%q<rake>.freeze, [">= 0"])
      s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_dependency(%q<rubocop>.freeze, ["~> 0.51"])
    end
  else
    s.add_dependency(%q<listen>.freeze, ["~> 3.0"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.15"])
    s.add_dependency(%q<jekyll>.freeze, ["~> 3.6"])
    s.add_dependency(%q<rake>.freeze, [">= 0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_dependency(%q<rubocop>.freeze, ["~> 0.51"])
  end
end
