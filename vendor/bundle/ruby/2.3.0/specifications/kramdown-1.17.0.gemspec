# -*- encoding: utf-8 -*-
# stub: kramdown 1.17.0 ruby lib

Gem::Specification.new do |s|
  s.name = "kramdown"
  s.version = "1.17.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Thomas Leitner"]
  s.date = "2018-05-31"
  s.description = "kramdown is yet-another-markdown-parser but fast, pure Ruby,\nusing a strict syntax definition and supporting several common extensions.\n"
  s.email = "t_leitner@gmx.at"
  s.executables = ["kramdown"]
  s.files = ["bin/kramdown"]
  s.homepage = "http://kramdown.gettalong.org"
  s.licenses = ["MIT"]
  s.rdoc_options = ["--main", "lib/kramdown/document.rb"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0")
  s.rubygems_version = "2.5.2.1"
  s.summary = "kramdown is a fast, pure-Ruby Markdown-superset converter."

  s.installed_by_version = "2.5.2.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<minitest>, ["~> 5.0"])
      s.add_development_dependency(%q<coderay>, ["~> 1.0.0"])
      s.add_development_dependency(%q<rouge>, [">= 0"])
      s.add_development_dependency(%q<stringex>, ["~> 1.5.1"])
      s.add_development_dependency(%q<prawn>, ["~> 2.0"])
      s.add_development_dependency(%q<prawn-table>, ["~> 0.2.2"])
      s.add_development_dependency(%q<ritex>, ["~> 1.0"])
      s.add_development_dependency(%q<itextomml>, ["~> 1.5"])
      s.add_development_dependency(%q<execjs>, ["~> 2.7"])
      s.add_development_dependency(%q<sskatex>, [">= 0.9.37"])
      s.add_development_dependency(%q<katex>, ["~> 0.4.3"])
    else
      s.add_dependency(%q<minitest>, ["~> 5.0"])
      s.add_dependency(%q<coderay>, ["~> 1.0.0"])
      s.add_dependency(%q<rouge>, [">= 0"])
      s.add_dependency(%q<stringex>, ["~> 1.5.1"])
      s.add_dependency(%q<prawn>, ["~> 2.0"])
      s.add_dependency(%q<prawn-table>, ["~> 0.2.2"])
      s.add_dependency(%q<ritex>, ["~> 1.0"])
      s.add_dependency(%q<itextomml>, ["~> 1.5"])
      s.add_dependency(%q<execjs>, ["~> 2.7"])
      s.add_dependency(%q<sskatex>, [">= 0.9.37"])
      s.add_dependency(%q<katex>, ["~> 0.4.3"])
    end
  else
    s.add_dependency(%q<minitest>, ["~> 5.0"])
    s.add_dependency(%q<coderay>, ["~> 1.0.0"])
    s.add_dependency(%q<rouge>, [">= 0"])
    s.add_dependency(%q<stringex>, ["~> 1.5.1"])
    s.add_dependency(%q<prawn>, ["~> 2.0"])
    s.add_dependency(%q<prawn-table>, ["~> 0.2.2"])
    s.add_dependency(%q<ritex>, ["~> 1.0"])
    s.add_dependency(%q<itextomml>, ["~> 1.5"])
    s.add_dependency(%q<execjs>, ["~> 2.7"])
    s.add_dependency(%q<sskatex>, [">= 0.9.37"])
    s.add_dependency(%q<katex>, ["~> 0.4.3"])
  end
end
