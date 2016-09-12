# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'yaml'
require 'json'
require_relative "scripts/shared.rb"
require_relative "scripts/machine.rb"

ENV['PACKAGE_CONFIGS'] ||= ['package.json#name', 'bower.json#name'].join(',')
ENV['VAGRANT_PROJECT_NAME'] ||= Config.project_name(ENV['PACKAGE_CONFIGS'].split(','))
ENV['VAGRANT_VAGRANTFILE_DIRPATH'] = File.expand_path(File.dirname(__FILE__))

Vagrant.configure(2) do |config|
  Machine.configure(config, Config.resolve_dependencies(
    if ENV.has_key?('VAGRANT_CONFIGS') then
      ENV['VAGRANT_CONFIGS'].split(',').map {|s| s.strip}
    else
      ['./vagrant']
    end))
end # Vagrant.configure
