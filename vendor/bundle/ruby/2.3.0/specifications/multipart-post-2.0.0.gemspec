# -*- encoding: utf-8 -*-
# stub: multipart-post 2.0.0 ruby lib

Gem::Specification.new do |s|
  s.name = "multipart-post"
  s.version = "2.0.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Nick Sieger"]
  s.date = "2013-12-21"
  s.description = "Use with Net::HTTP to do multipart form posts.  IO values that have #content_type, #original_filename, and #local_path will be posted as a binary file."
  s.email = ["nick@nicksieger.com"]
  s.homepage = "https://github.com/nicksieger/multipart-post"
  s.licenses = ["MIT"]
  s.rdoc_options = ["--main", "README.md", "-SHN", "-f", "darkfish"]
  s.rubyforge_project = "caldersphere"
  s.rubygems_version = "2.5.2.1"
  s.summary = "A multipart form post accessory for Net::HTTP."

  s.installed_by_version = "2.5.2.1" if s.respond_to? :installed_by_version
end
