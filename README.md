# Drastic Eats

##Basics

You're best friend is `bundle exec jekyll serve`.


The current issue I'm having is that the url defaults to the github account, so everylink will go to github as the base,
to fix this I added a second config where the only difference is the URL. Is this the best or easiest way to fix it? No.


To run it locally with the url root as localhost:400, use the same command with the config flag.


`bundle exec jekyll serve --config _config_dev.yml`


## Aaron and RJ TODO LIST:
  1. Custom layout for 2 authors
  2. Register on Disqus to get a shortname
  3. Verify with Google Analytics
  4. Do defaults
  5. Twitter if it gets real