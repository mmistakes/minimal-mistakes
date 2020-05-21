---
title: Improve this Site
permalink: /contribute/
toc: true
sidebar:
    nav: "v1guides"

---

## Content
The content of this site lives in the top-level directory `/docs` in the GitHub repo [netfoundry/mop-api-docs](https://github.com/netfoundry/mop-api-docs).

## Theme
The theme lives in the top-level `/` in the same GitHub repo [netfoundry/mop-api-docs](https://github.com/netfoundry/mop-api-docs) as the content.

## Local Preview
1. clone the repo `git clone git@github.com:netfoundry/mop-api-docs.git`
2. switch to the cloned working copy `cd ./mop-api-docs`
3. If necessary, install [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)
4. execute `docker-compose --build up`
5. browse to http://localhost:4000/

## Things to Know
* Changes to files in `/docs` will be picked up immediately by Jekyll, except `/docs/_config.yml` which requires restarting the Jekyll container.
* Optionally, before running the container, export your GitHub API token as `JEKYLL_GITHUB_TOKEN` and it will be made available to Jekyll for querying metadata from the GitHub API.
* Most content is in `/docs/_pages/` with meaningful names. You can add or edit Kramdown (GitHub-flavored Markdown) `.md` files or Liquid templates `.html` files.
* Theme changes could go in the top-level theme or become overrides in corresponding child directories under `/docs`. For example, `/docs/_layouts/default.html` overrides `/_layouts/default.html` and is available immediately in the local preview. Changes to the top-level theme don't become visible in the local preview until they're merged to the master branch in the Git remote.
* The theme is forked from Minimal Mistakes which publishes an excellent [quick-start guide](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/) covering the use of the Jekyll plugins that are included.
* All merges to the Git repo trigger [a Travis build](https://travis-ci.org/github/netfoundry/mop-api-docs). The purposes of the Travis build include
    * Validate the changes with Jekyll
    * Update the Algolia search index (the Travis env var `ALGOLIA_API_KEY` is the secret key for updating the index)