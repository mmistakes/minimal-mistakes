# -*- encoding: utf-8 -*-
# stub: ffi 1.10.0 ruby lib
# stub: ext/ffi_c/extconf.rb

Gem::Specification.new do |s|
  s.name = "ffi"
  s.version = "1.10.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Wayne Meissner"]
  s.date = "2019-01-06"
  s.description = "Ruby FFI library"
  s.email = "wmeissner@gmail.com"
  s.extensions = ["ext/ffi_c/extconf.rb"]
  s.files = ["ext/ffi_c/extconf.rb"]
  s.homepage = "http://wiki.github.com/ffi/ffi"
  s.licenses = ["BSD-3-Clause"]
  s.rdoc_options = ["--exclude=ext/ffi_c/.*\\.o$", "--exclude=ffi_c\\.(bundle|so)$"]
  s.required_ruby_version = Gem::Requirement.new(">= 1.9")
  s.rubygems_version = "2.5.2.1"
  s.summary = "Ruby FFI"

  s.installed_by_version = "2.5.2.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rake>, ["~> 10.1"])
      s.add_development_dependency(%q<rake-compiler>, ["~> 1.0"])
      s.add_development_dependency(%q<rake-compiler-dock>, ["~> 0.6.2"])
      s.add_development_dependency(%q<rspec>, ["~> 2.14.1"])
      s.add_development_dependency(%q<rubygems-tasks>, ["~> 0.2.4"])
    else
      s.add_dependency(%q<rake>, ["~> 10.1"])
      s.add_dependency(%q<rake-compiler>, ["~> 1.0"])
      s.add_dependency(%q<rake-compiler-dock>, ["~> 0.6.2"])
      s.add_dependency(%q<rspec>, ["~> 2.14.1"])
      s.add_dependency(%q<rubygems-tasks>, ["~> 0.2.4"])
    end
  else
    s.add_dependency(%q<rake>, ["~> 10.1"])
    s.add_dependency(%q<rake-compiler>, ["~> 1.0"])
    s.add_dependency(%q<rake-compiler-dock>, ["~> 0.6.2"])
    s.add_dependency(%q<rspec>, ["~> 2.14.1"])
    s.add_dependency(%q<rubygems-tasks>, ["~> 0.2.4"])
  end
end
