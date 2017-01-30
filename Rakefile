require "bundler/gem_tasks"
require "jekyll"

def source_dir
  Pathname.new('.').expand_path.join("test").to_s
end

task :preview do
  Dir.chdir(source_dir) do
    sh "bundle", "exec", "jekyll serve --safe --trace"
  end
end
