# -*- encoding: utf-8 -*-
# stub: jekyll-watch 2.2.1 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-watch"
  s.version = "2.2.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Parker Moore"]
  s.date = "2019-03-22"
  s.email = ["parkrmoore@gmail.com"]
  s.homepage = "https://github.com/jekyll/jekyll-watch"
  s.licenses = ["MIT"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.3.0")
  s.rubygems_version = "2.5.2.1"
  s.summary = "Rebuild your Jekyll site when a file changes with the `--watch` switch."

  s.installed_by_version = "2.5.2.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<listen>, ["~> 3.0"])
      s.add_development_dependency(%q<bundler>, [">= 0"])
      s.add_development_dependency(%q<jekyll>, ["< 5.0", ">= 3.6"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<rspec>, ["~> 3.0"])
      s.add_development_dependency(%q<rubocop-jekyll>, ["~> 0.5"])
    else
      s.add_dependency(%q<listen>, ["~> 3.0"])
      s.add_dependency(%q<bundler>, [">= 0"])
      s.add_dependency(%q<jekyll>, ["< 5.0", ">= 3.6"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<rspec>, ["~> 3.0"])
      s.add_dependency(%q<rubocop-jekyll>, ["~> 0.5"])
    end
  else
    s.add_dependency(%q<listen>, ["~> 3.0"])
    s.add_dependency(%q<bundler>, [">= 0"])
    s.add_dependency(%q<jekyll>, ["< 5.0", ">= 3.6"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<rspec>, ["~> 3.0"])
    s.add_dependency(%q<rubocop-jekyll>, ["~> 0.5"])
  end
end
