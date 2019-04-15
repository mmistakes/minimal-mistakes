# -*- encoding: utf-8 -*-
# stub: em-websocket 0.5.1 ruby lib

Gem::Specification.new do |s|
  s.name = "em-websocket"
  s.version = "0.5.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Ilya Grigorik", "Martyn Loughran"]
  s.date = "2014-04-23"
  s.description = "EventMachine based WebSocket server"
  s.email = ["ilya@igvita.com", "me@mloughran.com"]
  s.homepage = "http://github.com/igrigorik/em-websocket"
  s.rubyforge_project = "em-websocket"
  s.rubygems_version = "2.5.2.1"
  s.summary = "EventMachine based WebSocket server"

  s.installed_by_version = "2.5.2.1" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<eventmachine>, [">= 0.12.9"])
      s.add_runtime_dependency(%q<http_parser.rb>, ["~> 0.6.0"])
    else
      s.add_dependency(%q<eventmachine>, [">= 0.12.9"])
      s.add_dependency(%q<http_parser.rb>, ["~> 0.6.0"])
    end
  else
    s.add_dependency(%q<eventmachine>, [">= 0.12.9"])
    s.add_dependency(%q<http_parser.rb>, ["~> 0.6.0"])
  end
end
