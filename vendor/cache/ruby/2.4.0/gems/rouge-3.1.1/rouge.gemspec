require './lib/rouge/version'

Gem::Specification.new do |s|
  s.name = "rouge"
  s.version = Rouge.version
  s.authors = ["Jeanine Adkisson"]
  s.email = ["jneen@jneen.net"]
  s.summary = "A pure-ruby colorizer based on pygments"
  s.description = <<-desc.strip.gsub(/\s+/, ' ')
    Rouge aims to a be a simple, easy-to-extend drop-in replacement
    for pygments.
  desc
  s.homepage = "http://rouge.jneen.net/"
  s.rubyforge_project = "rouge"
  s.files = Dir['Gemfile', 'LICENSE', 'rouge.gemspec', 'lib/**/*.rb', 'lib/**/*.yml', 'bin/rougify', 'lib/rouge/demos/*']
  s.executables = %w(rougify)
  s.licenses = ['MIT', 'BSD-2-Clause']
  s.required_ruby_version = '>= 2.0'
  s.metadata = {
    'source_code_uri' => 'https://github.com/jneen/rouge',
    'changelog_uri' => 'https://github.com/jneen/rouge/blob/master/CHANGELOG.md'
  }
end
