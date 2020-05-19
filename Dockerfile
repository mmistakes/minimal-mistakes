FROM alpine:latest

VOLUME /site

EXPOSE 4000

WORKDIR /site

RUN apk update && \
    apk --update add \
    gcc \
    g++ \
    make \
    curl \
    bison \
    ca-certificates \
    tzdata \
    ruby \
    ruby-rdoc \
    ruby-irb \
    ruby-bundler \
    ruby-dev \
    glib-dev \
    libc-dev \
    git
RUN echo 'gem: --no-document' > /etc/gemrc
RUN gem install github-pages --version 204 && \
    gem install jekyll-watch && \
    gem install jekyll-admin && \
    gem install jekyll-paginate && \
    gem install jekyll-sitemap && \
    gem install jekyll-gist && \
    gem install jekyll-feed && \
    gem install jemoji && \
    gem install jekyll-include-cache && \
    gem install jekyll-algolia && \
    gem install tzinfo && \
    gem install json && \
    gem install bigdecimal


# TODO seal to ship
#RUN apk del gcc g++ binutils bison perl nodejs make curl && \
#    rm -rf /var/cache/apk/*

CMD ["bundle install && bundle exec jekyll serve -d /_site --watch --force_polling -H 0.0.0.0 -P 4000"]
ENTRYPOINT ["sh", "-c"]
