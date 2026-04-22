# Repository Guidelines

## Project Structure & Module Organization
This repository is a Jekyll site for `sahilsatralkar.com`. Main content lives in `_pages/` for static pages and `_posts/` for blog entries. Use the Jekyll post pattern `YYYY-MM-DD-title-with-hyphens.md`. Shared data such as the top navigation lives in `_data/navigation.yml`. Layout templates are in `_layouts/`, reusable snippets are in `_includes/`, and styling is split between `assets/css/main.scss` and `_sass/minimal-mistakes/`. Publish optimized images in `assets/images/` and keep source originals in `assets/images_original/`. The `docs/` and `test/` trees are theme reference fixtures; most site changes should stay in the root site folders.

## Build, Test, and Development Commands
Run `bundle install` after cloning or when gem dependencies change. Use `bundle exec jekyll serve` for local development at `http://localhost:4000`. Build the site with `bundle exec jekyll build`, or use `JEKYLL_ENV=production bundle exec jekyll build` to match production behavior more closely. Before opening a PR, run `bundle exec htmlproofer ./_site --disable-external` to catch broken internal links and generated HTML issues. Use `bundle exec jekyll clean` if `_site/` or metadata becomes stale.

## Coding Style & Naming Conventions
Follow `.editorconfig`: 2-space indentation, LF line endings, UTF-8, and trimmed trailing whitespace except in Markdown. Keep Markdown front matter explicit and consistent with existing pages. Use descriptive lowercase filenames for pages in `_pages/`, and absolute image paths such as `/assets/images/aquarium-life-header.png` inside posts. When editing styles, prefer small, targeted changes in existing SCSS partials instead of large overrides.

## Testing Guidelines
There is no formal coverage target. Validation is build-based: run a local server for visual review, then run a production build and `htmlproofer` for link checks. If you change `_config.yml`, restart the Jekyll server before re-testing. Treat `test/` as fixture content, not as an app test suite.

## Commit & Pull Request Guidelines
Recent commits use short, imperative subjects with no trailing period, for example `Fix blog post filename to follow Jekyll naming convention`. Keep commits focused on one content or styling change. PRs should summarize affected pages, list the verification commands you ran, link any related issue, and include screenshots for layout or visual updates.
