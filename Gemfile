source "https://rubygems.org"

# GitHub Pages gem - enthält Jekyll und alle unterstützten Plugins
gem "github-pages", group: :jekyll_plugins

# Zusätzliche Jekyll Plugins
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
end

# Windows und JRuby Unterstützung
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-Verbesserung für Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
