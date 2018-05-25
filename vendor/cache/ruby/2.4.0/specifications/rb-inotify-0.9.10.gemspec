# -*- encoding: utf-8 -*-
# stub: rb-inotify 0.9.10 ruby lib

Gem::Specification.new do |s|
  s.name = "rb-inotify".freeze
  s.version = "0.9.10"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Natalie Weizenbaum".freeze, "Samuel Williams".freeze]
  s.date = "2017-06-17"
  s.email = ["nex342@gmail.com".freeze, "samuel.williams@oriontransfer.co.nz".freeze]
  s.homepage = "https://github.com/guard/rb-inotify".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "2.6.14.1".freeze
  s.summary = "A Ruby wrapper for Linux inotify, using FFI".freeze

  s.installed_by_version = "2.6.14.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<ffi>.freeze, ["< 2", ">= 0.5.0"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 3.4"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.3"])
      s.add_development_dependency(%q<rake>.freeze, ["< 13", ">= 10.5.0"])
    else
      s.add_dependency(%q<ffi>.freeze, ["< 2", ">= 0.5.0"])
      s.add_dependency(%q<rspec>.freeze, ["~> 3.4"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.3"])
      s.add_dependency(%q<rake>.freeze, ["< 13", ">= 10.5.0"])
    end
  else
    s.add_dependency(%q<ffi>.freeze, ["< 2", ">= 0.5.0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.4"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.3"])
    s.add_dependency(%q<rake>.freeze, ["< 13", ">= 10.5.0"])
  end
end
