# -*- encoding: utf-8 -*-
# stub: rake 10.5.0 ruby lib

Gem::Specification.new do |s|
  s.name = "rake".freeze
  s.version = "10.5.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.2".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Eric Hodel".freeze, "Jim Weirich".freeze]
  s.date = "2016-01-13"
  s.description = "Rake is a Make-like program implemented in Ruby. Tasks and dependencies are\nspecified in standard Ruby syntax.\n\nRake has the following features:\n\n* Rakefiles (rake's version of Makefiles) are completely defined in\n  standard Ruby syntax.  No XML files to edit.  No quirky Makefile\n  syntax to worry about (is that a tab or a space?)\n\n* Users can specify tasks with prerequisites.\n\n* Rake supports rule patterns to synthesize implicit tasks.\n\n* Flexible FileLists that act like arrays but know about manipulating\n  file names and paths.\n\n* A library of prepackaged tasks to make building rakefiles easier. For example,\n  tasks for building tarballs and publishing to FTP or SSH sites.  (Formerly\n  tasks for building RDoc and Gems were included in rake but they're now\n  available in RDoc and RubyGems respectively.)\n\n* Supports parallel execution of tasks.".freeze
  s.email = ["drbrain@segment7.net".freeze, "".freeze]
  s.executables = ["rake".freeze]
  s.extra_rdoc_files = ["CONTRIBUTING.rdoc".freeze, "History.rdoc".freeze, "Manifest.txt".freeze, "README.rdoc".freeze, "doc/command_line_usage.rdoc".freeze, "doc/glossary.rdoc".freeze, "doc/proto_rake.rdoc".freeze, "doc/rakefile.rdoc".freeze, "doc/rational.rdoc".freeze, "doc/release_notes/rake-0.4.14.rdoc".freeze, "doc/release_notes/rake-0.4.15.rdoc".freeze, "doc/release_notes/rake-0.5.0.rdoc".freeze, "doc/release_notes/rake-0.5.3.rdoc".freeze, "doc/release_notes/rake-0.5.4.rdoc".freeze, "doc/release_notes/rake-0.6.0.rdoc".freeze, "doc/release_notes/rake-0.7.0.rdoc".freeze, "doc/release_notes/rake-0.7.1.rdoc".freeze, "doc/release_notes/rake-0.7.2.rdoc".freeze, "doc/release_notes/rake-0.7.3.rdoc".freeze, "doc/release_notes/rake-0.8.0.rdoc".freeze, "doc/release_notes/rake-0.8.2.rdoc".freeze, "doc/release_notes/rake-0.8.3.rdoc".freeze, "doc/release_notes/rake-0.8.4.rdoc".freeze, "doc/release_notes/rake-0.8.5.rdoc".freeze, "doc/release_notes/rake-0.8.6.rdoc".freeze, "doc/release_notes/rake-0.8.7.rdoc".freeze, "doc/release_notes/rake-0.9.0.rdoc".freeze, "doc/release_notes/rake-0.9.1.rdoc".freeze, "doc/release_notes/rake-0.9.2.2.rdoc".freeze, "doc/release_notes/rake-0.9.2.rdoc".freeze, "doc/release_notes/rake-0.9.3.rdoc".freeze, "doc/release_notes/rake-0.9.4.rdoc".freeze, "doc/release_notes/rake-0.9.5.rdoc".freeze, "doc/release_notes/rake-0.9.6.rdoc".freeze, "doc/release_notes/rake-10.0.0.rdoc".freeze, "doc/release_notes/rake-10.0.1.rdoc".freeze, "doc/release_notes/rake-10.0.2.rdoc".freeze, "doc/release_notes/rake-10.0.3.rdoc".freeze, "doc/release_notes/rake-10.1.0.rdoc".freeze, "MIT-LICENSE".freeze]
  s.files = ["CONTRIBUTING.rdoc".freeze, "History.rdoc".freeze, "MIT-LICENSE".freeze, "Manifest.txt".freeze, "README.rdoc".freeze, "bin/rake".freeze, "doc/command_line_usage.rdoc".freeze, "doc/glossary.rdoc".freeze, "doc/proto_rake.rdoc".freeze, "doc/rakefile.rdoc".freeze, "doc/rational.rdoc".freeze, "doc/release_notes/rake-0.4.14.rdoc".freeze, "doc/release_notes/rake-0.4.15.rdoc".freeze, "doc/release_notes/rake-0.5.0.rdoc".freeze, "doc/release_notes/rake-0.5.3.rdoc".freeze, "doc/release_notes/rake-0.5.4.rdoc".freeze, "doc/release_notes/rake-0.6.0.rdoc".freeze, "doc/release_notes/rake-0.7.0.rdoc".freeze, "doc/release_notes/rake-0.7.1.rdoc".freeze, "doc/release_notes/rake-0.7.2.rdoc".freeze, "doc/release_notes/rake-0.7.3.rdoc".freeze, "doc/release_notes/rake-0.8.0.rdoc".freeze, "doc/release_notes/rake-0.8.2.rdoc".freeze, "doc/release_notes/rake-0.8.3.rdoc".freeze, "doc/release_notes/rake-0.8.4.rdoc".freeze, "doc/release_notes/rake-0.8.5.rdoc".freeze, "doc/release_notes/rake-0.8.6.rdoc".freeze, "doc/release_notes/rake-0.8.7.rdoc".freeze, "doc/release_notes/rake-0.9.0.rdoc".freeze, "doc/release_notes/rake-0.9.1.rdoc".freeze, "doc/release_notes/rake-0.9.2.2.rdoc".freeze, "doc/release_notes/rake-0.9.2.rdoc".freeze, "doc/release_notes/rake-0.9.3.rdoc".freeze, "doc/release_notes/rake-0.9.4.rdoc".freeze, "doc/release_notes/rake-0.9.5.rdoc".freeze, "doc/release_notes/rake-0.9.6.rdoc".freeze, "doc/release_notes/rake-10.0.0.rdoc".freeze, "doc/release_notes/rake-10.0.1.rdoc".freeze, "doc/release_notes/rake-10.0.2.rdoc".freeze, "doc/release_notes/rake-10.0.3.rdoc".freeze, "doc/release_notes/rake-10.1.0.rdoc".freeze]
  s.homepage = "https://github.com/ruby/rake".freeze
  s.licenses = ["MIT".freeze]
  s.rdoc_options = ["--main".freeze, "README.rdoc".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 1.8.7".freeze)
  s.rubygems_version = "2.6.14.1".freeze
  s.summary = "Rake is a Make-like program implemented in Ruby".freeze

  s.installed_by_version = "2.6.14.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<minitest>.freeze, ["~> 5.8"])
      s.add_development_dependency(%q<rdoc>.freeze, ["~> 4.0"])
      s.add_development_dependency(%q<hoe>.freeze, ["~> 3.14"])
    else
      s.add_dependency(%q<minitest>.freeze, ["~> 5.8"])
      s.add_dependency(%q<rdoc>.freeze, ["~> 4.0"])
      s.add_dependency(%q<hoe>.freeze, ["~> 3.14"])
    end
  else
    s.add_dependency(%q<minitest>.freeze, ["~> 5.8"])
    s.add_dependency(%q<rdoc>.freeze, ["~> 4.0"])
    s.add_dependency(%q<hoe>.freeze, ["~> 3.14"])
  end
end
