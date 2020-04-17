# MUR Driverless Blog

Welcome to our blog repository!

For more information about the jekyll theme used, please see the original [minimal mistakes repository](https://github.com/mmistakes/minimal-mistakes).

## Setup on Ubuntu

Follow the guide [here](https://gorails.com/setup/ubuntu/18.04) to setup `ruby` and `bundler`.

```
gem install jekyll bundler
bundle install
bundle update --bundler
bundle exec jekyll serve
```

The last command should generate and start a local server. Similar messages as follows should be printed.

```
Configuration file: /Users/chi-jenlee/github/murdriverless.github.io/_config.yml
            Source: /Users/chi-jenlee/github/murdriverless.github.io
       Destination: /Users/chi-jenlee/github/murdriverless.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
       Jekyll Feed: Generating feed for posts
                    done in 0.502 seconds.
 Auto-regeneration: enabled for '/Users/chi-jenlee/github/murdriverless.github.io'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop.
```

## Initial Setup and Todo

Please go through the following checklist and update anything which might have been missed:

- [ ] Update your author profile under `_data/authors.yml`
- [ ] Place your post within the corresponding directory and category
- [ ] Images can be added under `assets/images` and split further into other directories if desired
- [ ] For information regarding embedding media in your posts, see [here](https://mmistakes.github.io/minimal-mistakes/docs/helpers/) for extra information.

## Migration Todo

- [x] Migrate previous posts over
- [ ] Assign author to each post
- [ ] Add in LaTeX support
- [ ] Add brief `How to` for writing new posts in minimal mistakes
- [ ] Figure out how splash screen and categories work
- [ ] Ask for feedback from supervisors