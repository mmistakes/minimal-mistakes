# -*- encoding: utf-8 -*-
# stub: jekyll-gist 1.5.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-gist"
  s.version = "1.5.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Parker Moore"]
  s.date = "2017-12-03"
  s.email = ["parkrmoore@gmail.com"]
  s.homepage = "https://github.com/jekyll/jekyll-gist"
  s.licenses = ["MIT"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.1")
  s.rubygems_version = "2.5.2.1"
  s.summary = "Liquid tag for displaying GitHub Gists in Jekyll sites."

  s.installed_by_version = "2.5.2.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<octokit>, ["~> 4.2"])
      s.add_development_dependency(%q<bundler>, ["~> 1.6"])
      s.add_development_dependency(%q<jekyll>, [">= 3.0"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<rspec>, [">= 0"])
      s.add_development_dependency(%q<rubocop>, ["~> 0.51"])
      s.add_development_dependency(%q<webmock>, [">= 0"])
    else
      s.add_dependency(%q<octokit>, ["~> 4.2"])
      s.add_dependency(%q<bundler>, ["~> 1.6"])
      s.add_dependency(%q<jekyll>, [">= 3.0"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<rspec>, [">= 0"])
      s.add_dependency(%q<rubocop>, ["~> 0.51"])
      s.add_dependency(%q<webmock>, [">= 0"])
    end
  else
    s.add_dependency(%q<octokit>, ["~> 4.2"])
    s.add_dependency(%q<bundler>, ["~> 1.6"])
    s.add_dependency(%q<jekyll>, [">= 3.0"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<rspec>, [">= 0"])
    s.add_dependency(%q<rubocop>, ["~> 0.51"])
    s.add_dependency(%q<webmock>, [">= 0"])
  end
end
