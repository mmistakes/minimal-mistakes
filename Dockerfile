FROM ypereirareis/docker-node-modules:2.0

MAINTAINER Yannick Pereira-Reis <yannick.pereira.reis@gmail.com>

# Install common libs
RUN apt-get update && apt-get install -y \
  ruby2.0 \
  ruby-dev \
  make \
  gcc \
  rubygems \
  sudo

# Install jekyll
RUN gem install jekyll:3.1.2 \
  jekyll-sitemap \
  bundler


ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN bundle install

VOLUME ["/app"]

WORKDIR /app

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "-H0.0.0.0"]

