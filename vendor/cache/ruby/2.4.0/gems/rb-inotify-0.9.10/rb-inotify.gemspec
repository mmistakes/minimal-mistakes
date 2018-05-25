# -*- encoding: utf-8 -*-

$LOAD_PATH.unshift File.expand_path('../lib', __FILE__)
require 'rb-inotify/version'

Gem::Specification.new do |spec|
  spec.name     = 'rb-inotify'
  spec.version  = INotify::VERSION
  spec.platform = Gem::Platform::RUBY

  spec.summary     = 'A Ruby wrapper for Linux inotify, using FFI'
  spec.authors     = ['Natalie Weizenbaum', 'Samuel Williams']
  spec.email       = ['nex342@gmail.com', 'samuel.williams@oriontransfer.co.nz']
  spec.homepage    = 'https://github.com/guard/rb-inotify'
  spec.licenses    = ['MIT']

  spec.files         = `git ls-files`.split($/)
  spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
  spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
  spec.require_paths = ["lib"]

  spec.required_ruby_version = '>= 0'

  spec.add_dependency 'ffi', '>= 0.5.0', '< 2'

  spec.add_development_dependency "rspec", "~> 3.4"
  spec.add_development_dependency "bundler", "~> 1.3"
  # rake 11.x requires Ruby >= 1.9.3
  spec.add_development_dependency "rake", ">= 10.5.0", "< 13"
end
