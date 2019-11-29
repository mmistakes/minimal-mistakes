# -*- encoding: utf-8 -*-
# stub: algoliasearch 1.27.1 ruby lib

Gem::Specification.new do |s|
  s.name = "algoliasearch".freeze
  s.version = "1.27.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/algolia/algoliasearch-client-ruby/issues", "changelog_uri" => "https://github.com/algolia/algoliasearch-client-ruby/blob/master/CHANGELOG.md", "documentation_uri" => "http://www.rubydoc.info/gems/algoliasearch", "homepage_uri" => "https://www.algolia.com/doc/api-client/ruby/getting-started/", "source_code_uri" => "https://github.com/algolia/algoliasearch-client-ruby" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Algolia".freeze]
  s.date = "2019-09-26"
  s.description = "A simple Ruby client for the algolia.com REST API".freeze
  s.email = "contact@algolia.com".freeze
  s.extra_rdoc_files = ["CHANGELOG.md".freeze, "LICENSE".freeze, "README.md".freeze]
  s.files = ["CHANGELOG.md".freeze, "LICENSE".freeze, "README.md".freeze]
  s.homepage = "https://github.com/algolia/algoliasearch-client-ruby".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.0.3".freeze
  s.summary = "A simple Ruby client for the algolia.com REST API".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<httpclient>.freeze, ["~> 2.8", ">= 2.8.3"])
      s.add_runtime_dependency(%q<json>.freeze, [">= 1.5.1"])
      s.add_development_dependency(%q<travis>.freeze, ["~> 0"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 0"])
      s.add_development_dependency(%q<rdoc>.freeze, ["~> 0"])
    else
      s.add_dependency(%q<httpclient>.freeze, ["~> 2.8", ">= 2.8.3"])
      s.add_dependency(%q<json>.freeze, [">= 1.5.1"])
      s.add_dependency(%q<travis>.freeze, ["~> 0"])
      s.add_dependency(%q<rake>.freeze, ["~> 0"])
      s.add_dependency(%q<rdoc>.freeze, ["~> 0"])
    end
  else
    s.add_dependency(%q<httpclient>.freeze, ["~> 2.8", ">= 2.8.3"])
    s.add_dependency(%q<json>.freeze, [">= 1.5.1"])
    s.add_dependency(%q<travis>.freeze, ["~> 0"])
    s.add_dependency(%q<rake>.freeze, ["~> 0"])
    s.add_dependency(%q<rdoc>.freeze, ["~> 0"])
  end
end
