source "https://rubygems.org"

# GitHub Pages와 호환되는 버전 사용
gem "github-pages", group: :jekyll_plugins

# 필수 플러그인
group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
  gem "jekyll-feed"
  gem "jekyll-include-cache"
  gem "jekyll-remote-theme"
end

# Windows와 JRuby는 timezone 정보가 필요
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# HTTP 서버 기능
gem "webrick", "~> 1.7"

# 네트워크 재시도 기능
gem "faraday-retry"
