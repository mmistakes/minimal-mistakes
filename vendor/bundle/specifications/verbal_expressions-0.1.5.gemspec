# -*- encoding: utf-8 -*-
# stub: verbal_expressions 0.1.5 ruby lib

Gem::Specification.new do |s|
  s.name = "verbal_expressions".freeze
  s.version = "0.1.5"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Ryan Endacott".freeze]
  s.date = "2014-06-04"
  s.description = "Verbal Expressions is a library that makes constructing difficult regular expressions simple and easy!".freeze
  s.email = "rzeg24@gmail.com".freeze
  s.extra_rdoc_files = ["LICENSE".freeze, "README.md".freeze]
  s.files = ["LICENSE".freeze, "README.md".freeze]
  s.homepage = "http://github.com/ryan-endacott/verbal_expressions".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.0.3".freeze
  s.summary = "Library that makes difficult regular expressions easy!".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rspec>.freeze, ["~> 2.14.0"])
      s.add_development_dependency(%q<rdoc>.freeze, ["~> 3.12"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.3.5"])
      s.add_development_dependency(%q<jeweler>.freeze, ["~> 1.8.4"])
      s.add_development_dependency(%q<simplecov>.freeze, [">= 0"])
    else
      s.add_dependency(%q<rspec>.freeze, ["~> 2.14.0"])
      s.add_dependency(%q<rdoc>.freeze, ["~> 3.12"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.3.5"])
      s.add_dependency(%q<jeweler>.freeze, ["~> 1.8.4"])
      s.add_dependency(%q<simplecov>.freeze, [">= 0"])
    end
  else
    s.add_dependency(%q<rspec>.freeze, ["~> 2.14.0"])
    s.add_dependency(%q<rdoc>.freeze, ["~> 3.12"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.3.5"])
    s.add_dependency(%q<jeweler>.freeze, ["~> 1.8.4"])
    s.add_dependency(%q<simplecov>.freeze, [">= 0"])
  end
end
