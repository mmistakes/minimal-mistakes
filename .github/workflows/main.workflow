# close-pr.yml

on:
  pull_request:
    types: [closed]

jobs:
  close-pr:
    runs-on: ubuntu-latest
    steps:
      - name: Run actions/labeler
        uses: actions/labeler@v3
        with:
          repo-token: ${{ secrets.MY_REPO_TOKEN_BLOG }}

      - name: Close pull request
        uses: superbrothers/close-pull-request@v3
        with:
          pull-request-number: ${{ github.event.number }}
          close-comment: "Thank you for the contribution :pray: We will review the changes as soon as possible. If there are any problems, please let us know."
          delete-branch: true

      - name: Lock pull request
        uses: sudo-bot/action-pull-request-lock@v1.0.5
        with:
          lock-note: "Repository is locked at this time until once the owner reviews your changes."
          lock-reason: "repo-lock"
          allow-merge: false
