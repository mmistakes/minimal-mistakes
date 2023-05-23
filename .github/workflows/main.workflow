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
          GITHUB_TOKEN: "${{ secrets.PULL_REQUEST_ACCESS_TOKEN }}"
          MERGE_LABELS: "automerge, !wip"
