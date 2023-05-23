jobs:
  close-pr:
    runs-on: ubuntu-latest
    steps:
       - name: Run actions/labeler
         uses: actions/labeler@v3
         with:
           repo-token: ${{ secrets.PULL_REQUEST_ACCESS_TOKEN }}
           configuration-path: .github/labeler.yml
           sync-labels: false

      - name: Close pull request
        uses: superbrothers/close-pull-request@v3
        with:
          pull-request-number: ${{ github.event.pull_request.number }}
          close-comment: "Thank you for the contribution :pray: We will review the changes as soon as possible. If there are any problems, please let us know."
          delete-branch: true
          allow-merge: false

      - name: Lock pull request
        uses: sudo-bot/action-pull-request-lock@v1.0.5
        with:
          lock-note: "Repository is locked at this time until once the owner reviews your changes."
          lock-reason: "repo-lock"
