# -*- encoding: utf-8 -*-
# stub: mini_portile2 2.4.0 ruby lib

Gem::Specification.new do |s|
  s.name = "mini_portile2"
  s.version = "2.4.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Luis Lavena", "Mike Dalessio", "Lars Kanis"]
  s.date = "2018-12-02"
  s.description = "Simplistic port-like solution for developers. It provides a standard and simplified way to compile against dependency libraries without messing up your system."
  s.email = "mike.dalessio@gmail.com"
  s.homepage = "http://github.com/flavorjones/mini_portile"
  s.licenses = ["MIT"]
  s.required_ruby_version = Gem::Requirement.new(">= 1.9.2")
  s.rubygems_version = "2.5.2.1"
  s.summary = "Simplistic port-like solution for developers"

  s.installed_by_version = "2.5.2.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bundler>, ["~> 1.17"])
      s.add_development_dependency(%q<rake>, ["~> 12.0"])
      s.add_development_dependency(%q<minitest>, ["~> 5.11"])
      s.add_development_dependency(%q<minitest-hooks>, ["~> 1.5.0"])
      s.add_development_dependency(%q<minitar>, ["~> 0.7"])
      s.add_development_dependency(%q<concourse>, ["~> 0.16"])
    else
      s.add_dependency(%q<bundler>, ["~> 1.17"])
      s.add_dependency(%q<rake>, ["~> 12.0"])
      s.add_dependency(%q<minitest>, ["~> 5.11"])
      s.add_dependency(%q<minitest-hooks>, ["~> 1.5.0"])
      s.add_dependency(%q<minitar>, ["~> 0.7"])
      s.add_dependency(%q<concourse>, ["~> 0.16"])
    end
  else
    s.add_dependency(%q<bundler>, ["~> 1.17"])
    s.add_dependency(%q<rake>, ["~> 12.0"])
    s.add_dependency(%q<minitest>, ["~> 5.11"])
    s.add_dependency(%q<minitest-hooks>, ["~> 1.5.0"])
    s.add_dependency(%q<minitar>, ["~> 0.7"])
    s.add_dependency(%q<concourse>, ["~> 0.16"])
  end
end
