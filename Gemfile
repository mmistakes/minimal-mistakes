source "https://rubygems.org"

# Run locally with: bundle exec jekyll serve
gem "jekyll", "~> 4.3"
gem "webrick"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
end

# Link/image checks in CI: bundle exec htmlproofer _site --disable-external
group :test do
  gem "html-proofer", "~> 5.0"
end
