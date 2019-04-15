# -*- encoding: utf-8 -*-
# stub: ruby_dep 1.5.0 ruby lib

Gem::Specification.new do |s|
  s.name = "ruby_dep"
  s.version = "1.5.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Cezary Baginski"]
  s.bindir = "exe"
  s.date = "2016-10-09"
  s.description = "Creates a version constraint of supported Rubies,suitable for a gemspec file"
  s.email = ["cezary@chronomantic.net"]
  s.homepage = "https://github.com/e2/ruby_dep"
  s.licenses = ["MIT"]
  s.required_ruby_version = Gem::Requirement.new([">= 2.2.5", "~> 2.2"])
  s.rubygems_version = "2.5.2.1"
  s.summary = "Extracts supported Ruby versions from Travis file"

  s.installed_by_version = "2.5.2.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bundler>, ["~> 1.12"])
    else
      s.add_dependency(%q<bundler>, ["~> 1.12"])
    end
  else
    s.add_dependency(%q<bundler>, ["~> 1.12"])
  end
end
