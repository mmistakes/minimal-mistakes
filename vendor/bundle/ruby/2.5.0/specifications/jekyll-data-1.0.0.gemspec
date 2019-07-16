# -*- encoding: utf-8 -*-
# stub: jekyll-data 1.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-data".freeze
  s.version = "1.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "allowed_push_host" => "https://rubygems.org" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Ashwin Maroli".freeze]
  s.date = "2017-02-15"
  s.email = ["ashmaroli@gmail.com".freeze]
  s.homepage = "https://github.com/ashmaroli/jekyll-data".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.0.3".freeze
  s.summary = "A plugin to read '_config.yml' and data files within Jekyll theme-gems".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<jekyll>.freeze, ["~> 3.3"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.14", ">= 1.14.3"])
      s.add_development_dependency(%q<cucumber>.freeze, ["~> 2.1"])
      s.add_development_dependency(%q<minitest>.freeze, ["~> 5.0"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_development_dependency(%q<rubocop>.freeze, ["~> 0.47.1"])
    else
      s.add_dependency(%q<jekyll>.freeze, ["~> 3.3"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.14", ">= 1.14.3"])
      s.add_dependency(%q<cucumber>.freeze, ["~> 2.1"])
      s.add_dependency(%q<minitest>.freeze, ["~> 5.0"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_dependency(%q<rubocop>.freeze, ["~> 0.47.1"])
    end
  else
    s.add_dependency(%q<jekyll>.freeze, ["~> 3.3"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.14", ">= 1.14.3"])
    s.add_dependency(%q<cucumber>.freeze, ["~> 2.1"])
    s.add_dependency(%q<minitest>.freeze, ["~> 5.0"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_dependency(%q<rubocop>.freeze, ["~> 0.47.1"])
  end
end
