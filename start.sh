#!/usr/bin/env bash

# Note: for technical reasons, _config.yml is NOT reloaded automatically when used with jekyll serve.
# If you make any changes to this file, please restart the server process for them to be applied.

open -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome http://localhost:4000

bundle exec jekyll serve --incremental
