#!/bin/bash

bundle clean --force
bundle install
bundle exec jekyll serve