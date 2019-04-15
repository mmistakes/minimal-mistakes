# Rakefile for rake        -*- ruby -*-

# Copyright 2003, 2004, 2005 by Jim Weirich (jim@weirichhouse.org)
# All rights reserved.

# This file may be distributed under an MIT style license.  See
# MIT-LICENSE for details.

require 'rbconfig'

system_rake = File.join RbConfig::CONFIG['rubylibdir'], 'rake.rb'

# Use our rake, not the installed rake from system
if $".include? system_rake or $".grep(/rake\/name_space\.rb$/).empty? then
  exec Gem.ruby, '-Ilib', 'bin/rake', *ARGV
end

require 'hoe'

Hoe.plugin :git
Hoe.plugin :minitest
Hoe.plugin :travis

hoe = Hoe.spec 'rake' do
  developer 'Eric Hodel', 'drbrain@segment7.net'
  developer 'Jim Weirich', ''

  require_ruby_version     '>= 1.8.7'
  require_rubygems_version '>= 1.3.2'

  dependency 'minitest', '~> 5.0', :developer

  license "MIT"

  self.readme_file  = 'README.rdoc'
  self.history_file = 'History.rdoc'

  self.extra_rdoc_files.concat FileList[
    'MIT-LICENSE',
    'doc/**/*.rdoc',
    '*.rdoc',
  ]

  self.local_rdoc_dir = 'html'
  self.rsync_args = '-avz --delete'
  rdoc_locations << 'docs.seattlerb.org:/data/www/docs.seattlerb.org/rake/'

  self.clean_globs += [
    '**/*.o',
    '**/*.rbc',
    '*.dot',
    'TAGS',
    'doc/example/main',
  ]
end

hoe.test_prelude = 'gem "minitest", "~> 5.0"'

# Use custom rdoc task due to existence of doc directory

Rake::Task['docs'].clear
Rake::Task['clobber_docs'].clear

begin
  require 'rdoc/task'

  RDoc::Task.new :rdoc => 'docs', :clobber_rdoc => 'clobber_docs' do |doc|
    doc.main   = hoe.readme_file
    doc.title  = 'Rake -- Ruby Make'

    rdoc_files = Rake::FileList.new %w[lib History.rdoc MIT-LICENSE doc]
    rdoc_files.add hoe.extra_rdoc_files

    doc.rdoc_files = rdoc_files

    doc.rdoc_dir = 'html'
  end
rescue LoadError
  warn 'run `rake newb` to install rdoc'
end

