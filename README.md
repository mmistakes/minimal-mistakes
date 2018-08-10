# taherbs.github.io

Personal site/blog files.

## Run locally

Assuming development on a Unix-based OS - first, install RVM. Then:

```bash
$ gem install bundler

# for nokogiri successful install
$ export CC=/usr/bin/gcc

$ bundle install
```

Once above is complete, can run locally:

```bash
$ jekyll serve -H 0.0.0.0 --drafts
```

Navigate in browser to `http://<IP>:4000/` to view files, including draft files.

## Push to github.io

Simply commit your code, then `git push origin master`, wait a few minutes, and then
visit the Blog URL: https://jekhokie.github.io.