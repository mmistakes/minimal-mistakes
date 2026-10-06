# njusunyi.github.io

Personal site built with [Astro](https://astro.build) on the
[astro-nano](https://github.com/markhorn-dev/astro-nano) theme.

## Editing content

- **Name, bio, socials**: `src/consts.ts` and the intro paragraph in `src/pages/index.astro`.
- **Work experience**: one Markdown file per role in `src/content/work/`.
- **Projects**: pulled from the GitHub API at build time (public, non-fork,
  non-archived repos sorted by stars). Tune with `GITHUB.PINNED` and
  `GITHUB.EXCLUDE` in `src/consts.ts`.

## Development

```sh
npm install
npm run dev     # http://localhost:4321
npm run build   # type-check and build to dist/
```

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every
push to `master`, plus weekly so the project list stays fresh. In the repo
settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.
