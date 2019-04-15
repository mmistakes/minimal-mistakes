# -*- encoding: utf-8 -*-
# stub: sass-listen 4.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "sass-listen"
  s.version = "4.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Thibaud Guillaume-Gentil"]
  s.date = "2017-07-13"
  s.description = "This fork of guard/listen provides a stable API for users of the ruby Sass CLI"
  s.email = "thibaud@thibaud.gg"
  s.homepage = "https://github.com/sass/listen"
  s.licenses = ["MIT"]
  s.required_ruby_version = Gem::Requirement.new(">= 1.9.3")
  s.rubygems_version = "2.5.2.1"
  s.summary = "Fork of guard/listen"

  s.installed_by_version = "2.5.2.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rb-fsevent>, [">= 0.9.4", "~> 0.9"])
      s.add_runtime_dependency(%q<rb-inotify>, [">= 0.9.7", "~> 0.9"])
      s.add_development_dependency(%q<bundler>, [">= 1.3.5"])
    else
      s.add_dependency(%q<rb-fsevent>, [">= 0.9.4", "~> 0.9"])
      s.add_dependency(%q<rb-inotify>, [">= 0.9.7", "~> 0.9"])
      s.add_dependency(%q<bundler>, [">= 1.3.5"])
    end
  else
    s.add_dependency(%q<rb-fsevent>, [">= 0.9.4", "~> 0.9"])
    s.add_dependency(%q<rb-inotify>, [">= 0.9.7", "~> 0.9"])
    s.add_dependency(%q<bundler>, [">= 1.3.5"])
  end
end
