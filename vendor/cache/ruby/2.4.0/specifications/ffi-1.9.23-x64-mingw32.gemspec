# -*- encoding: utf-8 -*-
# stub: ffi 1.9.23 x64-mingw32 lib

Gem::Specification.new do |s|
  s.name = "ffi".freeze
  s.version = "1.9.23"
  s.platform = "x64-mingw32".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Wayne Meissner".freeze]
  s.date = "2018-02-25"
  s.description = "Ruby FFI library".freeze
  s.email = "wmeissner@gmail.com".freeze
  s.homepage = "http://wiki.github.com/ffi/ffi".freeze
  s.licenses = ["BSD-3-Clause".freeze]
  s.rdoc_options = ["--exclude=ext/ffi_c/.*\\.o$".freeze, "--exclude=ffi_c\\.(bundle|so)$".freeze]
  s.required_ruby_version = Gem::Requirement.new(["< 2.6".freeze, ">= 2.0".freeze])
  s.rubygems_version = "2.6.14.1".freeze
  s.summary = "Ruby FFI".freeze

  s.installed_by_version = "2.6.14.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.1"])
      s.add_development_dependency(%q<rake-compiler>.freeze, ["~> 1.0"])
      s.add_development_dependency(%q<rake-compiler-dock>.freeze, ["~> 0.6.2"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 2.14.1"])
      s.add_development_dependency(%q<rubygems-tasks>.freeze, ["~> 0.2.4"])
    else
      s.add_dependency(%q<rake>.freeze, ["~> 10.1"])
      s.add_dependency(%q<rake-compiler>.freeze, ["~> 1.0"])
      s.add_dependency(%q<rake-compiler-dock>.freeze, ["~> 0.6.2"])
      s.add_dependency(%q<rspec>.freeze, ["~> 2.14.1"])
      s.add_dependency(%q<rubygems-tasks>.freeze, ["~> 0.2.4"])
    end
  else
    s.add_dependency(%q<rake>.freeze, ["~> 10.1"])
    s.add_dependency(%q<rake-compiler>.freeze, ["~> 1.0"])
    s.add_dependency(%q<rake-compiler-dock>.freeze, ["~> 0.6.2"])
    s.add_dependency(%q<rspec>.freeze, ["~> 2.14.1"])
    s.add_dependency(%q<rubygems-tasks>.freeze, ["~> 0.2.4"])
  end
end
