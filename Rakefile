require "bundler/gem_tasks"
require "jekyll"
require "listen"
require "time"
require "yaml"

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

      loop { sleep 1000 }
    end
  rescue ThreadError
    # You pressed Ctrl-C, oh my!
  end

  Jekyll::Commands::Serve.process(options)
end

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
    f.puts "<!-- Sourced from CHANGELOG.md -->"
    f.puts "{% raw %}"
    f.write File.read(t.prerequisites.first)
    f.puts "{% endraw %}"
  end
end
