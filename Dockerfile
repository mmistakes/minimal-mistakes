FROM jekyll/jekyll
Label MAINTAINER Amir Pourmand
#install imagemagick tool for convert command
RUN apk add --no-cache --virtual .build-deps \
        libxml2-dev \
        shadow \
        autoconf \
        g++ \
        make 
WORKDIR /srv/jekyll
ADD Gemfile /srv/jekyll/
ADD minimal-mistakes-jekyll.gemspec /srv/jekyll/
RUN bundle install