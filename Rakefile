require "bundler/gem_tasks"
require "jekyll"
require "json"
require "listen"
require "rake/clean"
require "shellwords"
require "time"
require "yaml"

task :default => %i[copyright changelog js version]

package_json = JSON.parse(File.read("package.json"))

def listen_ignore_paths(base, options)
  [
    /_config\.ya?ml/,
    /_site/,
    /\.jekyll-metadata/
  ]
end

def listen_handler(base, options)
  site = Jekyll::Site.new(options)
  Jekyll::Command.process_site(site)
  proc do |modified, added, removed|
    t = Time.now
    c = modified + added + removed
    n = c.length
    relative_paths = c.map{ |p| Pathname.new(p).relative_path_from(base).to_s }
    print Jekyll.logger.message("Regenerating:", "#{relative_paths.join(", ")} changed... ")
    begin
      Jekyll::Command.process_site(site)
      puts "regenerated in #{Time.now - t} seconds."
    rescue => e
      puts "error:"
      Jekyll.logger.warn "Error:", e.message
      Jekyll.logger.warn "Error:", "Run jekyll build --trace for more information."
    end
  end
end

task :preview do
  base = Pathname.new('.').expand_path
  options = {
    "source"        => base.join('test').to_s,
    "destination"   => base.join('test/_site').to_s,
    "force_polling" => false,
    "serving"       => true,
    "theme"         => "minimal-mistakes-jekyll"
  }

  options = Jekyll.configuration(options)

  ENV["LISTEN_GEM_DEBUGGING"] = "1"
  listener = Listen.to(
    base.join("_data"),
    base.join("_includes"),
    base.join("_layouts"),
    base.join("_sass"),
    base.join("assets"),
    options["source"],
    :ignore => listen_ignore_paths(base, options),
    :force_polling => options['force_polling'],
    &(listen_handler(base, options))
  )

  begin
    listener.start
    Jekyll.logger.info "Auto-regeneration:", "enabled for '#{options["source"]}'"

    unless options['serving']
      trap("INT") do
        listener.stop
        puts "     Halting auto-regeneration."
        exit 0
      end
      sleep
    end
  rescue ThreadError
    # You pressed Ctrl-C, oh my!
  end

  Jekyll::Commands::Serve.process(options)
end

task :history => :changelog
task :changelog => "docs/_docs/18-history.md"
file "docs/_docs/18-history.md" => "CHANGELOG.md" do |t|
  front_matter = {
    title: "History",
    classes: "wide",
    permalink: "/docs/history/",
    excerpt: "Change log of enhancements and bug fixes made to the theme.",
    sidebar: {
      nav: "docs",
    },
    last_modified_at: Time.now.iso8601,
    toc: false,
  }
  # https://stackoverflow.com/a/49553523/5958455
  front_matter = JSON.parse(JSON.dump(front_matter))
  File.open(t.name, "w") do |f|
    f.puts front_matter.to_yaml
    f.puts "---"
    f.puts ""
    f.puts "<!--\n  Sourced from CHANGELOG.md\n  See Rakefile `task :changelog` for details\n-->"
    f.puts ""
    f.puts "{% raw %}"
    # Remove H1
    changelog = File.read(t.prerequisites.first)
      .gsub(/^# [^\n]*$/m, "")
      .gsub(/\(#(\d+)\)$/m, "[#\\1](https://github.com/mmistakes/minimal-mistakes/issues/\\1)")
      .strip
    f.write changelog
    f.puts ""
    f.puts "{% endraw %}"
  end
end

COPYRIGHT_LINES = [
  "Minimal Mistakes Jekyll Theme #{package_json["version"]} by Michael Rose",
  "Copyright 2013-#{Time.now.year} Michael Rose - mademistakes.com | @mmistakes",
  "Free for personal and commercial use under the MIT license",
  "https://github.com/mmistakes/minimal-mistakes/blob/master/LICENSE",
]

COPYRIGHT_FILES = [
  "_includes/copyright.html",
  "_includes/copyright.js",
  "_sass/minimal-mistakes/_copyright.scss",
]

def genenerate_copyright_file(filename, header, prefix, footer)
  File.open(filename, "w") do |f|
    f.puts header
    COPYRIGHT_LINES.each do |line|
      f.puts "#{prefix}#{line}"
    end
    f.puts footer
  end
end

file "_includes/copyright.html" => "package.json" do |t|
  genenerate_copyright_file(t.name, "<!--", "  ", "-->")
end

file "_includes/copyright.js" => "package.json" do |t|
  genenerate_copyright_file(t.name, "/*!", " * ", " */")
end

file "_sass/minimal-mistakes/_copyright.scss" => "package.json" do |t|
  genenerate_copyright_file(t.name, "/*!", " * ", " */")
end

task :copyright => COPYRIGHT_FILES

CLEAN.include(*COPYRIGHT_FILES)

JS_FILES = ["assets/js/vendor/jquery/jquery-3.6.0.js"] + Dir.glob("assets/js/plugins/*.js") + ["assets/js/_main.js"]
JS_TARGET = "assets/js/main.min.js"
task :js => JS_TARGET
file JS_TARGET => ["_includes/copyright.js"] + JS_FILES do |t|
  sh Shellwords.join(%w[npx uglifyjs -c --comments /@mmistakes/ --source-map -m -o] +
    [t.name] + t.prerequisites)
end

task :watch_js do
  listener = Listen.to(
    "assets/js",
    ignore: /main\.min\.js$/,
  ) do |modified, added, removed|
    Rake::Task[:js].invoke
  end

  trap("INT") do
    listener.stop
    exit 0
  end

  begin
    listener.start
    sleep
  rescue ThreadError
  end
end

task :version => ["docs/_data/theme.yml", "README.md", "docs/_pages/home.md"]

file "docs/_data/theme.yml" => "package.json" do |t|
  theme = { "version" => package_json["version"] }
  File.open(t.name, "w") do |f|
    f.puts "# for use with in-page templates"
    f.puts theme.to_yaml
  end
end

file "README.md" => "package.json" do |t|
  content = File.read(t.name)
  content = content.gsub(/(mmistakes\/minimal-mistakes@)[\d.]+/, '\1' + package_json["version"])
  File.write(t.name, content)
end

file "docs/_pages/home.md" => "package.json" do |t|
  content = File.read(t.name)
  content = content.gsub(/(\breleases\/tag\/|Latest release v)[\d.]+/, '\1' + package_json["version"])
  File.write(t.name, content)
end

task :gem do
  sh 'gem build minimal-mistakes-jekyll.gemspec'
end
