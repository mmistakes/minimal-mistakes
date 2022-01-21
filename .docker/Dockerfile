FROM ubuntu:20.04

WORKDIR /website

COPY . .


# Install missing packages in ubuntu docker container
RUN apt-get update && apt-get install -y --no-install-recommends \
    vim \
    git \
    ruby-full \
    build-essential \
    zlib1g-dev \
    && apt-get clean all \
    && rm -rf /var/lib/apt/lists/*

RUN gem install jekyll bundler:2.3.5

RUN bundle init

RUN bundle

CMD ["jekyll", "serve"]
#CMD ["/bin/bash"]
