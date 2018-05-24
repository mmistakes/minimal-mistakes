[![Build Status](https://travis-ci.org/jluccisano/jluccisano.github.io.svg?branch=develop)](https://travis-ci.org/jluccisano/jluccisano.github.io)


https://gist.github.com/domenic/ec8b0fc8ab45f39403dd
gem install travis

ssh-keygen -t rsa -b 4096 -C "email@domain.com"

put deploy_key.pub into github

encrypt the private key

/root/.gem/ruby/2.4.0/gems/travis-1.8.8/bin/travis encrypt-file deploy_key --add

```bash
bundle exec jekyll serve
```
