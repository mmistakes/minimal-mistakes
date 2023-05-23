name: Auto Merge Pull Request Based on Label

on:
  pull_request:
    types:
      - labeled
      - unlabeled
      - synchronize

  push:
    branches:
      - main

jobs:
  auto_merge:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Merge pull request based on label
        uses: pascalgn/automerge-action@v0.13.1
        env:
          token: ${{ secrets.MY_REPO_TOKEN_BLOG || github.token }}
          MERGE_LABELS: "automerge, !wip"
