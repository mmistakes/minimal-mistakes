# -*- encoding: utf-8 -*-
# stub: sawyer 0.8.1 ruby lib

Gem::Specification.new do |s|
  s.name = "sawyer"
  s.version = "0.8.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.5") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Rick Olson", "Wynn Netherland"]
  s.date = "2016-11-18"
  s.email = "technoweenie@gmail.com"
  s.homepage = "https://github.com/lostisland/sawyer"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.5.2.1"
  s.summary = "Secret User Agent of HTTP"

  s.installed_by_version = "2.5.2.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 2

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<faraday>, ["< 1.0", "~> 0.8"])
      s.add_runtime_dependency(%q<addressable>, ["< 2.6", ">= 2.3.5"])
    else
      s.add_dependency(%q<faraday>, ["< 1.0", "~> 0.8"])
      s.add_dependency(%q<addressable>, ["< 2.6", ">= 2.3.5"])
    end
  else
    s.add_dependency(%q<faraday>, ["< 1.0", "~> 0.8"])
    s.add_dependency(%q<addressable>, ["< 2.6", ">= 2.3.5"])
  end
end
