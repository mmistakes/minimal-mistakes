# Optional publish task for Rake

begin
  require 'rake/contrib/sshpublisher'
  require 'rake/contrib/rubyforgepublisher'

  publisher = Rake::SshDirPublisher.new(
    'linode',
    'htdocs/software/rake',
    'html')

  desc "Publish the Documentation to RubyForge."
  task :publish => [:rdoc] do
    publisher.upload
  end

rescue LoadError => ex
  puts "#{ex.message} (#{ex.class})"
  puts "No Publisher Task Available"
end
