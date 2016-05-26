require 'yaml'
require 'html-proofer'

task :default => :test


rootdir = File.expand_path(File.dirname(__FILE__))
circle_config = YAML.load_file(File.join(rootdir, "circle.yml"))


desc "Serve Jekyll"
task :serve do
  system('bundle exec jekyll serve -H 0.0.0.0', out: $stdout, err: $stderr)
end
task :s => :serve

desc "Build Jekyll"
task :build do
  system('bundle exec jekyll build', out: $stdout, err: $stderr)
end
task :b => :build


namespace :check do |ns|
  desc "Check spelling in compiled HTML files"
  task :spelling => :build do
    puts "Checking spelling..."
    words = `set +o pipefail; find #{rootdir}/_site -type f -name '*.html' -exec cat {} \\; | tr \"’\" \"'\" | aspell list -d en_US --encoding utf-8 --ignore-case --extra-dicts #{rootdir}/custom.en.pws -H | sort | uniq -c | sort -r`

    retval = $?.to_i
    raise "Spellcheck failed: #{words}" if retval > 0

    wordcount = words.split("\n").length
    if wordcount > 0
      puts "Found #{wordcount} misspelled words\n#{words}"
      raise "Found #{wordcount} misspelled words"
    end
  end

  desc "Validate compiled HTML"
  task :html => :build do
#    puts "Checking HTML..."
#    report = `bundle exec htmlproofer #{rootdir}/_site --check-favicon --check-html --allow-hash-href  --report-missing-names`
#    puts report
#    summary = report.split("\n").last
#    raise summary if $?.to_i > 0
    opts = {
      check_html: true,
      check_favicon: true,
      allow_hash_href: true,
      check_external_hash: true,
#      enforce_https: true,
      verbose: true,
      validation: {
        report_missing_names: true
      },
      typhoeus: {
        ssl_verifypeer: false
      }
    }
    HTMLProofer.check_directory("./_site", opts).run
  end

  task :all do
    exceptions = []
    ns.tasks.each do |task|
      begin
        task.invoke
      rescue Exception => e
        exceptions << e
      end
    end
    puts "--------------------------------\n\n#{exceptions.join("\n")}\n\n"
    raise "One or more checks failed" unless exceptions.empty?
    puts "Success"
  end

end

desc "Execute tests"
task :test => 'check:all'
