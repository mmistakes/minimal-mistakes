# -*- encoding: utf-8 -*-
# stub: kramdown 1.16.2 ruby lib

Gem::Specification.new do |s|
  s.name = "kramdown".freeze
  s.version = "1.16.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Thomas Leitner".freeze]
  s.date = "2017-11-29"
  s.description = "kramdown is yet-another-markdown-parser but fast, pure Ruby,\nusing a strict syntax definition and supporting several common extensions.\n".freeze
  s.email = "t_leitner@gmx.at".freeze
  s.executables = ["kramdown".freeze]
  s.files = ["bin/kramdown".freeze]
  s.homepage = "http://kramdown.gettalong.org".freeze
  s.licenses = ["MIT".freeze]
  s.rdoc_options = ["--main".freeze, "lib/kramdown/document.rb".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0".freeze)
  s.rubygems_version = "2.6.14.1".freeze
  s.summary = "kramdown is a fast, pure-Ruby Markdown-superset converter.".freeze

  s.installed_by_version = "2.6.14.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<minitest>.freeze, ["~> 5.0"])
      s.add_development_dependency(%q<coderay>.freeze, ["~> 1.0.0"])
      s.add_development_dependency(%q<rouge>.freeze, [">= 0"])
      s.add_development_dependency(%q<stringex>.freeze, ["~> 1.5.1"])
      s.add_development_dependency(%q<prawn>.freeze, ["~> 2.0"])
      s.add_development_dependency(%q<prawn-table>.freeze, ["~> 0.2.2"])
      s.add_development_dependency(%q<ritex>.freeze, ["~> 1.0"])
      s.add_development_dependency(%q<itextomml>.freeze, ["~> 1.5"])
      s.add_development_dependency(%q<execjs>.freeze, ["~> 2.7"])
      s.add_development_dependency(%q<sskatex>.freeze, [">= 0.9.23"])
    else
      s.add_dependency(%q<minitest>.freeze, ["~> 5.0"])
      s.add_dependency(%q<coderay>.freeze, ["~> 1.0.0"])
      s.add_dependency(%q<rouge>.freeze, [">= 0"])
      s.add_dependency(%q<stringex>.freeze, ["~> 1.5.1"])
      s.add_dependency(%q<prawn>.freeze, ["~> 2.0"])
      s.add_dependency(%q<prawn-table>.freeze, ["~> 0.2.2"])
      s.add_dependency(%q<ritex>.freeze, ["~> 1.0"])
      s.add_dependency(%q<itextomml>.freeze, ["~> 1.5"])
      s.add_dependency(%q<execjs>.freeze, ["~> 2.7"])
      s.add_dependency(%q<sskatex>.freeze, [">= 0.9.23"])
    end
  else
    s.add_dependency(%q<minitest>.freeze, ["~> 5.0"])
    s.add_dependency(%q<coderay>.freeze, ["~> 1.0.0"])
    s.add_dependency(%q<rouge>.freeze, [">= 0"])
    s.add_dependency(%q<stringex>.freeze, ["~> 1.5.1"])
    s.add_dependency(%q<prawn>.freeze, ["~> 2.0"])
    s.add_dependency(%q<prawn-table>.freeze, ["~> 0.2.2"])
    s.add_dependency(%q<ritex>.freeze, ["~> 1.0"])
    s.add_dependency(%q<itextomml>.freeze, ["~> 1.5"])
    s.add_dependency(%q<execjs>.freeze, ["~> 2.7"])
    s.add_dependency(%q<sskatex>.freeze, [">= 0.9.23"])
  end
end
