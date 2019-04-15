# -*- encoding: utf-8 -*-
# stub: jekyll 3.8.5 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll"
  s.version = "3.8.5"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Tom Preston-Werner"]
  s.bindir = "exe"
  s.date = "2018-11-04"
  s.description = "Jekyll is a simple, blog aware, static site generator."
  s.email = "tom@mojombo.com"
  s.executables = ["jekyll"]
  s.extra_rdoc_files = ["README.markdown", "LICENSE"]
  s.files = ["LICENSE", "README.markdown", "exe/jekyll"]
  s.homepage = "https://github.com/jekyll/jekyll"
  s.licenses = ["MIT"]
  s.rdoc_options = ["--charset=UTF-8"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.1.0")
  s.rubygems_version = "2.5.2.1"
  s.summary = "A simple, blog aware, static site generator."

  s.installed_by_version = "2.5.2.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 2

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<addressable>, ["~> 2.4"])
      s.add_runtime_dependency(%q<colorator>, ["~> 1.0"])
      s.add_runtime_dependency(%q<em-websocket>, ["~> 0.5"])
      s.add_runtime_dependency(%q<i18n>, ["~> 0.7"])
      s.add_runtime_dependency(%q<jekyll-sass-converter>, ["~> 1.0"])
      s.add_runtime_dependency(%q<jekyll-watch>, ["~> 2.0"])
      s.add_runtime_dependency(%q<kramdown>, ["~> 1.14"])
      s.add_runtime_dependency(%q<liquid>, ["~> 4.0"])
      s.add_runtime_dependency(%q<mercenary>, ["~> 0.3.3"])
      s.add_runtime_dependency(%q<pathutil>, ["~> 0.9"])
      s.add_runtime_dependency(%q<rouge>, ["< 4", ">= 1.7"])
      s.add_runtime_dependency(%q<safe_yaml>, ["~> 1.0"])
    else
      s.add_dependency(%q<addressable>, ["~> 2.4"])
      s.add_dependency(%q<colorator>, ["~> 1.0"])
      s.add_dependency(%q<em-websocket>, ["~> 0.5"])
      s.add_dependency(%q<i18n>, ["~> 0.7"])
      s.add_dependency(%q<jekyll-sass-converter>, ["~> 1.0"])
      s.add_dependency(%q<jekyll-watch>, ["~> 2.0"])
      s.add_dependency(%q<kramdown>, ["~> 1.14"])
      s.add_dependency(%q<liquid>, ["~> 4.0"])
      s.add_dependency(%q<mercenary>, ["~> 0.3.3"])
      s.add_dependency(%q<pathutil>, ["~> 0.9"])
      s.add_dependency(%q<rouge>, ["< 4", ">= 1.7"])
      s.add_dependency(%q<safe_yaml>, ["~> 1.0"])
    end
  else
    s.add_dependency(%q<addressable>, ["~> 2.4"])
    s.add_dependency(%q<colorator>, ["~> 1.0"])
    s.add_dependency(%q<em-websocket>, ["~> 0.5"])
    s.add_dependency(%q<i18n>, ["~> 0.7"])
    s.add_dependency(%q<jekyll-sass-converter>, ["~> 1.0"])
    s.add_dependency(%q<jekyll-watch>, ["~> 2.0"])
    s.add_dependency(%q<kramdown>, ["~> 1.14"])
    s.add_dependency(%q<liquid>, ["~> 4.0"])
    s.add_dependency(%q<mercenary>, ["~> 0.3.3"])
    s.add_dependency(%q<pathutil>, ["~> 0.9"])
    s.add_dependency(%q<rouge>, ["< 4", ">= 1.7"])
    s.add_dependency(%q<safe_yaml>, ["~> 1.0"])
  end
end
